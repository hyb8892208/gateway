<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <div style="height: 50px;background-color: #ffffff;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.fxs_batch_bind_sip}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="Save()"
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
                        :label="lang.port_name"
                        min-width="80">
                    <template slot-scope="scope">
                        <el-input v-if="scope.$index != 0" v-model="scope.row.portname" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.username"
                        min-width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.username" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.password"
                        min-width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.password" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.hostname_or_ip_address"
                        min-width="300">
                    <template slot-scope="scope">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-input v-model="scope.row.host" size="mini"></el-input>
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="scope.row.back_host" size="mini"></el-input>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.port"
                        min-width="60">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.port" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.vos_encryption"
                        min-width="80">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.vos" size="mini">
                            <el-option
                                v-for="item in vos_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.codec_priority"
                        min-width="120">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.codec_priority" size="mini">
                            <el-option
                                v-for="item in codec_priority_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.support_codec"
                        min-width="80">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.support_codec" size="mini">
                            <el-option
                                v-for="item in support_codec_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>

            <el-row style="margin: 20px 0 20px 20px;">
                <el-button type="primary"
                           @click="batch"
                           size="small">{{lang.batch}}</el-button>
                <el-checkbox style="margin-left: 20px;"
                             type="primary"
                             @change="autopassword"
                             size="small">
                    {{lang.autopassword}}
                </el-checkbox>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Sip-bendpoints",
        data() {
            return {
                sipData: [{
                    sipnum: '',
                    portname: '',
                    username: '',
                    password: '',
                    host: '',
                    back_host: '',
                    port: '',
                    vos: 0,
                    codec_priority: 1,
                    support_codec: 'all'
                }],

                vos_options:[{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 2
                }],

                codec_priority_options: [{
                    label: 'G.711 u-law',
                    value: 1
                },{
                    label: 'G.711 a-law',
                    value: 2
                },{
                    label: 'G.729',
                    value: 3
                },{
                    label: 'G.722',
                    value: 4
                },{
                    label: 'ILBC',
                    value: 6
                }],

                support_codec_options: [{
                    label: 'all',
                    value: 'all'
                },{
                    label: 'solo',
                    value: 'solo'
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
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_sipbend']['_combuf']
                this.$store.commit(MENU, common_data)

                let _ana = data['_sipbend']['_ana']['_item']

                for(let i=0;i<_ana.length;i++){
                    if(_ana[i]['_signalling'] == 2 || _ana[i]['_signalling'] == 3) continue

                    let obj = {
                        sipnum: _ana[i]['_channel'],
                        portname: 'port-'+_ana[i]['_channel'],
                        username: '',
                        password: '',
                        host: '',
                        back_host: '',
                        port: '',
                        vos: 0,
                        codec_priority: 1,
                        support_codec: 'all'
                    }

                    this.sipData.push(obj)
                }
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            selection_change(val){
                this.selected_sip = val
            },
            batch(){
                let n = 0

                this.selected_sip.forEach((item,index) => {
                    this.selected_sip[index].username = isNaN(parseInt(this.sipData[0].username) + n)
                        ? '' : (parseInt(this.sipData[0].username) + n)

                    this.selected_sip[index].password = isNaN(parseInt(this.sipData[0].password) + n)
                        ? '' : (parseInt(this.sipData[0].password) + n)

                    this.selected_sip[index].host = this.sipData[0].host
                    this.selected_sip[index].back_host = this.sipData[0].back_host
                    this.selected_sip[index].port = this.sipData[0].port
                    this.selected_sip[index].vos = this.sipData[0].vos
                    this.selected_sip[index].codec_priority = this.sipData[0].codec_priority
                    this.selected_sip[index].support_codec = this.sipData[0].support_codec
                    n++
                })
            },
            autopassword(checked){
                if(checked){
                    this.selected_sip.forEach((item,index) => {
                        this.selected_sip[index].password = isNaN(parseInt(this.sipData[0].password))
                            ? '' : (parseInt(this.sipData[0].password))
                    })
                }else{
                    let n=0
                    this.selected_sip.forEach((item,index) => {
                        this.selected_sip[index].password = isNaN(parseInt(this.sipData[0].password) + n)
                            ? '' : (parseInt(this.sipData[0].password) + n)

                        n++
                    })
                }
            },
            Save(){
                const SipBendArr = new AST_SipBendArr()
                const SipAnalogArr = new AST_SipAnalogArr()

                //遍历选中选项
                this.selected_sip.forEach(item => {
                    let sipbend = new AST_SipBend()

                    sipbend._username = item.username
                    sipbend._section = item.username
                    sipbend._secret = item.password
                    sipbend._ipaddr = item.host
                    sipbend._bipaddr = item.back_host

                    if(item.port == ''){
                        item.port = 0
                    }
                    sipbend._port = item.port

                    sipbend._vosencrypt = item.vos

                    if(item.support_codec != 'solo'){
                        item.codec_priority = '12346'
                    }
                    sipbend._allow = item.codec_priority
                    sipbend._md5 = md5(item.username+'-'+item.password)
                    SipBendArr._item.push(sipbend)


                    let sipanalog = new AST_SipAnalog()

                    sipanalog._section = item.sipnum
                    sipanalog._name = item.portname
                    sipanalog._cidnumber = item.username

                    let associated_chnnl = 'sip-'+item.username
                    sipanalog._associatedchnnl = associated_chnnl

                    sipanalog._allow = item.codec_priority
                    sipanalog._hostip = item.host
                    SipAnalogArr._item.push(sipanalog)
                })

                const SipBendSave = new AST_SipBendSave()
                SipBendSave._sip = SipBendArr
                SipBendSave._ana = SipAnalogArr

                console.log(SipBendSave)
                this.request.AGSipBendpointSave(this.save_succeed_back, this.save_error_back, SipBendSave);
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
            this.request.AGSipBendpointGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>