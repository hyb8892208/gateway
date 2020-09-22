<template>
    <div>
        <el-row>
            <el-col :span="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" open-delay="200">
                            <div slot="content">
                                提示内容
                            </div>
                            <span>SSH Enable</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-switch
                                v-model="ssh_sw"
                                active-color="#409EFF"
                                inactive-color="#909399">
                        </el-switch>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" open-delay="200">
                            <div slot="content">
                                提示内容
                            </div>
                            <span>Username</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input id="ssh_username" v-model="ssh_username"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" open-delay="200">
                            <div slot="content">
                                提示内容
                            </div>
                            <span>Password</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input id="ssh_password" show-password v-model="ssh_password"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" open-delay="200">
                            <div slot="content">
                                提示内容
                            </div>
                            <span>Confirm Password</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input id="ssh_confirm_password" show-password v-model="ssh_confirm_password"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item>
                    <label class="el-form-item__label">
                        <el-tooltip placement="top" open-delay="200">
                            <div slot="content">
                                提示内容
                            </div>
                            <span>Port</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <p>12345</p>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-button type="primary" size="small">Save</el-button>
    </div>
</template>

<script>
    export default {
        name: "ssh_login",
        data(){
            return {
                ssh_sw: false,
                ssh_username: '',
                ssh_password: '',
                ssh_confirm_password: '',

                labelPosition: 'top'
            }
        }
    }
</script>

<style scoped>
    .change-label-class /deep/ .el-form-item__label {
        padding: 0;
    }
</style>