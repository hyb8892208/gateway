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
            {{lang.time_settings}}
            <div style="float: right;line-height: 50px;margin-right: 20px;">
                <el-button type="primary" size="small" @click="ntpValidator('ruleForm', 'ntp')">{{lang.sync_ntp}}</el-button>
                <el-button type="primary" size="small" @click="ntpValidator('ruleForm', 'client')">{{lang.sync_client}}</el-button>
            </div>
        </h1>
    </div>

    <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom:50px;overflow: visible;" :style=$store.state.page.card_width>
        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.system_time_help"></span>
                <span slot="param_name" >{{lang.system_time}}</span>
                <span slot="param">{{currenttime}}</span>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.time_zone_help"></span>
                <span slot="param_name" >{{lang.time_zone}}</span>
                <el-select slot="param" v-model="timezone_value" style="width: 100%;" @change="timeout_change" :placeholder="lang.select_placeholder" >
                    <el-option-group
                            v-for="timezone in timezones"
                            :key="timezone.label"
                            :label="lang[timezone.label]">
                        <el-option
                                v-for="item in timezone.options"
                                :key="item.value"
                                :label="lang[item.label]"
                                :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.posix_tz_string_help"></span>
                <span slot="param_name" >{{lang.posix_tz_string}}</span>
                <el-input slot="param" :disabled="true" value="fff" v-model="show_TZ" ></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item v-bind:param="'ntp_server1'">
                <span slot="param_help" v-html="lang.ntp_server1_help"></span>
                <span slot="param_name" >{{lang.ntp_server1}}</span>
                <el-input slot="param" id="ntp_server1" v-model="ruleForm.ntp_server1" ></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item v-bind:param="'ntp_server2'">
                <span slot="param_help" v-html="lang.ntp_server2_help"></span>
                <span slot="param_name" >{{lang.ntp_server2}}</span>
                <el-input slot="param" id="ntp_server2" v-model="ruleForm.ntp_server2" ></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item v-bind:param="'ntp_server3'">
                <span slot="param_help" v-html="lang.ntp_server3_help"></span>
                <span slot="param_name" >{{lang.ntp_server3}}</span>
                <el-input slot="param" id="ntp_server3" v-model="ruleForm.ntp_server3" ></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.auto_sync_from_ntp_help"></span>
                <span slot="param_name" >{{lang.auto_sync_from_ntp}}</span>
                <el-checkbox slot="param" v-model="auto_sync_sw"></el-checkbox>
            </form_item>
        </el-row>
    </el-card>

    <el-dialog
          :visible.sync="dialogVisible"
          :width="$store.state.page.dialog_width"
          style="text-align: center"
          :before-close="handleClose">
        <div style="font-size: 40px;line-height: 35px;" :style="[{color: sync_result_flag ? '#67C23A' : '#F56C6C'}]">
            <i v-if="sync_result_flag" class="el-icon-circle-check"></i>
            <i v-else class="el-icon-warning-outline"></i>
        </div>
        <div style="font-size: 20px;font-weight: bold;line-height: 35px;" v-html="sync_result_flag ? lang.success : lang.failed"></div>
        <div style="line-height: 35px;">{{sync_result}}</div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="Close_report">{{lang.confirm}}</el-button>
        </span>
    </el-dialog>

  </el-form>
</template>

