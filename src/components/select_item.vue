<template>
    <el-select slot="param" v-model="bind_val" style="width: 100%">
        <el-option
                v-for="item in options"
                :label="item.label"
                :key="item.value"
                :value="item.value"></el-option>
    </el-select>
</template>

<script>
    export default {
        name: "select_item",
        props:{
            options: {
                require: true
            },
            bind_val: {
                require: true
            }
        }
    }
</script>

<style scoped>

</style>