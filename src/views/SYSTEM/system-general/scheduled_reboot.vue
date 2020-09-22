<template>
    <el-form :label-position="labelPosition" class="change-label-class" status-icon size="small">

        <el-row>
            <el-col :lg="24">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" open-delay="200">
                            <div slot="content">
                                提示内容
                            </div>
                            <span>Enable</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-checkbox v-model="auto_sync_sw"></el-checkbox>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

    </el-form>
</template>

<script>
    export default {
        name: "scheduled_reboot",
        data(){
            return {
                labelPosition: 'top',

                reboot_sw: false

            }
        }
    }
</script>

<style scoped>
    .change-label-class /deep/ .el-form-item__label {
        padding: 0;
    }
</style>