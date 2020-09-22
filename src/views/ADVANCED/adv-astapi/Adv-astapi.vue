<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.asterisk_api}}
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
                                <div slot="content" v-html="lang.enable_help"></div>
                                <span>{{lang.enable}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="enabled"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.port_help"></div>
                                <span>{{lang.port}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <span>{{port}}</span>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.manager}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.manager_name_help"></div>
                                <span>{{lang.manager_name}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="manager_name"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.manager_secret_help"></div>
                                <span>{{lang.manager_secret}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="manager_pass"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.deny_help"></div>
                                <span>{{lang.deny}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="deny"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.permit_help"></div>
                                <span>{{lang.permit}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="permit"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.rights}}</h3></el-divider>

            <el-row>
                <el-col :lg="12" v-for="(item,index) in rights_val_options">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="rights_options[index].name_help"></div>
                                <span>{{rights_options[index].name}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="item.read"
                                         :disabled="item.read_disabled">{{lang.read}}</el-checkbox>
                            <el-checkbox v-model="item.write"
                                         :disabled="item.write_disabled">{{lang.write}}</el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.all_help"></div>
                                <span>{{lang.all}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="all_read" @change="All_read_change">{{lang.read}}</el-checkbox>
                            <el-checkbox v-model="all_write" @change="All_write_change">{{lang.write}}</el-checkbox>
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
        name: "Adv-astapi",
        data() {
            return {
                enabled: '',
                port: '5038',
                manager_name: '',
                manager_pass: '',
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
                this.manager_name = _general['_username']
                this.manager_pass = _general['_secret']
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

            Save(){
                const advastgeneral = new AST_AdvAstGeneral()

                advastgeneral._enabled = this.enabled == true ? 1 : 0
                advastgeneral._username = this.manager_name
                advastgeneral._secret = this.manager_pass
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

                console.log(AdvAstSave)
                this.request.AGAdvAstapiSave(this.save_succeed_back, this.save_error_back, AdvAstSave)
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
            this.request = new request()
            this.request.AGAdvAstapiGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>