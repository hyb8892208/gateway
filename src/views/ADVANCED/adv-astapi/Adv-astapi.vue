<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            :rules="rules"
            :model="ruleForm"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.asterisk_api}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="submitValidator('ruleForm')">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.general}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.enable_help"></span>
                    <span slot="param_name" >{{lang.enable}}</span>
                    <el-checkbox slot="param" v-model="enabled"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.port_help"></span>
                    <span slot="param_name" >{{lang.port}}</span>
                    <span slot="param">{{port}}</span>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.manager}}</span></divider_item>

            <el-row>
                <form_item v-bind:param="'manager_name'">
                    <span slot="param_help" v-html="lang.manager_name_help"></span>
                    <span slot="param_name" >{{lang.manager_name}}</span>
                    <el-input slot="param" v-model="ruleForm.manager_name"></el-input>
                </form_item>

                <form_item v-bind:param="'manager_pass'">
                    <span slot="param_help" v-html="lang.manager_secret_help"></span>
                    <span slot="param_name" >{{lang.manager_secret}}</span>
                    <el-input slot="param" v-model="ruleForm.manager_pass" show-password></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.deny_help"></span>
                    <span slot="param_name" >{{lang.deny}}</span>
                    <el-input slot="param" v-model="deny"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.permit_help"></span>
                    <span slot="param_name" >{{lang.permit}}</span>
                    <el-input slot="param" v-model="permit"></el-input>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.rights}}</span></divider_item>

            <el-row>
                <form_item v-for="(item,index) in rights_val_options">
                    <span slot="param_help" v-html="rights_options[index].name_help"></span>
                    <span slot="param_name" >{{rights_options[index].name}}</span>
                    <span slot="param">
                         <el-checkbox v-model="item.read"
                                      :disabled="item.read_disabled">{{lang.read}}</el-checkbox>
                        <el-checkbox v-model="item.write"
                                     :disabled="item.write_disabled">{{lang.write}}</el-checkbox>
                    </span>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.all_help"></span>
                    <span slot="param_name" >{{lang.all}}</span>
                    <span slot="param">
                        <el-checkbox v-model="all_read" @change="All_read_change">{{lang.read}}</el-checkbox>
                        <el-checkbox v-model="all_write" @change="All_write_change">{{lang.write}}</el-checkbox>
                    </span>
                </form_item>
            </el-row>

        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Adv-astapi",
        data() {
            var validateManagerName = (rule, value, callback) => {
                let rex=/^[-_+.<>&0-9a-zA-Z]{1,32}$/i

                if(!rex.test(value)) {
                    callback(new Error(this.lang.check_diyname))
                    return false
                }else{
                    callback()
                }
            }

            var validateManagerPass = (rule, value, callback) => {
                let rex=/^[-_+.<>&0-9a-zA-Z]{4,32}$/i

                if(!rex.test(value)) {
                    callback(new Error(this.lang.check_diypwd))
                    return false
                }else{
                    callback()
                }
            }

            return {
                ruleForm: {
                    manager_name: '',
                    manager_pass: '',
                },
                rules: {
                    manager_name: [
                        { validator: validateManagerName, trigger: 'blur' }
                    ],
                    manager_pass: [
                        { validator: validateManagerPass, trigger: 'blur' }
                    ],
                },
                enabled: '',
                port: '5038',
                deny: '',
                permit: '',

                rights_val_options: [{
                    name: 'system',
                    read: false,
                    write: false,
                    read_disabled: false,
                    write_disabled: false
                },{
                    name: 'call',
                    read: false,
                    write: false,
                    read_disabled: false,
                    write_disabled: false
                },{
                    name: 'log',
                    read: false,
                    write: false,
                    read_disabled: false,
                    write_disabled: false
                },{
                    name: 'verbose',
                    read: false,
                    write: false,
                    read_disabled: false,
                    write_disabled: false
                },{
                    name: 'command',
                    read: false,
                    write: false,
                    read_disabled: true,
                    write_disabled: false
                },{
                    name: 'agent',
                    read: false,
                    write: false,
                    read_disabled: false,
                    write_disabled: false
                },{
                    name: 'user',
                    read: false,
                    write: false,
                    read_disabled: false,
                    write_disabled: false
                },{
                    name: 'config',
                    read: false,
                    write: false,
                    read_disabled: false,
                    write_disabled: false
                },{
                    name: 'dtmf',
                    read: false,
                    write: false,
                    read_disabled: false,
                    write_disabled: true
                },{
                    name: 'reporting',
                    read: false,
                    write: false,
                    read_disabled: false,
                    write_disabled: false
                },{
                    name: 'cdr',
                    read: false,
                    write: false,
                    read_disabled: false,
                    write_disabled: true
                },{
                    name: 'dialplan',
                    read: false,
                    write: false,
                    read_disabled: false,
                    write_disabled: true
                },{
                    name: 'originate',
                    read: false,
                    write: false,
                    read_disabled: true,
                    write_disabled: false
                }],

                all_read: false,
                all_write: false,

                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _general = data['_get']['_general']

                for(let i=0;i<_general['_read'].length;i++){
                    if(_general['_read'][i] == 1){

                    }
                }

                this.enabled = _general['_enabled'] == 1 ? true : false
                this.port = '5038'
                this.ruleForm.manager_name = _general['_username']
                this.ruleForm.manager_pass = _general['_secret']
                this.deny = _general['_deny'].substring(0,this.deny.length-1)
                this.permit = _general['_permit'].substring(0,this.permit.length-1)

                _general['_read'].split('').forEach((item,index) => {
                    this.rights_val_options[index].read = item == 1 ? true : false
                })

                _general['_write'].split('').forEach((item,index) => {
                    this.rights_val_options[index].write = item == 1 ? true : false
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
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
            Save(){
                const advastgeneral = new AST_AdvAstGeneral()

                advastgeneral._enabled = this.enabled == true ? 1 : 0
                advastgeneral._username = this.ruleForm.manager_name
                advastgeneral._secret = this.ruleForm.manager_pass
                advastgeneral._deny = this.deny
                advastgeneral._permit = this.permit

                let read = ''
                let write = ''
                this.rights_val_options.forEach(item => {
                    read += item.read ? '1' : '0'
                    write += item.write ? '1' : '0'
                })
                advastgeneral._write = write
                advastgeneral._read = read

                const AdvAstSave = new AST_AdvAstSave()
                AdvAstSave._general = advastgeneral

                this.request.AGAdvAstapiSave(this.save_succeed_back, this.save_error_back, AdvAstSave)
            },
            save_succeed_back(data){
                if(data['_result'] == 0){
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: 80
                    })
                }else{
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
            },

            All_read_change(){
                this.rights_val_options.forEach(item => {
                    if(!item.read_disabled){
                        item.read = this.all_read
                    }
                })
            },
            All_write_change(){
                this.rights_val_options.forEach(item => {
                    if(!item.write_disabled){
                        item.write = this.all_write
                    }
                })
            }
        },
        computed:{
            rights_options(){
                return [{
                    name: this.lang.system,
                    name_help: this.lang.system_help
                },{
                    name: this.lang.call,
                    name_help: this.lang.call_help
                },{
                    name: this.lang.log,
                    name_help: this.lang.log_help
                },{
                    name: this.lang.verbose,
                    name_help: this.lang.verbose_help
                },{
                    name: this.lang.command,
                    name_help: this.lang.command_help
                },{
                    name: this.lang.agent,
                    name_help: this.lang.agent_help
                },{
                    name: this.lang.user,
                    name_help: this.lang.user_help
                },{
                    name: this.lang.config,
                    name_help: this.lang.config_help,
                    read: false,
                    write: false,
                    read_disabled: false,
                    write_disabled: false
                },{
                    name: this.lang.dtmf,
                    name_help: this.lang.dtmf_help
                },{
                    name: this.lang.reporting,
                    name_help: this.lang.reporting_help
                },{
                    name: this.lang.cdr,
                    name_help: this.lang.cdr_help
                },{
                    name: this.lang.dialplan,
                    name_help: this.lang.dialplan_help
                },{
                    name: this.lang.originate,
                    name_help: this.lang.originate_help
                }]
            }
        },
        created() {
            this.debug = debuger('adv-astapi')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGAdvAstapiGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>