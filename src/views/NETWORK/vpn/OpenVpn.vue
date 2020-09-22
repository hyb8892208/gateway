<template>
    <el-row>
        <el-divider content-position="left"><h3>{{lang.openvpn_settings}}</h3></el-divider>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.switch_help"></div>
                            <span>{{lang.switch}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-checkbox v-model="sw"></el-checkbox>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.account_help"></div>
                            <span>{{lang.account}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input v-model="account" :disabled="!sw"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.password_help"></div>
                            <span>{{lang.password}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input v-model="password" :disabled="!sw" show-password></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.server_ip_help"></div>
                            <span>{{lang.server_ip}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input v-model="server_ip" :disabled="!sw"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.server_port_help"></div>
                            <span>{{lang.server_port}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input v-model="server_port" :disabled="!sw"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.upload_configuration_help"></div>
                            <span>{{lang.upload_configuration}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-upload
                                class="upload-demo"
                                action="/service"
                                name="uploadfile1"
                                :data="{action:'upload',page_name:'network-openvpn',type:'upload'}"
                                :show-file-list=false
                                :on-success="upload_file_success"
                                style="width: 100%;">
                            <el-button type="button" style="width: 100%;">
                                <i class="el-icon-folder-opened"></i>
                                <span> </span>
                                <span>{{lang.select_file}}</span>
                            </el-button>
                        </el-upload>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.download_samples_tips"></div>
                            <span>{{lang.download_samples}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <form action='/service' method='post' wnctype='multipart/form-data' >
                            <input type='hidden' name='action' value='download' />
                            <input type='hidden' name='downloadfile' value='downloadfile' />
                            <input type='hidden' name='page_name' value='network-openvpn' />
                            <button style="width: 100%"
                                    class="el-button el-button--primary el-button--small">
                                {{lang.download_samples}}
                            </button>
                        </form>
                    </el-col>
                </el-form-item>
            </el-col>
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
            upload_file_success(){
                this.$message({
                    message: this.lang.upload_successful,
                    type: 'success',
                    offset: '80'
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