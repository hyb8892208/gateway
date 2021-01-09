<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.global_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="Save()"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" v-loading="loading" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.general}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.tone_duration_help"></span>
                    <span slot="param_name" >{{lang.tone_duration}}</span>
                    <el-input slot="param" v-model="toneduration"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.tone_interval_help"></span>
                    <span slot="param_name" >{{lang.tone_interval}}</span>
                    <el-input slot="param" v-model="toneinterval"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.dial_timeout_help"></span>
                    <span slot="param_name" >{{lang.dial_timeout}}</span>
                    <el-input slot="param" v-model="dialtimeout"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.echo_type_help"></span>
                    <span slot="param_name" >{{lang.echo_type}}</span>
                    <el-select slot="param" v-model="echotype" style="width: 100%;">
                        <el-option
                                v-for="item in echotype_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.echo_mode_help"></span>
                    <span slot="param_name" >{{lang.echo_mode}}</span>
                    <el-select slot="param" v-model="echomode" style="width: 100%;">
                        <el-option
                                v-for="item in echomode_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.echo_cancel_tap_length_help"></span>
                    <span slot="param_name" >{{lang.echo_cancel_tap_length}}</span>
                    <span slot="param">
                        <el-input v-if="echotype == 0" v-model="echocancel"></el-input>

                        <el-select v-else v-model="echocancel" style="width: 100%;">
                            <el-option
                                    v-for="item in echocancel_options"
                                    :label="item"
                                    :key="item"
                                    :value="item"></el-option>
                        </el-select>
                    </span>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.FXS_signaling_help"></span>
                    <span slot="param_name" >{{lang.FXS_signaling}}</span>
                    <span slot="param">
                        <el-select v-model="fxs_signaling" style="width: 100%;">
                            <el-option
                                    v-for="item in fxs_signaling_options"
                                    :label="item.label"
                                    :key="item.value"
                                    :value="item.value"></el-option>
                        </el-select>
                    </span>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.fax}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.mode_help"></span>
                    <span slot="param_name" >{{lang.mode}}</span>
                    <el-select slot="param" v-model="mode" style="width: 100%;">
                        <el-option
                                v-for="item in mode_options"
                                :label="lang[item.label]"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.rate_help"></span>
                    <span slot="param_name" >{{lang.rate}}</span>
                    <el-select slot="param" v-model="rate" style="width: 100%;">
                        <el-option
                                v-for="item in rate_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.ecm_help"></span>
                    <span slot="param_name" >{{lang.ecm}}</span>
                    <el-checkbox slot="param" v-model="ecm"></el-checkbox>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.country}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.country_help"></span>
                    <span slot="param_name" >{{lang.country}}</span>
                    <el-select slot="param" v-model="country"
                               @change="country_change"
                               style="width: 100%;">
                        <el-option
                                v-for="item in country_options"
                                :label="lang[item.label]"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.ring_cadence_help"></span>
                    <span slot="param_name" >{{lang.ring_cadence}}</span>
                    <el-input slot="param" v-model="ind_ringcadence" :readonly="country != 'custom'"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.dial_tone_help"></span>
                    <span slot="param_name" >{{lang.dial_tone}}</span>
                    <el-input slot="param" v-model="ind_dial" :readonly="country != 'custom'"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.ring_tone_help"></span>
                    <span slot="param_name" >{{lang.ring_tone}}</span>
                    <el-input slot="param" v-model="ind_ring" :readonly="country != 'custom'"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.busy_tone_help"></span>
                    <span slot="param_name" >{{lang.busy_tone}}</span>
                    <el-input slot="param" v-model="ind_busy" :readonly="country != 'custom'"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.call_waiting_tone_help"></span>
                    <span slot="param_name" >{{lang.call_waiting_tone}}</span>
                    <el-input slot="param" v-model="ind_callwaiting" :readonly="country != 'custom'"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.congestion_tone_help"></span>
                    <span slot="param_name" >{{lang.congestion_tone}}</span>
                    <el-input slot="param" v-model="ind_congestion" :readonly="country != 'custom'"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.dial_recall_tone_help"></span>
                    <span slot="param_name" >{{lang.dial_recall_tone}}</span>
                    <el-input slot="param" v-model="ind_dialrecall" :readonly="country != 'custom'"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.record_tone_help"></span>
                    <span slot="param_name" >{{lang.record_tone}}</span>
                    <el-input slot="param" v-model="ind_record" :readonly="country != 'custom'"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.info_tone_help"></span>
                    <span slot="param_name" >{{lang.info_tone}}</span>
                    <el-input slot="param" v-model="ind_info" :readonly="country != 'custom'"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.stutter_tone_help"></span>
                    <span slot="param_name" >{{lang.stutter_tone}}</span>
                    <el-input slot="param" v-model="ind_stutter" :readonly="country != 'custom'"></el-input>
                </form_item>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Advanced",
        data(){
            return {
                toneduration: '',
                toneinterval: '',
                dialtimeout: '1800',
                old_echotype: '',
                echotype: '',
                old_echocancel: '',
                echocancel: '',
                echomode: '',
                fxs_signaling: '',
                mode: '',
                rate: '',
                ecm: false,

                old_country: '',
                country: '',
                ind_ringcadence: '',
                ind_dial: '',
                ind_ring: '',
                ind_busy: '',
                ind_callwaiting: '',
                ind_congestion: '',
                ind_dialrecall: '',
                ind_record: '',
                ind_info: '',
                ind_stutter: '',

                flag: 0,

                fxs_signaling_options: [{
                    label: 'Loop start',
                    value: 0
                },{
                    label: 'Kewlstart',
                    value: 1
                }],

                echotype_options: [{
                    label: 'Aec',
                    value: 0
                },{
                    label: 'Oslec',
                    value: 1
                }],

                echomode_options: [{
                    label: '58',
                    value: '58'
                },{
                    label: '59',
                    value: '59'
                }],

                echocancel_options: [0,64,128,256,512],

                mode_options: [{
                    label: 'adaptive',
                    value: 'Adaptive'
                },{
                    label: 't38',
                    value: 'T.38'
                },{
                    label: 'pass_through',
                    value: 'Pass-through'
                }],

                rate_options: [{
                    label: 'No speed limit',
                    value: '0'
                },{
                    label: '2400',
                    value: '2400'
                },{
                    label: '4800',
                    value: '4800'
                },{
                    label: '7200',
                    value: '7200'
                },{
                    label: '9600',
                    value: '9600'
                },{
                    label: '12000',
                    value: '12000'
                },{
                    label: '14400',
                    value: '14400'
                }],

                country_options: [{
                    label: 'austria',
                    value: 'at'
                },{
                    label: 'australia',
                    value: 'au'
                },{
                    label: 'bulgaria',
                    value: 'bg'
                },{
                    label: 'brazil',
                    value: 'br'
                },{
                    label: 'belgium',
                    value: 'be'
                },{
                    label: 'switzerland',
                    value: 'ch'
                },{
                    label: 'chile',
                    value: 'cl'
                },{
                    label: 'china',
                    value: 'cn'
                },{
                    label: 'czech_republic',
                    value: 'cz'
                },{
                    label: 'germany',
                    value: 'de'
                },{
                    label: 'denmark',
                    value: 'dk'
                },{
                    label: 'estonia',
                    value: 'ee'
                },{
                    label: 'spain',
                    value: 'es'
                },{
                    label: 'finland',
                    value: 'fi'
                },{
                    label: 'france',
                    value: 'fr'
                },{
                    label: 'greece',
                    value: 'gr'
                },{
                    label: 'hungary',
                    value: 'hu'
                },{
                    label: 'israel',
                    value: 'il'
                },{
                    label: 'india',
                    value: 'in'
                },{
                    label: 'italy',
                    value: 'it'
                },{
                    label: 'lithuania',
                    value: 'lt'
                },{
                    label: 'japan',
                    value: 'jp'
                },{
                    label: 'mexico',
                    value: 'mx'
                },{
                    label: 'malaysia',
                    value: 'my'
                },{
                    label: 'netherlands',
                    value: 'nl'
                },{
                    label: 'norway',
                    value: 'no'
                },{
                    label: 'new_zealand',
                    value: 'nz'
                },{
                    label: 'philippines',
                    value: 'ph'
                },{
                    label: 'poland',
                    value: 'pl'
                },{
                    label: 'portugal',
                    value: 'pt'
                },{
                    label: 'russian_federation',
                    value: 'ru'
                },{
                    label: 'sweden',
                    value: 'se'
                },{
                    label: 'singapore',
                    value: 'sg'
                },{
                    label: 'thailand',
                    value: 'th'
                },{
                    label: 'united_kingdom',
                    value: 'uk'
                },{
                    label: 'united_states',
                    value: 'us'
                },{
                    label: 'united_states_cirac',
                    value: 'us-old'
                },{
                    label: 'taiwan',
                    value: 'tw'
                },{
                    label: 'venezuela',
                    value: 've'
                },{
                    label: 'south_africa',
                    value: 'za'
                },{
                    label: 'custom',
                    value: 'custom'
                }],

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

                let _global = data['_get']['_global']
                let _glb = data['_get']['_glb']

                this.toneduration = _global['_toneduration']
                this.toneinterval = _global['_toneinterval']
                this.dialtimeout = _global['_dialtimeout'] == 0 ? 180 : _global['_dialtimeout']
                this.old_echotype = parseInt(_global['_echotype'])
                this.echotype = parseInt(_global['_echotype'])

                this.old_echocancel = _global['_echocancel']
                this.echocancel = (_global['_echocancel'] < 0 || _global['_echocancel'] > 512)
                                    ? 120
                                    : _global['_echocancel']
                this.echomode = _global['_echomode'] == '59' ? '59' : '58'

                this.fxs_signaling = parseInt(_global['_sigfxs'])
                this.mode = _global['_mode'] == '' ? 'Adaptive' : _global['_mode']
                this.rate = _global['_rate'] == '' ? 0 : _global['_rate']
                this.ecm = _global['_ecm'] == 1 ? true : false

                this.old_country = _glb['_country']
                this.country = _glb['_country']
                this.ind_ringcadence = _glb['_ringcadence']
                this.ind_dial = _glb['_dial']
                this.ind_ring = _glb['_ring']
                this.ind_busy = _glb['_busy']
                this.ind_callwaiting = _glb['_callwaiting']
                this.ind_congestion = _glb['_congestion']
                this.ind_dialrecall = _glb['_dialrecall']
                this.ind_record = _glb['_record']
                this.ind_info = _glb['_info']
                this.ind_stutter = _glb['_stutter']
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const algglobal = new AST_UcpAlgGlobal()

                algglobal._toneduration = this.toneduration
                algglobal._toneinterval = this.toneinterval
                algglobal._dialtimeout = this.dialtimeout == '' ? 0 : this.dialtimeout
                algglobal._mode = this.mode
                algglobal._rate = this.rate
                algglobal._ecm = this.ecm == true ? 1 : 0
                algglobal._echotype = this.echotype
                algglobal._echomode = this.echomode
                algglobal._echocancel = this.echocancel
                algglobal._sigfxs = this.fxs_signaling

                //country
                const algglb = new AST_AlgGlb()

                algglb._country = this.country

                if(this.country == 'custom'){
                    algglb._ringcadence = this.ind_ringcadence
                    algglb._dial = this.ind_dial
                    algglb._ring = this.ind_ring
                    algglb._busy = this.ind_busy
                    algglb._callwaiting = this.ind_callwaiting
                    algglb._congestion = this.ind_congestion
                    algglb._dialrecall = this.ind_dialrecall
                    algglb._record = this.ind_record
                    algglb._info = this.ind_info
                    algglb._stutter = this.ind_stutter
                }else{
                    algglb._ringcadence = this.ind_ringcadence
                    algglb._dial = ''
                    algglb._ring = ''
                    algglb._busy = ''
                    algglb._callwaiting = ''
                    algglb._congestion = ''
                    algglb._dialrecall = ''
                    algglb._record = ''
                    algglb._info = ''
                    algglb._stutter = ''
                }

                const UcpAlgGlbSave = new AST_UcpAlgGlbSave()
                UcpAlgGlbSave._global = algglobal
                UcpAlgGlbSave._glb = algglb

                console.log(UcpAlgGlbSave)
                if((this.country != this.old_country) || (this.echotype != this.old_echotype) || (this.echocancel != this.old_echocancel)){
                    this.$confirm(this.lang.glbSetting_restart_help)
                        .then(_ => {
                            this.loading = true
                            this.flag = 1
                            this.request.AGUcpAlgGlbSettingSave(this.save_succeed_back, this.save_error_back, UcpAlgGlbSave, this.flag)
                        })
                        .catch(_ => {
                        })
                }else{
                    this.loading = true
                    this.request.AGUcpAlgGlbSettingSave(this.save_succeed_back, this.save_error_back, UcpAlgGlbSave, this.flag)
                }
            },
            save_succeed_back(data){
                this.loading = false

                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: '80'
                    })
                }else{
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: '80'
                    })
                }
            },
            save_error_back(){
                this.loading = false

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            },

            country_change(){
                this.request.AGAlgGlbSettingGetOne(this.change_succeed_back, this.change_error_back, this.country)
            },
            change_succeed_back(data){
                let data_temp = data['_get']['_glb']

                if(this.country != 'custom') {
                    this.ind_ringcadence = data_temp['_ringcadence']
                    this.ind_dial = data_temp['_dial']
                    this.ind_ring = data_temp['_ring']
                    this.ind_busy = data_temp['_busy']
                    this.ind_callwaiting = data_temp['_callwaiting']
                    this.ind_congestion = data_temp['_congestion']
                    this.ind_dialrecall = data_temp['_dialrecall']
                    this.ind_record = data_temp['_record']
                    this.ind_info = data_temp['_info']
                    this.ind_stutter = data_temp['_stutter']
                }else{
                    this.ind_ringcadence = ''
                    this.ind_dial = ''
                    this.ind_ring = ''
                    this.ind_busy = ''
                    this.ind_callwaiting = ''
                    this.ind_congestion = ''
                    this.ind_dialrecall = ''
                    this.ind_record = ''
                    this.ind_info = ''
                    this.ind_stutter = ''
                }
            },
            change_error_back(){
                console.log('Change country error!')
            }
        },
        created() {
            this.debug = debuger('analog-advanced')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGUcpAlgGlbSettingGetAll(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>