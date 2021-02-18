<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            :rules="rules"
            :model="ruleForm"
            size="small">

        <div class="page_title">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.routing_groups}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="submitValidator('ruleForm')">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" v-loading="loading" style="margin:auto;padding: 20px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.routing_groups}}</span></divider_item>

            <el-row>
                <form_item v-bind:param="'group_name'">
                    <span slot="param_help" v-html="lang.group_name_help"></span>
                    <span slot="param_name" >{{lang.group_name}}</span>
                    <el-input slot="param" v-model="ruleForm.group_name"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.type_help"></span>
                    <span slot="param_name" >{{lang.type}}</span>
                    <el-select slot="param" v-model="type" style="width: 100%">
                        <el-option
                                v-for="item in type_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.policy_help"></span>
                    <span slot="param_name" >{{lang.policy}}</span>
                    <el-select slot="param" v-model="policy" style="width: 100%">
                        <el-option :label="lang.ascending" :value=0 :key="0"></el-option>
                        <el-option :label="lang.descending" :value=1 :key="1"></el-option>
                        <el-option v-show="type == 1" :label="lang.roundrobin" :value=2 :key="2"></el-option>
                        <el-option v-show="type == 1" :label="lang.reverse_roundrobin" :value=3 :key="3"></el-option>
                        <el-option v-show="type == 0" :label="lang.ringall" :value=4 :key="4"></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <el-row>
                <el-col :lg="24" >
                    <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" :open-delay=200>
                                <div slot="content">
                                    <span v-html="lang.members_help"></span>
                                </div>
                                <span>{{lang.members}}</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">
                            <slot name="param">
                                <el-row v-if="type == 1">
                                    <el-checkbox :indeterminate="isIndeterminate_fxo"
                                                 v-model="checkFXOAll"
                                                 @change="handleFXOCheckAllChange">{{lang.all}}</el-checkbox>
                                    <div style="margin: 15px 0;"></div>
                                    <el-form-item :prop="'fxo_members_selected'">
                                        <el-checkbox-group v-model="ruleForm.fxo_members_selected" @change="handleCheckedFXOChange">
                                            <el-row>
                                                <el-col :lg="4" :sm="6" :xs="12" v-for="item in fxo_members">
                                                    <el-checkbox :label="item" :key="item">{{item}}</el-checkbox>
                                                </el-col>
                                            </el-row>
                                        </el-checkbox-group>
                                    </el-form-item>
                                </el-row>

                                <el-row v-if="type == 0">
                                    <el-checkbox :indeterminate="isIndeterminate_sip"
                                                 v-model="checkSIPAll"
                                                 @change="handleSIPCheckAllChange">{{lang.all}}</el-checkbox>
                                    <div style="margin: 15px 0;"></div>
                                    <el-form-item :prop="'sip_members_selected'">
                                        <el-checkbox-group v-model="ruleForm.sip_members_selected" @change="handleCheckedSIPChange">
                                            <el-row>
                                                <el-col :lg="4" :sm="6" :xs="12" v-for="item in sip_members">
                                                    <el-checkbox :label="item" :key="item">{{item}}</el-checkbox>
                                                </el-col>
                                            </el-row>
                                        </el-checkbox-group>
                                    </el-form-item>
                                </el-row>
                            </slot>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "add",
        data() {
            var validateGroup_name = (rule, value, callback) => {
                for(let i=0;i<this.used_groups.length;i++){
                    if(this.$route.params.group_name == this.used_groups[i]._section) continue
                    if(value == this.used_groups[i]._section){
                        callback(new Error('Already exist.'))
                        return false
                    }
                }

                if(value == ''){
                    callback(new Error('Must set.'))
                    return false
                }else{
                    callback()
                }
            }

            var validateFXOMember = (rule, value, callback) => {
                if(this.type == 1){//FXO
                    if(value.length == 0){
                        callback(new Error('Must set.'))
                        return false
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }

            var validateSIPMember = (rule, value, callback) => {
                if(this.type == 0){//SIP
                    if(value.length == 0){
                        callback(new Error('Must set.'))
                        return false
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }
            return {
                ruleForm: {
                    group_name: '',
                    fxo_members_selected: [],
                    sip_members_selected: [],
                },
                rules: {
                    group_name: [
                        { validator: validateGroup_name, trigger: 'blur' }
                    ],
                    fxo_members_selected: [
                        { validator: validateFXOMember, trigger: 'change' }
                    ],
                    sip_members_selected: [
                        { validator: validateSIPMember, trigger: 'change' }
                    ]
                },

                type: 1,
                policy: '',
                order: 1,

                fxo_members: [],
                isIndeterminate_fxo: false,
                checkFXOAll: false,

                sip_members: [],
                isIndeterminate_sip: false,
                checkSIPAll: false,

                type_options: [{
                    label: 'FXO',
                    value: 1
                },{
                    label: 'SIP',
                    value: 0
                }],

                used_groups: [],

                loading: false,
                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let is_new = this.$route.params.group_name == undefined ? true : false

                let _group = data['_get']['_group']
                let _sip = data['_get']['_sip']['_item']
                let _ana = data['_get']['_ana']['_item']
                this.used_groups = data['_get']['_groups']['_item']

                if(!is_new){
                    this.ruleForm.group_name = _group['_section']

                    this.type = parseInt(_group['_type'])
                    this.policy = parseInt(_group['_policy'])
                    this.order = _group['_order']

                    _group['_members'].split(',').forEach(item => {
                        if(this.type == 1) {
                            this.ruleForm.fxo_members_selected.push(item)
                        }else{
                            this.ruleForm.sip_members_selected.push(item)
                        }
                    })
                }

                _sip.forEach(item => {
                    this.sip_members.push('sip-'+item._section)
                })

                _ana.forEach(item => {
                    if(item._signalling == 1)
                        this.fxo_members.push('fxo-'+item._channel)
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            submitValidator(formName){
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        this.Save()
                    }else{
                        return false
                    }
                })
            },
            Save(){
                this.loading = true

                let RoutingGroup = new AST_RoutingGroup()

                RoutingGroup._order = this.order
                RoutingGroup._type = this.type
                RoutingGroup._policy = this.policy

                let members = ''
                if(this.type == 0){
                    members = this.ruleForm.sip_members_selected.join(',')
                }else{
                    members = this.ruleForm.fxo_members_selected.join(',')
                }
                RoutingGroup._members = members
                RoutingGroup._section = ''

                let group_name = this.$route.params.group_name == undefined ? '' : this.$route.params.group_name

                this.request.AGRoutingGroupSave(this.save_succeed_back, this.save_error_back, group_name, this.ruleForm.group_name, RoutingGroup)
            },
            save_succeed_back(data){
                this.loading = false

                if(data['_result'] == 0) {
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: 80
                    })

                    this.$router.push('/Routing/Group')
                }else{
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: 80
                    })
                }
            },
            save_error_back(data){
                this.loading = false

                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: 80
                })
            },

            handleFXOCheckAllChange(checked){
                this.ruleForm.fxo_members_selected = checked ? this.fxo_members : []
                this.isIndeterminate_fxo = false
            },
            handleCheckedFXOChange(value){
                let checkedcount = value.length
                this.checkFXOAll = checkedcount == this.ruleForm.fxo_members_selected.length
                this.isIndeterminate_fxo = checkedcount > 0 && checkedcount < this.fxo_members.length
            },
            handleSIPCheckAllChange(checked){
                this.ruleForm.sip_members_selected = checked ? this.sip_members : []
                this.isIndeterminate_sip = false
            },
            handleCheckedSIPChange(value){
                let checkedcount = value.length
                this.checkSIPAll = checkedcount == this.ruleForm.sip_members_selected.length
                this.isIndeterminate_sip = checkedcount > 0 && checkedcount < this.sip_members.length
            }
        },
        created() {
            this.debug = debuger('routing-group-edit')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                if (this.$route.params.group_name != undefined) {
                    this.request.AGRoutingGroupGetOne(this.show_succeed_back, this.show_error_back, this.$route.params.group_name)
                } else {
                    this.request.AGRoutingGroupGetNew(this.show_succeed_back, this.show_error_back)
                }
            }
        }
    }
</script>

<style scoped>

</style>