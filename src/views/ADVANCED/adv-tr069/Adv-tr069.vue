<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.tr069_settings}}
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
                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.tr069_help"></span>
                        <span slot="param_name" >{{lang.tr069}}</span>
                        <el-checkbox slot="param" v-model="tr069_sw"></el-checkbox>
                    </form_item>
                </el-row>
            </el-row>

            <el-row>
                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.server_help"></span>
                        <span slot="param_name" >{{lang.server}}</span>
                        <el-input slot="param" v-model="server"></el-input>
                    </form_item>
                </el-row>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.username_help"></span>
                    <span slot="param_name" >{{lang.username}}</span>
                    <el-input slot="param" v-model="username"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.password_help"></span>
                    <span slot="param_name" >{{lang.password}}</span>
                    <el-input slot="param" v-model="password" show-password ></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.provisioning_code_help"></span>
                    <span slot="param_name" >{{lang.provisioning_code}}</span>
                    <el-input slot="param" v-model="provisioning_code" ></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.model_name_help"></span>
                    <span slot="param_name" >{{lang.model_name}}</span>
                    <el-input slot="param" v-model="model_name" ></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.periodic_inform_enable_help"></span>
                    <span slot="param_name" >{{lang.periodic_inform_enable}}</span>
                    <el-checkbox slot="param" v-model="periodic_inform_enable" ></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.periodic_inform_interval_help"></span>
                    <span slot="param_name" >{{lang.periodic_inform_interval}}</span>
                    <el-input slot="param" v-model="periodic_inform_interval" ></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.connection_request_url_help"></span>
                    <span slot="param_name" >{{lang.connection_request_url}}</span>
                    <el-input slot="param" v-model="connection_request_url" ></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.connection_request_username_help"></span>
                    <span slot="param_name" >{{lang.connection_request_username}}</span>
                    <el-input slot="param" v-model="connection_request_username" ></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.connection_request_password_help"></span>
                    <span slot="param_name" >{{lang.connection_request_password}}</span>
                    <el-input slot="param" v-model="connection_request_password" show-password ></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.connection_status_help"></span>
                    <span slot="param_name" >{{lang.connection_status}}</span>
                    <div slot="param">
                        <i class="el-icon-loading" v-show="connection_status_icon" style="font-size: 20px;"></i>
                        <span v-show="!connection_status_icon">
                            <b v-if="connect_code == 200" style="color: #67C23A;">{{connection_status}}</b>
                            <b v-else style="color: #F56C6C;">{{failed_to_connect}}</b>
                        </span>
                    </div>
                </form_item>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Adv-tr069",
        data(){
            return {
                tr069_sw: false,
                server: '',
                username: '',
                password: '',
                provisioning_code: '',
                model_name: '',
                periodic_inform_enable: '',
                periodic_inform_interval: '',
                connection_request_url: '',
                connection_request_username: '',
                connection_request_password: '',

                connection_status_icon: false,
                connection_status: '',
                connect_code: 0,
                failed_to_connect: '',
                timeout: 0,

                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data) {
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let data_temp = data['_get']['_general']
                this.tr069_sw = data_temp['_enabled'] == 1 ? true : false
                this.server = data_temp['_acsurl']
                this.username = data_temp['_acsusername']
                this.password = data_temp['_acspassword']
                this.provisioning_code = data_temp['_provisioningcode']
                this.model_name = data_temp['_modelname']
                this.periodic_inform_enable = data_temp['_periodicenable'] == 1 ? true : false
                this.periodic_inform_interval = data_temp['_periodicinterval']
                this.connection_request_url = data_temp['_requesturl'] == '' ? 'http://'+window.location.host+':7547' : data_temp['_requesturl']
                this.connection_request_username = data_temp['_requestusername']
                this.connection_request_password = data_temp['_requestpasswd']

                this.get_connection_status('first')
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            get_connection_status(action){
                if(action == 'first'){
                    this.request.AGAdvTr069GetStatus(this.first_connect_succeed_back, this.first_connect_error_back)
                }else{
                    this.timeoutID = setTimeout(() => {
                        this.request.AGAdvTr069GetStatus(this.save_connect_succeed_back, this.save_connect_error_back)
                        this.get_connection_status()
                    }, 1000)
                }
            },
            first_connect_succeed_back(data){
                console.log(data)
                let result = data['_tr069status']
                this.connect_code = result
                if(result == 200) {
                    this.connection_status = this.lang.connected
                }else if(result == -1){
                    this.failed_to_connect = ''
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

                this.failed_to_connect = this.lang.failed_to_connect
            },
            save_connect_succeed_back(data){
                let result = data['_cloudstatus']

                this.connect_code = result
                if(result == 200){
                    this.connection_status = this.lang.connected
                    this.connection_status_icon = false
                    clearTimeout(this.timeoutID)
                }else if(this.timeout >= 30){
                    this.failed_to_connect = this.lang.connection_timeout
                    this.connection_status_icon = false
                    clearTimeout(this.timeoutID)
                }else if(result == 0){
                    this.timeout++
                }else{
                    this.failed_to_connect = this.lang.failed_to_connect
                    this.connection_status_icon = false
                    clearTimeout(this.timeoutID)
                }
            },
            save_connect_error_back(){
                this.$message({
                    message: 'Get State Error',
                    type: 'error',
                    offset: '80'
                })

                clearTimeout(this.timeoutID)
            },
            Save(){
                const General = new AST_AdvTr069General()

                General._enabled = this.tr069_sw == true ? 1 : 0
                General._acsurl = this.server
                General._acsusername = this.username
                General._acspassword = this.password
                General._provisioningcode = this.provisioning_code
                General._modelname = this.model_name
                General._periodicenable = this.periodic_inform_enable == true ? 1 : 0
                General._periodicinterval = this.periodic_inform_interval
                General._requesturl = this.connection_request_url
                General._requestusername = this.connection_request_username
                General._requestpasswd = this.connection_request_password

                const AdvTr069Save = new AST_AdvTr069Save()
                AdvTr069Save._general = General

                console.log(AdvTr069Save)
                this.request.AGAdvTr069Save(this.save_succeed_back, this.save_error_back, AdvTr069Save)

                this.connection_status_icon = true

                console.log(this.connection_status_icon)
                this.get_connection_status()
            },
            save_succeed_back(data){
                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })
            },
            save_error_back(){
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },
        created() {
            this.request.AGAdvTr069Get(this.show_succeed_back, this.show_error_back)
        },
        beforeDestroy() {
            clearTimeout(this.timeoutID)
        }

    }
</script>

<style scoped>

</style>