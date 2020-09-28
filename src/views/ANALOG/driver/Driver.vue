<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.driver}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="Save()">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left"><h3>{{lang.general}}</h3></el-divider>

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

            <el-divider content-position="left"><h3>{{lang.callerid_detect}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.cidbeforering_help"></span>
                    <span slot="param_name" >{{lang.cidbeforering}}</span>
                    <el-checkbox slot="param" v-model="cidbeforering"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.cidbuflen_help"></span>
                    <span slot="param_name" >{{lang.cidbuflen}}</span>
                    <el-input slot="param" v-model="cidbuflen" :disabled="!cidbeforering"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.cutcidbufheadlen_help"></span>
                    <span slot="param_name" >{{lang.cutcidbufheadlen}}</span>
                    <el-input slot="param" v-model="cutcidbufheadlen" :disabled="!cidbeforering"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.fixedtimepolarity_help"></span>
                    <span slot="param_name" >{{lang.fixedtimepolarity}}</span>
                    <el-input slot="param" v-model="fixedtimepolarity" :disabled="!cidbeforering"></el-input>
                </form_item>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.hardware_gain}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.fxo_rx_gain"></span>
                    <span slot="param_name" >{{lang.fxo_rx_gain}}</span>
                    <el-input slot="param" v-model="fxorxgain"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.fxo_tx_gain_help"></span>
                    <span slot="param_name" >{{lang.fxo_tx_gain}}</span>
                    <el-input slot="param" v-model="fxotxgain"></el-input>
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
    import {request} from "../../../network/request";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Driver",
        data() {
            return {
                request: null,

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
                this.cidbuflen = _param['_cidbuflen']
                this.cutcidbufheadlen = _param['_cutcidbufheadlen']
                this.fixedtimepolarity = _param['_fixedtimepolarity']
                this.fxorxgain = _param['_fxorxgain']
                this.fxotxgain = _param['_fxotxgain']
                this.fxsrxgain = parseInt(_param['_fxsrxgain'])
                this.fxstxgain = _param['_fxstxgain']
                this.current_threshold = _param['_Currentthreshold']
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                let driver = new AST_UcpAlgDriverParam()

                driver._opermode = this.impedance
                driver._codec = this.codec
                driver._cidbuflen = this.cidbuflen == '' ? 3000 : this.cidbuflen
                driver._cutcidbufheadlen = this.cutcidbufheadlen == '' ? 128 : this.cutcidbufheadlen
                driver._fixedtimepolarity = this.fixedtimepolarity == '' ? 0 : this.fixedtimepolarity
                driver._cidbeforering = this.cidbeforering == true ? 1 : 0
                driver._fxorxgain = this.fxorxgain == '' ? 120 : this.fxorxgain
                driver._fxotxgain = this.fxotxgain == '' ? 120 : this.fxotxgain
                driver._fxsrxgain = this.fxsrxgain
                driver._fxstxgain = this.fxstxgain
                driver._Currentthreshold = this.current_threshold

                console.log(driver)
                this.request.AGUcpAlgDriverSave(this.save_succeed_back, this.save_error_back, driver)
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
                console.log('save falied')

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },
        created() {
            this.request = new request()
            this.request.AGUcpAlgDriverGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>