<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <div style="height: 50px;background-color: #ffffff;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">{{lang.security_rules}}</h1>
        </div>

        <el-row style="width: 97%;margin:auto;margin-top:20px;">
            <el-button type="primary"
                       size="small"
                       @click="Add()">{{lang.add}}</el-button>
            <el-button type="primary"
                       size="small"
                       @click="Delete()">{{lang.delete}}</el-button>
        </el-row>

        <el-card shadow="never" style="margin:auto;margin-top:10px;margin-bottom: 50px;" :style=$store.state.page.card_list_width>
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
                    @selection-change="select_rule"
                    :key="Math.random()"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

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
    import {debuger} from "../../../debug/debug";

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

                selected_rule: null,

                debug: false,
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
                this.CheckAll = checkedCount === this.rulecol.length;
                this.IsIndeterminate = checkedCount > 0 && checkedCount < this.rulecol.length;

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
            select_rule(selection){
                this.selected_rule = selection
            },
            Add(){
                this.$router.push('/Network/Security-rules/add')
            },
            Edit(rule_name){
                this.$router.push('/Network/Security-rules/add/'+rule_name)
            },
            Delete(rule_name){
                const SectionArr = new AST_SectionArr()
                if(rule_name == undefined){
                    if(this.selected_rule == null){
                        this.$message({
                            message: this.lang.select_item_help,
                            type: 'error',
                            offset: '80'
                        })

                        return false
                    }

                    this.selected_rule.forEach(item => {
                        let section = new AST_Section()
                        section._section = item.rule_name
                        SectionArr._item.push(section)
                    })
                }else{
                    let section = new AST_Section()
                    section._section = rule_name
                    SectionArr._item.push(section)
                }

                this.$confirm(this.lang.delete_confirm)
                    .then(_ => {
                        this.request.AGNetworkRulesDel(this.del_succeed_back, this.del_error_back, SectionArr)
                    })
                    .catch(_ => {})
            },
            del_succeed_back(data){
                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.successfully_deleted,
                        type: 'success',
                        offset: '80'
                    });
                    this.reload()
                }else{
                    this.$message({
                        message: this.lang.failed_to_delete,
                        type: 'error',
                        offset: '80'
                    })
                }
            },
            del_error_back(){
                this.$message({
                    message: this.lang.failed_to_delete,
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

            this.debug = debuger('network-security-rules')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGNetworkRulesGetAll(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>