<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.function_keys}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="Save()">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" v-loading="loading" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>
            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.none_keys_blind_transfer_help"></span>
                    <span slot="param_name" >{{lang.none_keys_blind_transfer}}</span>
                    <el-checkbox slot="param" @change="enable_change" v-model="enable"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.blind_transfer_help"></span>
                    <span slot="param_name" >{{lang.blind_transfer}}</span>
                    <el-input v-model="blindtransfer"
                              slot="param"
                              size="small"
                              :disabled="blindtransfer_disabled"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.asked_transfer_help"></span>
                    <span slot="param_name" >{{lang.asked_transfer}}</span>
                    <el-input v-model="askedtransfer"
                              slot="param"
                              size="small"
                              :disabled="askedtransfer_disabled"></el-input>
                </form_item>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Funkeys",
        data() {
            return {
                enable: false,
                blindtransfer: '',
                askedtransfer: '',

                blindtransfer_disabled: false,
                askedtransfer_disabled: false,

                loading: false,
                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _funky = data['_get']['_funky']
                this.enable = _funky['_enable'] == 0 ? true : false
                //灵活路由的处理
                this.blindtransfer = _funky['_blindtransfer']
                this.askedtransfer = _funky['_askedtransfer']

                this.enable_change()
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            enable_change(){
                if(this.enable){
                    this.blindtransfer_disabled = true
                    this.askedtransfer_disabled = false
                    this.blindtransfer = ''
                    this.askedtransfer = this.askedtransfer == '' ? '*38' : this.askedtransfer
                }else{
                    this.blindtransfer_disabled = false
                    this.askedtransfer_disabled = true
                    this.askedtransfer = ''
                    this.blindtransfer = this.blindtransfer == '' ? '*38' : this.blindtransfer
                }
            },

            Save(){
                this.loading = true

                let AlgFunky = new AST_AlgFunky()

                AlgFunky._enable = this.enable == true ? 0 : 1
                AlgFunky._blindtransfer = this.blindtransfer
                AlgFunky._askedtransfer = this.askedtransfer

                this.request.AGAlgFunkySave(this.save_succeed_back, this.save_error_back, AlgFunky)
            },
            save_succeed_back(data){
                this.loading = false

                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: 80
                    })
                }else{
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: 80
                    })
                }
            },
            save_error_back(){
                this.loading = false

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: 80
                })
            }
        },
        created() {
            this.debug = debuger('analog-funkeys')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGAlgFunkyGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>