<script>
    import {clock} from "../../../components/clock";
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    const country = [
            {
                label: 'australia',
                options: [{
                    label: 'melbourne',
                    value: 'Australia/Melbourne@EST-10EST,M10.5.0,M3.5.0/3'
                }, {
                    label: 'perth',
                    value: 'Australia/Perth@WST-8'
                },{
                    label: 'brisbane',
                    value: 'Australia/Brisbane@EST-10'
                },{
                    label: 'adelaide',
                    value: 'Australia/Adelaide@CST-9:30CST,M10.5.0,M3.5.0/3'
                },{
                    label: 'darwin',
                    value: 'Australia/Darwin@CST-9:30'
                },{
                    label: 'hobart',
                    value: 'Australia/Hobart@EST-10EST,M10.1.0,M3.5.0/3'
                }]
            }, {
                label: 'europe',
                options: [{
                    label: 'amsterdam',
                    value: 'Europe/Amsterdam@CET-1CEST,M3.5.0,M10.5.0/3'
                }, {
                    label: 'athens',
                    value: 'Europe/Athens@EET-2EEST,M3.5.0/3,M10.5.0/4'
                }, {
                    label: 'berlin',
                    value: 'Europe/Berlin@CET-1CEST,M3.5.0,M10.5.0/3'
                }, {
                    label: 'brussels',
                    value: 'Europe/Brussels@CET-1CEST,M3.5.0,M10.5.0/3'
                },{
                    label: 'bratislava',
                    value: 'Europe/Bratislava@CET-1CEST,M3.5.0,M10.5.0/3'
                },{
                    label: 'budapest',
                    value: 'Europe/Budapest@CET-1CEST,M3.5.0,M10.5.0/3'
                },{
                    label: 'copenhagen',
                    value: 'Europe/Copenhagen@CET-1CEST,M3.5.0,M10.5.0/3'
                },{
                    label: 'dublin',
                    value: 'Europe/Dublin@GMT0IST,M3.5.0/1,M10.5.0'
                },{
                    label: 'helsinki',
                    value: 'Europe/Helsinki@EET-2EEST,M3.5.0/3,M10.5.0/4'
                },{
                    label: 'kyiv',
                    value: 'Europe/Kiev@EET-2EEST,M3.5.0/3,M10.5.0/4'
                },{
                    label: 'lisbon',
                    value: 'Europe/Lisbon@WET0WEST,M3.5.0/1,M10.5.0'
                },{
                    label: 'london',
                    value: 'Europe/London@GMT0BST,M3.5.0/1,M10.5.0'
                },{
                    label: 'madrid',
                    value: 'Europe/Madrid@CET-1CEST,M3.5.0,M10.5.0/3'
                },{
                    label: 'oslo',
                    value: 'Europe/Oslo@CET-1CEST,M3.5.0,M10.5.0/3'
                },{
                    label: 'paris',
                    value: 'Europe/Paris@CET-1CEST,M3.5.0,M10.5.0/3'
                },{
                    label: 'prague',
                    value: 'Europe/Prague@CET-1CEST,M3.5.0,M10.5.0/3'
                },{
                    label: 'roma',
                    value: 'Europe/Rome@CET-1CEST,M3.5.0,M10.5.0/3'
                },{
                    label: 'moscow',
                    value: 'Europe/Moscow@MSK-3'
                },{
                    label: 'stockholm',
                    value: 'Europe/Stockholm@CET-1CEST,M3.5.0,M10.5.0/3'
                },{
                    label: 'zurich',
                    value: 'Europe/Zurich@CET-1CEST,M3.5.0,M10.5.0/3'
                }]
            }, {
                label: 'new_zealand',
                options: [{
                    label: 'auckland',
                    value: 'Pacific/Auckland@NZST-12NZDT,M10.1.0,M3.3.0/3'
                }]
            }, {
                label: 'usa_and_canada',
                options: [{
                    label: 'hawaii',
                    value: 'Pacific/Honolulu@HST10'
                }, {
                    label: 'alaska_time',
                    value: 'America/Anchorage@AKST9AKDT,M3.2.0,M11.1.0'
                }, {
                    label: 'pacific_time',
                    value: 'America/Los_Angeles@PST8PDT,M3.2.0,M11.1.0'
                }, {
                    label: 'mountain_time',
                    value: 'America/Denver@MST7MDT,M3.2.0,M11.1.0'
                }, {
                    label: 'mountain_time_no_dst',
                    value: 'America/Phoenix@MST7'
                }, {
                    label: 'central_time',
                    value: 'America/Chicago@CST6CDT,M3.2.0,M11.1.0'
                }, {
                    label: 'eastern_time',
                    value: 'America/New_York@EST5EDT,M3.2.0,M11.1.0'
                }]
            }, {
                label: 'atlantic',
                options: [{
                    label: 'bermuda',
                    value: 'Atlantic/Bermuda@AST4ADT,M3.2.0,M11.1.0'
                }]
            }, {
                label: 'asia_1',
                options: [{
                    label: 'anadyr',
                    value: 'Asia/Anadyr@ANAT-12ANAST,M3.5.0,M10.5.0/3'
                }]
            }, {
                label: 'asia_2',
                options: [{
                    label: 'amman',
                    value: 'Asia/Amman@EET-2EEST,M3.5.4/0,M10.5.5/1'
                },{
                    label: 'beirut',
                    value: 'Asia/Beirut@EET-2EEST,M3.5.0/0,M10.5.0/0'
                },{
                    label: 'damascus',
                    value: 'Asia/Damascus@EET-2EEST,J91/0,J274/0'
                },{
                    label: 'gaza',
                    value: 'Asia/Gaza@EET-2EEST,J91/0,M10.3.5/0'
                },{
                    label: 'jerusalem',
                    value: 'Asia/Jerusalem@GMT-2'
                },{
                    label: 'nicosia',
                    value: 'Asia/Nicosia@EET-2EEST,M3.5.0/3,M10.5.0/4'
                }]
            }, {
                label: 'asia_3',
                options: [{
                    label: 'aden',
                    value: 'Asia/Aden@AST-3'
                },{
                    label: 'baghdad',
                    value: 'Asia/Baghdad@AST-3ADT,J91/3,J274/4'
                },{
                    label: 'bahrain',
                    value: 'Asia/Bahrain@AST-3'
                },{
                    label: 'kuwait',
                    value: 'Asia/Kuwait@AST-3'
                },{
                    label: 'qatar',
                    value: 'Asia/Qatar@AST-3'
                },{
                    label: 'riyadh',
                    value: 'Asia/Riyadh@AST-3'
                }],
            }, {
                label: 'asia_3_1',
                options: [{
                    label: 'tehran',
                    value: 'IRST-3:30'
                }],
            }, {
                label: 'asia_4',
                options: [{
                    label: 'baku',
                    value: 'Asia/Baku@AZT-4AZST,M3.5.0/4,M10.5.0/5'
                },{
                    label: 'dubai',
                    value: 'Asia/Dubai@GST-4'
                },{
                    label: 'muscat',
                    value: 'Asia/Muscat@GST-4'
                },{
                    label: 'tbilisi',
                    value: 'Asia/Tbilisi@GET-4'
                },{
                    label: 'yerevan',
                    value: 'Asia/Yerevan@AMT-4AMST,M3.5.0,M10.5.0/3'
                }],
            }, {
                label: 'asia_4_1',
                options: [{
                    label: 'kabul',
                    value: 'Asia/Kabul@AFT-4:30'
                }],
            }, {
                label: 'asia_5',
                options: [{
                    label: 'aqtobe',
                    value: 'Asia/Aqtobe@AQTT-5'
                },{
                    label: 'ashgabat',
                    value: 'Asia/Ashgabat@TMT-5'
                },{
                    label: 'dushanbe',
                    value: 'Asia/Dushanbe@TJT-5'
                },{
                    label: 'karachi',
                    value: 'Asia/Karachi@PKT-5'
                },{
                    label: 'oral',
                    value: 'Asia/Oral@ORAT-5'
                },{
                    label: 'samarkand',
                    value: 'Asia/Samarkand@UZT-5'
                },{
                    label: 'tashkent',
                    value: 'Asia/Tashkent@UZT-5'
                },{
                    label: 'yekaterinburg',
                    value: 'Asia/Yekaterinburg@YEKT-5'
                }],
            }, {
                label: 'asia_5_1',
                options: [{
                    label: 'calcutta',
                    value: 'Asia/Calcutta@IST-5:30'
                },{
                    label: 'colombo',
                    value: 'Asia/Colombo@IST-5:30'
                }],
            }, {
                label: 'asia_6',
                options: [{
                    label: 'almaty',
                    value: 'Asia/Almaty@ALMT-6'
                },{
                    label: 'bishkek',
                    value: 'Asia/Bishkek@KGT-6'
                },{
                    label: 'dhaka',
                    value: 'Asia/Dhaka@BDT-6'
                },{
                    label: 'novosibirsk',
                    value: 'Asia/Novosibirsk@NOVT-6'
                },{
                    label: 'omsk',
                    value: 'Asia/Omsk@OMST-6'
                },{
                    label: 'qyzylorda',
                    value: 'Asia/Qyzylorda@QYZT-6'
                },{
                    label: 'thimphu',
                    value: 'Asia/Thimphu@BTT-6'
                }],
            }, {
                label: 'asia_7',
                options: [{
                    label: 'jakarta',
                    value: 'Asia/Jakarta@WIT-7'
                },{
                    label: 'bangkok',
                    value: 'Asia/Bangkok@ICT-7'
                },{
                    label: 'vientiane',
                    value: 'Asia/Vientiane@ICT-7'
                },{
                    label: 'phnom_penh',
                    value: 'Asia/Phnom_Penh@ICT-7'
                }],
            }, {
                label: 'asia_8',
                options: [{
                    label: 'chongqing',
                    value: 'Asia/Chongqing@CST-8'
                },{
                    label: 'hong_kong',
                    value: 'Asia/Hong_Kong@HKT-8'
                },{
                    label: 'shanghai',
                    value: 'Asia/Shanghai@CST-8'
                },{
                    label: 'singapore',
                    value: 'Asia/Singapore@SGT-8'
                },{
                    label: 'urumqi',
                    value: 'Asia/Urumqi@CST-8'
                },{
                    label: 'taiwan',
                    value: 'Asia/Taipei@CST-8'
                },{
                    label: 'ulaanbaatar',
                    value: 'Asia/Ulaanbaatar@ULAT-8ULAST,M3.5.6,M9.5.6/0'
                }]
            }, {
                label: 'asia_9',
                options: [{
                    label: 'dili',
                    value: 'Asia/Dili@TLT-9'
                },{
                    label: 'jayapura',
                    value: 'Asia/Jayapura@EIT-9'
                },{
                    label: 'pyongyang',
                    value: 'Asia/Pyongyang@KST-9'
                },{
                    label: 'seoul',
                    value: 'Asia/Seoul@KST-9'
                },{
                    label: 'tokyo',
                    value: 'Asia/Tokyo@JST-9'
                },{
                    label: 'yakutsk',
                    value: 'Asia/Yakutsk@YAKT-9YAKST,M3.5.0,M10.5.0/3'
                }]
            }, {
                label: 'central_and_south_america',
                options: [{
                    label: 'sao_paulo',
                    value: 'America/Sao_Paulo@BRT3BRST,M11.1.0/0,M2.5.0/0'
                },{
                    label: 'buenos_aires',
                    value: 'America/Buenos_Aires@ART3'
                },{
                    label: 'central_america',
                    value: 'America/Guatemala@CST6'
                },{
                    label: 'caracas',
                    value: 'America/Caracas@VET4:30'
                }]
            }]

    export default {
        name: "System-time",
        inject:['reload'],
        data() {
            var ntpserver = (rule, value, callback) => {
                let rex1 = /^(([a-z0-9](w|-){0,61}?[a-z0-9]|[a-z0-9]).){1,}(aero|arpa|asia|biz|cat|com|coop|co|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])(.[a-z][a-z]){0,1}$/i;
                let rex2 = /^((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\.){3}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)$/i;
                if(value == ''){
                    callback()
                }else if(value.length > 31) {
                    callback(new Error(this.lang.limit_character))
                }else if(!rex1.test(value) && !rex2.test(value)) {
                    callback(new Error(this.lang.check_domain))
                }else{
                    callback()
                }
            };

            return {
                ruleForm: {
                    ntp_server1: '',
                    ntp_server2: '',
                    ntp_server3: ''
                },
                rules: {
                    ntp_server1: [
                        { validator: ntpserver, trigger: 'blur' }
                    ],
                    ntp_server2: [
                        { validator: ntpserver, trigger: 'blur' }
                    ],
                    ntp_server3: [
                        { validator: ntpserver, trigger: 'blur' }
                    ]
                },

                currenttime: '',//时钟
                timezone_value: '',//时区的值
                show_TZ: '',//显示时区
                auto_sync_sw: '',//自动同步开关

                sync_result: '',
                sync_result_flag: false,

                timezones: country,

                dialogVisible: false,

                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods:{
            timeout_change(){
                let timeout_val = this.timezone_value;
                this.show_TZ = timeout_val.split('@')[1];
            },

            ctime(timestamp) {//时钟
                this.currenttime = clock(timestamp)

                timestamp++
                clearTimeout(this.TimeoutID)
                this.TimeoutID = setTimeout(this.ctime, 1000, timestamp)
            },
            SysTimeSave(){
                let systime = new AST_SysTime()
                systime._timezone = this.timezone_value

                let autosync = this.auto_sync_sw == true ? 'on' : 'off'
                systime._autosync = autosync

                systime._ntp1 = this.ruleForm.ntp_server1
                systime._ntp2 = this.ruleForm.ntp_server2
                systime._ntp3 = this.ruleForm.ntp_server3

                let SysTimeSave = new AST_SysTimeSave()
                SysTimeSave._time = systime
                SysTimeSave._tz = this.show_TZ

                return SysTimeSave
            },
            zonefile(){
                let ps = this.timezone_value.split("@")
                let zonefile
                if(ps[0] != undefined){
                    if(ps[0] == '-'){
                        zonefile = 'UTC'
                    }else{
                        let zoneinfo = ps[0].split('/')
                        zonefile = zoneinfo[1]
                    }
                }else{
                    zonefile = 'UTC'
                }

                return zonefile
            },
            handleClose(){
                if(this.sync_result == '') {
                    this.$confirm(this.lang.dialog_close_confirm)
                        .then(_ => {
                            this.dialogVisible = false
                            //更新页面参数时间
                            this.reload()
                        })
                }else{
                    this.dialogVisible = false
                    this.reload()
                }
            },
            Close_report(){
                this.dialogVisible = false
                //更新页面参数时间
                this.reload()
            },
            ntpValidator(formName, type){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(type == 'ntp'){
                            this.sync_from_ntp()
                        }else{
                            this.sync_from_client()
                        }
                    } else {
                        return false;
                    }
                });
            },
            sync_from_ntp(){
                this.dialogVisible = true
                this.loading = this.$loading({//在dialog容器中增加loading
                    lock: false,
                    text: this.lang.ntp_running_tip + '...',
                    background: '#ffffff',
                    target: '.el-dialog',
                    body: false,
                })

                let SysTimeSave = this.SysTimeSave()
                let zonefile = this.zonefile()
                console.log(SysTimeSave)

                this.request.AGSysTimeSave(this.ntp_succeed_back, this.ntp_error_back, SysTimeSave, zonefile, null)
            },
            sync_from_client(){
                this.dialogVisible = true
                this.loading = this.$loading({//在dialog容器中增加loading
                    lock: false,
                    text: this.lang.client_running_tip+'...',
                    background: '#ffffff',
                    target: '.el-dialog',
                    body: false,
                })

                let SysTimeSave = this.SysTimeSave()
                let zonefile = this.zonefile()

                let clientDate = new Date();
                let client_year = clientDate.getFullYear()
                let client_mon = clientDate.getMonth()+1
                let client_date = clientDate.getDate()
                let client_hour = clientDate.getHours()
                let client_min = clientDate.getMinutes()
                let client_second = clientDate.getSeconds()
                let curTime = `${client_year}-${client_mon}-${client_date} ${client_hour}:${client_min}:${client_second}`

                this.request.AGSysTimeSave(this.client_succeed_back, this.client_error_back, SysTimeSave, zonefile, curTime)
            },

            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _date = data['_get']['_date']
                let _time = data['_get']['_time']

                let year = _date['_year']
                let month = _date['_month']
                let day = _date['_day']
                let hour = _date['_hour']
                let minute = _date['_minute']
                let second = _date['_second']
                let time = `${year}-${month}-${day} ${hour}:${minute}:${second}`

                let timestamp = Date.parse(time)/1000 //转换时间戳
                this.ctime(timestamp)//初始化时间

                this.timezone_value = _time['_timezone']
                this.show_TZ = this.timezone_value.split('@')[1]
                this.ruleForm.ntp_server1 = _time['_ntp1']
                this.ruleForm.ntp_server2 = _time['_ntp2']
                this.ruleForm.ntp_server3 = _time['_ntp3']

                this.auto_sync_sw = _time['_autosync'] == 'on' ? true : false
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            ntp_succeed_back(data){
                this.loading.close()

                if(data['_result'] == 'ok1'){
                    this.sync_result = `NTP: ${this.ruleForm.ntp_server1} ${this.lang.synchronize_succeeded}`
                    this.sync_result_flag = true
                }else if(data['_result'] == 'ok2'){
                    this.sync_result = `NTP: ${this.ruleForm.ntp_server2} ${this.lang.synchronize_succeeded}`
                    this.sync_result_flag = true
                }else if(data['_result'] == 'ok3') {
                    this.sync_result = `NTP: ${this.ruleForm.ntp_server3} ${this.lang.synchronize_succeeded}`
                    this.sync_result_flag = true
                }else {
                    this.sync_result = `NTP: ${this.lang.synchronize_failed}`
                    this.sync_result_flag = false
                }
            },
            ntp_error_back(){
                console.log('sync ntp error')
                this.loading.close()
                //这里处理为成功，因为同步时间成功的时候会返回失败
                this.sync_result = `NTP: ${this.ruleForm.ntp_server1} ${this.lang.synchronize_succeeded}`
                this.sync_result_flag = true
            },
            client_succeed_back(data){
                this.loading.close()
                if(data['_result'] == 'ok'){
                    this.sync_result = `Client: ${this.lang.synchronize_succeeded}`
                    this.sync_result_flag = true
                }else{
                    this.sync_result = `Client: ${this.lang.synchronize_failed}`
                    this.sync_result_flag = false
                }
            },
            client_error_back(){
                console.log('sync client error')
                this.loading.close()
                //这里处理为成功，因为同步时间成功的时候会返回失败
                this.sync_result = `Client: ${this.lang.synchronize_succeeded}`
                this.sync_result_flag = true
            }
        },
        created() {
            this.debug = debuger('system-time')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGSysTimeGet(this.show_succeed_back, this.show_error_back)
            }
        },
        beforeDestroy() {
            clearTimeout(this.TimeoutID)
        }
    }
</script>

<style scoped>
    .change-label-class /deep/ .el-form-item__label {
        padding: 0;
    }
</style>