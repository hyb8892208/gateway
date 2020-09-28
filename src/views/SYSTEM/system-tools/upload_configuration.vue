<template>
    <div>
        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.upload_configuration"></span>
                <span slot="param_name" >{{lang.upload_configuration}}</span>
                <el-upload
                        class="upload-demo"
                        slot="param"
                        action="/service"
                        name="uploadfile1"
                        :data="{action:'upload',page_name:'system-tools',type:'file_upload'}"
                        :on-success="upload_file_success"
                        style="width: 100%;">
                    <el-button type="button" style="width: 100%;">
                        <i class="el-icon-folder-opened"></i>
                        <span> </span>
                        <span>{{lang.select_file}}</span>
                    </el-button>
                </el-upload>
            </form_item>
        </el-row>
    </div>
</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "upload_configuration",
        data(){
            return {
                lang: this.$store.state.lang
            }
        },
        methods:{
            /* Upload File */
            upload_file_success(response, file, fileList){
                this.$message({
                    message: this.lang.upload_successful,
                    type: 'success',
                    offset: '80'
                })

                this.request.AGSystemWsapiReload(this.reload_succeed_back, this.reload_error_back)
                this.request.AGCommitAll(this.commit_succeed_back, this.commit_error_back, 'upload new configuration!')
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