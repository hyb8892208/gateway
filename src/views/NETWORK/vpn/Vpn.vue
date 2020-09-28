<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.openvpn_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left"><h3>{{lang.vpn_settings}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.vpntype_help"></span>
                    <span slot="param_name" >{{lang.vpntype}}</span>
                    <el-select v-model="vpn_type"
                               slot="param"
                               size="small"
                               @change="vpn_change"
                               style="width: 100%;">
                        <el-option
                                v-for="(item,index) in vpn_options"
                                :key="item.value"
                                :value="index"
                                :label="lang[item.value]"
                        ></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <component :is="current_components" :parent_data="vpn_data" ref="child_vpn"></component>

            <el-row v-if="current_components != ''">
                <form_item>
                    <span slot="param_help" v-html="lang.connection_status_help"></span>
                    <span slot="param_name" >{{lang.connection_status}}</span>
                    <div slot="param">
                        <span v-for="(item,index) in vpn_options">
                            <span v-if="vpn_type == index">
                                <i class="el-icon-loading" v-show="item.connection_status_icon" style="font-size: 20px;"></i>
                                <span v-show="!item.connection_status_icon">
                                    <b v-if="item.connection_status === 1" style="color: #67C23A;">{{lang.connected}}</b>
                                    <b v-else-if="item.connection_status === 0" style="color: #F56C6C;">{{lang.failed_to_connect}}</b>
                                </span>
                            </span>
                        </span>
                    </div>
                </form_item>
            </el-row>

        </el-card>

    </el-form>
</template>

