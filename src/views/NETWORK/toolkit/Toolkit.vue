<template>
    <el-form :label-position="$store.state.page.labelPosition"
             label-width="250px"
             class="change-label-class"
             size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.toolkit}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button style="vertical-align:middle;"
                               type="primary"
                               size="small"
                               @click="Start"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.ping_and_traceroute}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.interface_help"></span>
                    <span slot="param_name" >{{lang.interface}}</span>
                    <el-select slot="param" v-model="interface_value" :placeholder="lang.select_placeholder" style="width: 100%;">
                        <el-option
                                v-for="item in interface_value_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    Ping
                                </div>
                                <span>Ping</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-row :gutter="10">
                                <el-col :lg="17">
                                    <el-input v-model="ping_value" type="mini"></el-input>
                                </el-col>
                                <el-col :lg="7">
                                    <el-button @click="ping" type="primary" size="small" style="margin-top:1px;float: right;">{{lang.action}}</el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.traceroute_help"></div>
                                <span>{{lang.traceroute}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-row :gutter="10">
                                <el-col :lg="17">
                                    <el-input v-model="traceroute_value" type="mini"></el-input>
                                </el-col>
                                <el-col :lg="7">
                                    <el-button @click="traceroute" type="primary" size="small" style="margin-top:1px;float: right;">{{lang.action}}</el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row v-if="ping_open || traceroute_open">
                <el-col :lg="24">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.traceroute_help"></div>
                                <span>Ping and Traceroute Result</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="24">
                            <el-card class="box-card" style="padding:0 20px 20px 20px;" shadow="never">
                                <div slot="header" class="clearfix">
<!--                                        <b style="font-size: 15px;">Ping and Traceroute Result</b>-->
                                    <i style="float: right; padding: 3px 0;margin-top:-10px;font-size: 20px;color:red;cursor: pointer;"
                                       @click="close_result"
                                       class="el-icon-close"></i>
                                </div>

                                <el-collapse v-model="activeName">
                                    <el-collapse-item title="Ping" name="ping" v-if="ping_open">
                                        <i class="el-icon-loading" v-show="ping_loading" style="font-size: 20px;"></i>
                                        <pre v-html="ping_result"></pre>
                                    </el-collapse-item>
                                    <el-collapse-item title="Traceroute" name="traceroute" v-if="traceroute_open">
                                        <i class="el-icon-loading" v-show="traceroute_loading" style="font-size: 20px;"></i>
                                        <pre v-html="traceroute_result"></pre>
                                    </el-collapse-item>
                                </el-collapse>
                            </el-card>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <divider_item><span slot="title">{{lang.channel_recording}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.interface_help"></span>
                    <span slot="param_name" >{{lang.interface}}</span>
                    <el-select slot="param" v-model="tcpdump_interface"
                               style="width: 100%;"
                               size="small">
                        <el-option
                                v-for="item in tcpdump_interface_value_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.source_host_help"></span>
                    <span slot="param_name" >{{lang.source_host}}</span>
                    <el-input slot="param" v-model="source_host" type="textarea"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.destination_host_help"></span>
                    <span slot="param_name" >{{lang.destination_host}}</span>
                    <el-input slot="param" v-model="destination_host" type="textarea"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.port_help"></span>
                    <span slot="param_name" >{{lang.port}}</span>
                    <el-input slot="param" v-model="port" size="small"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.add_tcpdump_option"></span>
                    <span slot="param_name" >{{lang.add_tcpdump_option}}</span>
                    <el-button type="primary"
                               slot="param"
                               size="small"
                               @click="add_tcpdump_option"
                               style="width: 100%">{{lang.add_tcpdump_option}}</el-button>
                </form_item>
            </el-row>

            <el-row v-if="tcpdump_options_value.length > 0">
                <el-col :lg="12" :xs="24" :sm="24">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.other_options"></div>
                                <span>{{lang.other_options}}</span>
                            </el-tooltip>:
                        </label>

                        <el-row style="padding-left: 5px;">
                            <el-row :gutter="10" v-for="(i,ind) in tcpdump_options_value">
                                <el-col :lg="9" :xs="18" :sm="18">
                                    <el-select v-model="i.key"
                                               @change="change_tcpdump_options_key(ind)"
                                               style="margin-top: 10px;width: 100%;">
                                        <el-option
                                                v-for="item in tcpdump_options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :lg="9" :xs="18" :sm="18" v-if="i.key == 'host' || i.key == 'sip'">
                                    <el-input style="margin-top:10px;" v-model="i.value"></el-input>
                                </el-col>
                                <el-col :lg="2" :xs="3" :sm="3">
                                    <i class="el-icon-close"
                                       @click="remove_tcpdump_option(ind)"
                                       style="font-size: 20px;color: #F56C6C;margin: 15px 0 0 10px;cursor: pointer;"></i>
                                </el-col>
                            </el-row>
                        </el-row>

                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>

        <el-dialog
                :title="lang.confirmation"
                :visible.sync="tcpdump_dialogVisible"
                :close-on-click-modal=true
                :close-on-press-escape=false
                :before-close="tcpdumpClose"
                :width="$store.state.page.dialog_width">
            <div style="text-align: center;font-size: 30px;">{{timeout}}</div>
            <div style="color:#67C23A;font-size: 20px;margin-top:30px;">The maximum duration of this recording is 10 minutes,and the system will stop and download the recording file automatically when time is up</div>
            <span slot="footer" class="dialog-footer">
                <form action="/service" id="download_voicefile" method="post" wnctype='multipart/form-data'>
                    <input type="hidden" name="action" value="download" />
                    <input type="hidden" name="downloadfile" value="toolkit" />
                    <input type="hidden" name="page_name" value="network-toolkit" />
                    <button type="button"
                            @click="Stop"
                            class="el-button el-button--primary el-button--small">
                            {{lang.stop}}
                    </button>
                </form>
            </span>
        </el-dialog>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Toolkit",
        data() {
            return {
                interface_value: 0,
                ping_value: 'google.com',
                ping_open: false,
                ping_loading: false,
                ping_result: '',

                traceroute_value: 'google.com',
                traceroute_open: false,
                traceroute_loading: false,
                traceroute_result: '',

                tcpdump_interface: 0,
                source_host: '',
                destination_host: '',
                port: '',

                interface_value_options: [],
                tcpdump_interface_value_options: [{
                    label: 'all',
                    value: 2
                }],

                tcpdump_options_value: [],
                tcpdump_options: [{
                    label: 'None',
                    value: 'none'
                },{
                    label: 'All',
                    value: 'all'
                },{
                    label: 'TCP',
                    value: 'tcp'
                },{
                    label: 'UDP',
                    value: 'udp'
                },{
                    label: 'HOST',
                    value: 'host'
                },{
                    label: 'SIP',
                    value: 'sip'
                }],

                activeName: ['ping', 'traceroute'],

                tcpdump_dialogVisible: false,
                timeout: '00:00',
                sec: 1,

                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods: {
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let ethname = data['_get']['_ethname']['_item']

                ethname.forEach((item,index) => {
                    if(item == '')
                        return true

                    let name = ''
                    if(index == 0){
                        name = 'LAN2'
                    }else if(index == 1){
                        name = 'LAN1'
                    }

                    let obj = {
                        label: name,
                        value: index
                    }

                    this.interface_value_options.push(obj)
                    this.tcpdump_interface_value_options.push(obj)
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            ping(){
                this.ping_open = true
                this.ping_loading = true

                this.request.AGNetworkTookitPing(this.ping_succeed_back, this.ping_error_back, 0, this.interface_value, this.ping_value)
            },
            ping_succeed_back(data){
                this.ping_loading = false
                this.ping_result = data['_result']['_resStr'].replace(/\n/ig, '<br>')
                if(data['_result']['_res'] == 0){
                    //Successfully ping hostname
                }else{
                    //Failed ping hostname
                }
            },
            ping_error_back() {
                this.ping_loading = false
                this.ping_result = 'Ping failed'
            },
            traceroute(){
                this.traceroute_open = true
                this.traceroute_loading = true

                this.request.AGNetworkTookitPing(this.traceroute_succeed_back, this.traceroute_error_back, 1, this.interface_value, this.traceroute_value)
            },
            traceroute_succeed_back(data){
                this.traceroute_loading = false
                this.traceroute_result = data['_result']['_resStr'].replace(/\n/ig, '<br>')
                if(data['_result']['_res'] == 0){
                    //Successfully ping hostname
                }else{
                    //Failed ping hostname
                }
            },
            traceroute_error_back(){
                this.traceroute_loading = false
                this.traceroute_result = 'Traceroute failed'
            },
            close_result(){
                this.$confirm(this.lang.close_dialog)
                    .then(_ => {
                        this.ping_open = false
                        this.traceroute_open = false
                    })
                    .catch(_ => {})
            },
            add_tcpdump_option(){
                this.tcpdump_options_value.push({
                    key: 'none',
                    value: ''
                })
            },
            remove_tcpdump_option(index){
                this.tcpdump_options_value.splice(index,1)
            },
            change_tcpdump_options_key(index){
                if(this.tcpdump_options_value[index].key == 'host'){
                    this.tcpdump_options_value[index].value = '169.254.0.1'
                }else if(this.tcpdump_options_value[index].key == 'sip'){
                    this.tcpdump_options_value[index].value = '5060'
                }
            },

            Start(){
                this.tcpdump_dialogVisible = true
                const NetworkTookitTcpdump = new AST_NetworkTookitTcpdump();

                NetworkTookitTcpdump._interface = this.interface_value
                NetworkTookitTcpdump._src = this.source_host == '' ? null : this.source_host
                NetworkTookitTcpdump._drc = this.destination_host == '' ? null : this.destination_host
                NetworkTookitTcpdump._port = this.port == '' ? 0 : this.port

                const LineArr = new AST_LineArr()
                this.tcpdump_options_value.forEach(item => {
                    let line = new AST_Line()
                    line._key = item.key
                    line._value = item.value
                    LineArr._item.push(line)
                })

                NetworkTookitTcpdump._lines = LineArr

                console.log(NetworkTookitTcpdump)
                this.request.AGNetworkTookitTcpdump(this.start_succeed_back, this.start_error_back, 0, NetworkTookitTcpdump)
            },
            start_succeed_back(){
                console.log('start succeed')
                this.timeoutID = setInterval(this.timer, 1000)
            },
            start_error_back(){
                console.log('start failed')
            },
            timer(){
                let s=0,m=0

                m = parseInt(this.sec/60)
                m = m < 10 ? '0'+m : m
                s = this.sec%60
                s = s < 10 ? '0'+s : s

                this.timeout =  m+':'+s
                if(this.sec>=600){
                    this.Stop()
                }

                this.sec++
            },
            tcpdumpClose(){
                this.$confirm(this.lang.dialog_close_confirm)
                    .then(_ => {
                        this.Stop()
                    })
                    .catch(_ => {})
            },
            Stop(){
                this.tcpdump_dialogVisible = false
                clearInterval(this.timeoutID)
                this.timeout = '00:00'
                this.sec = 1
                this.request.AGNetworkTookitTcpdump(this.stop_succeed_back, this.stop_error_back, 1, null)
            },
            stop_succeed_back(){
                //下载
                document.getElementById('download_voicefile').submit()
            },
            stop_error_back(){
                //下载
                document.getElementById('download_voicefile').submit()

                this.$message({
                    message: 'Stop failed',
                    type: 'error',
                    offset: 80
                })
            }
        },
        created() {
            this.debug = debuger('network-toolkit')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGNetworkToolkitGet(this.show_succeed_back, this.show_error_back)
            }
        },
        beforeDestroy() {
            clearInterval(this.timeoutID)
        }
    }
</script>

<style scoped>

</style>