import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/System/Status'
  },
  {
    path: '*',
    redirect: '/common/404'
  },
  {
    path: '/common/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/common/404'),
    meta:{
      title: '404'
    }
  },
  {
    path: '/common/error',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */ '../views/common/error'),
    meta:{
      title: 'error'
    }
  },
  {
    path: '/System/Status',
    name: 'System-Status',
    component: () => import(/* webpackChunkName: "System-status" */ '../views/SYSTEM/system-status/System-status.vue'),
    meta:{
      title: _language['System Status']
    }
  },
  {
    path: '/System/time',
    name: 'System-time',
    component: () => import(/* webpackChunkName: "System-time" */ '../views/SYSTEM/system-time/System-time.vue'),
    meta:{
      title: _language['Time Settings']
    }
  },
  {
    path: '/System/login',
    name: 'System-login',
    component: () => import(/* webpackChunkName: "System-login" */ '../views/SYSTEM/system-login/System-login'),
    meta:{
      title: _language['Login Settings']
    }
  },
  {
    path: '/System/general',
    name: 'System-general',
    component: () => import(/* webpackChunkName: "System-general" */ '../views/SYSTEM/system-general/System-general'),
    meta:{
      title: _language['General']
    }
  },
  {
    path: '/System/tools',
    name: 'System-tools',
    component: () => import(/* webpackChunkName: "System-tools" */ '../views/SYSTEM/system-tools/System-tools'),
    meta:{
      title: _language['System Tools']
    }
  },
  {
    path: '/System/info',
    name: 'System-info',
    component: () => import(/* webpackChunkName: "System-info" */ '../views/SYSTEM/system-info/System-info'),
    meta:{
      title: _language['Information']
    }
  },
  {
    path: '/System/Config-record',
    name: 'Config-record',
    component: () => import(/* webpackChunkName: "System-config-record" */ '../views/SYSTEM/config-record/Config-record'),
    meta:{
      title: _language['Config Record']
    }
  },
  {
    path: '/System/Config-label',
    name: 'Config-label',
    component: () => import(/* webpackChunkName: "System-config-label" */ '../views/SYSTEM/config-label/Config-label'),
    meta:{
      title: _language['Config Label']
    }
  },
  {
    path: '/Analog/Channel-Settings',
    name: 'Channel-Settings',
    component: () => import(/* webpackChunkName: "Analog-Channel-settings" */ '../views/ANALOG/channel-settings/Channel-settings'),
    meta:{
      title: _language['Channel Settings']
    }
  },
  {
    path: '/Analog/Channel-Settings/edit/:id',
    name: 'Channel-Settings-edit',
    component: () => import(/* webpackChunkName: "Analog-Channel-settings-edit" */ '../views/ANALOG/channel-settings/edit'),
    meta:{
      title: _language['Channel Settings']
    }
  },
  {
    path: '/Analog/Channel-Settings/edit',
    name: 'Channel-Settings-edit',
    component: () => import(/* webpackChunkName: "Analog-Channel-settings-new" */ '../views/ANALOG/channel-settings/edit'),
    meta:{
      title: _language['Channel Settings']
    }
  },
  {
    path: '/Analog/Pickup-Settings',
    name: 'Pickup-Settings',
    component: () => import(/* webpackChunkName: "Analog-Pickup-settings" */ '../views/ANALOG/pickup-settings/Pickup-settings'),
    meta:{
      title: _language['Pickup']
    }
  },
  {
    path: '/Analog/Dialtable',
    name: 'Dialtable',
    component: () => import(/* webpackChunkName: "Analog-dialtable" */ '../views/ANALOG/dialtable/Dialtable'),
    meta:{
      title: _language['Dial Matching Table']
    }
  },
  {
    path: '/Analog/Advanced',
    name: 'Advanced',
    component: () => import(/* webpackChunkName: "Analog-Advanced" */ '../views/ANALOG/advanced/Advanced'),
    meta:{
      title: _language['Advanced']
    }
  },
  {
    path: '/Analog/Funkeys',
    name: 'Funkeys',
    component: () => import(/* webpackChunkName: "Analog-Funkeys" */ '../views/ANALOG/funkeys/Funkeys'),
    meta:{
      title: _language['Special Function Keys']
    }
  },
  {
    path: '/Analog/Fxo',
    name: 'Fxo',
    component: () => import(/* webpackChunkName: "Analog-fxo" */ '../views/ANALOG/fxo/fxo'),
    meta:{
      title: _language['FXO']
    }
  },
  {
    path: '/Analog/Fxs',
    name: 'Fxs',
    component: () => import(/* webpackChunkName: "Analog-fxs" */ '../views/ANALOG/fxs/fxs'),
    meta:{
      title: _language['FXS']
    }
  },
  {
    path: '/Analog/Driver',
    name: 'Driver',
    component: () => import(/* webpackChunkName: "Analog-Driver" */ '../views/ANALOG/driver/Driver'),
    meta:{
      title: _language['Driver']
    }
  },
  {
    path: '/SIP/Voip-Endpoints',
    name: 'Voip-Endpoints',
    component: () => import(/* webpackChunkName: "SIP-Voip-endpoints" */ '../views/VOIP/voip-endpoints/Voip-endpoints'),
    meta:{
      title: _language['SIP Endpoints']
    }
  },
  {
    path: '/SIP/Voip-Endpoints/add/:order',
    name: 'Voip-Endpoints-add',
    component: () => import(/* webpackChunkName: "SIP-Voip-endpoints-new" */ '../views/VOIP/voip-endpoints/add'),
    meta:{
      title: _language['SIP Endpoints']
    }
  },
  {
    path: '/SIP/Voip-Endpoints/add/:order/:section',
    name: 'Voip-Endpoints-add',
    component: () => import(/* webpackChunkName: "SIP-Voip-endpoints-edit" */ '../views/VOIP/voip-endpoints/add'),
    meta:{
      title: _language['SIP Endpoints']
    }
  },
  {
    path: '/SIP/Sip-bendpoints',
    name: 'Sip-bendpoints',
    component: () => import(/* webpackChunkName: "SIP-Sip-bendpoints" */ '../views/VOIP/sip-bendpoints/Sip-bendpoints'),
    meta:{
      title: _language['FXS Batch Binding SIP']
    }
  },
  {
    path: '/SIP/Sip-batch-endpoints',
    name: 'Sip-batch-endpoints',
    component: () => import(/* webpackChunkName: "SIP-Sip-batch-endpoints" */ '../views/VOIP/sip-batch-endpoints/Sip-batch-endpoints'),
    meta:{
      title: _language['Batch Create SIP']
    }
  },
  {
    path: '/SIP/Sip-adv-settings',
    name: 'Sip-adv-settings',
    component: () => import(/* webpackChunkName: "SIP-adv-settings" */ '../views/VOIP/sip-adv-settings/Sip-adv-settings'),
    meta:{
      title: _language['Advanced SIP Settings']
    }
  },
  {
    path: '/SIP/Sip-Security',
    name: 'Sip-Security',
    component: () => import(/* webpackChunkName: "SIP-security" */ '../views/VOIP/sip-security/Sip-security'),
    meta:{
      title: _language['Sip Account Security']
    }
  },
  {
    path: '/Routing/Call-Routing-Rules',
    name: 'Call-Routing-Rules',
    component: () => import(/* webpackChunkName: "Routing-Call-routing-rules" */ '../views/ROUTING/call-routing-rules/Call-routing-rules'),
    meta:{
      title: _language['Call Routing Rules']
    }
  },
  {
    path: '/Routing/Call-Routing-Rules/add/:order',
    name: 'Call-Routing-Rules-add',
    component: () => import(/* webpackChunkName: "Routing-Call-routing-rules-new" */ '../views/ROUTING/call-routing-rules/add'),
    meta:{
      title: _language['Call Routing Rules']
    }
  },
  {
    path: '/Routing/Call-Routing-Rules/add/:order/:rule_name',
    name: 'Call-Routing-Rules-add',
    component: () => import(/* webpackChunkName: "Routing-Call-routing-rules-edit" */ '../views/ROUTING/call-routing-rules/add'),
    meta:{
      title: _language['Call Routing Rules']
    }
  },
  {
    path: '/Routing/Group',
    name: 'Group',
    component: () => import(/* webpackChunkName: "Routing-Group" */ '../views/ROUTING/group/Group'),
    meta:{
      title: _language['Groups']
    }
  },
  {
    path: '/Routing/Group/add',
    name: 'Group-add',
    component: () => import(/* webpackChunkName: "Routing-Group-new" */ '../views/ROUTING/group/add'),
    meta:{
      title: _language['Groups']
    }
  },
  {
    path: '/Routing/Group/add/:group_name',
    name: 'Group-add',
    component: () => import(/* webpackChunkName: "Routing-Group-edit" */ '../views/ROUTING/group/add'),
    meta:{
      title: _language['Groups']
    }
  },
  {
    path: '/Routing/Batch-create-rules',
    name: 'Batch-create-rules',
    component: () => import(/* webpackChunkName: "Routing-Batch-create-rules" */ '../views/ROUTING/batch-create-rules/Batch-create-rules'),
    meta:{
      title: _language['Batch Create Rules']
    }
  },
  {
    path: '/Routing/Routing-advanced',
    name: 'Routing-advanced',
    component: () => import(/* webpackChunkName: "Routing-advanced" */ '../views/ROUTING/routing-advanced/Routing-advanced'),
    meta:{
      title: _language['Advanced']
    }
  },
  {
    path: '/Network/VLan',
    name: 'VLan',
    component: () => import(/* webpackChunkName: "Network-VLan" */ '../views/NETWORK/vlan/VLan'),
    meta:{
      title: _language['VLan Settings']
    }
  },
  {
    path: '/Network/Lan',
    name: 'Lan',
    component: () => import(/* webpackChunkName: "Network-Lan" */ '../views/NETWORK/lan/Lan'),
    meta:{
      title: _language['Lan Settings']
    }
  },
  {
    path: '/Network/Wan',
    name: 'Wan',
    component: () => import(/* webpackChunkName: "Network-Wan" */ '../views/NETWORK/wan/Wan'),
    meta:{
      title: _language['Wan Settings']
    }
  },
  {
    path: '/Network/Vpn',
    name: 'Vpn',
    component: () => import(/* webpackChunkName: "Network-VPN" */ '../views/NETWORK/vpn/Vpn'),
    meta:{
      title: _language['VPN Settings']
    }
  },
  {
    path: '/Network/Ddns',
    name: 'Ddns',
    component: () => import(/* webpackChunkName: "Network-DDNS" */ '../views/NETWORK/ddns/Ddns'),
    meta:{
      title: _language['DDNS Settings']
    }
  },
  {
    path: '/Network/Toolkit',
    name: 'Toolkit',
    component: () => import(/* webpackChunkName: "Network-Toolkit" */ '../views/NETWORK/toolkit/Toolkit'),
    meta:{
      title: _language['Network Toolkit']
    }
  },
  {
    path: '/Network/Security-settings',
    name: 'Security-settings',
    component: () => import(/* webpackChunkName: "Network-Security-settings" */ '../views/NETWORK/security-settings/Security-settings'),
    meta:{
      title: _language['Security Settings']
    }
  },
  {
    path: '/Network/Security-rules',
    name: 'Security-rules',
    component: () => import(/* webpackChunkName: "Network-Security-rules" */ '../views/NETWORK/security-rules/Security-rules'),
    meta:{
      title: _language['Security Rules']
    }
  },
  {
    path: '/Network/Security-rules/add/',
    name: 'Security-rules-add',
    component: () => import(/* webpackChunkName: "Network-Security-rules-new" */ '../views/NETWORK/security-rules/add'),
    meta:{
      title: _language['Security Rules']
    }
  },
  {
    path: '/Network/Security-rules/add/:rule_name',
    name: 'Security-rules-add',
    component: () => import(/* webpackChunkName: "Network-Security-rules-edit" */ '../views/NETWORK/security-rules/add'),
    meta:{
      title: _language['Security Rules']
    }
  },
  {
    path: '/Network/mac',
    name: 'mac',
    component: () => import(/* webpackChunkName: "Network-mac" */ '../views/NETWORK/mac/mac'),
    meta:{
      title: 'MAC'
    }
  },
  {
    path: '/Advanced/Adv-astapi',
    name: 'Adv-astapi',
    component: () => import(/* webpackChunkName: "Adv-astapi" */ '../views/ADVANCED/adv-astapi/Adv-astapi'),
    meta:{
      title: _language['Asterisk API']
    }
  },
  {
    path: '/Advanced/Adv-astcli',
    name: 'Adv-astcli',
    component: () => import(/* webpackChunkName: "Adv-astcli" */ '../views/ADVANCED/adv-astcli/Adv-astcli'),
    meta:{
      title: _language['Asterisk CLI']
    }
  },
  {
    path: '/Advanced/Adv-astfileeditor',
    name: 'Adv-astfileeditor',
    component: () => import(/* webpackChunkName: "Adv-astfileeditor" */ '../views/ADVANCED/adv-astfileeditor/Adv-astfileeditor'),
    meta:{
      title: _language['Asterisk File Editor']
    }
  },
  {
    path: '/Advanced/Adv-astfileeditor/add',
    name: 'Adv-astfileeditor-add',
    component: () => import(/* webpackChunkName: "Adv-astfileeditor-new" */ '../views/ADVANCED/adv-astfileeditor/add'),
    meta:{
      title: _language['Asterisk File Editor']
    }
  },
  {
    path: '/Advanced/Adv-astfileeditor/add/:filename',
    name: 'Adv-astfileeditor-add',
    component: () => import(/* webpackChunkName: "Adv-astfileeditor-edit" */ '../views/ADVANCED/adv-astfileeditor/add'),
    meta:{
      title: _language['Asterisk File Editor']
    }
  },
  {
    path: '/Advanced/Adv-cloud',
    name: 'Adv-cloud',
    component: () => import(/* webpackChunkName: "Adv-cloud" */ '../views/ADVANCED/adv-cloud/Adv-cloud'),
    meta:{
      title: _language['Cloud']
    }
  },
  {
    path: '/Advanced/Adv-tr069',
    name: 'Adv-tr069',
    component: () => import(/* webpackChunkName: "Adv-tr069" */ '../views/ADVANCED/adv-tr069/Adv-tr069'),
    meta:{
      title: 'TR069'
    }
  },
  {
    path: '/Advanced/Adv-autoprovision',
    name: 'Adv-autoprovision',
    component: () => import(/* webpackChunkName: "Adv-autoprovision" */ '../views/ADVANCED/adv-autoprovision/Adv-autoprovision'),
    meta:{
        title: 'Auto Provision'
    }
  },
  {
    path: '/Advanced/Adv-snmp',
    name: 'Adv-snmp',
    component: () => import(/* webpackChunkName: "Adv-snmp" */ '../views/ADVANCED/adv-snmp/Adv-snmp'),
    meta:{
      title: 'SNMP'
    }
  },
  {
    path: '/Advanced/Adv-boardupdate',
    name: 'Adv-boardupdate',
    component: () => import(/* webpackChunkName: "Adv-boardupdate" */ '../views/ADVANCED/adv-boardupdate/Adv-boardupdate'),
    meta:{
      title: _language['Board Update']
    }
  },
  {
    path: '/Log/Log-settings',
    name: 'Adv-Log-settings',
    component: () => import(/* webpackChunkName: "Log-settings" */ '../views/LOG/log-settings/Log-settings'),
    meta:{
      title: _language['Log Settings']
    }
  },
  {
    path: '/Log/System',
    name: 'System',
    component: () => import(/* webpackChunkName: "Log-System" */ '../views/LOG/system/System'),
    meta:{
      title: _language['System Logs']
    }
  },
  {
    path: '/Log/Asterisk',
    name: 'Asterisk',
    component: () => import(/* webpackChunkName: "Log-Asterisk" */ '../views/LOG/asterisk/Asterisk'),
    meta:{
      title: _language['Asterisk Logs']
    }
  },
  {
    path: '/Log/SIP',
    name: 'SIP',
    component: () => import(/* webpackChunkName: "Log-SIP" */ '../views/LOG/sip/SIP'),
    meta:{
      title: _language['SIP Logs']
    }
  },
  {
    path: '/Log/Dahdi',
    name: 'Dahdi',
    component: () => import(/* webpackChunkName: "Log-Dahdi" */ '../views/LOG/dahdi/Dahdi'),
    meta:{
      title: _language['DAHDI Logs']
    }
  },
  {
    path: '/Log/CDR',
    name: 'CDR',
    component: () => import(/* webpackChunkName: "Log-CDR" */ '../views/LOG/cdr/CDR'),
    meta:{
      title: _language['CDR']
    }
  },

  {
    path: '/call-test',
    name: 'call-test',
    component: () => import(/* webpackChunkName: "call-test" */ '../views/other/call-test'),
    meta:{
      title: _language['Call Test']
    }
  }
]

const router = new VueRouter({
  mode: 'history',//模式
  base: process.env.BASE_URL,
  routes
})

//路由前置钩子函数，用来设置网页的title
router.beforeEach((to, from, next) => {
  if(to.matched[0].meta.title == undefined){
    to.matched[0].meta.title = ''
  }
  document.title = to.matched[0].meta.title
  next()
})

export default router
