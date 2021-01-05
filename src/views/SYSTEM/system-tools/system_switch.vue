<template>
    <div>
        <el-row v-if="false">
            <form_item>
                <span slot="param_help" v-html="lang.system_switch_help"></span>
                <span slot="param_name" >{{lang.system_switch}}</span>
                <el-button type="primary"
                           slot="param"
                           size="small"
                           @click="System_switch"
                           style="width: 100%;">{{lang.system_switch}}</el-button>
            </form_item>
        </el-row>

        <!-- 切换系统弹框 -->
        <el-dialog
                :title="lang.system_switch"
                :visible.sync="switch_dialogVisible"
                :before-close="switchClose"
                :width="$store.state.page.dialog_width">
            <span>{{switch_result}}</span>
            <span v-if="switch_success_flag">{{lang.count_down}}: {{switch_reboottime}}{{lang.second}} {{lang.automatic_restart_system}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="cancel_switch">{{lang.cancel}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "system_switch",
        data(){
            return {
                switch_dialogVisible: false,
                switch_result: '',
                switch_reboottime: 11,
                switch_success_flag: false,

                lang: this.$store.state.lang
            }
        },
        methods:{
            /* System switch */
            System_switch(){
                this.$confirm(this.lang.switch_system_confirm)
                    .then(_ => {
                        this.switch_dialogVisible = false

                        this.request.AGSystemToolsSystemSwitch(this.switch_succeed_back, this.switch_error_back)
                    })
                    .catch(_ => {})
            },
            switch_succeed_back(data){
                this.switch_dialogVisible = true
                if(data['_result'] == 0){
                    this.switch_result = this.lang.system_switch_successfully
                    this.switch_success_flag = true
                    this.countdown()
                }else{
                    this.switch_result = this.lang.system_switch_failed
                }
            },
            switch_error_back(){
                this.switch_dialogVisible = true
                this.switch_result = this.lang.system_switch_failed
            },
            countdown(){
                this.switch_reboottime--
                console.log(this.switch_reboottime)

                if(this.switch_reboottime <= 0){
                    this.switch_dialogVisible = false
                    this.reboot()//10秒倒计时后重启
                }else{
                    this.swtich_timeoutID = setTimeout(this.countdown, 1000)
                }
            },
            cancel_reboot(){
                this.switch_reboottime = 10
                clearTimeout(this.swtich_timeoutID)
            },
            switchClose(){
                this.$confirm(this.lang.dialog_close_confirm)
                    .then(_ => {
                        this.switch_dialogVisible = false
                    })
                    .catch(_ => {})
            },
            cancel_switch(){
                this.switch_dialogVisible = false
                clearTimeout(this.swtich_timeoutID)
                this.switch_reboottime = 10//重置时间
            },
            /* System switch */
        },
        created() {
            this.request = new request()
        },
        beforeDestroy() {
            clearTimeout(this.swtich_timeoutID)
        }
    }
</script>

<style scoped>

</style>