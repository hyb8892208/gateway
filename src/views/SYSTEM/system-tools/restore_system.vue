<template>
    <div>
        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.restore_system_help"></span>
                <span slot="param_name" >{{lang.restore_system}}</span>
                <el-button type="primary"
                           slot="param"
                           size="small"
                           @click="show_restore_system_dialog"
                           style="width: 100%;">{{lang.restore_system}}</el-button>
            </form_item>
        </el-row>

        <!-- 恢复出厂2 -->
        <el-dialog
                :title="lang.restore_system"
                :visible.sync="restore_system_dialogVisible"
                id="restore_system"
                :before-close="restoreClose"
                :width="this.$store.state.page.dialog_width">
            <span>{{restore_system_result}}</span>
            <el-checkbox v-model="cdr_db">CDR</el-checkbox>
            <el-checkbox v-model="system_log">System Log</el-checkbox>
            <div style="margin-top:20px;text-align: center;">
                <el-button type="primary"
                           size="mini"
                           @click="restore_system">{{lang.restore_system}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "restore_system",
        data(){
            return {
                restore_system_dialogVisible: false,
                restore_system_result: '',
                cdr_db: false,
                system_log: false,
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
            /* Restore System */
            show_restore_system_dialog(){
                this.restore_system_dialogVisible = true
            },
            restore_system(){
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

                        let cdr_db = this.cdr_db == true ? 1 : 0
                        let system_log = this.system_log == true ? 1 : 0
                        this.request.AGSystemToolsFactoryReset(this.restore_succeed_back, this.restore_error_back, cdr_db, system_log)
                    })
                    .catch(_ => {})
            },
            restore_succeed_back(data){

            },
            restore_error_back(){

            },
            restoreClose(){
                this.$confirm(this.lang.dialog_close_confirm)
                    .then(_ => {
                        this.restore_system_dialogVisible = false
                    })
                    .catch(_ => {

                    })
            },
            check_factory_network(){
                window.location.href = 'http://172.16.99.'+this.stacknum
            },
            /* Restore System */
        },
        created() {
            this.request = new request()
        }
    }
</script>

<style scoped>

</style>