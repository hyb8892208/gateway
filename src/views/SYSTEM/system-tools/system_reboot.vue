<template>
    <div>
        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.system_reboot_help"></span>
                <span slot="param_name" >{{lang.system_reboot}}</span>
                <el-button type="primary"
                           slot="param"
                           size="small"
                           style="width: 100%;"
                           @click="System_reboot"
                >{{lang.system_reboot}}</el-button>
            </form_item>
        </el-row>

        <!-- 系统重启弹框 -->
        <el-dialog
                :title="lang.system_reboot"
                :visible.sync="reboot_dialogVisible"
                :close-on-click-modal=true
                :close-on-press-escape=false
                :before-close="rebootClose"
                id="system_reboot"
                :width="this.$store.state.page.dialog_width">
            <span>{{reboot_result}}</span>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "system_reboot",
        data(){
            return {
                reboot_dialogVisible: false,
                reboot_result: '',
                reboot_timeout: 0,

                lang: this.$store.state.lang
            }
        },
        methods:{
            /* System reboot */
            reboot(){
                this.reboot_dialogVisible = true
                this.loading = this.$loading({//在dialog容器中增加loading
                    lock: false,
                    text: this.lang.system_reboot_wait,
                    background: '#ffffff',
                    target: '#system_reboot .el-dialog',
                    body: false,
                })

                this.request.AGSystemToolsSystemReboot(this.reboot_succeed_back, this.reboot_error_back)
            },
            System_reboot(){
                this.$confirm(this.lang.system_reboot_confrim)
                    .then(_ => {
                        this.reboot()
                    })
                    .catch(_ => {})
            },
            reboot_succeed_back(data){
                setTimeout(this.checkNetwork, 10000)
            },
            reboot_error_back(){
                setTimeout(this.checkNetwork, 10000)
            },
            checkNetwork(){
                this.$axios.get('/service?action=reboot')
                    .then((res) => {
                        if(res.data == 1){
                            this.$router.push('/System/Status')
                        }
                    })
                    .catch((error) => {
                        if(this.reboot_timeout >= 300){
                            this.reboot_dialogVisible = false
                            this.reboot_result = this.lang.system_restart_timeout
                        }

                        this.reboot_timeout++
                        setTimeout(this.checkNetwork, 1000)
                    })
            },
            rebootClose(done){
                this.$confirm(this.lang.dialog_close_confirm)
                    .then(_ => {
                        this.reboot_dialogVisible = false
                        this.update_dialogVisible = false
                    })
                    .catch(_ => {})
            },
            /* System reboot */
        },
        created(){
            this.request = new request()
        }
    }
</script>

<style scoped>

</style>