<template>
    <el-form
            label-width="250px"
            class="change-label-class"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.asterisk_logs}}
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;" :style=$store.state.page.card_width>

            <el-input
                    type="textarea"
                    rows="30"
                    v-model="log"
                    readonly
                    resize="none"
                    style="font-size: 12px"
            >

            </el-input>

            <el-row style="text-align: center;margin-top:20px;" >
                <span>
                    {{lang.refresh_rate}}:
                    <el-select v-model="refresh_rate" @change="change_rate" size="small" style="width: 75px;">
                        <el-option value="0" :label="lang.OFF"></el-option>
                        <el-option v-for="i in 10"
                                   :key="i"
                                   :value="i"
                                   :label="i"
                        ></el-option>
                    </el-select>
                </span>
                <span style="padding: 5px">
                    <el-button
                            @click="refresh"
                            type="primary"
                            size="small">{{lang.refresh}}</el-button>

                </span>
                <span>
                    <el-button
                            @click="clean_up"
                            type="primary"
                            size="small">{{lang.clean_up}}</el-button>
                </span>
            </el-row>

        </el-card>
    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";
    import {debuger} from "../../../debug/debug";

    export default {
        name: "Asterisk",
        inject:['reload'],
        data(){
            return {
                log: '',
                refresh_rate: 0,

                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods: {
            show_succeed_back(data) {
                console.log(data)
                let common_data = data['_combuf']
                this.$store.commit(MENU, common_data)

                this.get_log_content()
            },
            show_error_back() {
                this.$router.push('/common/error')
            },

            get_log_content() {
                clearTimeout(this.timeoutID)
                this.$axios.get('/log/log4gw/'+Math.random())
                    .then((res) => {
                        this.log = res.data
                        let t = document.getElementById('showlog')
                        t.scrollTop = t.scrollHeight
                    })
                    .catch(() => {

                    })
                if(this.refresh_rate != 0){
                    this.timeoutID = setTimeout(this.get_log_content, this.refresh_rate*1000)
                }
            },
            change_rate() {
                clearTimeout(this.timeoutID)
                this.timeoutID = setTimeout(this.get_log_content, this.refresh_rate*1000)
                this.setCookie("asterisk_cookies_val", this.refresh_rate)
            },
            refresh(){
                this.$message({
                    message: this.lang.refresh_successfully,
                    type: 'success',
                    offset: '80'
                })
                this.reload()
            },

            clean_up(){
                this.$confirm(this.lang.clean_up_confirm)
                    .then(_ => {
                        this.request.AGLogDelAll(this.clean_succeed_back, this.clean_error_back, 'log-ast')
                    })
                    .catch(_ => {

                    })
            },
            clean_succeed_back(data){
                if(data['_result'] == 0) {
                    this.log = ''

                    this.$message({
                        message: this.lang.clean_up_successful,
                        type: 'success',
                        offset: '80'
                    })
                }else{
                    this.$message({
                        message: this.lang.clean_up_failed,
                        type: 'error',
                        offset: '80'
                    })
                }
            },
            clean_error_back(){
                this.$message({
                    message: this.lang.clean_up_failed,
                    type: 'error',
                    offset: '80'
                })
            }
        },
        created() {
            this.debug = debuger('log-asterisk')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGLogGetAll(this.show_succeed_back, this.show_error_back)
            }

            let cookies_val = this.getCookie('asterisk_cookies_val')
            if(cookies_val == null){
                this.setCookie("asterisk_cookies_val", this.refresh_rate)
            }else{
                this.refresh_rate = cookies_val
            }
        },
        beforeDestroy() {
            clearTimeout(this.timeoutID)
        }
    }
</script>

<style scoped>

</style>