<template>
    <div>
        <el-row v-if="$store.state.systemtype == 'openvox'">
            <form_item>
                <span slot="param_help" v-html="lang.system_online_update_help"></span>
                <span slot="param_name" >{{lang.system_online_update}}</span>
                <el-button type="primary"
                           slot="param"
                           size="small"
                           style="width: 100%;"
                           @click="show_online_update_info"
                >{{lang.system_online_update}}</el-button>
            </form_item>
        </el-row>

        <!-- 系统在线升级弹框 -->
        <el-dialog
                :title="lang.system_online_update"
                :visible.sync="update_online_dialogVisible"
                :before-close="Update_Online_Close"
                id="system_online_update"
                :width="$store.state.page.dialog_width">
            <el-input type="textarea"
                      resize="none"
                      readonly
                      :rows="20"
                      v-model="update_online_result"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="get_firmware_log">{{lang.change_log}}</el-button>
                <el-button type="primary" size="mini" @click="get_firmware_detial">{{lang.detailed}}</el-button>
                <el-button type="primary" size="mini" @click="update_online_now">{{lang.update_online_now}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "system_online_update",
        data(){
            return {
                update_online_dialogVisible: false,
                update_online_result: '',
                is_show_update_online_confirm: false,

                lang: this.$store.state.lang
            }
        },
        methods:{
            /* System online update */
            show_online_update_info(){
                this.update_online_dialogVisible = true

                this.system_online_loading = this.$loading({//在dialog容器中增加loading
                    lock: false,
                    text: 'Gettings information...',
                    background: '#ffffff',
                    target: '#system_online_update .el-dialog',
                    body: false,
                })

                this.request.AGSystemToolsGetFirmwareInfo(this.ver_succeed_back, this.ver_error_back, 'current-version.txt')
            },
            ver_succeed_back(data){
                console.log(data)
                this.system_online_loading.close()

                let temp = data['_result'].split('/')

                let current_version = temp[0]
                let versionnum = temp[1]

                if(versionnum == ''){
                    this.update_online_result = this.lang.system_online_update_version_error
                }else{
                    this.update_online_result = `${this.lang.system_version_help_1}
${current_version}
${this.lang.system_version_help_2}
${versionnum}
${this.lang.system_online_update_confirm}`

                }
            },
            ver_error_back(){
                this.update_online_result = this.lang.system_online_update_version_error
            },

            get_firmware_log(){
                this.system_online_loading = this.$loading({//在dialog容器中增加loading
                    lock: false,
                    text: 'Gettings information...',
                    background: '#ffffff',
                    target: '#system_online_update .el-dialog',
                    body: false,
                })

                this.request.AGSystemToolsGetFirmwareInfo(this.cur_succeed_back, this.cur_error_back, 'current-changelog.txt')
            },
            get_firmware_detial(){
                this.system_online_loading = this.$loading({//在dialog容器中增加loading
                    lock: false,
                    text: 'Gettings information...',
                    background: '#ffffff',
                    target: '#system_online_update .el-dialog',
                    body: false,
                })

                this.request.AGSystemToolsGetFirmwareInfo(this.cur_succeed_back, this.cur_error_back, 'ChangeLog.txt')
            },
            cur_succeed_back(data){
                console.log(data)
                this.system_online_loading.close()

                if(data['_result'] != ''){
                    this.update_online_result = data['_result']
                }else{
                    this.update_online_result = 'Can\'t get change log.'
                }
            },
            cur_error_back(){
                this.update_online_result = 'Can\'t get change log.'
            },
            update_online_now(){
                this.$confirm(this.lang.system_update_confirm)
                    .then(_ => {
                        this.update_online_loding_text = this.lang.system_update+'...'
                        this.system_online_loading = this.$loading({//在dialog容器中增加loading
                            lock: false,
                            text: this.update_online_loding_text,
                            background: '#ffffff',
                            target: '#system_online_update .el-dialog',
                            body: false,
                        })

                        this.is_show_update_online_confirm = true
                        this.request.AGSystemToolsUpdateOnline(this.online_succeed_back, this.online_error_back)
                    })
                    .catch(_ => {})
            },
            online_succeed_back(data){
                if(data['_result']){
                    this.update_online_loding_text = this.lang.system_reboot_wait

                    this.checkNetwork()
                }else{
                    this.system_online_loading.close()
                    this.undate_online_result = this.lang.system_update_failed
                }
            },
            online_error_back(){
                this.system_online_loading.close()
                this.undate_online_result = this.lang.system_update_failed
            },
            Update_Online_Close(){
                console.log(this.is_show_update_online_confirm)
                if(this.is_show_update_online_confirm) {
                    this.$confirm(this.lang.dialog_close_confirm)
                        .then(_ => {
                            this.update_online_dialogVisible = false
                        })
                        .catch(_ => {
                        })
                }else{
                    this.update_online_dialogVisible = false
                }
            },
            /* System online update */
        },
        created() {
            this.request = new request()
        }
    }
</script>

<style scoped>

</style>