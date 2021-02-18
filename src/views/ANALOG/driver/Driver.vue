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
                {{lang.driver}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="submitValidator('ruleForm')">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" v-loading="loading" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.general}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.codec_help"></span>
                    <span slot="param_name" >{{lang.codec}}</span>
                    <el-select slot="param" v-model="codec" style="width: 100%;">
                        <el-option
                                v-for="item in codec_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row v-if="$store.state.CheckFXSCurrSta == 1">
                <form_item>
                    <span slot="param_help" v-html="lang.current_threshold_help"></span>
                    <span slot="param_name" >{{lang.current_threshold}}</span>
                    <el-input slot="param" v-model="current_threshold"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.impedance_help"></span>
                    <span slot="param_name" >{{lang.impedance}}</span>
                    <el-select slot="param" v-model="impedance" style="width: 100%;">
                        <el-option
                                v-for="item in impedance_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.callerid_detect}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.cidbeforering_help"></span>
                    <span slot="param_name" >{{lang.cidbeforering}}</span>
                    <el-checkbox slot="param" v-model="cidbeforering"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'cidbuflen'">
                    <span slot="param_help" v-html="lang.cidbuflen_help"></span>
                    <span slot="param_name" >{{lang.cidbuflen}}</span>
                    <el-input slot="param" v-model="ruleForm.cidbuflen" :disabled="!cidbeforering"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'cutcidbufheadlen'">
                    <span slot="param_help" v-html="lang.cutcidbufheadlen_help"></span>
                    <span slot="param_name" >{{lang.cutcidbufheadlen}}</span>
                    <el-input slot="param" v-model="ruleForm.cutcidbufheadlen" :disabled="!cidbeforering"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'fixedtimepolarity'">
                    <span slot="param_help" v-html="lang.fixedtimepolarity_help"></span>
                    <span slot="param_name" >{{lang.fixedtimepolarity}}</span>
                    <el-input slot="param" v-model="ruleForm.fixedtimepolarity" :disabled="!cidbeforering"></el-input>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.hardware_gain}}</span></divider_item>

            <el-row>
                <form_item v-bind:param="'fxorxgain'">
                    <span slot="param_help" v-html="lang.fxo_rx_gain"></span>
                    <span slot="param_name" >{{lang.fxo_rx_gain}}</span>
                    <el-input slot="param" v-model="ruleForm.fxorxgain"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'fxotxgain'">
                    <span slot="param_help" v-html="lang.fxo_tx_gain_help"></span>
                    <span slot="param_name" >{{lang.fxo_tx_gain}}</span>
                    <el-input slot="param" v-model="ruleForm.fxotxgain"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.fxs_rx_gain_help"></span>
                    <span slot="param_name" >{{lang.fxs_rx_gain}}</span>
                    <el-select slot="param" v-model="fxsrxgain" style="width: 100%">
                        <el-option
                                v-for="item in fxsgain_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.fxs_tx_gain_help"></span>
                    <span slot="param_name" >{{lang.fxs_tx_gain}}</span>
                    <el-select slot="param" v-model="fxstxgain" style="width: 100%">
                        <el-option
                                v-for="item in fxsgain_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>
        </el-card>

    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Driver",
        data() {
            var validateCidbuflen = (rule, value, callback) => {
                if(this.cidbeforering) {
                    if (String(value).indexOf(".") > -1) {
                        callback(new Error(this.lang.check_param_int))
                    } else if (!(parseInt(value) >= 1 && parseInt(value) <= 4000)) {
                        callback(new Error('Range:1 ~ 4000'))
                    } else {
                        callback()
                    }
                }else{
                    callback()
                }
            }

            var validateCutcidbufheadlen = (rule, value, callback) => {
                    if(this.cidbeforering) {
                        if(String(value).indexOf(".") > -1){
                            callback(new Error(this.lang.check_param_int))
                        }else if(!(parseInt(value) >=1 && parseInt(value) <= 2000)){
                            callback(new Error('Range:1 ~ 2000ms'))
                        }else{
                            callback()
                        }
                    }else{
                        callback()
                    }
            }

            var validateFixedtimepolarity = (rule, value, callback) => {
                if(this.cidbeforering) {
                    if(String(value).indexOf(".") > -1){
                        callback(new Error(this.lang.check_param_int))
                    }else if(!(parseInt(value) >= -1 && parseInt(value) <= 2000)){
                        callback(new Error('Range:-1 ~ 2000'))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }

            var validateFxorxgain = (rule, value, callback) => {
                if(String(value).indexOf(".") > -1) {
                    callback(new Error(this.lang.check_param_int))
                }else if(!(parseInt(value) >= -150 && parseInt(value) <= 120)){
                    callback(new Error('Range:-150 ~ 120'))
                }else{
                    callback()
                }
            }

            var validateFxotxgain = (rule, value, callback) => {
                if(String(value).indexOf(".") > -1){
                    callback(new Error(this.lang.check_param_int))
                }else if(!(parseInt(value) >= -150 && parseInt(value) <= 120)){
                    callback(new Error('Range:-150 ~ 120'))
                }else{
                    callback()
                }
            }

            var validateCurrent_threshold = (rule, value, callback) => {
                if(!(parseInt(value) >= 1 && parseInt(value) <= 65535)){
                    callback(new Error('Range:1-65535'))
                }else{
                    callback()
                }
            }
            return {
                ruleForm: {
                    cidbuflen: '',
                    cutcidbufheadlen: '',
                    fixedtimepolarity: '',
                    fxorxgain: '',
                    fxotxgain: '',
                    current_threshold: '',
                },
                rules: {
                    cidbuflen: [{ validator: validateCidbuflen, trigger: 'blur' }],
                    cutcidbufheadlen: [{ validator: validateCutcidbufheadlen, trigger: 'blur' }],
                    fixedtimepolarity: [{ validator: validateFixedtimepolarity, trigger: 'blur' }],
                    fxorxgain: [{ validator: validateFxorxgain, trigger: 'blur' }],
                    fxotxgain: [{ validator: validateFxotxgain, trigger: 'blur' }],
                    current_threshold: [{ validator: validateCurrent_threshold, trigger: 'blur' }],
                },
                opermode: '',
                codec: '',
                impedance: '',
                cidbeforering: false,
                cidbuflen: '',
                cutcidbufheadlen: '',
                fixedtimepolarity: '',
                fxorxgain: '',
                fxotxgain: '',
                fxsrxgain: '',
                fxstxgain: '',
                current_threshold: '',

                fxsgain_options: [{
                    label: '-35',
                    value: -35
                },{
                    label: '0',
                    value: 0
                },{
                    label: '35',
                    value: 35
                }],

                codec_options: [{
                    label: 'Ulaw',
                    value: 0
                },{
                    label: 'Alaw',
                    value: 1
                }],

                impedance_options: [{
                   label: 'FCC',
                   value: 'FCC'
                },{
                    label: 'TBR21',
                    value: 'TBR21'
                },{
                    label: 'ARGENTINA',
                    value: 'ARGENTINA'
                },{
                    label: 'AUSTRALIA',
                    value: 'AUSTRALIA'
                },{
                    label: 'AUSTRIA',
                    value: 'AUSTRIA'
                },{
                    label: 'BAHRAIN',
                    value: 'BAHRAIN'
                },{
                    label: 'BELGIUM',
                    value: 'BELGIUM'
                },{
                    label: 'BRAZIL',
                    value: 'BRAZIL'
                },{
                    label: 'BULGARIA',
                    value: 'BULGARIA'
                },{
                    label: 'CANADA',
                    value: 'CANADA'
                },{
                    label: 'CHILE',
                    value: 'CHILE'
                },{
                    label: 'CHINA',
                    value: 'CHINA'
                },{
                    label: 'COLOMBIA',
                    value: 'COLOMBIA'
                },{
                    label: 'CROATIA',
                    value: 'CROATIA'
                },{
                    label: 'CYPRUS',
                    value: 'CYPRUS'
                },{
                    label: 'CZECH',
                    value: 'CZECH'
                },{
                    label: 'DENMARK',
                    value: 'DENMARK'
                },{
                    label: 'ECUADOR',
                    value: 'ECUADOR'
                },{
                    label: 'EGYPT',
                    value: 'EGYPT'
                },{
                    label: 'ELSALVADOR',
                    value: 'ELSALVADOR'
                },{
                    label: 'FINLAND',
                    value: 'FINLAND'
                },{
                    label: 'FRANCE',
                    value: 'FRANCE'
                },{
                    label: 'GERMANY',
                    value: 'GERMANY'
                },{
                    label: 'GREECE',
                    value: 'GREECE'
                },{
                    label: 'GUAM',
                    value: 'GUAM'
                },{
                    label: 'HONGKONG',
                    value: 'HONGKONG'
                },{
                    label: 'HUNGARY',
                    value: 'HUNGARY'
                },{
                    label: 'ICELAND',
                    value: 'ICELAND'
                },{
                    label: 'INDIA',
                    value: 'INDIA'
                },{
                    label: 'INDONESIA',
                    value: 'INDONESIA'
                },{
                    label: 'IRELAND',
                    value: 'IRELAND'
                },{
                    label: 'ISRAEL',
                    value: 'ISRAEL'
                },{
                    label: 'ITALY',
                    value: 'ITALY'
                },{
                    label: 'JAPAN',
                    value: 'JAPAN'
                },{
                    label: 'JORDAN',
                    value: 'JORDAN'
                },{
                    label: 'KAZAKHSTAN',
                    value: 'KAZAKHSTAN'
                },{
                    label: 'KUWAIT',
                    value: 'KUWAIT'
                },{
                    label: 'LATVIA',
                    value: 'LATVIA'
                },{
                    label: 'LEBANON',
                    value: 'LEBANON'
                },{
                    label: 'LUXEMBOURG',
                    value: 'LUXEMBOURG'
                },{
                    label: 'MACAO',
                    value: 'MACAO'
                },{
                    label: 'MALAYSIA',
                    value: 'MALAYSIA'
                },{
                    label: 'MALTA',
                    value: 'MALTA'
                },{
                    label: 'MEXICO',
                    value: 'MEXICO'
                },{
                    label: 'MOROCCO',
                    value: 'MOROCCO'
                },{
                    label: 'NETHERLANDS',
                    value: 'NETHERLANDS'
                },{
                    label: 'NEWZEALAND',
                    value: 'NEWZEALAND'
                },{
                    label: 'NIGERIA',
                    value: 'NIGERIA'
                },{
                    label: 'NORWAY',
                    value: 'NORWAY'
                },{
                    label: 'OMAN',
                    value: 'OMAN'
                },{
                    label: 'PAKISTAN',
                    value: 'PAKISTAN'
                },{
                    label: 'PERU',
                    value: 'PERU'
                },{
                    label: 'PHILIPPINES',
                    value: 'PHILIPPINES'
                },{
                    label: 'POLAND',
                    value: 'POLAND'
                },{
                    label: 'PORTUGAL',
                    value: 'PORTUGAL'
                },{
                    label: 'ROMANIA',
                    value: 'ROMANIA'
                },{
                    label: 'RUSSIA',
                    value: 'RUSSIA'
                },{
                    label: 'SAUDIARABIA',
                    value: 'SAUDIARABIA'
                },{
                    label: 'SINGAPORE',
                    value: 'SINGAPORE'
                },{
                    label: 'SLOVAKIA',
                    value: 'SLOVAKIA'
                },{
                    label: 'SLOVENIA',
                    value: 'SLOVENIA'
                },{
                    label: 'SOUTHAFRICA',
                    value: 'SOUTHAFRICA'
                },{
                    label: 'SOUTHKOREA',
                    value: 'SOUTHKOREA'
                },{
                    label: 'SPAIN',
                    value: 'SPAIN'
                },{
                    label: 'SWEDEN',
                    value: 'SWEDEN'
                },{
                    label: 'SWITZERLAND',
                    value: 'SWITZERLAND'
                },{
                    label: 'SYRIA',
                    value: 'SYRIA'
                },{
                    label: 'TAIWAN',
                    value: 'TAIWAN'
                },{
                    label: 'THAILAND',
                    value: 'THAILAND'
                },{
                    label: 'UAE',
                    value: 'UAE'
                },{
                    label: 'UK',
                    value: 'UK'
                },{
                    label: 'USA',
                    value: 'USA'
                },{
                    label: 'YEMEN',
                    value: 'YEMEN'
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

                let _param = data['_get']['_param']

                this.codec = parseInt(_param['_codec'])
                this.impedance = _param['_opermode']
                this.cidbeforering = _param['_cidbeforering'] == 1 ? true : false
                this.ruleForm.cidbuflen = _param['_cidbuflen']
                this.ruleForm.cutcidbufheadlen = _param['_cutcidbufheadlen']
                this.ruleForm.fixedtimepolarity = _param['_fixedtimepolarity']
                this.ruleForm.fxorxgain = _param['_fxorxgain']
                this.ruleForm.fxotxgain = _param['_fxotxgain']
                this.fxsrxgain = parseInt(_param['_fxsrxgain'])
                this.fxstxgain = _param['_fxstxgain']
                this.ruleForm.current_threshold = _param['_Currentthreshold']
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
                this.$confirm(this.lang.glbSetting_restart_help)
                    .then(_ => {
                        let driver = new AST_UcpAlgDriverParam()

                        driver._opermode = this.impedance
                        driver._codec = this.codec
                        driver._cidbuflen = this.ruleForm.cidbuflen == '' ? 3000 : this.ruleForm.cidbuflen
                        driver._cutcidbufheadlen = this.ruleForm.cutcidbufheadlen == '' ? 128 : this.ruleForm.cutcidbufheadlen
                        driver._fixedtimepolarity = this.ruleForm.fixedtimepolarity == '' ? 0 : this.ruleForm.fixedtimepolarity
                        driver._cidbeforering = this.cidbeforering == true ? 1 : 0
                        driver._fxorxgain = this.ruleForm.fxorxgain == '' ? 120 : this.ruleForm.fxorxgain
                        driver._fxotxgain = this.ruleForm.fxotxgain == '' ? 120 : this.ruleForm.fxotxgain
                        driver._fxsrxgain = this.fxsrxgain
                        driver._fxstxgain = this.fxstxgain
                        driver._Currentthreshold = this.ruleForm.current_threshold

                        console.log(driver)
                        this.loading = true
                        this.request.AGUcpAlgDriverSave(this.save_succeed_back, this.save_error_back, driver)
                }).catch(_ => {})
            },
            save_succeed_back(data){
                this.loading = false

                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: 80
                    })
                }else{
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: 80
                    })
                }
            },
            save_error_back(){
                this.loading = false
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: 80
                })
            }
        },
        created() {
            this.debug = debuger('analog-driver')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGUcpAlgDriverGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>