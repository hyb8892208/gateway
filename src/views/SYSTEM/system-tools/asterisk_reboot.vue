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
                           @click="Asterisk_reboot"
                           style="width: 100%;">{{lang.asterisk_reboot}}</el-button>
            </form_item>
        </el-row>

        <!-- Asterisk重启弹框 -->
        <el-dialog
                :title="lang.asterisk_reboot"
                :visible.sync="asterisk_dialogVisible"
                :width="this.$store.state.page.dialog_width">
            <span>{{asterisk_result}}</span>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "asterisk_reboot",
        data(){
            return {
                asterisk_dialogVisible: false,
                asterisk_result: '',

                lang: this.$store.state.lang
            }
        },
        methods:{
            /* Asterisk reboot */
            Asterisk_reboot(){
                this.$confirm(this.lang.reload_asterisk_tip)
                    .then(_ => {
                        this.asterisk_dialogVisible = true
                        this.asterisk_result = this.
                        this.request.AGSystemToolsAsteriskReboot(this.asterisk_succeed_back, this.asterisk_error_back)
                    })
                    .catch(_ => {})
            },
            asterisk_succeed_back(data){
                if(data['_result'] == 0) {
                    this.asterisk_result = this.lang.asterisk_restart_successfully
                }else{
                    this.asterisk_result = this.lang.asterisk_restart_failed
                }
            },
            asterisk_error_back(){
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