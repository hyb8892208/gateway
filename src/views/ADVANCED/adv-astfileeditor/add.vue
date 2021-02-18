<template>
    <el-form
            label-position="right"
            label-width="250px"
            class="change-label-class"
            :rules="rules"
            :model="ruleForm"
            ref="ruleForm"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                <span v-if="$route.params.filename != undefined">{{ruleForm.filename}}</span>
                <span v-else>{{lang.asterisk_file_editor}}</span>
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="submitValidator('ruleForm')"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-row v-if="$route.params.filename == undefined">
                <el-col :lg="12" >
                    <el-form-item prop="filename">
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span name="param_help" v-html="lang.edit"></span>
                                </div>
                                <span name="param_name">{{lang.edit}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="ruleForm.filename" style="width: 80%;"></el-input>.conf
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-input
                    type="textarea"
                    rows="30"
                    v-model="content"
                    ref="content_ref"
                    resize="none"
                    style="font-size: 12px"
            >
          </el-input>

        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "add",
        data() {
            var validateFilename = (rule, value, callback) => {
                if(value == ''){
                    callback(new Error('Filename can not be null'))
                }else{
                    callback()
                }
            }
            return {
                ruleForm: {
                    filename: ''
                },
                rules: {
                    filename: [ { validator: validateFilename, trigger: 'blur' } ]
                },
                filename: '',
                content: '',

                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods: {
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let content = data['_get']['_result']
                this.content = content
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            submitValidator(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.Save()
                    } else {
                        return false;
                    }
                });
            },

            Save(){
                let section
                if(this.$route.params.filename != undefined){
                    section = '/etc/asterisk/'+this.ruleForm.filename
                }else{
                    section = '/etc/asterisk/'+this.ruleForm.filename+'.conf'
                }

                if(this.content == '' || this.content == null){
                    this.$message({
                        message: this.lang.check_content_empty,
                        type: 'error',
                        offset: 80
                    })

                    this.$refs.content_ref.focus()
                    return false
                }

                this.request.AGAdvAstfileeditorEditSave(this.save_succeed_back, this.save_error_back, section, this.content)
            },
            save_succeed_back(data){
                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: 80
                    })

                    this.$router.push('/Advanced/Adv-astfileeditor')
                }else{
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: 80
                    })
                }
            },
            save_error_back(){
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: 80
                })
            }
        },
        created() {
            let section = ''
            if(this.$route.params.filename != undefined){
                this.ruleForm.filename = this.$route.params.filename
                section = '/etc/asterisk/'+this.ruleForm.filename
            }

            this.debug = debuger('adv-astfileeditor-edit')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGAdvAstfileeditorEditGetOne(this.show_succeed_back, this.show_error_back, section)
            }
        }
    }
</script>

<style scoped>

</style>