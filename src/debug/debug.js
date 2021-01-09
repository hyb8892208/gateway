export function debuger(type) {
    if(false){//打开debug模式可以在本地调试页面，npm run build的时候需要改为false
        switch (type) {
            case 'system-status':
                return require('./SYSTEM/system-status.js')
            case 'system-time':
                return require('./SYSTEM/system-time.js')
            case 'system-login':
                return require('./SYSTEM/system-login')
            case 'system-general':
                return require('./SYSTEM/system-general.js')
            case 'system-tools':
                return require('./SYSTEM/system-tools')
            case 'system-info':
                return require('./SYSTEM/system-info')
            case 'system-config-record':
                return require('./SYSTEM/system-config-record')
            case 'system-config-label':
                return require('./SYSTEM/system-config-label')

            case 'analog-channel-settings':
                return require('./ANALOG/analog-channel-settings')
            case 'analog-channel-settings-fxs':
                return require('./ANALOG/analog-channel-settings-fxs')
            case 'analog-channel-settings-fxo':
                return require('./ANALOG/analog-channel-settings-fxo')
            case 'analog-pickup':
                return require('./ANALOG/analog-pickupsettings')
            case 'analog-dialtable':
                return require('./ANALOG/analog-dialtable')
            case 'analog-advanced':
                return require('./ANALOG/analog-advanced')
            case 'analog-funkeys':
                return require('./ANALOG/analog-funkeys')
            case 'analog-fxo':
                return require('./ANALOG/analog-fxo')
            case 'analog-fxs':
                return require('./ANALOG/analog-fxs')
            case 'analog-driver':
                return require('./ANALOG/analog-driver')

            case 'voip-endpoints':
                return require('./VOIP/voip-endpoints')
            case 'voip-endpoints-edit':
                return require('./VOIP/voip-endpoints-edit')
            case 'voip-sip-bendpoints':
                return require('./VOIP/voip-sip-bendpoints')
            case 'voip-sip-batch-endpoints':
                return require('./VOIP/voip-sip-batch-endpoints')
            case 'voip-sip-adv-settings':
                return require('./VOIP/voip-sip-adv-settings')
            case 'voip-sipsecurity':
                return require('./VOIP/voip-sipsecurity')

            case 'routing-call-routing-rules':
                return require('./ROUTING/routing-call-routing-rules')
            case 'routing-call-routing-rules-edit':
                return require('./ROUTING/routing-call-routing-rules-edit')
            case 'routing-group':
                return require('./ROUTING/routing-group')
            case 'routing-group-edit':
                return require('./ROUTING/routing-group-edit')
            case 'routing-batch-create-rules':
                return require('./ROUTING/routing-batch-create-rules')
            case 'routing-advanced':
                return require('./ROUTING/routing-advanced')

            case 'network-vlan':
                return require('./NETWORK/network-vlan')
            case 'network-vpn':
                return require('./NETWORK/network-vpn')
            case 'network-ddns':
                return require('./NETWORK/network-ddns')
            case 'network-toolkit':
                return require('./NETWORK/network-toolkit')
            case 'network-security-settings':
                return require('./NETWORK/network-security-settings')
            case 'network-security-rules':
                return require('./NETWORK/network-security-rules')
            case 'network-security-rules-edit':
                return require('./NETWORK/network-security-rules-edit')

            case 'adv-astapi':
                return require('./ADVANCED/adv-astapi')
            case 'adv-astcli':
                return require('./ADVANCED/adv-astcli')
            case 'adv-astfileeditor':
                return require('./ADVANCED/adv-astfileeditor')
            case 'adv-astfileeditor-edit':
                return require('./ADVANCED/adv-astfileeditor-edit')
            case 'adv-cloud':
                return require('./ADVANCED/adv-cloud')
            case 'adv-tr069':
                return require('./ADVANCED/adv-tr069')
            case 'adv-snmp':
                return require('./ADVANCED/adv-snmp')
            case 'adv-autoprovision':
                return require('./ADVANCED/adv-autoprovision')
            case 'adv-boardupdate':
                return require('./ADVANCED/adv-boardupdate')

            case 'log-settings':
                return require('./LOG/log-settings')
            case 'log-cdr':
                return require('./LOG/log-cdr')
            case 'log-asterisk':
                return require('./LOG/log-asterisk')

            default:
                return false
        }
    }else{
        return false
    }
}