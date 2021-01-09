<template>
    <el-form
            :label-position="$store.state.page.labelPosition"
            label-width="250px"
            class="change-label-class"
            ref="ruleForm"
            size="small">
        <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;padding-left: 20px;">
            <h1 style="line-height: 50px;font-size: 18px;">
                {{lang.board_update}}
                <div style="float: right;line-height: 50px;margin-right: 20px;">
                    <el-button type="primary"
                               size="small"
                               @click="Save">{{lang.save}}</el-button>
                </div>
            </h1>
        </div>

        <el-card shadow="never" style="margin:auto;padding: 20px;margin-bottom: 50px;" :style=$store.state.page.card_width>
            <el-row :gutter="30">
                <el-col v-for="i in 16" :lg="4" :md="6" :sm="12" :xs="12" style="height: 100px;margin:10px 0;">
                    <div style="width: 100%;background-color: #409EFF;height: 100%">aa</div>
                </el-col>
            </el-row>
        </el-card>

    </el-form>
</template>

<script>
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "Adv-boardupdate",
        data(){
            return {
                lang: this.$store.state.lang
            }
        },
        methods:{
            show_succeed_back(data){
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)
            },
            show_error_back(){

            }
        },
        created() {
            this.request.AGSystemAutoUpdateGet(this.show_succeed_back, this.show_error_back)
        }
    }
</script>

<style scoped>

</style>