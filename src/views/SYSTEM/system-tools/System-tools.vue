<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">{{lang.system_tools}}</h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom:50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.reboot_tools}}</span></divider_item>

            <system_reboot></system_reboot>

            <asterisk_reboot></asterisk_reboot>

            <system_switch></system_switch>

            <divider_item><span slot="title">{{lang.update_firmware}}</span></divider_item>

            <system_update></system_update>

            <system_online_update></system_online_update>

            <divider_item><span slot="title">{{lang.upload_configuration}}</span></divider_item>

            <upload_configuration></upload_configuration>

            <divider_item><span slot="title">{{lang.backup_configuration}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help">{{lang.current_configuration_file_version}}: {{configuration_file_version}}</span>
                    <span slot="param_name" >{{lang.backup_configuration}}</span>
                    <form slot="param" action='/service' method='post' wnctype='multipart/form-data' >
                        <input type='hidden' name='action' value='download' />
                        <input type='hidden' name='downloadfile' value='config' />
                        <input type='hidden' name='page_name' value='system-tools' />
                        <button style="width: 100%"
                                class="el-button el-button--primary el-button--small">
                            {{lang.download_backup}}
                        </button>
                    </form>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.voice_record}}</span></divider_item>

            <voice_record :channels="channels"></voice_record>

            <divider_item><span slot="title">{{lang.restore_configuration}}</span></divider_item>

            <factory_reset :stacknum="stacknum"></factory_reset>

            <divider_item><span slot="title">{{lang.restore_system}}</span></divider_item>

            <restore_system :stacknum="stacknum"></restore_system>

        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import System_reboot from "./system_reboot";
    import Asterisk_reboot from "./asterisk_reboot";
    import System_switch from "./system_switch";
    import System_update from "./system_update";
    import System_online_update from "./system_online_update";
    import Upload_configuration from "./upload_configuration";
    import Voice_record from "./voice_record";
    import Factory_reset from "./factory_reset";
    import Restore_system from "./restore_system";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "System-tools",
        components: {
            Restore_system,
            Factory_reset,
            Voice_record,
            Upload_configuration,
            System_online_update,
            System_update,
            System_switch,
            Asterisk_reboot,
            System_reboot
        },
        data(){
            return {
                configuration_file_version: '',
                stacknum: 1,
                channels: [],

                debug: false,
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
        },
        created() {
            this.debug = debuger('system-tools')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGSystemToolGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>