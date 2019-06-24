<template>
    <!--为你推荐-->
    <section class="recommend">
        <div class="recommend-title">为您推荐</div>
        <div class="recommend-content">
            <div class="recommend-wrap" v-for="(item,index) in recommendData.slice(0,4)" :key="index" @click="$router.push({name:'detail',query:{goodsId:item.goods_id}})">
                <div class="recommend-img"><img :src="url+item.goods_url" alt=""></div>
                <p class="recommend-name">{{item.goods_name}}</p>
                <p class="recommend-price">{{item.goods_price}}元</p>
            </div>
        </div>

    </section>
</template>

<script>
    export default {
        name: "recommend",
        data(){
            return{
                recommendData:'',
                url:''
            }
        },
        methods:{
            //获取推荐商品的数据
            getRecommedData(){
                this.$http.get('/goods/getRecommend.do',{
                    params:{num:4}
                })
                    .then((res)=>{
                        console.log(res);
                        if(res.data.returncode ==='200'){
                            this.recommendData = res.data.data
                        }

                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            }
        },
        created() {
            this.getRecommedData();
            this.url=localStorage.getItem('URL')
        }
    }
</script>

<style scoped>
    .recommend{
        margin: 50px auto;
        width: 100%;
        height: auto;
        text-align: center;
    }
    .recommend-title{
        font-size: 18px;
        font-weight: bolder;
    }
    .recommend-content{
        margin-top: 15px;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
    }
    .recommend-wrap{
        width: 230px;
        height: 240px;
        border-radius: 5px;
        padding: 30px 5px 0 5px;
        cursor: pointer;
        background-color: #fff;
        box-shadow: 0 3px 10px -3px #a8a8a8;
    }
    .recommend-img{
        width: 160px;
        height: 130px;
        margin: 0 auto 20px;
    }
    .recommend-img img{
        width: 100%;
        height: 100%;
    }
    .recommend-name{
        font-weight: bolder;
        margin-bottom: 10px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .recommend-price{
        color: #ff6037;
        font-size: 14px;
    }
</style>