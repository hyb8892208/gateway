<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.advanced}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" v-loading="loading" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.general}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.flex_routing_switch_help"></span>
                    <span slot="param_name" >{{lang.flex_routing_switch}}</span>
                    <el-checkbox slot="param" v-model="flex_routing_sw"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.enable_internal_fxs_call_help"></span>
                    <span slot="param_name" >{{lang.enable_internal_fxs_call}}</span>
                    <el-checkbox slot="param" v-model="internalcallsw" :disabled="!flex_routing_sw"></el-checkbox>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.enable_internal_sip_call_help"></span>
                    <span slot="param_name" >{{lang.enable_internal_sip_call}}</span>
                    <el-checkbox slot="param" v-model="internalsipcallsw"></el-checkbox>
                </form_item>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Routing-advanced",
        data() {
            return {
                flex_routing_sw: false,
                internalcallsw: false,
                internalsipcallsw: false,

                old_flex_routing_sw: false,

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

                this.flex_routing_sw = data['_get']['_FlexRoutingSw'] == 1 ? true : false
                this.internalcallsw = data['_get']['_InternalCallSw'] == 1 ? true : false
                this.internalsipcallsw = data['_get']['_InternalSipCallSw'] == 1 ? true : false

                this.old_flex_routing_sw = data['_get']['_FlexRoutingSw'] == 1 ? true : false
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                this.loading = true

                const RoutingAdvSave = new AST_RoutingAdvSave()

                RoutingAdvSave._FlexRoutingSw = this.flex_routing_sw == true ? 1 : 0
                RoutingAdvSave._InternalCallSw = this.internalcallsw == true ? 1 : 0
                RoutingAdvSave._InternalSipCallSw = this.internalsipcallsw == true ? 1 : 0

                if((this.flex_routing_sw && !this.old_flex_routing_sw) ||
                    (!this.flex_routing_sw && this.old_flex_routing_sw)) {

                    this.$confirm(this.lang.flex_routing_switch_open_help)
                        .then(_ => {
                            this.request.AGRoutingAdvSave(this.save_succeed_back, this.save_error_back, RoutingAdvSave)
                        })
                        .catch(_ => {
                            this.loading = false
                        })

                }else{
                    this.request.AGRoutingAdvSave(this.save_succeed_back, this.save_error_back, RoutingAdvSave)
                }

            },
            save_succeed_back(data){
                this.loading = false

                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: 80
                    })

                    window.location.reload()
                }else{
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: 80
                    })
                }
            },
            save_error_back(data){
                this.loading = false

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: 80
                })
            },
        },
        created() {
            this.debug = debuger('routing-advanced')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGRoutingAdvGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>