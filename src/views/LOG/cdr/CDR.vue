<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <div style="height: 50px;background-color: #ffffff;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.cdr_logs}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">

                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;margin-top:20px;margin-bottom: 50px;" :style=$store.state.page.card_list_width>
            <el-table
                :data="search_cdrData"
                border
                style="width: 100%"
                size="mini"
                :key="Math.random()"
                :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        :label="lang.caller_id"
                        min-width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.search_callerid" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.callee_id"
                        min-width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.search_calleeid" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.from"
                        min-width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.search_from" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.to"
                        min-width="80">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.search_to" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.start_time"
                        min-width="210">
                    <template slot-scope="scope">
                        <el-row :gutter="10">
                            <el-col :lg="12">
                                <el-date-picker
                                    v-model="scope.row.search_starttime_from"
                                    type="datetime"
                                    size="mini"
                                    style="width: 175px;"
                                    :placeholder="lang.from">
                                </el-date-picker>
<!--                                <el-input v-model="scope.row.search_starttime_from" size="mini"></el-input>-->
                            </el-col>
                            <el-col :lg="12">
                                 <el-date-picker
                                    v-model="scope.row.search_starttime_to"
                                    type="datetime"
                                    size="mini"
                                    style="width: 175px;"
                                    :placeholder="lang.to">
                               </el-date-picker>
<!--                                <el-input v-model="scope.row.search_starttime_to" size="mini"></el-input>-->
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
                                <el-time-picker
                                        v-model="scope.row.search_duration_from"
                                        size="mini"
                                        style="width: 120px;"
                                        :placeholder="lang.from">
                                </el-time-picker>
<!--                                <el-input v-model="scope.row.search_duration_from" size="mini"></el-input>-->
                            </el-col>
                            <el-col :lg="12">
                                <el-time-picker
                                        v-model="scope.row.search_duration_to"
                                        size="mini"
                                        style="width: 120px;"
                                        :placeholder="lang.to">
                                </el-time-picker>
