<template>
    <el-row>
        <el-divider content-position="left"><h3>{{lang.l2tp_vpn_settings}}</h3></el-divider>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.enable_help"></span>
                <span slot="param_name" >{{lang.enable}}</span>
                <el-checkbox slot="param" v-model="enable"></el-checkbox>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.server_help"></span>
                <span slot="param_name" >{{lang.server}}</span>
                <el-input slot="param" v-model="server"></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.username_help"></span>
                <span slot="param_name" >{{lang.username}}</span>
                <el-input slot="param" v-model="username"></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.password_help"></span>
                <span slot="param_name" >{{lang.password}}</span>
                <el-input slot="param" v-model="password" show-password></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.ipsec_help"></span>
                <span slot="param_name" >{{lang.ipsec}}</span>
                <el-checkbox slot="param" v-model="ipsec"></el-checkbox>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.ipsec_password_help"></span>
                <span slot="param_name" >{{lang.ipsec_password}}</span>
                <el-input slot="param" v-model="ipsec_password" show-password></el-input>
            </form_item>
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