<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.general}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            type="primary"
                            size="small"
                            @click="Save()"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>

            <divider_item><span slot="title">{{lang.snmp_parameter}}</span></divider_item>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.snmp_enable_help"></span>
                    <span slot="param_name" >{{lang.snmp_enable}}</span>
                    <el-checkbox slot="param" v-model="enable"></el-checkbox>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.system_contact_help"></span>
                    <span slot="param_name" >{{lang.system_contact}}</span>
                    <el-input slot="param" v-model="system_contact"></el-input>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.system_location_help"></span>
                    <span slot="param_name" >{{lang.system_location}}</span>
                    <el-input slot="param" v-model="system_location"></el-input>
                </form_item>

                <form_item>
                    <span slot="param_help" v-html="lang.support_snmp_version_help"></span>
                    <span slot="param_name" >{{lang.support_snmp_version}}</span>
                    <el-checkbox-group slot="param" v-model="support_snmp_version">
                        <el-checkbox label="v1"></el-checkbox>
                        <el-checkbox label="v2c"></el-checkbox>
                        <el-checkbox label="v3"></el-checkbox>
                    </el-checkbox-group>
                </form_item>
            </el-row>

            <el-row>
                <form_item>
                    <span slot="param_help" v-html="lang.snmp_version_help"></span>
                    <span slot="param_name" >{{lang.snmp_version}}</span>
                    <el-select slot="param" v-model="snmp_version" style="width: 100%;">
                        <el-option label="v1" :value=0 key=0></el-option>
                        <el-option label="v2c" :value=1 key=1></el-option>
                        <el-option label="v3" :value=2 key=2></el-option>
                    </el-select>
                </form_item>
            </el-row>

            <div v-if="snmp_version == '0'">

                <divider_item><span slot="title">{{lang.community_configuration}}(V1)</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.security_name_help"></span>
                        <span slot="param_name" >{{lang.security_name}}</span>
                        <el-input slot="param" v-model="security_name_v1"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.souce_help"></span>
                        <span slot="param_name" >{{lang.souce}}</span>
                        <el-input slot="param" v-model="souce_v1"></el-input>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.community_help"></span>
                        <span slot="param_name" >{{lang.community}}</span>
                        <el-input slot="param" v-model="community_v1"></el-input>
                    </form_item>
                </el-row>

                <divider_item><span slot="title">{{lang.group_configuration}}(V1)</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.group_help"></span>
                        <span slot="param_name" >{{lang.group}}</span>
                        <el-input slot="param" v-model="group_v1"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.security_name_help"></span>
                        <span slot="param_name" >{{lang.security_name}}</span>
                        <el-input slot="param" v-model="security_name_v1" disabled ></el-input>
                    </form_item>
                </el-row>

                <divider_item><span slot="title">{{lang.view_configuration}}(V1)</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.viewname_help"></span>
                        <span slot="param_name" >{{lang.viewname}}</span>
                        <el-input slot="param" v-model="viewname_v1"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.viewtype_help"></span>
                        <span slot="param_name" >{{lang.viewtype}}</span>

                        <el-select slot="param" v-model="viewtype_v1" style="width: 100%">
                            <el-option label="included" :value=0 key="0"></el-option>
                            <el-option label="excluded" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.viewsubtree_help"></span>
                        <span slot="param_name" >{{lang.viewsubtree}}</span>
                        <el-input slot="param" v-model="viewsubtree_v1"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.viewmask_help"></span>
                        <span slot="param_name" >{{lang.viewmask}}</span>
                        <el-input slot="param" v-model="viewmask_v1"></el-input>
                    </form_item>
                </el-row>

                <divider_item><span slot="title">{{lang.access_configuration}}(V1)</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.group_help"></span>
                        <span slot="param_name" >{{lang.group}}</span>
                        <el-input slot="param" v-model="group_v1" disabled ></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.read_help"></span>
                        <span slot="param_name" >{{lang.read}}</span>
                        <el-select slot="param" v-model="group_v1" style="width: 100%">
                            <el-option :label="viewname_v1" :value=0 key="0"></el-option>
                            <el-option :label="'none'" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.write_help"></span>
                        <span slot="param_name" >{{lang.write}}</span>
                        <el-select slot="param" v-model="write_v1" style="width: 100%">
                            <el-option :label="viewname_v1" :value=0 key="0"></el-option>
                            <el-option :label="'none'" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.notify_help"></span>
                        <span slot="param_name" >{{lang.notify}}</span>
                        <el-select slot="param" v-model="notify_v1" style="width: 100%">
                            <el-option :label="viewname_v1" :value=0 key="0"></el-option>
                            <el-option :label="'none'" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>
                </el-row>
            </div>

            <div v-if="snmp_version == '1'">

                <divider_item><span slot="title">{{lang.community_configuration}}(V2)</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.security_name_help"></span>
                        <span slot="param_name" >{{lang.security_name}}</span>
                        <el-input slot="param" v-model="security_name_v2"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.souce_help"></span>
                        <span slot="param_name" >{{lang.souce}}</span>
                        <el-input slot="param" v-model="souce_v2"></el-input>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.community_help"></span>
                        <span slot="param_name" >{{lang.community}}</span>
                        <el-input slot="param" v-model="community_v2"></el-input>
                    </form_item>
                </el-row>

                <divider_item><span slot="title">{{lang.group_configuration}}(V2)</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.group_help"></span>
                        <span slot="param_name" >{{lang.group}}</span>
                        <el-input slot="param" v-model="group_v2"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.security_name_help"></span>
                        <span slot="param_name" >{{lang.security_name}}</span>
                        <el-input slot="param" v-model="security_name_v2" disabled ></el-input>
                    </form_item>
                </el-row>

                <divider_item><span slot="title">{{lang.view_configuration}}(V2)</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.viewname_help"></span>
                        <span slot="param_name" >{{lang.viewname}}</span>
                        <el-input slot="param" v-model="viewname_v2"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.viewtype_help"></span>
                        <span slot="param_name" >{{lang.viewtype}}</span>
                        <el-select slot="param" v-model="viewtype_v2" style="width: 100%">
                            <el-option label="included" :value=0 key="0"></el-option>
                            <el-option label="excluded" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.viewsubtree_help"></span>
                        <span slot="param_name" >{{lang.viewsubtree}}</span>
                        <el-input slot="param" v-model="viewsubtree_v2"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.viewmask_help"></span>
                        <span slot="param_name" >{{lang.viewmask}}</span>
                        <el-input slot="param" v-model="viewmask_v2"></el-input>
                    </form_item>
                </el-row>

                <divider_item><span slot="title">{{lang.access_configuration}}(V2)</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.group_help"></span>
                        <span slot="param_name" >{{lang.group}}</span>
                        <el-input slot="param" v-model="group_v2" disabled ></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.read_help"></span>
                        <span slot="param_name" >{{lang.read}}</span>
                        <el-select slot="param" v-model="read_v2" style="width: 100%">
                            <el-option :label="viewname_v2" :value=0 key="0"></el-option>
                            <el-option :label="'none'" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.write_help"></span>
                        <span slot="param_name" >{{lang.write}}</span>
                        <el-select slot="param" v-model="write_v2" style="width: 100%">
                            <el-option :label="viewname_v2" :value=0 key="0"></el-option>
                            <el-option :label="'none'" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.notify_help"></span>
                        <span slot="param_name" >{{lang.notify}}</span>
                        <el-select slot="param" v-model="notify_v2" style="width: 100%">
                            <el-option :label="viewname_v2" :value=0 key="0"></el-option>
                            <el-option :label="'none'" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>
                </el-row>
            </div>

            <div v-if="snmp_version == '2'">

                <divider_item><span slot="title">{{lang.user_configuration}}(V3)</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.user_help"></span>
                        <span slot="param_name" >{{lang.user}}</span>
                        <el-input slot="param" v-model="user_v3"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.authtype_help"></span>
                        <span slot="param_name" >{{lang.authtype}}</span>
                        <el-select slot="param" v-model="authtype_v3" style="width: 100%">
                            <el-option label="MD5" :value=0 key="0"></el-option>
                            <el-option label="SHA" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.autopassword_help"></span>
                        <span slot="param_name" >{{lang.autopassword}}</span>
                        <el-input slot="param" v-model="autopassword_v3"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.privacyType_help"></span>
                        <span slot="param_name" >{{lang.privacyType}}</span>
                        <el-select slot="param" v-model="privacyType_v3" style="width: 100%">
                            <el-option label="DES" :value=0 key="0"></el-option>
                            <el-option label="AES" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.privacypassword_help"></span>
                        <span slot="param_name" >{{lang.privacypassword}}</span>
                        <el-input slot="param" v-model="privacypassword_v3"></el-input>
                    </form_item>
                </el-row>

                <divider_item><span slot="title">{{lang.group_configuration}}(V3)</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.group_help"></span>
                        <span slot="param_name" >{{lang.group}}</span>
                        <el-input slot="param" v-model="group_v3"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.user_help"></span>
                        <span slot="param_name" >{{lang.user}}</span>
                        <el-input slot="param" v-model="user_v3" disabled ></el-input>
                    </form_item>
                </el-row>

                <divider_item><span slot="title">{{lang.view_configuration}}(V3)</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.viewname_help"></span>
                        <span slot="param_name" >{{lang.viewname}}</span>
                        <el-input slot="param" v-model="viewname_v3"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.viewtype_help"></span>
                        <span slot="param_name" >{{lang.viewtype}}</span>
                        <el-select slot="param" v-model="viewtype_v3" style="width: 100%">
                            <el-option label="included" :value=0 key="0"></el-option>
                            <el-option label="excluded" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.viewsubtree_help"></span>
                        <span slot="param_name" >{{lang.viewsubtree}}</span>
                        <el-input slot="param" v-model="viewsubtree_v3"></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.viewmask_help"></span>
                        <span slot="param_name" >{{lang.viewmask}}</span>
                        <el-input slot="param" v-model="viewmask_v3"></el-input>
                    </form_item>
                </el-row>

                <divider_item><span slot="title">{{lang.access_configuration}}(V3)</span></divider_item>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.group_help"></span>
                        <span slot="param_name" >{{lang.group}}</span>
                        <el-input slot="param" v-model="group_v3" disabled ></el-input>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.read_help"></span>
                        <span slot="param_name" >{{lang.read}}</span>
                        <el-select slot="param" v-model="read_v3" style="width: 100%">
                            <el-option :label="viewname_v3" :value=0 key="0"></el-option>
                            <el-option :label="'none'" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>
                </el-row>

                <el-row>
                    <form_item>
                        <span slot="param_help" v-html="lang.write_help"></span>
                        <span slot="param_name" >{{lang.write}}</span>
                        <el-select slot="param" v-model="write_v3" style="width: 100%">
                            <el-option :label="viewname_v3" :value=0 key="0"></el-option>
                            <el-option :label="'none'" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>

                    <form_item>
                        <span slot="param_help" v-html="lang.notify_help"></span>
                        <span slot="param_name" >{{lang.notify}}</span>
                        <el-select slot="param" v-model="notify_v3" style="width: 100%">
                            <el-option :label="viewname_v3" :value=0 key="0"></el-option>
                            <el-option :label="'none'" :value=1 key="1"></el-option>
                        </el-select>
                    </form_item>
                </el-row>
            </div>
        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Adv-snmp",
        data(){
            return {
                //parameter
                enable: false,
                system_contact: '',
                system_location: '',
                support_snmp_version: '',
                snmp_version: '',

                //v1
                security_name_v1: '',
                souce_v1: '',
                community_v1: '',
                group_v1: '',
                viewname_v1: '',
                viewtype_v1: '',
                viewsubtree_v1: '',
                viewmask_v1: '',
                read_v1: '',
                write_v1: '',
                notify_v1: '',

                //v2
                security_name_v2: '',
                souce_v2: '',
                community_v2: '',
                group_v2: '',
                viewname_v2: '',
                viewtype_v2: '',
                viewsubtree_v2: '',
                viewmask_v2: '',
                read_v2: '',
                write_v2: '',
                notify_v2: '',

                //v3
                user_v3: '',
                authtype_v3: '',
                autopassword_v3: '',
                privacyType_v3: '',
                privacypassword_v3: '',
                group_v3: '',
                viewname_v3: '',
                viewtype_v3: '',
                viewsubtree_v3: '',
                viewmask_v3: '',
                read_v3: '',
                write_v3: '',
                notify_v3: '',

                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let general = data['_get']['_snmp']['_general']
                let v1 = data['_get']['_snmp']['_v1']
                let v2 = data['_get']['_snmp']['_v2c']
                let v3 = data['_get']['_snmp']['_v3']

                //general
                this.enable = general['_sw'] == 1 ? true : false
                this.system_contact = general['_contact']
                this.system_location = general['_address']
                this.support_snmp_version = general['_supportver'].split(',')
                this.snmp_version = parseInt(general['_curver'])

                //v1
                this.security_name_v1 = v1['_comm']['_name']
                this.souce_v1 = v1['_comm']['_souce']
                this.community_v1 = v1['_comm']['_community']
                this.group_v1 = v1['_secgrp']['_name']
                this.viewname_v1 = v1['_view']['_name']
                this.viewtype_v1 = parseInt(v1['_view']['_MibType'])
                this.viewsubtree_v1 = v1['_view']['_subtree']
                this.viewmask_v1 = v1['_view']['_mask']
                this.read_v1 = parseInt(v1['_access']['_read'])
                this.write_v1 = parseInt(v1['_access']['_write'])
                this.notify_v1 = parseInt(v1['_access']['_notif'])

                //v2
                this.security_name_v2 = v2['_comm']['_name']
                this.souce_v2 = v2['_comm']['_souce']
                this.community_v2 = v2['_comm']['_community']
                this.group_v2 = v2['_secgrp']['_name']
                this.viewname_v2 = v2['_view']['_name']
                this.viewtype_v2 = parseInt(v2['_view']['_MibType'])
                this.viewsubtree_v2 = v2['_view']['_subtree']
                this.viewmask_v2 = v2['_view']['_mask']
                this.read_v2 = parseInt(v2['_access']['_read'])
                this.write_v2 = parseInt(v2['_access']['_write'])
                this.notify_v2 = parseInt(v2['_access']['_notif'])

                //v3
                this.user_v3 = v3['_user']['_username']
                this.authtype_v3 = parseInt(v3['_user']['_authproctol'])
                this.autopassword_v3 = v3['_user']['_authcode']
                this.privacyType_v3 = parseInt(v3['_user']['_privproctol'])
                this.privacypassword_v3 = v3['_user']['_privcode']
                this.group_v3 = v3['_secgrp']['_name']
                this.viewname_v3 = v3['_view']['_name']
                this.viewtype_v3 = parseInt(v3['_view']['_MibType'])
                this.viewsubtree_v3 = v3['_view']['_subtree']
                this.viewmask_v3 = v3['_view']['_mask']
                this.read_v3 = parseInt(v3['_access']['_read'])
                this.write_v3 = parseInt(v3['_access']['_write'])
                this.notify_v3 = parseInt(v3['_access']['_notif'])
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
            Save(){
                //general
                const SnmpGeneral = new AST_SnmpGeneral()

                SnmpGeneral._sw = this.enable == true ? 1 : 0
                SnmpGeneral._contact = this.system_contact
                SnmpGeneral._address = this.system_location
                SnmpGeneral._supportver = this.support_snmp_version.join(',')
                SnmpGeneral._curver = this.snmp_version

                //v1
                const SnmpCommunity_v1 = new AST_SnmpCommunity()
                SnmpCommunity_v1._name = this.security_name_v1
                SnmpCommunity_v1._souce = this.souce_v1
                SnmpCommunity_v1._community = this.community_v1

                const SnmpSecurityGroup_v1 = new AST_SnmpSecurityGroup()
                SnmpSecurityGroup_v1._name = this.group_v1

                const SnmpView_v1 = new AST_SnmpView()
                SnmpView_v1._name = this.viewname_v1
                SnmpView_v1._MibType = this.viewtype_v1
                SnmpView_v1._subtree = this.viewsubtree_v1
                SnmpView_v1._mask = this.viewmask_v1

                const SnmpAccess_v1 = new AST_SnmpAccess()
                SnmpAccess_v1._read = this.read_v1
                SnmpAccess_v1._write = this.write_v1
                SnmpAccess_v1._notif = this.notify_v1

                const SnmpV1V2C_v1 = new AST_SnmpV1V2C()
                SnmpV1V2C_v1._comm = SnmpCommunity_v1
                SnmpV1V2C_v1._secgrp = SnmpSecurityGroup_v1
                SnmpV1V2C_v1._view = SnmpView_v1
                SnmpV1V2C_v1._access = SnmpAccess_v1

                //v2
                const SnmpCommunity_v2 = new AST_SnmpCommunity()

                SnmpCommunity_v2._name = this.security_name_v2
                SnmpCommunity_v2._souce = this.souce_v2
                SnmpCommunity_v2._community = this.community_v2

                const SnmpSecurityGroup_v2 = new AST_SnmpSecurityGroup()
                SnmpSecurityGroup_v2._name = this.group_v2

                const SnmpView_v2 = new AST_SnmpView()
                SnmpView_v2._name = this.viewname_v2
                SnmpView_v2._MibType = this.viewtype_v2
                SnmpView_v2._subtree = this.viewsubtree_v2
                SnmpView_v2._mask = this.viewmask_v2

                const SnmpAccess_v2 = new AST_SnmpAccess()
                SnmpAccess_v2._read = this.read_v2
                SnmpAccess_v2._write = this.write_v2
                SnmpAccess_v2._notif = this.notify_v2

                const SnmpV1V2C_v2 = new AST_SnmpV1V2C()
                SnmpV1V2C_v2._comm = SnmpCommunity_v2
                SnmpV1V2C_v2._secgrp = SnmpSecurityGroup_v2
                SnmpV1V2C_v2._view = SnmpView_v2
                SnmpV1V2C_v2._access = SnmpAccess_v2

                //v3
                const SnmpUserAdd = new AST_SnmpUserAdd()

                SnmpUserAdd._username = this.user_v3
                SnmpUserAdd._authproctol = this.authtype_v3
                SnmpUserAdd._authcode = this.autopassword_v3
                SnmpUserAdd._privproctol = this.privacyType_v3
                SnmpUserAdd._privcode = this.privacypassword_v3

                const SnmpSecurityGroup = new AST_SnmpSecurityGroup()

                SnmpSecurityGroup._name = this.group_v3

                const SnmpView = new AST_SnmpView()

                SnmpView._name = this.viewname_v3
                SnmpView._MibType = this.viewtype_v3
                SnmpView._subtree = this.viewsubtree_v3
                SnmpView._mask = this.viewmask_v3

                const SnmpAccess = new AST_SnmpAccess()

                SnmpAccess._read = this.read_v3
                SnmpAccess._write = this.write_v3
                SnmpAccess._notif = this.notify_v3

                const SnmpV3 = new AST_SnmpV3()
                SnmpV3._user = SnmpUserAdd
                SnmpV3._secgrp = SnmpSecurityGroup
                SnmpV3._view = SnmpView
                SnmpV3._access = SnmpAccess

                const SnmpConfParam = new AST_SnmpConfParam()
                SnmpConfParam._general = SnmpGeneral
                SnmpConfParam._v1 = SnmpV1V2C_v1
                SnmpConfParam._v2c = SnmpV1V2C_v2
                SnmpConfParam._v3 = SnmpV3

                const SnmpSave = new AST_SnmpSave()
                SnmpSave._snmp = SnmpConfParam

                this.request.AGNetworkSnmpSave(this.save_succeed_back, this.save_error_back, SnmpSave)
            },
            save_succeed_back(data){
                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })
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
            this.request.AGNetworkSnmpGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>