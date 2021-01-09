<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.sip_security}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.tls_setting}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.tls_enable_help"></span>
                    <span slot="param_name" >{{lang.tls_enable}}</span>
                    <el-checkbox slot="param" v-model="tls_enable"></el-checkbox>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.tls_verify_server_help"></span>
                    <span slot="param_name" >{{lang.tls_verify_server}}</span>
                    <el-checkbox slot="param" v-model="tls_verify_server"></el-checkbox>
                </form_item>
            </el-row>

            <el-row style="margin-bottom: 50px;">
                <form_item>
                    <span slot="param_help" v-html="lang.port_help"></span>
                    <span slot="param_name" >{{lang.port}}</span>
                    <el-input slot="param" v-model="port"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.tls_client_method_help"></span>
                    <span slot="param_name" >{{lang.tls_client_method}}</span>
                    <el-select slot="param" v-model="tls_client_method" style="width: 100%;">
                        <el-option
                                v-for="item in tls_client_method_options"
                                :label="item.label"
                                :key="item.value"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <divider_item><span slot="title">{{lang.tls_key}}</span></divider_item>

            <el-table
                    :data="keysData"
                    border
                    style="width: 100%;margin-bottom: 80px;"
                    size="mini"
                    :key="Math.random()"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">

                <el-table-column
                        :label="lang.type"
                        width="150">
                    <template slot-scope="scope">
                        <el-select
                                v-if="scope.$index == 0"
                                v-model="scope.row.type"
                                size="mini">
                            <el-option
                                v-for="item in type_options"
                                :label="lang[item.label]"
                                :key="item.value"
                                :value="item.value"></el-option>
                        </el-select>
                        <span v-else>{{scope.row.type}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.key_name"
                        width="150">
                    <template slot-scope="scope">
                        <el-input
                                ref="keyname"
                                v-if="scope.$index == 0"
                                v-model="scope.row.keyname"
                                size="mini"></el-input>
                        <span v-else>{{scope.row.keyname}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.ip_address"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-input
                                ref="host"
                                v-if="scope.$index == 0"
                                v-model="scope.row.host"
                                size="mini"></el-input>
                        <span v-else>{{scope.row.host}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.organization"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-input
                                ref="organization"
                                v-if="scope.$index == 0"
                                v-model="scope.row.organization"
                                size="mini"></el-input>
                        <span v-else>{{scope.row.organization}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.password"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-input
                                ref="password"
                                v-if="scope.$index == 0"
                                v-model="scope.row.password"
                                size="mini"></el-input>
                        <span v-else>{{scope.row.password}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        :label="lang.operation"
                        width="200">
                    <template slot-scope="scope">
                        <el-row v-if="scope.$index == 0">
                            <el-button
                                    @click="create_key"
                                    size="mini">{{lang.create}}</el-button>
                            <i style="font-size: 20px;margin-left: 10px;" class="el-icon-loading" v-show="create_loading"></i>
                        </el-row>
                        <el-row v-else>
                            <el-button type="danger" size="small" @click="delete_key(scope.row.section,scope.row.keyname)">{{lang.delete}}</el-button>
                            <form action="/service" method="post" style="display: inline-block;margin-left: 10px;">
                                <input type="hidden" name="action" value="download" />
                                <input type="hidden" name="downloadfile" :value="scope.row.keyname" />
                                <input type="hidden" name="page_name" value="sip-security" />
                                <button class="el-button el-button--primary el-button--small">
                                    {{lang.download}}
                                </button>
                            </form>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>

            <divider_item><span slot="title">{{lang.key_files}}</span></divider_item>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    {{lang.upload_the_pem_file_help}}
                                </div>
                                <span>{{lang.upload_the_pem_file}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-upload
                                    class="upload-demo"
                                    ref="pem_upload"
                                    action="/service"
                                    multiple
                                    name="uploadfile1"
                                    :data="{action:'upload',page_name:'sip-security',type:'upload'}"
                                    :file-list="file_list"
                                    :on-success="upload_file_success"
                                    :before-upload="upload_check_pem"
                                    :limit="1"
                                    style="width: 100%;">
                                <el-button type="button" style="width: 100%;">
                                    <i class="el-icon-folder-opened"></i>
                                    <span> </span>
                                    <span>{{lang.select_file}}</span>
                                </el-button>
                            </el-upload>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :lg="12">
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    {{lang.upload_the_crt_file_help}}
                                </div>
                                <span>{{lang.upload_the_crt_file}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <el-upload
                                    class="upload-demo"
                                    action="/service"
                                    ref="crt_upload"
                                    multiple
                                    name="uploadfile1"
                                    :data="{action:'upload',page_name:'sip-security',type:'upload'}"
                                    :file-list="file_list"
                                    :on-success="upload_file_success"
                                    :before-upload="upload_check_crt"
                                    :limit="1"
                                    style="width: 100%;">
                                <el-button type="button" style="width: 100%;">
                                    <i class="el-icon-folder-opened"></i>
                                    <span> </span>
                                    <span>{{lang.select_file}}</span>
                                </el-button>
                            </el-upload>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-table
                    :data="keyfilesData"
                    border
                    style="width: 100%"
                    size="small"
                    :header-cell-style="{background:'#f3f7fa',color:'#606266'}">
                <el-table-column
                        v-for="(col,index) in keyfilescol"
                        :prop="col.name"
                        :label="lang[col.title]"
                        :min-width="col.width" ></el-table-column>

                <el-table-column :label="lang.actions" width="90" >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="delete_file(scope.row.file_name)"
                                type="danger">{{lang.delete}}</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Sip-security",
        inject:['reload'],
        data(){
            return {
                tls_enable: false,
                tls_verify_server: '',
                port: 5061,
                tls_client_method: '',

                type: '',
                keyname: '',
                ip_address: '',
                organization: '',
                password: '',

                file_list: [],
                keys_exist: [],

                tls_client_method_options: [{
                    label: 'tlsv1',
                    value: 0
                },{
                    label: 'sslv2',
                    value: 1
                },{
                    label: 'sslv3',
                    value: 2
                }],

                keyfilescol: [
                    {title:'file_name',name:'file_name',width:'100'},
                    {title:'file_size',name:'file_size',width:'100'},
                ],
                keyfilesData: [],

                keysData: [{
                    type: 0,
                    keyname: '',
                    host: '',
                    organization: '',
                    password: ''
                }],

                type_options: [{
                    label: 'client',
                    value: 0
                },{
                    label: 'server',
                    value: 1
                }],

                create_loading: false,

                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _sipgen = data['_get']['_sipgen']
                let _sipkey = data['_get']['_sipkey']['_item']
                let _file = data['_get']['_file']['_item']
                this.keys_exist = _sipkey

                this.tls_enable = _sipgen['_tlsenable'] == 1 ? true : false
                this.tls_verify_server = _sipgen['_tlsdontverifyserver'] == 1 ? false : true
                this.port = _sipgen['_tlsbindport'] == 0 ? '5061' : _sipgen['_tlsbindport']
                this.tls_client_method = parseInt(_sipgen['_tlsclientmethod']) == 3 ? 0 : parseInt(_sipgen['_tlsclientmethod'])

                _sipkey.forEach(item => {
                    let type
                    if(item._type == 1){
                        type = this.lang.server
                    }else{
                        type = this.lang.client
                    }

                    let obj = {
                        section: item._section,
                        type: type,
                        keyname: item._keyname,
                        host: item._ipaddress,
                        organization: item._organizetion,
                        password: item._password
                    }
                    this.keysData.push(obj)
                })

                _file.forEach(item => {
                    let obj = {
                        file_name: item._filename,
                        file_size: item._filesize
                    }

                    this.keyfilesData.push(obj)
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const SipGen = new AST_SipGen()
                SipGen._tlsbindport = this.port
                SipGen._tlsenable = this.tls_enable == true ? 1 : 0
                SipGen._tlsdontverifyserver = this.tls_verify_server == false ? 1 : 0
                SipGen._tlsclientmethod = this.tls_client_method

                const SipSecSave = new AST_SipSecSave()
                SipSecSave._sipgen = SipGen

                console.log(SipSecSave)
                this.request.AGSipSecuritySave(this.save_succeed_back, this.save_error_back, SipSecSave)
            },
            save_succeed_back(data){
                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: '80'
                    })
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
            },

            check_key(){
                var rex1=/^[-_+.<>&0-9a-zA-Z]{1,32}$/i;
                if(!rex1.test(this.keysData[0].keyname)) {
                    this.$message({
                        message: this.lang.check_keyname,
                        type: 'error',
                        offset: '80'
                    })
                    this.$refs.keyname.focus()
                    return false
                }

                var rex2=/^(([a-z0-9](w|-){0,61}?[a-z0-9]|[a-z0-9]).){1,}(aero|arpa|asia|biz|cat|com|coop|co|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])(.[a-z][a-z]){0,1}$/i;
                var rex4=/^((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\.){3}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)$/i;
                if(!rex2.test(this.keysData[0].host) && !rex4.test(this.keysData[0].host)) {
                    this.$message({
                        message: this.lang.check_domain,
                        type: 'error',
                        offset: '80'
                    })
                    this.$refs.host.focus()
                    return false
                }

                if(!rex1.test(this.keysData[0].organization)) {
                    this.$message({
                        message: this.lang.check_organization,
                        type: 'error',
                        offset: '80'
                    })
                    this.$refs.organization.focus()
                    return false
                }

                var rex3=/^[-_+.<>&0-9a-zA-Z]{4,32}$/i;
                if(!rex3.test(this.keysData[0].password)) {
                    this.$message({
                        message: this.lang.check_diypwd,
                        type: 'error',
                        offset: '80'
                    })
                    this.$refs.password.focus()
                    return false
                }

                let server_exist_flag = false
                let server_password = ''
                for(let i=0;i<this.keys_exist.length;i++){
                    //Server exist
                    if(this.keys_exist[i]._type == 1 && this.keysData[0].type == 1){
                        this.$message({
                            message: this.lang.TLS_server_existed_help,
                            type: 'error',
                            offset: '80'
                        })

                        return false
                    }

                    if(this.keys_exist[i]._type == 1){
                        server_password = this.keys_exist[i]._password
                        server_exist_flag = true
                    }
                }

                //Please create the server first
                if(!server_exist_flag && this.keysData[0].type == 0){
                    this.$message({
                        message: this.lang.TLS_create_server_help,
                        type: 'error',
                        offset: '80'
                    })

                    return false
                }

                //client password must be same with Server
                if(server_exist_flag && server_password != this.keysData[0].password){
                    this.$message({
                        message: this.lang.TLS_key_password_same_as_server,
                        type: 'error',
                        offset: '80'
                    })
                    this.$refs.password.focus()
                    return false
                }

                return true
            },
            create_key(){
                if(this.check_key()){
                    this.create_loading = true
                    let SipKey = new AST_SipKey()

                    SipKey._keyname = this.keysData[0].keyname
                    SipKey._ipaddress = this.keysData[0].host
                    SipKey._organizetion = this.keysData[0].organization
                    SipKey._password = this.keysData[0].password
                    SipKey._type = this.keysData[0].type

                    let section = this.keysData[0].type + '-' + this.keysData[0].keyname
                    SipKey._section = section

                    console.log(SipKey)
                    this.request.AGAlgSecSettingCreateKey(this.create_succeed_back, this.create_error_back, SipKey)
                }
            },
            create_succeed_back(data){
                this.create_loading = false
                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.created_successfully,
                        type: 'success',
                        offset: '80'
                    })

                    this.reload()
                }else{
                    this.$message({
                        message: this.lang.created_failed,
                        type: 'error',
                        offset: '80'
                    })
                }
            },
            create_error_back(){
                this.$message({
                    message: this.lang.created_failed,
                    type: 'error',
                    offset: '80'
                })

                this.create_loading = false
            },

            delete_key(section,keyname){
                this.$confirm(this.lang.delete_confirm + keyname)
                    .then(_ => {
                        this.request.AGAlgSecSettingDeleteKey(this.delete_key_succeed_back, this.delete_key_error_back, section)
                    })
                    .catch(_ => {});
            },
            delete_key_succeed_back(data){
                this.$message({
                    message: this.lang.successfully_deleted,
                    type: 'success',
                    offset: '80'
                })

                this.reload()
            },
            delete_key_error_back(){
                this.$message({
                    message: this.lang.failed_to_delete,
                    type: 'error',
                    offset: '80'
                })
            },
            upload_check_pem(file, fileList){
                if(file.name.indexOf('.pem') == -1){
                    this.$message({
                        message: this.lang.upload_pem_help,
                        type: "error",
                        offset: '80'
                    })
                    return false
                }
            },
            upload_check_crt(file, fileList){
                if(file.name.indexOf('.crt') == -1){
                    this.$message({
                        message: this.lang.upload_crt_help,
                        type: "error",
                        offset: '80'
                    })
                    return false
                }
            },
            delete_file(filename){
                this.$confirm(this.lang.delete_confirm + filename)
                    .then(_ => {
                        this.request.AGAlgSecSettingDeleteFile(this.delete_file_succeed_back, this.delete_file_error_back, filename)
                    })
                    .catch(_ => {});
            },
            delete_file_succeed_back(data){
                this.$message({
                    message: this.lang.successfully_deleted,
                    type: 'success',
                    offset: '80'
                })

                this.reload()
            },
            delete_file_error_back(){
                this.$message({
                    message: this.lang.failed_to_delete,
                    type: 'error',
                    offset: '80'
                })
            },
            upload_file_success(){
                this.$message({
                    message: this.lang.upload_successful,
                    type: 'success',
                    offset: '80'
                })

                this.reload()
            }
        },
        created() {
            this.debug = debuger('voip-sipsecurity')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGSipSecurityGet(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>