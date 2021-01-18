<template>
    <el-form>
        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">{{lang.call_routing_rules}}</h1>
        </div>

        <el-row style="width: 97%;margin:auto;margin-top:20px;">
            <el-button type="primary" size="small" @click="Add()">{{lang.add}}</el-button>
            <el-button type="primary" size="small" @click="Delete()">{{lang.delete}}</el-button>
            <el-button type="primary" size="small" @click="SaveOrder()">{{lang.save_order}}</el-button>
        </el-row>

        <el-card shadow="never" style="margin:auto;margin-top:10px;margin-bottom:50px;" :style=$store.state.page.card_list_width>
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
                    row-key="order"
                    style="width: 100%;"
                    size="small"
                    id="rule_table"
                    ref="chnTable"
                    @selection-change="select_route"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

                <!--:fixed="rulecol[index].fixed"-->
                <el-table-column
                        v-for="(col,index) in rulecol"
                        v-if="col.istrue"
                        :key="`rulecol_${index}`"
                        :prop="dropRulecol[index].name"
                        :label="lang[col.name]"
                        :min-width="col.width" ></el-table-column>

                <el-table-column
                        :label="lang.actions"
                        width="200"
                >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="Edit(scope.row.order, scope.row.rule_name)"
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
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import Sortable from 'sortablejs'
    import {debuger} from "../../../debug/debug";

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
                dropRulecol: [
                    {name:'rule_name',istrue:true,width:'100',fixed:true},
                    {name:'order',istrue:true,width:'50',fixed:false},
                    {name:'from',istrue:true,width:'100',fixed:false},
                    {name:'to',istrue:true,width:'100',fixed:false}
                ],
                ruleData: [],//模块数据
                ruleCheckAll: true,//全选框
                ruleCheckedTitles: [],//已选的Title
                ruleIsIndeterminate: false,//全选框的中间态

                selected_route: null,

                debug: false,
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
            select_route(selection){
                this.selected_route = selection
            },
            Add(){
                let order
                if(this.ruleData.length != 0){
                    order = parseInt(this.ruleData[this.ruleData.length-1].order) + 1
                }else{
                    order = 1
                }

                this.$router.push('/Routing/Call-routing-rules/add/'+order)
            },
            Edit(order, rule_name){
                this.$router.push('/Routing/Call-routing-rules/add/'+order+'/'+rule_name)
            },
            Delete(rule_name){
                const SectionArr = new AST_SectionArr()
                if(rule_name == undefined){
                    if(this.selected_route == null){
                        this.$message({
                            message: this.lang.select_item_help,
                            type: 'error',
                            offset: '80'
                        })

                        return false
                    }

                    this.selected_route.forEach(item => {
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
                        this.request.AGRoutingRulesDel(this.del_succeed_back, this.del_error_back, SectionArr)
                    }).catch(_ => {})
            },

            del_succeed_back(data){
                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.successfully_deleted,
                        type: 'success',
                        offset: '80'
                    })

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
            SaveOrder(){
                const LineArr = new AST_LineArr()
                this.ruleData.forEach((item,index) => {
                    let line = new AST_Line()
                    line._key = item.rule_name
                    line._value = index+1
                    LineArr._item.push(line)
                })
                this.request.AGRoutingRulesSaveOrder(this.save_order_succeed_back, this.save_order_error_back, LineArr)
            },
            save_order_succeed_back(data){
                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: '80'
                    })

                    this.reload()
                }else{
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: '80'
                    })
                }
            },
            save_order_error_back(){
                this.$message({
                    message: this.lang.save_failed,
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

                //实现拖拉效果
                this.$nextTick(function () {
                    this.rowDrop()
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            //行拖拽
            rowDrop() {
                const tbody = document.querySelector('.el-table__body-wrapper tbody')
                const _this = this
                Sortable.create(tbody, {
                    onEnd({ newIndex, oldIndex }) {
                        const currRow = _this.ruleData.splice(oldIndex, 1)[0]
                        _this.ruleData.splice(newIndex, 0, currRow)
                    }
                })
            },
        },
        computed: {
            ruleCheckedTitlesArr(){
                return this.rulecol.map(n => { return n.name });
            }
        },
        created() {
            this.ruleCheckedTitles = this.rulecol.map(n => { return n.name })

            this.debug = debuger('routing-call-routing-rules')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGRoutingRulsGetAll(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style>
    #rule_table tbody{
        cursor: s-resize;
    }
</style>