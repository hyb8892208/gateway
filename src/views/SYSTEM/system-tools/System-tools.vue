<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">{{lang.system_tools}}</h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom:50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left"><h3>{{lang.reboot_tools}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.system_reboot_help"></div>
                                <span>{{lang.system_reboot}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-button type="primary"
                                       size="small"
                                       style="width: 100%;"
                                       @click="System_reboot"
                            >{{lang.system_reboot}}</el-button>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.asterisk_reboot_help"></div>
                                <span>{{lang.asterisk_reboot}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-button type="primary"
                                       size="small"
                                       @click="Asterisk_reboot"
                                       style="width: 100%;">{{lang.asterisk_reboot}}</el-button>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row v-if="false">
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.system_switch_help"></div>
                                <span>{{lang.system_switch}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-button type="primary"
                                       size="small"
                                       @click="System_switch"
                                       style="width: 100%;">{{lang.system_switch}}</el-button>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.update_firmware}}</h3></el-divider>

            <el-row>
                <el-col :lg="12" :sm="24" :xs="24">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.system_update"></div>
                                <span>{{lang.system_update}}</span>
                            </el-tooltip>:
                        </label>
                        <el-row>
                            <el-col :span="18"  style="margin-right: 10px;">
                                <el-upload
                                        ref="system_upload"
                                        action="/service"
                                        name="uploadfile1"
                                        :auto-upload="false"
                                        :data="{action:'upload',page_name:'system-tools',type:'system_update'}"
                                        :on-success="system_upload_succeed"
                                        style="width: 100%;">
                                    <el-button type="button" style="width: 100%;">
                                        <i class="el-icon-folder-opened"></i>
                                        <span> </span>
                                        <span>{{lang.select_file}}</span>
                                    </el-button>
                                </el-upload>
                            </el-col>
                            <el-col :span="4">
                                <el-button size="small"
                                           type="primary"
                                           @click="before_system_file"
                                >{{lang.upload}}</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row v-if="$store.state.systemtype == 'openvox'">
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.system_online_update_help"></div>
                                <span>{{lang.system_online_update}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-button type="primary"
                                       size="small"
                                       style="width: 100%;"
                                       @click="show_online_update_info"
                            >{{lang.system_online_update}}</el-button>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.upload_configuration}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content"></div>
                                <span>{{lang.upload_configuration}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-upload
                                    class="upload-demo"
                                    action="/service"
                                    name="uploadfile1"
                                    :data="{action:'upload',page_name:'system-tools',type:'file_upload'}"
                                    :on-success="upload_file_success"
                                    style="width: 100%;">
                                <el-button type="button" style="width: 100%;">
                                    <i class="el-icon-folder-opened"></i>
                                    <span> </span>
                                    <span>{{lang.select_file}}</span>
                                </el-button>
                            </el-upload>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.backup_configuration}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    {{lang.current_configuration_file_version}}: {{configuration_file_version}}
                                </div>
                                <span>{{lang.backup_configuration}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <form action='/service' method='post' wnctype='multipart/form-data' >
                                <input type='hidden' name='action' value='download' />
                                <input type='hidden' name='downloadfile' value='config' />
                                <input type='hidden' name='page_name' value='system-tools' />
                                <button style="width: 100%"
                                        class="el-button el-button--primary el-button--small">
                                    {{lang.download_backup}}
                                </button>
                            </form>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.voice_record}}</h3></el-divider>

            <el-row>
                <el-col :lg="12" :sm="24" :xs="24">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.voice_record_help"></div>
                                <span>{{lang.voice_record}}</span>
                            </el-tooltip>:
                        </label>
                        <el-row :gutter="10">
                            <el-col :lg="18" :sm="15" :xs="15">
                                <el-button type="primary"
                                           size="small"
                                           style="width: 100%"
                                           @click="start_record"
                                >{{lang.start_recording}}</el-button>
                            </el-col>
                            <el-col :lg="5" :sm="8" :xs="8">
                                <el-select v-model="voice_channel">
                                    <el-option
                                        v-for="item in channels"
                                        :label="item.name"
                                        :key="item.channel"
                                        :value="item.channel"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.restore_configuration}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.factory_reset_help"></div>
                                <span>{{lang.restore_configuration}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-button type="primary"
                                       size="small"
                                       @click="factory_reset"
                                       style="width: 100%;">{{lang.factory_reset}}</el-button>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider content-position="left"><h3>{{lang.restore_system}}</h3></el-divider>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.restore_system_help"></div>
                                <span>{{lang.restore_system}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-button type="primary"
                                       size="small"
                                       @click="show_restore_system_dialog"
                                       style="width: 100%;">{{lang.restore_system}}</el-button>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>

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

        <!-- Asterisk重启弹框 -->
        <el-dialog
                :title="lang.asterisk_reboot"
                :visible.sync="asterisk_dialogVisible"
                :width="this.$store.state.page.dialog_width">
            <span>{{asterisk_result}}</span>
        </el-dialog>

        <!-- 切换系统弹框 -->
        <el-dialog
                :title="lang.system_switch"
                :visible.sync="switch_dialogVisible"
                :before-close="switchClose"
                :width="this.$store.state.page.dialog_width">
            <span>{{switch_result}}</span>
            <span v-if="switch_success_flag">{{lang.count_down}}: {{switch_reboottime}}{{lang.second}} {{lang.automatic_restart_system}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="cancel_switch">{{lang.cancel}}</el-button>
            </span>
        </el-dialog>

        <!-- 系统升级弹框 -->
        <el-dialog
                :title="lang.system_update"
                :visible.sync="update_dialogVisible"
                id="system_update"
                :before-close="rebootClose"
                :width="this.$store.state.page.dialog_width">
            <span>{{update_result}}</span>
        </el-dialog>

        <!-- 系统在线升级弹框 -->
        <el-dialog
                :title="lang.system_online_update"
                :visible.sync="update_online_dialogVisible"
                :before-close="Update_Online_Close"
                id="system_online_update"
                :width="this.$store.state.page.dialog_width">
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

        <!-- 录音弹框 -->
        <el-dialog
                :title="lang.voice_record"
                :visible.sync="voice_record_dialogVisible"
                id="voice_record"
                :before-close="recordClose"
                :width="this.$store.state.page.dialog_width">
            <div style="text-align: center;font-size: 30px;">{{timeout}}</div>
            <div style="color:green;font-size: 20px;margin-top:30px;">{{voice_record_content}}</div>
            <span slot="footer" class="dialog-footer">
                <form action="/service" method="post" ref="stop_voice">
                    <input type="hidden" name="action" value="download" />
                    <input type="hidden" name="channel" :value="voice_channel" />
                    <input type="hidden" name="downloadfile" value="sound" />
                    <input type="hidden" name="page_name" value="system-tools" />
                    <button style="width: 100%"
                            type="button"
                            @click="stop_voice_record"
                            class="el-button el-button--primary el-button--small">
                            {{lang.stop}}
                    </button>
                </form>
            </span>
        </el-dialog>

        <!-- 恢复出厂1 -->
        <el-dialog
                :title="lang.factory_reset"
                :visible.sync="factory_reset_dialogVisible"
                id="factory_reset"
                :before-close="factoryClose"
                :width="this.$store.state.page.dialog_width">
            <span>{{factory_reset_result}}</span>
        </el-dialog>

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
    </el-form>
</template>

<script>
    import {request} from "../../../network/request";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "System-tools",
        data(){
            return {
                reboot_dialogVisible: false,
                reboot_result: '',
                reboot_timeout: 0,

                asterisk_dialogVisible: false,
                asterisk_result: '',

                switch_dialogVisible: false,
                switch_result: '',
                switch_reboottime: 11,
                switch_success_flag: false,

                update_dialogVisible: false,
                update_result: '',

                update_online_dialogVisible: false,
                update_online_result: '',
                is_show_update_online_confirm: false,

                voice_record_dialogVisible: false,
                voice_record_content: '',

                factory_reset_dialogVisible: false,
                factory_reset_result: '',

                restore_system_dialogVisible: false,
                restore_system_result: '',
                cdr_db: false,
                system_log: false,

                voice_channel: '',
                configuration_file_version: '',

                channels: [],
                stacknum: 1,

                timeout: '00:00',

                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _tool = data['_get']['_tool']
                let _channels = _tool['_channels']['_item']

                this.stacknum = _tool['_stacknum'] == '' ? 1 : _tool['_stacknum']

                _channels.forEach(item => {
                    let name
                    if(item._signalling == 1){
                        name = 'FXS-'+item._channel
                    }else{
                        name = 'FXO-'+item._channel
                    }

                    let obj = {
                        channel: item._channel,
                        name: name
                    }

                    this.channels.push(obj)
                })

                this.configuration_file_version = _tool['_cfgversion']
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

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

            /* Asterisk reboot */
            Asterisk_reboot(){
                this.$confirm(this.lang.reload_asterisk_tip)
                    .then(_ => {
                        this.asterisk_dialogVisible = false
                        this.request.AGSystemToolsAsteriskReboot(this.asterisk_succeed_back, this.asterisk_error_back)
                    })
                    .catch(_ => {})
            },
            asterisk_succeed_back(data){
                if(data['_result'] == 0) {
                    this.asterisk_dialogVisible = true
                    this.asterisk_result = this.lang.asterisk_restart_successfully
                }else{
                    this.asterisk_dialogVisible = true
                    this.asterisk_result = this.lang.asterisk_restart_failed
                }
            },
            asterisk_error_back(){
                this.asterisk_dialogVisible = true
                this.asterisk_result = this.lang.asterisk_restart_failed
            },
            /* Asterisk reboot */

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

            /* System update */
            before_system_file(){
                this.$confirm(this.lang.system_update_confirm)
                    .then(_ => {
                        this.update_dialogVisible = true
                        this.update_loading_text = this.lang.system_updating
                        this.loading = this.$loading({//在dialog容器中增加loading
                            lock: false,
                            text: this.update_loading_text,
                            background: '#ffffff',
                            target: '#system_update .el-dialog',
                            body: false,
                        })

                        this.request.AGSystemCloseAllservice(this.close_succees_back, this.close_error_back)
                    })
                    .catch(_ => {})
            },
            close_succees_back(data){
                if(data['_result'] == 0){
                    this.$refs.system_upload.submit()
                }else{
                    this.loading.close()
                    this.update_result = this.lang.clean_memory_failed
                }
            },
            close_error_back(){
                this.loading.close()
                this.update_result = this.lang.clean_memory_failed
            },

            fileware_succeed_back(data){
                if(data['_result'] == 0){
                    this.systemUpdateID = setTimeout(this.checkNetwork, 30000)
                }else{
                    this.loading.close()
                    this.update_result = this.lang.system_update_failed
                }
            },
            fileware_error_back(){
                this.loading.close()
                this.update_result = this.lang.system_update_failed
            },
            system_upload_succeed(){
                this.$message({
                    message: this.lang.upload_successful,
                    type: 'success',
                    offset: '80'
                })

                this.request.AGSystemToolsUpdatefireware(this.fileware_succeed_back, this.fileware_error_back)
            },
            /* System update */

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
                this.update_online_result = lang.system_online_update_version_error
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

            /* Upload File */
            upload_file_success(response, file, fileList){
                this.$message({
                    message: this.lang.upload_successful,
                    type: 'success',
                    offset: '80'
                })

                this.request.AGSystemWsapiReload(this.reload_succeed_back, this.reload_error_back)
                this.request.AGCommitAll(this.commit_succeed_back, this.commit_error_back, 'upload new configuration!')
            },
            reload_succeed_back(data){

            },
            reload_error_back(){

            },
            commit_succeed_back(data){

            },
            commit_error_back(){

            },
            /* Upload File */

            /* Voice Record */
            start_record(){
                if(this.voice_channel == ''){
                    this.$alert(this.lang.please_select_channel)
                        .then(_ => {
                        })
                }else{
                    console.log('start record')
                    this.voice_record_dialogVisible = true
                    this.voice_record_content = this.lang.voice_record_confirm

                    this.request.AGUcpSystemToolsSndRecordStart(this.start_success_back, this.start_error_back, this.voice_channel)
                }
            },
            start_success_back(data){
                console.log('start voice:', data)
                this.timer(0)
            },
            start_error_back(){
                console.log('error')
            },
            timer(sec){
                let s=0,m=0

                m = parseInt(sec/60)
                m = m < 10 ? '0'+m : m
                s = sec%60
                s = s < 10 ? '0'+s : s

                this.timeout =  m+':'+s
                if(sec<600){
                    sec++
                    this.timeoutID = setTimeout(this.timer, 1000, sec)
                }else{
                    this.stop_voice_record()
                    clearTimeout(this.timeoutID)
                }
            },

            stop_voice_record(){
                this.voice_record_dialogVisible = false
                this.request.AGUcpSystemToolsSndRecordStop(this.stop_succeed_back, this.stop_error_back, this.voice_channel)
                clearTimeout(this.timeoutID)
                this.timeout = '00:00'
            },
            stop_succeed_back(data){
                console.log('stop suceess',data)
                this.$refs.stop_voice.submit()
            },
            stop_error_back(){
                this.$message({
                    message: this.lang.voice_file_download_failed,
                    type: 'error',
                    offset: '80'
                })
            },
            recordClose(){
                this.$confirm(this.lang.dialog_close_confirm)
                    .then(_ => {
                        this.stop_voice_record()
                    })
                    .catch(_ => {

                    })
            },
            /* Voice Record */

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
            }
            /* Restore System */
        },
        created() {
            this.request = new request()
            this.request.AGSystemToolGet(this.show_succeed_back, this.show_error_back)
        },
        beforeDestroy() {
            clearTimeout(this.timeoutID)
            clearTimeout(this.systemUpdateID)
        }
    }
</script>

<style scoped>

</style>