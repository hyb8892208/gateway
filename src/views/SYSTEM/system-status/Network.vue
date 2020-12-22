<template>
    <el-card shadow="never" style="margin:auto;margin-bottom:50px;" :style=$store.state.page.card_list_width>

        <div style="background-color: #ffffff ;padding: 8px 20px;border-bottom: 1px solid #999999;">
            <el-popover
                    placement="bottom"
                    trigger="click">

                <el-checkbox class="select_menu_title"
                             :indeterminate="networkIsIndeterminate"
                             v-model="networkCheckAll"
                             @change="networkCheckAllChange">{{lang.all}}</el-checkbox>
                <div style="margin: 5px 0;"></div>
                <el-checkbox-group v-model="networkCheckedTitles" @change="networkCheckedTitlesChange" v-for="col in networkcol">
                    <el-checkbox class="select_menu_title" :label="col.name" :key="col.name">{{lang[col.name]}}</el-checkbox>
                </el-checkbox-group>

                <el-button slot="reference" style="float:right;" type="info" plain size="mini" icon="el-icon-s-grid"></el-button>
            </el-popover>

            <div style="clear:both"></div>
        </div>
        <el-table
                :data="networkData"
                border
                style="width: 100%"
                size="small"
                ref="sipTable"
                :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

            <el-table-column
                    v-for="(col,index) in networkcol"
                    :fixed="networkcol[index].fixed"
                    v-if="col.istrue"
                    :prop="col.name"
                    :label="lang[col.name]"
                    :min-width="col.width" ></el-table-column>
        </el-table>

    </el-card>
</template>

<script>
    export default {
        name: "Network",
        data(){
            return{
                networkcol: [//NetwrokSIP表格
                    {name:'name',istrue:true,width:'150',fixed:true},
                    {name:'mac_address',istrue:true,width:'250',fixed:false},
                    {name:'ip_address',istrue:true,width:'200',fixed:false},
                    {name:'mask',istrue:true,width:'200',fixed:false},
                    {name:'gateway',istrue:true,width:'200',fixed:false},
                    {name:'rx_packets',istrue:true,width:'200',fixed:false},
                    {name:'tx_packets',istrue:true,width:'200',fixed:false}
                ],
                networkData: [],//Netwrok数据
                networkCheckAll:true,//全选框
                networkCheckedTitles: [],//已选的Title
                networkIsIndeterminate: false,//全选框的中间态

                lang: this.$store.state.lang,
            }
        },
        props: {
            networkInfo: {
                type: Object,
                default: null,
            }
        },
        methods: {
            networkCheckAllChange(val){
                this.networkCheckedTitles = val ? this.networkCheckedTitlesArr : []
                this.networkIsIndeterminate = false

                this.networkcol.map(i => val ? i.istrue = true : i.istrue = false)
            },
            networkCheckedTitlesChange(value){
                let checkedCount = value.length
                this.networkCheckAll = checkedCount === this.networkcol.length
                this.networkIsIndeterminate = checkedCount > 0 && checkedCount < this.networkcol.length

                this.networkcol.map(i => {
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
            show_network_list(networkData){
                let obj = null
                for(let i=0;i<networkData.length;i++) {
                    let name
                    if(i == 0) {
                        name = 'LAN'
                    }else if(i == 1){
                        name = 'WAN'
                    }else{
                        continue
                    }

                    if(networkData[i]['_ip'] == '') continue

                    obj = {
                        'name': name,
                        'mac_address': networkData[i]['_mac'],
                        'ip_address': networkData[i]['_ip'],
                        'mask': networkData[i]['_mask'],
                        'gateway': networkData[i]['_gateway'],
                        'rx_packets': networkData[i]['_rx'],
                        'tx_packets': networkData[i]['_tx']
                    }

                    this.networkData.push(obj)
                }
            },
        },
        computed: {
            networkCheckedTitlesArr(){
                return this.networkcol.map(n => { return n.name })
            },
        },
        created() {
            this.networkCheckedTitles = this.networkcol.map(n => { return n.name })

            this.show_network_list(this.networkInfo)
        }
    }
</script>

<style scoped>

</style>