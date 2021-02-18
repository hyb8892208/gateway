<template>
    <div style="line-height: 54px;">
        <a href="/System/Status"><img src="../../assets/images/logo_openvox.png" style="display: inline-block;vertical-align: middle;margin-left:10px;" /></a>

        <el-dropdown
                :placement="'bottom-start'"
                @command="switch_language"
                :show-timeout="150"
                :hide-timeout="250"
                class="header-operations"
                style="color: #ffffff;margin-right: 20px;">
              <span>
                {{lang.language}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="chinese">中文</el-dropdown-item>
                <el-dropdown-item command="english">English</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <i class="el-icon-menu" @click="is_show_menu"></i>
    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "header_new",
        data(){
            return {
                lang: this.$store.state.lang
            }
        },
        methods:{
            is_show_menu(){
                this.$emit("child_change_aside_value")
            },
            switch_language(language){
                this.request = new request()
                this.request.AGSystemLanguageSave(this.save_language_succeed, this.save_language_error, language)
            },
            save_language_succeed(data){
                this.$message({
                    message: this.lang.switch_language_successfully,
                    type: 'success',
                    offset: 80
                })

                window.location.reload()
            },
            save_language_error(){
                this.$message({
                    message: this.lang.switch_language_failed,
                    type: 'error',
                    offset: 80
                })
            }
        }
    }
</script>

<style scoped>
    .header-operations {
        display: inline-block;
        float: right;
        padding-right: 30px;
        height: 100%;
    }
    .header-operations li {
        color: #fff;
        display: inline-block;
        vertical-align: middle;
        padding: 0 10px;
        margin: 0 10px;
        cursor: pointer;
        line-height: 54px;
    }
    .header-operations:after {
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle;
    }
    .header-operations li:last-child {
        cursor: default;
    }
    .header-operations .header-lang {
        cursor: pointer;
    }
    @media only screen and (max-width: 650px) {
        .header-operations{
            display: none;
        }
    }
    .el-icon-menu{
        font-size: 24px;
        float: right;
        line-height: 54px;
        display: none;
    }
    @media only screen and (max-width: 768px) {
        .el-icon-menu{
            display: inline-block;
        }
    }
</style>