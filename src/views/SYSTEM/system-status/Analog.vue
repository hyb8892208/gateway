<template>
    <el-card shadow="never" style="margin:auto;margin-bottom:50px;" :style=$store.state.page.card_list_width>
        <div style="background-color: #ffffff ;padding: 8px 20px;border-bottom: 1px solid #999999;">
            <el-popover
                    placement="bottom"
                    trigger="click">

                <el-checkbox class="select_menu_title"
                             :indeterminate="moduleIsIndeterminate"
                             v-model="moduleCheckAll"
                             @change="moduleCheckAllChange">{{lang.all}}</el-checkbox>
                <div style="margin: 5px 0;"></div>
                <el-checkbox-group v-model="moduleCheckedTitles" @change="moduleCheckedTitlesChange" v-for="col in modulecol">
                    <el-checkbox class="select_menu_title" :label="col.name" :key="col.name">{{lang[col.name]}}</el-checkbox>
                </el-checkbox-group>

                <el-button slot="reference" style="float:right;" type="info" plain size="mini" icon="el-icon-s-grid"></el-button>
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
                :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

            <el-table-column
                    :label="lang.port"
                    prop="port"
                    min-width="50"
                    :fixed=true>
            </el-table-column>

            <el-table-column
                    :label="lang.name"
                    prop="name"
                    min-width="150"
                    v-if="modulecol[0].istrue">
            </el-table-column>

            <el-table-column
                    :label="lang.type"
                    prop="type"
                    min-width="150"
                    v-if="modulecol[1].istrue">
                <template slot-scope="scope">
                    <span v-if="scope.row.type == 'FXS' || (scope.row.type == 'FXO' && scope.row.line_status == 'Connected')"
                          style="color: #00A030;">{{scope.row.type}}</span>
                    <span v-else style="color: #ff0000;">{{scope.row.type}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    :label="lang.line_status"
                    prop="line_status"
                    min-width="200"
                    v-if="modulecol[2].istrue">
                <template slot-scope="scope">
                    <span v-if="scope.row.type == 'FXS' && $store.state.CheckFXSCurrSta == 1">
                        <span :style="{color:(scope.row.line_status == 'Connected' ? '#00A030' : '#FF0000')}">{{scope.row.line_status}}</span> / {{scope.row.callerid}}
                    </span>
                    <span v-else-if="scope.row.type == 'FXS'">{{scope.row.callerid}}</span>
                    <span v-else-if="scope.row.type == 'FXO'">{{scope.row.line_status}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    :label="lang.port_status"
                    prop="port_status"
                    min-width="200"
                    v-if="modulecol[3].istrue">
                <template slot-scope="scope">
                    <span v-if="scope.row.port_status == 'OnHook'" style="color: #00A030">{{scope.row.port_status}}</span>
                    <span v-else-if="scope.row.port_status == 'OffHook'" style="color: #FF0000">{{scope.row.port_status}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    :label="lang.voltage"
                    prop="voltage"
                    min-width="80"
                    v-if="modulecol[4].istrue">
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
    export default {
        name: "Analog",
        data(){
            return {
                modulecol: [//模块表格
                    {name:'name',istrue:true},
                    {name:'type',istrue:true},
                    {name:'line_status',istrue:true},
                    {name:'callerid',istrue:true},
                    {name:'port_status',istrue:true},
                    {name:'voltage',istrue:true}
                ],
                moduleData: [],//模块数据
                moduleCheckAll: true,//全选框
                moduleCheckedTitles: [],//已选的Title
                moduleIsIndeterminate: false,//全选框的中间态

                loading: true,
                lang: this.$store.state.lang
            }
        },
        props: {
            anaInfo: {
                type: Object,
                default: [],
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
            show_module_list(moduleData){
                let obj = null
                for(let i=0;i<moduleData.length;i++){
                    let name
                    if(moduleData[i]['_name'] != ''){
                        name = moduleData[i]['_name']
                    }else{
                        name = 'port-'+moduleData[i]['_channel']
                    }

                    let type
                    if(moduleData[i]['_signalling'] == 3 || moduleData[i]['_signalling'] == 4){
                        type = 'FXO'
                    }else if(moduleData[i]['_signalling'] == 1 || moduleData[i]['_signalling'] == 2){
                        type = 'FXS'
                    }else{
                        type = 'Port NULL'
                        continue
                    }

                    let line_status = moduleData[i]['_line']
                    let callerid = moduleData[i]['_callerid']

                    obj = {
                        'port': moduleData[i]['_channel'],
                        'name': name,
                        'type': type,
                        'line_status': line_status,
                        'callerid': callerid,
                        'port_status': moduleData[i]['_status'],
                        'voltage': ''
                    }

                    this.moduleData.push(obj)
                    this.loading = false
                }

                this.get_analog_info()
            },
            get_analog_info(){
                this.cc = null
                let n = 0
                this.$axios.get('/service?action=get_analoginfo')
                    .then((res) => {
                        Object.getOwnPropertyNames(res.data).forEach((i) => {
                            let item = res.data[i][0]

                            if(item.sigtype.indexOf('FXO') != -1){
                                let line_status = item.line
                                let callerid = item.callerid

                                let obj = {
                                    port: this.moduleData[n].port,
                                    name: this.moduleData[n].name,
                                    type: 'FXS',
                                    line_status: line_status,
                                    callerid: callerid,
                                    port_status: item.status,
                                    voltage: item.voltage
                                }
                                this.$set(this.moduleData, n, obj)

                            }else if(item.sigtype.indexOf('FXS') != -1){
                                let line_status = item.line
                                let callerid = item.callerid

                                let obj = {
                                    port: this.moduleData[n].port,
                                    name: this.moduleData[n].name,
                                    type: 'FXO',
                                    line_status: line_status,
                                    callerid: callerid,
                                    port_status: item.status,
                                    voltage: item.voltage
                                }

                                this.$set(this.moduleData, n, obj)
                            }

                            n++
                        })

                        clearTimeout(this.TimeoutID)
                        this.TimeoutID = setTimeout(() => {
                            this.get_analog_info()
                        }, 4000)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        watch: {
            anaInfo: function (val) {
                this.anaInfo = val
            }
        },
        computed: {
            moduleCheckedTitlesArr(){
                return this.modulecol.map(n => { return n.name });
            }
        },
        created() {
            this.moduleCheckedTitles = this.modulecol.map(n => { return n.name })

            console.log(this.anaInfo)
            this.show_module_list(this.anaInfo)
        },
        beforeDestroy() {
            clearTimeout(this.TimeoutID)//在销毁之前清空请求
        }
    }
</script>

<style scoped>

</style>