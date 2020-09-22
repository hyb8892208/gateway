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

            <el-divider content-position="left"><h3>{{lang.general}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.tr069_help"></div>
                                <span>{{lang.tr069}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="tr069_sw"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.server_help"></div>
                                <span>{{lang.server}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="server"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.username_help"></div>
                                <span>{{lang.username}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="username"></el-input>
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
                                <div slot="content" v-html="lang.provisioning_code_help"></div>
                                <span>{{lang.provisioning_code}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="provisioning_code"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.model_name_help"></div>
                                <span>{{lang.model_name}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="model_name"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.periodic_inform_enable_help"></div>
                                <span>{{lang.periodic_inform_enable}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="periodic_inform_enable"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.periodic_inform_interval_help"></div>
                                <span>{{lang.periodic_inform_interval}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="periodic_inform_interval"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.connection_request_url_help"></div>
                                <span>{{lang.connection_request_url}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="connection_request_url"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.connection_request_username_help"></div>
                                <span>{{lang.connection_request_username}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="connection_request_username"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.connection_request_password_help"></div>
                                <span>{{lang.connection_request_password}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="connection_request_password" show-password></el-input>
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
                            <i class="el-icon-loading" v-show="connection_status_icon" style="font-size: 20px;"></i>
                            <span v-show="!connection_status_icon">
                                <b v-if="connect_code == 200" style="color: #67C23A;">{{connection_status}}</b>
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
                this.connection_request_url = data_temp['_requesturl']
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
                if(result == 200){
                    this.connection_status = this.lang.connected
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
            this.request = new request()
            this.request.AGAdvTr069Get(this.show_succeed_back, this.show_error_back)
        },
        beforeDestroy() {
            clearTimeout(this.timeoutID)
        }

    }
</script>

<style scoped>

</style>