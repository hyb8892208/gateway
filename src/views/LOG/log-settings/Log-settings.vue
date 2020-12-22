<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.log_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.system_logs}}</span></divider_item>

            <el-row>
                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.system_logs_help"></span>
                                </div>
                                <span>{{lang.system_logs}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="system_logs"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.auto_clean_help"></span>
                                </div>
                                <span>{{lang.auto_clean}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="system_logs_autoclean"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.maxsize_help"></span>
                                </div>
                                <span>{{lang.maxsize}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="system_logs_maxsize" style="width: 100%">
                                <el-option
                                        v-for="item in maxsize_options1"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <divider_item><span slot="title">{{lang.asterisk_logs}}</span></divider_item>

            <el-row>
                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.verbose_help"></span>
                                </div>
                                <span>{{lang.verbose}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="asterisk_verbose"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.notice_help"></span>
                                </div>
                                <span>{{lang.notice}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="asterisk_notice"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.warning_help"></span>
                                </div>
                                <span>{{lang.warning}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="asterisk_warning"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.debug_help"></span>
                                </div>
                                <span>{{lang.debug}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="asterisk_debug"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.error_help"></span>
                                </div>
                                <span>{{lang.error}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="asterisk_error"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.dtmf_help"></span>
                                </div>
                                <span>{{lang.dtmf}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="asterisk_dtmf"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.auto_clean_help"></span>
                                </div>
                                <span>{{lang.auto_clean}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="asterisk_autoclean"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.maxsize_help"></span>
                                </div>
                                <span>{{lang.maxsize}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="asterisk_maxsize" style="width: 100%">
                                <el-option
                                        v-for="item in maxsize_options1"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <divider_item><span slot="title">{{lang.sip_logs}}</span></divider_item>

            <el-row>
                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.sip_logs_help"></span>
                                </div>
                                <span>{{lang.sip_logs}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="sip_logs"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.auto_clean_help"></span>
                                </div>
                                <span>{{lang.auto_clean}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="sip_autoclean"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.maxsize_help"></span>
                                </div>
                                <span>{{lang.maxsize}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="sip_maxsize" style="width: 100%">
                                <el-option
                                        v-for="item in maxsize_options1"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <divider_item><span slot="title">{{lang.dahdi_logs}}</span></divider_item>

            <el-row>
                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.dahdi_logs_help"></span>
                                </div>
                                <span>{{lang.dahdi_logs}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="dahdi_logs"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.auto_clean_help"></span>
                                </div>
                                <span>{{lang.auto_clean}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="dahdi_antoclean"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.maxsize_help"></span>
                                </div>
                                <span>{{lang.maxsize}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="dahdi_maxsize" style="width: 100%">
                                <el-option
                                        v-for="item in maxsize_options1"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <divider_item><span slot="title">{{lang.cdr}}</span></divider_item>

            <el-row>
                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.cdr_help"></span>
                                </div>
                                <span>{{lang.cdr}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="cdr"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.auto_clean_help"></span>
                                </div>
                                <span>{{lang.auto_clean}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="cdr_autoclean"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.maxsize_help"></span>
                                </div>
                                <span>{{lang.maxsize}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="cdr_maxsize" style="width: 100%">
                                <el-option
                                        v-for="item in maxsize_options2"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <divider_item><span slot="title">{{lang.syslog}}</span></divider_item>

            <el-row>
                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.local_syslog_help"></span>
                                </div>
                                <span>{{lang.local_syslog}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="local_syslog"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.server_address_help"></span>
                                </div>
                                <span>{{lang.server_address}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="server_address"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.server_port_help"></span>
                                </div>
                                <span>{{lang.server_port}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="server_port"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.klog_level_help"></span>
                                </div>
                                <span>{{lang.klog_level}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="klog_level" style="width: 100%">
                                <el-option
                                        v-for="item in klog_level_options"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :lg="8" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.cdr_level_help"></span>
                                </div>
                                <span>{{lang.cdr_level}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="cdr_level" style="width: 100%">
                                <el-option
                                        v-for="item in cdr_level_options"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value"></el-option>
                            </el-select>
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
        name: "Log-settings",
        data() {
            return {
                system_logs: false,
                system_logs_autoclean: false,
                system_logs_maxsize: '',

                asterisk_verbose: false,
                asterisk_notice: false,
                asterisk_warning: false,
                asterisk_debug: false,
                asterisk_error: false,
                asterisk_dtmf: false,
                asterisk_autoclean: false,
                asterisk_maxsize: '',

                sip_logs: false,
                sip_autoclean: false,
                sip_maxsize: '',

                dahdi_logs: false,
                dahdi_antoclean: false,
                dahdi_maxsize: '',

                cdr: false,
                cdr_autoclean: false,
                cdr_maxsize: '',

                local_syslog: false,
                server_address: '',
                server_port: '',
                klog_level: '',
                cdr_level: '',

                maxsize_options1: [{
                   label: '20KB',
                   value: '20KB'
                },{
                    label: '50KB',
                    value: '50KB'
                },{
                    label: '100KB',
                    value: '100KB'
                },{
                    label: '200KB',
                    value: '200KB'
                },{
                    label: '500KB',
                    value: '500KB'
                },{
                    label: '1MB',
                    value: '1MB'
                },{
                    label: '2MB',
                    value: '2MB'
                },{
                    label: '5MB',
                    value: '5MB'
                }],

                maxsize_options2: [{
                    label: '1MB',
                    value: '1MB'
                },{
                    label: '5MB',
                    value: '5MB'
                },{
                    label: '10MB',
                    value: '10MB'
                },{
                    label: '15MB',
                    value: '15MB'
                },{
                    label: '20MB',
                    value: '20MB'
                }],

                klog_level_options: [{
                    label: 'EMERG',
                    value: 0
                },{
                    label: 'ALERT',
                    value: 1
                },{
                    label: 'CRIT',
                    value: 2
                },{
                    label: 'ERROR',
                    value: 3
                },{
                    label: 'WARNING',
                    value: 4
                },{
                    label: 'NOTICE',
                    value: 5
                },{
                    label: 'INFO',
                    value: 6
                },{
                    label: 'DEBUG',
                    value: 7
                }],

                cdr_level_options: [{
                    label: 'OFF',
                    value: 0
                },{
                    label: 'EMERG',
                    value: 1
                },{
                    label: 'ALERT',
                    value: 2
                },{
                    label: 'CRIT',
                    value: 3
                },{
                    label: 'ERROR',
                    value: 4
                },{
                    label: 'WARNING',
                    value: 5
                },{
                    label: 'NOTICE',
                    value: 6
                },{
                    label: 'INFO',
                    value: 7
                },{
                    label: 'DEBUG',
                    value: 8
                }],

                lang: this.$store.state.lang
            }
        },
        methods: {
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let data_temp = data['_get']
                let gw_data = data_temp['_gw']['_item']
                let log_data = data_temp['_log4gw']
                let mon_data = data_temp['_monitor']['_item']
                let syslog = data_temp['_sysklog']

                this.local_syslog = syslog['_syslogsw'] == 1 ? true : false
                this.server_address = syslog['_serverip']
                this.server_port = syslog['_serverport']
                this.klog_level = parseInt(syslog['_sysloglevel'])
                this.cdr_level = parseInt(syslog['_cdrlevel'])

                if(log_data != null) {
                    log_data.split(',').forEach(item => {
                        switch (item) {
                            case 'verbose':
                                this.asterisk_verbose = true
                                break
                            case 'notice':
                                this.asterisk_notice = true
                                break
                            case 'warning':
                                this.asterisk_warning = true
                                break
                            case 'debug':
                                this.asterisk_debug = true
                                break
                            case 'dtmf':
                                this.asterisk_dtmf = true
                                break
                            case 'error':
                                this.asterisk_error = true
                                break
                            default:
                                break
                        }
                    })
                }

                mon_data.forEach(item => {
                    if(item._section == 'sys_log'){
                        this.system_logs_autoclean = item._autocleansw == 0 ? true : false
                        this.system_logs_maxsize = item._maxsize
                    }
                    if(item._section == 'ast_log'){
                        this.asterisk_autoclean = item._autocleansw == 0 ? true : false
                        this.asterisk_maxsize = item._maxsize
                    }
                    if(item._section == 'sip_log'){
                        this.sip_autoclean = item._autocleansw == 0 ? true : false
                        this.sip_maxsize = item._maxsize
                    }
                    if(item._section == 'cdr_log'){
                        this.cdr_autoclean = item._autocleansw == 0 ? true : false
                        this.cdr_maxsize = item._maxsize
                    }
                    if(item._section == 'dahdi_log'){
                        this.dahdi_antoclean = item._autocleansw == 0 ? true : false
                        this.dahdi_maxsize = item._maxsize
                    }
                })

                gw_data.forEach(item => {
                    if(item._section == 'sys-log'){
                        this.system_logs = item._rswitch == 0 ? true : false
                    }
                    if(item._section == 'sip-log'){
                        this.sip_logs = item._rswitch == 0 ? true : false
                    }
                    if(item._section == 'dahdi-log'){
                        this.dahdi_logs = item._rswitch == 0 ? true : false
                    }
                    if(item._section == 'cdr'){
                        this.cdr = item._rswitch == 0 ? true : false
                    }
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const LogSettingSave = new AST_LogSettingSave()
                const loggwcontextarr = new AST_LogGwContextArr()

                const sys_log = new AST_LogGwContext()
                sys_log._section = 'sys-log'
                sys_log._rswitch = this.system_logs == true ? 0 : 1
                loggwcontextarr._item.push(sys_log)

                const cdr_sw = new AST_LogGwContext()
                cdr_sw._section = 'cdr'
                cdr_sw._rswitch = this.cdr == true ? 0 : 1
                loggwcontextarr._item.push(cdr_sw)

                const dahdi_sw = new AST_LogGwContext()
                dahdi_sw._section = 'dahdi-log'
                dahdi_sw._rswitch = this.dahdi_logs == true ? 0 : 1
                loggwcontextarr._item.push(dahdi_sw)

                const sip_log = new AST_LogGwContext()
                sip_log._section = 'sip-log'
                sip_log._rswitch = this.sip_logs == true ? 0 : 1
                loggwcontextarr._item.push(sip_log)

                LogSettingSave._gw = loggwcontextarr

                let log4gw_arr = []
                this.asterisk_notice ? log4gw_arr.push('notice') : ''
                this.asterisk_warning ? log4gw_arr.push('warning') : ''
                this.asterisk_error ? log4gw_arr.push('error') : ''
                this.asterisk_debug ? log4gw_arr.push('debug') : ''
                this.asterisk_verbose ? log4gw_arr.push('verbose') : ''
                this.asterisk_dtmf ? log4gw_arr.push('dtmf') : ''
                LogSettingSave._log4gw = log4gw_arr.join(',')

                const LogMorContextArr = new AST_LogMorContextArr()

                let logmorcontext1 = new AST_LogMorContext()
                logmorcontext1._section = 'sys_log'
                logmorcontext1._autocleansw = this.system_logs_autoclean == true ? 0 : 1
                logmorcontext1._maxsize = this.system_logs_maxsize
                LogMorContextArr._item.push(logmorcontext1)

                let logmorcontext2 = new AST_LogMorContext()
                logmorcontext2._section = 'ast_log'
                logmorcontext2._autocleansw = this.asterisk_autoclean == true ? 0 : 1
                logmorcontext2._maxsize = this.asterisk_maxsize
                LogMorContextArr._item.push(logmorcontext2)

                let logmorcontext3 = new AST_LogMorContext()
                logmorcontext3._section = 'sip_log'
                logmorcontext3._autocleansw = this.sip_autoclean == true ? 0 : 1
                logmorcontext3._maxsize = this.sip_maxsize
                LogMorContextArr._item.push(logmorcontext3)

                let logmorcontext4 = new AST_LogMorContext()
                logmorcontext4._section = 'cdr_log'
                logmorcontext4._autocleansw = this.cdr_autoclean == true ? 0 : 1
                logmorcontext4._maxsize = this.cdr_maxsize
                LogMorContextArr._item.push(logmorcontext4)

                let logmorcontext5 = new AST_LogMorContext()
                logmorcontext5._section = 'dahdi_log'
                logmorcontext5._autocleansw = this.dahdi_antoclean == true ? 0 : 1
                logmorcontext5._maxsize = this.dahdi_maxsize
                LogMorContextArr._item.push(logmorcontext5)

                LogSettingSave._monitor = LogMorContextArr

                const LogGwSysklog = new AST_LogGwSysklog()

                LogGwSysklog._syslogsw = this.local_syslog == true ? 1 : 0
                LogGwSysklog._serverip = this.server_address
                LogGwSysklog._serverport = this.server_port
                LogGwSysklog._sysloglevel = this.klog_level
                LogGwSysklog._cdrlevel = this.cdr_level
                LogSettingSave._sysklog = LogGwSysklog

                console.log(LogSettingSave)
                this.request.AGLogSettingsSave(this.save_succeed_back, this.save_error_back, LogSettingSave)
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
            this.request.AGLogSettingsGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>
