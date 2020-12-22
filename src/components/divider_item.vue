<template>
    <el-row>
        <h2>
            <slot name="title"></slot>
        </h2>
        <el-divider></el-divider>
    </el-row>
</template>

<script>
    export default {
        name: "divider_item"
    }
</script>

<style scoped>
    .el-divider--horizontal{
        margin: 15px 0;
    }
</style>