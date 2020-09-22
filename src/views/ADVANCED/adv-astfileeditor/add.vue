<template>
    <el-form
            label-width="250px"
            class="change-label-class"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.asterisk_file_editor}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <el-divider content-position="left">
                <h3 v-if="$route.params.filename != undefined">{{lang.edit}} {{filename}}</h3>
                <h3 v-else>{{lang.edit}} <el-input size="mini" style="width: auto" v-model="filename"></el-input>.conf</h3>
            </el-divider>

            <el-input
                    type="textarea"
                    rows="30"
                    v-model="content"
                    resize="none"
                    style="font-size: 12px"
            >

            </el-input>

        </el-card>
    </el-form>
</template>

<script>
    import {request} from "../../../network/request";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "add",
        data() {
            return {
                request: null,
                filename: '',
                content: '',

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

            Save(){
                let section
                if(this.$route.params.filename != undefined){
                    section = '/etc/asterisk/'+this.filename
                }else{
                    section = '/etc/asterisk/'+this.filename+'.conf'
                }

                console.log(section)
                this.request.AGAdvAstfileeditorEditSave(this.save_succeed_back, this.save_error_back, section, this.content)
            },
            save_succeed_back(data){
                console.log(data)

                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })

                this.$router.push('/Advanced/Adv-astfileeditor')
            },
            save_error_back(){
                console.log('save failed')

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },
        created() {
            this.request = new request()
            let section = ''
            if(this.$route.params.filename != undefined){
                this.filename = this.$route.params.filename
                section = '/etc/asterisk/'+this.filename
            }

            this.request.AGAdvAstfileeditorEditGetOne(this.show_succeed_back, this.show_error_back, section)
        }
    }
</script>

<style scoped>

</style>