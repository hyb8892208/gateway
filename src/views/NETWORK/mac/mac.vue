<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.mac_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-row v-show="vlanflag != 0">
                <divider_item><span slot="title">Lan1</span></divider_item>
            </el-row>

            <el-row v-show="vlanflag != 0">
                <el-col :lg="24">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.mac_help + '<br/>' + lang.MAC_Tip"></div>
                                <span>{{lang.mac}}</span>
                            </el-tooltip>:
                        </label>
                        <el-row :gutter="20">
                            <el-col :lg="9">
                                <el-input v-model="wan_mac" @input="wan_change" :disabled="wan_old_mac == ''"></el-input>
                            </el-col>
                            <el-col :lg="9">
                                <span style="color: #FF0000" v-show="wan_tip_type === 0">{{lang.mac_tip}}</span>
                                <span style="color: #FF0000" v-show="wan_tip_type === 1">{{lang.mac_address_diff}} MAC:{{wan_old_mac}}</span>
                                <span style="color: #008100" v-show="wan_tip_type === 2">{{lang.mac_address_same}} MAC:{{wan_old_mac}}</span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>

            <divider_item><span slot="title">LAN2</span></divider_item>

            <el-row>
                <el-col :lg="24">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.mac_help + '<br/>' + lang.MAC_Tip"></div>
                                <span>{{lang.mac}}</span>
                            </el-tooltip>:
                        </label>
                        <el-row :gutter="20">
                            <el-col :lg="9">
                                <el-input v-model="lan_mac" @input="lan_change" ></el-input>
                            </el-col>
                            <el-col :lg="9">
                                <span style="color: #FF0000" v-show="lan_tip_type === 0">{{lang.mac_tip}}</span>
                                <span style="color: #FF0000" v-show="lan_tip_type === 1">{{lang.mac_address_diff}} MAC:{{lan_old_mac}}</span>
                                <span style="color: #008100" v-show="lan_tip_type === 2">{{lang.mac_address_same}} MAC:{{lan_old_mac}}</span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>

        <!-- 系统重启弹框 -->
        <el-dialog
                :title="lang.system_reboot"
                :visible.sync="reboot_dialogVisible"
                :close-on-click-modal=true
                :close-on-press-escape=false
                :before-close="rebootClose"
                id="system_reboot"
                :width="$store.state.page.dialog_width">
            <span>{{reboot_result}}</span>
        </el-dialog>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "mac",
        data(){
            return {
                lan_mac: '',
                wan_mac: '',
                lan_old_mac: '',
                wan_old_mac: '',

                reboot_timeout: 0,
                reboot_dialogVisible: false,
                reboot_result: '',

                lan_tip_type: '',//0 => Tip, 1 => Diff, 2 => Same
                wan_tip_type: '',//0 => Tip, 1 => Diff, 2 => Same

                vlanflag: 0,
                lang: this.$store.state.lang
            }
        },
        methods:{
            lan_change(){
                let rex=/^[0-9a-fA-F]{12}$/i
                if(!rex.test(this.lan_mac)){
                    this.lan_tip_type = 0
                    return false
                }

                if(this.lan_mac.toLowerCase() == this.lan_old_mac.toLowerCase()){
                    this.lan_tip_type = 2
                }else{
                    this.lan_tip_type = 1
                }
            },
            wan_change(){
                let rex=/^[0-9a-fA-F]{12}$/i
                if(!rex.test(this.wan_mac)){
                    this.wan_tip_type = 0
                    return false
                }

                if(this.wan_mac.toLowerCase() == this.wan_old_mac.toLowerCase()){
                    this.wan_tip_type = 2
                }else{
                    this.wan_tip_type = 1
                }
            },
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                this.lan_old_mac = data['_get']['_lanmac'].replace(/:/g, '')
                this.wan_old_mac = data['_get']['_wanmac'].replace(/:/g, '')
                this.vlanflag = data['_get']['_vlanflag']

                console.log(this.lan_old_mac)
                console.log(this.wan_old_mac)
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            Save(){
                if(this.lan_mac == ''){
                    this.lan_mac = null
                }

                if(this.wan_mac == ''){
                    this.wan_mac = null
                }

                this.request.AGNetworkBurnMac(this.save_succeed_back, this.save_error_back, this.lan_mac, this.wan_mac)

                //reboot loading
                this.reboot_dialogVisible = true
                this.loading = this.$loading({//在dialog容器中增加loading
                    lock: false,
                    text: this.lang.system_reboot_wait,
                    background: '#ffffff',
                    target: '#system_reboot .el-dialog',
                    body: false,
                })
            },
            save_succeed_back(data){
                if(data['_result'] == 0) {
                    this.$message({
                        message: 'Burn successfully',
                        type: 'success',
                        offset: 80
                    })

                    setTimeout(this.checkNetwork, 10000)
                }else{
                    this.$message({
                        message: 'Burn failed',
                        type: 'error',
                        offset: 80
                    })
                }
            },
            save_error_back(){
                this.$message({
                    message: 'Burn failed',
                    type: 'error',
                    offset: 80
                })
            },
            checkNetwork(){
                this.$axios.get('/service?action=reboot')
                    .then((res) => {
                        if(res.data == 1){
                            this.$router.push('/System/Status')
                        }
                    })
                    .catch((error) => {
                        if(this.reboot_timeout >= 300){
                            this.reboot_dialogVisible = false
                            this.reboot_result = this.lang.system_restart_timeout
                        }

                        this.reboot_timeout++
                        setTimeout(this.checkNetwork, 1000)
                    })
            },
            rebootClose(done){
                this.$confirm(this.lang.dialog_close_confirm)
                    .then(_ => {
                        this.reboot_dialogVisible = false
                    })
                    .catch(_ => {})
            },
        },
        created() {
            this.request.AGNetworkBurnMacGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>