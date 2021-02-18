<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.auto_provision_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-row>
                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.firmware_enable_help"></span>
                        <span slot="param_name" >{{lang.firmware_enable}}</span>
                        <el-checkbox slot="param" v-model="firmware_enable"></el-checkbox>
                    </form_item>
                </el-row>
            </el-row>

            <el-row>
                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.configuration_enable_help"></span>
                        <span slot="param_name" >{{lang.configuration_enable}}</span>
                        <el-checkbox slot="param" v-model="configuration_enable"></el-checkbox>
                    </form_item>
                </el-row>
            </el-row>

            <el-row>
                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.dhcp_option_66_help"></span>
                        <span slot="param_name" >{{lang.dhcp_option_66}}</span>
                        <el-checkbox slot="param" v-model="dhcp_option_66"></el-checkbox>
                    </form_item>
                </el-row>
            </el-row>

            <el-row>
                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.auto_config_server_url_help"></span>
                        <span slot="param_name" >{{lang.auto_config_server_url}}</span>
                        <el-input slot="param" v-model="auto_config_server_url" :disabled="dhcp_option_66"></el-input>
                    </form_item>
                </el-row>
            </el-row>

            <el-row>
                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.upgrade_mode_help"></span>
                        <span slot="param_name" >{{lang.upgrade_mode}}</span>
                        <el-select slot="param" v-model="upgrade_mode" :disabled="dhcp_option_66">
                            <el-option
                                    v-for="item in upgrade_mode_options"
                                    :label="item.label"
                                    :key="item.value"
                                    :value="item.value"></el-option>
                        </el-select>
                    </form_item>
                </el-row>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Adv-autoprovision",
        data(){
            return {
                firmware_enable: '',
                configuration_enable: '',
                dhcp_option_66: '',
                auto_config_server_url: '',
                upgrade_mode: '',

                upgrade_mode_options: [{
                    label: 'Power On',
                    value: 0
                },{
                    label: 'Immediately',
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

                let autodata = data['_get']['_autoupdate']
                this.firmware_enable = autodata['_enable'] == 1 ? true : false
                this.configuration_enable = autodata['_cfgenable'] == 1 ? true : false
                this.dhcp_option_66 = autodata['_dhcpoption66'] == 1 ? true : false
                this.auto_config_server_url = autodata['_serverurl']
                this.upgrade_mode = parseInt(autodata['_mode'])
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            Save(){
                let AutoProvisionSave = new AST_AutoProvisionSave()

                if(this.dhcp_option_66){
                    this.upgrade_mode = 0
                }

                let AutoProvision = new AST_AutoProvision()
                AutoProvision._enable = this.firmware_enable ? 1 : 0
                AutoProvision._cfgenable = this.configuration_enable ? 1 : 0
                AutoProvision._dhcpoption66 = this.dhcp_option_66 ? 1 : 0
                AutoProvision._serverurl = this.auto_config_server_url
                AutoProvision._mode = this.upgrade_mode

                AutoProvisionSave._autoupdate = AutoProvision

                this.request.AGSystemAutoUpdateSave(this.save_succeed_back, this.save_error_back, AutoProvisionSave)
            },
            save_succeed_back(data){
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
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: 80
                })
            }
        },
        created() {
            this.debug = debuger('adv-autoprovision')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGSystemAutoUpdateGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>