<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <h1 style="line-height: 50px;font-size: 18px;padding-left: 20px;">
            {{lang.edit_sip_endpoint}} {{$route.params.section}}
            <div style="float: right;line-height: 50px;margin-right: 20px;">
                <el-button
                        style="vertical-align:middle;"
                        type="primary"
                        size="small"
                        @click="Save()"
                >{{lang.save}}</el-button>
            </div>
        </h1>

        <el-tabs v-model="activeName">

            <el-tab-pane :label="lang.main_endpoint_settings" name="main">
                <el-card shadow="never" style="margin:auto;padding:20px;margin-bottom:50px;" :style=$store.state.page.card_width>
                    <el-form
                            :label-position="$store.state.page.labelPosition"
                            label-width="250px"
                            class="change-label-class"
                            status-icon
                            size="small">

                        <el-divider content-position="left"><h3>{{lang.main_endpoint_settings}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.name_help"></span>
                                <span slot="param_name" >{{lang.name}}</span>
                                <el-input slot="param" v-model="endpoint_name"></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <el-col :lg="12">
                                <el-form-item>
                                    <label slot="label">
                                        <el-tooltip placement="top" :open-delay=200>
                                            <div slot="content" v-html="lang.username_help"></div>
                                            <span>{{lang.username}}</span>
                                        </el-tooltip>:
                                    </label>
                                    <el-col :lg="18">
                                        <el-input v-model="username"
                                                  @change="username_change"
                                                  :disabled="anonymous"></el-input>
                                    </el-col>
                                    <el-col :lg="4" style="margin-left: 20px;">
                                        <el-checkbox v-model="anonymous">{{lang.anonymous}}</el-checkbox>
                                    </el-col>
                                </el-form-item>
                            </el-col>

                            <form_item>
                                <span slot="param_help" v-html="lang.password_help"></span>
                                <span slot="param_name" >{{lang.password}}</span>
                                <el-input slot="param" v-model="password" :disabled="anonymous" show-password></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.registration_help"></span>
                                <span slot="param_name" >{{lang.registration}}</span>
                                <el-select slot="param" v-model="registration" @change="registration_change" style="width: 100%">
                                    <el-option
                                            v-for="item in registration_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.hostname_or_ipaddress_help"></span>
                                <span slot="param_name" >{{lang.hostname_or_ipaddress}}</span>
                                <el-input slot="param" v-model="host" @change="host_change"></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.backup_hostname_or_ip_help"></span>
                                <span slot="param_name" >{{lang.backup_hostname_or_ip}}</span>
                                <el-input slot="param" v-model="backup_host"></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.port_help"></span>
                                <span slot="param_name" >{{lang.port}}</span>
                                <el-input slot="param" v-model="port"></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.transport_help"></span>
                                <span slot="param_name" >{{lang.transport}}</span>
                                <el-select slot="param" v-model="transport" style="width: 100%">
                                    <el-option
                                            v-for="item in transport_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.nat_traversal_help"></span>
                                <span slot="param_name" >{{lang.nat_traversal}}</span>
                                <el-select slot="param" v-model="nat" style="width: 100%">
                                    <el-option
                                            v-for="item in nat_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.subscribe_for_mwi_help"></span>
                                <span slot="param_name" >{{lang.subscribe_for_mwi}}</span>
                                <el-select slot="param" v-model="mwi" :disabled="!(registration == 1)" style="width: 100%">
                                    <el-option
                                            v-for="item in mwi_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.vos_encryption_help"></span>
                                <span slot="param_name" >{{lang.vos_encryption}}</span>
                                <el-select slot="param" v-model="vosencrypt" style="width: 100%">
                                    <el-option
                                            v-for="item in vosencrypt_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.advanced_registration}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.authentication_user_help"></span>
                                <span slot="param_name" >{{lang.authentication_user}}</span>
                                <el-input slot="param" v-model="authentication_user" :disabled="!(this.registration == 1)"></el-input>
                            </form_item>

                            <el-col :lg="12">
                                <el-form-item>
                                    <label slot="label">
                                        <el-tooltip placement="top" :open-delay=200>
                                            <div slot="content" v-html="lang.register_extension_help"></div>
                                            <span>{{lang.register_extension}}</span>
                                        </el-tooltip>:
                                    </label>
                                    <el-col :lg="18">
                                        <el-input v-model="register_extension" :disabled="!(this.registration == 1)" :readonly="register_extension_readonly"></el-input>
                                    </el-col>
                                    <el-col :lg="4" style="margin-left: 20px;">
                                        <el-checkbox v-model="register_extension_readonly">{{lang.readonly}}</el-checkbox>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :lg="12">
                                <el-form-item>
                                    <label slot="label">
                                        <el-tooltip placement="top" :open-delay=200>
                                            <div slot="content" v-html="lang.register_user_help"></div>
                                            <span>{{lang.register_user}}</span>
                                        </el-tooltip>:
                                    </label>
                                    <el-col :lg="18">
                                        <el-input v-model="register_user" :readonly="register_user_readonly"></el-input>
                                    </el-col>
                                    <el-col :lg="4" style="margin-left: 20px;">
                                        <el-checkbox v-model="register_user_readonly">{{lang.readonly}}</el-checkbox>
                                    </el-col>
                                </el-form-item>
                            </el-col>

                            <el-col :lg="12">
                                <el-form-item>
                                    <label slot="label">
                                        <el-tooltip placement="top" :open-delay=200>
                                            <div slot="content" v-html="lang.from_user_help"></div>
                                            <span>{{lang.from_user}}</span>
                                        </el-tooltip>:
                                    </label>
                                    <el-col :lg="18">
                                        <el-input v-model="from_user" :readonly="from_user_readonly"></el-input>
                                    </el-col>
                                    <el-col :lg="4" style="margin-left: 20px;">
                                        <el-checkbox v-model="from_user_readonly">{{lang.readonly}}</el-checkbox>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.from_domain_help"></span>
                                <span slot="param_name" >{{lang.from_domain}}</span>
                                <el-input slot="param" v-model="from_domain"></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.qualify_help"></span>
                                <span slot="param_name" >{{lang.qualify}}</span>
                                <el-select slot="param" v-model="qualify" style="width: 100%">
                                    <el-option
                                            v-for="item in qualify_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.qualify_frequency_help"></span>
                                <span slot="param_name" >{{lang.qualify_frequency}}</span>
                                <el-input slot="param" v-model="qualifyfreq"></el-input>
                            </form_item>

                            <el-col :lg="12">
                                <el-form-item>
                                    <label slot="label">
                                        <el-tooltip placement="top" :open-delay=200>
                                            <div slot="content" v-html="lang.outbound_proxy_help"></div>
                                            <span>{{lang.outbound_proxy}}</span>
                                        </el-tooltip>:
                                    </label>
                                    <el-col :span="24">
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
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.custom_registery_help"></span>
                                <span slot="param_name" >{{lang.custom_registery}}</span>
                                <el-checkbox slot="param" v-model="registery_enable"></el-checkbox>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.registery_string_help"></span>
                                <span slot="param_name" >{{lang.registery_string}}</span>
                                <el-input slot="param" v-model="registery_string" :disabled="!registery_enable"></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.enable_outboundproxy_to_host_help"></span>
                                <span slot="param_name" >{{lang.enable_outboundproxy_to_host}}</span>
                                <el-checkbox slot="param" v-model="enableoutboundtohost"></el-checkbox>
                            </form_item>

                            <form_item v-if="transport == 2">
                                <span slot="param_help" v-html="lang.tlsverify_help"></span>
                                <span slot="param_name" >{{lang.tlsverify}}</span>
                                <el-select slot="param" v-model="tlsverify" style="width: 100%">
                                    <el-option
                                            v-for="item in tlsverify_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row v-if="transport == 2">
                            <form_item>
                                <span slot="param_help" v-html="lang.tlssetup_help"></span>
                                <span slot="param_name" >{{lang.tlssetup}}</span>
                                <el-select slot="param" v-model="tlssetup" style="width: 100%">
                                    <el-option
                                            v-for="item in tlssetup_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.tlsprivatekey_help"></span>
                                <span slot="param_name" >{{lang.tlsprivatekey}}</span>
                                <el-input slot="param" v-model="tlsprivatekey"></el-input>
                            </form_item>
                        </el-row>

                        <el-row v-if="transport == 2">
                            <form_item>
                                <span slot="param_help" v-html="lang.encryption_help"></span>
                                <span slot="param_name" >{{lang.encryption}}</span>
                                <el-select slot="param" v-model="encryption" style="width: 100%">
                                    <el-option
                                            v-for="item in encryption_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
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
                            ref="ruleForm"
                            size="small">


                        <el-divider content-position="left"><h3>{{lang.dtmf_settings}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.dtmf_mode_help"></span>
                                <span slot="param_name" >{{lang.dtmf_mode}}</span>
                                <el-select slot="param" v-model="dtmfmode" style="width: 100%">
                                    <el-option
                                            v-for="item in dtmfmode_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.call_limit}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.call_limit_help"></span>
                                <span slot="param_name" >{{lang.call_limit}}</span>
                                <el-input slot="param" v-model="call_limit"></el-input>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.caller_id_settings}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.trust_id_help"></span>
                                <span slot="param_name" >{{lang.trust_id}}</span>
                                <el-select slot="param" v-model="trustrpid" style="width: 100%">
                                    <el-option
                                            v-for="item in trustrpid_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.send_remote_party_id_help"></span>
                                <span slot="param_name" >{{lang.send_remote_party_id}}</span>
                                <el-select slot="param" v-model="sendrpid" style="width: 100%">
                                    <el-option
                                            v-for="item in sendrpid_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.remote_party_id_format_help"></span>
                                <span slot="param_name" >{{lang.remote_party_id_format}}</span>
                                <el-select slot="param" v-model="rpid_format" style="width: 100%">
                                    <el-option
                                            v-for="item in rpid_format_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.caller_id_presentation_help"></span>
                                <span slot="param_name" >{{lang.caller_id_presentation}}</span>
                                <el-select slot="param" v-model="callingpres" style="width: 100%">
                                    <el-option
                                            v-for="item in callingpres_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.advanced_signaling_settings}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.progress_inband_help"></span>
                                <span slot="param_name" >{{lang.progress_inband}}</span>
                                <el-select slot="param" v-model="progressinband" style="width: 100%">
                                    <el-option
                                            v-for="item in progressinband_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.allow_overlap_dialing_help"></span>
                                <span slot="param_name" >{{lang.allow_overlap_dialing}}</span>
                                <el-select slot="param" v-model="allowoverlap" style="width: 100%">
                                    <el-option
                                            v-for="item in allowoverlap_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.append_user"></span>
                                <span slot="param_name" >{{lang.append_user}}</span>
                                <el-select slot="param" v-model="usereqphone" style="width: 100%">
                                    <el-option
                                            v-for="item in usereqphone_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.add_reason_header_help"></span>
                                <span slot="param_name" >{{lang.add_reason_header}}</span>
                                <el-select slot="param" v-model="use_q850_reason" style="width: 100%">
                                    <el-option
                                            v-for="item in use_q850_reason_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.honor_sdp_version_help"></span>
                                <span slot="param_name" >{{lang.honor_sdp_version}}</span>
                                <el-select slot="param" v-model="honor_sdp_version" style="width: 100%">
                                    <el-option
                                            v-for="item in honor_sdp_version_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.allow_transfers_help"></span>
                                <span slot="param_name" >{{lang.allow_transfers}}</span>
                                <el-select slot="param" v-model="allowtransfer" style="width: 100%">
                                    <el-option
                                            v-for="item in allowtransfer_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.allow_promiscuous_redirects_help"></span>
                                <span slot="param_name" >{{lang.allow_promiscuous_redirects}}</span>
                                <el-select slot="param" v-model="promiscredir" style="width: 100%">
                                    <el-option
                                            v-for="item in promiscredir_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.max_forwards_help"></span>
                                <span slot="param_name" >{{lang.max_forwards}}</span>
                                <el-input slot="param" v-model="max_forwards"></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.send_trying_on_register_help"></span>
                                <span slot="param_name" >{{lang.send_trying_on_register}}</span>
                                <el-select slot="param" v-model="send_trying_on_register" style="width: 100%">
                                    <el-option
                                            v-for="item in send_trying_on_register_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.advanced_timer_settings}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.default_t1_timer_help"></span>
                                <span slot="param_name" >{{lang.default_t1_timer}}</span>
                                <el-input slot="param" v-model="timert1"></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.call_setup_timer_help"></span>
                                <span slot="param_name" >{{lang.call_setup_timer}}</span>
                                <el-input slot="param" v-model="timerb"></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.session_timers_help"></span>
                                <span slot="param_name" >{{lang.session_timers}}</span>
                                <el-select slot="param" v-model="session_timers" style="width: 100%">
                                    <el-option
                                            v-for="item in session_timers_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.minimun_session_refresh_interval_help"></span>
                                <span slot="param_name" >{{lang.minimun_session_refresh_interval}}</span>
                                <el-input slot="param" v-model="session_minse"></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.maximun_session_refresh_interval_help"></span>
                                <span slot="param_name" >{{lang.maximun_session_refresh_interval}}</span>
                                <el-input slot="param" v-model="session_expires"></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.session_refresher_help"></span>
                                <span slot="param_name" >{{lang.session_refresher}}</span>
                                <el-select slot="param" v-model="session_refresher" style="width: 100%">
                                    <el-option
                                            v-for="item in session_refresher_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
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
                            ref="ruleForm"
                            size="small">

                        <el-divider content-position="left"><h3>{{lang.media_setting}}</h3></el-divider>

                        <el-row v-for="(item,index) in sip_codec_val_options">
                            <form_item>
                                <span slot="param_help" v-html="lang.codec_priority"></span>
                                <span slot="param_name" >{{lang.codec_priority}} {{index+1}}</span>
                                <el-select slot="param" v-model="sip_codec_val_options[index]" style="width: 100%">
                                    <el-option
                                            v-for="i in sip_codec_priority_options"
                                            :label="i.label"
                                            :key="i.value"
                                            :value="i.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                    </el-form>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "add",
        data() {
            return{
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
                authentication_user: '',
                register_extension: '',
                register_user: '',
                from_user: '',
                from_domain: '',
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
                    label: 'server',
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
                    label: 'Yse',
                    value: 1
                }],

                vosencrypt_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yse',
                    value: 2
                }],

                qualify_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yse',
                    value: 1
                }],

                tlsverify_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yse',
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
                    label: 'Yse',
                    value: 1
                }],

                sendrpid_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yse',
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
                    label: 'Yse',
                    value: 1
                },{
                    label: 'No',
                    value: 2
                }],

                allowoverlap_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yse',
                    value: 1
                }],

                usereqphone_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yse',
                    value: 1
                }],

                use_q850_reason_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yse',
                    value: 1
                }],

                honor_sdp_version_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yse',
                    value: 1
                }],

                allowtransfer_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yse',
                    value: 1
                }],

                promiscredir_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yse',
                    value: 1
                }],

                send_trying_on_register_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yse',
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

                activeName: 'main',

                lang: this.$store.state.lang
            }
        },
        methods:{
            registration_change(){
                if(this.registration == 2){//server
                    this.host = 'dynamic'
                    this.qualify = 1
                }else if(this.registration == 1){//client
                    this.host = ''
                    this.qualify = 0
                }else{//none
                    this.host = ''
                    this.qualify = 0
                }
            },
            username_change(){
                this.register_extension = this.username
                this.register_user = this.username
                this.from_user = this.username
            },
            host_change(){
                this.from_domain = this.host
            },
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let is_add = this.$route.params.section == undefined ? true : false

                let _context = data['_get']['_context']

                this.endpoint_name = this.$route.params.section
                this.username = _context['_username']
                this.anonymous = _context['_allowanonymous'] == 1 ? true : false
                this.password = _context['_secret']
                this.registration = parseInt(_context['_registration'])
                this.host = _context['_host']
                this.backup_host = _context['_backup']
                this.port = _context['_port']

                if(_context['_transport'] == 0 || _context['_transport'] == 1 || _context['_transport'] == 2){
                    this.transport = parseInt(_context['_transport'])
                }else{
                    this.transport = 0
                }
                this.nat = parseInt(_context['_nat'])
                this.mwi = parseInt(_context['_mwi'])
                this.vosencrypt = parseInt(_context['_vosencrypt'])
                this.authentication_user = _context['_auth']
                this.register_extension = _context['_registerextension']
                this.register_user = _context['_registeruser']
                this.from_user = _context['_fromuser']
                this.from_domain = _context['_fromdomain']
                this.qualify = parseInt(_context['_qualify'])

                if(this.$store.state.systemtype == 'yfree' || this.$store.state.systemtype == 'general'){
                    this.qualifyfreq = 60
                }else if(is_add){
                    this.qualifyfreq = 15
                }else{
                    this.qualifyfreq = _context['_qualifyfreq']
                }

                this.outboundproxy = _context['_outboundproxy']
                this.outboundproxy_port = is_add ? 5060 : _context['_outboundproxyport']
                this.registery_enable = _context['_registeryenable'] == 1 ? true : false
                this.registery_string = _context['_registerystring']
                this.enableoutboundtohost = _context['_enableoutboundtohost'] == 1 ? true : false
                this.tlsverify = _context['_tlsverify']
                this.tlssetup = _context['_tlssetup']

                if(_context['_tlsprivatekey'] != ''){
                    let temp = _context['_tlsprivatekey'].split('/');
                    this.tlsprivatekey = temp[4]
                }else{
                    this.tlsprivatekey = ''
                }

                this.encryption = is_add ? 1 : parseInt(_context['_encryption'])
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
                this.honor_sdp_version = parseInt(_context['_honorsdpversion'])
                this.allowtransfer = parseInt(_context['_allowtransfer'])
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

            Save(){
                const sipcontext = new AST_SipContext()

                sipcontext._username = this.username
                sipcontext._allowanonymous = this.anonymous == true ? 1 : 0
                sipcontext._secret = this.password
                sipcontext._registration = this.registration
                sipcontext._host = this.host
                sipcontext._backup = this.backup_host
                sipcontext._transport = this.transport
                sipcontext._nat = this.nat
                sipcontext._mwi = this.mwi
                sipcontext._vosencrypt = this.vosencrypt
                sipcontext._auth = this.authentication_user
                sipcontext._registerextension = this.register_extension
                sipcontext._registeruser = this.register_user
                sipcontext._fromuser = this.from_user
                sipcontext._fromdomain = this.from_domain
                sipcontext._port = this.port
                sipcontext._qualify = this.qualify
                sipcontext._qualifyfreq = this.qualifyfreq
                sipcontext._outboundproxy = this.outboundproxy
                sipcontext._outboundproxyport = this.outboundproxy_port
                sipcontext._registeryenable = this.registery_enable == true ? 1 : 0
                sipcontext._registerystring = this.registery_string
                sipcontext._enableoutboundtohost = this.enableoutboundtohost == true ? 1 : 0

                if(this.transport == 2){
                    let tlsenable = 1
                    sipcontext._tlsenable = tlsenable
                    sipcontext._tlsverify = this.tlsverify
                    sipcontext._tlssetup = this.tlssetup
                    sipcontext._tlsprivatekey = this.tlsprivatekey
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
                sipcontext._order = this.order

                let allow = this.sip_codec_val_options.join('')
                sipcontext._allow = allow
                sipcontext._order = this.order
                sipcontext._md5 = md5(this.username+'-'+this.password)

                const LineArr = new AST_LineArr()
                const SectionArr = new AST_SectionArr()

                let old_endpoint_name = this.$route.params.section
                old_endpoint_name = old_endpoint_name == undefined ? this.endpoint_name : old_endpoint_name

                this.request.AGSipEndpointSave(this.save_succeed_back, this.save_error_back, old_endpoint_name, this.endpoint_name, sipcontext, LineArr, SectionArr)
            },
            save_succeed_back(data){
                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })

                this.$router.push('/SIP/voip-endpoints')
            },
            save_error_back(error){
                console.log(error)
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },

        created() {
            if(this.$route.params.section == undefined){
                this.request.AGSipEndpointsNewGet(this.show_succeed_back, this.show_error_back)
            }else{
                this.request.AGSipEndpointGetOne(this.show_succeed_back, this.show_error_back, this.$route.params.section)
            }
        }
    }
</script>

<style>
    .el-tabs__nav-scroll{
        overflow: auto;
    }
</style>