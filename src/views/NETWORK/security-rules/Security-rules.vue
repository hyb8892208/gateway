<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <div style="height: 50px;background-color: #ffffff;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">{{lang.call_routing_rules}}</h1>
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

                    <el-checkbox class="select_menu_title" :indeterminate="IsIndeterminate" v-model="CheckAll" @change="CheckAllChange">
                        {{lang.all}}</el-checkbox>
                    <div style="margin: 5px 0;"></div>
                    <el-checkbox-group v-model="CheckedTitles" @change="CheckedTitlesChange" v-for="col in rulecol">
                        <el-checkbox class="select_menu_title" :label="col.name" :key="col.name">{{lang[col.name]}}</el-checkbox>
                    </el-checkbox-group>

                    <el-button slot="reference" style="float:right;" type="info" plain size="mini" icon="el-icon-s-grid"></el-button>
                </el-popover>

                <div style="clear:both"></div>
            </div>
            <el-table
                    :data="Data"
                    border
                    style="width: 100%"
                    size="small"
                    ref="chnTable"
                    :key="Math.random()"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        v-for="(col,index) in rulecol"
                        :fixed="rulecol[index].fixed"
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
                                @click="Edit(scope.row.rule_name)"
                        >{{lang.edit}}</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="Delete(scope.row.rule_name)"
                        >{{lang.delete}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Security-rules",
        inject:['reload'],
        data() {
            return {
                rulecol: [//模块表格
                    {name:'rule_name',istrue:true,width:'100',fixed:true},
                    {name:'type',istrue:true,width:'50',fixed:false},
                    {name:'protocol',istrue:true,width:'150',fixed:false},
                    {name:'ip',istrue:true,width:'100',fixed:false},
                    {name:'port',istrue:true,width:'50',fixed:false}
                ],
                Data: [],//模块数据
                CheckAll: true,//全选框
                CheckedTitles: [],//已选的Title
                IsIndeterminate: false,//全选框的中间态

                lang: this.$store.state.lang
            }
        },
        methods: {
            CheckAllChange(val) {
                this.CheckedTitles = val ? this.CheckedTitlesArr : [];
                this.IsIndeterminate = false;

                this.rulecol.map(i => val ? i.istrue = true : i.istrue = false)
            },
            CheckedTitlesChange(value) {
                let checkedCount = value.length;
                this.CheckAll = checkedCount === this.col.length;
                this.IsIndeterminate = checkedCount > 0 && checkedCount < this.col.length;

                this.rulecol.map(i => {
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
                this.$router.push('/Network/Security-rules/add')
            },
            Edit(rule_name){
                this.$router.push('/Network/Security-rules/add/'+rule_name)
            },
            Delete(rule_name){
                this.$confirm('确定要删除吗')
                    .then(_ => {
                        const SectionArr = new AST_SectionArr()
                        let section = new AST_Section()
                        section._section = rule_name
                        SectionArr._item.push(section)
                        this.request.AGNetworkRulesDel(this.del_succeed_back, this.del_error_back, SectionArr)
                    })
                    .catch(_ => {})
            },
            del_succeed_back(data){
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    offset: '80'
                });
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

                let _rules = data['_get']['_rules']['_item']
                _rules.forEach(item => {
                    let port = ''
                    if(item._port1 != 0 && item._port2 != 0){
                        port = item._port1 + ':' + item._port2
                    }else if(item._port1 != 0){
                        port = item._port1
                    }else if(item._port2 != 0){
                        port = item._port2
                    }

                    let ip = ''
                    if(item._ip != 0 && item._mask != 0){
                        ip = item._ip + '/' + item._mask
                    }else if(item._ip != 0){
                        ip = item._ip
                    }else if(item._mask != 0){
                        ip = item._mask
                    }

                    let type = ''
                    if(item._proto == 2){
                        type = 'ICMP'
                    }else if(item._proto == 1){
                        type = 'UDP'
                    }else if(item._proto == 0){
                        type = 'TCP'
                    }

                    let protocol = ''
                    if(item._action == 1){
                        protocol = 'DROP'
                    }else{
                        protocol = 'ACCEPT'
                    }

                    let obj = {
                        rule_name: item._name,
                        type: type,
                        protocol: protocol,
                        ip: ip,
                        port: port
                    }
                    this.Data.push(obj)
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            }
        },
        computed: {
            CheckedTitlesArr(){
                return this.rulecol.map(n => { return n.name });
            }
        },
        created() {
            this.CheckedTitles = this.rulecol.map(n => { return n.name })

            this.request.AGNetworkRulesGetAll(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>