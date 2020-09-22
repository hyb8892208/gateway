<template>
    <el-form :label-position="labelPosition" class="change-label-class" status-icon size="small">

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        Language
                        <el-tooltip placement="top" open-delay="200">
                            <div slot="content">
                                提示内容
                            </div>
                            <span>Language</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-select v-model="language" :placeholder="lang.select_placeholder" style="width: 100%;">
                            <el-option
                                    v-for="item in languages"
                                    :key="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" open-delay="200">
                            <div slot="content">
                                提示内容
                            </div>
                            <span>Download</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-button type="primary" size="small" round>Download</el-button>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" open-delay="200">
                            <div slot="content">
                                提示内容
                            </div>
                            <span>Delete</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-button type="primary" size="small" round>Delete</el-button>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-form-item>
                        <label slot="label">
                            <el-tooltip placement="top" open-delay="200">
                                <div slot="content">
                                    提示内容
                                </div>
                                <span>Add New Language</span>
                            </el-tooltip>:
                        </label>
                        <el-col :lg="18">np
                            <el-upload
                                    class="upload-demo"
                                    drag
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">文件大小不超过500kb</div>
                            </el-upload>
                        </el-col>
                </el-form-item>
            </el-col>
        </el-row>

        <el-button type="primary" size="small">Save</el-button>
    </el-form>
</template>

<script>
    export default {
        name: "language_settings",

        data(){
            return {
                labelPosition: 'top',

                language: '',
                languages: [{
                    label: 'Chinese',
                    value: 'chinese'
                }, {
                    label: 'English',
                    value: 'english'
                }]
            }
        }
    }
</script>

<style scoped>

</style>