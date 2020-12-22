<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.asterisk_cli}}
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.basic_settings}}</span></divider_item>

            <el-row>
                <el-col :lg="22" :sm="24" :xs="24">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.command_help"></div>
                                <span>{{lang.command}}</span>
                            </el-tooltip>:
                        </label>
                        <el-row :gutter="20">
                            <el-col :lg="8" :sm="18" :xs="18">
                                <el-input v-model="command"></el-input>
                            </el-col>
                            <el-col :lg="4" :sm="3" :xs="3">
                                <el-button
                                        @click="Execute"
                                        type="primary"
                                        size="small">{{lang.execute}}</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row style="padding:50px;">
                <span v-for="(item,index) in command_result">
                    <i class="el-icon-close"
                       @click="remove_command_result(index)"
                       style="font-size: 20px;color:red;float: right;margin-right: 20px;cursor: pointer;"></i>
                    <h3>{{lang.command}}: {{item.command}}</h3>
                    <pre style="margin-top: 10px;overflow: auto;">{{item.command_result}}</pre>
                    <el-divider></el-divider>
                </span>
            </el-row>

        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Adv-astcli",
        data() {
            return {
                command: '',
                command_result: [],
                command_count: 0,

                lang: this.$store.state.lang
            }
        },
        methods: {
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_combuf']
                this.$store.commit(MENU, common_data)


            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Execute(){
                if(this.command != ''){
                    if(this.command == 'help' || this.command == '?'){
                        this.command = 'core show help'
                    }
                    let ast_cmd = "asterisk -rx '"+this.command+"'"
                    this.request.AGAdvAstcliRun(this.save_succeed_back, this.save_error_back, ast_cmd)
                }
            },
            save_succeed_back(data){
                let obj = {
                    command: this.command,
                    command_result: data['_result']
                }

                if(this.command_count > 10){
                    this.command_count = 1
                    this.command_result = []
                }else{
                    this.command_count++
                }

                this.command_result.unshift(obj)
            },
            save_error_back(data){
                let obj = {
                    command: this.command,
                    command_result: 'Command error!'
                }

                if(this.command_count > 10){
                    this.command_count = 1
                    this.command_result = []
                }else{
                    this.command_count++
                }

                this.command_result.push(obj)
            },

            remove_command_result(index){
                this.command_result.splice(index, 1)
            }
        },
        created() {
            this.request.AGAdvAstcliGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>