<!--                                <el-input v-model="scope.row.search_duration_to" size="mini"></el-input>-->
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.result"
                        min-width="80">
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

                <el-table-column
                        :label="lang.actions"
                        min-width="90">
                    <template slot-scope="scope">
                        <el-button type="primary"
                                   @click="Filter"
                                   size="small">{{lang.filter}}</el-button>
                        <el-button type="primary"
                                   @click="Clean_filter"
                                   size="small">{{lang.clean}}</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-row style="margin: 20px 0 20px 20px;">
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
            </el-row>

            <el-table
                    :data="cdrData"
                    border
                    style="width: 100%"
                    size="mini"
                    @sort-change="sortChange"
                    @selection-change="select_log"
                    :default-sort="default_sort"
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
                default_sort:{
                    prop: 'callerid',
                    order: 'ascending'
                },

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
                            this.sort_sql = 'order by "callerid" desc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "callerid" asc'
                        }
                        break
                    case 'calleeid':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "calleeid" desc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "calleeid" asc'
                        }
                        break
                    case 'from':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "fromdd" desc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "fromdd" asc'
                        }
                        break
                    case 'to':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "todd" desc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "todd" asc'
                        }
                        break
                    case 'starttime':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "starttime" desc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "starttime" asc'
                        }
                        break
                    case 'duration':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "duration" desc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "duration" asc'
                        }
                        break
                    case 'result':
                        if(col.order == 'descending'){
                            this.sort_sql = 'order by "result" desc'
                        }else if(col.order == 'ascending'){
                            this.sort_sql = 'order by "result" asc'
                        }
                        break
                }

                let sort = col.prop
                let order = col.order == 'descending' ? 'des' : 'asc'

                let start_from = ''
                if(this.$route.query.start_from != undefined){
                    start_from = this.$route.query.start_from
                }

                let start_to = ''
                if(this.$route.query.start_to != undefined){
                    start_to = this.$route.query.start_to
                }

                let duration_from = ''
                if(this.$route.query.duration_from != undefined){
                    duration_from = this.$route.query.duration_from
                }

                let duration_to = ''
                if(this.$route.query.duration_to != undefined){
                    duration_to = this.$route.query.duration_to
                }

                let result = ''
                if(this.$route.query.result != undefined){
                    result = this.$route.query.result
                }

               this.$router.push({
                   name: 'CDR',
                   query: {
                       callerid: this.search_cdrData[0].search_callerid,
                       calleeid: this.search_cdrData[0].search_calleeid,
                       from: this.search_cdrData[0].search_from,
                       to: this.search_cdrData[0].search_to,
                       start_from: start_from,
                       start_to: start_to,
                       duration_from: duration_from,
                       duration_to: duration_to,
                       result: result,
                       sort: sort,
                       order: order
                   }
               })

               this.request.AGLogCdrGet(this.show_succeed_back, this.show_error_back, this.get_sql(), 'cdr', this.page, this.each_page_num)
            },
            format_data_time(value, type){
                if(value != '') {
                    value = Date.parse(value)
                    let date = new Date(value)

                    let year = date.getFullYear()
                    let month = date.getMonth() + 1
                    let day = date.getDate()
                    let hour = (Array(2).join(0) + date.getHours()).slice(-2)
                    let minute = (Array(2).join(0) + date.getMinutes()).slice(-2)
                    let second = (Array(2).join(0) + date.getSeconds()).slice(-2)

                    if(type == 'date'){
                        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
                    }else{
                        return hour + ':' + minute + ':' + second
                    }
                }else{
                    return ''
                }
            },
            formatSeconds(s) {
                let t
                let hour = ''
                let min = ''
                let sec = ''
                let day = ''
                if(s > -1){
                    hour = Math.floor(s/3600)
                    min = Math.floor(s/60) % 60
                    sec = s % 60
                    day = parseInt(hour/24)
                    if (day > 0) {
                        hour = hour - 24 * day
                        if(hour < 10){hour = '0'+hour}
                        t = day + " - " + hour + ":"
                    }
                    else {
                        if(hour < 10){hour = '0'+hour}
                        t = hour + ":"
                    }
                    if(min < 10){t += "0"}
                    t += min + ":"
                    if(sec < 10){t += "0"}
                    t += sec
                }
                return t
             },
             Filter(){
                let start_from = this.format_data_time(this.search_cdrData[0].search_starttime_from, 'date')
                let start_to = this.format_data_time(this.search_cdrData[0].search_starttime_to, 'date')
                let duration_from = this.format_data_time(this.search_cdrData[0].search_duration_from, 'time')
                let duration_to = this.format_data_time(this.search_cdrData[0].search_duration_to, 'time')

                let sort = ''
                if(this.$route.query.sort != undefined){
                    sort = this.$route.query.sort
                }

                let order = ''
                if(this.$route.query.order != undefined){
                    order = this.$route.query.order
                }

                let result = this.search_cdrData[0].search_result == 0 ? '' : this.search_cdrData[0].search_result
                this.$router.push({
                    name: 'CDR',
                    query: {
                        callerid: this.search_cdrData[0].search_callerid,
                        calleeid: this.search_cdrData[0].search_calleeid,
                        from: this.search_cdrData[0].search_from,
                        to: this.search_cdrData[0].search_to,
                        start_from: start_from,
                        start_to: start_to,
                        duration_from: duration_from,
                        duration_to: duration_to,
                        result: result,
                        sort: sort,
                        order: order
                    }
                })

                this.request.AGLogCdrGet(this.show_succeed_back, this.show_error_back, this.get_sql(), 'cdr', this.page, this.each_page_num)
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
                this.$confirm(this.lang.delete_confirm)
                    .then(_ => {
                        if(this.selected_log != null){
                            const log_datachunk = []
                            this.selected_log.forEach(item => {
                                log_datachunk.push('id='+item.id)
                            })
                            let sql = 'where ' + log_datachunk.join(' or ')

                            this.request.AGLogCdrDel(this.del_succeed_back, this.del_error_back, sql, 'cdr')
                        }else{
                            this.$message({
                                message: this.lang.select_item_help,
                                type: 'error',
                                offset: '80'
                            })
                        }
                    })
                    .catch(_ => {})
            },
            del_succeed_back(data){
                this.$message({
                    message: this.lang.successfully_deleted,
                    type: 'success',
                    offset: '80'
                })
                this.reload()
            },
            del_error_back(){
                this.$message({
                    message: this.lang.failed_to_delete,
                    type: 'error',
                    offset: '80'
                })
            },
            Clean_up(){
                this.$confirm(this.lang.logs_clean_up_confirm)
                    .then(_ => {
                        this.request.AGLogCdrDel(this.clean_succeed_back, this.clean_error_back, '', 'cdr')
                    })
                    .catch(_ => {

                    })
            },
            clean_succeed_back(data){
                this.$message({
                    message: this.lang.clean_up_successful,
                    type: 'success',
                    offset: '80'
                })

                this.reload()
            },
            clean_error_back(){
                this.$message({
                    message: this.lang.clean_up_failed,
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
                    let duration = this.formatSeconds(item._time)
                    let obj = {
                        id: item._num,
                        callerid: item._caller,
                        calleeid: item._callee,
                        from: item._from,
                        to: item._to,
                        start_time: item._start,
                        duration: duration,
                        result: item._result
                    }
                    this.cdrData.push(obj)
                })

                let order = 'ascending'
                if(this.$route.query.order == 'des'){
                    order = 'descending'
                }
                let sort = null
                if(this.$route.query.sort != undefined){
                    sort = this.$route.query.sort
                }
                this.default_sort = {
                    prop: sort,
                    order: order
                }
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            SizeChange(val){
                this.each_page_num = val
                this.request.AGLogCdrGet(this.show_succeed_back, this.show_error_back, this.get_sql(), 'cdr', this.page, this.each_page_num)
            },
            CurrentPageChange(val){
                this.page = val
                this.request.AGLogCdrGet(this.show_succeed_back, this.show_error_back, this.get_sql(), 'cdr', this.page, this.each_page_num)
            },
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
                    let start_time_from = this.format_data_time(this.search_cdrData[0].search_starttime_from, 'date')
                    sql_filter += sql_filter == ''
                        ? "where starttime >= '" + start_time_from + "' "
                        : "and starttime >= '"+ start_time_from + "' "
                }

                if(this.search_cdrData[0].search_starttime_to != ''){
                    let start_time_to = this.format_data_time(this.search_cdrData[0].search_starttime_to, 'date')
                    sql_filter += sql_filter == ''
                        ? "where starttime <= '" + start_time_to + "' "
                        : "and starttime <= '"+ start_time_to + "' "
                }

                if(this.search_cdrData[0].search_duration_from != ''){
                    let duration_from = this.format_data_time(this.search_cdrData[0].search_duration_from, 'time')
                    sql_filter += sql_filter == ''
                        ? "where duration >= '%" + duration_from + "%' "
                        : "and duration >= '%"+ duration_from + "%' "
                }

                if(this.search_cdrData[0].search_duration_to != ''){
                    let duration_to = this.format_data_time(this.search_cdrData[0].search_duration_to, 'time')
                    sql_filter += sql_filter == ''
                        ? "where duration <= '%" + duration_to + "%' "
                        : "and duration <= '%"+ duration_to + "%' "
                }

                if(this.search_cdrData[0].search_result != '0' && this.search_cdrData[0].search_result != ''){
                    sql_filter += sql_filter == ''
                        ? "where result='" + this.search_cdrData[0].search_result + "' "
                        : "and result='"+ this.search_cdrData[0].search_result + "' "
                }

                return sql_filter + ' ' + this.sort_sql
            }
        },
        created() {
            this.request.AGLogCdrGet(this.show_succeed_back, this.show_error_back, this.get_sql(), 'cdr', this.page, this.each_page_num)
        }
    }
</script>

<style scoped>

</style>