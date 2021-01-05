<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            :rules="rules"
            :model="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.basic_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="submitValidator('ruleForm')">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.network_type}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.network_type_help"></span>
                    <span slot="param_name" >{{lang.network_type}}</span>
                    <el-select slot="param" v-model="network_type" style="width: 100%">
                        <el-option
                                v-for="item in network_type_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row v-if="network_type == 1">

                <divider_item><span slot="title">{{lang.lan1_settings}}</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.type_help"></span>
                        <span slot="param_name" >{{lang.type}}</span>
                        <el-select slot="param" v-model="wan_type" style="width: 100%">
                            <el-option
                                    v-for="item in wan_type_options"
                                    :label="lang[item.label]"
                                    :key="item.value"
                                    :value="item.value"></el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.mac_help"></span>
                        <span slot="param_name" >{{lang.mac}}</span>
                        <el-input slot="param" v-model="wan_mac" disabled></el-input>
                    </form_item>
                </el-row>

                <el-row v-show="wan_type != 2">
                    <form_item v-bind:param="'wan_ipaddr'">
                        <span slot="param_help" v-html="lang.address_help"></span>
                        <span slot="param_name" >{{lang.address}}</span>
                        <el-input slot="param" v-model="ruleForm.wan_ipaddr"></el-input>
                    </form_item>
                </el-row>

                <el-row v-show="wan_type != 2">
                    <form_item v-bind:param="'wan_mask'">
                        <span slot="param_help" v-html="lang.netmask_help"></span>
                        <span slot="param_name" >{{lang.netmask}}</span>
                        <el-input slot="param" v-model="ruleForm.wan_mask"></el-input>
                    </form_item>
                </el-row>

                <el-row v-show="wan_type != 2">
                    <form_item v-bind:param="'wan_gateway'">
                        <span slot="param_help" v-html="lang.default_gateway_help"></span>
                        <span slot="param_name" >{{lang.default_gateway}}</span>
                        <el-input slot="param" v-model="ruleForm.wan_gateway"></el-input>
                    </form_item>
                </el-row>
            </el-row>

            <divider_item><span slot="title">{{lang.lan2_settings}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.type_help"></span>
                    <span slot="param_name" >{{lang.type}}</span>
                    <el-select slot="param" v-model="lan_type" @change="Lan_type_change" style="width: 100%">
                        <el-option
                                v-for="item in lan_type_options"
                                :label="lang[item.label]"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.mac_help"></span>
                    <span slot="param_name" >{{lang.mac}}</span>
                    <el-input slot="param" v-model="lan_mac" disabled></el-input>
                </form_item>
            </el-row>

            <el-row v-show="lan_type != 2">
                <form_item v-bind:param="'lan_ipaddr'">
                    <span slot="param_help" v-html="lang.address_help"></span>
                    <span slot="param_name" >{{lang.address}}</span>
                    <el-input slot="param" v-model="ruleForm.lan_ipaddr" :readonly="lan_type == 0" :disabled="lan_type == 0"></el-input>
                </form_item>
            </el-row>

            <el-row v-show="lan_type != 2">
                <form_item v-bind:param="'lan_mask'">
                    <span slot="param_help" v-html="lang.netmask_help"></span>
                    <span slot="param_name" >{{lang.netmask}}</span>
                    <el-input slot="param" v-model="ruleForm.lan_mask" :readonly="lan_type == 0" :disabled="lan_type == 0"></el-input>
                </form_item>
            </el-row>

            <el-row v-show="lan_type != 2">
                <form_item v-bind:param="'lan_gateway'">
                    <span slot="param_help" v-html="lang.default_gateway_help"></span>
                    <span slot="param_name" >{{lang.default_gateway}}</span>
                    <el-input slot="param" v-model="ruleForm.lan_gateway" :readonly="lan_type == 0" :disabled="lan_type == 0"></el-input>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.dns_server}}</span></divider_item>

            <el-row>
                <form_item v-bind:param="'dns1'">
                    <span slot="param_help" v-html="lang.dns_server"></span>
                    <span slot="param_name" >{{lang.dns_server}} 1</span>
                    <el-input slot="param" v-model="ruleForm.dns1"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'dns2'">
                    <span slot="param_help" v-html="lang.dns_server"></span>
                    <span slot="param_name" >{{lang.dns_server}} 2</span>
                    <el-input slot="param" v-model="ruleForm.dns2"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'dns3'">
                    <span slot="param_help" v-html="lang.dns_server"></span>
                    <span slot="param_name" >{{lang.dns_server}} 3</span>
                    <el-input slot="param" v-model="ruleForm.dns3"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'dns4'">
                    <span slot="param_help" v-html="lang.dns_server"></span>
                    <span slot="param_name" >{{lang.dns_server}} 4</span>
                    <el-input slot="param" v-model="ruleForm.dns4"></el-input>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.reserved_access_ip}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.enable_help"></span>
                    <span slot="param_name" >{{lang.enable}}</span>
                    <el-checkbox slot="param" v-model="rswitch"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.reserved_address_help"></span>
                    <span slot="param_name" >{{lang.reserved_address}}</span>
                    <el-input slot="param" v-model="reserved_ip" :readonly=true disabled ></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.reserved_netmask_help"></span>
                    <span slot="param_name" >{{lang.reserved_netmask}}</span>
                    <el-input slot="param" v-model="reserved_mask" :readonly=true disabled ></el-input>
                </form_item>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "VLan",
        data(){
            var rex=/^((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\.){3}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)$/i

            var validateLan_ipaddr = (rule, value, callback) => {
                if(this.lan_type == 1) {
                    if(!rex.test(value)){
                        callback(new Error(this.lang.check_domain))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }

            var validateLan_gateway = (rule, value, callback) => {
                if(this.lan_type == 1){
                    if(value == ''){
                        callback()
                    }else if(!rex.test(value)){
                        callback(new Error(this.lang.check_domain))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }

            var validateWan_ipaddr = (rule, value, callback) => {
                if(this.wan_type == 1){
                    if(!rex.test(value)){
                        callback(new Error(this.lang.check_domain))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }

            var validateWan_gateway = (rule, value, callback) => {
                if(this.wan_type == 1){
                    if(value == ''){
                        callback()
                    }else if(!rex.test(value)){
                        callback(new Error(this.lang.check_domain))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }

            var validateDns = (rule, value, callback) => {
                if(value == ''){
                    callback()
                }else if(!rex.test(value)){
                    callback(new Error(this.lang.check_domain))
                }else{
                    callback()
                }
            }
            return {
                ruleForm: {
                    lan_ipaddr: '',
                    lan_mask: '',
                    lan_gateway: '',
                    wan_ipaddr: '',
                    wan_mask: '',
                    wan_gateway: '',
                    dns1: '',
                    dns2: '',
                    dns3: '',
                    dns4: '',
                },
                rules: {
                    lan_ipaddr: [ {validator: validateLan_ipaddr, trigger: 'blur' } ],
                    lan_mask: [ {validator: validateLan_ipaddr, trigger: 'blur' } ],
                    lan_gateway: [ {validator: validateLan_gateway, trigger: 'blur' } ],
                    wan_ipaddr: [ {validator: validateWan_ipaddr, trigger: 'blur' } ],
                    wan_mask: [ {validator: validateWan_ipaddr, trigger: 'blur' } ],
                    wan_gateway: [ {validator: validateWan_gateway, trigger: 'blur' } ],
                    dns1: [ {validator: validateDns, trigger: 'blur' } ],
                    dns2: [ {validator: validateDns, trigger: 'blur' } ],
                    dns3: [ {validator: validateDns, trigger: 'blur' } ],
                    dns4: [ {validator: validateDns, trigger: 'blur' } ],
                },
                network_type: '',

                //lan
                lan_interface: '',
                lan_type: '',
                lan_mac: '',
                lan_ipaddr: '',
                lan_old_ipaddr: '',
                lan_mask: '',
                lan_old_mask: '',
                lan_gateway: '',
                lan_old_gateway: '',

                //wan
                wan_interface: '',
                wan_type: '',
                wan_mac: '',
                wan_ipaddr: '',
                wan_mask: '',
                wan_gateway: '',

                dns1: '',
                dns2: '',
                dns3: '',
                dns4: '',

                factory_ipaddr: '172.16.99.',
                factory_mask: '255.255.0.0',
                factory_gw: '172.16.0.1',

                rswitch: '',
                reserved_ip: '192.168.99.',
                reserved_mask: '255.255.255.0',

                network_type_options:[{
                    label: 'Switch',
                    value: 0
                },{
                    label: 'Dual',
                    value: 1
                }],

                lan_type_options: [{
                    label: 'factory',
                    value: 0
                },{
                    label: 'static',
                    value: 1
                },{
                    label: 'DHCP',
                    value: 2
                }],

                wan_type_options: [{
                    label: 'static',
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

                let lan_data = data['_get']['_lan']
                let wan_data = data['_get']['_wan']
                let dns_data = data['_get']['_dns']
                let stacknum = data['_get']['_stacknum']
                if(stacknum == 0)
                    stacknum = 1

                this.network_type = parseInt(data['_get']['_networktype'])

                //lan
                this.lan_interface = lan_data['_portname'] == '' ? 'lan' : lan_data['_portname']
                this.lan_type = parseInt(lan_data['_type'])
                this.lan_mac = lan_data['_mac']
                this.ruleForm.lan_ipaddr = lan_data['_ipaddr']
                this.lan_old_ipaddr = lan_data['_ipaddr']
                this.ruleForm.lan_mask = lan_data['_netmask']
                this.lan_old_mask = lan_data['_netmask']
                this.ruleForm.lan_gateway = lan_data['_gateway']
                this.lan_old_gateway = lan_data['_gateway']
                if(this.lan_type == 0){
                    this.ruleForm.lan_ipaddr = this.factory_ipaddr += stacknum
                    this.ruleForm.lan_mask = this.factory_mask
                    this.ruleForm.lan_gateway = this.factory_gw
                }

                //wan
                this.wan_interface = wan_data['_portname'] == '' ? 'wan' : wan_data['_portname']
                this.wan_type = parseInt(wan_data['_type'])
                this.wan_mac = wan_data['_mac']
                this.ruleForm.wan_ipaddr = wan_data['_ipaddr']
                this.ruleForm.wan_mask = wan_data['_netmask']
                this.ruleForm.wan_gateway = wan_data['_gateway']

                this.ruleForm.dns1 = dns_data['_dns1']
                this.ruleForm.dns2 = dns_data['_dns2']
                this.ruleForm.dns3 = dns_data['_dns3']
                this.ruleForm.dns4 = dns_data['_dns4']

                this.rswitch = lan_data['_rswitch'] == 1 ? true : false
                this.reserved_ip += stacknum

                this.factory_ipaddr += stacknum

                if(data['_get']['_vlanflag'] == 0){
                    this.network_type_options = [{
                        label: 'Switch',
                        value: 0
                    }]
                }
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            Lan_type_change(){
                if(this.lan_type == 0){
                    this.ruleForm.lan_ipaddr = this.factory_ipaddr
                    this.ruleForm.lan_mask = this.factory_mask
                    this.ruleForm.lan_gateway = this.factory_gw
                }else{
                    this.ruleForm.lan_ipaddr = this.lan_old_ipaddr
                    this.ruleForm.lan_mask = this.lan_old_mask
                    this.ruleForm.lan_gateway = this.lan_old_gateway
                }
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
                const NetworkLan = new AST_NetworkLan()
                NetworkLan._mac = this.lan_mac
                NetworkLan._ipaddr = this.ruleForm.lan_ipaddr
                NetworkLan._netmask = this.ruleForm.lan_mask
                NetworkLan._gateway = this.ruleForm.lan_gateway
                NetworkLan._type = this.lan_type
                NetworkLan._portname = this.lan_interface

                const NetworkWan = new AST_NetworkWan()
                NetworkWan._mac = this.wan_mac
                NetworkWan._ipaddr = this.ruleForm.wan_ipaddr
                NetworkWan._netmask = this.ruleForm.wan_mask
                NetworkWan._gateway = this.ruleForm.wan_gateway
                NetworkWan._type = this.wan_type
                NetworkWan._portname = this.wan_interface

                const NetworkDns = new AST_NetworkDns()
                NetworkDns._dns1 = this.ruleForm.dns1
                NetworkDns._dns2 = this.ruleForm.dns2
                NetworkDns._dns3 = this.ruleForm.dns3
                NetworkDns._dns4 = this.ruleForm.dns4

                NetworkLan._rswitch = this.rswitch == true ? 1 : 0

                const NetworkSave = new AST_NetworkSave()
                NetworkSave._networktype = this.network_type
                NetworkSave._lan = NetworkLan
                NetworkSave._wan = NetworkWan
                NetworkSave._dns = NetworkDns

                console.log(NetworkSave)
                this.request.AGNetworkSave(this.save_succeed_back, this.save_error_back, NetworkSave)

                if(this.ruleForm.lan_ipaddr != this.lan_old_ipaddr){
                    setTimeout(() => {window.location.href=window.location.protocol+"//"+this.ruleForm.lan_ipaddr;},500);
                }
            },
            save_succeed_back(data){
                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })
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
            this.request.AGNetworkGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>