<template>
    <h1 style="margin-top:100px;text-align: center;font-size: 50px;">{{lang.page_not_found}}</h1>
</template>

<script>
    import {request} from "../../network/request";
    import {MENU} from "../../store/mutations-types";

    export default {
        name: "404",
        data(){
            return {
                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                let common_data = data['_combuf']
                this.$store.commit(MENU, common_data)
            },
            show_error_back(){
                this.$router.push('/common/error')
            },
        },
        created() {
            this.request = new request()
            this.request.AGLogGetAll(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>