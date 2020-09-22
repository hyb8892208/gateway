<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                Wan Settings
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left"><h3>{{lang.wan_ipv4}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" open-delay="200">
                                <div slot="content" v-html="lang.interface_help"></div>
                                <span>{{lang.interface}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <span>{{interface}}</span>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" open-delay="200">
                                <div slot="content" v-html="lang.type_help"></div>
                                <span>{{lang.type}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="wan_type" style="width: 100%">
                                <el-option
                                    v-for="item in wan_type_options"
                                    :label="item.label"
                                    :key="item.value"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row v-if="wan_type != 3">
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" open-delay="200">
                                <div slot="content" v-html="lang.mac_help"></div>
                                <span>{{lang.mac}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="mac" disabled></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row v-if="wan_type == 1">
                <el-divider content-position="left"><h3>{{lang.ipv4_settings}}</h3></el-divider>

                <el-row>
                    <el-col :lg="12">
                        <el-form-item>
                            <label slot="label">
                                <el-tooltip placement="top" open-delay="200">
                                    <div slot="content" v-html="lang.address_help"></div>
                                    <span>{{lang.address}}</span>
                                </el-tooltip>:
                            </label>
                            <el-col :lg="18">
                                <el-input v-model="address"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :lg="12">
                        <el-form-item>
                            <label slot="label">
                                <el-tooltip placement="top" open-delay="200">
                                    <div slot="content" v-html="lang.netmask_help"></div>
                                    <span>{{lang.netmask}}</span>
                                </el-tooltip>:
                            </label>
                            <el-col :lg="18">
                                <el-input v-model="netmask"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :lg="12">
                        <el-form-item>
                            <label slot="label">
                                <el-tooltip placement="top" open-delay="200">
                                    <div slot="content" v-html="lang.default_gateway_help"></div>
                                    <span>{{lang.default_gateway}}</span>
                                </el-tooltip>:
                            </label>
                            <el-col :lg="18">
                                <el-input v-model="gateway"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>

        </el-card>
    </el-form>
</template>

<script>
    import {request} from "../../../network/request";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Wan",
        data(){
            return {
                interface: '',
                wan_type: '',
                mac: '',
                address: '',
                netmask: '',
                gateway: '',
                port_name: '',

                wan_type_options: [{
                    label: 'DHCP',
                    value: 2
                },{
                    label: 'Static',
                    value: 1
                },{
                    label: 'Disable',
                    value: 3
                }],

                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _wan = data['_get']['_wan']
                this.interface = _wan['_portname']
                this.wan_type = parseInt(_wan['_type'])
                this.mac = _wan['_mac']
                this.address = _wan['_ipaddr']
                this.netmask = _wan['_netmask']
                this.gateway = _wan['_gateway']
                this.portname = _wan['_portname']
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const networkwan = new AST_NetworkWan()
                networkwan._mac = this.mac
                networkwan._ipaddr = this.address
                networkwan._netmask = this.netmask
                networkwan._gateway = this.gateway
                networkwan._type = this.wan_type
                networkwan._portname = this.interface

                const NetworkWanSave = new AST_NetworkWanSave()
                NetworkWanSave._wan = networkwan

                console.log(NetworkWanSave)
                this.request.AGNetworkWanSave(this.save_succeed_back, this.save_error_back, NetworkWanSave)
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
            this.request = new request()
            this.request.AGNetworkWanGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>