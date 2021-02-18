<template>
    <el-form>
        <div class="page_title">
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

        <el-row style="width: 97%;margin:auto;margin-top:20px;">
            <div style="display: inline-block;width: 300px;float: left;">
                <el-row :gutter="10">
                    <el-col :span="16">
                        <el-upload
                                ref="file_upload"
                                action="/service"
                                name="uploadfile1"
                                :auto-upload="false"
                                :on-change="file_change"
                                limit="1">
                            <el-button type="button" size="small" style="width: 100%">
                                <i class="el-icon-folder-opened"></i>
                                <span> </span>
                                <span>{{lang.select_file}}</span>
                            </el-button>
                        </el-upload>
                    </el-col>

                    <el-col :span="8">
                        <el-button size="small"
                                   type="primary"
                                   style="min-width: 80px"
                                   @click="import_file"
                        >{{lang.upload}}</el-button>
                    </el-col>
                </el-row>
            </div>

            <div style="display: inline-block;float: left;">
                <form action='/service' method='post' wnctype='multipart/form-data'>
                    <input type='hidden' name='action' value='download' />
                    <input type='hidden' name='downloadfile' value='downloadfile' />
                    <input type='hidden' name='page_name' value='sip-bendpoints' />
                    <button class="el-button el-button--primary el-button--small">
                        {{lang.download_samples}}
                    </button>
                </form>
            </div>
        </el-row>

        <el-card shadow="never" style="margin:auto;margin-top:20px;margin-bottom: 50px;" :style=$store.state.page.card_list_width>
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
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Sip-bendpoints",
        inject: ['reload'],
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

                used_sip_arr: [],
                already_bind_sip_arr: [],
                autopassword_checked: false,
                selected_sip: [],//保存多选框选中的选项

                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods:{
            file_change(file){
                if(typeof FileReader == 'undefined'){
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: this.lang.browser_warning,
                        type: 'error',
                        offset: 80
                    })

                    return false
                }

                if(file.name.indexOf('.txt') == -1){
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: this.lang.fire_upload_help,
                        type: 'error',
                        offset: 80
                    })

                    this.$refs.file_upload.clearFiles()
                    return false
                }
            },
            import_file(){
                const file_info = document.getElementsByName('uploadfile1')[0].files[0]

                let that = this
                const reader = new FileReader()
                reader.readAsText(file_info)
                reader.onload=function(f){
                    let info = this.result
                    let info_arr = info.split(";")
                    for(let i=0;i<info_arr.length-1;i++){
                        that.selected_sip.forEach((item,index) => {
                            let each = info_arr[i].split(",")
                            if(each[0] == index+1){
                                for(let j=0;j<each.length;j++){
                                    each[j] = each[j].replace(/[\r\n]/g,"")
                                    switch(j<each.length){
                                        case j==1:
                                            that.selected_sip[index].username = each[j]
                                            break
                                        case j==2:
                                            that.selected_sip[index].password = each[j]
                                            break
                                        case j==3:
                                            that.selected_sip[index].host = each[j]
                                            break
                                        case j==4:
                                            that.selected_sip[index].back_host = each[j]
                                            break
                                        case j==5:
                                            that.selected_sip[index].port = each[j]
                                            break
                                        case j==6:
                                            each[j] = each[j].toLowerCase()
                                            if(each[j] == 'no'){
                                                that.selected_sip[index].vos = each[j]
                                            }else if(each[j] == 'yes'){
                                                that.selected_sip[index].vos = each[j]
                                            }
                                            break
                                        case j==7:
                                            each[j] = each[j].toLowerCase()
                                            if(each[j]=='g.711 u-law' || each[j]=='u-law' || each[j]=='ulaw' || each[j]=='g.711u-law'){
                                                that.selected_sip[index].codec_priority = 'ulaw'
                                            }else if(each[j]=='g.711 a-law' || each[j]=='a-law' || each[j]=='alaw' || each[j]=='g.711a-law'){
                                                that.selected_sip[index].codec_priority = 'alaw'
                                            }else if(each[j]=='g.729' || each[j]=='g729'){
                                                that.selected_sip[index].codec_priority = 'g729'
                                            }else if(each[j]=='g.722' || each[j]=='g722'){
                                                that.selected_sip[index].codec_priority = 'g722'
                                            }else{
                                                that.selected_sip[index].codec_priority = each[j]
                                            }
                                            break
                                        case j==8:
                                            each[j] = each[j].toLowerCase();
                                            if(each[j]=="all" || each[j]=="all"){
                                                that.selected_sip[index].support_codec = 'all'
                                            }else if(each[j]=="alone" || each[j]=="solo"){
                                                that.selected_sip[index].support_codec = 'solo'
                                            }
                                            break
                                    }
                                }
                            }
                        })
                    }
                }
            },
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
                this.used_sip_arr = data['_sipbend']['_sections']['_item']
                this.already_bind_sip_arr = data['_sipbend']['_ana']['_item']

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
                //判断是否覆盖存在的sip
                let repeat_sip_arr = []

                let username = this.sipData[0].username
                let username_arr = username.match(/\d+/g)
                let username_str = username_arr[username_arr.length - 1]
                let new_username = Number(username_str)

                let password = this.sipData[0].password
                let password_arr = password.match(/\d+/g)
                let password_str = password_arr[password_arr.length - 1]
                let new_password = Number(password_str)

                this.selected_sip.forEach((item,index) => {
                    this.selected_sip[index].username = username.replace(username_str,new_username+'')
                    new_username += 1


                    if(this.autopassword_checked) {
                        this.selected_sip[index].password = password.replace(password_str,new_password+'')
                        new_password += 1
                    }else{
                        this.selected_sip[index].password = password
                    }

                    this.selected_sip[index].host = this.sipData[0].host
                    this.selected_sip[index].back_host = this.sipData[0].back_host
                    this.selected_sip[index].port = this.sipData[0].port
                    this.selected_sip[index].vos = this.sipData[0].vos
                    this.selected_sip[index].codec_priority = this.sipData[0].codec_priority
                    this.selected_sip[index].support_codec = this.sipData[0].support_codec

                    for(let i=0;i<this.used_sip_arr.length;i++){
                        if(this.selected_sip[index].username == this.used_sip_arr[i]._section){
                            repeat_sip_arr.push(this.selected_sip[index].username)
                        }
                    }
                })

                if(repeat_sip_arr.length > 0) {
                    let message = "SIP " + repeat_sip_arr.join(',') + " " + this.lang.sip_overwrite_confirm

                    this.$message({
                        message: message,
                        type: 'warning',
                        offset: 80,
                        duration: 5000
                    });
                }
            },
            autopassword(checked){
                let password = this.sipData[0].password
                let password_arr = password.match(/\d+/g)
                let password_str = password_arr[password_arr.length - 1]
                let new_password = Number(password_str)

                if(checked){
                    this.selected_sip.forEach((item,index) => {
                        this.selected_sip[index].password = password.replace(password_str,new_password+'')
                        new_password += 1
                    })

                    this.autopassword_checked = true
                }else{
                    this.selected_sip.forEach((item,index) => {
                        this.selected_sip[index].password = password
                    })

                    this.autopassword_checked = false
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

                //判断是否通道是否绑定了sip
                let bind_port_arr = []
                this.selected_sip.forEach(item => {
                    for(let i=0;i<this.already_bind_sip_arr.length;i++){
                        if(item.sipnum == this.already_bind_sip_arr[i]._channel && this.already_bind_sip_arr[i]._associatedchnnl != ''){
                            bind_port_arr.push(item.sipnum)
                        }
                    }
                })

                if(bind_port_arr.length > 0) {
                    let message = bind_port_arr.join(',') + " " + this.lang.port_binding_overwrite_confirm

                    this.$confirm(message)
                        .then(_ => {
                            this.request.AGSipBendpointSave(this.save_succeed_back, this.save_error_back, SipBendSave)
                        })
                        .catch(_ => {
                        })
                }else{
                    this.request.AGSipBendpointSave(this.save_succeed_back, this.save_error_back, SipBendSave)
                }
            },
            save_succeed_back(data){
                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: 80
                    })

                    this.reload()
                }else{
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: 80
                    })
                }
            },
            save_error_back(){
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: 80
                })
            }
        },
        created() {
            this.debug = debuger('voip-sip-bendpoints')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGSipBendpointGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>