<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <div style="height: 50px;background-color: #ffffff;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.config_label}}
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;margin-top:20px;margin-bottom:50px;" :style=$store.state.page.card_width>
            <el-form :label-position="labelPosition"
                     label-width="250px"
                     class="change-label-class"
                     style="padding:20px"
                     size="small">

                <el-divider content-position="left"><h3>{{lang.new_label}}</h3></el-divider>
                <el-row>
                    <el-col :span="12">
                        <el-form-item>
                            <label slot="label">
                                <el-tooltip placement="top" :open-delay=200>
                                    <div slot="content"></div>
                                    <span>{{lang.new_label}}</span>
                                </el-tooltip>:
                            </label>
                            <el-row :gutter="20">
                                <el-col :lg="15">
                                    <el-input id="username" v-model="username"></el-input>
                                </el-col>
                                <el-col :lg="3">
                                    <el-button type="primary">{{lang.save}}</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>


            <el-table
                    :data="labelDate"
                    border
                    style="width: 100%"
                    size="small"
                    ref="chnTable"
                    :key="Math.random()"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        v-for="(col,index) in labelcol"
                        :fixed="labelcol[index].fixed"
                        :prop="col.name"
                        :label="lang[col.title]"
                        :min-width="col.width" ></el-table-column>

                <el-table-column
                        :label="lang.actions"
                        width="160"
                >
                    <template slot-scope="scope">
                        <el-button size="mini">{{lang.back}}</el-button>
                        <el-button size="mini">{{lang.delete}}</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
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
        name: "Config-label",
        data(){
            return {
                labelcol: [
                    {title:'ID',name:'id',width:'50',fixed:true},
                    {title:'label_name',name:'name',width:'200',fixed:false}
                ],
                labelDate: [
                    {id:'1',name:'test'},
                    {id:'2',name:'test'},
                    {id:'3',name:'test'},

                ],

                pagination: {
                    total: 0,
                    current_page: 1
                },

                labelPosition: 'right',

                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _logs = data['_get']['_logs']['_item']
                for(let i=0;i<_logs.length;i++){
                    this.current_page = (this.$route.query.page == undefined) ? 1 : this.$route.query.page
                    let id = (this.current_page - 1)*10 + i +1

                    let obj = {
                        id: id,
                        name: _logs['_section']
                    }

                    this.labelDate.push(obj)
                }

                this.pagination.total = data['_get']['_nums']
            },
            show_error_back(){
                this.$router.push('/common/error')
            }
        },
        created() {
            this.current_page = this.$route.query.page ? 1 : this.$route.query.page
            req.AGTagList(this.show_succeed_back, this.show_error_back, this.current_page)
        }
    }
</script>

<style scoped>

</style>