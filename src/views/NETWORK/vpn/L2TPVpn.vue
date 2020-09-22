<template>
    <el-row>
        <el-divider content-position="left"><h3>{{lang.l2tp_vpn_settings}}</h3></el-divider>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.enable_help"></div>
                            <span>{{lang.enable}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-checkbox v-model="enable"></el-checkbox>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.server_help"></div>
                            <span>{{lang.server}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input v-model="server"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.username_help"></div>
                            <span>{{lang.username}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input v-model="username"></el-input>
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
                        <el-input v-model="password" show-password></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.ipsec_help"></div>
                            <span>{{lang.ipsec}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-checkbox v-model="ipsec"></el-checkbox>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.ipsec_password_help"></div>
                            <span>{{lang.ipsec_password}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input v-model="ipsec_password" show-password></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    export default {
        name: "L2TPVpn",
        props:{
            parent_data:{
                require: true
            }
        },
        data(){
            return {
                enable: false,
                server: '',
                username: '',
                password: '',
                ipsec: false,
                ipsec_password: '',

                lang: this.$store.state.lang
            }
        },
        mounted() {
            this.enable = this.parent_data._l2tpvpnSw == 1 ? true : false
            this.server = this.parent_data._l2tpvpnServer
            this.username = this.parent_data._l2tpvpnUsername
            this.password = this.parent_data._l2tpvpnPasswd
            this.ipsec = this.parent_data._l2tpvpnIpsecSw == 1 ? true : false
            this.ipsec_password = this.parent_data._l2tpvpnIpsecPasswd
        }
    }
</script>

<style scoped>

</style>