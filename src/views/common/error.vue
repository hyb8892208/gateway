<template>
    <h1 style="margin-top:100px;text-align: center;font-size: 50px;">{{lang.resource_error}}</h1>
</template>

<script>
    import {MENU} from "../../store/mutations-types";
    import {debuger} from "../../debug/debug";

    export default {
        name: "error",
        data(){
            return {
                debug: false,
                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                let common_data = data['_combuf']
                this.$store.commit(MENU, common_data)
            },
            show_error_back(){

            },
        },
        created() {
            this.debug = debuger('log-asterisk')['default']
            if(this.debug){
                this.show_succeed_back(this.debug)
            }else {
                this.request.AGLogGetAll(this.show_succeed_back, this.show_error_back)
            }
        }
    }
</script>

<style scoped>

</style>