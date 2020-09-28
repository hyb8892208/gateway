<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <div style="height: 50px;background-color: #ffffff;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.batch_create_sip}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="Save"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;margin-top:20px;margin-bottom: 50px;" :style=$store.state.page.card_width>
            <el-table
                    :data="sipData"
                    border
                    style="width: 100%"
                    size="mini"
                    :key="Math.random()"
                    @selection-change="selection_change"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        type="selection"
                        :selectable="showFirstChcekbox"
                        width="55">
                </el-table-column>

                <el-table-column
                        :label="lang.port"
                        width="55">
                    <template slot-scope="scope" v-if="scope.$index != 0" >{{ scope.row.sipnum }}</template>
                </el-table-column>

                <el-table-column
                        :label="lang.username"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.username" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.password"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.password" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.host"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.register == 2 ? 'dynamic' : scope.row.host" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.port"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.port" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.vos"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.register" size="mini" style="width: 100%">
                            <el-option
                                v-for="item in register_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>

            <el-row style="margin: 20px 0 20px 20px;">
                <el-button type="primary"
                           @click="batch"
                           size="small">{{lang.batch}}</el-button>
                <el-checkbox style="margin-left: 20px;"
                             @change="autopassword"
                             type="primary"
                             size="small">{{lang.autopassword}}</el-checkbox>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Sip-batch-endpoints",
        data() {
            return {
                sipData: [{
                    sipnum: '',
                    username: '',
                    password: '',
                    host: '',
                    port: '',
                    register: 1
                }],

                register_options: [{
                    label: 'Client',
                    value: 1
                },{
                    label: 'Server',
                    value: 2
                }],

                selected_sip: [],//保存多选框选中的选项

                lang: this.$store.state.lang
            }
        },
        methods:{
            showFirstChcekbox(row, index){//禁用第一行的checkbox
                if(index == 0){
                    return false
                }else{
                    return true
                }
            },
            selection_change(val){
                this.selected_sip = val
            },

            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _ana = data['_get']['_ana']['_item']
                this._sip = data['_get']['_sip']['_item']

                for(let i=0;i<_ana.length;i++){
                    let obj = {
                        sipnum: _ana[i]['_channel'],
                        username: '',
                        password: '',
                        host: '',
                        port: '',
                        register: 1
                    }

                    this.sipData.push(obj)
                }
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            batch(){
                let n = 1

                console.log(this.selected_sip)
                this.selected_sip.forEach((item,index) => {
                    this.selected_sip[index].username = isNaN (parseInt(this.sipData[0].username) + n)
                        ? '' : (parseInt(this.sipData[0].username) + n - 1)

                    this.selected_sip[index].password = isNaN (parseInt(this.sipData[0].password) + n)
                        ? '' : (parseInt(this.sipData[0].password) + n - 1)

                    if(this.sipData[0].register == 'client'){
                        this.selected_sip[index].host = this.sipData[0].host
                    }else if(this.sipData[0].register == 'server'){
                        this.selected_sip[index].host = 'dynamic'
                    }

                    this.selected_sip[index].port = this.sipData[0].port
                    this.selected_sip[index].register = this.sipData[0].register

                    n++
                })
            },
            autopassword(checked){
                console.log(this.selected_sip)
                if(checked){
                    this.selected_sip.forEach((item,index) => {
                        this.selected_sip[index].password = isNaN(parseInt(this.sipData[0].password))
                            ? '' : (parseInt(this.sipData[0].password))
                    })
                }else{
                    let n = 1
                    this.selected_sip.forEach((item,index) => {
                        this.selected_sip[index].password = isNaN (parseInt(this.sipData[0].password) + n)
                            ? '' : (parseInt(this.sipData[0].password) + n - 1)

                        n++
                    })
                }

            },

            Save(){
                let last_order = 1
                if(this._sip > 0){
                    last_order = Math.max(this._sip.map(item => item._order)) + 1
                }

                const SipBatchArr = new AST_SipBatchArr()
                this.selected_sip.forEach(item => {
                    let sipbatch = new AST_SipBatch()

                    sipbatch._username = item.username
                    sipbatch._section = item.username
                    sipbatch._registration = item.register
                    sipbatch._order = last_order
                    sipbatch._secret = item.password
                    sipbatch._host = item.host

                    if(item.port == ''){
                        item.port = 0
                    }
                    sipbatch._port = item.port
                    sipbatch._md5 = md5(item.username+'-'+item.password)

                    SipBatchArr._item.push(sipbatch)

                    last_order++
                })

                console.log(SipBatchArr)
                this.request.AGSipBatchEndpointsSave(this.save_succeed_back, this.save_error_back, SipBatchArr)
            },
            save_succeed_back(data){
                console.log(data)
                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })

                this.$router.push('/SIP/Voip-endpoints')
            },
            save_error_back(){
                console.log('save failed')

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },
        created() {
            this.request.AGSipBatchEndpointsGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>