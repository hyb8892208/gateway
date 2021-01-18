<template>
    <el-form>
        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.fxs_batch_bind_sip}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;margin-top:20px;margin-bottom: 50px;" :style=$store.state.page.card_list_width>
            <el-table
                    :data="chnData"
                    border
                    style="width: 100%"
                    size="mini"
                    @selection-change="select_channel"
                    :key="Math.random()"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        type="selection"
                        :selectable="showFirstChcekbox"
                        width="55">
                </el-table-column>

                <el-table-column
                        :label="lang.port"
                        width="100">
                    <template slot-scope="scope" v-if="scope.$index != 0" >{{ scope.row.port }}</template>
                </el-table-column>

                <el-table-column
                        min-width="150">
                    <template slot="header" slot-scope="scope">
                        <span style="margin-right: 20px;">{{lang.forward_number}}</span>
                        <el-button type="primary" size="mini" @click="forward_number_increment">{{lang.increment}}</el-button>
                        <el-button type="primary" size="mini" @click="forward_number_copy">{{lang.copy}}</el-button>
                    </template>

                    <template slot-scope="scope">
                        <el-input v-model="scope.row.forward_number" size="mini"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        min-width="150">
                    <template slot="header" slot-scope="scope">
                        <span style="margin-right: 20px;">{{lang.sip_endpoints}}</span>
                        <el-button type="primary" size="mini" @click="sip_endpoint_increment">{{lang.increment}}</el-button>
                        <el-button type="primary" size="mini" @click="sip_endpoint_copy">{{lang.copy}}</el-button>
                    </template>

                    <template slot-scope="scope">
                        <el-select v-model="scope.row.sip_endpoint" size="mini" style="width: 100%">
                            <el-option
                                    v-for="item in sip_endpoint_options"
                                    :label="item.value"
                                    :key="item.value"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column
                        min-width="150">
                    <template slot="header" slot-scope="scope">
                        <span style="margin-right: 20px;">{{lang.callerid}}</span>
                        <el-button type="primary" size="mini" @click="callerid_increment">{{lang.increment}}</el-button>
                        <el-button type="primary" size="mini" @click="callerid_copy">{{lang.copy}}</el-button>
                    </template>

                    <template slot-scope="scope">
                        <el-input v-model="scope.row.callerid" size="mini"></el-input>
                    </template>
                </el-table-column>
            </el-table>

            <el-row style="margin: 10px;">
                <el-button type="primary"
                           @click="batch_all"
                           size="small">{{lang.batch}}</el-button>
                <el-button style="margin-left: 10px;"
                           type="primary"
                           @click="fixed_all"
                           size="small">{{lang.fixed}}</el-button>
            </el-row>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Batch-create-rules",
        inject: ['reload'],
        data() {
            return {
                chnData: [{
                    channel: '',
                    port: '',
                    forward_number: '',
                    sip_endpoint: 'none',
                    callerid: '',
                    order: ''
                }],

                selected_chnData: null,

                sip_endpoint_options: [{
                    label: 'None',
                    value: 'none'
                }],

                debug: false,
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
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                const sip_data = data['_get']['_sip']['_item']
                const analog_data = data['_get']['_ana']['_item']

                let i = 1
                let chan_type = ''
                analog_data.forEach(item => {
                    chan_type = ''
                    if(item._signalling == 1){
                        if(this.$store.state.FlexRoutingSw == 0) return true
                        chan_type = 'FXS'
                    }else if(item._signalling == 2){
                        chan_type = 'FXO'
                    }else{
                        return true
                    }

                    let obj = {
                        channel: item._channel,
                        port: chan_type+'-'+item._channel,
                        forward_number: '',
                        sip_endpoint: 'none',
                        callerid: '',
                        order: i
                    }

                    i++

                    this.chnData.push(obj)
                })

                sip_data.forEach(item => {
                    let obj = {
                        label: 'sip-'+item._section,
                        value: 'sip-'+item._section
                    }

                    this.sip_endpoint_options.push(obj)
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            select_channel(selection){
                console.log(selection)
                this.selected_chnData = selection
            },
            forward_number_increment(){
                let n = 1
                this.selected_chnData.forEach((item, index) => {
                    this.selected_chnData[index].forward_number = isNaN (parseInt(this.chnData[0].forward_number) + n)
                        ? '' : (parseInt(this.chnData[0].forward_number) + n -1)
                    n++
                })
            },
            forward_number_copy(){
                this.selected_chnData.forEach((item, index) => {
                    this.selected_chnData[index].forward_number = isNaN (parseInt(this.chnData[0].forward_number))
                        ? '' : (parseInt(this.chnData[0].forward_number))
                })
            },
            sip_endpoint_increment(){
                let n = 1
                this.selected_chnData.forEach((item, index) => {
                    this.sip_endpoint_options.forEach((i,ind) => {
                        let value = ''
                        if(i.value == 'none' || this.sip_endpoint_options[ind + n -1] == undefined) {
                            value = 'none'
                        }else{
                            value = this.sip_endpoint_options[ind + n -1].value
                        }

                        if(this.chnData[0].sip_endpoint == i.value && this.selected_chnData[index] != undefined){
                            this.selected_chnData[index].sip_endpoint = value
                        }
                    })
                    n++
                })
            },
            sip_endpoint_copy(){
                this.selected_chnData.forEach((item, index) => {
                    this.selected_chnData[index].sip_endpoint = this.chnData[0].sip_endpoint
                })
            },
            callerid_increment(){
                let n = 1
                this.selected_chnData.forEach((item, index) => {
                    this.selected_chnData[index].callerid = isNaN(parseInt(this.chnData[0].callerid) + n)
                        ? '' : (parseInt(this.chnData[0].callerid) + n -1)
                    n++
                })
            },
            callerid_copy(){
                this.selected_chnData.forEach((item, index) => {
                    this.selected_chnData[index].callerid = isNaN(parseInt(this.chnData[0].callerid))
                        ? '' : (parseInt(this.chnData[0].callerid))
                })
            },
            batch_all(){
                let n = 1

                this.selected_chnData.forEach((item,index) => {
                    this.selected_chnData[index].forward_number = isNaN (parseInt(this.chnData[0].forward_number) + n)
                        ? '' : (parseInt(this.chnData[0].forward_number) + n -1)

                    this.sip_endpoint_options.forEach((i,ind) => {
                        let value = ''
                        if(i.value == 'none' || this.sip_endpoint_options[ind + n -1] == undefined) {
                           value = 'none'
                        }else{
                           value = this.sip_endpoint_options[ind + n -1].value
                        }

                        if(this.chnData[0].sip_endpoint == i.value && this.selected_chnData[index] != undefined){
                            this.selected_chnData[index].sip_endpoint = value
                        }
                    })

                    this.selected_chnData[index].callerid = isNaN(parseInt(this.chnData[0].callerid) + n)
                        ? '' : (parseInt(this.chnData[0].callerid) + n -1)
                    n++
                })
            },
            fixed_all(){
                this.selected_chnData.forEach((item,index) => {
                    this.selected_chnData[index].forward_number = isNaN (parseInt(this.chnData[0].forward_number))
                        ? '' : (parseInt(this.chnData[0].forward_number))

                    this.selected_chnData[index].sip_endpoint = this.chnData[0].sip_endpoint

                    this.selected_chnData[index].callerid = isNaN(parseInt(this.chnData[0].callerid))
                        ? '' : (parseInt(this.chnData[0].callerid))
                })
            },

            Save(){
                let SipFxoBindingSaveArr = new AST_SipFxoBindingSaveArr();

                console.log(this.selected_chnData)
                this.selected_chnData.forEach(item => {
                    let chan2sip = ''
                    let sip2chan = ''
                    if(item.port.indexOf('FXS') > -1){
                        chan2sip = 'fxs2sip-'
                        sip2chan = 'sip2fxs-'
                    }else{
                        chan2sip = 'fxo2sip-'
                        sip2chan = 'sip2fxo-'
                    }

                    let order = parseInt(item.order)
                    let order1 = 2*order - 1
                    let order2 = 2*order

                    const fxosipbinding = new AST_SipFxoBindingSave()
                    fxosipbinding._name = chan2sip+item.channel
                    fxosipbinding._order = order1
                    fxosipbinding._forwardnumber = item.forward_number
                    fxosipbinding._callerid = item.callerid
                    fxosipbinding._associatedchnnl = item.sip_endpoint

                    SipFxoBindingSaveArr._item.push(fxosipbinding)

                    const sipfxobinding = new AST_SipFxoBindingSave()
                    sipfxobinding._name = sip2chan+item.channel
                    sipfxobinding._order = order2
                    sipfxobinding._forwardnumber = item.forward_number
                    sipfxobinding._callerid = item.callerid
                    sipfxobinding._associatedchnnl = item.sip_endpoint

                    SipFxoBindingSaveArr._item.push(sipfxobinding)
                })

                console.log(SipFxoBindingSaveArr)
                this.request.AGSipFxoBindingSave(this.save_succeed_back, this.save_error_back, SipFxoBindingSaveArr)
            },
            save_succeed_back(data){
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
            save_error_back(){
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },
        created() {
            this.debug = debuger('routing-batch-create-rules')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGSipFxoBindingGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>