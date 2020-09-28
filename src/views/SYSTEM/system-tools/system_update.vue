<template>
    <div>
        <el-row>
            <el-col :lg="12" :sm="24" :xs="24">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.system_update"></div>
                            <span>{{lang.system_update}}</span>
                        </el-tooltip>:
                    </label>
                    <el-row>
                        <el-col :span="18"  style="margin-right: 10px;">
                            <el-upload
                                    ref="system_upload"
                                    action="/service"
                                    name="uploadfile1"
                                    :auto-upload="false"
                                    :data="{action:'upload',page_name:'system-tools',type:'system_update'}"
                                    :on-success="system_upload_succeed"
                                    style="width: 100%;">
                                <el-button type="button" style="width: 100%;">
                                    <i class="el-icon-folder-opened"></i>
                                    <span> </span>
                                    <span>{{lang.select_file}}</span>
                                </el-button>
                            </el-upload>
                        </el-col>
                        <el-col :span="4">
                            <el-button size="small"
                                       type="primary"
                                       @click="before_system_file"
                            >{{lang.upload}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-col>
        </el-row>

        <!-- 系统升级弹框 -->
        <el-dialog
                :title="lang.system_update"
                :visible.sync="update_dialogVisible"
                id="system_update"
                :before-close="rebootClose"
                :width="this.$store.state.page.dialog_width">
            <span>{{update_result}}</span>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "system_update",
        data(){
            return {
                update_dialogVisible: false,
                update_result: '',

                lang: this.$store.state.lang
            }
        },
        methods:{
            /* System update */
            checkNetwork(){
                this.$axios.get('/service?action=reboot')
                    .then((res) => {
                        if(res.data == 1){
                            window.location.href = '/System/Status'
                        }
                    })
                    .catch((error) => {
                        if(this.reboot_timeout >= 300){
                            this.reboot_dialogVisible = false
                            this.reboot_result = this.lang.system_restart_timeout
                        }

                        this.reboot_timeout++
                        setTimeout(this.checkNetwork, 1000)
                    })
            },
            rebootClose(done){
                this.$confirm(this.lang.dialog_close_confirm)
                    .then(_ => {
                        this.reboot_dialogVisible = false
                        this.update_dialogVisible = false
                    })
                    .catch(_ => {})
            },

            before_system_file(){
                this.$confirm(this.lang.system_update_confirm)
                    .then(_ => {
                        this.update_dialogVisible = true
                        this.update_loading_text = this.lang.system_updating
                        this.loading = this.$loading({//在dialog容器中增加loading
                            lock: false,
                            text: this.update_loading_text,
                            background: '#ffffff',
                            target: '#system_update .el-dialog',
                            body: false,
                        })

                        this.request.AGSystemCloseAllservice(this.close_succees_back, this.close_error_back)
                    })
                    .catch(_ => {})
            },
            close_succees_back(data){
                if(data['_result'] == 0){
                    this.$refs.system_upload.submit()
                }else{
                    this.loading.close()
                    this.update_result = this.lang.clean_memory_failed
                }
            },
            close_error_back(){
                this.loading.close()
                this.update_result = this.lang.clean_memory_failed
            },

            fileware_succeed_back(data){
                if(data['_result'] == 0){
                    this.systemUpdateID = setTimeout(this.checkNetwork, 30000)
                }else{
                    this.loading.close()
                    this.update_result = this.lang.system_update_failed
                }
            },
            fileware_error_back(){
                this.loading.close()
                this.update_result = this.lang.system_update_failed
            },
            system_upload_succeed(){
                this.$message({
                    message: this.lang.upload_successful,
                    type: 'success',
                    offset: '80'
                })

                this.request.AGSystemToolsUpdatefireware(this.fileware_succeed_back, this.fileware_error_back)
            },
            /* System update */
        },
        created() {
            this.request = new request()
        },
        beforeDestroy() {
            clearTimeout(this.systemUpdateID)
        }
    }
</script>

<style scoped>

</style>