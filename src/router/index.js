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
    component: () => import('../views/common/404'),
    meta:{
      title: '404'
    }
  },
  {
    path: '/common/error',
    name: 'error',
    component: () => import('../views/common/error'),
    meta:{
      title: 'error'
    }
  },
  {
    path: '/System/Status',
    name: 'System-Status',
    component: () => import('../views/SYSTEM/system-status/System-status.vue'),
    meta:{
      title: _language['System Status']
    }
  },
  {
    path: '/System/time',
    name: 'System-time',
    component: () => import('../views/SYSTEM/system-time/System-time.vue'),
    meta:{
      title: _language['Time Settings']
    }
  },
  {
    path: '/System/login',
    name: 'System-login',
    component: () => import('../views/SYSTEM/system-login/System-login'),
    meta:{
      title: _language['Login Settings']
    }
  },
  {
    path: '/System/general',
    name: 'System-general',
    component: () => import('../views/SYSTEM/system-general/System-general'),
    meta:{
      title: _language['General']
    }
  },
  {
    path: '/System/tools',
    name: 'System-tools',
    component: () => import('../views/SYSTEM/system-tools/System-tools'),
    meta:{
      title: _language['System Tools']
    }
  },
  {
    path: '/System/info',
    name: 'System-info',
    component: () => import('../views/SYSTEM/system-info/System-info'),
    meta:{
      title: _language['Information']
    }
  },
  {
    path: '/System/Config-record',
    name: 'Config-record',
    component: () => import('../views/SYSTEM/config-record/Config-record'),
    meta:{
      title: _language['Config Record']
    }
  },
  {
    path: '/System/Config-label',
    name: 'Config-label',
    component: () => import('../views/SYSTEM/config-label/Config-label'),
    meta:{
      title: _language['Config Label']
    }
  },
  {
    path: '/Analog/Channel-Settings',
    name: 'Channel-Settings',
    component: () => import('../views/ANALOG/channel-settings/Channel-settings'),
    meta:{
      title: _language['Channel Settings']
    }
  },
  {
    path: '/Analog/Channel-Settings/edit/:id',
    name: 'Channel-Settings-edit',
    component: () => import('../views/ANALOG/channel-settings/edit'),
    meta:{
      title: _language['Channel Settings']
    }
  },
  {
    path: '/Analog/Channel-Settings/edit',
    name: 'Channel-Settings-edit',
    component: () => import('../views/ANALOG/channel-settings/edit'),
    meta:{
      title: _language['Channel Settings']
    }
  },
  {
    path: '/Analog/Pickup-Settings',
    name: 'Pickup-Settings',
    component: () => import('../views/ANALOG/pickup-settings/Pickup-settings'),
    meta:{
      title: _language['Pickup']
    }
  },
  {
    path: '/Analog/Dialtable',
    name: 'Dialtable',
    component: () => import('../views/ANALOG/dialtable/Dialtable'),
    meta:{
      title: _language['Dial Matching Table']
    }
  },
  {
    path: '/Analog/Advanced',
    name: 'Advanced',
    component: () => import('../views/ANALOG/advanced/Advanced'),
    meta:{
      title: _language['Advanced']
    }
  },
  {
    path: '/Analog/Funkeys',
    name: 'Funkeys',
    component: () => import('../views/ANALOG/funkeys/Funkeys'),
    meta:{
      title: _language['Special Function Keys']
    }
  },
  {
    path: '/Analog/Fxo',
    name: 'Fxo',
    component: () => import('../views/ANALOG/fxo/fxo'),
    meta:{
      title: _language['FXO']
    }
  },
  {
    path: '/Analog/Fxs',
    name: 'Fxs',
    component: () => import('../views/ANALOG/fxs/fxs'),
    meta:{
      title: _language['FXS']
    }
  },
  {
    path: '/Analog/Driver',
    name: 'Driver',
    component: () => import('../views/ANALOG/driver/Driver'),
    meta:{
      title: _language['Driver']
    }
  },
  {
    path: '/Analog/Call-test',
    name: 'Call-test',
    component: () => import('../views/ANALOG/call-test/Call-test'),
    meta:{
      title: _language['Call Test']
    }
  },
  {
    path: '/SIP/Voip-Endpoints',
    name: 'Voip-Endpoints',
    component: () => import('../views/VOIP/voip-endpoints/Voip-endpoints'),
    meta:{
      title: _language['SIP Endpoints']
    }
  },
  {
    path: '/SIP/Voip-Endpoints/add/',
    name: 'Voip-Endpoints-add',
    component: () => import('../views/VOIP/voip-endpoints/add'),
    meta:{
      title: _language['SIP Endpoints']
    }
  },
  {
    path: '/SIP/Voip-Endpoints/add/:section',
    name: 'Voip-Endpoints-add',
    component: () => import('../views/VOIP/voip-endpoints/add'),
    meta:{
      title: _language['SIP Endpoints']
    }
  },
  {
    path: '/SIP/Sip-bendpoints',
    name: 'Sip-bendpoints',
    component: () => import('../views/VOIP/sip-bendpoints/Sip-bendpoints'),
    meta:{
      title: _language['FXS Batch Binding SIP']
    }
  },
  {
    path: '/SIP/Sip-batch-endpoints',
    name: 'Sip-batch-endpoints',
    component: () => import('../views/VOIP/sip-batch-endpoints/Sip-batch-endpoints'),
    meta:{
      title: _language['Batch Create SIP']
    }
  },
  {
    path: '/SIP/Sip-adv-settings',
    name: 'Sip-adv-settings',
    component: () => import('../views/VOIP/sip-adv-settings/Sip-adv-settings'),
    meta:{
      title: _language['Advanced SIP Settings']
    }
  },
  {
    path: '/SIP/Sip-Security',
    name: 'Sip-Security',
    component: () => import('../views/VOIP/sip-security/Sip-security'),
    meta:{
      title: _language['Sip Account Security']
    }
  },
  {
    path: '/Routing/Call-Routing-Rules',
    name: 'Call-Routing-Rules',
    component: () => import('../views/ROUTING/call-routing-rules/Call-routing-rules'),
    meta:{
      title: _language['Call Routing Rules']
    }
  },
  {
    path: '/Routing/Call-Routing-Rules/add/:order',
    name: 'Call-Routing-Rules-add',
    component: () => import('../views/ROUTING/call-routing-rules/add'),
    meta:{
      title: _language['Call Routing Rules']
    }
  },
  {
    path: '/Routing/Call-Routing-Rules/add/:order/:rule_name',
    name: 'Call-Routing-Rules-add',
    component: () => import('../views/ROUTING/call-routing-rules/add'),
    meta:{
      title: _language['Call Routing Rules']
    }
  },
  {
    path: '/Routing/Group',
    name: 'Group',
    component: () => import('../views/ROUTING/group/Group'),
    meta:{
      title: _language['Groups']
    }
  },
  {
    path: '/Routing/Group/add',
    name: 'Group-add',
    component: () => import('../views/ROUTING/group/add'),
    meta:{
      title: _language['Groups']
    }
  },
  {
    path: '/Routing/Group/add/:group_name',
    name: 'Group-add',
    component: () => import('../views/ROUTING/group/add'),
    meta:{
      title: _language['Groups']
    }
  },
  {
    path: '/Routing/Batch-create-rules',
    name: 'Batch-create-rules',
    component: () => import('../views/ROUTING/batch-create-rules/Batch-create-rules'),
    meta:{
      title: _language['Batch Create Rules']
    }
  },
  {
    path: '/Routing/Routing-advanced',
    name: 'Routing-advanced',
    component: () => import('../views/ROUTING/routing-advanced/Routing-advanced'),
    meta:{
      title: _language['Advanced']
    }
  },
  {
    path: '/Network/VLan',
    name: 'VLan',
    component: () => import('../views/NETWORK/vlan/VLan'),
    meta:{
      title: _language['VLan Settings']
    }
  },
  {
    path: '/Network/Lan',
    name: 'Lan',
    component: () => import('../views/NETWORK/lan/Lan'),
    meta:{
      title: _language['Lan Settings']
    }
  },
  {
    path: '/Network/Wan',
    name: 'Wan',
    component: () => import('../views/NETWORK/wan/Wan'),
    meta:{
      title: _language['Wan Settings']
    }
  },
  {
    path: '/Network/Vpn',
    name: 'Vpn',
    component: () => import('../views/NETWORK/vpn/Vpn'),
    meta:{
      title: _language['VPN Settings']
    }
  },
  {
    path: '/Network/Ddns',
    name: 'Ddns',
    component: () => import('../views/NETWORK/ddns/Ddns'),
    meta:{
      title: _language['DDNS Settings']
    }
  },
  {
    path: '/Network/Toolkit',
    name: 'Toolkit',
    component: () => import('../views/NETWORK/toolkit/Toolkit'),
    meta:{
      title: _language['Network Toolkit']
    }
  },
  {
    path: '/Network/Security-settings',
    name: 'Security-settings',
    component: () => import('../views/NETWORK/security-settings/Security-settings'),
    meta:{
      title: _language['Security Settings']
    }
  },
  {
    path: '/Network/Security-rules',
    name: 'Security-rules',
    component: () => import('../views/NETWORK/security-rules/Security-rules'),
    meta:{
      title: _language['Security Rules']
    }
  },
  {
    path: '/Network/Security-rules/add/',
    name: 'Security-rules-add',
    component: () => import('../views/NETWORK/security-rules/add'),
    meta:{
      title: _language['Security Rules']
    }
  },
  {
    path: '/Network/Security-rules/add/:rule_name',
    name: 'Security-rules-add',
    component: () => import('../views/NETWORK/security-rules/add'),
    meta:{
      title: _language['Security Rules']
    }
  },
  {
    path: '/Network/mac',
    name: 'mac',
    component: () => import('../views/NETWORK/mac/mac'),
    meta:{
      title: 'MAC'
    }
  },
  {
    path: '/Advanced/Adv-astapi',
    name: 'Adv-astapi',
    component: () => import('../views/ADVANCED/adv-astapi/Adv-astapi'),
    meta:{
      title: _language['Asterisk API']
    }
  },
  {
    path: '/Advanced/Adv-astcli',
    name: 'Adv-astcli',
    component: () => import('../views/ADVANCED/adv-astcli/Adv-astcli'),
    meta:{
      title: _language['Asterisk CLI']
    }
  },
  {
    path: '/Advanced/Adv-astfileeditor',
    name: 'Adv-astfileeditor',
    component: () => import('../views/ADVANCED/adv-astfileeditor/Adv-astfileeditor'),
    meta:{
      title: _language['Asterisk File Editor']
    }
  },
  {
    path: '/Advanced/Adv-astfileeditor/:page',
    name: 'Adv-astfileeditor',
    component: () => import('../views/ADVANCED/adv-astfileeditor/Adv-astfileeditor'),
    meta:{
      title: _language['Asterisk File Editor']
    }
  },
  {
    path: '/Advanced/Adv-astfileeditor/add',
    name: 'Adv-astfileeditor-add',
    component: () => import('../views/ADVANCED/adv-astfileeditor/add'),
    meta:{
      title: _language['Asterisk File Editor']
    }
  },
  {
    path: '/Advanced/Adv-astfileeditor/add/:filename',
    name: 'Adv-astfileeditor-add',
    component: () => import('../views/ADVANCED/adv-astfileeditor/add'),
    meta:{
      title: _language['Asterisk File Editor']
    }
  },
  {
    path: '/Advanced/Adv-cloud',
    name: 'Adv-cloud',
    component: () => import('../views/ADVANCED/adv-cloud/Adv-cloud'),
    meta:{
      title: _language['Cloud']
    }
  },
  {
    path: '/Advanced/Adv-tr069',
    name: 'Adv-tr069',
    component: () => import('../views/ADVANCED/adv-tr069/Adv-tr069'),
    meta:{
      title: 'TR069'
    }
  },
  {
    path: '/Advanced/Adv-autoprovision',
    name: 'Adv-autoprovision',
    component: () => import('../views/ADVANCED/adv-autoprovision/Adv-autoprovision'),
    meta:{
        title: 'Auto Provision'
    }
  },
  {
    path: '/Advanced/Adv-snmp',
    name: 'Adv-snmp',
    component: () => import('../views/ADVANCED/adv-snmp/Adv-snmp'),
    meta:{
      title: 'SNMP'
    }
  },
  {
    path: '/Log/Log-settings',
    name: 'Adv-Log-settings',
    component: () => import('../views/LOG/log-settings/Log-settings'),
    meta:{
      title: _language['Log Settings']
    }
  },
  {
    path: '/Log/System',
    name: 'System',
    component: () => import('../views/LOG/system/System'),
    meta:{
      title: _language['System Logs']
    }
  },
  {
    path: '/Log/Asterisk',
    name: 'Asterisk',
    component: () => import('../views/LOG/asterisk/Asterisk'),
    meta:{
      title: _language['Asterisk Logs']
    }
  },
  {
    path: '/Log/SIP',
    name: 'SIP',
    component: () => import('../views/LOG/sip/SIP'),
    meta:{
      title: _language['SIP Logs']
    }
  },
  {
    path: '/Log/Dahdi',
    name: 'Dahdi',
    component: () => import('../views/LOG/dahdi/Dahdi'),
    meta:{
      title: _language['DAHDI Logs']
    }
  },
  {
    path: '/Log/CDR',
    name: 'CDR',
    component: () => import('../views/LOG/cdr/CDR'),
    meta:{
      title: _language['CDR']
    }
  },

  {
    path: '/call-test',
    name: 'call-test',
    component: () => import('../views/other/call-test'),
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
