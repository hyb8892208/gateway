<template>
    <el-row>
        <el-divider content-position="left"><h3>{{lang.zerotier_vpn_settings}}</h3></el-divider>

        <el-row>
            <el-col :lg="12">
                <el-form-item>
                    <label slot="label">
                        <el-tooltip placement="top" :open-delay=200>
                            <div slot="content" v-html="lang.network_id_help"></div>
                            <span>{{lang.network_id}}</span>
                        </el-tooltip>:
                    </label>
                    <el-col :lg="18">
                        <el-input v-model="network_id"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    export default {
        name: "ZeroVpn",
        props:{
            parent_data: {
                require: true
            }
        },
        data(){
            return {
                network_id: '',

                lang: this.$store.state.lang
            }
        },
        mounted() {
            this.network_id = this.parent_data._zerovpnNetworkID
        }
    }
</script>

<style scoped>

</style>