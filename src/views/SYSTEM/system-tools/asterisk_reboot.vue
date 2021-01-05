<script src="../../../store/lang.js"></script>
<template>
    <div>
        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.asterisk_reboot_help"></span>
                <span slot="param_name" >{{lang.asterisk_reboot}}</span>
                <el-button type="primary"
                           slot="param"
                           size="small"
                           @click="asterisk_reboot"
                           style="width: 100%;">{{lang.asterisk_reboot}}</el-button>
            </form_item>
        </el-row>

        <!-- Asterisk重启弹框 -->
        <el-dialog
                :title="lang.asterisk_reboot"
                :visible.sync="dialogVisible"
                :width="$store.state.page.dialog_width">
            <span >
                <i class="el-icon-loading" v-show="loading_show"></i>
                <span v-if="result" style="color: #67C23A">
                    {{asterisk_result}}
                </span>
                <span v-else style="color: #F56C6C">
                    {{asterisk_result}}
                </span>

            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "asterisk_reboot",
        data(){
            return {
                dialogVisible: false,
                asterisk_result: '',
                loading_show: false,
                result: false,

                lang: this.$store.state.lang
            }
        },
        methods:{
            /* Asterisk reboot */
            asterisk_reboot(){
                this.$confirm(this.lang.reload_asterisk_tip)
                    .then(_ => {
                        this.dialogVisible = true
                        this.loading_show = true
                        this.asterisk_result = ''
                        this.request.AGSystemToolsAsteriskReboot(this.asterisk_succeed_back, this.asterisk_error_back)
                    })
                    .catch(_ => {})
            },
            asterisk_succeed_back(data){
                this.loading_show = false
                if(data['_result'] == 0) {
                    this.result = true
                    this.asterisk_result = this.lang.asterisk_restart_successfully
                }else{
                    this.result = false
                    this.asterisk_result = this.lang.asterisk_restart_failed
                }
            },
            asterisk_error_back(){
                this.loading_show = false
                this.asterisk_result = this.lang.asterisk_restart_failed
            },
            /* Asterisk reboot */
        },
        created() {
            this.request = new request()
        }
    }
</script>

<style scoped>

</style>