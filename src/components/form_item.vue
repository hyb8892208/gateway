<template>
    <el-col :lg="12" >
        <el-form-item :prop="param">
            <label slot="label">
                <el-tooltip placement="top" :open-delay=200>
                    <div slot="content">
                        <slot name="param_help"></slot>
                    </div>
                    <slot name="param_name"></slot>
                </el-tooltip>:
            </label>
            <el-col :lg="18">
                <slot name="param"></slot>
            </el-col>
        </el-form-item>
    </el-col>
</template>

<script>
    export default {
        name: "form_item",
        props:{
            param:{
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>