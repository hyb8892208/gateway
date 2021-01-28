import Vue from 'vue'
import Vuex from 'vuex'
import lang from "./lang";
import {MENU,
        CHANGE_LABEL_POSITION,
        CHANGE_DIALOG_WIDTH,
        CHANGE_CARD_WIDTH} from "./mutations-types";
import menu from "./menu";
import page_properties from "./page_properties";

Vue.use(Vuex)

const state = {
  systemtype: '',
  copyright: '',
  type: '',//0->O, 1->S&O, 2->S
  result: 0,
  FlexRoutingSw: 0,
  EthennetPort: 0,
  OpenVoxCloud: 0,
  TR069: 0,
  SNMP: 0,
  TLS: 0,
  L2TPvpn: 0,
  CheckFXSCurrSta: 0,
  menuActive: '/System/Status',//导航栏切换

  menu_loading: true,
  menu: menu.menu,

  page:page_properties.page_properties,

  lang: lang
}

export default new Vuex.Store({
  state,
  mutations: {
    [MENU](state, common_data){
      state.menu_loading = false
      state.systemtype = common_data['_systemtype']
      state.copyright = common_data['_copyright']
      state.type = common_data['_type']
      state.result = common_data['_result']
      state.FlexRoutingSw = common_data['_FlexRoutingSw']
      state.EthennetPort = common_data['_EthennetPort']
      state.OpenVoxCloud = common_data['_OpenVoxCloud']
      state.TR069 = common_data['_features']['_TR069']
      state.SNMP = common_data['_features']['_SNMP']
      state.TLS = common_data['_features']['_TLS']
      state.L2TPvpn = common_data['_features']['_L2TPvpn']
      state.CheckFXSCurrSta = common_data['_features']['_CheckFXSCurrSta']

      if(state.menu[0]['child_menu'][7] != undefined && state.menu[0]['child_menu'][7].name == 'config_label'){
        state.menu[0]['child_menu'].splice(7, 1)//config_label
      }
      if(state.menu[0]['child_menu'][6] != undefined && state.menu[0]['child_menu'][6].name == 'config_record') {
        state.menu[0]['child_menu'].splice(6, 1)//config_record
      }

      if(state.menu[4]['child_menu'][2] != undefined && state.menu[4]['child_menu'][2].name == 'wan_settings'){
        state.menu[4]['child_menu'].splice(2, 1)
      }
      if(state.menu[4]['child_menu'][1] != undefined && state.menu[4]['child_menu'][1].name == 'lan_settings') {
        state.menu[4]['child_menu'].splice(1, 1)
      }

      if(state.systemtype == 'nrtc' && state.menu[2]['child_menu'][4] != undefined &&  state.menu[2]['child_menu'][4].name == 'sip_accounts_security'){
        state.menu[2]['child_menu'].splice(4, 1)//sip_accounts_security
      }
      if(state.FlexRoutingSw == 1 && state.menu[2]['child_menu'][1] != undefined && state.menu[2]['child_menu'][1].name == 'fxs_batch_binding_sip'){
        state.menu[2]['child_menu'].splice(1, 1)//Sip-bendpoints
      }
      if(state.type == 2){
        if(state.menu[1]['child_menu'][5] != undefined && state.menu[1]['child_menu'][5].name == 'fxo'){
          state.menu[1]['child_menu'].splice(5, 1)//fxo
        }
        if(state.menu[3]['child_menu'][3] != undefined && state.menu[3]['child_menu'][3].name == 'batch_create_rules') {
          state.menu[3]['child_menu'].splice(3, 1)//batch_create_rules
        }
      }
      if(state.FlexRoutingSw == 0){
        if(state.type == 2){
          if(state.menu[3]['child_menu'][2] != undefined && state.menu[3]['child_menu'][2].name == 'batch_create_rules') {
            state.menu[3]['child_menu'].splice(2, 1)//batch_create_rules
          }
          if(state.menu[3]['child_menu'][1] != undefined && state.menu[3]['child_menu'][1].name == 'group') {
            state.menu[3]['child_menu'].splice(1, 1)//group
          }
          if(state.menu[3]['child_menu'][0] != undefined && state.menu[3]['child_menu'][0].name == 'call_routing_ruls') {
            state.menu[3]['child_menu'].splice(0, 1)//call_routing_ruls
          }
        }
      }else if(state.menu[1]['child_menu'][1] != undefined && state.menu[1]['child_menu'][1].name == 'pickup'){
        state.menu[1]['child_menu'].splice(1, 1)//pickup
      }

      //SNMP
      if(state.SNMP == 0  && state.menu[5]['child_menu'][5] != undefined && state.menu[5]['child_menu'][6].name == 'snmp'){
        state.menu[5]['child_menu'].splice(6, 1)//snmp
      }
      //TR069
      if(state.TR069 == 0  && state.menu[5]['child_menu'][4] != undefined && state.menu[5]['child_menu'][4].name == 'tr069'){
        state.menu[5]['child_menu'].splice(4, 1)//tr069
      }
      //Cloud
      if(state.OpenVoxCloud == 0 && state.menu[5]['child_menu'][3] != undefined && state.menu[5]['child_menu'][3].name == 'cloud'){
        state.menu[5]['child_menu'].splice(3, 1)//cloud
      }
      if(state.type == 0){
        if(state.menu[2]['child_menu'][1] != undefined && state.menu[2]['child_menu'][1].name == 'fxs_batch_binding_sip'){
          state.menu[2]['child_menu'].splice(1, 1)//fxs_batch_binding_sip
        }
        if(state.menu[1]['child_menu'][6] != undefined && state.menu[1]['child_menu'][6].name == 'fxs') {
          state.menu[1]['child_menu'].splice(6, 1)//fxs
        }
        if(state.menu[1]['child_menu'][4] != undefined && state.menu[1]['child_menu'][4].name == 'special_function_keys') {
          state.menu[1]['child_menu'].splice(4, 1)//special_function_keys
        }
        if(state.menu[1]['child_menu'][2] != undefined && state.menu[1]['child_menu'][2].name == 'dial_matching_table'){
          state.menu[1]['child_menu'].splice(2, 1)//dial_matching_table
        }
        if(state.menu[1]['child_menu'][1] != undefined && state.menu[1]['child_menu'][1].name == 'pickup') {
          state.menu[1]['child_menu'].splice(1, 1)//pickup
        }
      }
    },

    //修改表单元素定位方式：left、right、top
    [CHANGE_LABEL_POSITION](state,position){
      state.page.labelPosition = position
    },

    //修改每个页面el-card的style-width
    [CHANGE_CARD_WIDTH](state,obj){
      state.page.card_width = obj
    },

    //修改Dialog弹框的style-width
    [CHANGE_DIALOG_WIDTH](state,obj){
      state.page.dialog_width = obj
    }
  },
  actions: {
  },
  modules: {
  }
})
