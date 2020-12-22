<template>
    <el-col :lg="12" >
        <el-row>
            <el-col :span="23">
                <el-form-item :prop="param">
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content">
                                <slot name="param_help"></slot>
                            </div>
                            <slot name="param_name"></slot>
                        </el-tooltip>:
                    </label>
                    <el-col :span="22">
                        <slot name="param"></slot>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <label style="line-height: 32px;">
                    <slot name="param_sync"></slot>
                </label>
            </el-col>
        </el-row>
    </el-col>
</template>

<script>
    export default {
        name: "form_item_sync",
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