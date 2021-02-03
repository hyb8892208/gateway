<template>
    <div style="line-height: 54px;">
        <a href="/System/Status"><img src="../../assets/images/logo_openvox.png" style="display: inline-block;vertical-align: middle;margin-left:10px;" /></a>

        <ul class="header-operations">
            <li>
                <span class="header-lang is-active" @click="switch_language('chinese')">中文</span>
                <span>/</span> <span class="header-lang" @click="switch_language('english')">En</span>
            </li>
        </ul>

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
                let info = ''
                let confirm = ''
                let cancel = ''
                if(language == 'chinese'){
                    info = '确定要切换为中文吗？'
                    confirm = '确定'
                    cancel = '取消'
                }else{
                    info = 'Are you sure you want to switch to English?'
                    confirm = 'Confrim'
                    cancel = 'Cancel'
                }

                this.$confirm(info,'',{confirmButtonText:confirm,cancelButtonText:cancel})
                    .then(_ => {
                        this.request = new request()
                        this.request.AGSystemLanguageSave(this.save_language_succeed, this.save_language_error, language)
                    })
                    .catch(_ => {})
            },
            save_language_succeed(data){
                this.$message({
                    message: this.lang.switch_language_successfully,
                    type: 'success',
                    offset: '80'
                })

                window.location.reload()
            },
            save_language_error(){
                this.$message({
                    message: this.lang.switch_language_failed,
                    type: 'error',
                    offset: '80'
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