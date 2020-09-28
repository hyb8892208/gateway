<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <h1 style="line-height: 50px;font-size: 18px;padding-left: 20px;margin-bottom: 20px;">
            {{lang.general}}
            <div style="float: right;line-height: 50px;margin-right: 20px;">
                <el-button style="vertical-align:middle;"
                           type="primary"
                           size="small"
                           @click="Save()"
                >{{lang.save}}</el-button>
            </div>
        </h1>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>
            <el-form :label-position="$store.state.page.labelPosition"
                     label-width="250px"
                     class="change-label-class"
                     size="small">
                <el-divider content-position="left"><h3>{{lang.language_settings}}</h3></el-divider>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.language"></span>
                        <span slot="param_name" >{{lang.language}}</span>
                        <el-select slot="param" v-model="language_value" :placeholder="lang.select_placeholder" style="width: 100%;">
                            <el-option
                                    v-for="item in languages"
                                    :label="item.label"
                                    :key="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.language_download_help"></span>
                        <span slot="param_name" >{{lang.download}}</span>
                        <form slot="param" action='/service' method='post' enctype='multipart/form-data' >
                            <input type="hidden" name="action" value="download"/>
                            <input type='hidden' id="downloadfile_val" name='downloadfile' :value="language_value" />
                            <input type='hidden' name='page_name' value='system-general' />
                            <button type="primary"
                                    size="small"
                                    class="el-button el-button--primary el-button--small"
                                    style="width: 100%;">{{lang.download}}</button>
                        </form>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.delete_language_help"></span>
                        <span slot="param_name" >{{lang.delete}}</span>
                        <el-button type="primary"
                                   slot="param"
                                   size="small"
                                   @click="Delete_language"
                                   style="width: 100%;">{{lang.delete}}</el-button>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.add_new_language"></span>
                        <span slot="param_name" >{{lang.add_new_language}}</span>
                        <el-upload
                                class="upload-demo"
                                slot="param"
                                action="/service"
                                name="uploadfile1"
                                :data="{action:'upload',page_name:'system-general',type:'upload'}"
                                :show-file-list=false
                                :on-success="upload_succeed"
                                style="width: 100%;">
                            <el-button type="button" style="width: 100%;">
                                <i class="el-icon-folder-opened"></i>
                                <span> </span>
                                <span>{{lang.select_file}}</span>
                            </el-button>
                        </el-upload>
                    </form_item>
                </el-row>

                <el-divider content-position="left"><h3>{{lang.scheduled_reboot}}</h3></el-divider>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.enable_help"></span>
                        <span slot="param_name" >{{lang.enable}}</span>
                        <el-checkbox slot="param" v-model="reboot_sw"></el-checkbox>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.reboot_type_help"></span>
                        <span slot="param_name" >{{lang.reboot_type}}</span>
                        <el-select slot="param" v-model="reboot_type_value" :placeholder="lang.select_placeholder" style="width: 100%;">
                            <el-option
                                    v-for="item in reboot_type"
                                    :label="lang[item.label]"
                                    :key="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row v-show="reboot_type_value == 'by_day'"><!-- By Day -->
                    <form_item>
                        <span slot="param_help" v-html="lang.hour"></span>
                        <span slot="param_name" >{{lang.hour}}</span>
                        <el-select slot="param" v-model="d_hour" :placeholder="lang.select_placeholder" style="width: 100%">
                            <el-option v-for="i in 24" :value="i">{{i-1}}</el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row v-show="reboot_type_value == 'by_day'"><!-- By Day -->
                    <form_item>
                        <span slot="param_help" v-html="lang.minute"></span>
                        <span slot="param_name" >{{lang.minute}}</span>
                        <el-select slot="param" v-model="d_minute" :placeholder="lang.select_placeholder" style="width: 100%">
                            <el-option v-for="i in 60" :value="i">{{i-1}}</el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row v-show="reboot_type_value == 'by_week'"><!-- By Week -->
                    <form_item>
                        <span slot="param_help" v-html="lang.week"></span>
                        <span slot="param_name" >{{lang.week}}</span>
                        <el-select slot="param" v-model="w_week_value" style="width: 100%">
                            <el-option
                                    v-for="item in w_week"
                                    :label="lang[item.label]"
                                    :key="item.value"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row v-show="reboot_type_value == 'by_week'"><!-- By Week -->
                    <form_item>
                        <span slot="param_help" v-html="lang.hour"></span>
                        <span slot="param_name" >{{lang.hour}}</span>
                        <el-select slot="param" v-model="w_hour" :placeholder="lang.select_placeholder" style="width: 100%">
                            <el-option v-for="i in 24" :value="i">{{i-1}}</el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row v-show="reboot_type_value == 'by_week'"><!-- By Week -->
                    <form_item>
                        <span slot="param_help" v-html="lang.minute"></span>
                        <span slot="param_name" >{{lang.minute}}</span>
                        <el-select slot="param" v-model="w_minute" :placeholder="lang.select_placeholder" style="width: 100%">
                            <el-option v-for="i in 60" :value="i">{{i-1}}</el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row v-show="reboot_type_value == 'by_month'"><!-- By Month -->
                    <form_item>
                        <span slot="param_help" v-html="lang.date"></span>
                        <span slot="param_name" >{{lang.date}}</span>
                        <el-select slot="param" v-model="m_month" :placeholder="lang.select_placeholder" style="width: 100%">
                            <el-option v-for="i in 32" :value="i">{{i-1}}</el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row v-show="reboot_type_value == 'by_month'"><!-- By Month -->
                    <form_item>
                        <span slot="param_help" v-html="lang.hour"></span>
                        <span slot="param_name" >{{lang.hour}}</span>
                        <el-select slot="param" v-model="m_hour" :placeholder="lang.select_placeholder" style="width: 100%">
                            <el-option v-for="i in 24" :value="i">{{i-1}}</el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row v-show="reboot_type_value == 'by_month'"><!-- By Month -->
                    <form_item>
                        <span slot="param_help" v-html="lang.minute"></span>
                        <span slot="param_name" >{{lang.minute}}</span>
                        <el-select slot="param" v-model="m_minute" :placeholder="lang.select_placeholder" style="width: 100%">
                            <el-option v-for="i in 60" :value="i">{{i-1}}</el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row v-show="reboot_type_value == 'by_run_time'"><!-- By Running Time -->
                    <form_item>
                        <span slot="param_help" v-html="lang.day"></span>
                        <span slot="param_name" >{{lang.day}}</span>
                        <el-select slot="param" v-model="r_day" :placeholder="lang.select_placeholder" style="width: 100%">
                            <el-option v-for="i in 32" :value="i">{{i-1}}</el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row v-show="reboot_type_value == 'by_run_time'"><!-- By Running Time -->
                    <form_item>
                        <span slot="param_help" v-html="lang.hour"></span>
                        <span slot="param_name" >{{lang.hour}}</span>
                        <el-select slot="param" v-model="r_hour" :placeholder="lang.select_placeholder" style="width: 100%">
                            <el-option v-for="i in 24" :value="i">{{i-1}}</el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row v-show="reboot_type_value == 'by_run_time'"><!-- By Running Time -->
                    <form_item>
                        <span slot="param_help" v-html="lang.minute"></span>
                        <span slot="param_name" >{{lang.minute}}</span>
                        <el-select slot="param" v-model="r_minute" :placeholder="lang.select_placeholder" style="width: 100%">
                            <el-option v-for="i in 60" :value="i">{{i-1}}</el-option>
                        </el-select>
                    </form_item>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {request} from "../../../network/request";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "System-general",
        inject:['reload'],
        data(){
            return {
                request: null,

                language_value: 'english',
                reboot_sw: false,
                reboot_type_value: 'by_day',
                d_hour: 0,
                d_minute: 0,
                w_week_value: 0,
                w_hour: 0,
                w_minute: 0,
                m_month: 0,
                m_hour: 0,
                m_minute: 0,
                r_day: 0,
                r_hour: 0,
                r_minute: 0,
                snmp_sw: false,

                reboot_type: [{
                        label: 'by_day',
                        value: 'by_day'
                    },{
                        label: 'by_week',
                        value: 'by_week'
                    },{
                        label: 'by_month',
                        value: 'by_month'
                    },{
                        label: 'by_running_time',
                        value: 'by_run_time'
                }],

                w_week: [{
                        label: 'Sun',
                        value: 0
                    },{
                        label: 'Mon',
                        value: 1
                    },{
                        label: 'Tue',
                        value: 2
                    },{
                        label: 'Wed',
                        value: 3
                    },{
                        label: 'Thu',
                        value: 4
                    },{
                        label: 'Fri',
                        value: 5
                    },{
                        label: 'Sat',
                        value: 6
                }],

                languages: [],

                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){

                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _langs = data['_get']['_langs']['_item']
                let _autoreboot = data['_get']['_autoreboot']

                _langs.forEach(item => {
                    let obj = {
                        label: item._value,
                        value: item._key
                    }
                    this.languages.push(obj)
                })

                this.language_value = data['_get']['_lang']
                this.reboot_sw = _autoreboot['_sw'] == 0 ? true : false
                this.reboot_type_value = _autoreboot['_type']
                this.d_hour = _autoreboot['_dhour']
                this.d_minute = _autoreboot['_dminute']
                this.w_week_value = parseInt(_autoreboot['_wweek'])
                this.w_hour = _autoreboot['_whour']
                this.w_minute = _autoreboot['_wminute']
                this.m_month = _autoreboot['_mmonth']
                this.m_hour = _autoreboot['_mhour']
                this.m_minute = _autoreboot['_mminute']
                this.r_day = _autoreboot['_rday']
                this.r_hour = _autoreboot['_rhour']
                this.r_minute = _autoreboot['_rminute']
                this.snmp_sw = data['_get']['_snmp'] == 0 ? true : false

                console.log(this.r_day)
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const sysauto = new AST_SysAuto()
                sysauto._sw = this.reboot_sw == true ? 0 : 1
                sysauto._type = this.reboot_type_value
                sysauto._dminute = this.d_minute
                sysauto._dhour = this.d_hour
                sysauto._wminute = this.w_minute
                sysauto._whour = this.w_hour
                sysauto._wweek = this.w_week_value
                sysauto._mminute = this.m_minute
                sysauto._mhour = this.m_hour
                sysauto._mmonth = this.m_month
                sysauto._rminute = this.r_minute
                sysauto._rhour = this.r_hour
                sysauto._rday = this.r_day

                const SysGeneralSave = new AST_SysGeneralSave()
                SysGeneralSave._autoreboot = sysauto

                let snmp_sw_val = this.snmp_sw == true ? 1 : 0
                SysGeneralSave._snmp = snmp_sw_val

                SysGeneralSave._lang = this.language_value

                this.request.AGSysGeneralSave(this.save_succeed_back, this.save_error_back, SysGeneralSave)
            },
            save_succeed_back(data){
                console.log(data)

                this.$message({
                    message: '恭喜你，保存成功',
                    type: 'success',
                    offset: '80'
                })

                window.location.reload()
            },
            save_error_back(){
                console.log('save error')

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            },

            Delete_language(){
                this.$confirm('确定要删除吗')
                    .then(_ => {
                        this.request.AGSysGeneralDelLang(this.del_succeed_back, this.del_error_back, this.language_value)
                    }).catch(_ => {

                })
            },
            del_succeed_back(data){
                console.log(data)
                this.$message({
                    message: '恭喜你，删除成功',
                    type: 'success',
                    offset: '80'
                })

                this.reload()
            },
            del_error_back(){
                this.$message({
                    message: '删除失败',
                    type: 'error',
                    offset: '80'
                })

                this.reload()
            },
            upload_succeed(){
                this.$message({
                    message: this.lang.upload_successful,
                    type: 'success',
                    offset: '80'
                })

                this.reload()
            }
        },
        created() {
            this.request = new request()
            this.request.AGSysGeneralGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>