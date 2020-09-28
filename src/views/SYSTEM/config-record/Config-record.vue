<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <div style="height: 50px;background-color: #ffffff;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.config_record}}
            </h1>
        </div>

        <el-row style="margin:auto;margin-top:20px;" :style=$store.state.page.card_width>
            {{lang.config_record_switch}}:
            <el-switch
                    v-model="record_switch"
                    active-color="#409EFF"
                    @change="commit"
                    inactive-color="#909399">
            </el-switch>
        </el-row>

        <el-card shadow="never" style="width: 97%;margin:auto;margin-top:20px;margin-bottom:50px;">
            <el-table
                    :data="recordDate"
                    border
                    style="width: 100%"
                    size="small"
                    ref="chnTable"
                    :key="Math.random()"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        v-for="(col,index) in recordcol"
                        :fixed="recordcol[index].fixed"
                        :prop="col.name"
                        :label="lang[col.title]"
                        :min-width="col.width" ></el-table-column>

                <el-table-column
                        :label="lang.actions"
                        width="80">
                    <template slot-scope="scope">
                        <el-button size="mini">{{lang.back}}</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--
            <el-pagination
                    @size-change="paginationSizeChange"
                    @current-change="paginationCurrentChange"
                    :hide-on-single-page=false
                    :current-page="pagination.current_page"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total"
                    style="padding:20px;margin:auto;">
            </el-pagination>-->
        </el-card>
    </div>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Config-record",
        data(){
            return{
                record_switch: false,
                recordcol: [//record表格
                    {title:'ID',name:'id',width:'50',fixed:true},
                    {title:'record_message',name:'message',width:'200',fixed:false},
                    {title:'date',name:'date',width:'200',fixed:false}
                ],
                recordDate: [],//record数据

                lang: this.$store.state.lang,

                pagination: {
                    total: 0,
                    current_page: 1
                }
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _logs = data['_get']['_logs']['_item']
                _logs.forEach(item => {
                    this.current_page = (this.$route.query.page == undefined) ? 1: this.$route.query.page
                    let id = (this.current_page - 1)*10 + i + 1

                    let obj = {
                        id: id,
                        message: item._message,
                        date: item._data,
                        commit: item._commit
                    }

                    this.recordDate.push(obj)
                })

                this.record_switch = data['_get']['_commitsw']
                this.pagination.total = data['_get']['_nums']
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            commit(){
                let commit = this.record_switch == true ? 1 : 0
                this.request.AGCommitSwitch(this.commit_succeed_back, this.commit_error_back, commit)
            },
            commit_succeed_back(data){
                let message
                if(this.record_switch){
                    message = '配置记录打开成功'
                }else{
                    message = '配置记录关闭成功'
                }
                this.$message({
                    message: message,
                    type: 'success',
                    offset: '80'
                })
            },
            commit_error_back(){
                let message
                if(this.record_switch){
                    message = '配置记录打开失败'
                }else{
                    message = '配置记录关闭失败'
                }
                this.$message({
                    message: message,
                    type: 'error',
                    offset: '80'
                })
            },
            paginationSizeChange(){

            },
            paginationCurrentChange(){

            }
        },
        created(){
            this.current_page = (this.$route.query.page == undefined) ? 1 : this.$route.query.page
            this.request.AGCommitLookup(this.show_succeed_back, this.show_error_back, this.current_page)
        }
    }
</script>

<style scoped>

</style>