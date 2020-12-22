<template>
    <el-row>
        <divider_item><span slot="title">{{lang.zerotier_vpn_settings}}</span></divider_item>

        <el-row>
            <form_item>
                <span slot="param_help" v-html="lang.network_id_help"></span>
                <span slot="param_name" >{{lang.network_id}}</span>
                <el-input slot="param" v-model="network_id"></el-input>
            </form_item>
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