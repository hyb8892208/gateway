<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            :rules="rules"
            :model="ruleForm"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.edit}} {{lang.port}} {{port_type}}{{$route.params.id}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="submitValidator('ruleForm')"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.general}}</span></divider_item>

            <el-row>
                <form_item_sync>
                    <span slot="param_help" v-html="lang.port_type_help"></span>
                    <span slot="param_name" >{{lang.port_type}}</span>
                    <span slot="param">{{port_type}}</span>
                </form_item_sync>
            </el-row>

            <el-row>
                <form_item_sync>
                    <span slot="param_help" v-html="lang.name_help"></span>
                    <span slot="param_name" >{{lang.name}}</span>
                    <el-input slot="param" v-model="name"></el-input>
                </form_item_sync>

                <form_item_sync v-bind:param="'rx_gain'">
                    <span slot="param_help" v-html="lang.rx_gain_help"></span>
                    <span slot="param_name" >{{lang.rx_gain}}</span>
                    <el-input slot="param" v-model="ruleForm.rx_gain"></el-input>
                    <el-checkbox slot="param_sync" v-model="sync.rx_gain_sync"></el-checkbox>
                </form_item_sync>
            </el-row>

            <el-row>
                <form_item_sync v-bind:param="'tx_gain'">
                    <span slot="param_help" v-html="lang.tx_gain_help"></span>
                    <span slot="param_name" >{{lang.tx_gain}}</span>
                    <el-input slot="param" v-model="ruleForm.tx_gain"></el-input>
                    <el-checkbox slot="param_sync" v-model="sync.tx_gain_sync"></el-checkbox>
                </form_item_sync>

                <form_item_sync>
                    <span slot="param_help" v-html="lang.ring_timeout_help"></span>
                    <span slot="param_name" >{{lang.ring_timeout}}</span>
                    <el-input slot="param" v-model="ringtimeout"></el-input>
                    <el-checkbox slot="param_sync" v-model="sync.ringtimeout_sync"></el-checkbox>
                </form_item_sync>
            </el-row>

            <el-row>
                <form_item_sync  v-if="port_type == 'FXO'">
                    <span slot="param_help" v-html="lang.immediate_send_cid_help"></span>
                    <span slot="param_name" >{{lang.immediate_send_cid}}</span>
                    <el-checkbox slot="param" v-model="immediatesendcid"></el-checkbox>
                    <el-checkbox slot="param_sync" v-model="sync.immediatesendcid_sync"></el-checkbox>
                </form_item_sync>

                <form_item_sync v-bind:param="'calloutmininterval'"  v-if="port_type == 'FXO'">
                    <span slot="param_help" v-html="lang.callout_min_interval_help"></span>
                    <span slot="param_name" >{{lang.callout_min_interval}}</span>
                    <el-input slot="param" v-model="ruleForm.calloutmininterval"></el-input>
                    <el-checkbox slot="param_sync" v-model="sync.calloutmininterval_sync"></el-checkbox>
                </form_item_sync>
            </el-row>

            <el-row v-if="port_type == 'FXS'"><!-- FXS -->
                <form_item_sync v-if="$store.state.FlexRoutingSw == 0 && $store.state.type == 1">
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
                    <el-checkbox slot="param_sync" v-model="sync.failover_fxo_sync"></el-checkbox>
                </form_item_sync>

                <form_item_sync v-if="$store.state.FlexRoutingSw == 0">
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
<!--                    <el-checkbox slot="param_sync" v-model="sync.associated_chnnl_sync"></el-checkbox>-->
                </form_item_sync>
            </el-row><!-- FXS -->

            <divider_item><span slot="title">{{lang.caller_id}}</span></divider_item>

            <el-row v-if="port_type == 'FXO'"><!-- FXO -->
                <form_item_sync>
                    <span slot="param_help" v-html="lang.use_callerid_help"></span>
                    <span slot="param_name" >{{lang.use_callerid}}</span>
                    <el-checkbox slot="param" v-model="usecallerid"></el-checkbox>
                    <el-checkbox slot="param_sync" v-model="sync.usecallerid_sync"></el-checkbox>
                </form_item_sync>

                <form_item_sync>
                    <span slot="param_help" v-html="lang.hide_callerid_help"></span>
                    <span slot="param_name" >{{lang.hide_callerid}}</span>
                    <el-checkbox slot="param" v-model="hidecallerid"></el-checkbox>
                    <el-checkbox slot="param_sync" v-model="sync.hidecallerid_sync"></el-checkbox>
                </form_item_sync>
            </el-row><!-- FXO -->

            <el-row v-if="port_type == 'FXS'"><!-- FXS -->
                <form_item_sync>
                    <span slot="param_help">
                         <span v-if="$store.state.FlexRoutingSw == 0" v-html="lang.caller_id_help"></span>
                         <span v-else v-html="lang.extension_number_help"></span>
                    </span>
                    <span slot="param_name" >
                         <span v-if="$store.state.FlexRoutingSw == 0">{{lang.caller_id}}</span>
                         <span v-else>{{lang.extension_number}}</span>
                    </span>
                    <el-input slot="param" v-model="cid_number"></el-input>
