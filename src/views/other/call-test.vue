<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.general}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="Save()"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>
            <divider_item><span slot="title">{{lang.general}}</span></divider_item>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content" v-html="lang.enable_help"></div>
                                <span>{{lang.enable}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-input v-model="enable" ></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content"></div>
                                <span>{{lang.voice_file}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-upload
                                    class="upload-demo"
                                    action="/service"
                                    name="uploadfile1"
                                    :data="{action:'upload',page_name:'alg-calltest',type:'call_test'}"
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

            <divider_item><span slot="title">{{lang.test}}</span></divider_item>

            <el-table
                    :data="portData"
                    border
                    style="width: 100%"
                    size="mini"
                    :key="Math.random()"
                    @selection-change="selection_change"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

                <el-table-column
                        :label="lang.port"
                        width="55">
                    <template slot-scope="scope">
                        {{ scope.row.port }}
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.name"
                        min-width="150">
                    <template slot-scope="scope">
                        {{ scope.row.name }}
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.type"
                        min-width="150">
                    <template slot-scope="scope">
                        {{ scope.row.type }}
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.result"
                        min-width="150">
                    <template slot-scope="scope">
                        {{ scope.row.result }}
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.host"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="Test()"
                        >{{lang.test}}</el-button>
                    </template>
                </el-table-column>

            </el-table>

        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../store/mutations-types";

    export default {
        name: "call-test",
        data(){
            return {
                portData: [{
                    port: '',
                    name: '',
                    type: '',
                    result: ''
                }],
                selected_port: [],
                enable: false,

                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            upload_file_success(){
                this.$message({
                    message: this.lang.upload_successful,
                    type: 'success',
                    offset: 80
                })
            },
            selection_change(val){
                this.selected_port = val
            },
            Test(){
                const AutoCallTest = new AST_AutoCallTest()
                const AutoCallChnArr = new AST_AutoCallChnArr()

                this.selected_port.forEach(item => {
                    if(item.name == ''){
                        item.name = 'port-'+item.port
                    }

                    let type = 0
                    if(item.type == 'FXS'){
                        type = 1
                    }

                    let AutoCallChn = new AST_AutoCallChn()
                    AutoCallChn._channel = item.port
                    AutoCallChn._name = item.name
                    AutoCallChn._signalling = type
                    AutoCallChnArr._item.push(AutoCallChn)
                })

                AutoCallTest._ana = AutoCallChnArr
                this.request.AGAlgAutoCallTest(this.test_success_back, this.test_error_back, AutoCallTest)
            },
            test_success_back(data){
                this.$message({
                    message: '测试成功',
                    type: 'success',
                    offset: 80
                })

                //show result.......
            },
            test_error_back(){
                this.$message({
                    message: '测试失败',
                    type: 'error',
                    offset: 80
                })
            },
            Save(){
                const AutoCallSave = new AST_AutoCallSave()

                AutoCallSave._sw = this.enable == true ? 1 : 0
                AutoCallSave._timeout = 200

                this.request.AGAlgAutoCallSave(this.save_success_back, this.save_error_back, AutoCallSave)
            },
            save_success_back(data){
                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: 80
                })
            },
            save_error_back(){
                this.$message({
                    message: this.lang.save_failed,
                    type: 'success',
                    offset: 80
                })
            }
        },
        created() {
            this.request.AGUcpAlgGlbSettingGetAll(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>