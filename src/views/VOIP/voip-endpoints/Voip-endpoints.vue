<template>
    <el-form>
        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">{{lang.sip_endpoints}}</h1>
        </div>

        <el-row style="width: 97%;margin:auto;margin-top:20px;">
            <el-button type="primary" size="small" @click="Add()">{{lang.add}}</el-button>
            <el-button type="primary" size="small" @click="Delete()">{{lang.delete}}</el-button>
        </el-row>

        <el-card shadow="never" style="margin:auto;margin-top:10px;margin-bottom: 50px;" :style=$store.state.page.card_list_width>
            <div style="background-color: #ffffff ;padding: 8px 20px;border-bottom: 1px solid #999999;">
                <el-popover
                        placement="bottom"
                        width="200"
                        trigger="click">

                    <el-checkbox
                            class="select_menu_title"
                            :indeterminate="sipIsIndeterminate"
                            v-model="sipCheckAll"
                            @change="sipCheckAllChange">
                        {{lang.all}}</el-checkbox>
                    <div style="margin: 5px 0;"></div>
                    <el-checkbox-group v-model="sipCheckedTitles" @change="sipCheckedTitlesChange">
                        <el-checkbox class="select_menu_title" v-for="col in sipcol" :label="col.name" :key="col.name">{{lang[col.name]}}</el-checkbox>
                    </el-checkbox-group>

                    <el-button slot="reference" style="float:right;" type="info" plain size="mini" icon="el-icon-s-grid"></el-button>
                </el-popover>

                <div style="clear:both"></div>
            </div>
            <el-table
                    :data="sipData"
                    border
                    style="width: 100%"
                    size="small"
                    ref="chnTable"
                    @selection-change="select_sip"
                    :key="Math.random()"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

                <el-table-column
                        v-for="(col,index) in sipcol"
                        :fixed="sipcol[index].fixed"
                        v-if="col.istrue"
                        :prop="col.name"
                        :label="lang[col.name]"
                        :min-width="col.width" ></el-table-column>

                <el-table-column
                        :label="lang.actions"
                        width="160">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="Edit(scope.row.endpoint_name)"
                        >{{lang.edit}}</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="Delete(scope.row.endpoint_name)"
                        >{{lang.delete}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Voip-endpoints",
        inject:['reload'],
        data() {
            return {
                sipcol: [//SIP表格
                    {name:'endpoint_name',istrue:true,width:'150',fixed:true},
                    {name:'registration',istrue:true,width:'150',fixed:false},
                    {name:'credentials',istrue:true,width:'150',fixed:false}
                ],
                sipData: [],//SIP数据
                sipCheckAll: true,//全选框
                sipCheckedTitles: [],//已选的Title
                sipIsIndeterminate: false,//全选框的中间态

                selected_sip: null,

                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods: {
            sipCheckAllChange(val) {
                this.sipCheckedTitles = val ? this.sipCheckedTitlesArr : [];
                this.sipIsIndeterminate = false;

                this.sipcol.map(i => val ? i.istrue = true : i.istrue = false)
            },
            sipCheckedTitlesChange(value) {
                let checkedCount = value.length;
                this.sipCheckAll = checkedCount === this.sipcol.length;
                this.sipIsIndeterminate = checkedCount > 0 && checkedCount < this.sipcol.length;

                this.sipcol.map(i => {
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
                this.$router.push('/SIP/voip-endpoints/add')
            },
            Edit(section){
                this.$router.push('/SIP/voip-endpoints/add/'+section)
            },
            Delete(section){
                const SectionArr = new AST_SectionArr()
                if(section == undefined){
                    if(this.selected_sip == null){
                        this.$message({
                            message: this.lang.select_item_help,
                            type: 'error',
                            offset: '80'
                        })

                        return false
                    }

                    this.selected_sip.forEach(item => {
                        let ast_section = new AST_Section()
                        ast_section._section = item.endpoint_name
                        SectionArr._item.push(ast_section)
                    })
                }else{
                    let ast_section = new AST_Section()
                    ast_section._section = section
                    SectionArr._item.push(ast_section)
                }

                this.$confirm(this.lang.delete_confirm)
                    .then(_ => {

                        this.request.AGSipEndpointsDel(this.del_succeed_back, this.del_error_back, SectionArr)
                    })
                    .catch((error) => {
                        console.log(error)
                })
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
            select_sip(selection){
                this.selected_sip = selection
            },

            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _sips = data['_get']['_sips']['_item']

                _sips.forEach(item => {
                    let credentials = item._username
                    if(item._host != 'dynamic' && item._host != ''){
                        credentials += '@'+item._host
                    }

                    let refistration = ''
                    if(item._registration == 0){
                        refistration = 'none'
                    }else if(item._registration == 1){
                        refistration = 'client'
                    }else if(item._registration == 2){
                        refistration = 'server'
                    }

                    let obj = {
                        endpoint_name: item._section,
                        registration: refistration,
                        credentials: credentials
                    }

                    this.sipData.push(obj)
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            }
        },
        computed:{
            sipCheckedTitlesArr(){
                return this.sipcol.map(n => { return n.name });
            }
        },
        created() {
            this.sipCheckedTitles = this.sipcol.map(n => { return n.name })

            this.debug = debuger('voip-endpoints')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGSipEndpointGetAll(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>