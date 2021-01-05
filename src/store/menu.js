export default {
    menu: [{//0
        name: 'system',
        icon: 'el-icon-setting',
        child_menu: [{
            name: 'status',
            index: '/System/Status'
        },{
            name: 'time',
            index: '/System/time'
        },{
            name: 'login_settings',
            index: '/System/login'
        },{
            name: 'general',
            index: '/System/general'
        },{
            name: 'tools',
            index: '/System/tools'
        },{
            name: 'information',
            index: '/System/info'
        },{
            name: 'config_record',
            index: '/System/Config-record'
        },{
            name: 'config_label',
            index: '/System/Config-label'
        }]
    },{//1
        name: 'analog',
        icon: 'el-icon-coin',
        child_menu: [{
            name: 'channel_settings',
            index: '/Analog/Channel-settings'
        },{
            name: 'pickup',
            index: '/Analog/Pickup-settings'
        },{
            name: 'dial_matching_table',
            index: '/Analog/Dialtable'
        },{
            name: 'advanced',
            index: '/Analog/Advanced'
        },{
            name: 'special_function_keys',
            index: '/Analog/Funkeys'
        },{
            name: 'fxo',
            index: '/Analog/Fxo'
        },{
            name: 'fxs',
            index: '/Analog/Fxs'
        },{
            name: 'driver',
            index: '/Analog/Driver'
        }]
    },{//2
        name: 'voip',
        icon: 'el-icon-user',
        child_menu: [{
            name: 'sip_endpoints',
            index: '/SIP/Voip-endpoints'
        },{
            name: 'fxs_batch_binding_sip',
            index: '/SIP/Sip-bendpoints'
        },{
            name: 'batch_create_sip',
            index: '/SIP/Sip-batch-endpoints'
        },{
            name: 'advanced_sip_settings',
            index: '/SIP/Sip-adv-settings'
        },{
            name: 'sip_account_security',
            index: '/SIP/Sip-security'
        }]
    },{//3
        name: 'routing',
        icon: 'el-icon-share',
        child_menu: [{
            name: 'call_routing_ruls',
            index: '/Routing/Call-routing-rules'
        },{
            name: 'groups',
            index: '/Routing/Group'
        },{
            name: 'batch_create_rules',
            index: '/Routing/Batch-create-rules'
        },{
            name: 'advanced',
            index: '/Routing/Routing-advanced'
        }]
    },{//4
        name: 'network',
        icon: 'el-icon-link',
        child_menu: [{
            name: 'basic_settings',
            index: '/Network/VLan'
        },{
            name: 'lan_settings',
            index: '/Network/Lan'
        },{
            name: 'wan_settings',
            index: '/Network/Wan'
        },{
            name: 'vpn_settings',
            index: '/Network/Vpn'
        },{
            name: 'ddns_settings',
            index: '/Network/DDNS'
        },{
            name: 'toolkit',
            index: '/Network/Toolkit'
        },{
            name: 'security_settings',
            index: '/Network/Security-settings'
        },{
            name: 'security_rules',
            index: '/Network/Security-rules'
        }]
    },{//5
        name: 'advanced',
        icon: 'el-icon-copy-document',
        child_menu: [{
            name: 'asterisk_api',
            index: '/Advanced/Adv-astapi'
        },{
            name: 'asterisk_cli',
            index: '/Advanced/Adv-astcli'
        },{
            name: 'asterisk_file_editor',
            index: '/Advanced/Adv-astfileeditor'
        },{
            name: 'cloud',
            index: '/Advanced/Adv-cloud'
        },{
            name: 'tr069',
            index: '/Advanced/Adv-tr069'
        },{
            name: 'snmp',
            index: '/Advanced/Adv-snmp'
        },{
            name: 'auto_provision',
            index: '/Advanced/Adv-autoprovision'
        }]
    },{//6
        name: 'logs',
        icon: 'el-icon-notebook-2',
        child_menu: [{
            name: 'log_settings',
            index: '/Log/Log-settings'
        },{
            name: 'system_logs',
            index: '/Log/System'
        },{
            name: 'asterisk_logs',
            index: '/Log/Asterisk'
        },{
            name: 'sip_logs',
            index: '/Log/SIP'
        },{
            name: 'dahdi_logs',
            index: '/Log/DAHDI'
        },{
            name: 'cdr',
            index: '/Log/CDR'
        }]
    }],
}