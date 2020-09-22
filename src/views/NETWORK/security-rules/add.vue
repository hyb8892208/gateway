<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.create_a_rule}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>
            <el-divider content-position="left"><h3>{{lang.security_rules}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.rule_name_help"></div>
                                <span>{{lang.rule_name}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="rule_name" ></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.protocol_help"></div>
                                <span>{{lang.protocol}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="protocol" style="width: 100%">
                                <el-option
                                        v-for="item in protocol_options"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="22">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.port_help"></div>
                                <span>{{lang.port}}</span>
                            </el-tooltip>:
                        </label>
                        <el-row type="flex" class="row-bg" justify="start">
                            <el-col :lg="4" style="margin-right: 7px;">
                                <el-input v-model="port1" ></el-input>
                            </el-col>
                            <el-col :lg="4">
                                <el-input v-model="port2" ></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="22">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.ip_mask_help"></div>
                                <span>{{lang.ip_mask}}</span>
                            </el-tooltip>:
                        </label>
                        <el-row type="flex" class="row-bg" justify="begin">
                            <el-col :lg="4" style="margin-right: 7px;">
                                <el-input v-model="ip" ></el-input>
                            </el-col>
                            <el-col :lg="4">
                                <el-input v-model="mask" ></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.actions_help"></div>
                                <span>{{lang.actions}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="actions" style="width: 100%">
                                <el-option
                                    v-for="item in actions_options"
                                    :label="item.label"
                                    :key="item.value"
                                    :value="item.value"></el-option>
                            </el-select>
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
                console.log(data)

                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })

                this.$router.push('/Network/Security-rules')
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
            this.request.AGNetworkRulesGetOne(this.show_succeed_back, this.show_error_back, this.$route.params.rule_name)
        }
    }
</script>

<style scoped>

</style>