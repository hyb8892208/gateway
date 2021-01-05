<template>
    <div>
        <el-row>
            <el-col :lg="12" :sm="24" :xs="24">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.voice_record_help"></div>
                            <span>{{lang.voice_record}}</span>
                        </el-tooltip>:
                    </label>
                    <el-row :gutter="10">
                        <el-col :lg="18" :sm="15" :xs="15">
                            <el-button type="primary"
                                       size="small"
                                       style="width: 100%"
                                       @click="start_record"
                            >{{lang.start_recording}}</el-button>
                        </el-col>
                        <el-col :lg="5" :sm="8" :xs="8">
                            <el-select v-model="voice_channel">
                                <el-option
                                        v-for="item in channels"
                                        :label="item.name"
                                        :key="item.channel"
                                        :value="item.channel"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-col>
        </el-row>

        <!-- 录音弹框 -->
        <el-dialog
                :title="lang.voice_record"
                :visible.sync="voice_record_dialogVisible"
                id="voice_record"
                :before-close="recordClose"
                :width="$store.state.page.dialog_width">
            <div style="text-align: center;font-size: 30px;">{{timeout}}</div>
            <div style="color:green;font-size: 20px;margin-top:30px;">{{voice_record_content}}</div>
            <span slot="footer" class="dialog-footer">
                <form action="/service" method="post" ref="stop_voice">
                    <input type="hidden" name="action" value="download" />
                    <input type="hidden" name="channel" :value="voice_channel" />
                    <input type="hidden" name="downloadfile" value="sound" />
                    <input type="hidden" name="page_name" value="system-tools" />
                    <button style="width: 100%"
                            type="button"
                            @click="stop_voice_record"
                            class="el-button el-button--primary el-button--small">
                            {{lang.stop}}
                    </button>
                </form>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "voice_record",
        data(){
            return {
                voice_record_dialogVisible: false,
                voice_record_content: '',
                timeout: '00:00',
                voice_channel: '',
                sec: 1,//time

                lang: this.$store.state.lang
            }
        },
        props: {
            channels: {
                default: [],
            }
        },
        methods:{
            /* Voice Record */
            start_record(){
                if(this.voice_channel == ''){
                    this.$alert(this.lang.please_select_channel)
                        .then(_ => {
                        })
                }else{
                    console.log('start record')
                    this.voice_record_dialogVisible = true
                    this.voice_record_content = this.lang.voice_record_confirm

                    this.request.AGUcpSystemToolsSndRecordStart(this.start_success_back, this.start_error_back, this.voice_channel)
                }
            },
            start_success_back(data){
                console.log('start voice:', data)
                this.timeoutID = setInterval(this.timer, 1000)
            },
            start_error_back(){
                console.log('error')
            },
            timer(){
                let s=0,m=0

                m = parseInt(this.sec/60)
                m = m < 10 ? '0'+m : m
                s = this.sec%60
                s = s < 10 ? '0'+s : s

                this.timeout =  m+':'+s
                if(this.sec>=600){
                    this.stop_voice_record()
                }

                this.sec++
            },

            stop_voice_record(){
                this.voice_record_dialogVisible = false
                this.request.AGUcpSystemToolsSndRecordStop(this.stop_succeed_back, this.stop_error_back, this.voice_channel)
                clearInterval(this.timeoutID)
                this.timeout = '00:00'
                this.sec = 1
            },
            stop_succeed_back(data){
                console.log('stop suceess',data)
                this.$refs.stop_voice.submit()
            },
            stop_error_back(){
                this.$message({
                    message: this.lang.voice_file_download_failed,
                    type: 'error',
                    offset: '80'
                })
            },
            recordClose(){
                this.$confirm(this.lang.dialog_close_confirm)
                    .then(_ => {
                        this.stop_voice_record()
                    })
                    .catch(_ => {

                    })
            },
            /* Voice Record */
        },
        created() {
            this.request = request()
        },
        beforeDestroy() {
            clearInterval(this.timeoutID)
        }
    }
</script>

<style scoped>

</style>