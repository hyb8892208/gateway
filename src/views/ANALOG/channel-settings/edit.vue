<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.edit}} {{lang.port}} {{port_type}}{{$route.params.id}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="Save()"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left"><h3>{{lang.general}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.port_type_help"></span>
                    <span slot="param_name" >{{lang.port_type}}</span>
                    <span slot="param">{{port_type}}</span>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.name_help"></span>
                    <span slot="param_name" >{{lang.name}}</span>
                    <el-input slot="param" v-model="name"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.rx_gain_help"></span>
                    <span slot="param_name" >{{lang.rx_gain}}</span>
                    <el-input slot="param" v-model="rx_gain"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.tx_gain_help"></span>
                    <span slot="param_name" >{{lang.tx_gain}}</span>
                    <el-input slot="param" v-model="tx_gain"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.ring_timeout_help"></span>
                    <span slot="param_name" >{{lang.ring_timeout}}</span>
                    <el-input slot="param" v-model="ringtimeout"></el-input>
                </form_item>
            </el-row>

            <el-row v-if="port_type == 'FXS'"><!-- FXS -->
                <form_item v-if="$store.state.FlexRoutingSw == 0 && $store.state.type == 1">
                    <span slot="param_help" v-html="lang.failover_fxo_help"></span>
                    <span slot="param_name" >{{lang.failover_fxo}}</span>
                    <el-select slot="param" v-model="failover_fxo"
                               style="width: 100%"
                               :placeholder="lang.select_placeholder">
                        <el-option label="None" value=""></el-option>
                        <el-option
                                v-for="item in failover_fxo_options"
                                :label="item"
                                :value="item"
                        ></el-option>
                    </el-select>
                </form_item>

                <form_item v-if="$store.state.FlexRoutingSw == 0">
                    <span slot="param_help" v-html="lang.sip_account_help"></span>
                    <span slot="param_name" >{{lang.sip_account}}</span>
                    <el-select
                            slot="param"
                            @change="associated_change"
                            v-model="associated_chnnl"
                            style="width: 100%">
                        <el-option label="None" value="none"></el-option>
                        <el-option
                                v-for="item in associated_chnnl_options"
                                :label="item"
                                :value="item"
                        ></el-option>
                    </el-select>
                </form_item>
            </el-row><!-- FXS -->

            <el-row v-if="port_type == 'FXO'"><!-- FXO -->
                <form_item>
                    <span slot="param_help" v-html="lang.immediate_send_cid_help"></span>
                    <span slot="param_name" >{{lang.immediate_send_cid}}</span>
                    <el-checkbox slot="param" v-model="immediatesendcid"></el-checkbox>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.callout_min_interval_help"></span>
                    <span slot="param_name" >{{lang.callout_min_interval}}</span>
                    <el-input slot="param" v-model="calloutmininterval"></el-input>
                </form_item>
            </el-row><!-- FXO -->

            <el-divider content-position="left"><h3>{{lang.caller_id}}</h3></el-divider>

            <el-row v-if="port_type == 'FXO'"><!-- FXO -->
                <form_item>
                    <span slot="param_help" v-html="lang.use_callerid_help"></span>
                    <span slot="param_name" >{{lang.use_callerid}}</span>
                    <el-checkbox slot="param" v-model="usecallerid"></el-checkbox>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.hide_callerid_help"></span>
                    <span slot="param_name" >{{lang.hide_callerid}}</span>
                    <el-checkbox slot="param" v-model="hidecallerid"></el-checkbox>
                </form_item>
            </el-row><!-- FXO -->

            <el-row v-if="port_type == 'FXS'"><!-- FXS -->
                <form_item>
                    <span slot="param_help">
                         <span v-if="$store.state.FlexRoutingSw == 0" v-html="lang.caller_id_help"></span>
                         <span v-else v-html="lang.extension_number_help"></span>
                    </span>
                    <span slot="param_name" >
                         <span v-if="$store.state.FlexRoutingSw == 0">{{lang.caller_id}}</span>
                         <span v-else>{{lang.extension_number}}</span>
                    </span>
                    <el-input slot="param" v-model="cid_number"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.full_name_help"></span>
                    <span slot="param_name" >{{lang.full_name}}</span>
                    <el-input slot="param" v-model="fullname"></el-input>
                </form_item>

                <form_item v-if="$store.state.FlexRoutingSw == 0">
                    <span slot="param_help" v-html="lang.internal_exten_number_help"></span>
                    <span slot="param_name" >{{lang.internal_exten_number}}</span>
                    <el-input slot="param" v-model="internalnumber"></el-input>
                </form_item>
            </el-row><!-- FXS -->

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.cid_signalling_help"></span>
                    <span slot="param_name" >{{lang.cid_signalling}}</span>
                    <el-select slot="param" v-model="cidsignalling" style="width: 100%">
                        <el-option
                                v-for="item in cidsignalling_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.dnd_help"></span>
                    <span slot="param_name" >{{lang.dnd}}</span>
                    <el-checkbox slot="param" v-model="dnd"></el-checkbox>
                </form_item>
            </el-row>

            <el-row v-if="port_type == 'FXO'"><!-- FXO -->
                <form_item>
                    <span slot="param_help" v-html="lang.cid_start_signal_help"></span>
                    <span slot="param_name" >{{lang.cid_start_signal}}</span>
                    <el-select slot="param" v-model="cidstart" style="width: 100%">
                        <el-option
                                v-for="item in cidstart_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </form_item>
            </el-row><!-- FXO -->

            <el-divider content-position="left"><h3>{{lang.polarity}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.answer_on_polarity_switch_help"></span>
                    <span slot="param_name" >{{lang.answer_on_polarity_switch}}</span>
                    <el-checkbox slot="param" v-model="answeronpolarityswitch"></el-checkbox>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.hangup_on_polarity_switch_help"></span>
                    <span slot="param_name" >{{lang.hangup_on_polarity_switch}}</span>
                    <el-checkbox slot="param" v-model="hanguponpolarityswitch"></el-checkbox>
                </form_item>
            </el-row>

            <el-row v-if="port_type == 'FXO'"><!-- FXO -->
                <form_item>
                    <span slot="param_help" v-html="lang.polarity_on_answer_delay_help"></span>
                    <span slot="param_name" >{{lang.polarity_on_answer_delay}}</span>
                    <el-input slot="param" v-model="polarityonanswerdelay"></el-input>
                </form_item>
            </el-row><!-- FXO -->

            <el-row v-if="port_type == 'FXO'"><!-- FXO -->
                <form_item>
                    <span slot="param_help" v-html="lang.delay_reply_200_ok_switch_help"></span>
                    <span slot="param_name" >{{lang.delay_reply_200_ok_switch}}</span>
                    <el-checkbox slot="param" v-model="delay_reply_200ok_enable"></el-checkbox>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.delay_reply_200_ok_timer_help"></span>
                    <span slot="param_name" >{{lang.delay_reply_200_ok_timer}}</span>
                    <el-input slot="param" v-model="delay_reply_200ok_timer"></el-input>
                </form_item>
            </el-row><!-- FXO -->

            <div v-if="port_type == 'FXS'"><!-- FXS -->
            <el-divider content-position="left"><h3>{{lang.call_feature}}</h3></el-divider>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.call_waiting_help"></span>
                        <span slot="param_name" >{{lang.call_waiting}}</span>
                        <el-checkbox slot="param" v-model="callwaiting"></el-checkbox>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.three_way_calling_help"></span>
                        <span slot="param_name" >{{lang.three_way_calling}}</span>
                        <el-checkbox slot="param" v-model="threewaycalling"></el-checkbox>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.call_transfer_help"></span>
                        <span slot="param_name" >{{lang.call_transfer}}</span>
                        <el-checkbox slot="param" v-model="transfer"></el-checkbox>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.call_forward_help"></span>
                        <span slot="param_name" >{{lang.call_forward}}</span>
                        <el-select slot="param" v-model="callforward" style="width: 100%;">
                            <el-option
                                    v-for="item in callforward_options"
                                    :label="item.label"
                                    :key="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.call_forward_number_help"></span>
                        <span slot="param_name" >{{lang.call_forward_number}}</span>
                        <el-input slot="param" v-model="callforwardexten"></el-input>
                    </form_item>
                </el-row>
            </div><!-- FXS -->

            <el-divider content-position="left"><h3>{{lang.call_limit}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.call_limit_switch_help"></span>
                    <span slot="param_name" >{{lang.call_limit_switch}}</span>
                    <el-checkbox slot="param" v-model="call_limit_switch"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.limit_call_time_help"></span>
                    <span slot="param_name" >{{lang.limit_call_time}}</span>
                    <el-input slot="param" v-model="call_time_settings"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.limit_daily_call_times_help"></span>
                    <span slot="param_name" >{{lang.limit_daily_call_times}}</span>
                    <el-input slot="param" v-model="day_calls_settings"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.limit_daily_answer_times_help"></span>
                    <span slot="param_name" >{{lang.limit_daily_answer_times}}</span>
                    <el-input slot="param" v-model="day_answer_setting"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.limit_hour_call_times_help"></span>
                    <span slot="param_name" >{{lang.limit_hour_call_times}}</span>
                    <el-input slot="param" v-model="hour_calls_settings"></el-input>
                </form_item>
            </el-row>

            <el-row v-if="port_type == 'FXO'">
                <el-divider content-position="left"><h3>{{lang.callerid_detect}}</h3></el-divider>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.cidbeforering_help"></span>
                        <span slot="param_name" >{{lang.cidbeforering}}</span>
                        <el-checkbox slot="param" v-model="cidbeforering"></el-checkbox>
                    </form_item>
                </el-row>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "add",
        data() {
            return {
                port_type: 'FXS',
                name: '',
                rx_gain: '',
                tx_gain: '',
                ringtimeout: '',

                immediatesendcid: '',//fxo
                calloutmininterval: '',//fxo

                failover_fxo: '',//fxs
                associated_chnnl: '',//fxs
                cid_number: '',//fxs
                fullname: '',//fxs
                internalnumber: '',//fxs

                usecallerid: '',//fxo
                hidecallerid: '',//fxo

                cidsignalling: 0,
                dnd: false,
                cidstart: '',//fxo

                answeronpolarityswitch: '',
                hanguponpolarityswitch: '',

                callwaiting: '',//fxs
                threewaycalling: '',//fxs
                transfer: '',//fxs
                callforward: '',//fxs
                callforwardexten: '',//fxs

                polarityonanswerdelay: '',//fxo
                delay_reply_200ok_enable: '',//fxo
                delay_reply_200ok_timer: '',//fxo

                call_limit_switch: '',
                call_time_settings: '',
                day_calls_settings: '',
                day_answer_setting: '',
                hour_calls_settings: '',
                cidbeforering: '',

                failover_fxo_options: [],
                associated_chnnl_options: [],
                cidsignalling_options: [{
                    label: 'bell',
                    value: 0
                },{
                    label: 'v23',
                    value: 1
                },{
                    label: 'dtmf',
                    value: 2
                }],

                cidstart_options: [{
                   label: 'ring',
                   value: 0
                },{
                    label: 'polarity',
                    value: 1
                },{
                    label: 'polarity_IN',
                    value: 2
                },{
                    label: 'dtmf',
                    value: 3
                }],

                callforward_options: [{
                   label: 'No',
                   value: 0
                },{
                    label: 'Unconditional',
                    value: 1
                },{
                    label: 'No answer',
                    value: 2
                },{
                    label: 'Busy',
                    value: 3
                }],

                lang: this.$store.state.lang
            }
        },
        methods:{
            associated_change(){
                if(this.associated_chnnl == 'none'){
                    let channel = this.$route.params.id
                    channel = channel < 10 ? '0'+channel : channel
                    let channel_new = '80'+channel
                    this.cid_number = channel_new
                    this.fullname = 'Channel '+channel_new
                }else{
                    let sip_name = this.associated_chnnl.split('-')[1]

                    this.cid_number = sip_name
                    this.fullname = sip_name
                }
            },
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _fxo = data['_get']['_fxo']
                let _fxs = data['_get']['_fxs']
                let _limit = data['_get']['_limit']
                let all_analog_info = data['_get']['_section']['_item']
                let all_sip_info = data['_get']['_sip']['_item']

                all_analog_info.forEach(item => {
                    if(item._signalling == 2){
                        let channel = 'fxo-'+item._channel
                        this.failover_fxo_options.push(channel)
                    }
                })

                all_sip_info.forEach(item => {
                    let sip = 'sip-'+item._section
                    this.associated_chnnl_options.push(sip)
                })

                let _chan = _fxs != null ? _fxs : _fxo

                this.name = _chan['_name'] == '' ? 'port-'+this.$route.params.id : _chan['_name']
                this.rx_gain = _chan['_rxgain']
                this.tx_gain = _chan['_txgain']
                this.ringtimeout = _chan['_ringtimeout']

                this.cidsignalling = parseInt(_chan['_cidsignalling'])
                this.dnd = _chan['_dnd'] == 1 ? true : false
                this.answeronpolarityswitch = _chan['_answerswitch'] == 1 ? true : false
                this.hanguponpolarityswitch = _chan['_hangupswitch'] == 1 ? true : false
                this.call_limit_switch = _limit['_sw'] == 1 ? true : false
                this.call_time_settings = _limit['_calltime']
                this.day_calls_settings = _limit['_daycalls']
                this.day_answer_setting = _limit['_dayanwers']
                this.hour_calls_settings = _limit['_hourcalls']
                this.cidbeforering = _chan['_cidbeforering'] == 1 ? true : false

                //FXS
                if(_fxo != null){
                    this.port_type = 'FXS'
                    this.failover_fxo = _chan['_failoverfxo']
                    this.associated_chnnl = _chan['_associatedchnnl'] == '' ? 'none' : _chan['_associatedchnnl']
                    this.cid_number = _chan['_cidnumber']
                    this.fullname = _chan['_fullname']
                    this.internalnumber = _chan['_internalnumber']
                    this.callwaiting = _chan['_callwaiting'] == 1 ? true : false
                    this.threewaycalling = _chan['_threewaycalling'] == 1 ? true : false
                    this.transfer = _chan['_transfer'] == 1 ? true : false
                    this.callforward = parseInt(_chan['_callforward'])
                    this.callforwardexten = _chan['_callforwardexten']
                }

                //FXO
                if(_fxs != null){
                    this.port_type = 'FXO'
                    this.immediatesendcid = _chan['_immediatesendcid'] == 1 ? true : false
                    this.calloutmininterval = _chan['_calloutmininterval']
                    this.usecallerid = _chan['_usecallerid'] == 1 ? true : false
                    this.hidecallerid = _chan['_hidecallerid'] == 1 ? true : false
                    this.cidstart = parseInt(_chan['_cidstart'])
                    this.polarityonanswerdelay = _chan['_polarityonanswerdelay']
                    this.delay_reply_200ok_enable = _chan['_delayreply200okenable'] == 1 ? true : false
                    this.delay_reply_200ok_timer = _chan['_delayreply200oktimer']
                }
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const AnaSave = new AST_AnaSave()

                if(this.port_type == 'FXS'){
                    const anacontextfxoks = new AST_AnaContextFxoks()

                    anacontextfxoks._name = this.name
                    anacontextfxoks._rxgain = this.rx_gain
                    anacontextfxoks._txgain = this.tx_gain

                    anacontextfxoks._ringtimeout = this.ringtimeout == '' ? 0 : this.ringtimeout

                    if(this.$store.state.type == 1 && this.$store.state.FlexRoutingSw == 0){
                        anacontextfxoks._failoverfxo = this.failover_fxo
                    }else{
                        anacontextfxoks._failoverfxo = ''
                    }

                    anacontextfxoks._associatedchnnl = this.$store.state.FlexRoutingSw == 1 ? 'none' : this.associated_chnnl

                    anacontextfxoks._cidnumber = this.cid_number == '' ? 0 : this.cid_number
                    anacontextfxoks._fullname = this.fullname
                    anacontextfxoks._internalnumber = this.$store.state.FlexRoutingSw == 0 ? this.internalnumber : ''

                    anacontextfxoks._cidsignalling = this.cidsignalling

                    anacontextfxoks._dnd = this.dnd == true ? 1 : 0
                    anacontextfxoks._answerswitch = this.answeronpolarityswitch == true ? 1 : 0
                    anacontextfxoks._hangupswitch = this.hanguponpolarityswitch == true ? 1 : 0
                    anacontextfxoks._callwaiting = this.callwaiting == true ? 1 : 0
                    anacontextfxoks._threewaycalling = this.threewaycalling == true ? 1 : 0
                    anacontextfxoks._transfer = this.transfer == true ? 1 : 0

                    anacontextfxoks._callforward = this.callforward == '' ? 0 : this.callforward
                    anacontextfxoks._callforwardexten = this.callforward != 0 ? this.callforwardexten : ''

                    AnaSave._fxo = anacontextfxoks
                }
                /*** FXS End  ***/

                if(this.port_type == 'FXO') {
                    const anacontextfxsks = new AST_AnaContextFxsks()

                    anacontextfxsks._name = this.name
                    anacontextfxsks._rxgain = this.rx_gain
                    anacontextfxsks._txgain = this.tx_gain
                    anacontextfxsks._ringtimeout = this.ringtimeout == '' ? 0 : this.ringtimeout
                    anacontextfxsks._immediatesendcid = this.immediatesendcid == true ? 1 : 0
                    anacontextfxsks._calloutmininterval = this.calloutmininterval == '' ? 2000 : this.calloutmininterval
                    anacontextfxsks._usecallerid = this.usecallerid == true ? 1 : 0
                    anacontextfxsks._hidecallerid = this.hidecallerid == true ? 1 : 0
                    anacontextfxsks._cidsignalling = this.cidsignalling == '' ? 3 : this.cidsignalling
                    anacontextfxsks._dnd = this.dnd == true ? 1 : 0
                    anacontextfxsks._cidstart = this.cidstart
                    anacontextfxsks._answerswitch = this.answeronpolarityswitch == true ? 1 : 0
                    anacontextfxsks._hangupswitch = this.hanguponpolarityswitch == true ? 1 : 0
                    anacontextfxsks._polarityonanswerdelay = this.polarityonanswerdelay == '' ? 0 : this.polarityonanswerdelay
                    anacontextfxsks._delayreply200okenable = this.delay_reply_200ok_enable == true ? 1 : 0
                    anacontextfxsks._delayreply200oktimer = this.delay_reply_200ok_timer == '' ? 0 : this.delay_reply_200ok_timer
                    anacontextfxsks._cidbeforering = this.cidbeforering == true ? 1 : 0

                    AnaSave._fxs = anacontextfxsks
                }
                /*** FXO End  ***/

                const calllimit = new AST_UcpAlgCalllimit()
                calllimit._sw = this.call_limit_switch == true ? 1 : 0

                calllimit._calltime = this.call_time_settings
                calllimit._daycalls = this.day_calls_settings
                calllimit._dayanwers = this.day_answer_setting
                calllimit._hourcalls = this.hour_calls_settings

                AnaSave._limit = calllimit
                /*** Calllimit End  ***/

                /*** Sync other port Begin ***/
                let LineArr = new AST_LineArr()
                let LimitLineArr = new AST_LineArr()
                let SectionArr = new AST_SectionArr()
                /*** Sync other port End ***/

                let asso_chnl = null;
                AnaSave._lines = LineArr
                AnaSave._limitLines = LimitLineArr
                AnaSave._sections = SectionArr

                const Speeddial = new AST_FxsSpeeddialArr();
                AnaSave._speeddial = Speeddial;

                console.log(this.$route.params.id)
                console.log(asso_chnl)
                console.log(AnaSave)

                this.request.AGAlgChannelSave(this.save_succeed_back, this.save_error_back, this.$route.params.id, asso_chnl, AnaSave)
            },
            save_succeed_back(data){
                console.log(data)

                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })

                this.$router.push('/Analog/Channel-settings')
            },
            save_error_back(){
                console.log('save error')

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },
        created() {
            this.request = new request()
            this.request.AGAlgChannelGetOne(this.show_succeed_back, this.show_error_back, this.$route.params.id)
        }
    }
</script>

<style scoped>

</style>