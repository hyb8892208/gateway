<template>
    <div>
        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.factory_reset_help"></span>
                <span slot="param_name" >{{lang.restore_configuration}}</span>
                <el-button type="primary"
                           slot="param"
                           size="small"
                           @click="factory_reset"
                           style="width: 100%;">{{lang.factory_reset}}</el-button>
            </form_item>
        </el-row>

        <!-- 恢复出厂1 -->
        <el-dialog
                :title="lang.factory_reset"
                :visible.sync="factory_reset_dialogVisible"
                id="factory_reset"
                :before-close="factoryClose"
                :width="this.$store.state.page.dialog_width">
            <span>{{factory_reset_result}}</span>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "factory_reset",
        data(){
            return {
                factory_reset_dialogVisible: false,
                factory_reset_result: '',
                stacknum: 1,

                lang: this.$store.state.lang
            }
        },
        props:{
            stacknum:{
                default: 0
            }
        },
        methods:{
            /* Factory reset */
            factory_reset(){
                this.$confirm(this.lang.factory_reset_confirm)
                    .then(_ => {
                        this.factory_reset_dialogVisible = true

                        this.loading = this.$loading({//在dialog容器中增加loading
                            lock: false,
                            text: this.lang.factory_reset_wait,
                            background: '#ffffff',
                            target: '#factory_reset .el-dialog',
                            body: false,
                        })

                        setTimeout(this.check_factory_network, 60000)
                        this.request.AGSystemToolsFactoryReset(this.factory_succeed_back, this.factory_error_back,0,0)
                    })
                    .catch(_ => {})
            },
            factory_succeed_back(data){

            },
            factory_error_back(){

            },
            check_factory_network(){
                window.location.href = 'http://172.16.99.'+this.stacknum
            },
            factoryClose(){
                this.$confirm(this.lang.dialog_close_confirm)
                    .then(_ => {
                        this.factory_reset_dialogVisible = false
                    })
                    .catch(_ => {

                    })
            },
            /* Factory reset */
        },
        created() {
            this.request = new request()
        }
    }
</script>

<style scoped>

</style>