<template>
    <el-card shadow="never" style="margin:auto;margin-bottom:50px;" :style=$store.state.page.card_list_width>
        <div style="background-color: #ffffff ;padding: 8px 20px;border-bottom: 1px solid #999999;">
            <el-popover
                    placement="bottom"
                    trigger="click">

                <el-checkbox class="select_menu_title"
                             :indeterminate="sipIsIndeterminate"
                             v-model="sipCheckAll"
                             @change="sipCheckAllChange">{{lang.all}}</el-checkbox>
                <div style="margin: 5px 0;"></div>
                <el-checkbox-group v-model="sipCheckedTitles" @change="sipCheckedTitlesChange" v-for="col in sipcol">
                    <el-checkbox class="select_menu_title" :label="col.name" :key="col.name">{{lang[col.name]}}</el-checkbox>
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
                ref="sipTable"
                :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

            <el-table-column
                    :label="lang.endpoint_name"
                    prop="endpoint_name"
                    min-width="150"
                    :fixed=true>
            </el-table-column>

            <el-table-column
                    :label="lang.username"
                    prop="username"
                    min-width="150"
                    v-if="sipcol[0].istrue">
            </el-table-column>

            <el-table-column
                    :label="lang.host"
                    prop="host"
                    min-width="150"
                    v-if="sipcol[1].istrue">
            </el-table-column>

            <el-table-column
                    :label="lang.registration"
                    prop="registration"
                    min-width="150"
                    v-if="sipcol[2].istrue">
            </el-table-column>

            <el-table-column
                    :label="lang.sip_status"
                    prop="sip_status"
                    min-width="200"
                    v-if="sipcol[3].istrue">
                <template slot-scope="scope">
                                <span v-if="scope.row.sip_status == 'Registered'"
                                      style="color: #00A030">{{scope.row.sip_status}}</span>
                    <span v-else style="color: #FF0000">{{scope.row.sip_status}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    :label="lang.response_code"
                    prop="response_code"
                    min-width="200"
                    v-if="sipcol[4].istrue">
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
    export default {
        name: "SIP",
        data(){
            return {
                sipcol: [//SIP表格
                    {name:'username',istrue:true},
                    {name:'host',istrue:true},
                    {name:'registration',istrue:true},
                    {name:'sip_status',istrue:true},
                    {name:'response_code',istrue:true}
                ],
                sipData: [],//SIP数据
                sipCheckAll:true,//全选框
                sipCheckedTitles: [],//已选的Title
                sipIsIndeterminate: false,//全选框的中间态

                lang: this.$store.state.lang
            }
        },
        props:{
            sipInfo: {
                type: Object,
                default: null,
            }
        },
        methods: {
            sipCheckAllChange(val){
                this.sipCheckedTitles = val ? this.sipCheckedTitlesArr : [];
                this.sipIsIndeterminate = false;

                this.sipcol.map(i => val ? i.istrue = true : i.istrue = false)
            },
            sipCheckedTitlesChange(value){
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
            show_sip_list(sipData){
                let obj = null
                for(let i=0;i<sipData.length;i++) {
                    let registration = sipData[i]['_registration']
                    let registration_val
                    if (registration == 0) {
                        registration_val = 'None'
                    } else if (registration == 1) {
                        registration_val = 'Client'
                    } else if (registration == 1) {
                        registration_val = 'Server'
                    }

                    obj = {
                        'endpoint_name': sipData[i]['_section'],
                        'username': sipData[i]['_username'],
                        'host': sipData[i]['_host'],
                        'registration': registration_val,
                        'sip_status': sipData[i]['_status'],
                        'response_code': sipData[i]['_respon']
                    }

                    this.sipData.push(obj)
                }
            },
        },
        computed: {
            sipCheckedTitlesArr(){
                return this.sipcol.map(n => { return n.name });
            },
        },
        created() {
            this.sipCheckedTitles = this.sipcol.map(n => { return n.name })

            this.show_sip_list(this.sipInfo)
        }
    }
</script>

<style scoped>

</style>