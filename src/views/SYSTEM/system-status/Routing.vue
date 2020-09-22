<template>
    <el-card shadow="never" style="margin:auto;margin-bottom:50px;" :style=$store.state.page.card_width>
        <el-table
                :data="routingData"
                border
                style="width: 100%"
                size="small"
                ref="routingTable"
                :header-cell-style="{background:'#f3f7fa',color:'#606266'}"
        >

            <el-table-column
                    v-for="(col,index) in routingcol"
                    :fixed="routingcol[index].fixed"
                    :prop="col.name"
                    :label="lang[col.name]"
                    :min-width="col.width" ></el-table-column>

        </el-table>
    </el-card>
</template>

<script>
    export default {
        name: "Routing",
        data(){
            return {
                routingcol: [//Routing表格
                    {name:'rule_name',width:'150',fixed:true},
                    {name:'from',width:'150',fixed:false},
                    {name:'to',width:'150',fixed:false}
                ],
                routingData: [],//Routing数据

                lang: this.$store.state.lang,
            }
        },
        props: {
            routingInfo: {
                type: Object,
                default: null
            }
        },
        methods: {
            show_routing_list(routingData){
                let obj = null
                for(let i=0;i<routingData.length;i++) {
                    obj = {
                        'rule_name': routingData[i]['_section'],
                        'from': routingData[i]['_fromchannel'],
                        'to': routingData[i]['_tochannel']
                    }

                    this.routingData.push(obj)
                }
            },
        },
        created() {
            this.show_routing_list(this.routingInfo)
        }
    }
</script>

<style scoped>

</style>