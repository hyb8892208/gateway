<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.security_rules}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>
            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.rule_name_help"></span>
                    <span slot="param_name" >{{lang.rule_name}}</span>
                    <el-input slot="param" v-model="rule_name"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.protocol_help"></span>
                    <span slot="param_name" >{{lang.protocol}}</span>
                    <el-select slot="param" v-model="protocol" style="width: 100%">
                        <el-option
                                v-for="item in protocol_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                </form_item>
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
                            <el-row :gutter="7">
                                <el-col :lg="12">
                                    <el-input v-model="port1" ></el-input>
                                </el-col>
                                <el-col :lg="12">
                                    <el-input v-model="port2" ></el-input>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.ip_mask_help"></div>
                                <span>{{lang.ip_mask}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-row :gutter="7">
                                <el-col :lg="12">
                                    <el-input v-model="ip" ></el-input>
                                </el-col>
                                <el-col :lg="12">
                                    <el-input v-model="mask" ></el-input>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.actions_help"></span>
                    <span slot="param_name" >{{lang.actions}}</span>
                    <el-select slot="param" v-model="actions" style="width: 100%">
                        <el-option
                                v-for="item in actions_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "add",
        data() {
            return {
                rule_name: '',
                protocol: '',
                port1: '',
                port2: '',
                ip: '',
                mask: '',
                actions: '',
                order: 0,

                protocol_options: [{
                    label: 'TCP',
                    value: 0
                },{
                    label: 'UDP',
                    value: 1
                },{
                    label: 'ICMP',
                    value: 2
                }],

                actions_options: [{
                    label: 'ACCEPT',
                    value: 0
                },{
                    label: 'DROP',
                    value: 1
                }],

                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _rules = data['_get']['_rules']

                this.rule_name = _rules['_name']
                this.protocol = parseInt(_rules['_proto'])
                this.port1 = _rules['_port1'] == 0 ? '' : _rules['_port1']
                this.port2 = _rules['_port2'] == 0 ? '' : _rules['_port2']
                this.ip = _rules['_ip']
                this.mask = _rules['_mask']
                this.actions = parseInt(_rules['_actions'])
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const UcpNetworkRules = new AST_UcpNetworkRules()

                UcpNetworkRules._name = this.rule_name
                UcpNetworkRules._proto = this.protocol
                UcpNetworkRules._port1 = this.port1 == '' ? 0 : this.port1
                UcpNetworkRules._port2 = this.port2 == '' ? 0 : this.port2
                UcpNetworkRules._ip = this.ip
                UcpNetworkRules._mask = this.mask
                UcpNetworkRules._actions = this.actions
                UcpNetworkRules._order = this.order

                let old_rule_name = this.$route.params.rule_name == undefined ? this.rule_name : this.$route.params.rule_name

                console.log(old_rule_name)
                console.log(this.rule_name)
                console.log(UcpNetworkRules)
                this.request.AGNetworkRulesSave(this.save_succeed_back, this.save_error_back, old_rule_name, this.rule_name, UcpNetworkRules)
            },
            save_succeed_back(data){
                if(data['_result'] == 0) {

                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: '80'
                    })

                    this.$router.push('/Network/Security-rules')
                }else{
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: '80'
                    })
                }
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
            this.debug = debuger('network-security-rules-edit')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGNetworkRulesGetOne(this.show_succeed_back, this.show_error_back, this.$route.params.rule_name)
            }
        }
    }
</script>

<style scoped>

</style>