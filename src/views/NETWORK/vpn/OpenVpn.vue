<template>
    <el-row>
        <divider_item><span slot="title">{{lang.openvpn_settings}}</span></divider_item>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.switch_help"></span>
                <span slot="param_name" >{{lang.switch}}</span>
                <el-checkbox slot="param" v-model="sw"></el-checkbox>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.openvpn_account_help"></span>
                <span slot="param_name" >{{lang.account}}</span>
                <el-input slot="param" v-model="account" :disabled="!sw"></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.openvpn_password_help"></span>
                <span slot="param_name" >{{lang.password}}</span>
                <el-input slot="param" v-model="password" :disabled="!sw" show-password></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.openvpn_server_ip_help"></span>
                <span slot="param_name" >{{lang.server_ip}}</span>
                <el-input slot="param" v-model="server_ip" :disabled="!sw"></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.openvpn_server_port_help"></span>
                <span slot="param_name" >{{lang.server_port}}</span>
                <el-input slot="param" v-model="server_port" :disabled="!sw"></el-input>
            </form_item>
        </el-row>

        <el-row>
            <el-row>
                <el-col :lg="12" :sm="24" :xs="24">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.openvpn_configuration_files_help"></div>
                                <span>{{lang.upload_configuration}}</span>
                            </el-tooltip>:
                        </label>
                        <el-row>
                            <el-col :span="18"  style="margin-right: 10px;">
                                <el-upload
                                        ref="openvpn_upload"
                                        class="upload-demo"
                                        action="/service"
                                        limit="1"
                                        name="uploadfile1"
                                        :auto-upload="false"
                                        :data="{action:'upload',page_name:'network-openvpn',type:'upload'}"
                                        :on-success="upload_file_success"
                                        :before-upload="before_upload"
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
                                           @click="click_upload"
                                >{{lang.upload}}</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.download_samples_tips"></span>
                <span slot="param_name" >{{lang.download_samples}}</span>
                <form slot="param" action='/service' method='post' wnctype='multipart/form-data' >
                    <input type='hidden' name='action' value='download' />
                    <input type='hidden' name='downloadfile' value='downloadfile' />
                    <input type='hidden' name='page_name' value='network-openvpn' />
                    <button style="width: 100%"
                            class="el-button el-button--primary el-button--small">
                        {{lang.download_samples}}
                    </button>
                </form>
            </form_item>
        </el-row>

    </el-row>
</template>

<script>
    export default {
        name: "OpenVpn",
        props:{
            parent_data:{
                require: true
            }
        },
        data(){
            return {
                sw: '',
                account: '',
                password: '',
                server_ip: '',
                server_port: '',

                lang: this.$store.state.lang
            }
        },
        methods: {
            before_upload(file){
                if(file.name.indexOf('.tar.gz') == -1 && file.name.indexOf('.ovpn') == -1){
                    this.$message({
                        message: 'The format of the upload file should be like this "xxxx.tar.gz" or "xxxx.ovpn"',
                        type: 'error',
                        offset: 80
                    })

                    return false
                }else if(file.size > 1000*1000*40){
                    this.$message({
                        message: "Uploaded max file is 40M!",
                        type: 'error',
                        offset: 80
                    })

                    return false
                }
            },
            click_upload(){
                this.$refs.openvpn_upload.submit()
            },
            upload_file_success(){
                this.$message({
                    message: this.lang.upload_successful,
                    type: 'success',
                    offset: 80
                })
            }
        },
        mounted() {
            this.sw = this.parent_data._openvpnEncSw == 1 ? true : false
            this.account = this.parent_data._openvpnUsername
            this.password = this.parent_data._openvpnPasswd
            this.server_ip = this.parent_data._openvpnServer
            this.server_port = this.parent_data._openvpnPort
        }
    }
</script>

<style scoped>

</style>