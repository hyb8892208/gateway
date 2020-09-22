<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.fxs_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="Save()">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left"><h3>{{lang.callerid}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.the_pattern_of_sending_cid_help"></div>
                                <span>{{lang.the_pattern_of_sending_cid}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-select v-model="sendcalleridafter" style="width: 100%;">
                                <el-option
                                    v-for="item in sendcalleridafter_options"
                                    :label="item.label"
                                    :key="item.value"
                                    :value="item.value"></el-option>
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
                                <div slot="content" v-html="lang.waiting_time_before_sending_cid_help"></div>
                                <span>{{lang.waiting_time_before_sending_cid}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="sendcalleridaftertime"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.flash_wink_help"></div>
                                <span>{{lang.flash_wink}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox @change="flashwink_change" v-model="flashwink"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.min_flash_time_help"></div>
                                <span>{{lang.min_flash_time}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="rxminflash" :disabled="rxminflash_disabled"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.max_flash_time_help"></div>
                                <span>{{lang.max_flash_time}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="rxflash" :disabled="rxflash_disabled"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.as_ending_dial_key_help"></div>
                                <span>{{lang.as_ending_dial_key}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="enddialkey"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.display_extension_number_help"></div>
                                <span>{{lang.display_extension_number}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-checkbox v-model="ciddisplay"></el-checkbox>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.callerid}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.offhook_antishake_help"></div>
                                <span>{{lang.offhook_antishake}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="dialdebounce"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>

    </el-form>
</template>

<script>
    import {request} from "../../../network/request";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "fxs",
        data() {
            return {
                request: null,

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

                rxminflash_disabled: false,
                rxflash_disabled: false,

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
                this.rxminflash = _fxs['_rxminflash']
                this.rxflash = _fxs['_rxflash']
                this.enddialkey = _fxs['_enddialkey'] == 1 ? true : false
                this.ciddisplay = _fxs['_ciddisplay'] == 1 ? true : false
                this.dialdebounce = _fxs['_dialdebounce']
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            flashwink_change(){
                if(this.flashwink){
                    this.rxminflash_disabled = true
                    this.rxflash_disabled = true
                }else{
                    this.rxminflash_disabled = false
                    this.rxflash_disabled = false
                }
            },

            Save(){
                let UcpAlgFxsparam = new AST_UcpAlgFxsparam()

                UcpAlgFxsparam._sendcalleridafter = this.sendcalleridafter
                UcpAlgFxsparam._sendcalleridaftertime = this.sendcalleridaftertime
                UcpAlgFxsparam._sendpolarityrev = this.sendpolarityrev == true ? 1 : 0
                UcpAlgFxsparam._startcode = this.startcode
                UcpAlgFxsparam._stopcode = this.stopcode
                UcpAlgFxsparam._flashwink = this.flashwink == true ? 1 : 0
                UcpAlgFxsparam._rxminflash = this.rxminflash
                UcpAlgFxsparam._rxflash = this.rxflash
                UcpAlgFxsparam._enddialkey = this.enddialkey == true ? 1 : 0
                UcpAlgFxsparam._dialdebounce = this.dialdebounce == '' ? 0 : this.dialdebounce
                UcpAlgFxsparam._ciddisplay = this.ciddisplay == true ? 1 : 0

                this.request.AGUcpAlgFxsparamSave(this.save_succeed_back, this.save_error_back, UcpAlgFxsparam)
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
            this.request = new request()
            this.request.AGUcpAlgFxsparamGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>