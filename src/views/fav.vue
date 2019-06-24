<template>
    <div class="sbody">
        <div class="content footContent">
            <div class="wrap">
                <h1>心愿单</h1>
                <div class="form">
                    <div class="show">
                        <div  v-if="index>0"
                               v-for="(goods,index) in favGoods " :key="index"  class="goods-module">

                                <div class="goods-pic " style="position: relative">
                                    <img :src="url+goods.picUrl" alt="">
                                    <span class=" cancel"  @click="cancel(index)" style="position: relative;left: 92px;top: -25px;">
                                    </span>
                                    <h3>{{goods.goodsName}}</h3>
                                    <p class="goods-price">￥{{goods.goodsPrice}}</p>
                                </div>

                        </div>
                       <!--<div class="tips" v-for="(goods,index) in favGoods " :key="index" v-if="favGoods.length==0" > 心愿单空空如也，快去收藏点东西吧~</div>-->
                    </div>
                    <div v-if="favGoods[0].favCount==0">
                        <div class="err">暂无心愿单</div>
                    </div>
                    <!--<div class="pagination clearFix">-->
                        <!--<el-pagination-->
                                <!--background-->
                                <!--layout="prev, pager, next"-->
                                <!--:page-count="pageCount"-->
                                <!--:current-page.sync='currentPage'-->
                                <!--@current-change="currentChange"-->
                                <!--@prev-click="prevClick"-->
                                <!--@next-click="nextClick"-->
                                <!--v-if="favGoods.length!=0">-->
                        <!--</el-pagination>-->
                    <!--</div>-->
                </div>
            </div>

        </div>
    </div>

</template>
<style scoped>
    @import "../assets/css/fav.css";
    .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #111;

    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: white;
        background-color: #111;

    }
    .sbody .content{
        padding-bottom: 0;
    }
    .sbody .form{
        padding-bottom: 0;
    }
    .content{
        padding: 20px 0px;
    }
    .wrap{
        padding: 0 80px;
    }
    .content h1{
        font-size: 24px;
        font-weight: bold;
        border-bottom: 1px solid #BBBBBB;
        padding-bottom: 30px;
    }
</style>
    <script>
        export default{
            name: 'foot',
            data(){
                return {
                    currentPage: 1, //当前页
                    pageSize :2, //每页显示数量
                    pageCount : 1, //总页数
                    favGoods:[{}], //收藏商品
                    url:''
                }
            },
            created() {
                this.url=localStorage.getItem('URL')
                this.getInfo()
                // this.$http.get('/user/pagefav.do',{params:{
                //         userId:this.uid,
                // }}
                //     .then((data)=>{
                //
                //         this.pageCount=(data.length==0)? 1: Math.ceil(data.length / this.pageSize);
                //         if(this.currentPage >this. pageCount) {
                //             this.currentPage = this.pageCount;
                //         }
                //     })
                //     .catch((err)=>{
                //         console.log(err);
                //     })

            },
            methods:{
                getInfo(){
                    let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                    this.$http.get('/user/favgoods.do',{
                        params:{
                            uuid:uuid,
                            pageSize:this.pageSize,
                            currentPage:this.currentPage,
                        }
                    })
                        .then((res)=>{
                            this.pageCount=res.data.data[1].totalPage;
                            // this.favGoods=res.data.data
                            this.favGoods=res.data.data[0];
                            console.log(res);

                        })
                        .catch((err)=>{
                            console.log(err);
                        });
                },
                currentChange(){
                    console.log(this.currentPage);
                    this.getInfo()
                      },
                prevClick(){
                    this.currentPage=Number(this.currentPage)-1;
                    console.log(this.currentPage);
                    if(this.currentPage<1){
                        this.currentPage=1;
                    }
                    let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                    this.$http.get('/user/favgoods.do',{
                        params:{
                            uuid:uuid,
                            pageSize:this.pageSize,
                            currentPage:this.currentPage,
                        }
                    })
                        .then((res)=>{
                            console.log(res.data.data[1]);
                            this.pageCount=res.data.data[1].totalPage;
                            // this.favGoods=res.data.data
                            this.favGoods=res.data.data[0];

                        })
                        .catch((err)=>{
                            console.log(err);
                        });
                },
                nextClick(){
                    this.currentPage=Number(this.currentPage)+1;
                    if(this.currentPage>this.pageCount){
                        this.currentPage=this.pageCount
                    }
                    let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                    this.$http.get('/user/favgoods.do',{
                        params:{
                            uuid:uuid,
                            pageSize:this.pageSize,
                            currentPage:this.currentPage,
                        }
                    })
                        .then((res)=>{
                            console.log(res.data.data[1]);
                            this.pageCount=res.data.data[1].totalPage;
                            // this.favGoods=res.data.data
                            this.favGoods=res.data.data[0];

                        })
                        .catch((err)=>{
                            console.log(err);
                        });
                },

                    cancel(index){

                        let goodId=this.favGoods[index].goodsId;
                        console.log(this.favGoods[index].goodsId);
                        let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                        this.$http.get('/user/cancelFav.do',{
                            params:{
                                uuid:uuid,
                                goodsId:goodId
                            }
                        })
                            .then((res)=>{
                                console.log(res)
                               this.getInfo()
                            })
                            .catch((err)=>{
                                console.log(err);
                            })

                    },


            }
        }
    </script>