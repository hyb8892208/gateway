<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.security_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" v-loading="loading" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.firewall_settings}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.firewall_enable_help"></span>
                    <span slot="param_name" >{{lang.firewall_enable}}</span>
                    <el-checkbox slot="param" v-model="firewall_enable"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.ping_enable_help"></span>
                    <span slot="param_name" >{{lang.ping_enable}}</span>
                    <el-checkbox slot="param" v-model="ping_enable"></el-checkbox>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.white_list_settings}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.white_list_enable_help"></span>
                    <span slot="param_name" >{{lang.white_list_enable}}</span>
                    <el-checkbox slot="param" v-model="white_list_enable" :disabled="!firewall_enable"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.list_ip_settings_help"></span>
                    <span slot="param_name" >{{lang.list_ip_settings}}</span>
                    <el-input slot="param" v-model="white_ip" type="textarea" :disabled="!firewall_enable || !white_list_enable"></el-input>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.black_list_settings}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.black_list_enable_help"></span>
                    <span slot="param_name" >{{lang.black_list_enable}}</span>
                    <el-checkbox slot="param" v-model="black_list_enable" :disabled="!firewall_enable"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.list_ip_settings_help"></span>
                    <span slot="param_name" >{{lang.list_ip_settings}}</span>
                    <el-input slot="param" v-model="black_ip" type="textarea" :disabled="!firewall_enable || !black_list_enable"></el-input>
                </form_item>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Security-settings",
        data(){
            return {
                firewall_enable: false,
                ping_enable: false,
                white_list_enable: false,
                white_ip: '',
                black_list_enable: false,
                black_ip: '',

                loading: false,
                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let data_temp = data['_get']['_firewall']
                this.firewall_enable = data_temp['_firewall'] == 0 ? true : false
                this.ping_enable = data_temp['_ping'] == 0 ? true : false
                this.white_list_enable = data_temp['_wenable'] == 0 ? true : false
                this.white_ip = data_temp['_wip']
                this.black_list_enable = data_temp['_benable'] == 0 ? true : false
                this.black_ip = data_temp['_bip']
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                this.loading = true

                const UcpNetworkSwitch  = new AST_UcpNetworkSwitch()

                UcpNetworkSwitch._firewall = this.firewall_enable == true ? 0 : 1
                UcpNetworkSwitch._ping = this.ping_enable == true ? 0 : 1
                UcpNetworkSwitch._wenable = this.white_list_enable == true ? 0 : 1
                UcpNetworkSwitch._wip = this.white_ip
                UcpNetworkSwitch._benable = this.black_list_enable == true ? 0 : 1
                UcpNetworkSwitch._bip = this.black_ip

                console.log(UcpNetworkSwitch)
                this.request.AGNetworkFirewallsave(this.save_succeed_back, this.save_error_back, UcpNetworkSwitch)
            },
            save_succeed_back(data){
                this.loading = false

                if(data['_result'] == 0) {
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
                this.loading = false

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: 80
                })
            }
        },
        created() {
            this.debug = debuger('network-security-settings')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGNetworkFirewallGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>