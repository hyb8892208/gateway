<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.cloud}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.general}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.enable_cloud_service_help"></span>
                    <span slot="param_name" >{{lang.enable_cloud_service}}</span>
                    <el-checkbox slot="param" v-model="cloud_enable"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.choose_service_help"></span>
                    <span slot="param_name" >{{lang.choose_service}}</span>
                    <el-select slot="param" v-model="server" @change="change_cloud_href" style="width: 100%">
                        <el-option
                                v-for="item in server_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row v-show="server == 'customize'">
                <form_item>
                    <span slot="param_help" v-html="lang.custom_server"></span>
                    <span slot="param_name" >{{lang.custom_server}}</span>
                    <el-input slot="param" v-model="customize_server" style="width: 100%"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.account_help"></span>
                    <span slot="param_name" >{{lang.account}}</span>
                    <el-input slot="param"  v-model="account"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.password_help"></span>
                    <span slot="param_name" >{{lang.password}}</span>
                    <el-input slot="param"  v-model="password" show-password></el-input>
                </form_item>
            </el-row>

            <el-row v-if="cloud_enable">
                <form_item>
                    <span slot="param_help" v-html="lang.connection_status_help"></span>
                    <span slot="param_name" >{{lang.connection_status}}</span>
                    <div slot="param">
                        <i class="el-icon-loading" v-show="connection_status_icon" style="font-size: 20px;"></i>
                        <span v-show="!connection_status_icon">
                            <b v-if="connect_code == 200" style="color: #67C23A;">{{connect_state}}</b>
                            <b v-else style="color: #F56C6C;">{{failed_to_connect}}</b>
                        </span>
                    </div>
                </form_item>
            </el-row>

            <el-row>
                <el-col :lg="12" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <slot name="param_help"></slot>
                                </div>
                                <slot name="param_name"></slot>
                            </el-tooltip>
                        </label>
                        <el-col :lg="18" style="font-size:12px;">
                            <slot name="param">{{lang.cloud_signmessage_help}}<a :href="cloud_href" style="color: #409EFF;" target="black" >{{lang.cloud_sign_help}}</a></slot>
                        </el-col>
                    </el-form-item>
                </el-col>

                <form_item>

                </form_item>
            </el-row>

        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Adv-cloud",
        inject: ['reload'],
        data() {
            return {
                cloud_enable: false,
                server: 'china',
                customize_server: '',
                account: '',
                password: '',
                connect_state: '',
                connect_code: 0,
                connection_status_icon: false,
                failed_to_connect: '',
                timeout: 0,
                cloud_href: 'https://cloud.openvox.com.cn',

                server_options: [{
                    label: 'China',
                    value: 'china'
                },{
                    label: 'America',
                    value: 'america'
                },{
                    label: 'Europe',
                    value: 'europe'
                },{
                    label: 'Customize',
                    value: 'customize'
                }],

                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods: {
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let data_temp = data['_get']['_general']
                this.cloud_enable = data_temp['_enabled'] == 1 ? true : false
                this.server = data_temp['_country'] == '' ? 'china' : data_temp['_country']
                this.customize_server = data_temp['_url']
                this.account = data_temp['_username']
                this.password = data_temp['_secret']

                this.get_connection_status('first')
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            change_cloud_href(value){
                if(value == 'china'){
                    this.cloud_href = 'https://cloud.openvox.com.cn'
                }else if(value == 'america'){
                    this.cloud_href = 'https://cloud.openvox.cn/'
                }else if(value == 'europe'){
                    this.cloud_href = 'https://cloud-eur.openvox.cn'
                }
            },
            get_connection_status(action){
                if(action == 'first'){
                    this.request.AGAdvCloudGetStatus(this.first_connect_succeed_back, this.first_connect_error_back)
                }else{
                    this.timeoutID = setTimeout(() => {
                        this.request.AGAdvCloudGetStatus(this.save_connect_succeed_back, this.save_connect_error_back)
                        this.get_connection_status()
                    },
                    1000)
                }
            },
            first_connect_succeed_back(data){
                let result = data['_cloudstatus']

                this.connect_code = result
                if(result == 200){
                    this.connect_state = this.lang.connected
                }else if(result == 440){
                    this.failed_to_connect = this.lang.password_error
                }else if(result == 441){
                    this.failed_to_connect = this.lang.user_does_not_exist
                }else if(result == 442){
                    this.failed_to_connect = this.lang.you_have_been_blacklisted
                }else{
                    this.failed_to_connect = this.lang.failed_to_connect
                }
            },
            first_connect_error_back(){
                this.$message({
                    message: 'Get State Error',
                    type: 'error',
                    offset: 80
                })
            },
            save_connect_succeed_back(data){
                let result = data['_cloudstatus']

                this.connect_code = result
                if (result == 200) {
                    this.connect_state = this.lang.connected
                    this.connection_status_icon = false
                    this.reload()
                    clearTimeout(this.timeoutID)
                } else if(this.timeout >= 30) {
                    this.failed_to_connect = this.lang.connection_timeout
                    this.connection_status_icon = false
                    this.reload()
                    clearTimeout(this.timeoutID)
                } else if (result == 0) {
                    this.timeout++
                } else {
                    if (result == 440) {
                        this.failed_to_connect = this.lang.password_error
                    } else if (result == 441) {
                        this.failed_to_connect = this.lang.user_does_not_exist
                    } else if (result == 442) {
                        this.failed_to_connect = this.lang.you_have_been_blacklisted
                    } else {
                        this.failed_to_connect = this.lang.failed_to_connect
                    }
                    this.connection_status_icon = false
                    this.reload()
                    clearTimeout(this.timeoutID)
                }
            },
            save_connect_error_back(){
                console.log('error')
                this.$message({
                    message: 'Get State Error',
                    type: 'error',
                    offset: 80
                })

                clearTimeout(this.timeoutID)
            },

            Save(){
                const general = new AST_AdvCloudGeneral()

                general._enabled = this.cloud_enable == true ? 1 : 0
                general._username = this.account
                general._secret = this.password
                general._country = this.server
                general._url = this.customize_server

                const AdvCloudSave = new AST_AdvCloudSave()
                AdvCloudSave._general = general

                this.request.AGAdvCloudSave(this.save_succeed_back, this.save_error_back, AdvCloudSave)

                this.connection_status_icon = true
                this.get_connection_status()
            },
            save_succeed_back(data){
                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: 80
                    })
                }else {
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: 80
                    })
                }
            },
            save_error_back(){
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: 80
                })
            }
        },
        created() {
            this.debug = debuger('adv-cloud')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGAdvCloudGet(this.show_succeed_back, this.show_error_back)
            }
        },
        beforeDestroy() {
            clearTimeout(this.timeoutID)
        }
    }
</script>

<style scoped>

</style>