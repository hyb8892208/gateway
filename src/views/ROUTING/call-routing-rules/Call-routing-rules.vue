<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <div style="height: 50px;background-color: #ffffff;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">{{lang.call_routing_rules}}</h1>
        </div>

        <el-row style="width: 97%;margin:auto;margin-top:20px;">
            <el-button type="primary" size="small" @click="Add()">{{lang.add}}</el-button>
        </el-row>

        <el-card shadow="never" style="margin:auto;margin-top:10px;margin-bottom:50px;" :style=$store.state.page.card_width>
            <div style="background-color: #ffffff ;padding: 8px 20px;border-bottom: 1px solid #999999;">
                <el-popover
                        placement="bottom"
                        width="200"
                        trigger="click">

                    <el-checkbox class="select_menu_title"
                                 :indeterminate="ruleIsIndeterminate"
                                 v-model="ruleCheckAll"
                                 @change="ruleCheckAllChange">{{lang.all}}</el-checkbox>
                    <div style="margin: 5px 0;"></div>
                    <el-checkbox-group v-model="ruleCheckedTitles" @change="ruleCheckedTitlesChange"  v-for="col in rulecol">
                        <el-checkbox class="select_menu_title"
                                     :label="col.name"
                                     :key="col.name">{{lang[col.name]}}</el-checkbox>
                    </el-checkbox-group>

                    <el-button slot="reference" style="float:right;" type="info" plain size="mini" icon="el-icon-s-grid"></el-button>
                </el-popover>

                <div style="clear:both"></div>
            </div>
            <el-table
                    :data="ruleData"
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
                        width="200"
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
    import {request} from "../../../network/request";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Call-routing-rules",
        inject:['reload'],
        data() {
            return {
                rulecol: [//模块表格
                    {name:'rule_name',istrue:true,width:'100',fixed:true},
                    {name:'order',istrue:true,width:'50',fixed:false},
                    {name:'from',istrue:true,width:'100',fixed:false},
                    {name:'to',istrue:true,width:'100',fixed:false}
                ],
                ruleData: [],//模块数据
                ruleCheckAll: true,//全选框
                ruleCheckedTitles: [],//已选的Title
                ruleIsIndeterminate: false,//全选框的中间态

                lang: this.$store.state.lang
            }
        },
        methods: {
            ruleCheckAllChange(val) {
                this.ruleCheckedTitles = val ? this.ruleCheckedTitlesArr : [];
                this.ruleIsIndeterminate = false;

                this.rulecol.map(i => val ? i.istrue = true : i.istrue = false)
            },
            ruleCheckedTitlesChange(value) {
                console.log(value)
                let checkedCount = value.length;
                this.ruleCheckAll = checkedCount === this.rulecol.length;
                this.ruleIsIndeterminate = checkedCount > 0 && checkedCount < this.rulecol.length;

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
                this.$router.push('/Routing/Call-routing-rules/add')
            },
            Edit(rule_name){
                this.$router.push('/Routing/Call-routing-rules/add/'+rule_name)
            },
            Delete(rule_name){
                this.$confirm('确定要删除吗')
                    .then(_ => {
                        const SectionArr = new AST_SectionArr()

                        let section = new AST_Section()
                        section._section = rule_name
                        SectionArr._item.push(section)

                        this.request.AGRoutingRulesDel(this.del_succeed_back, this.del_error_back, SectionArr)
                    }).catch(_ => {})
            },

            del_succeed_back(){
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

                let _rules = data['_get']['_ruls']['_item']
                _rules.forEach(item =>{
                    let obj = {
                        rule_name: item._name,
                        order: item._order,
                        from: item._fromchannel,
                        to: item._tochannel
                    }

                    this.ruleData.push(obj)
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            }
        },
        computed: {
            ruleCheckedTitlesArr(){
                return this.rulecol.map(n => { return n.name });
            }
        },
        created() {
            this.ruleCheckedTitles = this.rulecol.map(n => { return n.name })

            this.request = new request()
            this.request.AGRoutingRulsGetAll(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>