<!--                    <el-checkbox slot="param_sync" v-model="sync.associated_chnnl_sync"></el-checkbox>-->
                </form_item_sync>

                <form_item_sync>
                    <span slot="param_help" v-html="lang.full_name_help"></span>
                    <span slot="param_name" >{{lang.full_name}}</span>
                    <el-input slot="param" v-model="fullname"></el-input>
<!--                    <el-checkbox slot="param_sync" v-model="sync.associated_chnnl_sync"></el-checkbox>-->
                </form_item_sync>

                <form_item_sync v-if="$store.state.FlexRoutingSw == 0">
                    <span slot="param_help" v-html="lang.internal_exten_number_help"></span>
                    <span slot="param_name" >{{lang.internal_exten_number}}</span>
                    <el-input slot="param" v-model="internalnumber"></el-input>
<!--                    <el-checkbox slot="param_sync" v-model="sync.associated_chnnl_sync"></el-checkbox>-->
                </form_item_sync>
            </el-row><!-- FXS -->

            <el-row>
                <form_item_sync>
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
                    <el-checkbox slot="param_sync" v-model="sync.cidsignalling_sync"></el-checkbox>
                </form_item_sync>

                <form_item_sync>
                    <span slot="param_help" v-html="lang.dnd_help"></span>
                    <span slot="param_name" >{{lang.dnd}}</span>
                    <el-checkbox slot="param" v-model="dnd"></el-checkbox>
                    <el-checkbox slot="param_sync" v-model="sync.dnd_sync"></el-checkbox>
                </form_item_sync>
            </el-row>

            <el-row v-if="port_type == 'FXO'"><!-- FXO -->
                <form_item_sync>
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
                    <el-checkbox slot="param_sync" v-model="sync.cidstart_sync"></el-checkbox>
                </form_item_sync>
            </el-row><!-- FXO -->

            <divider_item><span slot="title">{{lang.polarity}}</span></divider_item>

            <el-row>
                <form_item_sync>
                    <span slot="param_help" v-html="lang.answer_on_polarity_switch_help"></span>
                    <span slot="param_name" >{{lang.answer_on_polarity_switch}}</span>
                    <el-checkbox slot="param" v-model="answeronpolarityswitch"></el-checkbox>
                    <el-checkbox slot="param_sync" v-model="sync.answeronpolarityswitch_sync"></el-checkbox>
                </form_item_sync>

                <form_item_sync>
                    <span slot="param_help" v-html="lang.hangup_on_polarity_switch_help"></span>
                    <span slot="param_name" >{{lang.hangup_on_polarity_switch}}</span>
                    <el-checkbox slot="param" v-model="hanguponpolarityswitch"></el-checkbox>
                    <el-checkbox slot="param_sync" v-model="sync.hanguponpolarityswitch_sync"></el-checkbox>
                </form_item_sync>
            </el-row>

            <el-row v-if="port_type == 'FXO'"><!-- FXO -->
                <form_item_sync>
                    <span slot="param_help" v-html="lang.polarity_on_answer_delay_help"></span>
                    <span slot="param_name" >{{lang.polarity_on_answer_delay}}</span>
                    <el-input slot="param" v-model="polarityonanswerdelay"></el-input>
                    <el-checkbox slot="param_sync" v-model="sync.polarityonanswerdelay_sync"></el-checkbox>
                </form_item_sync>
            </el-row><!-- FXO -->

            <el-row v-if="port_type == 'FXO'"><!-- FXO -->
                <form_item_sync>
                    <span slot="param_help" v-html="lang.delay_reply_200_ok_switch_help"></span>
                    <span slot="param_name" >{{lang.delay_reply_200_ok_switch}}</span>
                    <el-checkbox slot="param" v-model="delay_reply_200ok_enable"></el-checkbox>
                    <el-checkbox slot="param_sync" v-model="sync.delay_reply_200ok_enable_sync"></el-checkbox>
                </form_item_sync>

                <form_item_sync v-bind:param="'delay_reply_200ok_timer'">
                    <span slot="param_help" v-html="lang.delay_reply_200_ok_timer_help"></span>
                    <span slot="param_name" >{{lang.delay_reply_200_ok_timer}}</span>
                    <el-input slot="param" v-model="ruleForm.delay_reply_200ok_timer" :disabled="!delay_reply_200ok_enable"></el-input>
                    <el-checkbox slot="param_sync" v-model="sync.delay_reply_200ok_timer_sync"></el-checkbox>
                </form_item_sync>
            </el-row><!-- FXO -->

            <div v-if="port_type == 'FXS'"><!-- FXS -->

                <divider_item><span slot="title">{{lang.call_feature}}</span></divider_item>

                <el-row>
                    <form_item_sync v-bind:param="'callwaiting'">
                        <span slot="param_help" v-html="lang.call_waiting_help"></span>
                        <span slot="param_name" >{{lang.call_waiting}}</span>
                        <el-checkbox slot="param" v-model="ruleForm.callwaiting"></el-checkbox>
                        <el-checkbox slot="param_sync" v-model="sync.callwaiting_sync"></el-checkbox>
                    </form_item_sync>

                    <form_item_sync>
                        <span slot="param_help" v-html="lang.three_way_calling_help"></span>
                        <span slot="param_name" >{{lang.three_way_calling}}</span>
                        <el-checkbox slot="param" v-model="threewaycalling"></el-checkbox>
                        <el-checkbox slot="param_sync" v-model="sync.threewaycalling_sync"></el-checkbox>
                    </form_item_sync>
                </el-row>

                <el-row>
                    <form_item_sync>
                        <span slot="param_help" v-html="lang.call_transfer_help"></span>
                        <span slot="param_name" >{{lang.call_transfer}}</span>
                        <el-checkbox slot="param" v-model="transfer"></el-checkbox>
                        <el-checkbox slot="param_sync" v-model="sync.transfer_sync"></el-checkbox>
                    </form_item_sync>

                    <form_item_sync v-bind:param="'callforward'">
                        <span slot="param_help" v-html="lang.call_forward_help"></span>
                        <span slot="param_name" >{{lang.call_forward}}</span>
                        <el-select slot="param" v-model="ruleForm.callforward" style="width: 100%;">
                            <el-option
                                    v-for="item in callforward_options"
                                    :label="item.label"
                                    :key="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-checkbox slot="param_sync" v-model="sync.callforward_sync"></el-checkbox>
                    </form_item_sync>
                </el-row>

                <el-row>
                    <form_item_sync v-bind:param="'callforwardexten'">
                        <span slot="param_help" v-html="lang.call_forward_number_help"></span>
                        <span slot="param_name" >{{lang.call_forward_number}}</span>
                        <el-input slot="param" v-model="ruleForm.callforwardexten" :disabled="ruleForm.callforward == 0"></el-input>
                        <el-checkbox slot="param_sync" v-model="sync.callforwardexten_sync"></el-checkbox>
                    </form_item_sync>
                </el-row>
            </div><!-- FXS -->

            <divider_item><span slot="title">{{lang.call_limit}}</span></divider_item>

            <el-row>
                <form_item_sync>
                    <span slot="param_help" v-html="lang.call_limit_switch_help"></span>
                    <span slot="param_name" >{{lang.call_limit_switch}}</span>
                    <el-checkbox slot="param" v-model="call_limit_switch"></el-checkbox>
                    <el-checkbox slot="param_sync" v-model="sync.call_limit_switch_sync"></el-checkbox>
                </form_item_sync>
            </el-row>

            <el-row>
                <form_item_sync v-bind:param="'call_time_settings'">
                    <span slot="param_help" v-html="lang.limit_call_time_help"></span>
                    <span slot="param_name" >{{lang.limit_call_time}}</span>
                    <el-input slot="param" v-model="ruleForm.call_time_settings" :disabled="!call_limit_switch"></el-input>
                    <el-checkbox slot="param_sync" v-model="sync.call_time_settings_sync"></el-checkbox>
                </form_item_sync>

                <form_item_sync v-bind:param="'day_calls_settings'">
                    <span slot="param_help" v-html="lang.limit_daily_call_times_help"></span>
                    <span slot="param_name" >{{lang.limit_daily_call_times}}</span>
                    <el-input slot="param" v-model="ruleForm.day_calls_settings" :disabled="!call_limit_switch"></el-input>
                    <el-checkbox slot="param_sync" v-model="sync.day_calls_settings_sync"></el-checkbox>
                </form_item_sync>
            </el-row>

            <el-row>
                <form_item_sync v-bind:param="'day_answer_setting'">
                    <span slot="param_help" v-html="lang.limit_daily_answer_times_help"></span>
                    <span slot="param_name" >{{lang.limit_daily_answer_times}}</span>
                    <el-input slot="param" v-model="ruleForm.day_answer_setting" :disabled="!call_limit_switch"></el-input>
                    <el-checkbox slot="param_sync" v-model="sync.day_answer_setting_sync"></el-checkbox>
                </form_item_sync>

                <form_item_sync v-bind:param="'hour_calls_settings'">
                    <span slot="param_help" v-html="lang.limit_hour_call_times_help"></span>
                    <span slot="param_name" >{{lang.limit_hour_call_times}}</span>
                    <el-input slot="param" v-model="ruleForm.hour_calls_settings" :disabled="!call_limit_switch"></el-input>
                    <el-checkbox slot="param_sync" v-model="sync.hour_calls_settings_sync"></el-checkbox>
                </form_item_sync>
            </el-row>

            <el-row v-if="port_type == 'FXO'">
                <divider_item><span slot="title">{{lang.callerid_detect}}</span></divider_item>

                <el-row>
                    <form_item_sync>
                        <span slot="param_help" v-html="lang.cidbeforering_help"></span>
                        <span slot="param_name" >{{lang.cidbeforering}}</span>
                        <el-checkbox slot="param" v-model="cidbeforering"></el-checkbox>
                        <el-checkbox slot="param_sync" v-model="sync.cidbeforering_sync"></el-checkbox>
                    </form_item_sync>
                </el-row>
            </el-row>

            <divider_item><span slot="title">{{lang.save_to_other_channels}}</span></divider_item>

            <el-row>
                <el-col :lg="24" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                </div>
                            </el-tooltip>
                        </label>
                        <el-col :lg="22">
                            <el-row>
                                <el-col :span="6">
                                    <el-checkbox @change="Select_all_port">{{lang.all}}</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <el-checkbox @change="Select_all_sync_params">{{lang.select_all_parameters}}</el-checkbox>
                                </el-col>
                            </el-row>

                            <el-row>
                                <span v-for="(item, index) in all_analog_info">
                                    <el-col :span="6" >
                                        <el-checkbox v-model="sync_port_arr[index+1]"
                                                     v-if="port_type == 'FXS' && item._signalling == 1"
                                                     :disabled="$route.params.id == item._channel"
                                        >FXS-{{item._channel}}</el-checkbox>

                                        <el-checkbox v-model="sync_port_arr[index+1]"
                                                     v-if="port_type == 'FXO' && item._signalling == 2"
                                                     :disabled="$route.params.id == item._channel"
                                        >FXO-{{item._channel}}</el-checkbox>
                                    </el-col>
                                </span>
                            </el-row>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "add",
        data() {
            var validatorRX = (rule, value, callback) => {
                if (value < -20.0 || value > 6.0) {
                    callback(new Error(this.lang.check_digitgain))
                }else{
                    callback()
                }
            }

            var validatorCallwaiting = (rule, value, callback) => {
                if(value && this.ruleForm.callforward != 0){
                    callback(new Error(this.lang.check_callwaiting))
                }else{
                    callback()
                }
            }

            var validatorCallforward = (rule, value, callback) => {
                if(value != 0 && this.ruleForm.callwaiting){
                    callback(new Error(this.lang.check_callwaiting))
                }else{
                    callback()
                }
            }

            var validatorCallforwardexten = (rule, value, callback) => {
                let rex=/^[0-9\+]{1,32}$/i

                if(this.ruleForm.callforward != 0 && !rex.test(value)){
                    callback(new Error(this.lang.check_sip_name))
                }else{
                    callback()
                }
            }

            var validatorDelay_reply_200ok_timer = (rule, value, callback) => {
                if(this.delay_reply_200ok_enable){
                    if(!(value >= 1 && value <= 90) || String(value).indexOf(".") > -1){
                        callback(new Error(this.lang.check_delay_reply_200ok_timer))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }

            var validatorCalloutmininterval = (rule, value, callback) => {
                console.log(value)
                if(!(parseInt(value) >= 400 && parseInt(value) <= 10000)){
                    console.log('hello')
                    callback(new Error(this.lang.check_calloutmininterval))
                }else{
                    console.log('nihao')
                    callback()
                }
            }

            var validatorCall_time_settings = (rule, value, callback) => {
                if (isNaN(value) || parseInt(value) < 0) {
                    callback(new Error(this.lang.check_number_int))
                }else{
                    callback()
                }
            }

            return {
                ruleForm: {
                    rx_gain: '',
                    tx_gain: '',

                    callwaiting: '',//fxs
                    callforward: '',//fxs
                    callforwardexten: '',//fxs
                    delay_reply_200ok_timer: '',//fxo
                    calloutmininterval: '',//fxo

                    call_time_settings: '',
                    day_calls_settings: '',
                    day_answer_setting: '',
                    hour_calls_settings: '',
                },
                rules: {
                    rx_gain: [
                        { validator: validatorRX, trigger: 'blur' }
                    ],
                    tx_gain: [
                        { validator: validatorRX, trigger: 'blur' }
                    ],
                    callwaiting: [
                        { validator: validatorCallwaiting, trigger: 'change' }
                    ],
                    callforward: [
                        { validator: validatorCallforward, trigger: 'change' }
                    ],
                    callforwardexten: [
                        { validator: validatorCallforwardexten, trigger: 'blur' }
                    ],
                    delay_reply_200ok_timer: [
                        { validator: validatorDelay_reply_200ok_timer, trigger: 'blur' }
                    ],
                    calloutmininterval: [
                        { validator: validatorCalloutmininterval, trigger: 'blur' }
                    ],
                    call_time_settings: [
                        { validator: validatorCall_time_settings, trigger: 'blur' }
                    ],
                    day_calls_settings: [
                        { validator: validatorCall_time_settings, trigger: 'blur' }
                    ],
                    day_answer_setting: [
                        { validator: validatorCall_time_settings, trigger: 'blur' }
                    ],
                    hour_calls_settings: [
                        { validator: validatorCall_time_settings, trigger: 'blur' }
                    ],
                },

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

                sync: {
                    rx_gain_sync: false,
                    tx_gain_sync: false,
                    ringtimeout_sync: false,
                    failover_fxo_sync: false,
                    associated_chnnl_sync: false,
                    immediatesendcid_sync: false,
                    calloutmininterval_sync: false,
                    usecallerid_sync: false,
                    hidecallerid_sync: false,
                    cidsignalling_sync: false,
                    dnd_sync: false,
                    cidstart_sync: false,
                    answeronpolarityswitch_sync: false,
                    hanguponpolarityswitch_sync: false,
                    polarityonanswerdelay_sync: false,
                    delay_reply_200ok_enable_sync: false,
                    delay_reply_200ok_timer_sync: false,
                    callwaiting_sync: false,
                    threewaycalling_sync: false,
                    transfer_sync: false,
                    callforward_sync: false,
                    callforwardexten_sync: false,
                    call_limit_switch_sync: false,
                    call_time_settings_sync: false,
                    day_calls_settings_sync: false,
                    day_answer_setting_sync: false,
                    hour_calls_settings_sync: false,
                    cidbeforering_sync: false,
                },

                all_analog_info: [],
                sync_port_arr: [],

                lang: this.$store.state.lang
            }
        },
        methods:{
            Select_all_port(checked){
                this.sync_port_arr.forEach((item, index) => {
                    if(index != this.$route.params.id) {
                        if (checked) {
                            this.$set(this.sync_port_arr, index, true)
                        } else {
                            this.$set(this.sync_port_arr, index, false)
                        }
                    }
                })
            },
            Select_all_sync_params(checked){
                for(let key in this.sync){
                    if(checked){
                        this.sync[key] = true
                    }else{
                        this.sync[key] = false
                    }
                }
            },
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
                this.all_analog_info = data['_get']['_section']['_item']
                let all_sip_info = data['_get']['_sip']['_item']

                this.all_analog_info.forEach(item => {
                    if(item._signalling == 2){
                        let channel = 'fxo-'+item._channel
                        this.failover_fxo_options.push(channel)
                    }
                    this.sync_port_arr[item._channel] = false
                })

                all_sip_info.forEach(item => {
                    let sip = 'sip-'+item._section
                    this.associated_chnnl_options.push(sip)
                })

                let _chan = _fxs != null ? _fxs : _fxo

                this.name = _chan['_name'] == '' ? 'port-'+this.$route.params.id : _chan['_name']
                this.ruleForm.rx_gain = _chan['_rxgain']
                this.ruleForm.tx_gain = _chan['_txgain']
                this.ringtimeout = _chan['_ringtimeout']

                this.cidsignalling = parseInt(_chan['_cidsignalling'])
                this.dnd = _chan['_dnd'] == 1 ? true : false
                this.answeronpolarityswitch = _chan['_answerswitch'] == 1 ? true : false
                this.hanguponpolarityswitch = _chan['_hangupswitch'] == 1 ? true : false
                this.call_limit_switch = _limit['_sw'] == 1 ? true : false
                this.ruleForm.call_time_settings = _limit['_calltime']
                this.ruleForm.day_calls_settings = _limit['_daycalls']
                this.ruleForm.day_answer_setting = _limit['_dayanwers']
                this.ruleForm.hour_calls_settings = _limit['_hourcalls']
                this.cidbeforering = _chan['_cidbeforering'] == 1 ? true : false

                //FXS
                if(_fxo != null){
                    this.port_type = 'FXS'
                    this.failover_fxo = _chan['_failoverfxo']
                    this.associated_chnnl = _chan['_associatedchnnl'] == '' ? 'none' : _chan['_associatedchnnl']
                    this.cid_number = _chan['_cidnumber']
                    this.fullname = _chan['_fullname']
                    this.internalnumber = _chan['_internalnumber']
                    this.ruleForm.callwaiting = _chan['_callwaiting'] == 1 ? true : false
                    this.threewaycalling = _chan['_threewaycalling'] == 1 ? true : false
                    this.transfer = _chan['_transfer'] == 1 ? true : false
                    this.ruleForm.callforward = parseInt(_chan['_callforward'])
                    this.ruleForm.callforwardexten = _chan['_callforwardexten']
                }

                //FXO
                if(_fxs != null){
                    this.port_type = 'FXO'
                    this.immediatesendcid = _chan['_immediatesendcid'] == 1 ? true : false
                    this.ruleForm.calloutmininterval = _chan['_calloutmininterval']
                    this.usecallerid = _chan['_usecallerid'] == 1 ? true : false
                    this.hidecallerid = _chan['_hidecallerid'] == 1 ? true : false
                    this.cidstart = parseInt(_chan['_cidstart'])
                    this.polarityonanswerdelay = _chan['_polarityonanswerdelay']
                    this.delay_reply_200ok_enable = _chan['_delayreply200okenable'] == 1 ? true : false
                    this.ruleForm.delay_reply_200ok_timer = _chan['_delayreply200oktimer'] == 0 ? 8 : _chan['_delayreply200oktimer']
                }
            },
            show_error_back(){
                this.$router.push('/common/error')
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
                const AnaSave = new AST_AnaSave()

                if(this.port_type == 'FXS'){
                    const anacontextfxoks = new AST_AnaContextFxoks()

                    anacontextfxoks._name = this.name
                    anacontextfxoks._rxgain = this.ruleForm.rx_gain
                    anacontextfxoks._txgain = this.ruleForm.tx_gain

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
                    anacontextfxoks._callwaiting = this.ruleForm.callwaiting == true ? 1 : 0
                    anacontextfxoks._threewaycalling = this.threewaycalling == true ? 1 : 0
                    anacontextfxoks._transfer = this.transfer == true ? 1 : 0

                    anacontextfxoks._callforward = this.ruleForm.callforward == '' ? 0 : this.ruleForm.callforward
                    anacontextfxoks._callforwardexten = this.ruleForm.callforward != 0 ? this.ruleForm.callforwardexten : ''

                    AnaSave._fxo = anacontextfxoks
                }
                /*** FXS End  ***/

                if(this.port_type == 'FXO') {
                    const anacontextfxsks = new AST_AnaContextFxsks()

                    anacontextfxsks._name = this.name
                    anacontextfxsks._rxgain = this.ruleForm.rx_gain
                    anacontextfxsks._txgain = this.ruleForm.tx_gain
                    anacontextfxsks._ringtimeout = this.ringtimeout == '' ? 0 : this.ringtimeout
                    anacontextfxsks._immediatesendcid = this.immediatesendcid == true ? 1 : 0
                    anacontextfxsks._calloutmininterval = this.ruleForm.calloutmininterval == '' ? 2000 : this.ruleForm.calloutmininterval
                    anacontextfxsks._usecallerid = this.usecallerid == true ? 1 : 0
                    anacontextfxsks._hidecallerid = this.hidecallerid == true ? 1 : 0
                    anacontextfxsks._cidsignalling = this.cidsignalling == '' ? 3 : this.cidsignalling
                    anacontextfxsks._dnd = this.dnd == true ? 1 : 0
                    anacontextfxsks._cidstart = this.cidstart
                    anacontextfxsks._answerswitch = this.answeronpolarityswitch == true ? 1 : 0
                    anacontextfxsks._hangupswitch = this.hanguponpolarityswitch == true ? 1 : 0
                    anacontextfxsks._polarityonanswerdelay = this.polarityonanswerdelay == '' ? 0 : this.polarityonanswerdelay
                    anacontextfxsks._delayreply200okenable = this.delay_reply_200ok_enable == true ? 1 : 0
                    anacontextfxsks._delayreply200oktimer = this.ruleForm.delay_reply_200ok_timer == '' ? 0 : this.delay_reply_200ok_timer
                    anacontextfxsks._cidbeforering = this.cidbeforering == true ? 1 : 0

                    AnaSave._fxs = anacontextfxsks
                }
                /*** FXO End  ***/

                const calllimit = new AST_UcpAlgCalllimit()
                calllimit._sw = this.call_limit_switch == true ? 1 : 0

                calllimit._calltime = this.ruleForm.call_time_settings
                calllimit._daycalls = this.ruleForm.day_calls_settings
                calllimit._dayanwers = this.ruleForm.day_answer_setting
                calllimit._hourcalls = this.ruleForm.hour_calls_settings

                AnaSave._limit = calllimit
                /*** Calllimit End  ***/

                /*** Sync other port Begin ***/
                let port_sync = false
                let params_sync = false
                let asso_chnl = null
                let LineArr = new AST_LineArr()
                let LimitLineArr = new AST_LineArr()
                let SectionArr = new AST_SectionArr()

                this.sync_port_arr.forEach((item,index) => {
                    if(item){
                        let ast_section = new AST_Section()
                        ast_section._section = index
                        SectionArr._item.push(ast_section)

                        port_sync = true
                    }
                })

                for(let key in this.sync){
                    if(this.sync[key]){
                        params_sync = true
                        break
                    }
                }

                if(port_sync && params_sync) {

                    if (this.port_type == 'FXS') {

                        if (this.$store.state.type == 1) {
                            if (this.sync.failover_fxo_sync) {
                                let failover_fxo = new AST_Line()
                                failover_fxo._key = 'failover_fxo'
                                failover_fxo._value = this.failover_fxo
                                LineArr._item.push(failover_fxo)
                            }
                        }

                        if (this.sync.callwaiting_sync) {
                            let line_callwaiting = new AST_Line()
                            line_callwaiting._key = 'callwaiting'
                            if (this.ruleForm.callwaiting == 1) {
                                line_callwaiting._value = 'yes'
                            } else if (this.ruleForm.callwaiting == 0) {
                                line_callwaiting._value = 'no'
                            }
                            LineArr._item.push(line_callwaiting)
                        }

                        if (this.sync.threewaycalling_sync) {
                            let line_threewaycalling = new AST_Line()
                            line_threewaycalling._key = 'threewaycalling'
                            if (this.threewaycalling == 1) {
                                line_threewaycalling._value = 'yes'
                            } else if (this.threewaycalling == 0) {
                                line_threewaycalling._value = 'no'
                            }
                            LineArr._item.push(line_threewaycalling)
                        }

                        if (this.sync.transfer_sync) {
                            let line_transfer = new AST_Line()
                            line_transfer._key = 'transfer'
                            if (this.transfer == 1) {
                                line_transfer._value = 'yes'
                            } else if (this.transfer == 0) {
                                line_transfer._value = 'no'
                            }
                            LineArr._item.push(line_transfer)
                        }

                        if (this.sync.callforward_sync) {
                            let line_callforward = new AST_Line()
                            line_callforward._key = 'callforward'
                            line_callforward._value = this.ruleForm.callforward
                            LineArr._item.push(line_callforward)
                        }

                        if (this.sync.callforwardexten_sync) {
                            let line_callforwardexten = new AST_Line()
                            line_callforwardexten._key = 'callforwardexten'
                            line_callforwardexten._value = this.ruleForm.callforwardexten
                            LineArr._item.push(line_callforwardexten)
                        }

                        if (this.sync.associated_chnnl_sync) {
                            if (this.$store.state.FlexRoutingSw) {
                                let line_associated_chnnl = new AST_Line()
                                line_associated_chnnl._key = 'associated_chnnl'
                                line_associated_chnnl._value = this.associated_chnnl
                                asso_chnl = this.associated_chnnl
                                // LineArr._item.push(line_associated_chnnl)
                            }
                        }

                        if (this.sync.associated_chnnl_sync) {
                            let line_cid_number = new AST_Line()
                            line_cid_number._key = 'cid_number'
                            line_cid_number._value = this.cid_number
                            //LineArr._item.push(line_cid_number)

                            let line_fullname = new AST_Line()
                            line_fullname._key = 'fullname'
                            line_fullname._value = this.fullname
                            //LineArr._item.push(line_fullname)

                            if (this.$store.state.FlexRoutingSw) {
                                let line_internalnumber = new AST_Line()
                                line_internalnumber._key = 'internalnumber'
                                line_internalnumber.value = this.internalnumber
                                // LineArr._item.push(line_internalnumber)
                            }
                        }
                    }/* FXS end */

                    if (this.port_type == 'FXO') {

                        if (this.sync.immediatesendcid_sync) {
                            let line_immediatesendcid = new AST_Line()
                            line_immediatesendcid._key = 'immediatesendcid'
                            if (this.immediatesendcid == 1) {
                                line_immediatesendcid._value = 'yes'
                            } else if (this.immediatesendcid == 0) {
                                line_immediatesendcid._value = 'no'
                            }
                            LineArr._item.push(line_immediatesendcid)
                        }

                        if (this.sync.calloutmininterval_sync) {
                            let line_calloutmininterval = new AST_Line()
                            line_calloutmininterval._key = 'calloutmininterval'
                            line_calloutmininterval._value = this.ruleForm.calloutmininterval

                            LineArr._item.push(line_calloutmininterval)
                        }

                        if (this.sync.hidecallerid_sync) {
                            let line_hidecallerid = new AST_Line()
                            line_hidecallerid._key = 'hidecallerid'
                            if (this.hidecallerid == 1) {
                                line_hidecallerid._value = 'yes'
                            } else if (this.hidecallerid == 0) {
                                line_hidecallerid._value = 'no'
                            }
                            LineArr._item.push(line_hidecallerid)
                        }

                        if (this.sync.usecallerid_sync) {
                            let line_usecallerid = new AST_Line()
                            line_usecallerid._key = 'usecallerid'
                            if (this.usecallerid == 1) {
                                line_usecallerid._value = 'yes'
                            } else if (this.usecallerid == 0) {
                                line_usecallerid._value = 'no'
                            }
                            LineArr._item.push(line_usecallerid)
                        }

                        if (this.sync.cidstart_sync) {
                            let line_cidstart = new AST_Line()
                            line_cidstart._key = 'cidstart'
                            if (this.cidstart == 3) {
                                line_cidstart._value = 'dtmf'
                            } else if (this.cidstart == 2) {
                                line_cidstart._value = 'polarity_IN'
                            } else if (this.cidstart == 1) {
                                line_cidstart._value = 'polarity'
                            } else if (this.cidstart == 0) {
                                line_cidstart._value = 'ring'
                            }
                            LineArr._item.push(line_cidstart)
                        }

                        if (this.sync.polarityonanswerdelay_sync) {
                            let line_polarityonanswerdelay = new AST_Line()
                            line_polarityonanswerdelay._key = 'polarityonanswerdelay'
                            line_polarityonanswerdelay._value = this.polarityonanswerdelay
                            LineArr._item.push(line_polarityonanswerdelay)
                        }

                        if (this.sync.delay_reply_200ok_enable_sync) {
                            let line_delay_reply_200ok_enable = new AST_Line()
                            line_delay_reply_200ok_enable._key = 'delay_reply_200ok_enable'
                            if (this.delay_reply_200ok_enable == 1) {
                                line_delay_reply_200ok_enable._value = 'yes'
                            } else if (this.delay_reply_200ok_enable == 0) {
                                line_delay_reply_200ok_enable._value = 'no'
                            }
                            LineArr._item.push(line_delay_reply_200ok_enable)
                        }

                        if (this.sync.delay_reply_200ok_timer_sync) {
                            let line_delay_reply_200ok_timer = new AST_Line()
                            line_delay_reply_200ok_timer._key = 'delay_reply_200ok_timer'
                            line_delay_reply_200ok_timer._value = this.ruleForm.delay_reply_200ok_timer
                            LineArr._item.push(line_delay_reply_200ok_timer)
                        }

                        if (this.sync.cidbeforering_sync) {
                            let line_cidbeforering = new AST_Line()
                            line_cidbeforering._key = 'cidbeforering'
                            line_cidbeforering._value = this.cidbeforering
                            LineArr._item.push(line_cidbeforering)
                        }
                    }/* FXO end */

                    if (this.sync.rx_gain_sync) {
                        let line_rxgain = new AST_Line()
                        line_rxgain._key = 'rxgain'
                        line_rxgain._value = this.ruleForm.rx_gain
                        LineArr._item.push(line_rxgain)
                    }

                    if (this.sync.tx_gain_sync) {
                        let line_txgain = new AST_Line()
                        line_txgain._key = 'txgain'
                        line_txgain._value = this.ruleForm.tx_gain
                        LineArr._item.push(line_txgain)
                    }

                    if (this.sync.dnd_sync) {
                        let line_dnd = new AST_Line()
                        line_dnd._key = 'dnd'
                        if (this.dnd == 1) {
                            line_dnd._value = 'yes'
                        } else if (this.dnd == 0) {
                            line_dnd._value = 'no'
                        }
                        LineArr._item.push(line_dnd)
                    }

                    if (this.sync.answeronpolarityswitch_sync) {
                        let line_answeronpolarityswitch = new AST_Line()
                        line_answeronpolarityswitch._key = 'answeronpolarityswitch'
                        if (this.answeronpolarityswitch == 1) {
                            line_answeronpolarityswitch._value = 'yes'
                        } else if (this.answeronpolarityswitch == 0) {
                            line_answeronpolarityswitch._value = 'no'
                        }
                        LineArr._item.push(line_answeronpolarityswitch)
                    }

                    if (this.sync.hanguponpolarityswitch_sync) {
                        let line_hanguponpolarityswitch = new AST_Line()
                        line_hanguponpolarityswitch._key = 'hanguponpolarityswitch'
                        if (this.hanguponpolarityswitch == 1) {
                            line_hanguponpolarityswitch._value = 'yes'
                        } else if (this.hanguponpolarityswitch == 0) {
                            line_hanguponpolarityswitch._value = 'no'
                        }
                        LineArr._item.push(line_hanguponpolarityswitch)
                    }

                    if (this.sync.ringtimeout_sync) {
                        let line_ringtimeout = new AST_Line()
                        line_ringtimeout._key = 'ringtimeout'
                        line_ringtimeout._value = this.ringtimeout
                        LineArr._item.push(line_ringtimeout)
                    }

                    if (this.sync.cidsignalling_sync) {
                        let line_cidsignalling = new AST_Line()
                        line_cidsignalling._key = 'cidsignalling'
                        if (this.cidsignalling == 2) {
                            line_cidsignalling._value = 'dtmf'
                        } else if (this.cidsignalling == 1) {
                            line_cidsignalling._value = 'v23'
                        } else if (this.cidsignalling == 0) {
                            line_cidsignalling._value = 'bell'
                        } else {
                            line_cidsignalling._value = ''
                        }
                        LineArr._item.push(line_cidsignalling)
                    }

                    if (this.sync.call_limit_switch_sync) {
                        let line_call_limit_switch = new AST_Line()
                        line_call_limit_switch._key = 'call_limit_switch'
                        line_call_limit_switch._value = this.call_limit_switch
                        LimitLineArr._item.push(line_call_limit_switch)
                    }

                    if (this.sync.call_time_settings_sync) {
                        let line_call_time_settings = new AST_Line()
                        line_call_time_settings._key = 'call_time_settings'
                        line_call_time_settings._value = this.ruleForm.call_time_settings
                        LimitLineArr._item.push(line_call_time_settings)
                    }

                    if (this.sync.day_calls_settings_sync) {
                        let line_day_calls_settings = new AST_Line()
                        line_day_calls_settings._key = 'day_calls_settings'
                        line_day_calls_settings._value = this.ruleForm.day_calls_settings
                        LimitLineArr._item.push(line_day_calls_settings)
                    }

                    if (this.sync.day_answer_setting_sync) {
                        let line_day_answer_settings = new AST_Line()
                        line_day_answer_settings._key = 'day_answer_setting'
                        line_day_answer_settings._value = this.ruleForm.day_answer_setting
                        LimitLineArr._item.push(line_day_answer_settings)
                    }

                    if (this.sync.hour_calls_settings_sync) {
                        let line_hour_calls_settings = new AST_Line()
                        line_hour_calls_settings._key = 'hour_calls_settings'
                        line_hour_calls_settings._value = this.ruleForm.hour_calls_settings
                        LimitLineArr._item.push(line_hour_calls_settings)
                    }
                }

                /*** Sync other port End ***/

                AnaSave._lines = LineArr
                AnaSave._limitLines = LimitLineArr
                AnaSave._sections = SectionArr

                const Speeddial = new AST_FxsSpeeddialArr()
                AnaSave._speeddial = Speeddial

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
            this.request.AGAlgChannelGetOne(this.show_succeed_back, this.show_error_back, this.$route.params.id)
        }
    }
</script>

<style scoped>

</style>