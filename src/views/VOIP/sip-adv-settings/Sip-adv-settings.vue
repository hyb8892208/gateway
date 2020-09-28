<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <h1 style="line-height: 50px;font-size: 18px;padding-left: 20px;">
            {{lang.advanced_sip_settings}}
            <div style="float: right;line-height: 50px;margin-right: 20px;">
                <el-button
                        type="primary"
                        size="small"
                        @click="Save"
                >{{lang.save}}</el-button>
            </div>
        </h1>

        <el-tabs v-model="activeName">

            <el-tab-pane :label="lang.networking" name="Networking">
                <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>
                    <el-form :label-position="$store.state.page.labelPosition"
                             label-width="250px"
                             class="change-label-class"
                             status-icon
                             ref="ruleForm"
                             size="small">

                        <el-divider content-position="left"><h3>{{lang.general}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.udp_bind_port_help"></span>
                                <span slot="param_name" >{{lang.udp_bind_port}}</span>
                                <el-input slot="param" v-model="udp_bind_port" ></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.enable_tcp_help"></span>
                                <span slot="param_name" >{{lang.enable_tcp}}</span>
                                <el-select slot="param" v-model="enable_tcp" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.tcp_bind_port"></span>
                                <span slot="param_name" >{{lang.tcp_bind_port}}</span>
                                <el-input slot="param" v-model="tcp_bind_port" ></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.tcp_authentication_timeout_help"></span>
                                <span slot="param_name" >{{lang.tcp_authentication_timeout}}</span>
                                <el-input slot="param" v-model="tcp_authentication_timeout" ></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.tcp_authentication_limit_help"></span>
                                <span slot="param_name" >{{lang.tcp_authentication_limit}}</span>
                                <el-input slot="param" v-model="tcp_authentication_limit" ></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.enable_hostname_lookup_help"></span>
                                <span slot="param_name" >{{lang.enable_hostname_lookup}}</span>
                                <el-select slot="param" v-model="enable_hostname_lookup" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.nat_settings}}</h3></el-divider>

                        <el-row>
                            <el-col :lg="22">
                                <el-form-item>
                                    <label slot="label">
                                        <el-tooltip placement="top" :open-delay=200>
                                            <div slot="content" v-html="lang.local_network_help"></div>
                                            <span>{{lang.local_network}}</span>
                                        </el-tooltip>:
                                    </label>
                                    <el-col :lg="8">
                                        <el-input v-model="local_network" ></el-input>
                                    </el-col>
                                    <el-col :lg="4">
                                        <el-button type="primary"
                                                   size="small"
                                                   @click="add_local_network"
                                                   style="margin-left:20px;float: left;">
                                            {{lang.add}}</el-button>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :lg="15">
                                <el-form-item>
                                    <label slot="label">
                                        <el-tooltip placement="top" :open-delay=200>
                                            <div slot="content" v-html="lang.local_network_list_help"></div>
                                            <span>{{lang.local_network_list}}</span>
                                        </el-tooltip>:
                                    </label>
                                    <el-card class="box-card" shadow="never" style="min-height: 50px;padding:15px;">
                                        <el-col :lg="11"
                                                v-for="(item,index) in local_network_list"
                                                style="margin-left:20px;">
                                            <el-input size="small"
                                                      style="margin-top: 10px;"
                                                      :key="index"
                                                      readonly
                                                      v-model="local_network_list[index]"
                                            >
                                                <i slot="suffix"
                                                   style="margin-right: 3px;cursor:pointer;"
                                                   @click="remove_local_network(index)"
                                                   class="el-icon-close"></i>
                                            </el-input>
                                        </el-col>
                                    </el-card>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.subscribe_network_change_event_help"></span>
                                <span slot="param_name" >{{lang.subscribe_network_change_event}}</span>
                                <el-select slot="param" v-model="subscribe_network_change_event" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.match_external_address_locally_help"></span>
                                <span slot="param_name" >{{lang.match_external_address_locally}}</span>
                                <el-select slot="param" v-model="match_external_address_locally" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.dynamic_exclude_static_help"></span>
                                <span slot="param_name" >{{lang.dynamic_exclude_static}}</span>
                                <el-select slot="param" v-model="dynamic_exclude_static" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.externally_mapped_tcp_port_help"></span>
                                <span slot="param_name" >{{lang.externally_mapped_tcp_port}}</span>
                                <el-input slot="param" v-model="externally_mapped_tcp_port" ></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.external_address_help"></span>
                                <span slot="param_name" >{{lang.external_address}}</span>
                                <el-input slot="param" v-model="external_address" ></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.external_hostname_help"></span>
                                <span slot="param_name" >{{lang.external_hostname}}</span>
                                <el-input slot="param" v-model="external_hostname" ></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.hostname_refresh_internal_help"></span>
                                <span slot="param_name" >{{lang.hostname_refresh_internal}}</span>
                                <el-input slot="param" v-model="hostname_refresh_interval" ></el-input>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.rtp_settings}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.start_of_rtp_port_range_help"></span>
                                <span slot="param_name" >{{lang.start_of_rtp_port_range}}</span>
                                <el-input slot="param" v-model="start_of_rtp_port_range" ></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.end_of_rtp_port_range_help"></span>
                                <span slot="param_name" >{{lang.end_of_rtp_port_range}}</span>
                                <el-input slot="param" v-model="end_of_rtp_port_range" ></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.rtp_timeout_help"></span>
                                <span slot="param_name" >{{lang.rtp_timeout}}</span>
                                <el-input slot="param" v-model="rtptimeout" ></el-input>
                            </form_item>
                        </el-row>

                        <div style="clear:both;"></div>
                    </el-form>
                </el-card>
            </el-tab-pane>

            <el-tab-pane :label="lang.parsing_and_compatibility" name="Parsing">
                <el-card shadow="never" style="width: 95%;margin:auto;padding: 20px;margin-bottom: 50px;">
                    <el-form :label-position="$store.state.page.labelPosition" label-width="250px" class="change-label-class" status-icon ref="ruleForm" size="small">

                        <el-divider content-position="left"><h3>{{lang.general}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.strict_rfc_interpretation_help"></span>
                                <span slot="param_name" >{{lang.strict_rfc_interpretation}}</span>
                                <el-select slot="param" v-model="strict_rfc_interpretation" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.send_compact_headers_help"></span>
                                <span slot="param_name" >{{lang.send_compact_headers}}</span>
                                <el-select slot="param" v-model="send_compact_headers" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.sdp_owner_help"></span>
                                <span slot="param_name" >{{lang.sdp_owner}}</span>
                                <el-input slot="param" v-model="sdp_owner"></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.matching_priority_help"></span>
                                <span slot="param_name" >{{lang.matching_priority}}</span>
                                <el-select slot="param" v-model="matching_priority" style="width: 100%;">
                                    <el-option
                                            v-for="item in matching_priority_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>SIP Methods</h3></el-divider>

                        <el-row>
                            <el-col :lg="24">
                                <el-form-item>
                                    <label slot="label">
                                        <el-tooltip placement="top" :open-delay=200>
                                            <div slot="content" v-html="lang.disallowed_sip_methods_help"></div>
                                            <span>{{lang.disallowed_sip_methods}}</span>
                                        </el-tooltip>:
                                    </label>
                                    <el-col :lg="24">
                                        <el-checkbox-group v-model="checkList">
                                            <el-checkbox v-for="item in sip_methods_options"
                                                         :label="item"
                                                         :key="item">{{item}}</el-checkbox>
                                        </el-checkbox-group>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.hangup_cause_code_help"></span>
                                <span slot="param_name" >{{lang.hangup_cause_code}}</span>
                                <el-select slot="param" v-model="hangupcausecode" style="width: 100%;">
                                    <el-option
                                            v-for="item in hangupcausecode_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.caller_id}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.shrink_caller_id_help"></span>
                                <span slot="param_name" >{{lang.shrink_caller_id}}</span>
                                <el-select slot="param" v-model="shrink_caller_id" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.sip_from_help"></span>
                                <span slot="param_name" >{{lang.sip_from}}</span>
                                <el-select slot="param" v-model="sip_from" style="width: 100%;">
                                    <el-option
                                            v-for="item in sip_from_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.callee_id}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.sip_to_help"></span>
                                <span slot="param_name" >{{lang.sip_to}}</span>
                                <el-select slot="param" v-model="sip_to" style="width: 100%;">
                                    <el-option
                                            v-for="item in sipto_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.callee_id_help"></span>
                                <span slot="param_name" >{{lang.callee_id}}</span>
                                <el-select slot="param" v-model="callee_id_1" style="width: 100%;">
                                    <el-option
                                            v-for="item in callee_id_1_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.timer_configuration}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.maximum_registration_expiry_help"></span>
                                <span slot="param_name" >{{lang.maximum_registration_expiry}}</span>
                                <el-input slot="param" v-model="maximum_registration_expiry" ></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.minimum_registration_expiry_help"></span>
                                <span slot="param_name" >{{lang.minimum_registration_expiry}}</span>
                                <el-input slot="param" v-model="minimum_registration_expiry" ></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.default_registration_expiry_help"></span>
                                <span slot="param_name" >{{lang.default_registration_expiry}}</span>
                                <el-input slot="param" v-model="default_registration_expiry" ></el-input>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.outbound_registrations}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.registration_timeout_help"></span>
                                <span slot="param_name" >{{lang.registration_timeout}}</span>
                                <el-input slot="param" v-model="registration_timeout" ></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.number_of_registration_attempts_help"></span>
                                <span slot="param_name" >{{lang.number_of_registration_attempts}}</span>
                                <el-input slot="param" v-model="number_of_registration_attemptsy" ></el-input>
                            </form_item>
                        </el-row>
                    </el-form>
                </el-card>
            </el-tab-pane>

            <el-tab-pane :label="lang.security_and_media" name="Security">
                <el-card shadow="never" style="width: 95%;margin:auto;padding: 20px;margin-bottom: 50px;">
                    <el-form :label-position="$store.state.page.labelPosition" label-width="250px" class="change-label-class" status-icon ref="ruleForm" size="small">

                        <el-divider content-position="left"><h3>{{lang.authentication_settings}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.match_auth_username_help"></span>
                                <span slot="param_name" >{{lang.match_auth_username}}</span>
                                <el-select slot="param" v-model="match_auth_username" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.realm_help"></span>
                                <span slot="param_name" >{{lang.realm}}</span>
                                <el-input slot="param" v-model="realm" ></el-input>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.use_domain_as_realm_help"></span>
                                <span slot="param_name" >{{lang.use_domain_as_realm}}</span>
                                <el-select slot="param" v-model="use_domain_as_realm" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.always_auth_reject_help"></span>
                                <span slot="param_name" >{{lang.always_auth_reject}}</span>
                                <el-select slot="param" v-model="always_auth_reject" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.authenticate_options_requests_help"></span>
                                <span slot="param_name" >{{lang.authenticate_options_requests}}</span>
                                <el-select slot="param" v-model="authenticate_options_requests" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.guest_calling}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.allow_guest_calling_help"></span>
                                <span slot="param_name" >{{lang.allow_guest_calling}}</span>
                                <el-select slot="param" v-model="allow_guest_calling" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.isdn_media_settings}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.premature_media_help"></span>
                                <span slot="param_name" >{{lang.premature_media}}</span>
                                <el-select slot="param" v-model="premature_media" style="width: 100%;">
                                    <el-option
                                            v-for="item in yes_or_no_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>RTP for SIP</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.directmedia_help"></span>
                                <span slot="param_name" >{{lang.directmedia}}</span>
                                <el-select slot="param" v-model="direct_media" style="width: 100%;">
                                    <el-option
                                            v-for="item in direct_media_options"
                                            :label="item.label"
                                            :key="item.value"
                                            :value="item.value"></el-option>
                                </el-select>
                            </form_item>
                        </el-row>

                        <el-divider content-position="left"><h3>{{lang.qos_tos}}</h3></el-divider>

                        <el-row>
                            <form_item>
                                <span slot="param_help" v-html="lang.tos_for_sip_packets_help"></span>
                                <span slot="param_name" >{{lang.tos_for_sip_packets}}</span>
                                <el-input slot="param" v-model="tos_for_sip_packets" ></el-input>
                            </form_item>

                            <form_item>
                                <span slot="param_help" v-html="lang.tos_for_rtp_packeds_help"></span>
                                <span slot="param_name" >{{lang.tos_for_rtp_packeds}}</span>
                                <el-input slot="param" v-model="tos_for_rtp_packets" ></el-input>
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

    const sip_methods = ['ACK','BYE', 'CANCEL', 'INFO', 'INVITE', 'MESSAGE', 'NOTIFY', 'OPTIONS', 'PRACK', 'PUBLISH', 'REFER', 'REGISTER', 'SUBSCRIBE', 'UPDATE']

    export default {
        name: "Sip-adv-settings",
        data(){
            return {
                request: '',

                udp_bind_port: '',
                enable_tcp: '',
                tcp_bind_port: '',
                tcp_authentication_timeout: '',
                tcp_authentication_limit: '',
                enable_hostname_lookup: '',
                subscribe_network_change_event: '',
                match_external_address_locally: '',
                dynamic_exclude_static: '',
                externally_mapped_tcp_port: '',
                external_address: '',
                external_hostname: '',
                hostname_refresh_interval: '',
                stun_enable: '',
                stun_port: '',
                stun_reflesh: '',
                stun_server: '',
                stun_server_sw: '',
                stun_client_sw: '',
                stun_none_sw: '',
                start_of_rtp_port_range: '',
                end_of_rtp_port_range: '',
                rtptimeout: '',
                strict_rfc_interpretation: '',
                send_compact_headers: '',
                sdp_owner: '',
                matching_priority: '',
                hangupcausecode: '',
                shrink_caller_id: '',
                sip_from: '',
                sip_to: '',
                callee_id_1: '',
                callee_id_2: '',
                maximum_registration_expiry: '',
                minimum_registration_expiry: '',
                default_registration_expiry: '',
                registration_timeout: '',
                number_of_registration_attemptsy: '',
                match_auth_username: '',
                realm: '',
                use_domain_as_realm: '',
                always_auth_reject: '',
                authenticate_options_requests: '',
                allow_guest_calling: '',
                premature_media: '',
                direct_media: '',
                tos_for_sip_packets: '',
                tos_for_rtp_packets: '',
                local_network: '',
                local_network_list: [],

                sip_methods_options: sip_methods,
                checkList: [],

                yes_or_no_options: [{
                    label: 'No',
                    value: 0
                },{
                    label: 'Yes',
                    value: 1
                }],

                matching_priority_options: [{
                    label: 'From-Number',
                    value: 0
                },{
                    label: 'Extern-Number',
                    value: 1
                },{
                    label: 'From-Name',
                    value: 2
                }],

                hangupcausecode_options: [{
                    label: 'default',
                    value: 0
                },{
                    label: '404 Not Found',
                    value: 1
                },{
                    label: '420 No Route Destination',
                    value: 3
                },{
                    label: '486 Busy Here',
                    value: 17
                },{
                    label: '408 Request Timeout',
                    value: 18
                },{
                    label: '480 Temporarily Unavailable',
                    value: 19
                },{
                    label: '403 Forbidden',
                    value: 21
                },{
                    label: '410 Gone',
                    value: 22
                },{
                    label: '502 Bad Gateway',
                    value: 27
                },{
                    label: '484 Address Incomplete',
                    value: 28
                },{
                    label: '501 Not Implemented',
                    value: 29
                },{
                    label: '500 Server Internal Failure',
                    value: 38
                },{
                    label: '503 Service Unavailable',
                    value: 42
                },{
                    label: '488 Not Acceptable Here',
                    value: 58
                },{
                    label: '603 Declined',
                    value: 127
                }],

                sip_from_options: [{
                    label: 'Name',
                    value: 0
                },{
                    label: 'Number',
                    value: 1
                }],

                sipto_options: [{
                    label: 'Tel/Tel',
                    value: 0
                },{
                    label: 'Tel/User',
                    value: 1
                }],

                callee_id_1_options: [{
                    label: 'EXTEN',
                    value: 0
                },{
                    label: 'SIP To',
                    value: 1
                },{
                    label: 'SIP From',
                    value: 2
                }],

                callee_id_2_options: [{
                    label: 'Number',
                    value: 0
                },{
                    label: 'Name',
                    value: 1
                }],

                direct_media_options: [{
                   label: 'yes',
                   value: 0
                },{
                    label: 'no',
                    value: 1
                },{
                    label: 'nonat',
                    value: 2
                },{
                    label: 'update',
                    value: 3
                },{
                    label: 'outgoing',
                    value: 4
                }],

                activeName: 'Networking',

                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _sipadv = data['_get']['_sipadv']
                let _siprtp = data['_get']['_siprtp']
                let stun_data = _sipadv['_stun']

                this.udp_bind_port = _sipadv['_udpbindport'] == 0 ? '5060' : _sipadv['_udpbindport']
                this.enable_tcp = parseInt(_sipadv['_tcpenable'])
                this.tcp_bind_port = _sipadv['_tcpbindport'] == 0 ? '5060' : _sipadv['_tcpbindport']
                this.tcp_authentication_timeout = _sipadv['_tcpauthtimeout'] == 0 ? '' : _sipadv['_tcpauthtimeout']
                this.tcp_authentication_limit = _sipadv['_tcpauthlimit'] == 0 ? '' : _sipadv['_tcpauthlimit']
                this.enable_hostname_lookup = parseInt(_sipadv['_srvlookup'])
                this.subscribe_network_change_event = parseInt(_sipadv['_subevent'])
                this.match_external_address_locally = parseInt(_sipadv['_matchexternaddrlocally'])
                this.dynamic_exclude_static = parseInt(_sipadv['_dynamicexcludestatic'])
                this.externally_mapped_tcp_port = _sipadv['_externtcpport'] == 0 ? '' : _sipadv['_externtcpport']
                this.external_address = _sipadv['_externaddr']
                this.external_hostname = _sipadv['_externhost']
                this.hostname_refresh_interval = _sipadv['_externrefresh']
                this.start_of_rtp_port_range = _siprtp['_rtpstart'] == 0 ? '10000' : _siprtp['_rtpstart']
                this.end_of_rtp_port_range = _siprtp['_rtpend'] == 0 ? '20000' : _siprtp['_rtpend']
                this.rtptimeout = _sipadv['_rtptimeout'] == 0 ? '20' : _sipadv['_rtptimeout']
                this.strict_rfc_interpretation = parseInt(_sipadv['_pedantic'])
                this.send_compact_headers = parseInt(_sipadv['_compactheaders'])
                this.sdp_owner = _sipadv['_sdpowner']
                this.matching_priority = parseInt(_sipadv['_matchingpriority'])
                this.hangupcausecode = parseInt(_sipadv['_hangupcausecode'])
                this.shrink_caller_id = parseInt(_sipadv['_shrinkcallerid'])
                this.sip_to = parseInt(_sipadv['_sipto'])
                this.sip_from = parseInt(_sipadv['_allowcidnamefromdomin'])
                this.callee_id_1 = parseInt(_sipadv['_calleeid1'])
                this.callee_id_2 = parseInt(_sipadv['_calleeid2'])
                this.maximum_registration_expiry = _sipadv['_maxexpiry'] == 0 ? '' : _sipadv['_maxexpiry']
                this.minimum_registration_expiry = _sipadv['_minexpiry'] == 0 ? '' : _sipadv['_minexpiry']
                this.default_registration_expiry = _sipadv['_defaultexpiry'] == 0 ? '' : _sipadv['_defaultexpiry']
                this.registration_timeout = _sipadv['_registertimeout'] == 0 ? '' : _sipadv['_registertimeout']
                this.number_of_registration_attemptsy = _sipadv['_registerattempts'] == 0 ? '' : _sipadv['_registerattempts']
                this.match_auth_username = parseInt(_sipadv['_matchauthusername'])
                this.realm = _sipadv['_realm']
                this.use_domain_as_realm = parseInt(_sipadv['_domainasrealm'])
                this.always_auth_reject = parseInt(_sipadv['_alwaysauthreject'])
                this.authenticate_options_requests = parseInt(_sipadv['_authoptionsrequest'])
                this.allow_guest_calling = parseInt(_sipadv['_allowguest'])
                this.premature_media = parseInt(_sipadv['_prematuremedia'])
                this.direct_media = parseInt(_sipadv['_directmedia'])
                this.tos_for_sip_packets = _sipadv['_tossip']
                this.tos_for_rtp_packets = _sipadv['_tosaudio']

                this.stun_enable = stun_data['_enable'] == 1 ? true : false
                this.stun_port = stun_data['_port'] == 0 ? 3478 : stun_data['_port']
                this.stun_reflesh = stun_data['_reflesh'] == 0 ? 30 : stun_data['_reflesh']
                this.stun_server = stun_data['_server']
                this.stun_server_sw = stun_data['_serverstunsw'] == 1 ? true : false
                this.stun_client_sw = stun_data['_clientstunsw'] == 1 ? true : false
                this.stun_none_sw = stun_data['_nonestunsw'] == 1 ? true : false

                _sipadv['_disallowedmethods'].split('').forEach((item,index) => {
                    if(item == 1){//1选中，0未选中
                        let val = this.sip_methods_options[index]
                        if(this.checkList.indexOf(val) == -1)
                            this.checkList.push(val)
                    }
                })

                if(_sipadv['_localnet'] != ''){
                    _sipadv['_localnet'].split(';').forEach(item => {
                        if(item != ''){
                            this.local_network_list.push(item)
                        }
                    })
                }
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            Save(){
                const sipadvget = new AST_SipAdv()

                sipadvget._udpbindport = this.udp_bind_port
                sipadvget._tcpenable = this.enable_tcp
                sipadvget._tcpbindport = this.tcp_bind_port
                sipadvget._tcpauthtimeout = this.tcp_authentication_timeout == '' ? 0 : this.tcp_authentication_timeout
                sipadvget._tcpauthlimit = this.tcp_authentication_limit == '' ? 0 : this.tcp_authentication_limit
                sipadvget._srvlookup = this.enable_hostname_lookup
                sipadvget._subevent = this.subscribe_network_change_event
                sipadvget._matchexternaddrlocally = this.match_external_address_locally
                sipadvget._dynamicexcludestatic = this.dynamic_exclude_static
                sipadvget._externtcpport = this.externally_mapped_tcp_port == '' ? 0 : this.externally_mapped_tcp_port
                sipadvget._externaddr = this.external_address
                sipadvget._externhost = this.external_hostname
                sipadvget._externrefresh = this.hostname_refresh_interval

                const SipAdvStun = new AST_SipAdvSTUN()

                SipAdvStun._enable = this.stun_enable == true ? 1 : 0
                SipAdvStun._port = this.stun_port == '' ? 3478 : this.stun_port
                SipAdvStun._reflesh = this.stun_reflesh == '' ? 30 : this.stun_reflesh
                SipAdvStun._server = this.stun_server
                sipadvget._stun = SipAdvStun

                sipadvget._pedantic = this.strict_rfc_interpretation
                sipadvget._compactheaders = this.send_compact_headers
                sipadvget._sdpowner = this.sdp_owner
                sipadvget._matchingpriority = this.matching_priority

                let disallow_sip_str = ''
                this.sip_methods_options.forEach(item => {
                    if(this.checkList.indexOf(item) > -1){
                        disallow_sip_str += '1'
                    }else{
                        disallow_sip_str += '0'
                    }
                })
                sipadvget._disallowedmethods = disallow_sip_str

                sipadvget._shrinkcallerid = this.shrink_caller_id
                sipadvget._allowcidnamefromdomin = this.sip_from
                sipadvget._hangupcausecode = this.hangupcausecode
                sipadvget._sipto = this.sip_to
                sipadvget._calleeid1 = this.callee_id_1
                sipadvget._calleeid2 = this.callee_id_2
                sipadvget._maxexpiry = this.maximum_registration_expiry == '' ? 0 : this.maximum_registration_expiry
                sipadvget._minexpiry = this.minimum_registration_expiry == '' ? 0 : this.minimum_registration_expiry
                sipadvget._defaultexpiry = this.default_registration_expiry
                sipadvget._registertimeout = this.registration_timeout == '' ? 0 : this.registration_timeout
                sipadvget._registerattempts = this.number_of_registration_attemptsy == '' ? 0 : this.number_of_registration_attemptsy
                sipadvget._matchauthusername = this.match_auth_username
                sipadvget._realm = this.realm
                sipadvget._domainasrealm = this.use_domain_as_realm
                sipadvget._alwaysauthreject = this.always_auth_reject
                sipadvget._authoptionsrequest = this.authenticate_options_requests
                sipadvget._allowguest = this.allow_guest_calling
                sipadvget._prematuremedia = this.premature_media
                sipadvget._directmedia =  this.direct_media
                sipadvget._tossip = this.tos_for_sip_packets
                sipadvget._tosaudio = this.tos_for_rtp_packets
                sipadvget._rtptimeout = this.rtptimeout == '' ? 0 : this.rtptimeout

                let local_network_str = this.local_network_list.join(';')
                sipadvget._localnet = local_network_str

                const siprtp = new AST_SipRtp()

                siprtp._rtpstart = this.start_of_rtp_port_range
                siprtp._rtpend = this.end_of_rtp_port_range

                let SipAdvSave = new AST_SipAdvSave()
                SipAdvSave._sipadv = sipadvget
                SipAdvSave._siprtp = siprtp

                console.log(SipAdvSave)
                this.request.AGSipAdvSettingSave(this.save_succeed_back, this.save_error_back, SipAdvSave)
            },
            save_succeed_back(data){
                console.log(data)
                this.$message({
                    message: this.lang.save_successfully,
                    type: 'success',
                    offset: '80'
                })
            },
            save_error_back(){
                console.log('save failed')
                this.$message({
                    message: this.lang.save_failed,
                    type: 'error',
                    offset: '80'
                })
            },
            add_local_network(){
                if(this.local_network != '')
                    this.local_network_list.push(this.local_network)
            },
            remove_local_network(index){
                this.local_network_list.splice(index,1)
            }
        },
        created() {
            this.request.AGSipAdvSettingGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>