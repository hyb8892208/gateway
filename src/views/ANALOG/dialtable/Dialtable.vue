<template>
    <el-form>
        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.dial_matching_table}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="Save()"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" v-loading="loading" style="margin:auto;padding: 20px;" :style=$store.state.page.card_width>
            <el-row>
                <el-col :lg="24">
                    <el-form-item>
                        <el-col :lg="12">
                            <el-input
                                    type="textarea"
                                    v-model="current_rule"
                                    rows="25"
                                    style="font-size: 14px;"
                                    resize="none"
                            ></el-input>
                        </el-col>

                        <el-col :lg="12">
                            <el-input
                                    type="textarea"
                                    v-model="dial_matching_rule"
                                    rows="25"
                                    readonly
                                    id="dial_textarea"
                                    style="font-size: 14px;"
                                    resize="none"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Dialtable",
        data(){
            return {
                current_rule: '',

                loading: false,
                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _lines = data['_get']['_lines']['_item']
                for(let i=0;i<_lines.length;i++){
                    this.current_rule += _lines[i]['_value'] + "\n"
                }
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                this.loading = true

                let dial_info = this.current_rule
                let dial_temp = dial_info.split("\n")
                let LineArr = new AST_LineArr()
                for(let i=0;i<dial_temp.length;i++){
                    if(dial_temp[i] != ''){
                        let line = new AST_Line()
                        line._key = i
                        line._value = dial_temp[i]
                        LineArr._item.push(line)
                    }
                }
                let AlgDialtableSave = new AST_AlgDialtableSave()
                AlgDialtableSave._lines = LineArr
                this.request.AGAlgDialtableSave(this.save_succeed_back, this.save_error_back, AlgDialtableSave)
            },
            save_succeed_back(data){
                this.loading = false

                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: 80
                    })
                }else{
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: 80
                    })
                }
            },
            save_error_back(){
                this.loading = false

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: 80
                })
            }
        },
        computed: {
            dial_matching_rule(){
                return this.lang.dial_matching_rule_help
            }
        },
        created() {
            this.debug = debuger('analog-dialtable')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGAlgDialtableGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>