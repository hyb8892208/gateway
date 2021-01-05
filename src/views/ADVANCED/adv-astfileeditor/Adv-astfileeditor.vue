<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <div style="height: 50px;background-color: #ffffff;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">{{lang.asterisk_file_editor}}</h1>
        </div>

        <el-row style="width: 97%;margin:auto;margin-top:20px;">
            <el-button type="primary"
                       size="small"
                       @click="Add()">{{lang.add}}</el-button>
            <el-button type="primary"
                       size="small"
                       style="margin-right: 10px;"
                       @click="Reload()">{{lang.reload_asterisk}}</el-button>
            <el-autocomplete
                    class="inline-input"
                    v-model="file_name"
                    :fetch-suggestions="querySearch"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                    size="small"
                    suffix-icon="el-icon-search"
            ></el-autocomplete>
        </el-row>

        <el-card shadow="never" style="margin:auto;margin-top:10px;margin-bottom: 50px;" :style=$store.state.page.card_list_width>
            <el-table
                    :data="fileData"
                    border
                    style="width: 100%"
                    size="small"
                    ref="chnTable"
                    :key="Math.random()"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        :label="lang.file_name">
                    <template slot-scope="scope">{{scope.row.filename}}</template>
                </el-table-column>

                <el-table-column
                        :label="lang.file_size">
                    <template slot-scope="scope">{{scope.row.filesize}}</template>
                </el-table-column>

                <el-table-column
                        :label="lang.actions"
                        width="160"
                >
                    <template slot-scope="scope">
                        <el-button
                                @click="Edit(scope.row.filename)"
                                size="mini"
                        >{{lang.edit}}</el-button>
                        <el-button
                                type="danger"
                                @click="Delete(scope.row.filename)"
                                size="mini"
                        >{{lang.delete}}</el-button>
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
        name: "Adv-astfileeditor",
        inject:['reload'],
        data() {
            return {
                count: 0,//所有日志数量
                page: 1,//当前页码
                each_page_num: 10,//每页数量

                all_fileData: [],
                fileData: [],

                //search
                file_name: '',
                search_file : [],

                lang: this.$store.state.lang
            }
        },
        methods:{
            Add(){
                this.$router.push('/Advanced/Adv-astfileeditor/add')
            },
            show_pagination(){
                this.fileData = []
                this.all_fileData.forEach((item,index) => {
                    if(index >= (this.each_page_num * (this.page -1)) &&
                        index < (this.each_page_num * (this.page))){

                        let obj = {
                            filename: item._filename,
                            filesize: item._filesize
                        }

                        this.fileData.push(obj)
                    }
                })
            },
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_files']['_combuf']
                this.$store.commit(MENU, common_data)

                this.all_fileData = data['_files']['_files']['_item']
                this.count = this.all_fileData.length

                if(this.$route.params.page != undefined){
                    this.page = this.$route.params.page
                }

                this.show_pagination()
                this.search_file = this.loadAll()//search
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            Edit(filename){
                this.$router.push('/Advanced/Adv-astfileeditor/add/'+filename)
            },
            Delete(filename){
                this.$confirm(this.lang.delete_confirm)
                    .then(_ => {
                        let del_filename = '/etc/asterisk/'+filename
                        this.request.AGAdvAstfileeditorEditDel(this.delete_succeed_back, this.delete_error_back, del_filename)
                    })
                    .catch(_ => {})
            },
            delete_succeed_back(data){
                this.$message({
                    message: this.lang.successfully_deleted,
                    type: 'success',
                    offset: '80'
                })

                this.reload()
            },
            delete_error_back(){
                this.$message({
                    message: this.lang.failed_to_delete,
                    type: 'error',
                    offset: '80'
                })
            },

            Reload(){
                this.$confirm(this.lang.reload_asterisk_tip)
                    .then(_ => {
                        this.request.AGAdvAstcliRun(this.reload_succeed_back, this.reload_error_back, 'core reload')
                    })
                    .catch(_ => {

                    })
            },
            reload_succeed_back(data){
                this.$message({
                    message: this.lang.restart_asterisk_successfully,
                    type: 'success',
                    offset: '80'
                })
            },
            reload_error_back(){
                this.$message({
                    message: this.lang.restart_asterisk_failed,
                    type: 'error',
                    offset: '80'
                })
            },
            SizeChange(val){
                this.each_page_num = val
                this.show_pagination()
            },
            CurrentPageChange(val){
                this.page = val
                this.show_pagination()
            },
            querySearch(queryString, callback) {
                let results = queryString ? this.search_file.filter(this.createFilter(queryString)) : this.search_file

                callback(results)
            },
            createFilter(queryString) {
                return (file) => {
                    return (file.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1)
                }
            },
            loadAll() {
                let arr = []
                this.all_fileData.forEach(item => {
                    item['value'] = item._filename
                    arr.push(item)
                })

                return arr
            },
            handleSelect(item) {
                this.fileData = []

                item['filename'] = item._filename
                item['filesize'] = item._filesize
                this.fileData.push(item)
            }
        },
        created() {
            this.request.AGAdvAstfileeditorEditGetAll(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>