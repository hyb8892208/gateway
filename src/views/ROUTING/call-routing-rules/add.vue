<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            :rules="rules"
            :model="ruleForm"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.call_routing_rule}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="submitValidator('ruleForm')">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" v-loading="loading" style="margin:auto;padding: 20px;margin-bottom:50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.call_routing_rule}}</span></divider_item>

            <el-row>
                <form_item v-bind:param="'routing_name'">
                    <span slot="param_help" v-html="lang.routing_name_help"></span>
                    <span slot="param_name" >{{lang.routing_name}}</span>
                    <el-input slot="param" v-model="ruleForm.routing_name"></el-input>
                </form_item>

                <form_item v-bind:param="'from_channel'">
                    <span slot="param_help" v-html="lang.call_comes_in_from_help"></span>
                    <span slot="param_name" >{{lang.call_comes_in_from}}</span>
                    <el-select slot="param" v-model="ruleForm.from_channel" style="width: 100%">
                        <el-option-group
                                v-for="type in selective_end"
                                :key="type.label"
                                :label="type.label">
                            <el-option
                                    v-for="item in type.options"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'to_channel'">
                    <span slot="param_help" v-html="lang.send_call_throuth_help"></span>
                    <span slot="param_name" >{{lang.send_call_throuth}}</span>
                    <el-select slot="param" v-model="ruleForm.to_channel" style="width: 100%">
                        <el-option-group
                                v-for="type in selective_end"
                                :key="type.label"
                                :label="type.label">
                            <el-option
                                    v-for="item in type.options"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.forceanswer_help"></span>
                    <span slot="param_name" >{{lang.forceanswer}}</span>
                    <el-checkbox slot="param" v-model="forceanswer"></el-checkbox>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.disa_settings}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.authentication_help"></span>
                    <span slot="param_name" >{{lang.authentication}}</span>
                    <el-checkbox slot="param" v-model="disa_sw"></el-checkbox>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.secondary_dialing_help"></span>
                    <span slot="param_name" >{{lang.secondary_dialing}}</span>
                    <el-checkbox slot="param" v-model="second_dial_sw" :disabled="!disa_sw"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.disa_timeout_help"></span>
                    <span slot="param_name" >{{lang.disa_timeout}}</span>
                    <el-select slot="param" v-model="disa_timeout" :disabled="!disa_sw" style="width: 100%">
                        <el-option
                                v-for="i in 10"
                                :key="i"
                                :value="i"
                                :label="i+' s'"
                        ></el-option>
                    </el-select>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.max_password_digits_help"></span>
                    <span slot="param_name" >{{lang.max_password_digits}}</span>
                    <el-select slot="param" v-model="disa_password_digits" :disabled="!disa_sw" style="width: 100%">
                        <el-option
                                v-for="i in 10"
                                :key="i"
                                :value="i"
                                :label="i"
                        ></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.password_help"></span>
                    <span slot="param_name" >{{lang.password}}</span>
                    <el-input slot="param" v-model="revc_secret" :disabled="!disa_sw" show-password></el-input>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.advance_routing_rule}}</span></divider_item>

            <el-card class="box-card" style="padding: 10px;">
                <div slot="header" class="clearfix">
                    <el-tooltip placement="top" :open-delay=200>
                        <div slot="content" v-html="lang.calleeid_and_callerid_help"></div>
                        <span>{{lang.calleeid_and_callerid}}</span>
                    </el-tooltip>
                </div>

                <el-card
                        v-for="(item,index) in dial_pattren"
                        class="box-card"
                        shadow="never"
                        style="margin-top:5px;">

                    <i class="el-icon-close"
                       v-if="index!=0"
                       @click="remove_dial_pattren(index)"></i>

                    <el-row style="margin-top:5px;">
                        <el-col :lg="24">
                            <el-form-item>
                                <label slot="label">
                                    <span v-html="lang.callee_dial_pattern"></span>:
                                </label>
                                <el-col :lg="24">
                                    <el-row :gutter="10">
                                        <el-col :lg="3">
                                            <el-input
                                                    v-model="item.callee_prepend"
                                                    :placeholder="lang.prepend"></el-input>
                                        </el-col>
                                        <el-col :lg="3">
                                            <el-input
                                                    v-model="item.callee_prefix"
                                                    :placeholder="lang.prefix"></el-input>
                                        </el-col>
                                        <el-col :lg="4">
                                            <el-input
                                                    v-model="item.callee_match"
                                                    :placeholder="lang.match_pattern"></el-input>
                                        </el-col>

                                        <el-col :lg="2">
                                            <el-input
                                                    v-model="item.callee_sdfr"
                                                    :placeholder="lang.sdrf"></el-input>
                                        </el-col>
                                        <el-col :lg="2">
                                            <el-input
                                                    v-model="item.callee_sta"
                                                    :placeholder="lang.sta"></el-input>
                                        </el-col>
                                        <el-col :lg="2">
                                            <el-input
                                                    v-model="item.callee_rdfr"
                                                    :placeholder="lang.rdfr"></el-input>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row style="margin-top:5px;">
                        <el-col :lg="24">
                            <el-form-item>
                                <label slot="label">
                                    <span v-html="lang.caller_dial_pattern"></span>:
                                </label>
                                <el-col :lg="24">
                                    <el-row :gutter="10">
                                        <el-col :lg="3">
                                            <el-input
                                                    v-model="item.caller_prepend"
                                                    :disabled="item.caller_mode == 'on'"
                                                    :placeholder="lang.prepend"></el-input>
                                        </el-col>
                                        <el-col :lg="3">
                                            <el-input
                                                    v-model="item.caller_prefix"
                                                    :disabled="item.caller_mode == 'on'"
                                                    :placeholder="lang.prefix"></el-input>
                                        </el-col>
                                        <el-col :lg="4">
                                            <el-input
                                                    v-model="item.caller_match"
                                                    :placeholder="lang.match_pattern"></el-input>
                                        </el-col>

                                        <el-col :lg="2">
                                            <el-input
                                                    v-model="item.caller_sdfr"
                                                    :disabled="item.caller_mode == 'on'"
                                                    :placeholder="lang.sdrf"></el-input>
                                        </el-col>
                                        <el-col :lg="2">
                                            <el-input
                                                    v-model="item.caller_sta"
                                                    :disabled="item.caller_mode == 'on'"
                                                    :placeholder="lang.sta"></el-input>
                                        </el-col>
                                        <el-col :lg="2">
                                            <el-input
                                                    v-model="item.caller_rdfr"
                                                    :disabled="item.caller_mode == 'on'"
                                                    :placeholder="lang.rdfr"></el-input>
                                        </el-col>

                                        <el-col :lg="4">
                                            <el-input
                                                    v-model="item.caller_name"
                                                    :disabled="item.caller_mode == 'on'"
                                                    :placeholder="lang.caller_name"></el-input>
                                        </el-col>
                                        <el-col :lg="3">
                                            <el-select v-model="item.caller_mode">
                                                <el-option
                                                        value="off"
                                                        label="Modify_CallerID"></el-option>
                                                <el-option
                                                        value="on"
                                                        label="Filter_CallerID"></el-option>
                                            </el-select>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>

                <el-row>
                    <el-col :lg="12">
                        <el-button
                                type="primary"
                                style="margin-top:10px;"
                                @click="add_more_dial_pattren"
                                size="small">{{lang.add_more_dial_pattern}}</el-button>
                    </el-col>
                </el-row>
            </el-card>

            <el-card class="box-card" style="padding: 10px;margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <el-tooltip placement="top" :open-delay=200>
                        <div slot="content" v-html="lang.time_patterns_help"></div>
                        <span>{{lang.time_patterns}}</span>
                    </el-tooltip>
                </div>

                <el-card
                        v-for="(item,index) in time_patterns"
                        class="box-card"
                        shadow="never"
                        style="margin-top:5px;padding:5px 0 5px 20px;">

                    <i class="el-icon-close"
                       v-if="index!=0"
                       @click="remove_time_pattren(index)"></i>

                    <el-row style="margin-top:5px;">
                        <el-row>
                            <el-col :lg="6">
                                <el-row>
                                    <el-col :lg="8" style="line-height: 32px;text-align: right;">{{lang.time_to_start}}:</el-col>
                                    <el-col :lg="16">
                                        <el-time-picker
                                                v-model="item.start_time"
                                                size="small"
                                                :editable=false
                                                value-format="HH:mm"
                                                :placeholder="lang.any_time">
                                        </el-time-picker>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :lg="6">
                                <el-row>
                                    <el-col :lg="8" style="line-height: 32px;text-align: right;">{{lang.week_day_start}}:</el-col>
                                    <el-col :lg="16">
                                        <el-select v-model="item.start_week" size="small">
                                            <el-option key="-" value="">-</el-option>
                                            <el-option
                                                    v-for="week_item in week_options"
                                                    :key="week_item.value"
                                                    :value="week_item.value"
                                                    :label="lang[week_item.label]"
                                            ></el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :lg="6">
                                <el-row>
                                    <el-col :lg="8" style="line-height: 32px;text-align: right;">{{lang.month_day_start}}:</el-col>
                                    <el-col :lg="16">
                                        <el-select v-model="item.start_month_day" size="small">
                                            <el-option key="-" value="">-</el-option>
                                            <el-option
                                                v-for="i in 31"
                                                :key="i"
                                                :value="(Array(2).join(0) + i).slice(-2)"
                                                >{{(Array(2).join(0) + i).slice(-2)}}</el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :lg="6">
                                <el-row>
                                    <el-col :lg="8" style="line-height: 32px;text-align: right;">{{lang.month_start}}:</el-col>
                                    <el-col :lg="16">
                                        <el-select v-model="item.start_month" size="small">
                                            <el-option key="-" value="">-</el-option>
                                            <el-option
                                                v-for="month_item in month_options"
                                                :key="month_item.value"
                                                :label="lang[month_item.label]"
                                                :value="month_item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-row>

                    <el-row style="margin-top:5px;">
                        <el-row>
                            <el-col :lg="6">
                                <el-row>
                                    <el-col :lg="8" style="line-height: 32px;text-align: right;">{{lang.time_to_finish}}:</el-col>
                                    <el-col :lg="16">
                                        <el-time-picker
                                                v-model="item.finish_time"
                                                size="small"
                                                :editable=false
                                                value-format="HH:mm"
                                                :placeholder="lang.any_time">
                                        </el-time-picker>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :lg="6">
                                <el-row>
                                    <el-col :lg="8" style="line-height: 32px;text-align: right;">{{lang.week_day_finish}}:</el-col>
                                    <el-col :lg="16">
                                        <el-select v-model="item.finish_week" size="small">
                                            <el-option key="-" value="">-</el-option>
                                            <el-option
                                                    v-for="week_item in week_options"
                                                    :key="week_item.value"
                                                    :value="week_item.value"
                                                    :label="lang[week_item.label]"
                                            ></el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :lg="6">
                                <el-row>
                                    <el-col :lg="8" style="line-height: 32px;text-align: right;">{{lang.month_day_finish}}:</el-col>
                                    <el-col :lg="16">
                                        <el-select v-model="item.finish_month_day" size="small">
                                            <el-option key="-" value="">-</el-option>
                                            <el-option
                                                    v-for="i in 31"
                                                    :key="(Array(2).join(0) + i).slice(-2)"
                                                    :value="(Array(2).join(0) + i).slice(-2)"
                                            >{{i}}</el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :lg="6">
                                <el-row>
                                    <el-col :lg="8" style="line-height: 32px;text-align: right;">{{lang.month_finish}}:</el-col>
                                    <el-col :lg="16">
                                        <el-select v-model="item.finish_month" size="small">
                                            <el-option key="-" value="">-</el-option>
                                            <el-option
                                                    v-for="month_item in month_options"
                                                    :key="month_item.value"
                                                    :label="lang[month_item.label]"
                                                    :value="month_item.value"></el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-card>

                <el-row>
                    <el-col :lg="12">
                        <el-button
                                type="primary"
                                style="margin-top:10px;"
                                @click="add_more_time_pattren"
                                size="small">{{lang.add_more_time_pattern}}</el-button>
                    </el-col>
                </el-row>
            </el-card>

            <el-card class="box-card" style="padding: 10px;margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <el-tooltip placement="top" :open-delay=200>
                        <div slot="content" v-html="lang.change_rules"></div>
                        <span>{{lang.change_rules}}</span>
                    </el-tooltip>
                </div>

                <el-row style="margin-top:10px;">
                    <form_item>
                        <span slot="param_help" v-html="lang.forward_number_help"></span>
                        <span slot="param_name" >{{lang.forward_number}}</span>
                        <el-input slot="param" v-model="forwardnumber"></el-input>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item v-bind:param="'dialing_delay'">
                        <span slot="param_help" v-html="lang.dialing_delay_help"></span>
                        <span slot="param_name" >{{lang.dialing_delay}}</span>
                        <el-input slot="param" v-model="ruleForm.dialing_delay"></el-input>
                    </form_item>
                </el-row>
            </el-card>

            <el-card class="box-card" style="padding: 10px;margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <el-tooltip placement="top" :open-delay=200>
                        <div slot="content" v-html="lang.failover_call_through_number_help"></div>
                        <span>{{lang.failover_call_through_number}}</span>
                    </el-tooltip>
                </div>

                <el-card
                        v-for="(item,index) in failover_number"
                        class="box-card"
                        shadow="never"
                        style="margin-top:5px;padding:5px;">

                    <i class="el-icon-close"
                       v-if="index!=0"
                       style="margin-top:8px;"
                       @click="remove_failover_number(index)"></i>

                    <el-row>
                        <form_item>
                            <span slot="param_help" v-html="lang.failover_call_through_number_help"></span>
                            <span slot="param_name" >{{lang.failover_call_through_number}}</span>
                            <el-select slot="param" v-model="failover_number[index]">
                                <el-option-group
                                        v-for="type in selective_end"
                                        :key="type.label"
                                        :label="type.label">
                                    <el-option
                                            v-for="item in type.options"
                                            :key="item.value"
                                            :label="item.value"
                                            :value="item.value">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </form_item>
                    </el-row>
                </el-card>

                <el-row>
                    <el-col :lg="12">
                        <el-button
                                type="primary"
                                style="margin-top:10px;"
                                @click="add_failover_call"
                                size="small">{{lang.add_failover_call}}</el-button>
                    </el-col>
                </el-row>
            </el-card>

            <el-row v-if="from_channel.indexOf('fxo') > -1">
                <divider_item><span slot="title">{{lang.change_rules}}</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.cid_number_help"></span>
                        <span slot="param_name" >{{lang.cid_number}}</span>
                        <el-input slot="param" v-model="cidNumber"></el-input>
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
        name: "add",
        data() {
            var validateRouting_name = (rule, value, callback) => {
                for(let i=0;i<this.all_routing_data.length;i++){
                    if(this.$route.params.rule_name == this.all_routing_data[i]._section) continue
                    if(value == this.all_routing_data[i]._section){
                        callback(new Error('Already exist.'))
                        return false
                    }
                }

                let rex=/^[-_+.<>&0-9a-zA-Z]{1,32}$/i;
                if(value == ''){
                    callback(new Error('Must set.'))
                }else if(!rex.test(value)) {
                    callback(new Error(this.lang.check_diyname))
                }else{
                    callback()
                }
            }

            var validateFrom_channel = (rule, value, callback) => {
                if(value == ''){
                    callback(new Error('Must set.'))
                }else{
                    callback()
                }
            }

            var validateDialing_delay = (rule, value, callback) => {
                if((isNaN(parseInt(value)) || (parseFloat(value) < 0) || (parseFloat(value) > 60)) && value != ''){
                    callback(new Error('Must be number, range: 0-60.'))
                }else{
                    callback()
                }
            }
            return {
                ruleForm: {
                    routing_name: '',
                    from_channel: '',
                    to_channel: '',
                    dialing_delay: '',
                },
                rules: {
                    routing_name: [
                        { validator: validateRouting_name, trigger: 'blur' }
                    ],
                    from_channel: [
                        { validator: validateFrom_channel, trigger: 'change' }
                    ],
                    to_channel: [
                        { validator: validateFrom_channel, trigger: 'change' }
                    ],
                    dialing_delay: [
                        { validator: validateDialing_delay, trigger: 'blur' }
                    ],
                },
                order: '',
                routing_name: '',
                from_channel: '',
                to_channel: '',
                forceanswer: false,
                callee_pattern: '',
                caller_pattern: '',
                time_pattern: '',
                disa_sw: false,
                second_dial_sw: false,
                disa_timeout: '',
                disa_password_digits: '',
                revc_secret: '',
                forwardnumber: '',
                dialing_delay: '',
                cidNumber: '',

                selective_end: [
                    {
                        label: 'Port',
                        options: []
                    }, {
                        label: 'SIP',
                        options: []
                    }, {
                        label: 'Group',
                        options: []
                    }
                ],

                dial_pattren: [],

                time_patterns: [],

                week_options: [{
                    label: 'Monday',
                    value: 'mon'
                },{
                    label: 'Tuesday',
                    value: 'tue'
                },{
                    label: 'Wednesday',
                    value: 'wed'
                },{
                    label: 'Thursday',
                    value: 'thu'
                },{
                    label: 'Friday',
                    value: 'fri'
                },{
                    label: 'Saturday',
                    value: 'sat'
                },{
                    label: 'Sunday',
                    value: 'sun'
                }],

                month_options: [{
                    label: 'January',
                    value: 'jan'
                },{
                    label: 'February',
                    value: 'feb'
                },{
                    label: 'March',
                    value: 'mar'
                },{
                    label: 'April',
                    value: 'apr'
                },{
                    label: 'May',
                    value: 'may'
                },{
                    label: 'June',
                    value: 'jun'
                },{
                    label: 'July',
                    value: 'jul'
                }, {
                    label: 'August',
                    value: 'aug'
                }, {
                    label: 'September',
                    value: 'sep'
                }, {
                    label: 'October',
                    value: 'oct'
                }, {
                    label: 'November',
                    value: 'nov'
                }, {
                    label: 'December',
                    value: 'dec'
                }],

                failover_number: [],
                all_routing_data: [],

                loading: false,
                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let data_temp = data['_get']
                let routing_data = data_temp['_context']
                this.all_routing_data = data_temp['_routings']['_item']
                let analog_data = data_temp['_ana']['_item']
                let sip_data = data_temp['_sip']['_item']
                let group_data = data_temp['_group']['_item']

                this.ruleForm.routing_name = this.$route.params.rule_name == undefined ? '' : this.$route.params.rule_name
                this.ruleForm.from_channel = routing_data['_fromchannel']

                if(routing_data['_tochannel'] != null){
                    let to_channel_arr = routing_data['_tochannel'].split(',')
                    this.ruleForm.to_channel = to_channel_arr.shift()
                    this.failover_number = to_channel_arr
                }

                if(this.$route.params.rule_name != undefined){
                    this.forceanswer = routing_data['_forceanswer'] == 0 ? true : false
                }else{
                    this.forceanswer = false
                }

                this.forwardnumber = routing_data['_forwardnumber']
                if(this.$route.params.rule_name != undefined) {
                    this.disa_sw = routing_data['_disasw'] == 0 ? true : false
                }else{
                    this.disa_sw = false
                }
                if(this.$route.params.rule_name != undefined) {
                    this.second_dial_sw = routing_data['_seconddialsw'] == 0 ? true : false
                }else{
                    this.second_dial_sw = false
                }
                if(this.$route.params.rule_name != undefined) {
                    this.disa_timeout = parseInt(routing_data['_timeout'])
                }else{
                    this.disa_timeout = 5
                }
                if(this.$route.params.rule_name != undefined) {
                    this.disa_password_digits = routing_data['_maxpasswddigits']
                }else{
                    this.disa_password_digits = 10
                }
                this.order = routing_data['_order']
                this.ruleForm.dialing_delay = routing_data['_dialingdelay'].toFixed(2)
                this.revc_secret = data_temp['_revcsecret']
                this.cidNumber = data_temp['_cidnumber']

                if(routing_data['_calleedialpattern'] != '' && routing_data['_calleedialpattern'] != null){
                    this.callee_pattern = routing_data['_calleedialpattern']
                    this.caller_pattern = routing_data['_callerdialpattern']

                    let callee_pattren_temp = this.callee_pattern.split(',')
                    let caller_pattren_temp = this.caller_pattern.split(',')
                    callee_pattren_temp.forEach((item,index) => {
                        let callee_temp = item.split('|')
                        let caller_temp = caller_pattren_temp[index].split('|')

                        let obj = {
                            callee_prepend: callee_temp[0],
                            callee_prefix: callee_temp[1],
                            callee_match: callee_temp[2],
                            callee_sdfr: callee_temp[3],
                            callee_sta: callee_temp[4],
                            callee_rdfr: callee_temp[5],

                            caller_prepend: caller_temp[0],
                            caller_prefix: caller_temp[1],
                            caller_match: caller_temp[2],
                            caller_sdfr: caller_temp[3],
                            caller_sta: caller_temp[4],
                            caller_rdfr: caller_temp[5],
                            caller_name: caller_temp[6],
                            caller_mode: caller_temp[7]
                        }
                        this.dial_pattren.push(obj)
                    })
                }else{
                    let obj = {
                        callee_prepend: '',
                        callee_prefix: '',
                        callee_match: '',
                        callee_sdfr: '',
                        callee_sta: '',
                        callee_rdfr: '',

                        caller_prepend: '',
                        caller_prefix: '',
                        caller_match: '',
                        caller_sdfr: '',
                        caller_sta: '',
                        caller_rdfr: '',
                        caller_name: '',
                        caller_mode: ''
                    }
                    this.dial_pattren.push(obj)
                }

                if(routing_data['_timepattern'] != '' && routing_data['_timepattern'] != null){
                    routing_data['_timepattern'].split(',').forEach(item => {
                        let temp1 = item.split('|')
                        let time = temp1[0].split('-')
                        let week = temp1[1].split('-')
                        let month_day = temp1[2].split('-')
                        let month = temp1[3].split('-')

                        let obj = {
                            start_time: time[0],
                            start_week: week[0],
                            start_month_day: month_day[0],
                            start_month: month[0],

                            finish_time: time[1],
                            finish_week: week[1],
                            finish_month_day: month_day[1],
                            finish_month: month[1]
                        }

                        this.time_patterns.push(obj)
                    })
                }else{
                    let obj = {
                        start_time: '',
                        start_week: '',
                        start_month_day: '',
                        start_month: '',

                        finish_time: '',
                        finish_week: '',
                        finish_month_day: '',
                        finish_month: ''
                    }

                    this.time_patterns.push(obj)
                }

                analog_data.forEach(item => {
                    let val = item._signalling == 2
                            ? 'fxo-'+item._channel
                            : 'fxs-'+item._channel

                    let obj = {
                        lable: val,
                        value: val
                    }

                    this.selective_end[0].options.push(obj)
                })

                sip_data.forEach(item => {
                    let val = 'sip-'+item._section

                    let obj = {
                        label: val,
                        value: val
                    }

                    this.selective_end[1].options.push(obj)
                })

                group_data.forEach(item => {
                    let val = 'grp-'+item._section

                    let obj = {
                        label: val,
                        value: val
                    }

                    this.selective_end[2].options.push(obj)
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            add_more_dial_pattren(){
                const obj = {
                    callee_prepend: '',
                    callee_prefix: '',
                    callee_match: '',
                    callee_sdfr: '',
                    callee_sta: '',
                    callee_rdfr: '',

                    caller_prepend: '',
                    caller_prefix: '',
                    caller_match: '',
                    caller_sdfr: '',
                    caller_sta: '',
                    caller_rdfr: '',
                    caller_name: '',
                    caller_mode: ''
                }
                this.dial_pattren.push(obj)
            },
            remove_dial_pattren(index){
                this.dial_pattren.splice(index, 1)
            },
            add_more_time_pattren(){
                const obj = {
                    start_time: '',
                    start_week: '',
                    start_month_day: '',
                    start_month: '',

                    finish_time: '',
                    finish_week: '',
                    finish_month_day: '',
                    finish_month: ''
                }
                this.time_patterns.push(obj)
            },
            remove_time_pattren(index){
                this.time_patterns.splice(index, 1)
            },

            add_failover_call(){
                this.failover_number.push("")
            },
            remove_failover_number(index){
                this.failover_number.splice(index, 1)
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
                this.loading = true

                const RoutingContex = new AST_RoutingContex()

                RoutingContex._order = this.$route.params.order
                RoutingContex._fromchannel = this.ruleForm.from_channel

                let to_channel_str = this.ruleForm.to_channel.split().concat(this.failover_number).join(',')
                RoutingContex._tochannel = to_channel_str

                RoutingContex._forceanswer = this.forceanswer == true ? 0 : 1
                RoutingContex._forwardnumber = this.forwardnumber
                RoutingContex._disasw = this.disa_sw == true ? 0 : 1
                RoutingContex._seconddialsw = this.second_dial_sw == true ? 0 : 1
                RoutingContex._timeout = this.disa_timeout
                RoutingContex._dialingdelay = parseFloat(this.ruleForm.dialing_delay).toFixed(2)
                RoutingContex._maxpasswddigits = this.disa_password_digits

                const pattern_obj = {callee:[],caller:[]}
                this.dial_pattren.forEach(item => {
                    pattern_obj.callee.push(item.callee_prepend + '|'
                            + item.callee_prefix + '|'
                            + item.callee_match + '|'
                            + item.callee_sdfr + '|'
                            + item.callee_sta + '|'
                            + item.callee_rdfr)

                    pattern_obj.caller.push(item.caller_prepend + '|'
                            + item.caller_prefix + '|'
                            + item.caller_match + '|'
                            + item.caller_sdfr + '|'
                            + item.caller_sta + '|'
                            + item.caller_rdfr + '|'
                            + item.caller_name + '|'
                            + item.caller_mode)
                })
                RoutingContex._calleedialpattern = pattern_obj.callee.join(',')
                RoutingContex._callerdialpattern = pattern_obj.caller.join(',')

                const time_pattrens_arr = []
                if(this.time_patterns.length > 0) {
                    this.time_patterns.forEach(item => {
                        if((item.start_time != '' && item.start_time != 'null') || (item.finish_time != '' && item.finish_time != 'null') ||
                            item.start_week != '' || item.finish_week != '' ||
                            item.start_month_day != '' || item.finish_month_day != '' ||
                            item.start_month != '' || item.finish_month != ''
                        ) {

                            let str = item.start_time + '-' + item.finish_time + '|'
                                + item.start_week + '-' + item.finish_week + '|'
                                + item.start_month_day + '-' + item.finish_month_day + '|'
                                + item.start_month + '-' + item.finish_month

                            time_pattrens_arr.push(str)
                        }
                    })
                }
                RoutingContex._timepattern = time_pattrens_arr.join(',')

                let old_rule_name = this.$route.params.rule_name == undefined ? '' : this.$route.params.rule_name

                let cidNumber = this.cidNumber
                if(this.ruleForm.from_channel.indexOf('fxo') == -1){
                    cidNumber = ''
                }

                this.request.AGRoutingRulsSave(this.save_succeed_back, this.save_error_back, old_rule_name, this.ruleForm.routing_name, RoutingContex, cidNumber, this.revc_secret)
            },
            save_succeed_back(data){
                this.loading = false

                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: 80
                    })

                    this.$router.push('/Routing/Call-routing-rules')
                }else{
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: 80
                    })
                }
            },
            save_error_back(data){
                this.loading = false

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: 80
                })
            }
        },
        created() {
            let section = this.$route.params.rule_name == undefined ? null : this.$route.params.rule_name

            this.debug = debuger('routing-call-routing-rules-edit')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGRoutingRulsGetOne(this.show_succeed_back, this.show_error_back, section)
            }
        }
    }
</script>

<style scoped>
    .el-icon-close{
        font-size: 20px;
        color: red;
        font-weight: bold;
        float: right;
        cursor: pointer;
        margin: 0 10px;
        position: relative;
        z-index: 1000;
        height: 0;
    }
</style>