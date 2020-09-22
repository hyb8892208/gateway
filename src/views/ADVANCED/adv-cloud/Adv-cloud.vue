<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
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

            <el-divider content-position="left"><h3>{{lang.general}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.enable_cloud_service_help"></div>
                                <span>{{lang.enable_cloud_service}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="cloud_enable"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.choose_service_help"></div>
                                <span>{{lang.choose_service}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="server" style="width: 100%">
                                <el-option
                                    v-for="item in server_options"
                                    :label="item.label"
                                    :key="item.value"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row v-show="server == 'customize'">
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.custom_server"></div>
                                <span>{{lang.custom_server}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="customize_server" style="width: 100%"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.account_help"></div>
                                <span>{{lang.account}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="account"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.password_help"></div>
                                <span>{{lang.password}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="password" show-password></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.connection_status_help"></div>
                                <span>{{lang.connection_status}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <span>{{connect_state}}</span>

                            <i class="el-icon-loading" v-show="connection_status_icon" style="font-size: 20px;"></i>
                            <span v-show="!connection_status_icon">
                                <b v-if="connect_code == 200" style="color: #67C23A;">{{connect_state}}</b>
                                <b v-else style="color: #F56C6C;">{{failed_to_connect}}</b>
                            </span>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-card>
    </el-form>
</template>

<script>
    import {request} from "../../../network/request";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Adv-cloud",
        data() {
            return {
                request: null,
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
                    offset: '80'
                })
            },
            save_connect_succeed_back(data){
                let result = data['_cloudstatus']

                this.connect_code = result
                if (result == 200) {
                    this.connect_state = this.lang.connected
                    this.connection_status_icon = false
                    clearTimeout(this.timeoutID)
                } else if(this.timeout >= 30) {
                    this.failed_to_connect = this.lang.connection_timeout
                    this.connection_status_icon = false
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
                    clearTimeout(this.timeoutID)
                }
            },
            save_connect_error_back(){
                console.log('error')
                this.$message({
                    message: 'Get State Error',
                    type: 'error',
                    offset: '80'
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
                console.log(data)

                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })
            },
            save_error_back(){
                console.log('save failed')

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },
        created() {
            this.request = new request()
            this.request.AGAdvCloudGet(this.show_succeed_back, this.show_error_back)
        },
        beforeDestroy() {
            clearTimeout(this.timeoutID)
        }
    }
</script>

<style scoped>

</style>