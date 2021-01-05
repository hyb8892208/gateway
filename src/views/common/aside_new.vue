<template>
    <div style="height: 100%;">
        <el-row class="tac" style="height: 100%;">
            <el-col :span="24" style="height: 100%;">
                <el-menu
                        :default-active="$store.state.menuActive"
                        background-color="#3b5998"
                        text-color="#ffffff"
                        active-text-color="#ffffff"
                        router
                        class="el-menu-vertical-demo"
                        unique-opened>

                    <el-menu-item id="menu_search" style="padding: 0;background-color: #344e86;">
                        <el-autocomplete
                                class="inline-input"
                                v-model="menu_name"
                                :fetch-suggestions="querySearch"
                                :trigger-on-focus="false"
                                @select="handleSelect"
                                suffix-icon="el-icon-search"
                                style="width: 100%;"
                        ></el-autocomplete>
                    </el-menu-item>
                    <el-submenu v-for="(item,ind) in $store.state.menu" :index="(ind+1)+''">
                        <template slot="title">
                            <i :class="item.icon" style="color: #ffffff"></i>
                            <span>{{lang[item.name]}}</span>
                        </template>
                        <el-menu-item-group v-for="i in item.child_menu">
                            <el-menu-item :index="i.index" @click="is_show_menu" >{{lang[i.name]}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "aside_new",
        inject:['reload'],
        data() {
            return {
                menu_name: '',
                menu: [],
                lang: this.$store.state.lang
            }
        },
        methods: {
            is_show_menu() {
                this.$emit('child_mobile_hide_aside')
                this.reload()
            },

            querySearch(queryString, callback) {
                let results = queryString ? this.menu.filter(this.createFilter(queryString)) : this.menu

                callback(results)
            },
            createFilter(queryString) {
                return (menu) => {
                    return (menu.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1)
                }
            },
            loadAll() {

                let arr = []
                let menu = this.$store.state.menu
                for(let i=0;i<menu.length;i++){
                    menu[i].child_menu.forEach(item => {
                        item['value'] = this.lang[item.name]
                        arr.push(item)
                    })
                }

                return arr
              },
              handleSelect(item) {
                  this.$router.push(item.index)
                  this.$store.state.menuActive = item.index
              }
          },
          mounted() {
              let url = '/' + window.location.href.split("//")[1].split("/")[1]
                  + '/' + window.location.href.split("//")[1].split("/")[2]

              if(url == '//undefined')
                  url = '/System/Status'

              if(url.indexOf('?') > -1){
                  url = url.split('?')[0]
              }
              this.$store.state.menuActive = url

              this.menu = this.loadAll()
          }
      }
</script>

<style scoped>
    .el-menu{
        height: 100%;
    }
    .el-menu-vertical-demo{
        width: 250px;
        min-height: 400px;
    }
    .el-menu-item:hover{
        background-color: #42b983;
    }
    .el-submenu{
        border-bottom: 1px solid #344e86;
    }
    .el-submenu .el-menu-item{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #3B5998;
        background-color: #344e86 !important;
        padding-left: 60px !important;
    }
    .el-menu-item.is-active{
        background-color: #4885f0 !important;
    }
    .el-submenu .el-menu-item:hover{
        background-color: #283d68 !important;
    }
    .el-menu-item, .el-submenu__title{
        height: 40px;
        line-height: 40px;
    }

</style>