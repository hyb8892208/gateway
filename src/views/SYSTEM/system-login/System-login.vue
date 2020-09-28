<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <h1 style="line-height: 50px;font-size: 18px;padding-left: 20px;margin-bottom: 20px;">
            {{lang.login_settings}}
            <div style="float: right;line-height: 50px;margin-right: 20px;">
                <el-button
                        style="vertical-align:middle;"
                        type="primary"
                        size="small"
                        @click="submitValidator('ruleForm')"
                >{{lang.save}}</el-button>
            </div>
        </h1>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom:50px" :style=$store.state.page.card_width>
            <el-form :label-position="$store.state.page.labelPosition"
                     label-width="250px"
                     class="change-label-class"
                     :rules="rules"
                     :model="ruleForm"
                     ref="ruleForm"
                     size="small">

                <el-divider content-position="left"><h3>{{lang.web_login_settings}}</h3></el-divider>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.username_help"></span>
                        <span slot="param_name" >{{lang.username}}</span>
                        <el-input slot="param" id="username" v-model="ruleForm.username"></el-input>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.password_help"></span>
                        <span slot="param_name" >{{lang.password}}</span>
                        <el-input slot="param" id="pass" show-password v-model="ruleForm.pass"></el-input>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.confirm_password_help"></span>
                        <span slot="param_name" >{{lang.confirm_password}}</span>
                        <el-input slot="param" id="confirm_password" show-password v-model="ruleForm.confirm_password"></el-input>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.login_mode_help"></span>
                        <span slot="param_name" >{{lang.login_mode}}</span>
                        <el-select
                                slot="param"
                                v-model="login_mode_value"
                                :placeholder="lang.select_placeholder"
                                @change="change_login_mode"
                                style="width: 100%;">
                            <el-option
                                    v-for="item in login_modes"
                                    :label="item.label"
                                    :key="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.https_port_help"></span>
                        <span slot="param_name" >{{lang.http_port}}</span>
                        <el-input slot="param" id="http_port" v-model.number="ruleForm.http_port" :disabled="http_disabled"></el-input>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.https_port_help"></span>
                        <span slot="param_name" >{{lang.https_port}}</span>
                        <el-input slot="param" id="https_port" v-model.number="ruleForm.https_port" :disabled="https_disabled"></el-input>
                    </form_item>
                </el-row>

                <el-divider content-position="left"><h3>{{lang.ssh_login_settings}}</h3></el-divider>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.enable_help"></span>
                        <span slot="param_name" >{{lang.enable}}</span>
                        <el-checkbox slot="param" v-model="ssh_sw"></el-checkbox>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.username_help"></span>
                        <span slot="param_name" >{{lang.username}}</span>
                        <el-input slot="param" id="ssh_username" v-model="ruleForm.ssh_username"></el-input>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.password_help"></span>
                        <span slot="param_name" >{{lang.password}}</span>
                        <el-input slot="param" id="ssh_password" show-password v-model="ruleForm.ssh_password"></el-input>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.port_help"></span>
                        <span slot="param_name" >{{lang.port}}</span>
                        <p slot="param">{{ssh_port}}</p>
                    </form_item>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "System-login",
        inject:['reload'],
        data(){
            var validatePass = (rule, value, callback) => {
                // if (value === '') {
                //     callback(new Error('请输入密码'));
                // } else {
                    if (this.ruleForm.pass !== '') {
                        this.$refs.ruleForm.validateField('password');
                    }
                    callback();
               // }
            }

            var validateConfirmPass = (rule, value, callback) => {
                // if (value === '') {
                //     callback(new Error('请输入确认密码'));
                // } else
                if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return{
                login_mode_value: 'http_https',
                ssh_sw: false,//0 -> true, 1 -> false
                ssh_port: '12345',

                login_modes: [{
                    label: 'http and https',
                    value: '0'
                },{
                    label: 'only https',
                    value: '1'
                },{
                    label: 'only http',
                    value: '2'
                }],

                http_disabled: false,
                https_disabled: false,

                activeName: 'Web',

                ruleForm: {
                    username: '',
                    pass: '',
                    confirm_password: '',
                    http_port: '80',
                    https_port: '443',
                    ssh_username: '',
                    ssh_password: '',
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    confirm_password: [
                        { validator: validateConfirmPass, trigger: 'blur' }
                    ],
                },

                lang: this.$store.state.lang
            }
        },
        methods:{
            change_login_mode(){
                if(this.login_mode_value == '1'){
                    this.http_disabled = true
                    this.https_disabled = false
                }else if(this.login_mode_value == '2'){
                    this.http_disabled = false
                    this.https_disabled = true
                }else{
                    this.http_disabled = false
                    this.https_disabled = false
                }
            },

            submitValidator(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.Save()
                    } else {
                        return false;
                    }
                });
            },

            show_succeed_back(data) {
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _general = data['_get']['_general']
                let _ssh = data['_get']['_ssh']

                // this.username = _general['_username']
                // this.pass = _general['_password']
                this.login_mode_value = _general['_loginmode']
                this.ruleForm.http_port = _general['_port1'] == 0 ? '80' : _general['_port1']
                this.ruleForm.https_port = _general['_port2'] == 0 ? '443' : _general['_port2']

                this.ssh_sw = _ssh['_sw'] == '0' ? true : false
                this.ruleForm.ssh_username = _ssh['_user']
                this.ruleForm.ssh_password = _ssh['_password']

                this.change_login_mode()
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const syslogingeneral = new AST_SysLoginGeneral()
                syslogingeneral._username = this.ruleForm.username
                syslogingeneral._password = this.ruleForm.pass
                syslogingeneral._loginmode = this.login_mode_value
                syslogingeneral._port1 = this.ruleForm.http_port == 0 ? '80' : this.ruleForm.http_port
                syslogingeneral._port2 = this.ruleForm.https_port == 0 ? '443' : this.ruleForm.https_port

                const sysloginssh = new AST_SysLoginSsh()
                sysloginssh._sw = this.ssh_sw == true ? 0 : 1
                sysloginssh._user = this.ruleForm.ssh_username
                sysloginssh._password = this.ruleForm.ssh_password

                const SysLoginSave = new AST_SysLoginSave()
                SysLoginSave._general = syslogingeneral
                SysLoginSave._ssh = sysloginssh

                this.request.AGSysLoginSave(this.save_succeed_back, this.save_error_back, SysLoginSave)
            },
            save_succeed_back(data){
                console.log(data)
                if(data['_result'] == 0){
                    this.$axios.get('/service?action=lighttpd&type=')
                        .then((res) => {
                            console.log(res)

                            this.$message({
                                message: '恭喜你，保存成功',
                                type: 'success',
                                offset: '80'
                            })
                        }).catch((error) => {

                    })
                }

                this.reload()
            },
            save_error_back(){
                console.log('save error')
            }
        },
        created() {
            this.request.AGSysLoginGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>