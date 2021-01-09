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
                {{lang.fxs_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="submitValidator('ruleForm')">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" v-loading="loading" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.callerid}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.the_pattern_of_sending_cid_help"></span>
                    <span slot="param_name" >{{lang.the_pattern_of_sending_cid}}</span>
                    <el-select slot="param" v-model="sendcalleridafter" style="width: 100%;">
                        <el-option
                                v-for="item in sendcalleridafter_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.waiting_time_before_sending_cid_help"></span>
                    <span slot="param_name" >{{lang.waiting_time_before_sending_cid}}</span>
                    <el-input slot="param" v-model="sendcalleridaftertime"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.flash_wink_help"></span>
                    <span slot="param_name" >{{lang.flash_wink}}</span>
                    <el-checkbox slot="param" v-model="flashwink"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'rxminflash'">
                    <span slot="param_help" v-html="lang.min_flash_time_help"></span>
                    <span slot="param_name" >{{lang.min_flash_time}}</span>
                    <el-input slot="param" v-model="ruleForm.rxminflash" :disabled="!flashwink"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'rxflash'">
                    <span slot="param_help" v-html="lang.max_flash_time_help"></span>
                    <span slot="param_name" >{{lang.max_flash_time}}</span>
                    <el-input slot="param" v-model="ruleForm.rxflash" :disabled="!flashwink"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.as_ending_dial_key_help"></span>
                    <span slot="param_name" >"#" {{lang.as_ending_dial_key}}</span>
                    <el-checkbox slot="param" v-model="enddialkey"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.display_extension_number_help"></span>
                    <span slot="param_name" >{{lang.display_extension_number}}</span>
                    <el-checkbox slot="param" v-model="ciddisplay"></el-checkbox>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.callerid}}</span></divider_item>

            <el-row>
                <form_item v-bind:param="'dialdebounce'">
                    <span slot="param_help" v-html="lang.offhook_antishake_help"></span>
                    <span slot="param_name" >{{lang.offhook_antishake}}</span>
                    <el-input slot="param" v-model="ruleForm.dialdebounce"></el-input>
                </form_item>
            </el-row>
        </el-card>

    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "fxs",
        data() {
            var validateRxminflash = (rule, value, callback) => {
                if(String(value).indexOf(".") > -1){
                    callback(new Error(this.lang.check_param_int))
                }else if(!(parseInt(value) >= 1 && parseInt(value) <= 100)){
                    callback(new Error('Range:0 ~ 100ms'))
                }else{
                    callback()
                }
            }

            var validateRxflash = (rule, value, callback) => {
                if(String(value).indexOf(".") > -1){
                    callback(new Error(this.lang.check_param_int))
                }else if(!(parseInt(value) >= 100 && parseInt(value) <= 3000)){
                    callback(new Error('Range:100 ~ 3000ms'))
                }else{
                    callback()
                }
            }

            var validateDialdebounce = (rule, value, callback) => {
                if(String(value).indexOf(".") > -1){
                    callback(new Error(this.lang.check_param_int))
                }else if(!(parseInt(value) >= 32 && parseInt(value) <= 2048) || value%32 != 0){
                    callback(new Error('Range:32 ~ 2048ms'))
                }else{
                    callback()
                }
            }
            return {
                ruleForm: {
                    rxminflash: '',
                    rxflash: '',
                    dialdebounce: '',
                },
                rules: {
                    rxminflash: [{ validator: validateRxminflash, trigger: 'blur' }],
                    rxflash: [{ validator: validateRxflash, trigger: 'blur' }],
                    dialdebounce: [{ validator: validateDialdebounce, trigger: 'blur' }],
                },
                sendcalleridafter: '',
                sendcalleridaftertime: '',
                flashwink: false,
                rxminflash: '',
                rxflash: '',
                enddialkey: false,
                ciddisplay: false,
                dialdebounce: '',
                sendpolarityrev: false, //H2AG-16 delete(前面问题单上已删除此参数，接口未改变，只在页面删除)
                startcode: '', //H2AG-16 delete
                stopcode: '', //H2AG-16 delete

                sendcalleridafter_options: [{
                    label: 'send CID before ringing',
                    value: '0'
                },{
                    label: 'send CID after first ring',
                    value: '1'
                },{
                    label: 'send CID after second ring',
                    value: '2'
                },{
                    label: 'send CID after third ring',
                    value: '3'
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

                let _fxs = data['_get']['_fxs']

                this.sendcalleridafter = _fxs['_sendcalleridafter']
                this.sendcalleridaftertime = _fxs['_sendcalleridaftertime']
                this.flashwink = _fxs['_flashwink'] == 1 ? true : false
                this.ruleForm.rxminflash = _fxs['_rxminflash']
                this.ruleForm.rxflash = _fxs['_rxflash']
                this.enddialkey = _fxs['_enddialkey'] == 1 ? true : false
                this.ciddisplay = _fxs['_ciddisplay'] == 1 ? true : false
                this.ruleForm.dialdebounce = _fxs['_dialdebounce']
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
                this.loading = true

                let UcpAlgFxsparam = new AST_UcpAlgFxsparam()

                UcpAlgFxsparam._sendcalleridafter = this.sendcalleridafter
                UcpAlgFxsparam._sendcalleridaftertime = this.sendcalleridaftertime
                UcpAlgFxsparam._sendpolarityrev = this.sendpolarityrev == true ? 1 : 0
                UcpAlgFxsparam._startcode = this.startcode
                UcpAlgFxsparam._stopcode = this.stopcode
                UcpAlgFxsparam._flashwink = this.flashwink == true ? 1 : 0
                UcpAlgFxsparam._rxminflash = this.ruleForm.rxminflash
                UcpAlgFxsparam._rxflash = this.ruleForm.rxflash
                UcpAlgFxsparam._enddialkey = this.enddialkey == true ? 1 : 0
                UcpAlgFxsparam._dialdebounce = this.ruleForm.dialdebounce == '' ? 0 : this.ruleForm.dialdebounce
                UcpAlgFxsparam._ciddisplay = this.ciddisplay == true ? 1 : 0

                this.request.AGUcpAlgFxsparamSave(this.save_succeed_back, this.save_error_back, UcpAlgFxsparam)
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
            }
        },
        created() {
            this.debug = debuger('analog-fxs')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGUcpAlgFxsparamGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>