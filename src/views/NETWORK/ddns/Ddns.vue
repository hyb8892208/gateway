<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.ddns_settings}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left"><h3>{{lang.ddns_settings}}</h3></el-divider>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.ddns_help"></span>
                    <span slot="param_name" >{{lang.ddns}}</span>
                    <el-checkbox slot="param" v-model="ddns_enable"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.type_help"></span>
                    <span slot="param_name" >{{lang.type}}</span>
                    <el-select slot="param" v-model="type" :disabled="!ddns_enable" style="width: 100%">
                        <el-option
                                v-for="item in type_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.username_help"></span>
                    <span slot="param_name" >{{lang.username}}</span>
                    <el-input slot="param" v-model="username[this.type]" :disabled="!ddns_enable"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.password_help"></span>
                    <span slot="param_name" >{{lang.password}}</span>
                    <el-input slot="param" v-model="password[this.type]" show-password :disabled="!ddns_enable"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.your_domain_help"></span>
                    <span slot="param_name" >{{lang.your_domain}}</span>
                    <el-input slot="param" v-model="host[this.type]" :disabled="!ddns_enable"></el-input>
                </form_item>
            </el-row>

        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Ddns",
        data(){
            return {
                ddns_enable: false,
                type: '',
                username: [],
                password: [],
                host: [],

                type_options: [{
                   label: 'inadyn',
                   value: 0
                },{
                    label: 'phddns',
                    value: 1
                }],

                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _general = data['_get']['_general']
                let _com = data['_get']['_com']['_item']

                this.ddns_enable = _general['_ddns'] == 1 ? true : false
                this.type = parseInt(_general['_type'])

                this.username[0] = _com[0]['_userid']
                this.username[1] = _com[1]['_userid']

                this.password[0] = _com[0]['_passwd']
                this.password[1] = _com[1]['_passwd']

                this.host[0] = _com[0]['_host']
                this.host[1] = _com[1]['_host']
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const networkddnscom = new AST_NetworkDdnsCom()
                const networkddnsgeneral = new AST_NetworkDdnsGeneral()

                networkddnsgeneral._ddns = this.ddns_enable == true ? 1 : 0
                networkddnsgeneral._type = this.type
                networkddnscom._host = this.host[this.type]
                networkddnscom._userid = this.username[this.type]
                networkddnscom._passwd = this.password[this.type]

                const NetworkDdnsSave = new AST_NetworkDdnsSave()
                NetworkDdnsSave._general = networkddnsgeneral
                NetworkDdnsSave._com = networkddnscom

                this.request.AGNetworkDdnsGetSave(this.save_succeed_back, this.save_error_back, NetworkDdnsSave)
            },
            save_succeed_back(data){
                console.log(data)

                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })
            },
            save_error_back(){
                console.log('save failed')

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },
        created() {
            this.request.AGNetworkDdnsGetAll(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>