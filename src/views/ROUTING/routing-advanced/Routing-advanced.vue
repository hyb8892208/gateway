<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.advanced}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left"><h3>{{lang.general}}</h3></el-divider>

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

    export default {
        name: "Routing-advanced",
        data() {
            return {
                flex_routing_sw: false,
                internalcallsw: false,
                internalsipcallsw: false,

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
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const RoutingAdvSave = new AST_RoutingAdvSave()

                RoutingAdvSave._FlexRoutingSw = this.flex_routing_sw == true ? 1 : 0
                RoutingAdvSave._InternalCallSw = this.internalcallsw == true ? 1 : 0
                RoutingAdvSave._InternalSipCallSw = this.internalsipcallsw == true ? 1 : 0

                console.log(RoutingAdvSave)
                this.request.AGRoutingAdvSave(this.save_succeed_back, this.save_error_back, RoutingAdvSave)
            },
            save_succeed_back(data){
                console.log(data)

                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })
            },
            save_error_back(data){
                console.log(data)
                console.log('save failed')

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            },
        },
        created() {
            this.request.AGRoutingAdvGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>