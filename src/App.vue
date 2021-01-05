<template>
    <el-container style="height: 100%;">
      <el-header style="height: 54px;">
        <header_new @child_change_aside_value="change_aside_value"></header_new>
      </el-header>

      <el-container style="height: 100%;">
        <el-aside width="auto" v-show="is_show_menu" v-loading=$store.state.menu_loading>
          <aside_new @child_mobile_hide_aside="mobile_hide_aside"></aside_new>
        </el-aside>

        <el-container>
            <el-main>
              <router-view v-if="isRouterAlive"></router-view>
            </el-main>

            <el-footer>
              <footer_new></footer_new>
            </el-footer>
         </el-container>
      </el-container>
    </el-container>
</template>

<script>
  import Header_new from "./views/common/header_new";
  import aside_new from "./views/common/aside_new";
  import Footer_new from "./views/common/footer_new";
  import {CHANGE_LABEL_POSITION, CHANGE_CARD_WIDTH, CHANGE_DIALOG_WIDTH} from "./store/mutations-types";
  export default {
    components: {
      Footer_new,
      Header_new,
      aside_new
    },
    provide(){
        return {
            reload: this.reload
        }
    },
    data(){
        return{
            is_show_menu:true,
            isRouterAlive: true
        }
    },
    methods: {
        change_aside_value(){
            this.is_show_menu = !this.is_show_menu
        },
        mobile_hide_aside(){
            if(this.mobile_page_width()){
                this.is_show_menu = false
            }
        },
        mobile_page_width(){
            let screenWidth = window.screen.width

            if(screenWidth <= 768){
                this.$store.commit(CHANGE_LABEL_POSITION,'top')
                this.$store.commit(CHANGE_CARD_WIDTH,{width: 'auto'})
                this.$store.commit(CHANGE_DIALOG_WIDTH, '80%')
                return true
            }else{
                return false
            }
        },

        reload(){
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        }
    },
    mounted() {
        window.onresize = () => {//监听屏幕大小变化
            if(this.mobile_page_width()){
                this.is_show_menu = false
            }else{
                this.is_show_menu = true
            }
        }

        if(this.mobile_page_width()){
            this.is_show_menu = false
        }else{
            this.is_show_menu = true
        }
    }
  }
</script>

<style>
  body{
    margin:0;
  }
  * {
    padding: 0;
    margin: 0;
  }
   body, html {
    height: 100%;
  }
  body {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
    font-weight: 400;
    font-size: 12px;
    color: #000;
  }
  .el-header{
    background-color: #3b5998;
    color: #333;
  }
  .el-footer{
    height: 40px !important;
  }
  .el-aside {
    background-color: #ffffff;
    color: #666666;
  }
  .el-main {
    background-color: #F3F7FA;
    color: #333;
    padding: 0 !important;
  }
  .el-container{
      background-color: #f8f8f8;
      overflow: hidden;
  }
  .el-container .el-aside{
      /*display: none;*/
      width: 250px;
  }
  @media only screen and (max-width: 768px) {
      .el-aside{
          /*display: none;*/
      }
  }
  .el-submenu>.el-submenu__title .el-submenu__icon-arrow{
      -webkit-transform: rotateZ(-90deg);
      -ms-transform: rotate(-90deg);
      transform: rotateZ(-90deg);
  }
  .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
      -webkit-transform: rotateZ(0deg) !important;
      -ms-transform: rotate(0deg) !important;
      transform: rotateZ(0deg) !important;
  }
  .el-submenu__title i{
      color: #ffffff !important;
  }
  .tac .el-menu-item-group__title{
      padding:0 !important;
  }
  .el-menu-item, .el-submenu__title{
      height: 40px !important;
      line-height: 40px !important;
      border-bottom: 1px solid #3B5998;
      border-bottom-color: #3B5998 !important;
  }
  .el-aside .is-active .el-submenu__title{
      background-color: #344e86 !important;
  }

  /* 表单label */
  .el-form-item__label{
      font-size: 12px !important;
      padding-right: 12px !important;
  }
  .el-input__inner{
      border-radius: 0 !important;
  }

  .el-form-item__label{
      height: 32px;
      overflow: hidden;
  }
  .el-tabs__header{
      background-color: #ffffff !important;
  }
  .el-tabs__nav{
      margin-left: 20px;
  }
  .el-tooltip__popper.is-dark{
      background:rgba(64,64,64,.85) !important;
      max-width: 250px;
      line-height: 17px;
  }
  .el-tooltip__popper[x-placement^=top] .popper__arrow{
      border-top-color:rgba(64,64,64,.85) !important;
  }
  .el-tooltip__popper[x-placement^=top] .popper__arrow::after{
      border-top-color:rgba(64,64,64,.85) !important;
  }
  .el-tooltip__popper[x-placement^=right] .popper__arrow{
      border-right-color:rgba(64,64,64,.85) !important;
  }
  .el-tooltip__popper[x-placement^=right] .popper__arrow::after{
      border-right-color:rgba(64,64,64,.85) !important;
  }
  .el-upload{
      width: 100% !important;
  }
  .el-form-item{
      margin-bottom: 14px !important;
  }
  .el-card__body{
      padding:0 !important;
  }
  .el-message-box{
      width: auto;
  }
  #menu_search .el-autocomplete .el-input__inner{
      background-color: #344e86;
      border: 1px solid #344e86;
      color: #ffffff;
  }
  .el-checkbox__label{
      font-size: 12px;
  }
  .el-dialog{
      padding:20px;
  }
</style>