<script>
    import {request} from "../../../network/request";

    import OpenVpn from "./OpenVpn";
    import PPTPVpn from "./PPTPVpn";
    import L2TPVpn from "./L2TPVpn";
    import ZeroVpn from "./ZeroVpn";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Vpn",
        components: {OpenVpn,PPTPVpn,L2TPVpn,ZeroVpn},
        data(){
            return {
                vpn_type: '',
                current_components: '',
                connection_timeout: 0,
                vpn_data: [],

                vpn_options: [{
                    value: 'none',
                    connection_status: '',
                    connection_status_icon: false
                },{
                    value: 'pptpvpn',
                    connection_status: '',
                    connection_status_icon: false
                },{
                    value: 'openvpn',
                    connection_status: '',
                    connection_status_icon: false
                },{
                    value: 'zerovpn',
                    connection_status: '',
                    connection_status_icon: false
                },{
                    value: 'l2tpvpn',
                    connection_status: '',
                    connection_status_icon: false
                }],

                lang: this.$store.state.lang
            }
        },
        methods: {
            vpn_change(val){
                switch (val) {
                    case 1:
                        this.current_components = 'PPTPVpn'
                        break
                    case 2:
                        this.current_components = 'OpenVpn'
                        break
                    case 3:
                        this.current_components = 'ZeroVpn'
                        break
                    case 4:
                        this.current_components = 'L2TPVpn'
                        break
                    default:
                        this.current_components = ''
                        break
                }
            },
            show_succeed_back(data){
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                this.vpn_data = data['_get']['_vpn']

                this.vpn_type = parseInt(this.vpn_data['_vpntype'])

                this.pptpServer = this.vpn_data['_pptpServer']
                this.pptpAccount = this.vpn_data['_pptpAccount']
                this.pptpPasswd = this.vpn_data['_pptpPasswd']
                this.pptpDomain = this.vpn_data['_pptpDomain']
                this.pptpMppe = this.vpn_data['_pptpMppe']

                this.openvpnPasswd = this.vpn_data['_openvpnPasswd']
                this.openvpnUsername = this.vpn_data['_openvpnUsername']
                this.openvpnServer = this.vpn_data['_openvpnServer']
                this.openvpnPort = this.vpn_data['_openvpnPort']
                this.openvpnEncSw = this.vpn_data['_openvpnEncSw']

                this.zerovpnNetworkID = this.vpn_data['_zerovpnNetworkID']

                this.l2tpvpnServer = this.vpn_data['_l2tpvpnServer']
                this.l2tpvpnUsername = this.vpn_data['_l2tpvpnUsername']
                this.l2tpvpnPasswd = this.vpn_data['_l2tpvpnPasswd']
                this.l2tpvpnIpsecPasswd = this.vpn_data['_l2tpvpnIpsecPasswd']
                this.l2tpvpnSw = this.vpn_data['_l2tpvpnSw']
                this.l2tpvpnIpsecSw = this.vpn_data['_l2tpvpnIpsecSw']

                //第一次打开页面的时候请求连接状态，要在页面数据请求完成之后
                this.get_connection_status('first')

                this.vpn_change(this.vpn_type)
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                let save_data = this.$refs.child_vpn//从当前选择的子组件中取数据

                let NetworkOpenvpn = new AST_NetworkOpenvpn()
                NetworkOpenvpn._vpntype = this.vpn_type

                NetworkOpenvpn._pptpServer = this.vpn_type == 1 ? save_data.server : this.pptpServer
                NetworkOpenvpn._pptpAccount = this.vpn_type == 1 ? save_data.account : this.pptpAccount
                NetworkOpenvpn._pptpPasswd = this.vpn_type == 1 ? save_data.password : this.pptpPasswd
                NetworkOpenvpn._pptpDomain = this.vpn_type == 1 ? save_data.domain : this.pptpDomain
                NetworkOpenvpn._pptpMppe = this.vpn_type == 1 ? (save_data.mppe == true ? 1 : 0) : (this.pptpMppe == true ? 1 : 0)

                NetworkOpenvpn._openvpnEncSw = this.vpn_type == 2 ? (save_data.sw == true ? 1 : 0) : (this.openvpnEncSw == true ? 1 : 0)
                NetworkOpenvpn._openvpnUsername = this.vpn_type == 2 ? save_data.account : this.openvpnUsername
                NetworkOpenvpn._openvpnPasswd = this.vpn_type == 2 ? save_data.password : this.openvpnPasswd
                NetworkOpenvpn._openvpnServer = this.vpn_type == 2 ? save_data.server_ip : this.openvpnServer
                NetworkOpenvpn._openvpnPort = this.vpn_type == 2 ? save_data.server_port : this.openvpnPort

                NetworkOpenvpn._zerovpnNetworkID = this.vpn_type == 3 ? save_data.network_id : this.zerovpnNetworkID

                NetworkOpenvpn._l2tpvpnSw = this.vpn_type == 4 ? (save_data.enable == true ? 1 : 0) : (this.l2tpvpnSw == true ? 1 : 0)
                NetworkOpenvpn._l2tpvpnServer = this.vpn_type == 4 ? save_data.server : this.l2tpvpnServer
                NetworkOpenvpn._l2tpvpnUsername = this.vpn_type == 4 ? save_data.username : this.l2tpvpnUsername
                NetworkOpenvpn._l2tpvpnPasswd = this.vpn_type == 4 ? save_data.password : this.l2tpvpnPasswd
                NetworkOpenvpn._l2tpvpnIpsecSw = this.vpn_type == 4 ? (save_data.ipsec == true ? 1 : 0) : (this.l2tpvpnIpsecSw == true ? 1 : 0)
                NetworkOpenvpn._l2tpvpnIpsecPasswd = this.vpn_type == 4 ? save_data.ipsec_password : this.l2tpvpnIpsecPasswd

                console.log(NetworkOpenvpn)
                this.request.AGNetworkOpenvpnSave(this.save_succeed_back, this.save_error_back, NetworkOpenvpn)

                this.vpn_options[this.vpn_type].connection_status_icon = true
                this.get_connection_status('save')
            },
            save_succeed_back(data){

            },
            save_error_back(){

            },
            get_connection_status(action){
                this.connect_type = ''
                switch(this.vpn_type){
                    case 1:
                        this.connect_type = 'pptpvpn'
                        break
                    case 2:
                        this.connect_type = 'openvpn'
                        break
                    case 3:
                        this.connect_type = 'zerovpn'
                        break
                    case 4:
                        this.connect_type = 'l2tpvpn'
                        break
                    default:
                        break
                }

                if(action == 'first'){
                    this.request.AGNetworkVPNGetConnectStatus(this.first_connect_succeed_back, this.first_connect_error_back, this.connect_type)
                }else{
                    this.request.AGNetworkVPNGetConnectStatus(this.save_connect_succeed_back, this.save_connect_error_back, this.connect_type)
                }
            },
            first_connect_succeed_back(data){
                this.vpn_options[this.vpn_type].connection_status = data['_connectsta']
            },
            first_connect_error_back(){
                this.vpn_options[this.vpn_type].connection_status = 0
            },

            save_connect_succeed_back(data){
                if(data['_connectsta'] == 1){
                    this.vpn_options[this.vpn_type].connection_status_icon = false
                    this.vpn_options[this.vpn_type].connection_status = data['_connectsta']
                }else if(this.connection_timeout < 30){
                    this.connection_timeout++
                    this.timeoutID = setTimeout(() => {
                        this.request.AGNetworkVPNGetConnectStatus(this.save_connect_succeed_back, this.save_connect_error_back, this.connect_type)
                    }, 1000)
                }else if(this.connection_timeout >= 30){
                    this.vpn_options[this.vpn_type].connection_status_icon = false
                    this.vpn_options[this.vpn_type].connection_status = 0
                }

                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })
            },
            save_connect_error_back(){
                this.vpn_options[this.vpn_type].connection_status_icon = false
                this.vpn_options[this.vpn_type].connection_status = 0

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },
        created() {
            this.request = new request()
            this.request.AGNetworkOpenvpnGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>