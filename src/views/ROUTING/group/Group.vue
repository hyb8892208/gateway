<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <div style="height: 50px;background-color: #ffffff;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">{{lang.groups}}</h1>
        </div>

        <el-row style="width: 97%;margin:auto;margin-top:20px;">
            <el-button type="primary"
                       size="small"
                       @click="Add()">{{lang.add}}</el-button>
        </el-row>

        <el-card shadow="never" style="margin:auto;margin-top:10px;margin-bottom: 50px;" :style=$store.state.page.card_width>
            <div style="background-color: #ffffff ;padding: 8px 20px;border-bottom: 1px solid #999999;">
                <el-popover
                        placement="bottom"
                        width="100"
                        trigger="click">

                    <el-checkbox class="select_menu_title" :indeterminate="groupIsIndeterminate" v-model="groupCheckAll" @change="groupCheckAllChange">
                        {{lang.all}}
                    </el-checkbox>
                    <div style="margin: 5px 0;"></div>
                    <el-checkbox-group v-model="groupCheckedTitles" @change="groupCheckedTitlesChange" v-for="col in groupcol">
                        <el-checkbox class="select_menu_title"
                                     :label="col.name"
                                     :key="col.name">{{lang[col.name]}}</el-checkbox>
                    </el-checkbox-group>

                    <el-button slot="reference" style="float:right;" type="info" plain size="mini" icon="el-icon-s-grid"></el-button>
                </el-popover>

                <div style="clear:both"></div>
            </div>
            <el-table
                    :data="groupData"
                    border
                    style="width: 100%"
                    size="small"
                    :key="Math.random()"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        v-for="(col,index) in groupcol"
                        :fixed="groupcol[index].fixed"
                        v-if="col.istrue"
                        :prop="col.name"
                        :label="lang[col.name]"
                        :min-width="col.width" ></el-table-column>

                <el-table-column
                        :label="lang.actions"
                        width="160"
                >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="Edit(scope.row.group_name)"
                        >{{lang.edit}}</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="Delete(scope.row.group_name)"
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
        name: "Group",
        inject:['reload'],
        data() {
            return {
                groupcol: [//模块表格
                    {name:'group_name',istrue:true,width:'100',fixed:true},
                    {name:'type',istrue:true,width:'50',fixed:false},
                    {name:'policy',istrue:true,width:'100',fixed:false},
                    {name:'members',istrue:true,width:'100',fixed:false}
                ],
                groupData: [],//模块数据
                groupCheckAll: true,//全选框
                groupCheckedTitles: [],//已选的Title
                groupIsIndeterminate: false,//全选框的中间态

                lang: this.$store.state.lang
            }
        },
        methods: {
            groupCheckAllChange(val) {
                this.groupCheckedTitles = val ? this.groupCheckedTitlesArr : [];
                this.groupIsIndeterminate = false;

                this.groupcol.map(i => val ? i.istrue = true : i.istrue = false)
            },
            groupCheckedTitlesChange(value) {
                let checkedCount = value.length;
                this.groupCheckAll = checkedCount === this.groupcol.length;
                this.groupIsIndeterminate = checkedCount > 0 && checkedCount < this.groupcol.length;

                this.groupcol.map(i => {
                    let flag = 0
                    for(let j=0;j<value.length;j++){
                        if(value[j] == i.name){
                            i.istrue = true
                            flag = 1
                            break
                        }
                    }
                    if(!flag){
                        i.istrue = false
                    }
                })
            },
            Add(){
                this.$router.push('/Routing/Group/add')
            },
            Edit(group_name){
                this.$router.push('/Routing/Group/add/'+group_name)
            },
            Delete(group_name){
                this.$confirm('确定删除'+group_name+'组吗？')
                    .then(_ => {
                        let SectionArr = new AST_SectionArr()
                        let section = new AST_Section()

                        section._section = group_name
                        SectionArr._item.push(section)
                        this.request.AGRoutingGroupsDel(this.del_succeed_back, this.del_error_back, SectionArr)
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

            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _group = data['_get']['_group']['_item']
                for(let i=0;i<_group.length;i++){
                    let type = _group[i]['_type'] == 0 ? 'SIP' : 'FXO'

                    let policy = ''
                    if(_group[i]['_policy'] == 0){
                        policy = 'Ascending'
                    }else if(_group[i]['_policy'] == 1){
                        policy = 'Descending'
                    }else if(_group[i]['_policy'] == 2){
                        policy = 'Roundrobin'
                    }else if(_group[i]['_policy'] == 3){
                        policy = 'Reverse Roundrobin'
                    }else if(_group[i]['_policy'] == 4){
                        policy = 'Ringall'
                    }

                    let obj = {
                        group_name: _group[i]['_section'],
                        type: type,
                        policy: policy,
                        members: _group[i]['_members']
                    }

                    this.groupData.push(obj)
                }
            },
            show_error_back(){
                this.$router.push('/common/error')
            }
        },
        computed: {
            groupCheckedTitlesArr(){
                return this.groupcol.map(n => { return n.name });
            }
        },
        created() {
            this.groupCheckedTitles = this.groupcol.map(n => { return n.name })

            this.request = new request()
            this.request.AGRoutingGroupGetAll(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>