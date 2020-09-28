<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.lan_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left"><h3>{{lang.lan_ipv4}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.interface_help"></span>
                    <span slot="param_name" >{{lang.interface}}</span>
                    <span slot="param">{{interface}}</span>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.type_help"></span>
                    <span slot="param_name" >{{lang.type}}</span>
                    <el-select slot="param" v-model="lan_type" @change="lan_type_change" style="width: 100%">
                        <el-option
                                v-for="item in type_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.mac_help"></span>
                    <span slot="param_name" >{{lang.mac}}</span>
                    <el-input slot="param" v-model="mac" disabled></el-input>
                </form_item>
            </el-row>

            <el-row v-if="lan_type != 2">
                <el-divider content-position="left"><h3>{{lang.ipv4_settings}}</h3></el-divider>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.address_help"></span>
                        <span slot="param_name" >{{lang.address}}</span>
                        <el-input slot="param" v-model="address" :readonly="address_readonly"></el-input>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.netmask_help"></span>
                        <span slot="param_name" >{{lang.netmask}}</span>
                        <el-input slot="param" v-model="netmask" :readonly="netmask_readonly"></el-input>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.default_gateway_help"></span>
                        <span slot="param_name" >{{lang.default_gateway}}</span>
                        <el-input slot="param" v-model="gateway" :readonly="gateway_readonly"></el-input>
                    </form_item>
                </el-row>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.dns_server}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.dns_server"></span>
                    <span slot="param_name" >{{lang.dns_server}} 1</span>
                    <el-input slot="param" v-model="dns1"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.dns_server"></span>
                    <span slot="param_name" >{{lang.dns_server}} 2</span>
                    <el-input slot="param" v-model="dns2"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.dns_server"></span>
                    <span slot="param_name" >{{lang.dns_server}} 3</span>
                    <el-input slot="param" v-model="dns3"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.dns_server"></span>
                    <span slot="param_name" >{{lang.dns_server}} 4</span>
                    <el-input slot="param" v-model="dns4"></el-input>
                </form_item>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.reserved_access_ip}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.enable_help"></span>
                    <span slot="param_name" >{{lang.enable}}</span>
                    <el-checkbox slot="param" v-model="reserved_sw"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.enable_help"></span>
                    <span slot="param_name" >{{lang.enable}}</span>
                    <el-checkbox slot="param" v-model="reserved_sw"></el-checkbox>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.reserved_address_help"></span>
                    <span slot="param_name" >{{lang.reserved_address}}</span>
                    <el-input slot="param" v-model="reserved_ip" :readonly=true></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.reserved_netmask_help"></span>
                    <span slot="param_name" >{{lang.reserved_netmask}}</span>
                    <el-input slot="param" v-model="reserved_mask" :readonly=true></el-input>
                </form_item>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {request} from "../../../network/request";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Lan",
        data() {
            return {
                interface: '',
                lan_type: '',
                mac: '',

                address: '',
                netmask: '',
                gateway: '',
                address_readonly: false,
                netmask_readonly: false,
                gateway_readonly: false,

                address_val: '',
                netmask_val: '',
                gateway_val: '',

                factory_ip: '',
                factory_mask: '255.255.0.0',
                factory_gw: '172.16.0.1',

                dns1: '',
                dns2: '',
                dns3: '',
                dns4: '',
                reserved_sw: '',
                reserved_ip: '',
                reserved_mask: '255.255.255.0',

                type_options: [{
                    label: 'Factory',
                    value: 0
                },{
                    label: 'Static',
                    value: 1
                },{
                    label: 'DHCP',
                    value: 2
                }],

                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _lan = data['_get']['_lan']
                let _dns = data['_get']['_dns']

                this.interface = _lan['_portname']
                this.lan_type = parseInt(_lan['_type'])
                this.mac = _lan['_mac']
                this.address = _lan['_ipaddr']
                this.netmask = _lan['_netmask']
                this.gateway = _lan['_gateway']
                this.address_val = _lan['_ipaddr']
                this.netmask_val = _lan['_netmask']
                this.gateway_val = _lan['_gateway']
                this.factory_ip = '172.16.99.'+data['_get']['_stacknum']
                this.dns1 = _dns['_dns1']
                this.dns2 = _dns['_dns2']
                this.dns3 = _dns['_dns3']
                this.dns4 = _dns['_dns4']
                this.reserved_sw = _lan['_rswitch'] == 1 ? true : false
                this.reserved_ip = '192.168.99.'+data['_get']['_stacknum']
                this.reserved_mask = '255.255.255.0'
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const networklan = new AST_NetworkLan()
                networklan._mac = this.mac
                networklan._ipaddr = this.address
                networklan._netmask = this.netmask
                networklan._gateway = this.gateway
                networklan._type = this.lan_type
                networklan._rswitch = this.reserved_sw == true ? 1 : 0
                networklan._portname = this.interface

                const networkdns = new AST_NetworkDns()
                networkdns._dns1 = this.dns1
                networkdns._dns2 = this.dns2
                networkdns._dns3 = this.dns3
                networkdns._dns4 = this.dns4

                const NetworkLanSave = new AST_NetworkLanSave()
                NetworkLanSave._lan = networklan
                NetworkLanSave._dns = networkdns

                this.request.AGNetworkLanSave(this.save_succeed_back, this.save_error_back, NetworkLanSave)

                setTimeout(() => {window.location.href=window.location.protocol+"//"+this.address;},500);
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

            lan_type_change(val){
                if(val == 0){
                    this.address = this.factory_ip
                    this.netmask = this.factory_mask
                    this.gateway = this.factory_gw
                    this.address_readonly = true
                    this.netmask_readonly = true
                    this.gateway_readonly = true
                }else if(val == 1){
                    this.address = this.address_val
                    this.netmask = this.netmask_val
                    this.gateway = this.gateway_val
                    this.address_readonly = false
                    this.netmask_readonly = false
                    this.gateway_readonly = false
                }
            }
        },
        created() {
            this.request = new request()
            this.request.AGNetworkLanGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>