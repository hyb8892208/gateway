<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.fxo_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="Save()">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left"><h3>{{lang.busy_detect}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.busy_detect_help"></span>
                    <span slot="param_name" >{{lang.busy_detect}}</span>
                    <el-checkbox slot="param" v-model="busydetect"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.busy_count_help"></span>
                    <span slot="param_name" >{{lang.busy_count}}</span>
                    <el-input slot="param" v-model="busycount"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.busy_country_help"></span>
                    <span slot="param_name" >{{lang.busy_country}}</span>
                    <el-select slot="param" v-model="busycountry" style="width: 100%;">
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
                    <el-checkbox slot="param" v-model="fxomon"></el-checkbox>
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

            <el-divider content-position="left"><h3>{{lang.silence_detect}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.silence_detect_help"></span>
                    <span slot="param_name" >{{lang.silence_detect}}</span>
                    <el-checkbox slot="param" v-model="silencedetect"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.silence_threshold_help"></span>
                    <span slot="param_name" >{{lang.silence_threshold}}</span>
                    <el-input slot="param" v-model="silencethreshold"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.max_silence_help"></span>
                    <span slot="param_name" >{{lang.max_silence}}</span>
                    <el-input slot="param" v-model="maxsilence"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.rx_threshold_help"></span>
                    <span slot="param_name" >{{lang.rx_threshold}}</span>
                    <el-input slot="param" v-model="rxthreshold"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.tx_threshold_help"></span>
                    <span slot="param_name" >{{lang.tx_threshold}}</span>
                    <el-input slot="param" v-model="txthreshold"></el-input>
                </form_item>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.dahdi_parameters}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.polaritydebounce_help"></span>
                    <span slot="param_name" >{{lang.polaritydebounce}}</span>
                    <el-input slot="param" v-model="polaritydebounce"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.ringdebounce_help"></span>
                    <span slot="param_name" >{{lang.ringdebounce}}</span>
                    <el-input slot="param" v-model="ringdebounce"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.ringoncount_help"></span>
                    <span slot="param_name" >{{lang.ringoncount}}</span>
                    <el-input slot="param" v-model="ringoncount"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.ringoffcount_help"></span>
                    <span slot="param_name" >{{lang.ringoffcount}}</span>
                    <el-input slot="param" v-model="ringoffcount"></el-input>
                </form_item>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {request} from "../../../network/request";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "fxo",
        data() {
            return {
                request: null,

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
                this.silencethreshold = _glb['_silencethreshold']
                this.maxsilence = _glb['_maxsilence']
                this.rxthreshold = _glb['_rxthreshold']
                this.txthreshold = _glb['_txthreshold']
                this.polaritydebounce = _dahdi['_polaritydebounce']
                this.ringdebounce = _dahdi['_ringdebounce']
                this.ringoncount = _dahdi['_ringoncount']
                this.ringoffcount = _dahdi['_ringoffcount']
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const global = new AST_UcpAlgFxoGlobal()

                global._busycount = this.busycount
                global._busycountry = this.busycountry
                global._silencethreshold = this.silencethreshold
                global._maxsilence = this.maxsilence
                global._rxthreshold = this.rxthreshold
                global._txthreshold = this.txthreshold
                global._silencedetect = this.silencedetect == true ? 1 : 0
                global._busydetect = this.busydetect == true ? 1 : 0

                const dahdi = new AST_UcpAlgDahdiContent()

                dahdi._polaritydebounce = this.polaritydebounce == '' ? 8 : this.polaritydebounce
                dahdi._ringdebounce = this.ringdebounce == '' ? 0 : this.ringdebounce
                dahdi._ringoncount = this.ringoncount == '' ? 0 : this.ringoncount
                dahdi._ringoffcount = this.ringoffcount == '' ? 0 : this.ringoffcount

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
            this.request = new request()
            this.request.AGUcpAlgFxoparamGetAll(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>