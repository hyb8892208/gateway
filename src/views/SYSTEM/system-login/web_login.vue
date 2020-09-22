<template>
   <div>


    </div>
</template>

<script>
    export default {
        name: "web_login",
        data(){
            return {
                username: '',
                password: '',
                confirm_password: '',

                login_mode_value: 'http_https',
                login_modes: [{
                   label: 'http and https',
                   value: 'http_https'
                },{
                    label: 'only https',
                    value: 'https'
                }],

                port: '80',

                labelPosition: 'right'
            }
        }
    }
</script>

<style scoped>

</style>