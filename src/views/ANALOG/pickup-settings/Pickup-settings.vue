<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            :rules="rules"
            :model="ruleForm"
            ref="ruleForm"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.pickup_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;margin-bottom: 50px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="submitValidator('ruleForm')"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" v-loading="loading" style="margin:auto;padding: 20px;overflow: visible;" :style=$store.state.page.card_width>
            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.enable_help"></span>
                    <span slot="param_name" >{{lang.enable}}</span>
                    <el-checkbox slot="param" v-model="pickupenable"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'pickuptimeout'">
                    <span slot="param_help" v-html="lang.timeout_help"></span>
                    <span slot="param_name" >{{lang.timeout}}</span>
                    <el-input slot="param" v-model="ruleForm.pickuptimeout" :disabled="!pickupenable"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item v-bind:param="'pickupnumber'">
                    <span slot="param_help" v-html="lang.number_help"></span>
                    <span slot="param_name" >{{lang.number}}</span>
                    <el-input slot="param" v-model="ruleForm.pickupnumber" :disabled="!pickupenable"></el-input>
                </form_item>
            </el-row>

            <el-row v-for="(chn_item,index) in ruleForm.pickchn">
                <el-col :lg="24">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    FXS-{{chn_item.channel}}
                                </div>
                                <span>FXS-{{chn_item.channel}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="3">
                            <el-select v-model="chn_item.enablechnlpickup" :disabled="!pickupenable">
                                <el-option
                                    v-for="item in chn_enable"
                                    :label="lang[item.label]"
                                    :key="item.value"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :lg="6" style="margin-left: 20px;">
                            <el-col :lg="9" class="el-form-item__label">{{lang.timeout}}:</el-col>
                            <el-col :lg="15">
                                <el-form-item>
                                    <el-input v-model="chn_item.chnlpickuptimeout" :disabled="!pickupenable"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :lg="6" style="margin-left: 20px;">
                            <el-col :lg="9" class="el-form-item__label">{{lang.number}}:</el-col>
                            <el-col :lg="15">
                                <el-form-item :key="'pnumber_'+chn_item.channel" :prop="'pickchn.'+index+'.chnlpickupnumber'"
                                    :rules="{
                                        max: 32, message: 'Please input a valid timeout value!', trigger: 'blur'
                                    }"
                                >
                                    <el-input v-model="chn_item.chnlpickupnumber" :disabled="!pickupenable"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-card>

    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Pickup-settings",
        data() {
            var validatePickuptimeout = (rule, value, callback) => {
                if(this.pickupenable){
                    var rex=/^[0-9\+]{1,32}$/i;
                    if(!rex.test(value)) {
                        callback(new Error('Please input a valid timeout value!'))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }

            return {
                ruleForm: {
                    pickuptimeout: '',
                    pickupnumber: '',
                    pickchn:[]
                },
                rules: {
                    pickuptimeout: [
                        { validator: validatePickuptimeout, trigger: 'blur' }
                    ],
                    pickupnumber: [
                        { validator: validatePickuptimeout, trigger: 'blur' }
                    ]
                },
                pickupenable: false,
                pickuptimeout: '',
                pickupnumber: '',

                chn_enable: [{
                    label: 'disabled',
                    value: 0
                },{
                    label: 'enabled',
                    value: 1
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

                const _pickup = data['_get']['_pickup']
                const _pickchn = data['_get']['_pickchn']['_item']

                this.pickupenable = _pickup['_enable'] == 1 ? true : false
                this.ruleForm.pickuptimeout = _pickup['_timeout'] == 0 ? '' : _pickup['_timeout']
                this.ruleForm.pickupnumber = _pickup['_number']

                _pickchn.forEach(item => {
                    let _enablechnlpickup = item._enablechnlpickup != 1 ? 0 : 1
                    let _chnlpickuptimeout = item._chnlpickuptimeout == 0 ? '' : item._chnlpickuptimeout
                    let _chnlpickupnumber = item._chnlpickupnumber

                    let obj = {
                        channel: item._channel,
                        enablechnlpickup: _enablechnlpickup,
                        chnlpickuptimeout: _chnlpickuptimeout,
                        chnlpickupnumber: _chnlpickupnumber
                    }

                    this.ruleForm.pickchn.push(obj)
                })
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

                const AlgPickup = new AST_AlgPickup()

                AlgPickup._enable = this.pickupenable == true ? 1 : 0
                AlgPickup._timeout = this.ruleForm.pickuptimeout
                AlgPickup._number = this.ruleForm.pickupnumber

                const AlgPickupChnArr = new AST_AlgPickupChnArr()
                this.ruleForm.pickchn.forEach((item) => {
                    let algpickupchn = new AST_AlgPickupChn()
                    algpickupchn._channel = item.channel

                    algpickupchn._enablechnlpickup = item.enablechnlpickup
                    algpickupchn._chnlpickuptimeout = item.chnlpickuptimeout == '' ? 0 : item.chnlpickuptimeout
                    algpickupchn._chnlpickupnumber = item.chnlpickupnumber

                    AlgPickupChnArr._item.push(algpickupchn)
                })

                this.request.AGAlgPickupSave(this.save_succeed_back, this.save_error_back, AlgPickup, AlgPickupChnArr)
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
            this.debug = debuger('analog-pickup')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGAlgPickupGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>