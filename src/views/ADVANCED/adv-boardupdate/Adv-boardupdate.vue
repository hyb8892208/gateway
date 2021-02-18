<template>
    <el-form
            :label-position="label_position"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.board_update}}
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>
            <el-row>
                <el-col :lg="12" :sm="24" :xs="24">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.upload_file_help"></div>
                                <span>{{lang.upload_file}}</span>
                            </el-tooltip>:
                        </label>
                        <el-row>
                            <el-col :span="18"  style="margin-right: 10px;">
                                <el-upload
                                        ref="file_upload"
                                        action="/service"
                                        name="uploadfile1"
                                        :auto-upload="false"
                                        :data="{action:'upload',page_name:'system-tools',type:'tftp_update'}"
                                        :on-success="upload_succeed"
                                        :on-change="file_change"
                                        limit="1"
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

            <el-row :gutter="30">
                <el-col v-for="item in boardinfo" :lg="4" :md="6" :sm="12" :xs="12" class="board_card">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span>{{item._boardstacknum}}</span>
                        </div>
                        <div style="padding: 10px">
                            <div class="item_info">
                                {{lang.status}}:
                                <span :style="{color: item._online == 1 ? '#67C23A': '#909399',fontWeight: 'bold'}">{{item._online == 1 ? lang.online : lang.offline}}</span>
                            </div>
                            <div class="item_info">{{lang.version}}: {{item._version}}</div>
                            <div class="item_info">{{lang.build_time}}: {{item._buildtime}}</div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>

    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Adv-boardupdate",
        inject: ['reload'],
        data() {
            return {
                boardinfo: [],

                file: [],
                debug: false,
                label_position: 'right',
                lang: this.$store.state.lang
            }
        },
        methods: {
            show_succeed_back(data) {
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                this.boardinfo = data['_get']['_boardinfos']['_item']

                this.boardinfo.sort(function (obj1,obj2) {
                    if(parseInt(obj1._boardstacknum) > parseInt(obj2._boardstacknum)){
                        return 1
                    }else if(parseInt(obj1._boardstacknum) < parseInt(obj2._boardstacknum)){
                        return -1
                    }else{
                        return 0
                    }
                })

                setTimeout(item => {
                    this.request.AGSystemModuleBoardInfoGet(this.show_succeed_back, this.show_error_back)
                },10000)
            },
            show_error_back() {
                this.$router.push('/common/error')
            },
            Save() {
                this.request.AGSystemModuleUpdateTftp(this.save_succeed_back, this.save_error_back)
            },
            save_succeed_back(data) {
                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: 80
                })

                this.reload()
            },
            save_error_back() {
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: 80
                })
            },
            before_system_file() {
                if (this.file.length == 0) {
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: this.lang.select_file_alert,
                        type: 'error',
                        offset: 80
                    })

                    return false
                }

                this.$confirm(this.lang.upload_file_confirm)
                    .then(_ => {
                        this.$refs.file_upload.submit()
                    })
            },
            file_change(file) {
                this.file = file

                if (file.name.indexOf('.tar.gz') == -1) {
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: this.lang.fire_upload_help,
                        type: 'error',
                        offset: 80
                    })

                    this.$refs.file_upload.clearFiles()
                    this.file = []
                }
            },
            upload_succeed(){
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: this.lang.upload_successful,
                    type: 'success',
                    offset: 80
                })

                this.Save()
            }
        },
        created() {
            this.debug = debuger('adv-boardupdate')['default']
            if (this.debug) {
                this.show_succeed_back(this.debug)
            } else {
                this.request.AGSystemModuleBoardInfoGet(this.show_succeed_back, this.show_error_back)
            }

            let screenWidth = window.screen.width
            window.onresize = () => {
                screenWidth = window.screen.width

                if(screenWidth <= 768){
                    this.label_position = 'top'
                }else{
                    this.label_position = 'right'
                }
            }

            if(screenWidth <= 768){
                this.label_position = 'top'
            }
        }
    }
</script>

<style scoped>
    .item_info{
        line-height: 25px;
    }
    .board_card{
        margin-top:10px;
    }
</style>