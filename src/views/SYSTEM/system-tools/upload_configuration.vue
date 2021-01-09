<template>
    <div>
        <el-row>
            <el-col :lg="12" :sm="24" :xs="24">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.upload_configuration"></div>
                            <span>{{lang.upload_configuration}}</span>
                        </el-tooltip>:
                    </label>
                    <el-row>
                        <el-col :span="18"  style="margin-right: 10px;">
                            <el-upload
                                    class="upload-demo"
                                    ref="upload"
                                    action="/service"
                                    name="uploadfile1"
                                    :auto-upload=false
                                    :data="{action:'upload',page_name:'system-tools',type:'file_upload'}"
                                    :on-success="upload_file_success"
                                    :before-upload="before_upload"
                                    :on-change="file_change"
                                    limit="1"
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
                                       @click="before_conf_file"
                            >{{lang.upload}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "upload_configuration",
        data(){
            return {
                file: [],
                lang: this.$store.state.lang
            }
        },
        methods:{
            /* Upload File */
            before_conf_file(){
                if(this.file.length == 0){
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: this.lang.select_file_alert,
                        type: 'error',
                        offset: '80'
                    })

                    return false
                }

                this.$confirm(this.lang.file_upload_confirm)
                    .then(_ => {
                        this.$refs.upload.submit()
                })
            },
            before_upload(file){
                if(file.name.indexOf('.tar.gz') == -1){
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: this.lang.select_file_alert,
                        type: 'error',
                        offset: '80'
                    })

                    return false
                }
            },
            upload_file_success(response, file, fileList){
                this.$message({
                    message: this.lang.upload_successful,
                    type: 'success',
                    offset: '80'
                })

                this.request.AGSystemWsapiReload(this.reload_succeed_back, this.reload_error_back)
                this.request.AGCommitAll(this.commit_succeed_back, this.commit_error_back, 'upload new configuration!')
            },
            file_change(file){
                this.file = file

                if(file.name.indexOf('.tar.gz') == -1){
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: this.lang.fire_upload_help,
                        type: 'error',
                        offset: '80'
                    })

                    this.$refs.upload.clearFiles()
                    this.file = []
                }
            },
            reload_succeed_back(data){

            },
            reload_error_back(){

            },
            commit_succeed_back(data){

            },
            commit_error_back(){

            },
            /* Upload File */
        },
        created() {
            this.request = new request()
        }
    }
</script>

<style scoped>

</style>