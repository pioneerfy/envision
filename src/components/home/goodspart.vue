<template>
    <div class="goodspart">
        <!--商品板块的banner-->
        <section class="sm-banner banner3">
            <img :src="url+ childTitle.banner3url" alt="">
        </section>

        <!--商品板块-->
        <section class="hot">
            <div class="titile-box"><h2>{{childTitle.name}}</h2></div>
            <div class="hot-content">
                <div class="hc-left all-left">
                    <img :src="url+childTitle.banner4url" alt="">
                </div>
                <div class="hot-right">
                    <div class="goods-wrap goods-detail" v-for="(item,index) in goodsData.slice(0,7)" @click="toGoodsDetail(item.goods_id)" :key="index">
                        <div class="goods-msg" v-if="childTitle.name==='热门'">热门</div>
                        <div class="goods-img"><img :src="url+item.pic_url" alt=""></div>
                        <p class="goods-name">{{item.goods_name}}</p>
                        <p class="goods-price">￥{{item.goods_price}}元</p>
                    </div>
                    <div class="goods-wrap goods-more hot-more" @click="moreGoods(title.typeid)">
                        <div class="goods-img"><span class="iconfont icon-gengduo2"></span></div>
                        <p class="goods-name" >查看更多商品</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "goodspart",
        props:['title'],
        data(){
            return {
                goodsData:'',
                typeid:'',
                childTitle:'',
                url:''
            }
        },
        methods:{
            //获取热门商品
            getHotGoods(){
                this.$http.get('/goods/getHotGoods.do',{
                    params:{
                        num:7
                    }
                })
                    .then((res)=>{
                        console.log('热门商品')
                        console.log(res);
                        if (res.data.returncode ==='200'){
                            this.goodsData = res.data.data
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            //获取其它的商品
            getOtherGoods(){
                this.$http.get('/goods/getGoods.do',{
                    params:{
                        goodsTypeId:this.typeid
                    }
                })
                    .then((res)=>{
                        console.log(res);
                        if (res.data.returncode ==='200'){
                            this.goodsData = res.data.data
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            //跳转商品详情页面
            toGoodsDetail(id){
                this.$router.push({name:'detail',query: {goodsId:id}})
            },
            //跳转搜索页面
            moreGoods(typeId){
                if (typeId ===0){
                    this.$router.push({name:'search',query: {isHot:0}})
                }else{
                    this.$router.push({name:'search',query: { typePidId:typeId}})
                }
            },
        },
        created() {
            this.url=localStorage.getItem('URL')
            this.typeid = this.title.typeid
            if (this.typeid ===0){
                this.getHotGoods()
            } else{
                this.getOtherGoods()
            }
            this.childTitle = this.title
        }
    }
</script>

<style scoped>
    .goodspart{
        margin-bottom: 100px;
    }
    /*banner3*/
    .sm-banner{
        width: 1170px;
        height: 100px;
        background-color: #111111;
        margin: 50px auto 15px;
        overflow: hidden;
        border-radius: 8px;
        background-size: 100% auto;
        background-position: center;
        background-repeat: no-repeat;
    }
    .sm-banner img{
        width: 100%;
        height: 100%;
    }
    .hot{
        width: 1170px;
        height: 540px;
    }
    .titile-box{
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
    }
    .hot-content{
        width: 100%;
        height: 500px;
    }
    .all-left{
        width: 210px;
        height: 100%;
        float: left;
        border-radius: 8px 0 0 8px;
        overflow: hidden;
        cursor: pointer;
        box-shadow: 0 3px 10px -3px #a8a8a8;
        position: relative;
    }
    .all-left img{
        width: 100%;
        height: 100%;
    }
    .hot-right,.mc-right,.ec-right,.pc-right,.fc-right,.tc-right{
        width: 940px;
        height: 100%;
        float: right;
        border-radius: 0 8px 8px 0;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .goods-wrap{
        width: 220px;
        height: 240px;
        flex-basis: 220px;
        background-color: #ffffff;
        border-radius: 5px;
        text-align: center;
        position: relative;
        cursor: pointer;
        margin-bottom: 20px;
        padding: 30px 5px 0 5px;
        box-shadow: 0 3px 10px -3px #a8a8a8;

    }
    .goods-msg{
        display: inline-block;
        position: absolute;
        color: #FFFFFF;
        letter-spacing: 2px;
        top: 0;
        font-size: 12px;
        width: 50px;
        height: 22px;
        line-height: 22px;
        left: calc(50% - 25px);
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        background-color: #d89aff;
    }
    .goods-img{
        width: 140px;
        height: 120px;
        background-color: #ffffff;
        margin: 0 auto 20px;
        transition: all 500ms;
    }
    .goods-wrap.goods-detail:hover .goods-img{
        transform: translateX(-12px);
    }
    .leftanimation{
        transform: translateX(-12px);
    }
    .goods-img img{
        width: 100%;
        height: 100%;
    }
    .goods-name{
        font-weight: bolder;
        margin-bottom: 15px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .goods-price{
        color: #ff6037;
        font-size: 14px;
    }
    .icon-gengduo2{
        line-height: 120px;
        font-size: 45px!important;
        color: #444444;
    }
</style>