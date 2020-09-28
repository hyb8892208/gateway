<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.security_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left"><h3>{{lang.firewall_settings}}</h3></el-divider>

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

            <el-divider content-position="left"><h3>{{lang.white_list_settings}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.white_list_enable_help"></span>
                    <span slot="param_name" >{{lang.white_list_enable}}</span>
                    <el-checkbox slot="param" v-model="white_list_enable"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.list_ip_settings_help"></span>
                    <span slot="param_name" >{{lang.list_ip_settings}}</span>
                    <el-input slot="param" v-model="white_ip" type="textarea"></el-input>
                </form_item>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.black_list_settings}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.black_list_enable_help"></span>
                    <span slot="param_name" >{{lang.black_list_enable}}</span>
                    <el-checkbox slot="param" v-model="black_list_enable"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.list_ip_settings_help"></span>
                    <span slot="param_name" >{{lang.list_ip_settings}}</span>
                    <el-input slot="param" v-model="black_ip" type="textarea"></el-input>
                </form_item>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

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
            this.request.AGNetworkFirewallGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>