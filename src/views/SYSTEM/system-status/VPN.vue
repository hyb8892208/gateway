<template>
    <el-card shadow="never" style="margin:auto;margin-bottom:50px;" :style=$store.state.page.card_width>
        <div style="background-color: #ffffff ;padding: 8px 20px;border-bottom: 1px solid #999999;">
            <el-popover
                    placement="bottom"
                    width="200"
                    trigger="click">

                <el-checkbox class="select_menu_title"
                             :indeterminate="vpnIsIndeterminate"
                             v-model="vpnCheckAll"
                             @change="vpnCheckAllChange">{{lang.all}}</el-checkbox>
                <div style="margin: 5px 0;"></div>
                <el-checkbox-group v-model="vpnCheckedTitles" @change="vpnCheckedTitlesChange">
                    <el-checkbox class="select_menu_title"
                                 v-for="col in vpncol"
                                 :label="col.name"
                                 :key="col.name">{{lang[col.name]}}</el-checkbox>
                </el-checkbox-group>

                <el-button slot="reference" style="float:right;" type="info" plain size="mini" icon="el-icon-s-grid"></el-button>
            </el-popover>

            <div style="clear:both"></div>
        </div>
        <el-table
                :data="vpnData"
                border
                style="width: 100%"
                size="small"
                :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

            <el-table-column
                    v-for="(col,index) in vpncol"
                    :fixed="vpncol[index].fixed"
                    v-if="col.istrue"
                    :prop="col.name"
                    :label="lang[col.name]"
                    :min-width="col.width" ></el-table-column>
        </el-table>
    </el-card>
</template>

<script>
    export default {
        name: "VPN",
        data(){
            return {
                vpncol: [//NetwrokSIP表格
                    {name:'name',istrue:true,width:'150',fixed:true},
                    {name:'ip_address',istrue:true,width:'200',fixed:false},
                    {name:'gateway',istrue:true,width:'200',fixed:false},
                    {name:'mask',istrue:true,width:'200',fixed:false},
                    {name:'rx_packets',istrue:true,width:'200',fixed:false},
                    {name:'tx_packets',istrue:true,width:'200',fixed:false}
                ],
                vpnData: [],//Netwrok数据
                vpnCheckAll:true,//全选框
                vpnCheckedTitles: [],//已选的Title
                vpnIsIndeterminate: false,//全选框的中间态

                lang: this.$store.state.lang
            }
        },
        props: {
            vpnInfo: {
                type: Object,
                default: null,
            }
        },
        methods: {
            vpnCheckAllChange(val){
                this.vpnCheckedTitles = val ? this.vpnCheckedTitlesArr : [];
                this.vpnIsIndeterminate = false;

                this.vpncol.map(i => val ? i.istrue = true : i.istrue = false)
            },
            vpnCheckedTitlesChange(value){
                let checkedCount = value.length;
                this.vpnCheckAll = checkedCount === this.vpncol.length;
                this.vpnIsIndeterminate = checkedCount > 0 && checkedCount < this.vpncol.length;

                this.vpncol.map(i => {
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
            show_vpn_list(networkData){
                if(networkData.length > 0) this.show_vpn_tab = true

                for(let i=0;i<networkData.length;i++){
                    let name
                    if(i == 2){
                        name = 'OPENVPN'
                    }else if(i == 3){
                        name = 'PPTPVPN'
                    }else if(i == 4) {
                        name = 'Zerotier VPN'
                    }else if(i == 5){
                        name = 'L2TP VPN'
                    }else{
                        continue
                    }

                    if(networkData[i]['_ip'] == '') continue

                    let obj = {
                        'name': name,
                        'ptpip': networkData[i]['_ip'],
                        'mask': networkData[i]['_mask'],
                        'rx': networkData[i]['_rx'],
                        'tx': networkData[i]['_tx']
                    }

                    this.vpnData.push(obj)
                }
            },
        },
        computed: {
            vpnCheckedTitlesArr(){
                return this.vpncol.map(n => { return n.name });
            }
        },
        created() {
            this.vpnCheckedTitles = this.vpncol.map(n => { return n.name })

            this.show_vpn_list(this.vpnInfo)
        }
    }
</script>

<style scoped>

</style>