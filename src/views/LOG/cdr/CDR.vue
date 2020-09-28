<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <div style="height: 50px;background-color: #ffffff;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.cdr_logs}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Delete">{{lang.delete}}</el-button>
                    <el-button type="primary"
                               size="small"
                               @click="Clean_up">{{lang.clean_up}}</el-button>

                    <form action='/service' id="explode_file" method='post' wnctype='multipart/form-data' style="display: inline-block;">
                        <input type='hidden' name='action' value='download' />
                        <input type='hidden' name='downloadfile' :value='download_filename' />
                        <input type='hidden' name='page_name' value='cdr' />
                        <button style="margin-left: 10px;"
                                type="button"
                                @click="Export"
                                class="el-button el-button--primary el-button--small">
                            {{lang.export}}
                        </button>
                    </form>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;margin-top:20px;margin-bottom: 50px;" :style=$store.state.page.card_width>
            <el-table
                :data="search_cdrData"
                border
                style="width: 100%"
                size="mini"
                :key="Math.random()"
                :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        :label="lang.caller_id"
                        min-width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.search_callerid" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.callee_id"
                        min-width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.search_calleeid" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.from"
                        min-width="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.search_from" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.to"
                        min-width="100">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.search_to" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.start_time"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-row :gutter="10">
                            <el-col :lg="12">
                                <el-input v-model="scope.row.search_starttime_from" size="mini"></el-input>
                            </el-col>
                            <el-col :lg="12">
                                <el-input v-model="scope.row.search_starttime_to" size="mini"></el-input>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.duration"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-row :gutter="10">
                            <el-col :lg="12">
                                <el-input v-model="scope.row.search_duration_from" size="mini"></el-input>
                            </el-col>
                            <el-col :lg="12">
                                <el-input v-model="scope.row.search_duration_to" size="mini"></el-input>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.result"
                        min-width="100">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.search_result" size="mini" style="width: 100%">
                            <el-option
                                    v-for="item in search_result_options"
                                    :label="lang[item.label]"
                                    :key="item.value"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>

            <el-row style="margin: 20px 0 20px 20px;">
                <el-button type="primary"
                           @click="Filter"
                           size="small">{{lang.filter}}</el-button>
                <el-button type="primary"
                           @click="Clean_filter"
                           size="small">{{lang.clean_filter}}</el-button>
            </el-row>

            <el-table
                    :data="cdrData"
                    border
                    style="width: 100%"
                    size="mini"
                    @sort-change="sortChange"
                    @selection-change="select_log"
                    :key="Math.random()"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

                <el-table-column
                        :label="lang.caller_id"
                        prop="callerid"
                        sortable="custom"
                        min-width="120">
                    <template slot-scope="scope">
                        {{scope.row.callerid}}
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.callee_id"
                        prop="calleeid"
                        sortable="custom"
                        min-width="120">
                    <template slot-scope="scope">
                        {{scope.row.calleeid}}
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.from"
                        prop="from"
                        sortable="custom"
                        min-width="100">
                    <template slot-scope="scope">
                        {{scope.row.from}}
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.to"
                        prop="to"
                        sortable="custom"
                        min-width="100">
                    <template slot-scope="scope">
                        {{scope.row.to}}
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.start_time"
                        prop="start_time"
                        sortable="custom"
                        min-width="150">
                    <template slot-scope="scope">
                        {{scope.row.start_time}}
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.duration"
                        prop="duration"
                        sortable="custom"
                        min-width="150">
                    <template slot-scope="scope">
                        {{scope.row.duration}}
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.result"
                        prop="result"
                        sortable="custom"
                        min-width="100">
                    <template slot-scope="scope">
                        {{scope.row.result}}
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                    style="padding:10px 20px;"
                    @size-change="SizeChange($event)"
                    @current-change="CurrentPageChange($event)"
                    :current-page="page"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="each_page_num"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "CDR",
        inject:['reload'],
        data() {
            return {
                count: 0,//所有日志数量
                page: 1,//当前页码
                each_page_num: 10,//每页数量

                selected_log: null,
                sort_sql: 'order by "id" desc',
                filter_sql: '',

                download_filename: '',

                search_cdrData: [{
                    search_callerid: '',
                    search_calleeid: '',
                    search_from: '',
                    search_to: '',
                    search_starttime_from: '',
                    search_starttime_to: '',
                    search_duration_from: '',
                    search_duration_to: '',
                    search_result: '0'
                }],

                search_result_options: [{
                    label: 'All',
                    value: '0'
                },{
                    label: 'ANSWERED',
                    value: 'ANSWERED'
                },{
                    label: 'BUSY',
                    value: 'BUSY'
                },{
                    label: 'FAILED',
                    value: 'FAILED'
                },{
                    label: 'NO_ANSWER',
                    value: 'NO ANSWER'
                }],

                cdrData: [],

                lang: this.$store.state.lang
            }
        },
        methods:{
            select_log(selection){
                this.selected_log = selection
            },
            sortChange(col){
                switch (col.prop) {
                    case 'callerid':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "callerid" asc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "callerid" desc'
                        }
                        break
                    case 'calleeid':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "calleeid" asc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "calleeid" desc'
                        }
                        break
                    case 'from':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "fromdd" asc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "fromdd" desc'
                        }
                        break
                    case 'to':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "todd" asc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "todd" desc'
                        }
                        break
                    case 'starttime':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "starttime" asc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "starttime" desc'
                        }
                        break
                    case 'duration':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "duration" asc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "duration" desc'
                        }
                        break
                    case 'result':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "result" asc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "result" desc'
                        }
                        break

                    //this.filter_sql
                }
            },
            Filter(){
                this.$router.push({
                    name: 'CDR',
                    query: {
                        callerid: this.search_cdrData[0].search_callerid,
                        calleeid: this.search_cdrData[0].search_calleeid,
                        from: this.search_cdrData[0].search_from,
                        to: this.search_cdrData[0].search_to,
                        start_from: this.search_cdrData[0].search_starttime_from,
                        start_to: this.search_cdrData[0].search_starttime_to,
                        duration_from: this.search_cdrData[0].search_duration_from,
                        duration_to: this.search_cdrData[0].search_duration_to,
                        result: this.search_cdrData[0].search_result
                    }
                })

                this.request.AGLogCdrGet(this.show_succeed_back, this.show_error_back, this.get_sql, 'cdr', this.page, this.each_page_num)
            },
            Clean_filter(){
                this.$router.push('CDR')

                this.search_cdrData = [{
                    search_callerid: '',
                    search_calleeid: '',
                    search_from: '',
                    search_to: '',
                    search_starttime_from: '',
                    search_starttime_to: '',
                    search_duration_from: '',
                    search_duration_to: '',
                    search_result: ''
                }]
            },
            Delete(){
                this.$confirm('确定要删除吗')
                    .then(_ => {
                        let log_datachunk = []
                        this.selected_log.forEach(item => {
                            log_datachunk.push('id='+item.id)
                        })
                        let sql = 'where ' + log_datachunk.join(' or ')

                        console.log(sql)
                        this.request.AGLogCdrDel(this.del_succeed_back, this.del_error_back, sql, 'cdr')
                    })
                    .catch(_ => {})
            },
            del_succeed_back(data){
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    offset: '80'
                })
                this.reload()
            },
            del_error_back(){
                this.$message({
                    message: '删除失败',
                    type: 'error',
                    offset: '80'
                })
            },
            Clean_up(){
                this.$confirm('确定要清除所有日志吗')
                    .then(_ => {
                        this.request.AGLogCdrDel(this.clean_succeed_back, this.clean_error_back, '', 'cdr')
                    })
                    .catch(_ => {

                    })
            },
            clean_succeed_back(data){
                this.$message({
                    message: '清空数据成功',
                    type: 'success',
                    offset: '80'
                })

                this.reload()
            },
            clean_error_back(){
                this.$message({
                    message: '清空数据失败',
                    type: 'error',
                    offset: '80'
                })
            },
            Export(){
                let date = new Date()
                let _year = date.getFullYear()
                let _month = date.getMonth() + 1
                let _date = date.getDate()
                let _hour = date.getHours()
                let _minute = date.getMinutes()
                let _second = date.getSeconds()
                this.download_filename = 'cdr-'+_year+'-'+_month+'-'+_date+'-'+_hour+'-'+_minute+'-'+_second+'.csv'

                this.request.AGLogCdrGenFile(this.export_succeed_back, this.export_error_back, '/tmp/'+this.download_filename, 'cdr')
            },
            export_succeed_back(data){
                document.getElementById('explode_file').submit()
            },
            export_error_back(){

            },

            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let cdr_data = data['_get']['_cdrs']['_item']
                let count = data['_get']['_num']

                this.count = count

                this.cdrData = []
                cdr_data.forEach(item => {
                    let obj = {
                        id: item._num,
                        callerid: item._caller,
                        calleeid: item._callee,
                        from: item._from,
                        to: item._to,
                        start_time: item._start,
                        duration: item._time,
                        result: item._result
                    }
                    this.cdrData.push(obj)
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            SizeChange(val){
                this.each_page_num = val
                this.request.AGLogCdrGet(this.show_succeed_back, this.show_error_back, this.get_sql, 'cdr', this.page, this.each_page_num)
            },
            CurrentPageChange(val){
                this.page = val
                this.request.AGLogCdrGet(this.show_succeed_back, this.show_error_back, this.get_sql, 'cdr', this.page, this.each_page_num)
            }
        },
        computed:{
            get_sql(){
                let sql_filter = ''
                sql_filter += this.search_cdrData[0].search_callerid != ''
                        ? "where callerid like '%"+ this.search_cdrData[0].search_callerid + "%' "
                        : ''

                if(this.search_cdrData[0].search_calleeid != ''){
                    sql_filter += sql_filter == ''
                        ? "where calleeid like '%" + this.search_cdrData[0].search_calleeid + "%' "
                        : "and calleeid like '%"+ this.search_cdrData[0].search_calleeid + "%' "
                }

                if(this.search_cdrData[0].search_from != ''){
                    sql_filter += sql_filter == ''
                        ? "where \"fromdd\"='%" + this.search_cdrData[0].search_from + "%' "
                        : "and \"fromdd\"='%"+ this.search_cdrData[0].search_from + "%' "
                }

                if(this.search_cdrData[0].search_to != ''){
                    sql_filter += sql_filter == ''
                        ? "where \"todd\"='%" + this.search_cdrData[0].search_to + "%' "
                        : "and \"todd\"='%"+ this.search_cdrData[0].search_to + "%' "
                }

                if(this.search_cdrData[0].search_starttime_from != ''){
                    sql_filter += sql_filter == ''
                        ? "where starttime >= '" + this.search_cdrData[0].search_starttime_from + "' "
                        : "and starttime >= '"+ this.search_cdrData[0].search_starttime_from + "' "
                }

                if(this.search_cdrData[0].search_starttime_to != ''){
                    sql_filter += sql_filter == ''
                        ? "where starttime <= '" + this.search_cdrData[0].search_starttime_to + "' "
                        : "and starttime <= '"+ this.search_cdrData[0].search_starttime_to + "' "
                }

                if(this.search_cdrData[0].search_duration_from != ''){
                    sql_filter += sql_filter == ''
                        ? "where duration >= '%" + this.search_cdrData[0].search_duration_from + "%' "
                        : "and duration >= '%"+ this.search_cdrData[0].search_duration_from + "%' "
                }

                if(this.search_cdrData[0].search_duration_to != ''){
                    sql_filter += sql_filter == ''
                        ? "where duration <= '%" + this.search_cdrData[0].search_duration_to + "%' "
                        : "and duration <= '%"+ this.search_cdrData[0].search_duration_to + "%' "
                }

                if(this.search_cdrData[0].search_result != ''){
                    sql_filter += sql_filter == ''
                        ? "where result='" + this.search_cdrData[0].search_result + "' "
                        : "and result='"+ this.search_cdrData[0].search_result + "' "
                }

                return sql_filter + ' ' + this.sort_sql
            }
        },
        created() {
            this.request.AGLogCdrGet(this.show_succeed_back, this.show_error_back, this.get_sql, 'cdr', this.page, this.each_page_num)
        }
    }
</script>

<style scoped>

</style>