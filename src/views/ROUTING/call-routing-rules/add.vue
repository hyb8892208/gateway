<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.call_routing_rule}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom:50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left"><h3>{{lang.call_routing_rule}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.routing_name_help"></div>
                                <span>{{lang.routing_name}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="routing_name"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.call_comes_in_from_help"></div>
                                <span>{{lang.call_comes_in_from}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="from_channel" style="width: 100%">
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
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.send_call_throuth_help"></div>
                                <span>{{lang.send_call_throuth}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="to_channel" style="width: 100%">
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
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.forceanswer_help"></div>
                                <span>{{lang.forceanswer}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="forceanswer"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.disa_settings}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.authentication_help"></div>
                                <span>{{lang.authentication}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="disa_sw"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.secondary_dialing_help"></div>
                                <span>{{lang.secondary_dialing}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="second_dial_sw"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.disa_timeout_help"></div>
                                <span>{{lang.disa_timeout}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="disa_timeout" style="width: 100%">
                                <el-option
                                    v-for="i in 10"
                                    :key="i"
                                    :value="i"
                                    :label="i+' s'"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.max_password_digits_help"></div>
                                <span>{{lang.max_password_digits}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="disa_password_digits" style="width: 100%">
                                <el-option
                                        v-for="i in 10"
                                        :key="i"
                                        :value="i"
                                        :label="i"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.password_help"></div>
                                <span>{{lang.password}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="revc_secret" show-password></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.advance_routing_rule}}</h3></el-divider>

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
                        <el-row :gutter="10">
                            <el-col :lg="6">
                                {{lang.time_to_start}}:
                                <el-time-picker
                                        v-model="item.start_time"
                                        size="small"
                                        :editable=false
                                        value-format="HH:mm"
                                        :placeholder="lang.any_time">
                                </el-time-picker>
                            </el-col>
                            <el-col :lg="6">
                                {{lang.week_day_start}}:
                                <el-select v-model="item.start_week" size="small">
                                    <el-option
                                            v-for="week_item in week_options"
                                            :key="week_item.value"
                                            :value="week_item.label"
                                    >{{lang[week_item.label]}}</el-option>
                                </el-select>
                            </el-col>
                            <el-col :lg="6">
                                {{lang.month_day_start}}:
                                <el-select v-model="item.start_month_day" size="small">
                                    <el-option
                                        v-for="i in 31"
                                        :key="i"
                                        :value="i"
                                        >{{i}}</el-option>
                                </el-select>
                            </el-col>
                            <el-col :lg="6">
                                {{lang.month_start}}:
                                <el-select v-model="item.start_month" size="small">
                                    <el-option
                                        v-for="month_item in month_options"
                                        :key="month_item.value"
                                        :value="month_item.label">
                                        {{lang[month_item.label]}}
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-row>

                    <el-row style="margin-top:5px;">
                        <el-col :lg="24">
                            <el-col :lg="6">
                                {{lang.time_to_finish}}:
                                <el-time-picker
                                        v-model="item.finish_time"
                                        size="small"
                                        :editable=false
                                        value-format="HH:mm"
                                        :placeholder="lang.any_time">
                                </el-time-picker>
                            </el-col>
                            <el-col :lg="6">
                                {{lang.week_day_finish}}:
                                <el-select v-model="item.finish_week" size="small">
                                    <el-option
                                            v-for="week_item in week_options"
                                            :key="week_item.value"
                                            :value="week_item.label"
                                    >{{lang[week_item.label]}}</el-option>
                                </el-select>
                            </el-col>
                            <el-col :lg="6">
                                {{lang.month_day_finish}}:
                                <el-select v-model="item.finish_month_day" size="small">
                                    <el-option
                                            v-for="i in 31"
                                            :key="i"
                                            :value="i"
                                    >{{i}}</el-option>
                                </el-select>
                            </el-col>
                            <el-col :lg="6">
                                {{lang.month_finish}}:
                                <el-select v-model="item.finish_month" size="small">
                                    <el-option
                                            v-for="month_item in month_options"
                                            :key="month_item.value"
                                            :value="month_item.label">
                                        {{lang[month_item.label]}}
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-col>
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

            <el-divider content-position="left"><h3>{{lang.change_rules}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.forward_number_help"></div>
                                <span>{{lang.forward_number}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="forwardnumber"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.dialing_delay_help"></div>
                                <span>{{lang.dialing_delay}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="dialing_delay"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-card class="box-card" style="padding: 10px;margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <el-tooltip placement="top" :open-delay=200>
                        <div slot="content" v-html="lang.time_patterns_help"></div>
                        <span>{{lang.time_patterns}}</span>
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
                        <el-col :lg="12">
                            <el-form-item style="margin-bottom: 0 !important;">
                                <label slot="label">
                                    <el-tooltip placement="top" :open-delay=200>
                                        <div slot="content" v-html="lang.failover_call_through_number_help"></div>
                                        <span>{{lang.failover_call_through_number}}</span>
                                    </el-tooltip>:
                                </label>
                                <el-col :lg="18">
                                    <el-select v-model="failover_number[index]">
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
                                @click="add_failover_call"
                                size="small">{{lang.add_failover_call}}</el-button>
                    </el-col>
                </el-row>
            </el-card>

            <el-row v-if="from_channel.indexOf('fxo') > -1">
                <el-divider content-position="left"><h3>{{lang.change_rules}}</h3></el-divider>

                <el-row>
                    <el-col :lg="12">
                        <el-form-item>
                            <label slot="label">
                                <el-tooltip placement="top" :open-delay=200>
                                    <div slot="content" v-html="lang.cid_number_help"></div>
                                    <span>{{lang.cid_number}}</span>
                                </el-tooltip>:
                            </label>
                            <el-col :lg="18">
                                <el-input v-model="cidNumber"></el-input>
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
        name: "add",
        data() {
            return {
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
                let all_routing_data = data_temp['_routings']['_item']
                let analog_data = data_temp['_ana']['_item']
                let sip_data = data_temp['_sip']['_item']
                let group_data = data_temp['_group']['_item']

                this.routing_name = this.$route.params.rule_name == undefined ? '' : this.$route.params.rule_name
                this.from_channel = routing_data['_fromchannel']

                if(routing_data['_tochannel'] != null){
                    let to_channel_arr = routing_data['_tochannel'].split(',')
                    this.to_channel = to_channel_arr.shift()
                    this.failover_number = to_channel_arr
                }

                this.forceanswer = routing_data['_forceanswer'] == 0 ? true : false
                this.forwardnumber = routing_data['_forwardnumber']
                this.disa_sw = routing_data['_disasw'] == 0 ? true : false
                this.second_dial_sw = routing_data['_seconddialsw'] == 0 ? true : false
                this.disa_timeout = parseInt(routing_data['_timeout'])
                this.disa_password_digits = routing_data['_maxpasswddigits']
                this.order = routing_data['_order']
                this.dialing_delay = routing_data['_dialingdelay'].toFixed(2)
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

            Save(){
                const RoutingContex = new AST_RoutingContex()

                RoutingContex._order = 1
                RoutingContex._fromchannel = this.from_channel

                let to_channel_str = this.to_channel.split().concat(this.failover_number).join(',')
                RoutingContex._tochannel = to_channel_str

                RoutingContex._forceanswer = this.forceanswer == true ? 0 : 1
                RoutingContex._forwardnumber = this.forwardnumber
                RoutingContex._disasw = this.disa_sw == true ? 0 : 1
                RoutingContex._seconddialsw = this.second_dial_sw == true ? 0 : 1
                RoutingContex._timeout = this.disa_timeout
                RoutingContex._dialingdelay = parseFloat(this.dialing_delay).toFixed(2)
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

                console.log(this.time_patterns)
                const time_pattrens_arr = this.time_patterns.map(item => {
                    return item.start_time + '-' + item.finish_time + '|'
                        + item.start_week + '-' + item.finish_week + '|'
                        + item.start_month_day + '-' + item.finish_month_day + '|'
                        + item.start_month + '-' + item.finish_month
                })
                RoutingContex._timepattern = time_pattrens_arr.join(',')

                let old_rule_name = this.$route.params.rule_name == undefined ? '' : this.$route.params.rule_name

                let cidNumber = this.cidNumber
                if(this.from_channel.indexOf('fxo') == -1){
                    cidNumber = ''
                }

                this.request.AGRoutingRulsSave(this.save_succeed_back, this.save_error_back, old_rule_name, this.routing_name, RoutingContex, cidNumber, this.revc_secret)
            },
            save_succeed_back(data){
                console.log('data result:', data)
                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })

                this.$router.push('/Routing/Call-routing-rules')
            },
            save_error_back(data){
                console.log(data)
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },
        created() {
            let section = this.$route.params.rule_name == undefined ? null : this.$route.params.rule_name

            this.request = new request()
            this.request.AGRoutingRulsGetOne(this.show_succeed_back, this.show_error_back, section)
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