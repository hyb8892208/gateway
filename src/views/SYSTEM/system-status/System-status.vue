<template>
    <el-form>
        <div class="page_title" style="margin-bottom: 0;border-bottom: 0;">
            <h1 style="line-height: 50px;font-size: 18px;">{{lang.port_status}}</h1>
        </div>

        <el-tabs v-model="activeName">
            <el-tab-pane :label="lang.port_information" name="Module" >
                <Analog :anaInfo="moduleData"
                        :key="Math.random()"></Analog>
            </el-tab-pane>

            <el-tab-pane :label="lang.sip_information" name="SIP">
                <SIP :sipInfo="sipData"
                     v-if="dataComplete"
                     :key="Math.random()"></SIP>
            </el-tab-pane>

            <el-tab-pane :label="lang.routing_information" name="Routing">
                <Routing :routingInfo="routingData"
                         v-if="dataComplete"
                         :key="Math.random()"></Routing>
            </el-tab-pane>

            <el-tab-pane :label="lang.network_information" name="Network">
                <Network :networkInfo="networkData"
                         v-if="dataComplete"
                         :key="Math.random()"></Network>
            </el-tab-pane>

            <el-tab-pane
                    v-if="show_vpn_tab"
                    :label="lang.vpn_information"
                    name="VPN">
                <VPN :vpnInfo="networkData"
                     v-if="dataComplete"
                     :key="Math.random()"></VPN>
            </el-tab-pane>
        </el-tabs>
    </el-form>
</template>

<script>
    import Analog from "./Analog";
    import SIP from "./SIP";
    import Routing from "./Routing";
    import Network from "./Network";
    import VPN from "./VPN";
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name:"System-status",
        components: {VPN, Network, Routing, SIP, Analog},
        data() {
            return {
                moduleData: null,
                sipData: null,
                routingData: null,
                networkData: null,

                dataComplete: false,

                debug: false,
                lang: this.$store.state.lang,
                show_vpn_tab: false,
                activeName: 'Module'
            }
        },
        methods: {
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                this.moduleData = data['_get']['_ana']['_item']
                this.sipData = data['_get']['_sip']['_item']
                this.routingData = data['_get']['_roules']['_item']
                this.networkData = data['_get']['_net']['_item']

                if(this.networkData[2]._ptpip != '' ||
                    this.networkData[3]._ptpip != '' ||
                    this.networkData[4]._ptpip != '' ||
                    this.networkData[5]._ptpip != ''
                ){
                    this.show_vpn_tab = true
                }

                this.dataComplete = true
            },
            show_error_back(data){
                this.$router.push('/common/error')
            },
        },
        created() {
            this.debug = debuger('system-status')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else{
                this.request.AGSystemStatusGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style>
    .el-tabs__nav-scroll{
        overflow: auto;
    }
</style>