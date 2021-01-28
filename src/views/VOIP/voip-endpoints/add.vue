<template>
    <el-form>
        <div class="page_title" style="margin-bottom: 0;border-bottom: 0;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.edit_sip_endpoint}} {{$route.params.section}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button
                            style="vertical-align:middle;"
                            type="primary"
                            size="small"
                            @click="submitValidator('ruleForm')"
                    >{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-tabs v-model="activeName">

            <el-tab-pane :label="lang.main_endpoint_settings" name="main">
                <el-card shadow="never" style="margin:auto;padding:20px;margin-bottom:50px;" :style=$store.state.page.card_width>
                    <el-form
                            :label-position="$store.state.page.labelPosition"
                            label-width="250px"
                            class="change-label-class"
                            status-icon
                            :rules="rules"
                            :model="ruleForm"
                            ref="ruleForm"
                            size="small">

                        <divider_item><span slot="title">{{lang.main_endpoint_settings}}</span></divider_item>

                        <el-row>
                            <form_item_sync v-bind:param="'endpoint_name'">
                                <span slot="param_help" v-html="lang.name_help"></span>
                                <span slot="param_name" >{{lang.name}}</span>
                                <el-input slot="param" v-model="ruleForm.endpoint_name"></el-input>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <el-col :lg="12">
                                <el-row>
                                    <el-col :span="23">
                                        <el-form-item prop="username">
                                            <label slot="label">
                                                <el-tooltip placement="top" :open-delay=200>
                                                    <div slot="content" v-html="lang.username_help"></div>
                                                    <span>{{lang.username}}</span>
                                                </el-tooltip>:
                                            </label>
                                            <el-col :lg="15" :sm="22" :xs="22">
                                                <el-input v-model="anonymous ? '' : ruleForm.username"
                                                          @change="username_change"
                                                          :disabled="anonymous"></el-input>
                                            </el-col>
                                            <el-col :lg="7" style="margin-left: 20px;">
                                                <el-checkbox v-model="(registration == 1 || registration == 2) ? false : anonymous"
                                                             :disabled="registration == 1 || registration == 2">{{lang.anonymous}}</el-checkbox>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>

                            <form_item_sync v-bind:param="'password'">
                                <span slot="param_help" v-html="lang.password_help"></span>
                                <span slot="param_name" >{{lang.password}}</span>
                                <el-input slot="param" v-model="anonymous ? '' : ruleForm.password" :disabled="anonymous" show-password></el-input>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.registration_help"></span>
                                <span slot="param_name" >{{lang.registration}}</span>
                                <el-select slot="param" v-model="registration" @change="registration_change" style="width: 100%">
                                    <el-option
                                            v-for="item in registration_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.registration_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync v-bind:param="'host'">
                                <span slot="param_help" v-html="lang.hostname_or_ipaddress_help"></span>
                                <span slot="param_name" >{{lang.hostname_or_ipaddress}}</span>
                                <el-input slot="param" v-model="ruleForm.host" @change="host_change"></el-input>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.host_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.backup_hostname_or_ip_help"></span>
                                <span slot="param_name" >{{lang.backup_hostname_or_ip}}</span>
                                <el-input slot="param" v-model="backup_host"></el-input>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.port_help"></span>
                                <span slot="param_name" >{{lang.port}}</span>
                                <el-input slot="param" v-model="port"></el-input>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.port_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.transport_help"></span>
                                <span slot="param_name" >{{lang.transport}}</span>
                                <el-select slot="param" v-model="transport" style="width: 100%">
                                    <el-option
                                            v-for="item in transport_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.transport_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.nat_traversal_help"></span>
                                <span slot="param_name" >{{lang.nat_traversal}}</span>
                                <el-select slot="param" v-model="nat" style="width: 100%">
                                    <el-option
                                            v-for="item in nat_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.nat_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.subscribe_for_mwi_help"></span>
                                <span slot="param_name" >{{lang.subscribe_for_mwi}}</span>
                                <el-select slot="param" v-model="mwi" :disabled="!(registration == 1)" style="width: 100%">
                                    <el-option
                                            v-for="item in mwi_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.mwi_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.vos_encryption_help"></span>
                                <span slot="param_name" >{{lang.vos_encryption}}</span>
                                <el-select slot="param" v-model="vosencrypt" style="width: 100%">
                                    <el-option
                                            v-for="item in vosencrypt_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.vosencrypt_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.stun_switch_help"></span>
                                <span slot="param_name" >{{lang.stun_switch}}</span>
                                <el-checkbox slot="param" v-model="stunflag"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <divider_item><span slot="title">{{lang.advanced_registration}}</span></divider_item>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.authentication_user_help"></span>
                                <span slot="param_name" >{{lang.authentication_user}}</span>
                                <el-input slot="param" v-model="authentication_user" :disabled="!(this.registration == 1)"></el-input>
                            </form_item_sync>

                            <el-col :lg="12">
                                <el-row>
                                    <el-col :span="23">
                                        <el-form-item>
                                            <label slot="label">
                                                <el-tooltip placement="top" :open-delay=200>
                                                    <div slot="content" v-html="lang.register_extension_help"></div>
                                                    <span>{{lang.register_extension}}</span>
                                                </el-tooltip>:
                                            </label>
                                            <el-col :lg="15" :sm="22" :xs="22">
                                                <el-input v-model="register_extension" :disabled="!(this.registration == 1)" :readonly="register_extension_readonly"></el-input>
                                            </el-col>
                                            <el-col :lg="7" style="margin-left: 20px;">
                                                <el-checkbox v-model="register_extension_readonly">{{lang.readonly}}</el-checkbox>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <label style="line-height: 32px;"></label>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :lg="12">
                                <el-row>
                                    <el-col :span="23">
                                        <el-form-item>
                                            <label slot="label">
                                                <el-tooltip placement="top" :open-delay=200>
                                                    <div slot="content" v-html="lang.register_user_help"></div>
                                                    <span>{{lang.register_user}}</span>
                                                </el-tooltip>:
                                            </label>
                                            <el-col :lg="15" :sm="22" :xs="22">
                                                <el-input v-model="register_user" :readonly="register_user_readonly"></el-input>
                                            </el-col>
                                            <el-col :lg="7" style="margin-left: 20px;">
                                                <el-checkbox v-model="register_user_readonly">{{lang.readonly}}</el-checkbox>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <label style="line-height: 32px;">
                                            <el-checkbox v-show="show_sync_params" v-model="sync.registeruser_sync"></el-checkbox>
                                        </label>
                                    </el-col>
                                </el-row>
                            </el-col>

                            <el-col :lg="12">
                                <el-row>
                                    <el-col :span="23">
                                        <el-form-item>
                                            <label slot="label">
                                                <el-tooltip placement="top" :open-delay=200>
                                                    <div slot="content" v-html="lang.from_user_help"></div>
                                                    <span>{{lang.from_user}}</span>
                                                </el-tooltip>:
                                            </label>
                                            <el-col :lg="15" :sm="22" :xs="22">
                                                <el-input v-model="from_user" :readonly="from_user_readonly"></el-input>
                                            </el-col>
                                            <el-col :lg="7" style="margin-left: 20px;">
                                                <el-checkbox v-model="from_user_readonly">{{lang.readonly}}</el-checkbox>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <label style="line-height: 32px;">
                                            <el-checkbox v-show="show_sync_params" v-model="sync.fromuser_sync"></el-checkbox>
                                        </label>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.from_domain_help"></span>
                                <span slot="param_name" >{{lang.from_domain}}</span>
                                <el-input slot="param" v-model="fromdomain"></el-input>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.fromdomain_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.qualify_help"></span>
                                <span slot="param_name" >{{lang.qualify}}</span>
                                <el-select slot="param" v-model="qualify" style="width: 100%">
                                    <el-option
                                            v-for="item in qualify_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.qualify_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.qualify_frequency_help"></span>
                                <span slot="param_name" >{{lang.qualify_frequency}}</span>
                                <el-input slot="param" v-model="qualifyfreq"></el-input>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.qualify_frequency_sync"></el-checkbox>
                            </form_item_sync>

                            <el-col :lg="12">
                                <el-row>
                                    <el-col :span="23">
                                        <el-form-item>
                                            <label slot="label">
                                                <el-tooltip placement="top" :open-delay=200>
                                                    <div slot="content" v-html="lang.outbound_proxy_help"></div>
                                                    <span>{{lang.outbound_proxy}}</span>
                                                </el-tooltip>:
                                            </label>
                                            <el-col :span="22">
                                                <el-row :gutter="20">
                                                    <el-col :span="18">
                                                        <el-input v-model="outboundproxy"></el-input>
                                                    </el-col>
                                                    <el-col :span="6">
                                                        <el-input v-model="outboundproxy_port"></el-input>
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <label style="line-height: 32px;">
                                            <el-checkbox v-show="show_sync_params" v-model="sync.outboundproxy_sync"></el-checkbox>
                                        </label>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.custom_registery_help"></span>
                                <span slot="param_name" >{{lang.custom_registery}}</span>
                                <el-checkbox slot="param" v-model="registery_enable"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.registery_string_help"></span>
                                <span slot="param_name" >{{lang.registery_string}}</span>
                                <el-input slot="param" v-model="registery_string" :disabled="!registery_enable"></el-input>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.enable_outboundproxy_to_host_help"></span>
                                <span slot="param_name" >{{lang.enable_outboundproxy_to_host}}</span>
                                <el-checkbox slot="param" v-model="enableoutboundtohost"></el-checkbox>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.enableoutboundtohost_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync v-if="transport == 2">
                                <span slot="param_help" v-html="lang.tlsverify_help"></span>
                                <span slot="param_name" >{{lang.tlsverify}}</span>
                                <el-select slot="param" v-model="tlsverify" style="width: 100%">
                                    <el-option
                                            v-for="item in tlsverify_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.tlsverify_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row v-if="transport == 2">
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.tlssetup_help"></span>
                                <span slot="param_name" >{{lang.tlssetup}}</span>
                                <el-select slot="param" v-model="tlssetup" style="width: 100%">
                                    <el-option
                                            v-for="item in tlssetup_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.tlssetup_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.tlsprivatekey_help"></span>
                                <span slot="param_name" >{{lang.tlsprivatekey}}</span>
                                <el-input slot="param" v-model="tlsprivatekey"></el-input>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.tlsprivatekey_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row v-if="transport == 2">
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.encryption_help"></span>
                                <span slot="param_name" >{{lang.encryption}}</span>
                                <el-select slot="param" v-model="encryption" style="width: 100%">
                                    <el-option
                                            v-for="item in encryption_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.encryption_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                    </el-form>
                </el-card>
            </el-tab-pane>

            <el-tab-pane :label="lang.call_settings" name="call_settings">
                <el-card shadow="never" style="margin:auto;padding:20px;margin-bottom:50px;" :style=$store.state.page.card_width>
                    <el-form
                            :label-position="$store.state.page.labelPosition"
                            label-width="250px"
                            class="change-label-class"
                            status-icon
                            ref="ruleForm1"
                            size="small">

                        <divider_item><span slot="title">{{lang.dtmf_settings}}</span></divider_item>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.dtmf_mode_help"></span>
                                <span slot="param_name" >{{lang.dtmf_mode}}</span>
                                <el-select slot="param" v-model="dtmfmode" style="width: 100%">
                                    <el-option
                                            v-for="item in dtmfmode_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.dtmfmode_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <divider_item><span slot="title">{{lang.call_limit}}</span></divider_item>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.call_limit_help"></span>
                                <span slot="param_name" >{{lang.call_limit}}</span>
                                <el-input slot="param" v-model="call_limit"></el-input>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.call_limit_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <divider_item><span slot="title">{{lang.caller_id_settings}}</span></divider_item>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.trust_id_help"></span>
                                <span slot="param_name" >{{lang.trust_id}}</span>
                                <el-select slot="param" v-model="trustrpid" style="width: 100%">
                                    <el-option
                                            v-for="item in trustrpid_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.trustrpid_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.send_remote_party_id_help"></span>
                                <span slot="param_name" >{{lang.send_remote_party_id}}</span>
                                <el-select slot="param" v-model="sendrpid" style="width: 100%">
                                    <el-option
                                            v-for="item in sendrpid_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.sendrpid_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.remote_party_id_format_help"></span>
                                <span slot="param_name" >{{lang.remote_party_id_format}}</span>
                                <el-select slot="param" v-model="rpid_format" style="width: 100%">
                                    <el-option
                                            v-for="item in rpid_format_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.rpid_format_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.caller_id_presentation_help"></span>
                                <span slot="param_name" >{{lang.caller_id_presentation}}</span>
                                <el-select slot="param" v-model="callingpres" style="width: 100%">
                                    <el-option
                                            v-for="item in callingpres_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.callingpres_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <divider_item><span slot="title">{{lang.advanced_signaling_settings}}</span></divider_item>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.progress_inband_help"></span>
                                <span slot="param_name" >{{lang.progress_inband}}</span>
                                <el-select slot="param" v-model="progressinband" style="width: 100%">
                                    <el-option
                                            v-for="item in progressinband_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.progressinband_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.allow_overlap_dialing_help"></span>
                                <span slot="param_name" >{{lang.allow_overlap_dialing}}</span>
                                <el-select slot="param" v-model="allowoverlap" style="width: 100%">
                                    <el-option
                                            v-for="item in allowoverlap_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.allowoverlap_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.append_user"></span>
                                <span slot="param_name" >{{lang.append_user}}</span>
                                <el-select slot="param" v-model="usereqphone" style="width: 100%">
                                    <el-option
                                            v-for="item in usereqphone_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.usereqphone_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.add_reason_header_help"></span>
                                <span slot="param_name" >{{lang.add_reason_header}}</span>
                                <el-select slot="param" v-model="use_q850_reason" style="width: 100%">
                                    <el-option
                                            v-for="item in use_q850_reason_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.use_q850_reason_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.honor_sdp_version_help"></span>
                                <span slot="param_name" >{{lang.honor_sdp_version}}</span>
                                <el-select slot="param" v-model="honor_sdp_version" style="width: 100%">
                                    <el-option
                                            v-for="item in honor_sdp_version_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.honor_sdp_version_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.allow_transfers_help"></span>
                                <span slot="param_name" >{{lang.allow_transfers}}</span>
                                <el-select slot="param" v-model="allowtransfer" style="width: 100%">
                                    <el-option
                                            v-for="item in allowtransfer_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.allowtransfer_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.allow_promiscuous_redirects_help"></span>
                                <span slot="param_name" >{{lang.allow_promiscuous_redirects}}</span>
                                <el-select slot="param" v-model="promiscredir" style="width: 100%">
                                    <el-option
                                            v-for="item in promiscredir_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.promiscredir_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.max_forwards_help"></span>
                                <span slot="param_name" >{{lang.max_forwards}}</span>
                                <el-input slot="param" v-model="max_forwards"></el-input>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.max_forwards_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.send_trying_on_register_help"></span>
                                <span slot="param_name" >{{lang.send_trying_on_register}}</span>
                                <el-select slot="param" v-model="send_trying_on_register" style="width: 100%">
                                    <el-option
                                            v-for="item in send_trying_on_register_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.send_trying_on_register_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <divider_item><span slot="title">{{lang.advanced_timer_settings}}</span></divider_item>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.default_t1_timer_help"></span>
                                <span slot="param_name" >{{lang.default_t1_timer}}</span>
                                <el-input slot="param" v-model="timert1"></el-input>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.timert1_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.call_setup_timer_help"></span>
                                <span slot="param_name" >{{lang.call_setup_timer}}</span>
                                <el-input slot="param" v-model="timerb"></el-input>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.timerb_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.session_timers_help"></span>
                                <span slot="param_name" >{{lang.session_timers}}</span>
                                <el-select slot="param" v-model="session_timers" style="width: 100%">
                                    <el-option
                                            v-for="item in session_timers_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.session_timers_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.minimun_session_refresh_interval_help"></span>
                                <span slot="param_name" >{{lang.minimun_session_refresh_interval}}</span>
                                <el-input slot="param" v-model="session_minse"></el-input>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.session_minse_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <el-row>
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.maximun_session_refresh_interval_help"></span>
                                <span slot="param_name" >{{lang.maximun_session_refresh_interval}}</span>
                                <el-input slot="param" v-model="session_expires"></el-input>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.session_expires_sync"></el-checkbox>
                            </form_item_sync>

                            <form_item_sync>
                                <span slot="param_help" v-html="lang.session_refresher_help"></span>
                                <span slot="param_name" >{{lang.session_refresher}}</span>
                                <el-select slot="param" v-model="session_refresher" style="width: 100%">
                                    <el-option
                                            v-for="item in session_refresher_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.session_refresher_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>
                    </el-form>
                </el-card>
            </el-tab-pane>

            <el-tab-pane :label="lang.media_setting" name="media_settings">
                <el-card shadow="never" style="margin:auto;padding:20px;margin-bottom:50px;" :style=$store.state.page.card_width>
                    <el-form
                            :label-position="$store.state.page.labelPosition"
                            label-width="250px"
                            class="change-label-class"
                            status-icon
                            ref="ruleForm2"
                            size="small">

                        <divider_item><span slot="title">{{lang.media_setting}}</span></divider_item>

                        <el-row v-for="(item,index) in sip_codec_val_options">
                            <form_item_sync>
                                <span slot="param_help" v-html="lang.codec_priority"></span>
                                <span slot="param_name" >{{lang.codec_priority}} {{index+1}}</span>
                                <el-select slot="param" v-model="sip_codec_val_options[index]" style="width: 100%">
                                    <el-option
                                            v-for="i in sip_codec_priority_options"
                                            :label="i.label"
                                            :key="i.value"
                                            :value="i.value"></el-option>
                                </el-select>
                                <el-checkbox slot="param_sync" v-show="show_sync_params" v-model="sync.sip_codec_priority_sync"></el-checkbox>
                            </form_item_sync>
                        </el-row>

                        <divider_item><span slot="title">{{lang.save_to_other_channels}}</span></divider_item>

                        <el-row>
                            <el-col :lg="24" >
                                <el-form-item>
                                    <label slot="label">
                                        <el-tooltip placement="top" :open-delay=200>
                                            <div slot="content">
                                            </div>
                                        </el-tooltip>
                                    </label>
                                    <el-col :lg="22">
                                        <el-row>
                                            <el-col :span="6">
                                                <el-checkbox @change="Select_all_port">{{lang.all}}</el-checkbox>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-checkbox v-show="show_sync_params" @change="Select_all_sync_params">{{lang.select_all_parameters}}</el-checkbox>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <span v-for="(item, index) in used_sip_arr">
                                                <el-col :span="6" >
                                                    <el-checkbox v-model="sync_port_arr[item._section]"
                                                                 :disabled="$route.params.section == item._section"
                                                    >SIP-{{item._section}}</el-checkbox>
                                                </el-col>
                                            </span>
                                        </el-row>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-form>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "add",
        data() {
            var validateEndpointname = (rule, value, callback) => {
                var rex = /^[0-9a-zA-Z`~\+!@#$%^*()_{}:|?\=.]{1,32}$/i;
                let flag = false
                for (let i = 0; i < this.used_sip_arr.length; i++) {
                    if (this.used_sip_arr[i]._section == this.$route.params.section) continue
                    if (this.used_sip_arr[i]._section == value) {
                        flag = true
                        break
                    }
                }

                if (!rex.test(value)) {
                    callback(new Error(this.lang.check_endpoint_name))
                } else if (flag) {
                    callback(new Error(this.lang.username_already_exists))
                } else {
                    callback()
                }
            }
            var validateUsername = (rule, value, callback) => {
                if(!this.anonymous) {
                    var rex = /^[0-9a-zA-Z$*\+\-=_.]{1,32}$/i;

                    if (!rex.test(value)) {
                        callback(new Error(this.lang.check_sip_name))
                    } else {
                        callback()
                    }
                }else{
                    callback()
                }
            }
            var validatePassword = (rule, value, callback) => {
                if(!this.anonymous) {
                    var rex = /^[0-9a-zA-Z`~!#@$%^&*()_+\{\}|<>\-=\[\]\,.]{1,32}$/i;

                    if (!rex.test(value)) {
                        callback(new Error(this.lang.check_sip_pwd))
                    } else {
                        callback()
                    }
                }else{
                    callback()
                }
            }
            var validateHost = (rule, value, callback) => {
                let rex1 = /^(([a-z0-9](w|-){0,61}?[a-z0-9]|[a-z0-9]).){1,}(aero|arpa|asia|biz|cat|com|coop|co|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])(.[a-z][a-z]){0,1}$/i;
                let rex2 = /^((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\.){3}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)$/i;
                if(this.registration != 2){
                    if(value == ''){
                        callback(new Error(this.lang.check_domain))
                    }else if(!rex1.test(value) && !rex2.test(value)) {
                        callback(new Error(this.lang.check_domain))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }

            return{
                ruleForm: {
                    endpoint_name: '',
                    username: '',
                    password: '',
                    host: '80',
                },
                rules: {
                    endpoint_name: [
                        { validator: validateEndpointname, trigger: 'blur' }
                    ],
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    host: [
                        { validator: validateHost, trigger: 'blur' }
                    ]
                },

                used_sip_arr: [],

                endpoint_name: '',
                username: '',
                anonymous: false,
                password: '',
                registration: 0,
                host: '',
                backup_host: '',
                port: 0,
                transport: 0,
                nat: 0,
                mwi: 0,
                vosencrypt: 0,
                stunflag: false,
                authentication_user: '',
                register_extension: '',
                register_user: '',
                from_user: '',
                fromdomain: '',
                qualify: 0,
                qualifyfreq: 60,
                outboundproxy: '',
                outboundproxy_port: 0,
                registery_enable: false,
                registery_string: '',
                enableoutboundtohost: '',
                tlsverify: '',
                tlssetup: '',
                tlsprivatekey: '',
                encryption: '',
                dtmfmode: '',
                call_limit: '',
                trustrpid: '',
                sendrpid: '',
                rpid_format: '',
                callingpres: '',
                progressinband: '',
                allowoverlap: '',
                usereqphone: '',
                use_q850_reason: '',
                honor_sdp_version: '',
                allowtransfer: '',
                promiscredir: '',
                max_forwards: '',
                send_trying_on_register: '',
                timert1: '',
                timerb: '',
                session_timers: '',
                session_minse: '',
                session_expires: '',
                session_refresher: '',
                order: '',

                register_extension_readonly: true,
                register_user_readonly: true,
                from_user_readonly: true,

                sip_codec_val_options: [1,2,3,4,6],

                registration_options: [{
                    label: 'None',
                    value: 0
                },{
                    label: 'Client',
                    value: 1
                },{
                    label: 'Server',
                    value: 2
                }],

                transport_options: [{
                    label: 'UDP',
                    value: 0
                },{
                    label: 'TCP',
                    value: 1
                },{
                    label: 'TLS',
                    value: 2
                }],

                nat_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Force report on',
                    value: 1
                },{
                    label: 'Yes',
                    value: 2
                },{
                    label: 'Report if requested and comedia',
                    value: 3
                }],

                mwi_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                }],

                vosencrypt_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 2
                }],

                qualify_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                }],

                tlsverify_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                }],

                tlssetup_options: [{
                    label: 'Incoming and Outcoming',
                    value: 0
                },{
                    label: 'Incoming Only',
                    value: 1
                },{
                    label: 'Outcoming Only',
                    value: 2
                }],

                encryption_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes (SRTP only)',
                    value: 1
                }],

                dtmfmode_options: [{
                    label: 'RFC2833',
                    value: 0
                },{
                    label: 'Inband',
                    value: 1
                },{
                    label: 'Info',
                    value: 2
                }],

                trustrpid_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                }],

                sendrpid_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                },{
                    label: 'Rpid',
                    value: 2
                },{
                    label: 'Pai',
                    value: 3
                }],

                rpid_format_options: [{
                    label: 'P-Asserted-Identity Header',
                    value: 0
                },{
                    label: 'Remote-Party-ID Header',
                    value: 1
                }],

                callingpres_options: [{
                    label: 'Allowed,not screened',
                    value: 0
                },{
                    label: 'Allowed,passed screen',
                    value: 1
                },{
                    label: 'Allowed,failed screen',
                    value: 2
                },{
                    label: 'Allowed',
                    value: 3
                },{
                    label: 'Prohibited,not screened',
                    value: 4
                },{
                    label: 'Prohibited,passed screen',
                    value: 5
                },{
                    label: 'Prohibited,failed screen',
                    value: 6
                },{
                    label: 'Prohibited',
                    value: 7
                },{
                    label: 'Unavailable',
                    value: 8
                }],

                progressinband_options: [{
                    label: 'Never',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                },{
                    label: 'No',
                    value: 2
                }],

                allowoverlap_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                }],

                usereqphone_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                }],

                use_q850_reason_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                }],

                honor_sdp_version_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                }],

                allowtransfer_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                }],

                promiscredir_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                }],

                send_trying_on_register_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                }],

                session_timers_options: [{
                    label: 'Accept',
                    value: 0
                },{
                    label: 'Originate',
                    value: 1
                },{
                    label: 'Refuse',
                    value: 2
                }],

                session_refresher_options: [{
                    label: 'UAS',
                    value: 1
                },{
                    label: 'UAC',
                    value: 0
                }],

                sip_codec_priority_options:[{
                    label: 'Not Used',
                    value: 0
                },{
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

                sync: {
                    registration_sync: false,
                    host_sync: false,
                    transport_sync: false,
                    nat_sync: false,
                    vosencrypt_sync: false,
                    registeruser_sync: false,
                    enableoutboundtohost_sync: false,
                    fromuser_sync: false,
                    fromdomain_sync: false,
                    port_sync: false,
                    qualify_sync: false,
                    qualify_frequency_sync: false,
                    outboundproxy_sync: false,
                    tlsenable_sync: false,
                    tlsverify_sync: false,
                    tlssetup_sync: false,
                    tlsprivatekey_sync: false,
                    encryption_sync: false,
                    dtmfmode_sync: false,
                    call_limit_sync: false,
                    trustrpid_sync: false,
                    sendrpid_sync: false,
                    rpid_format_sync: false,
                    callingpres_sync: false,
                    progressinband_sync: false,
                    allowoverlap_sync: false,
                    usereqphone_sync: false,
                    use_q850_reason_sync: false,
                    honor_sdp_version_sync: false,
                    allowtransfer_sync: false,
                    promiscredir_sync: false,
                    max_forwards_sync: false,
                    send_trying_on_register_sync: false,
                    timert1_sync: false,
                    timerb_sync: false,
                    session_timers_sync: false,
                    session_minse_sync: false,
                    session_expires_sync: false,
                    session_refresher_sync: false,
                    allow_sync: false,
                    mwi_sync: false,
                    sip_codec_priority_sync: false,
                },

                sync_port_arr: [],
                show_sync_params: false,

                activeName: 'main',

                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods:{
            Select_all_port(checked){
                for(let item in this.sync_port_arr){
                    if(item != this.$route.params.section){
                        if(checked){
                            this.$set(this.sync_port_arr, item, true)
                        }else{
                            this.$set(this.sync_port_arr, item, false)
                        }
                    }
                }
            },
            Select_all_sync_params(checked){
                for(let key in this.sync){
                    if(checked){
                        this.sync[key] = true
                    }else{
                        this.sync[key] = false
                    }
                }
            },
            registration_change(){
                if(this.registration == 2){//server
                    this.ruleForm.host = 'dynamic'
                    this.qualify = 1
                    this.register_extension = ''
                }else if(this.registration == 1){//client
                    this.ruleForm.host = ''
                    this.qualify = 0
                }else{//none
                    this.ruleForm.host = ''
                    this.qualify = 0
                    this.register_extension = ''
                }
                this.qualifyfreq = 60
            },
            username_change(){
                this.register_extension = this.ruleForm.username
                this.register_user = this.ruleForm.username
                this.from_user = this.ruleForm.username
            },
            host_change(){
                this.fromdomain = this.ruleForm.host
            },
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)
                this.used_sip_arr = data['_get']['_siparr']['_item']
                this.used_sip_arr.forEach(item => {
                    this.sync_port_arr[item._section] = false
                })

                let is_add = this.$route.params.section == undefined ? true : false

                let _context = data['_get']['_context']

                this.ruleForm.endpoint_name = this.$route.params.section
                this.ruleForm.username = _context['_username'] == 'anonymous' ? '' : _context['_username']
                this.anonymous = _context['_allowanonymous'] == 1 ? true : false
                this.ruleForm.password = _context['_secret']
                this.registration = parseInt(_context['_registration'])
                this.ruleForm.host = _context['_host']
                this.backup_host = _context['_backup']
                this.port = _context['_port'] == 0 ? '' : _context['_port']

                if(_context['_transport'] == 0 || _context['_transport'] == 1 || _context['_transport'] == 2){
                    this.transport = parseInt(_context['_transport'])
                }else{
                    this.transport = 0
                }
                this.nat = is_add ? 2 : parseInt(_context['_nat'])
                this.mwi = parseInt(_context['_mwi'])
                this.vosencrypt = parseInt(_context['_vosencrypt'])
                this.stunflag = _context['_stunflag'] == 1 ? true : false
                this.authentication_user = _context['_auth']
                this.register_extension = _context['_registerextension']
                this.register_user = _context['_registeruser']
                this.from_user = _context['_fromuser']
                this.fromdomain = _context['_fromdomain']
                this.qualify = parseInt(_context['_qualify'])

                if(this.$store.state.systemtype == 'yfree' || this.$store.state.systemtype == 'general' || is_add){
                    this.qualifyfreq = 60
                }else{
                    this.qualifyfreq = _context['_qualifyfreq']
                }

                this.outboundproxy = _context['_outboundproxy']
                this.outboundproxy_port = is_add ? 5060 : (_context['_outboundproxyport'] == 0 ? 5060 : _context['_outboundproxyport'])
                this.registery_enable = _context['_registeryenable'] == 1 ? true : false
                this.registery_string = _context['_registerystring']
                this.enableoutboundtohost = _context['_enableoutboundtohost'] == 1 ? true : false
                this.tlsverify = _context['_tlsverify'] == 1 ? 1 : 0
                if(_context['_tlssetup'] == 2){
                    this.tlssetup = 2
                }else if(_context['_tlssetup'] == 1){
                    this.tlssetup = 1
                }else{
                    this.tlssetup = 0
                }

                if(_context['_tlsprivatekey'] != ''){
                    let temp = _context['_tlsprivatekey'].split('/');
                    this.tlsprivatekey = temp[4]
                }else{
                    this.tlsprivatekey = ''
                }

                if(is_add){
                    this.encryption = 1
                }else{
                    this.encryption = _context['_encryption'] == 1 ? 1 : 0
                }
                this.dtmfmode = parseInt(_context['_dtmfmode'])
                this.call_limit = _context['_calllimit'] == 0 ? 8 : _context['_calllimit']
                this.trustrpid = parseInt(_context['_trustrpid'])
                this.sendrpid = parseInt(_context['_sendrpid'])
                this.rpid_format = parseInt(_context['_rpidformat'])
                this.callingpres = parseInt(_context['_callingpres'])
                this.progressinband = parseInt(_context['_progressinband'])
                this.allowoverlap = parseInt(_context['_allowoverlap'])
                this.usereqphone = parseInt(_context['_usereqphone'])
                this.use_q850_reason = parseInt(_context['_useq850reason'])
                this.honor_sdp_version = is_add ? 1 : parseInt(_context['_honorsdpversion'])
                this.allowtransfer = is_add ? 1 : parseInt(_context['_allowtransfer'])
                this.promiscredir = parseInt(_context['_promiscredir'])
                this.max_forwards = is_add ? 70 : _context['_maxforwards']
                this.send_trying_on_register = parseInt(_context['_registertrying'])
                this.timert1 = is_add ? 500 : _context['_timert1']
                this.timerb = is_add ? 32000 : _context['_timerb']
                this.session_timers = parseInt(_context['_sessiontimers'])
                this.session_minse = is_add ? 90 : _context['_sessionminse']
                this.session_expires = is_add ? 1800 : _context['_sessionexpires']
                this.session_refresher = is_add ? 1 : parseInt(_context['_sessionrefresher'])
                this.order = _context['_order']

                if(is_add){
                    _context['_allow'] = '12346'
                }
                this.sip_codec_val_options = [0,0,0,0,0]//初始化
                _context['_allow'].toString().split('').forEach((item,index) => {
                    this.sip_codec_val_options[index] = parseInt(item)
                })
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            submitValidator(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.Save()
                    } else {
                        return false
                    }
                });
            },
            Save(){
                const sipcontext = new AST_SipContext()

                sipcontext._username = this.anonymous == true ? 'anonymous' : this.ruleForm.username
                if(this.registration == 1 || this.registration == 2){
                    sipcontext._allowanonymous = 0
                }else{
                    sipcontext._allowanonymous = this.anonymous == true ? 1 : 0
                }
                sipcontext._secret = this.anonymous == true ? '' : this.ruleForm.password
                sipcontext._registration = this.registration
                sipcontext._host = this.ruleForm.host
                sipcontext._backup = this.backup_host
                sipcontext._transport = this.transport
                sipcontext._nat = this.nat
                sipcontext._mwi = this.mwi
                sipcontext._vosencrypt = this.vosencrypt
                sipcontext._stunflag = this.stunflag == true ? 1: 0
                sipcontext._auth = (this.registration == 0 || this.registration == 2) ? '' : this.authentication_user
                sipcontext._registerextension = (this.registration == 0 || this.registration == 2) ? '' : this.register_extension
                sipcontext._registeruser = this.register_user
                sipcontext._fromuser = this.from_user
                sipcontext._fromdomain = this.fromdomain
                sipcontext._port = this.port == '' ? 0 : this.port
                sipcontext._qualify = this.qualify
                sipcontext._qualifyfreq = this.qualifyfreq
                sipcontext._outboundproxy = this.outboundproxy
                sipcontext._outboundproxyport = this.outboundproxy_port
                sipcontext._registeryenable = this.registery_enable == true ? 1 : 0
                sipcontext._registerystring = this.registery_string
                sipcontext._enableoutboundtohost = this.enableoutboundtohost == true ? 1 : 0

                if(this.transport == 2){
                    sipcontext._tlsenable = 1
                    sipcontext._tlsverify = this.tlsverify
                    sipcontext._tlssetup = this.tlssetup
                    sipcontext._tlsprivatekey = this.tlsprivatekey != '' ? '/etc/asterisk/keys/'+this.tlsprivatekey : ''
                    sipcontext._encryption = this.encryption
                }else{
                    sipcontext._tlsenable = 0
                    sipcontext._tlsverify = 0
                    sipcontext._tlssetup = 0
                    sipcontext._tlsprivatekey = ''
                    sipcontext._encryption = 0
                }

                sipcontext._dtmfmode = this.dtmfmode
                sipcontext._calllimit = this.call_limit
                sipcontext._trustrpid = this.trustrpid
                sipcontext._sendrpid = this.sendrpid
                sipcontext._rpidformat = this.rpid_format
                sipcontext._callingpres = this.callingpres
                sipcontext._progressinband = this.progressinband
                sipcontext._allowoverlap = this.allowoverlap
                sipcontext._usereqphone = this.usereqphone
                sipcontext._useq850reason = this.use_q850_reason
                sipcontext._honorsdpversion = this.honor_sdp_version
                sipcontext._allowtransfer = this.allowtransfer
                sipcontext._promiscredir = this.promiscredir
                sipcontext._maxforwards = this.max_forwards
                sipcontext._registertrying = this.send_trying_on_register
                sipcontext._timert1 = this.timert1
                sipcontext._timerb = this.timerb
                sipcontext._sessiontimers = this.session_timers
                sipcontext._sessionminse = this.session_minse
                sipcontext._sessionexpires = this.session_expires
                sipcontext._sessionrefresher = this.session_refresher

                let allow = this.sip_codec_val_options.join('')
                sipcontext._allow = allow

                if(this.$route.params.section == undefined){
                    sipcontext._order = this.$route.params.order
                }else{
                    sipcontext._order = this.order
                }

                sipcontext._md5 = md5(sipcontext._username+'-'+sipcontext._secret)

                /*** Sync other port Begin ***/
                let port_sync = false
                let params_sync = false
                const LineArr = new AST_LineArr()
                const SectionArr = new AST_SectionArr()

                this.sync_port_arr.forEach((item,index) => {
                    if(item){
                        let ast_section = new AST_Section()
                        ast_section._section = index
                        SectionArr._item.push(ast_section)

                        port_sync = true
                    }
                })

                for(let key in this.sync){
                    if(this.sync[key]){
                        params_sync = true
                        break
                    }
                }

                if(port_sync && params_sync){
                    if(this.sync.registration_sync){
                        let line_registration = new AST_Line()
                        line_registration._key = 'registration'
                        if(this.registration == 0){
                            line_registration._value = 'none'
                        }else if(this.registration == 1){
                            line_registration._value = 'client'
                        }else if(this.registration == 2){
                            line_registration._value = 'server'
                        }
                        LineArr._item.push(line_registration)
                    }

                    if(this.sync.host_sync){
                        let line_host = new AST_Line()
                        line_host._key = 'host'
                        line_host._value = this.ruleForm.host
                        LineArr._item.push(line_host)
                    }

                    if(this.sync.transport_sync){
                        let line_transport = new AST_Line()
                        line_transport._key = 'transport'
                        if(this.transport == 0){
                            line_transport._value = 'udp'
                        }else if(this.transport == 1){
                            line_transport._value = 'tcp'
                        }else if(this.transport == 2){
                            line_transport._value = 'tls'
                        }
                        LineArr._item.push(line_transport)
                    }

                    if(this.sync.nat_sync){
                        let line_nat = new AST_Line()
                        line_nat._key = 'nat'
                        if(this.nat == 0){
                            line_nat._value = 'no'
                        }else if(this.nat == 1){
                            line_nat._value = 'force_rport'
                        }else if(this.nat == 2){
                            line_nat._value = 'yes'
                        }else if(this.nat == 3){
                            line_nat._value = 'comedia'
                        }
                        LineArr._item.push(line_nat)
                    }

                    if(this.sync.vosencrypt_sync){
                        let line_vosencrypt = new AST_Line()
                        line_vosencrypt._key = 'vosencrypt'
                        line_vosencrypt._value = this.vosencrypt
                        LineArr._item.push(line_vosencrypt)
                    }

                    if(this.sync.registeruser_sync){
                        let line_registeruser = new AST_Line()
                        line_registeruser._key = 'register_user'
                        line_registeruser._value = this.register_user
                        LineArr._item.push(line_registeruser)
                    }

                    if(this.sync.enableoutboundtohost_sync){
                        let line_enableoutboundtohost = new AST_Line()
                        line_enableoutboundtohost._key = 'enableoutboundtohost'
                        line_enableoutboundtohost._value = this.enableoutboundtohost == true ? 'yes' : 'no'
                        LineArr._item.push(line_enableoutboundtohost)
                    }

                    if(this.sync.fromuser_sync){
                        let line_fromuser = new AST_Line()
                        line_fromuser._key = 'fromuser'
                        line_fromuser._value = this.from_user
                        LineArr._item.push(line_fromuser)
                    }

                    if(this.sync.fromdomain_sync){
                        let line_fromdomain = new AST_Line()
                        line_fromdomain._key = 'fromdomain'
                        line_fromdomain._value = this.fromdomain
                        LineArr._item.push(line_fromdomain)
                    }

                    if(this.sync.port_sync){
                        if(this.port == 0){
                            this.port = ""
                        }

                        let line_port = new AST_Line()
                        line_port._key = 'port'
                        line_port._value = this.port
                        LineArr._item.push(line_port)
                    }

                    if(this.sync.qualify_sync){
                        let line_qualify = new AST_Line()
                        line_qualify._key = 'qualify'
                        if(this.qualify == 0){
                            line_qualify._value = 'no'
                        }else if(this.qualify == 1){
                            line_qualify._value = 'yes'
                        }
                        LineArr._item.push(line_qualify)
                    }

                    if(this.sync.qualify_frequency_sync){
                        let line_qualifyfreq = new AST_Line()
                        line_qualifyfreq._key = 'qualifyfreq'
                        line_qualifyfreq._value = this.qualifyfreq
                        LineArr._item.push(line_qualifyfreq)
                    }

                    if(this.sync.outboundproxy_sync){
                        if(this.outboundproxy != '' && this.outboundproxy_port != ''){
                            let line_outboundproxy = new AST_Line()
                            line_outboundproxy._key = 'outboundproxy'
                            line_outboundproxy._value = this.outboundproxy+':'+this.outboundproxy_port
                            LineArr._item.push(line_outboundproxy)
                        }else if(this.outboundproxy != ''){
                            let line_outboundproxy = new AST_Line()
                            line_outboundproxy._key = 'outboundproxy'
                            line_outboundproxy._value = this.outboundproxy+':5060'
                            LineArr._item.push(line_outboundproxy)
                        }else{
                            let line_outboundproxy = new AST_Line()
                            line_outboundproxy._key = 'outboundproxy'
                            line_outboundproxy._value = ''
                            LineArr._item.push(line_outboundproxy)
                        }
                    }

                    if(this.transport == 2){//TLS

                        if(this.sync.tlsverify_sync ||
                            this.sync.tlssetup_sync ||
                            this.sync.tlsprivatekey_sync ||
                            this.sync.encryption_sync
                        ){
                            let line_tlsenble = new AST_Line()
                            line_tlsenble._key = 'tlsenable'
                            if(this.tlsenable == 1){
                                line_tlsenble._value = 'yes'
                            }else{
                                line_tlsenble._value = 'no'
                            }
                            LineArr._item.push(line_tlsenble)
                        }

                        if(this.sync.tlsverify_sync){
                            let line_tlsverify = new AST_Line()
                            line_tlsverify._key = 'tlsverify'
                            if(this.tlsverify == 0){
                                line_tlsverify._value = 'no'
                            }else if(this.tlsverify == 1){
                                line_tlsverify._value = 'yes'
                            }
                            LineArr._item.push(line_tlsverify)
                        }

                        if(this.sync.tlssetup_sync){
                            let line_tlssetup = new AST_Line()
                            line_tlssetup._key = 'tlssetup'
                            if(this.tlssetup == 0){
                                line_tlssetup._value = 'incoming_and_outcoming'
                            }else if(this.tlssetup == 1){
                                line_tlssetup._value = 'incoming'
                            }else if(this.tlssetup == 2){
                                line_tlssetup._value = 'outcoming'
                            }
                            LineArr._item.push(line_tlssetup)
                        }

                        if(this.sync.tlsprivatekey_sync){
                            let line_tlsprivatekey = new AST_Line()
                            line_tlsprivatekey._key = 'tlsprivatekey'
                            line_tlsprivatekey._value = this.tlsprivatekey != '' ? '/etc/asterisk/keys/'+this.tlsprivatekey : ''
                            LineArr._item.push(line_tlsprivatekey)
                        }

                        if(this.sync.encryption_sync){
                            let line_encryption = new AST_Line()
                            line_encryption._key  = 'encryption'
                            if(this.encryption == 0){
                                line_encryption._value = 'no'
                            }else if(this.encryption == 1){
                                line_encryption._value = 'yes'
                            }
                            LineArr._item.push(line_encryption)
                        }

                    }/* TLS end */

                    if(this.sync.dtmfmode_sync){
                        let line_dtmfmode = new AST_Line()
                        line_dtmfmode._key = 'dtmfmode'
                        if(this.dtmfmode == 0){
                            line_dtmfmode._value = 'rfc2833'
                        }else if(this.dtmfmode == 1){
                            line_dtmfmode._value = 'inband'
                        }else if(this.dtmfmode == 2){
                            line_dtmfmode._value = 'info'
                        }
                        LineArr._item.push(line_dtmfmode)
                    }

                    if(this.sync.call_limit_sync){
                        let line_calllimit = new AST_Line()
                        line_calllimit._key = 'call-limit'
                        line_calllimit._value = this.call_limit
                        LineArr._item.push(line_calllimit)
                    }

                    if(this.sync.trustrpid_sync){
                        let line_trustrpid = new AST_Line()
                        line_trustrpid._key = 'trustrpid'
                        if(this.trustrpid == 0){
                            line_trustrpid._value = 'no'
                        }else if(this.trustrpid == 1){
                            line_trustrpid._value = 'yes'
                        }
                        LineArr._item.push(line_trustrpid)
                    }

                    if(this.sync.sendrpid_sync){
                        let line_sendrpid = new AST_Line()
                        line_sendrpid._key = 'sendrpid'
                        if(this.sendrpid == 0){
                            line_sendrpid._value = 'no'
                        }else if(this.sendrpid == 1){
                            line_sendrpid._value = 'yes'
                        }else if(this.sendrpid == 2){
                            line_sendrpid._value = 'rpid'
                        }else if(this.sendrpid == 3){
                            line_sendrpid._value = 'pai'
                        }
                        LineArr._item.push(line_sendrpid)
                    }

                    if(this.sync.rpid_format_sync){
                        let line_rpid_format = new AST_Line()
                        line_rpid_format._key = 'rpid_format'
                        if(this.rpid_format == 0){
                            line_rpid_format._value = 'pass'
                        }else if(this.rpid_format == 1){
                            line_rpid_format._value = 'rpid'
                        }
                        LineArr._item.push(line_rpid_format)
                    }

                    if(this.sync.callingpres_sync){
                        let line_callingpres = new AST_Line()
                        line_callingpres._key = 'callingpres'
                        if(this.callingpres == 0){
                            line_callingpres._value = 'allowed_not_screen'
                        }else if(this.callingpres == 1){
                            line_callingpres._value = 'allowed_passed_screen'
                        }else if(this.callingpres == 2){
                            line_callingpres._value = 'allowed_failed_screen'
                        }else if(this.callingpres == 3){
                            line_callingpres._value = 'allowed'
                        }else if(this.callingpres == 4){
                            line_callingpres._value = 'prohib_not_screen'
                        }else if(this.callingpres == 5){
                            line_callingpres._value = 'prohib_passed_screen'
                        }else if(this.callingpres == 6){
                            line_callingpres._value = 'prohib_failed_screen'
                        }else if(this.callingpres == 7){
                            line_callingpres._value = 'prohib'
                        }else if(this.callingpres == 8){
                            line_callingpres._value = 'unavailable'
                        }
                        LineArr._item.push(line_callingpres)
                    }

                    if(this.sync.progressinband_sync){
                        let line_progressinband = new AST_Line()
                        line_progressinband._key = 'progressinband'
                        if(this.progressinband == 0){
                            line_progressinband._value = 'never'
                        }else if(this.progressinband == 1){
                            line_progressinband._value = 'yes'
                        }else if(this.progressinband == 2){
                            line_progressinband._value = 'no'
                        }
                        LineArr._item.push(line_progressinband)
                    }

                    if(this.sync.allowoverlap_sync){
                        let line_allowoverlap = new AST_Line()
                        line_allowoverlap._key = 'allowoverlap'
                        if(this.allowoverlap == 0){
                            line_allowoverlap._value = 'no'
                        }else if(this.allowoverlap == 1){
                            line_allowoverlap._value = 'yes'
                        }
                        LineArr._item.push(line_allowoverlap)
                    }

                    if(this.sync.usereqphone_sync){
                        let line_usereqphone = new AST_Line()
                        line_usereqphone._key = 'usereqphone'
                        if(this.usereqphone == 0){
                            line_usereqphone._value = 'no'
                        }else if(this.usereqphone == 1){
                            line_usereqphone._value = 'yes'
                        }
                        LineArr._item.push(line_usereqphone)
                    }

                    if(this.sync.use_q850_reason_sync){
                        let line_use_q850_reason = new AST_Line()
                        line_use_q850_reason._key = 'use_q850_reason'
                        if(this.use_q850_reason == 0){
                            line_use_q850_reason._value = 'no'
                        }else if(this.use_q850_reason == 1){
                            line_use_q850_reason._value = 'yes'
                        }
                        LineArr._item.push(line_use_q850_reason)
                    }

                    if(this.sync.honor_sdp_version_sync){
                        let line_honorsdpversion = new AST_Line()
                        line_honorsdpversion._key = 'honorsdpversion'
                        if(this.honor_sdp_version == 0){
                            line_honorsdpversion._value = 'no'
                        }else if(this.honor_sdp_version == 1){
                            line_honorsdpversion._value = 'yes'
                        }
                        LineArr._item.push(line_honorsdpversion)
                    }

                    if(this.sync.allowtransfer_sync){
                        let line_allowtransfer = new AST_Line()
                        line_allowtransfer._key = 'allowtransfer'
                        if(this.allowtransfer == 0){
                            line_allowtransfer._value = 'no'
                        }else if(this.allowtransfer == 1){
                            line_allowtransfer._value = 'yes'
                        }
                        LineArr._item.push(line_allowtransfer)
                    }

                    if(this.sync.promiscredir_sync){
                        let line_promiscredir = new AST_Line()
                        line_promiscredir._key = 'promiscredir'
                        if(this.promiscredir == 0){
                            line_promiscredir._value = 'no'
                        }else if(this.promiscredir == 1){
                            line_promiscredir._value = 'yes'
                        }
                        LineArr._item.push(line_promiscredir)
                    }

                    if(this.sync.max_forwards_sync){
                        let line_max_forwards = new AST_Line()
                        line_max_forwards._key = 'max_forwards'
                        line_max_forwards._value = this.max_forwards
                        LineArr._item.push(line_max_forwards)
                    }

                    if(this.sync.send_trying_on_register_sync){
                        let line_registertrying = new AST_Line()
                        line_registertrying._key = 'registertrying'
                        if(this.send_trying_on_register == 0){
                            line_registertrying._value = 'no'
                        }else if(this.send_trying_on_register == 1){
                            line_registertrying._value = 'yes'
                        }
                        LineArr._item.push(line_registertrying)
                    }

                    if(this.sync.timert1_sync){
                        let line_timert1 = new AST_Line()
                        line_timert1._key = 'timert1'
                        line_timert1._value = this.timert1
                        LineArr._item.push(line_timert1)
                    }

                    if(this.sync.timerb_sync){
                        let line_timerb = new AST_Line()
                        line_timerb._key = 'timerb'
                        line_timerb._value = this.timerb
                        LineArr._item.push(line_timerb)
                    }

                    if(this.sync.session_timers_sync){
                        let line_session_timers = new AST_Line()
                        line_session_timers._key = 'session-timers'
                        if(this.session_timers == 0){
                            line_session_timers._value = 'accept'
                        }else if(this.session_timers == 1){
                            line_session_timers._value = 'originate'
                        }else if(this.session_timers == 2){
                            line_session_timers._value = 'refuse'
                        }
                        LineArr._item.push(line_session_timers)
                    }

                    if(this.sync.session_minse_sync){
                        let line_session_minse = new AST_Line()
                        line_session_minse._key = 'session-minse'
                        line_session_minse._value = this.session_minse
                        LineArr._item.push(line_session_minse)
                    }

                    if(this.sync.session_expires_sync){
                        let line_session_expires = new AST_Line()
                        line_session_expires._key = 'session-expires'
                        line_session_expires._value = this.session_expires
                        LineArr._item.push(line_session_expires)
                    }

                    if(this.sync.session_refresher_sync){
                        let line_session_refresher = new AST_Line()
                        line_session_refresher._key = 'session-refresher'
                        if(this.session_refresher == 0){
                            line_session_refresher._value = 'uac'
                        }else if(this.session_refresher == 1){
                            line_session_refresher._value = 'uas'
                        }
                        LineArr._item.push(line_session_refresher)
                    }

                    if(this.sync.mwi_sync){
                        let line_mwi = new AST_Line()
                        line_mwi._key = 'mwi'
                        let mwi_val = 'no'
                        if(this.mwi == 1) {
                            mwi_val = 'yes'
                        }
                        line_mwi._value = mwi_val
                        LineArr._item.push(line_mwi)
                    }

                    if(this.sync.sip_codec_priority_sync){
                        let line_allow = new AST_Line()
                        line_allow._key = 'allow'

                        let allow_val_arr = []
                        this.sip_codec_val_options.forEach(item => {
                            if(item == 1){
                                allow_val_arr.push('ulaw')
                            }else if(item == 2){
                                allow_val_arr.push('alaw')
                            }else if(item == 3){
                                allow_val_arr.push('g729')
                            }else if(item == 4){
                                allow_val_arr.push('g722')
                            }else if(item == 6){
                                allow_val_arr.push('ilbc')
                            }
                        })
                        let allow_val = allow_val_arr.join(',')

                        line_allow._value = allow_val
                        LineArr._item.push(line_allow)
                    }
                }

                /*** Sync other port End ***/

                let old_endpoint_name = this.$route.params.section
                old_endpoint_name = old_endpoint_name == undefined ? this.ruleForm.endpoint_name : old_endpoint_name

                console.log(sipcontext)
                this.request.AGSipEndpointSave(this.save_succeed_back, this.save_error_back, old_endpoint_name, this.ruleForm.endpoint_name, sipcontext, LineArr, SectionArr)
            },
            save_succeed_back(data){
                if(data['_result'] == 0){
                    this.$message({
                        message: this.lang.save_successfully,
                        type: 'success',
                        offset: '80'
                    })

                    this.$router.push('/SIP/voip-endpoints')
                }else{
                    this.$message({
                        message: this.lang.save_failed,
                        type: 'error',
                        offset: '80'
                    })
                }
            },
            save_error_back(error){
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },
        watch:{
            sync_port_arr: {
                handler(newval){
                    let tmp = newval.filter(item => item == true)
                    if(tmp.length > 0){
                        this.show_sync_params = true
                    }else{
                        this.show_sync_params = false
                    }
                },
                deep: true
            }
        },
        created() {
            this.debug = debuger('voip-endpoints-edit')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                if (this.$route.params.section == undefined) {
                    this.request.AGSipEndpointsNewGet(this.show_succeed_back, this.show_error_back)
                } else {
                    this.request.AGSipEndpointGetOne(this.show_succeed_back, this.show_error_back, this.$route.params.section)
                }
            }
        }
    }
</script>

<style>
    .el-tabs__nav-scroll{
        overflow: auto;
    }
</style>