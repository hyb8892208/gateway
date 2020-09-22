<template>
    <el-row>
        <el-divider content-position="left"><h3>{{lang.openvpn_settings}}</h3></el-divider>

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
                            <div slot="content" v-html="lang.account_help"></div>
                            <span>{{lang.account}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input v-model="account"></el-input>
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
                        <el-input v-model="password"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.domain_help"></div>
                            <span>{{lang.domain}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input v-model="domain"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.use_mppe_help"></div>
                            <span>{{lang.use_mppe}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-checkbox v-model="mppe"></el-checkbox>
                    </el-col>
                </el-form-item>
            </el-col>
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