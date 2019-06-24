<template>
    <div class="sbody">
        <div class="content">
            <div class="wrap">
                <h1>优惠券</h1>
                <div class="form">
                    <div id="cous-content">
                        <ul id="render">
                            <cous-con v-for="(cous,index) in cousList" :key="index" :cous="cous"></cous-con>
                        </ul>
                        <div v-if="cousList.length==0">
                            <div class="err">暂无优惠券</div>
                        </div>
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                :current-page.sync="page.currentPage"
                                :total="total"
                                style="position: absolute;bottom: 20px;right: 80px"
                                @current-change="currentChange"
                                v-if="cousList.length!=0"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cousCon from '@/components/cous/cousCon.vue'
    export default {
        name: "my-cous",
        components:{
            cousCon
        },
        data(){
            return{
                cousList: [{}],
                page: {
                    currentPage: 1
                },
                total: 0,
            }
        },
        created(){
            this.getCous()
        },
        methods: {
            getCous() {
                let uuid = JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/user/getcous.do', this.$qs.stringify({
                    uuid: uuid,
                    currentPage: this.page.currentPage,
                    pageSize: 2
                })).then((res) => {
                    console.log(res)
                    this.cousList = res.data.data[0]
                    this.page = res.data.data[1]
                    this.total = this.page.totalPage * 10
                }).catch((err) => {
                    console.log(err)
                    this.$message({
                        message: '服务器错误！',
                        type: 'error'
                    });
                })
            },
            currentChange() {
                this.getCous()
            }
        }
    }
</script>

<style>
    #cous-content .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #111;
    }
    #cous-content .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: white;
        background-color: #111;
    }
</style>