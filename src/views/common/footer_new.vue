<template>
    <div class="footer">
        <span style="color: grey;" v-html="this.$store.state.copyright"></span>
    </div>
</template>

<script>
    export default {
        name: "footer_new",
        data(){
            return {
            }
        },
        computed: {
            copyright(){
                const myDate = new Date();
                let copyright_year = myDate.getFullYear();
                return this.$store.state.copyright.replace(/<span id="copyright_time"><\/span>/,copyright_year)
            }
        }
    }
</script>

<style scoped>
    .footer{
        line-height: 40px;
        text-align: center;
    }
</style>