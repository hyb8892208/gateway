<template>
    <el-row>
        <el-divider content-position="left"><h3>{{lang.openvpn_settings}}</h3></el-divider>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.switch_help"></span>
                <span slot="param_name" >{{lang.switch}}</span>
                <el-checkbox slot="param" v-model="sw"></el-checkbox>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.account_help"></span>
                <span slot="param_name" >{{lang.account}}</span>
                <el-input slot="param" v-model="account" :disabled="!sw"></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.password_help"></span>
                <span slot="param_name" >{{lang.password}}</span>
                <el-input slot="param" v-model="password" :disabled="!sw" show-password></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.server_ip_help"></span>
                <span slot="param_name" >{{lang.server_ip}}</span>
                <el-input slot="param" v-model="server_ip" :disabled="!sw"></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.server_port_help"></span>
                <span slot="param_name" >{{lang.server_port}}</span>
                <el-input slot="param" v-model="server_port" :disabled="!sw"></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.upload_configuration_help"></span>
                <span slot="param_name" >{{lang.upload_configuration}}</span>
                <el-upload
                        slot="param"
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
            </form_item>
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