<template>
    <div v-if="goods">
        <section class="three-section">
            <div class="tab clear">
                <div id="1" class="tab-left" :class="{active: showInfo}" @click="infoTab">
                    商品详情
                </div>
                <div class="tab-right" :class="{active: showComment}" @click="CommentTab">用户评价（{{goods[0].commentCount}}）</div>
            </div>
            <div class="tab-content" id="tab-content">
                <!-- 商品详情 -->
                <div class="info-content" v-show="showInfo">
                    <h2 class="h2-name">{{goods[0].goods_name}}</h2>
                    <p class="p-descript">{{goods[0].goods_descript}}</p>
                </div>
                <!-- 评价详情 -->
                <div class="comment-content" v-show="showComment" id="comment-content">
                    <div :class="{centerText: flag1}">{{text}}</div>
                    <CommentContent v-if="comments" :comments="comments"/>
                    <!-- 分页 -->
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            @prev-click="handlePrevClick"
                            @next-click="handleNextClick"
                            background
                            layout='prev, pager, next'
                            :total="total"
                            :page-size="pageSize"
                            :current-page.sync="currentPage"
                            :pager-count="pagerCount">
                    </el-pagination>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import CommentContent from '@/components/goodsInfo/commentContent.vue'
    export default {
        name: "infoShow",
        props: ['goodsId','uuid'],
        components: {CommentContent},
        data() {
            return{
                showInfo: true,
                showComment: false,
                total: '',
                goods:'',
                comments:'',
                pageSize: 5, //每页显示个数
                currentPage: 1, //当前页
                pagerCount:5, //显示的按钮个数
                text: '',
                flag1: false
            }
        },
        methods: {
            // 显示商品详情
            infoTab() {
                this.showInfo=true;
                this.showComment=false
            },
            // 显示评论列表
            CommentTab() {
                this.getComments();
                this.showInfo=false;
                this.showComment=true;
                if (!this.goods[0].commentCount){
                    this.flag1=true;
                    this.text = '该商品暂时没有评论！' ;
                } else {
                    this.text='';
                    this.flag1=false
                }
                // console.log(this.comments)
                // console.log(this.text)
            },
            // 获取comment
            getComments () {
                return new Promise((resolve) => {
                    let data = this.$qs.stringify({goodsId: this.goodsId,currentPage: this.currentPage,pageSize: this.pageSize});
                    this.$http.post('/commentsPagination.do', data).then((res) => {
                        resolve(res.data)
                    })
                        .catch(err => {
                            console.log('获取评论详情', err);
                            this.$message({
                                message: '获取评论详情失败',
                                type: 'error',
                                duration: 1000
                            });
                        });
                })
            },
            // 获取goods
            getGoods () {
                // let that=this;
                return new Promise((resolve) => {
                    let data = this.$qs.stringify({uuid:this.uuid, goodsId: this.goodsId,currentPage: this.currentPage,pageSize: this.pageSize});
                    this.$http.post('/goodsmess.do', data).then((res) => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        console.log('获取商品详情', err);
                        this.$message({
                            message: '获取商品详情失败',
                            type: 'error',
                            duration: 1000
                        });
                    });
                })
            },
            // 改变pageSize
            handleSizeChange() {

            },
            // 改变currentPage
            handleCurrentChange() {
                this.getComments().then(res=>{
                    console.log('comments',res);
                    this.comments=res.data;
                });
            },
            // 点击上一页
            handlePrevClick() {
            },
            // 点击下一页
            handleNextClick() {
            }
        },
        created() {
            // 获取评论
            this.getComments().then(res=>{
                console.log('comments',res);
                this.comments=res.data;
            });
            // 获取商品goods
            this.getGoods().then(res=>{
                if (res.returncode==='200'){
                    this.goods=res.data;
                    this.total=res.data[0].commentCount;
                }
            });
        },
        watch: {
            // currentPage: (currentPage) => {

            // }
        }
    }
</script>

<style scoped>
    .centerText{
        text-align: center;
    }
    .el-pagination{
        /*height: 50px;*/
        text-align: center;
        padding: 20px 0;
    }
    .el-pager li{
        background: #666666!important;
    }
    .clear::before,
    .clear::after{
        display: table;
        content: '';
    }
    .clear::after{
        clear: both;
    }
    /* section three */
    .three-section {
        width: 1170px;
        background-color: #ffffff;
        margin: 0 auto;
        padding: 5px 15px 70px 5px;
    }
    .tab{
        border-bottom: 1px solid #cccccc;
        padding-bottom: 5px;
    }
    .tab-left,.tab-right{
        padding: 0 50px;
        width: 50%;
        float: left;
        vertical-align: top;
        text-align: center;
        font-size: 18px;
        line-height: 50px;
        cursor: pointer;
        position: relative;
        transition: all linear .2s;
        color: #cccccc;
    }
    .tab-left{
        text-align: right;
    }
    .tab-right{
        text-align: left;
    }
    .tab-left::after{
        position: absolute;
        top: 15px;
        right: 0;
        width: 1px;
        height: 20px;
        background-color: #ccc;
        content: '';
        font-size: 0;
        line-height: 0;
    }
    .tab-color{
        color: red;
    }
    .tab-left:hover,.tab-right:hover{
        color: #777777;
    }
    .tab-content{
        padding: 20px 10px 15px 10px;
    }
    .info-content{
        padding: 20px 70px;
    }
    .active{
        color: #333333;
    }
</style>