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
                       @click="Reload()">{{lang.reload_asterisk}}</el-button>
        </el-row>

        <el-card shadow="never" style="margin:auto;margin-top:10px;margin-bottom: 50px;" :style=$store.state.page.card_width>
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
        </el-card>
    </div>
</template>

<script>
    import {request} from "../../../network/request";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Adv-astfileeditor",
        inject:['reload'],
        data() {
            return {
                fileData: [],

                lang: this.$store.state.lang
            }
        },
        methods:{
            Add(){
                this.$router.push('/Advanced/Adv-astfileeditor/add')
            },
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_files']['_combuf']
                this.$store.commit(MENU, common_data)

                let file_info = data['_files']['_files']['_item']

                file_info.forEach(item => {
                    let obj = {
                        filename: item._filename,
                        filesize: item._filesize
                    }

                    this.fileData.push(obj)
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            Edit(filename){
                this.$router.push('/Advanced/Adv-astfileeditor/add/'+filename)
            },
            Delete(filename){
                this.$confirm('确定要删除文件吗？')
                    .then(_ => {
                        let del_filename = '/etc/asterisk/'+filename
                        this.request.AGAdvAstfileeditorEditDel(this.delete_succeed_back, this.delete_error_back, del_filename)
                    })
                    .catch(_ => {})
            },
            delete_succeed_back(data){
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    offset: '80'
                })

                this.reload()
            },
            delete_error_back(){
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            },

            Reload(){
                this.$confirm('确定要重启Asterisk吗？')
                    .then(_ => {
                        this.request.AGAdvAstcliRun(this.reload_succeed_back, this.reload_error_back, 'core reload')
                    })
                    .catch(_ => {

                    })
            },
            reload_succeed_back(data){
                this.$message({
                    message: '重启Asterisk成功',
                    type: 'success',
                    offset: '80'
                })
            },
            reload_error_back(){
                this.$message({
                    message: '重启Asterisk失败',
                    type: 'error',
                    offset: '80'
                })
            },
        },
        created() {
            this.request = new request()
            this.request.AGAdvAstfileeditorEditGetAll(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>