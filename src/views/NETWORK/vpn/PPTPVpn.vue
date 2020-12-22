<template>
    <el-row>
        <divider_item><span slot="title">{{lang.pptpvpn_settings}}</span></divider_item>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.pptpvpn_server_help"></span>
                <span slot="param_name" >{{lang.server}}</span>
                <el-input slot="param" v-model="server"></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.pptpvpn_account_help"></span>
                <span slot="param_name" >{{lang.account}}</span>
                <el-input slot="param" v-model="account"></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.pptpvpn_password_help"></span>
                <span slot="param_name" >{{lang.password}}</span>
                <el-input slot="param" v-model="password" show-password></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.domain_help"></span>
                <span slot="param_name" >{{lang.domain}}</span>
                <el-input slot="param" v-model="domain"></el-input>
            </form_item>
        </el-row>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.use_mppe_help"></span>
                <span slot="param_name" >{{lang.use_mppe}}</span>
                <el-checkbox slot="param" v-model="mppe"></el-checkbox>
            </form_item>
        </el-row>
    </el-row>
</template>

<script>
    export default {
        name: "PPTPVpn",
        props:{
            parent_data: {
                require: true
            }
        },
        data(){
            return {
                server: '',
                account: '',
                password: '',
                domain: '',
                mppe: '',

                lang: this.$store.state.lang
            }
        },
        mounted() {
            this.server = this.parent_data._pptpServer
            this.account = this.parent_data._pptpAccount
            this.password = this.parent_data._pptpPasswd
            this.domain = this.parent_data._pptpDomain
            this.mppe = this.parent_data._pptpMppe == 1 ? true : false
        }
    }
</script>

<style scoped>

</style>