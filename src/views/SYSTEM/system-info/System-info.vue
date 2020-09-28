<template>
    <div style="height: 50px;background-color: #ffffff;margin-bottom: 20px;">
        <h1 style="line-height: 50px;font-size: 18px;padding-left: 20px;">
            {{lang.system_info}}
        </h1>

        <el-card shadow="never" style="margin:auto;margin-top:20px;padding: 20px;" :style=$store.state.page.card_width>
            <el-table
                    :data="infoData"
                    style="width: 100%; font-size: 12px;"
                    :show-header=false>
                <el-table-column
                    prop="key"
                    width="150"
                    align="right">
                    <template slot-scope="scope">
                        {{lang[scope.row.key]}}:
                    </template>
                </el-table-column>

                <el-table-column
                        prop="value">
                    <template slot-scope="scope">
                        <span v-if="scope.row.key == 'memory_usage'">
                            <el-link type="primary" @click="memory_clean">{{lang.memory_clean}}</el-link>
                        </span>
                        <span v-else>{{scope.row.value}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import {clock} from "../../../components/clock";
    import {MENU} from "../../../store/mutations-types";

    export default {
        name: "System-info",
        inject:['reload'],
        data(){
            return {
                module_name: '',
                software_version: '',
                hardwar_version: '',
                slot_number: '',
                storage_usage: '',
                memory: '',
                bulid_time: '',
                contact_address: '',
                tel: '',
                fax: '',
                e_mail: '',
                web_site: '',
                system_time: '',
                system_uptime: '',

                infoData: [{//0
                    key: 'model_name',
                    value: ''
                }, {//1
                    key: 'software_version',
                    value: ''
                }, {//2
                    key: 'hardware_version',
                    value: ''
                }, {//3
                    key: 'slot_number',
                    value: ''
                }, {//4
                    key: 'storage_usage',
                    value: ''
                }, {//5
                    key: 'memory_usage',
                    value: ''
                }, {//6
                    key: 'build_time',
                    value: ''
                }, {//7
                    key: 'contact_address',
                    value: ''
                }, {//8
                    key: 'tel',
                    value: ''
                }, {//9
                    key: 'fax',
                    value: ''
                }, {//10
                    key: 'e_mail',
                    value: ''
                }, {//11
                    key: 'web_site',
                    value: ''
                }, {//12
                    key: 'system_time',
                    value: ''
                }, {//13
                    key: 'system_uptime',
                    value: ''
                }],

                lang: this.$store.state.lang
            }
        },
        methods:{
            ctime(timestamp) {//时钟
                this.infoData[12].value = clock(timestamp)

                timestamp++
                clearTimeout(this.TimeoutID)
                this.TimeoutID = setTimeout(this.ctime, 1000, timestamp)
            },
            utime(time){
                time++
                let day=Math.floor(time/3600/24)
                let hour=Math.floor(time/3600)%24
                let minute=Math.floor(time/60)%60
                let second=time%60
                if(hour<10) hour = '0' + hour
                if(minute<10) minute = '0' + minute
                if(second<10) second = '0' + second

                this.infoData[13].value = `${day} days ${hour}:${minute}:${second}`

                clearTimeout(this.utimeID)
                this.utimeID = setTimeout(this.utime, 1000, time)
            },

            show_succeed_back(data){
                console.log(data)
                let common_data = data['_get']['_combuf']
                this.$store.commit(MENU, common_data)

                let _info = data['_get']['_info']
                let _date = data['_get']['_date']

                this.infoData[0].value = _info['_modelname']

                this.infoData[1].value = _info['_version']
                this.infoData[2].value = '1.0.0'
                this.infoData[3].value = _info['_stacknum']
                this.infoData[4].value = _info['_printData']+'%'
                this.infoData[5].value = _info['_printMen']
                this.infoData[6].value = _info['_buildtime']

                let addressen = _info['_compyinfo']['_addressen']
                let addresscn = _info['_compyinfo']['_addresscn']
                if(this.lang.model_name == 'Model Name'){
                    this.infoData[7].value = addressen
                }else{
                    this.infoData[7].value = addresscn
                }

                this.infoData[8].value = _info['_compyinfo']['_tel']
                this.infoData[9].value = _info['_compyinfo']['_fax']
                this.infoData[10].value = _info['_compyinfo']['_email']
                this.infoData[11].value = _info['_compyinfo']['_website']

                let start_time = _info['_uptime'].split('.')[0]
                this.utime(start_time)

                let year = _date['_year']
                let month = _date['_month']
                let day = _date['_day']
                let hour = _date['_hour']
                let minute = _date['_minute']
                let second = _date['_second']
                let time = `${year}-${month}-${day} ${hour}:${minute}:${second}`

                let timestamp = Date.parse(time)/1000 //转换时间戳
                this.ctime(timestamp)//初始化时间
            },
            show_error_back(){
                this.$router.push('/common/error')
            },

            memory_clean(){
                this.request.AGSystemInfoMemoryClean(this.clean_succeed_back, this.clean_error_back)
            },
            clean_succeed_back(data){
                this.$message({
                    message: '清除内存成功',
                    type: 'success',
                    offset: '80'
                })

                this.reload()
            },
            clean_error_back(){
                this.$message({
                    message: '清除内存失败',
                    type: 'error',
                    offset: '80'
                })
            }
        },
        created() {
            this.request.AGSystemInfoGet(this.show_succeed_back, this.show_error_back)
        },
        beforeDestroy() {
            clearTimeout(this.TimeoutID)
            clearTimeout(this.utimeID)
        }
    }
</script>

<style scoped>
    .el-divider--horizontal{
        margin:0 0 10px 0;
    }
</style>