<template>
    <div class="footer">
        <span style="color: grey;" v-html="this.$store.state.copyright"></span>
    </div>
</template>

<script>
    export default {
        name: "footer_new"
    }
</script>

<style scoped>
    .footer{
        line-height: 40px;
        text-align: center;
    }
</style>