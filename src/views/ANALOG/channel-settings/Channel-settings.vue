<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <div style="height: 50px;background-color: #ffffff;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.channel_settings}}
                <div v-if="channel_type == 2" style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            v-if="$store.state.type == 2"
                            size="small"
                            @click="Save()"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;margin-top:20px;margin-bottom: 50px;" :style=$store.state.page.card_width>
            <div style="background-color: #ffffff ;padding: 8px 20px;border-bottom: 1px solid #999999;">
                <el-popover
                        placement="bottom"
                        width="200"
                        trigger="click">
                    <el-checkbox
                            class="select_menu_title"
                            :indeterminate="moduleIsIndeterminate"
                            v-model="moduleCheckAll"
                            @change="moduleCheckAllChange">{{lang.all}}</el-checkbox>
                    <div style="margin: 5px 0;"></div>
                    <el-checkbox-group v-model="moduleCheckedTitles" @change="moduleCheckedTitlesChange" v-for="col in modulecol">
                        <el-checkbox class="select_menu_title" :label="col.name" :key="col.name">{{lang[col.name]}}</el-checkbox>
                    </el-checkbox-group>

                    <el-button slot="reference"
                               style="float:right;"
                               type="info" plain size="mini" icon="el-icon-s-grid"></el-button>
                </el-popover>

                <div style="clear:both"></div>
            </div>
            <el-table
                    :data="moduleData"
                    border
                    style="width: 100%"
                    size="small"
                    ref="chnTable"
                    v-loading="loading"
                    :key="Math.random()"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        :label="lang.port"
                        prop="port"
                        min-width="50"
                        :fixed=true>
                </el-table-column>

                <el-table-column
                        :label="lang.type"
                        prop="type"
                        min-width="60"
                        v-if="modulecol[0].istrue">
                </el-table-column>

                <el-table-column
                        :label="lang.name"
                        prop="name"
                        min-width="150"
                        v-if="modulecol[1].istrue">
                    <template slot-scope="scope">
                        <el-input
                                v-if="$store.state.FlexRoutingSw == 0 && $store.state.type == 2"
                                v-model="scope.row.name"
                                size="small"
                        ></el-input>
                        <span v-else>{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.line_status"
                        prop="line_status"
                        min-width="150"
                        v-if="modulecol[2].istrue">
                    <template slot-scope="scope">
                        <el-select
                                v-if="$store.state.type == 2"
                                v-model="scope.row.line_status"
                                size="small"
                        ><el-option
                                    v-for="item in sip_options"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                            ></el-option>
                        </el-select>
                        <span v-else>{{scope.row.line_status}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.port_status"
                        prop="port_status"
                        min-width="100"
                        v-if="modulecol[3].istrue">
                </el-table-column>

                <el-table-column
                        :label="lang.hour_call_count"
                        prop="hour_call_count"
                        min-width="100"
                        v-if="modulecol[4].istrue">
                </el-table-column>

                <el-table-column
                        :label="lang.daily_call_count"
                        prop="daily_call_count"
                        min-width="100"
                        v-if="modulecol[5].istrue">
                </el-table-column>

                <el-table-column
                        :label="lang.daily_answer_count"
                        prop="daily_answer_count"
                        min-width="100"
                        v-if="modulecol[6].istrue">
                </el-table-column>

                <el-table-column
                        :label="lang.call_status"
                        prop="call_status"
                        min-width="150"
                        v-if="modulecol[7].istrue">
                    <template slot-scope="scope">
                        <el-button
                                type="danger"
                                v-if="scope.row.call_status == 1"
                                size="mini">
                            {{lang.limited}}
                        </el-button>
                        <span v-else>{{lang.unlimited}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.actions"
                        width="80"
                >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="edit(scope.row.id)"
                        >{{lang.edit}}</el-button>
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
        name: "Channel-settings",
        inject:['reload'],
        data() {
            return {
                request: null,

                flex_routing_sw: false,//灵活路由开关
                channel_type: 0,//0=>O口，1=>混合口，2=>S口

                modulecol: [//模块表格
                    {name:'type',istrue:true},
                    {name:'name',istrue:true},
                    {name:'line_status',istrue:true},
                    {name:'port_status',istrue:true},
                    {name:'hour_call_count',istrue:true},
                    {name:'daily_call_count',istrue:true},
                    {name:'daily_answer_count',istrue:true},
                    {name:'call_status',istrue:true}
                ],
                moduleData: [],//模块数据
                moduleCheckAll: true,//全选框
                moduleCheckedTitles: [],//已选的Title
                moduleIsIndeterminate: false,//全选框的中间态

                sip_options: [],

                loading: true,
                lang: this.$store.state.lang
            }
        },
        methods: {
            moduleCheckAllChange(val) {
                this.moduleCheckedTitles = val ? this.moduleCheckedTitlesArr : [];
                this.moduleIsIndeterminate = false;

                this.modulecol.map(i => val ? i.istrue = true : i.istrue = false)
            },
            moduleCheckedTitlesChange(value) {
                let checkedCount = value.length;
                this.moduleCheckAll = checkedCount === this.modulecol.length;
                this.moduleIsIndeterminate = checkedCount > 0 && checkedCount < this.modulecol.length;

                this.modulecol.map(i => {
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

            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let ana_data = data['_get']['_ana']['_item']
                let limit_sta = data['_get']['_limitStatus']['_item']
                let sip_data = data['_get']['_sip']['_item']

                this.flex_routing_sw = data['_get']['_combuf']['_FlexRoutingSw']
                this.channel_type = data['_get']['_combuf']['_type']

                for(let i=0;i<ana_data.length;i++){
                    let type
                    if(ana_data[i]['_signalling'] == 2){
                        type = 'FXO'
                    }else if(ana_data[i]['_signalling'] == 1){
                        type = 'FXS'
                    }else{
                        continue
                    }

                    let name
                    if(ana_data[i]['_name'] != ''){
                        name = ana_data[i]['_name']
                    }else{
                        name = 'port-'+(i+1)
                    }

                    let line_status
                    if(type == 'FXS') {
                        line_status = ana_data[i]['_cidnumber']
                    }else if(this.channel_type == 2){
                        let sip_name = ana_data[i]['_associatedchnnl']
                        line_status = (sip_name.indexOf('sip-') != -1) ? sip_name.substr(4) : ''
                    }else{
                        line_status = ana_data[i]['_line']
                    }

                    let port_status
                    if(ana_data[i]['_signalling'] == 3){
                        port_status = 'Inactive'
                    }else{
                        port_status = ana_data[i]['_status']
                    }

                    let obj = {
                        'id': i+1,
                        'port': ana_data[i]['_channel'],
                        'type': type,
                        'name': name,
                        'line_status': line_status,
                        'port_status': port_status,
                        'hour_call_count': ana_data[i]['_hourtotal'],
                        'daily_call_count': ana_data[i]['_daytotal'],
                        'daily_answer_count': ana_data[i]['_answertotal'],
                        'call_status': limit_sta[i]['_limitsta']
                    }

                    this.moduleData.push(obj)
                }

                sip_data.forEach(item => {
                    this.sip_options.push(item._section)
                })

                this.loading = false
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            edit(port){
                this.$router.push('/Analog/Channel-settings/edit/'+port)
            },

            Save(){
                const AnaFxsAll = new AST_AnaFxsAll()

                this.moduleData.forEach((item) => {
                    let anafxs = new AST_AnaFxs()

                    anafxs._channel = item.id
                    anafxs._name = item.name
                    anafxs._associatedchnnl = item.line_status

                    AnaFxsAll._item.push(anafxs)
                })

                this.request.AGAlgChannelSaveAll(this.save_succeed_back, this.save_error_back, AnaFxsAll)
            },
            save_succeed_back(data){
                console.log(data)

                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })
            },
            save_error_back(){
                console.log('error')

                this.$message({
                    message: '保存失败，发生未知错误',
                    type: 'error',
                    offset: '80'
                })
            }
        },
        computed: {
            moduleCheckedTitlesArr(){
                return this.modulecol.map(n => { return n.name });
            }
        },
        created() {
            this.moduleCheckedTitles = this.modulecol.map(n => { return n.name })

            this.request = new request()
            this.request.AGAlgChannelGetAll(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>