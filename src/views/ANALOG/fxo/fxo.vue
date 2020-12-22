<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            :rules="rules"
            :model="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.fxo_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="submitValidator('ruleForm')">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.busy_detect}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.busy_detect_help"></span>
                    <span slot="param_name" >{{lang.busy_detect}}</span>
                    <el-checkbox slot="param" v-model="busydetect" @change="BusydetectChange('busydetect')"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.busy_count_help"></span>
                    <span slot="param_name" >{{lang.busy_count}}</span>
                    <el-input slot="param" v-model="busycount" :disabled="!busydetect"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.busy_country_help"></span>
                    <span slot="param_name" >{{lang.busy_country}}</span>
                    <el-select slot="param" v-model="busycountry" :disabled="!busydetect" style="width: 100%;">
                        <el-option
                                v-for="item in busycountry_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.fxo_monitor_help"></span>
                    <span slot="param_name" >{{lang.fxo_monitor}}</span>
                    <el-checkbox slot="param" v-model="fxomon" @change="BusydetectChange('fxomon')"></el-checkbox>
                </form_item>
            </el-row>

            <el-row v-if="fxomon">
                <form_item>
                    <span slot="param_help" v-html="lang.busy_tone_pattern_help"></span>
                    <span slot="param_name" >{{lang.busy_tone_pattern}}</span>
                    <span slot="param">
                        <el-button
                                type="primary"
                                @click="add_busy_pattern"
                                style="width: 100%">{{lang.add_more_busy_pattern_fields}}</el-button>
                        <el-row>
                            <el-input size="small"
                                      style="margin-top: 10px;"
                                      v-for="(item,index) in busypattern"
                                      :key="index"
                                      v-model="busypattern[index]">
                                <i slot="suffix"
                                   style="margin-right: 3px;cursor:pointer;"
                                   @click="remove_busypattern(index)"
                                   class="el-icon-close"></i>
                            </el-input>
                        </el-row>
                    </span>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.silence_detect}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.silence_detect_help"></span>
                    <span slot="param_name" >{{lang.silence_detect}}</span>
                    <el-checkbox slot="param" v-model="silencedetect"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'silencethreshold'">
                    <span slot="param_help" v-html="lang.silence_threshold_help"></span>
                    <span slot="param_name" >{{lang.silence_threshold}}</span>
                    <el-input slot="param" v-model="ruleForm.silencethreshold" :disabled="!silencedetect"></el-input>
                </form_item>

                <form_item v-bind:param="'maxsilence'">
                    <span slot="param_help" v-html="lang.max_silence_help"></span>
                    <span slot="param_name" >{{lang.max_silence}}</span>
                    <el-input slot="param" v-model="ruleForm.maxsilence" :disabled="!silencedetect"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'rxthreshold'">
                    <span slot="param_help" v-html="lang.rx_threshold_help"></span>
                    <span slot="param_name" >{{lang.rx_threshold}}</span>
                    <el-input slot="param" v-model="ruleForm.rxthreshold" :disabled="!silencedetect"></el-input>
                </form_item>

                <form_item v-bind:param="'txthreshold'">
                    <span slot="param_help" v-html="lang.tx_threshold_help"></span>
                    <span slot="param_name" >{{lang.tx_threshold}}</span>
                    <el-input slot="param" v-model="ruleForm.txthreshold" :disabled="!silencedetect"></el-input>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.dahdi_parameters}}</span></divider_item>

            <el-row>
                <form_item v-bind:param="'polaritydebounce'">
                    <span slot="param_help" v-html="lang.polaritydebounce_help"></span>
                    <span slot="param_name" >{{lang.polaritydebounce}}</span>
                    <el-input slot="param" v-model="ruleForm.polaritydebounce"></el-input>
                </form_item>

                <form_item v-bind:param="'ringdebounce'">
                    <span slot="param_help" v-html="lang.ringdebounce_help"></span>
                    <span slot="param_name" >{{lang.ringdebounce}}</span>
                    <el-input slot="param" v-model="ruleForm.ringdebounce"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'ringoncount'">
                    <span slot="param_help" v-html="lang.ringoncount_help"></span>
                    <span slot="param_name" >{{lang.ringoncount}}</span>
                    <el-input slot="param" v-model="ruleForm.ringoncount"></el-input>
                </form_item>

                <form_item v-bind:param="'ringoffcount'">
                    <span slot="param_help" v-html="lang.ringoffcount_help"></span>
                    <span slot="param_name" >{{lang.ringoffcount}}</span>
                    <el-input slot="param" v-model="ruleForm.ringoffcount"></el-input>
                </form_item>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "fxo",
        data() {
            var validateSilencethreshold = (rule, value, callback) => {
                if(String(value).indexOf(".") > -1){
                    callback(new Error(this.lang.check_param_int))
                }else if(!(parseInt(value) >= 100 && parseInt(value) <= 500)){
                    callback(new Error('Range:100 ~ 500ms'))
                }else{
                    callback()
                }
            }

            var validateMaxsilence = (rule, value, callback) => {
                if(String(value).indexOf(".") > -1){
                    callback(new Error(this.lang.check_param_int))
                }else if(!(parseInt(value) >= 2 && parseInt(value) <= 1020)){
                    callback(new Error('Range:2 ~ 1020ms'))
                }else{
                    callback()
                }
            }

            var validateRxthreshold = (rule, value, callback) => {
                if(String(value).indexOf(".") > -1){
                    callback(new Error(this.lang.check_param_int))
                }else if(!(parseInt(value) >= 20 && parseInt(value) <= 40)){
                    callback(new Error('Range:20 ~ 40ms'))
                }else{
                    callback()
                }
            }

            var validatePolaritydebounce = (rule, value, callback) => {
                if(String(value).indexOf(".") > -1){
                    callback(new Error(this.lang.check_param_int))
                }else if(!(parseInt(value) >= 8 && parseInt(value) <= 2048)){
                    callback(new Error('Range:0 ~ 2048ms'))
                }else{
                    callback()
                }
            }

            var validateRingoncount = (rule, value, callback) => {
                if(String(value).indexOf(".") > -1){
                    callback(new Error(this.lang.check_param_int))
                }else if(!(parseInt(value) >= 0 && parseInt(value) <= 128)){
                    callback(new Error('Range:0 ~ 128'))
                }else{
                    callback()
                }
            }
            return {
                ruleForm: {
                    silencethreshold: '',
                    maxsilence: '',
                    rxthreshold: '',
                    txthreshold: '',

                    polaritydebounce: '',
                    ringdebounce: '',
                    ringoncount: '',
                    ringoffcount: '',
                },
                rules: {
                    silencethreshold: [{ validator: validateSilencethreshold, trigger: 'blur' }],
                    maxsilence: [{ validator: validateMaxsilence, trigger: 'blur' }],
                    rxthreshold: [{ validator: validateRxthreshold, trigger: 'blur' }],
                    txthreshold: [{ validator: validateRxthreshold, trigger: 'blur' }],

                    polaritydebounce: [{ validator: validatePolaritydebounce, trigger: 'blur' }],
                    ringdebounce: [{ validator: validatePolaritydebounce, trigger: 'blur' }],
                    ringoncount: [{ validator: validateRingoncount, trigger: 'blur' }],
                    ringoffcount: [{ validator: validateRingoncount, trigger: 'blur' }],
                },
                busydetect: false,
                busycount: '',
                busycountry: 'cn',
                fxomon: '',
                busypattern: [],
                silencedetect: '',
                silencethreshold: '',
                maxsilence: '',
                rxthreshold: '',
                txthreshold: '',
                polaritydebounce: '',
                ringdebounce: '',
                ringoncount: '',
                ringoffcount: '',

                busycountry_options: [{
                    label: 'China',
                    value: 'cn'
                },{
                    label: 'Taiwan',
                    value: 'tw'
                },{
                    label: 'Japan',
                    value: 'jp'
                },{
                    label: 'Korea',
                    value: 'kr'
                },{
                    label: 'USA',
                    value: 'us'
                },{
                    label: 'Germany',
                    value: 'de'
                }],

                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _glb = data['_get']['_fxo']['_glb']
                let _dahdi = data['_get']['_fxo']['_dahdi']
                let _busytones = data['_get']['_fxo']['_busytones']

                _busytones['_busypattern']['_item'].forEach(item => {
                    this.busypattern.push(item._value)
                })

                this.busydetect = _glb['_busydetect'] == 1 ? true : false
                this.busycount = _glb['_busycount']
                this.busycountry = _glb['_busycountry']
                this.fxomon = _busytones['_fxomonenable'] == 1 ? true : false
                this.silencedetect = _glb['_silencedetect'] == 1 ? true : false
                this.ruleForm.silencethreshold = _glb['_silencethreshold']
                this.ruleForm.maxsilence = _glb['_maxsilence']
                this.ruleForm.rxthreshold = _glb['_rxthreshold']
                this.ruleForm.txthreshold = _glb['_txthreshold']
                this.ruleForm.polaritydebounce = _dahdi['_polaritydebounce']
                this.ruleForm.ringdebounce = _dahdi['_ringdebounce']
                this.ruleForm.ringoncount = _dahdi['_ringoncount']
                this.ruleForm.ringoffcount = _dahdi['_ringoffcount']
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            BusydetectChange(type){
                if(type == 'busydetect' && this.busydetect){
                    this.fxomon = false
                }

                if(type == 'fxomon' && this.fxomon){
                    this.busydetect = false
                }
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
                const global = new AST_UcpAlgFxoGlobal()

                global._busycount = this.busycount
                global._busycountry = this.busycountry
                global._silencethreshold = this.ruleForm.silencethreshold
                global._maxsilence = this.ruleForm.maxsilence
                global._rxthreshold = this.ruleForm.rxthreshold
                global._txthreshold = this.ruleForm.txthreshold
                global._silencedetect = this.silencedetect == true ? 1 : 0
                global._busydetect = this.busydetect == true ? 1 : 0

                const dahdi = new AST_UcpAlgDahdiContent()

                dahdi._polaritydebounce = this.ruleForm.polaritydebounce == '' ? 8 : this.ruleForm.polaritydebounce
                dahdi._ringdebounce = this.ruleForm.ringdebounce == '' ? 0 : this.ruleForm.ringdebounce
                dahdi._ringoncount = this.ruleForm.ringoncount == '' ? 0 : this.ruleForm.ringoncount
                dahdi._ringoffcount = this.ruleForm.ringoffcount == '' ? 0 : this.ruleForm.ringoffcount

                const busytones = new AST_AlgBusyTone()

                busytones._fxomonenable = this.fxomon == true ? 1 : 0

                const LineArr = new AST_LineArr()
                this.busypattern.forEach((item,index) => {
                    let line = new AST_Line()
                    line._key = 'busypattern'+index
                    line._value = item
                    LineArr._item.push(line)
                })
                busytones._busypattern = LineArr

                const UcpAlgFxoparam = new AST_UcpAlgFxoparam()
                UcpAlgFxoparam._glb = global
                UcpAlgFxoparam._dahdi = dahdi
                UcpAlgFxoparam._busytones = busytones

                console.log(UcpAlgFxoparam)
                this.request.AGUcpAlgFxoparamSave(this.save_succeed_back, this.save_error_back, UcpAlgFxoparam)
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
            },

            add_busy_pattern(){
                this.busypattern.push('')
            },
            remove_busypattern(index){
                this.busypattern.splice(index,1)
            }
        },
        created() {
            this.request.AGUcpAlgFxoparamGetAll(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>