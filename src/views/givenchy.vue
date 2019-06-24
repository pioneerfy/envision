<template>
    <div class="givenchy">
        <Head></Head>
        <div class="main">
            <div class="banner">
                <div class="banner-pic-one table" data-goodsID="57" v-show="banner1">
                    <div class="banner-list">
                        <p class="banner-title">GENTLEMAN GIVENCHY</p>
                        <p class="banner-des">纪梵希绅士</p>
                    </div>

                </div>
                <div class="banner-pic-two table" data-goodsID="52" v-show="banner2">
                    <div class="banner-list">
                        <p class="banner-title">LE ROSE PERFECTO</p>
                        <p class="banner-des">玫瑰果</p>
                    </div>
                </div>

                <div class="banner-pic-three table" data-goodsID="50" v-show="banner3">
                    <div class="banner-list">
                        <p class="banner-title">BLANC DIVIN</p>
                        <p class="banner-des">实现理想的美好</p>
                    </div>
                </div>
                <div class="banner-pic-four table" data-goodsID="54" v-show="banner4">
                    <div class="banner-list">
                        <p class="banner-title">LIVEIRRÉSISTIBLERUSYCRUSH</p>
                        <p class="banner-des">新的开始</p>
                    </div>
                </div>

                <div class="banner-button-box">
                    <div class="banner-button fl" data-goodsID="57" @click="banner(1)"></div>
                    <div class="banner-button fr " data-goodsID="52"  @click="banner(2)"></div>
                    <div class="banner-button fl mg" data-goodsID="50"  @click="banner(3)"></div>
                    <div class="banner-button fr mg" data-goodsID="54"  @click="banner(4)"></div>
                </div>
            </div>
            <div class="introduction">
                <h1>纪梵希美妆</h1>
                <p>经典。大胆。两者之间的一切。使用动态颜色和纹<br>
                    理来确定您的风格。
                </p>
            </div>
            <div class="prefume">
                <div class="title-other">
                    女士芳香
                </div>

                <div class="goods" data-goodstype=9>
                    <div class="goods-module"  v-for="(good,index) in prefume" :key="index">
                        <div class="goods-pic" data-goodsID="${ele.goods_id}"><router-link :to="{name:'detail',query:{goodsId:good.goodsId}}"><img :src="url+good.picUrl" alt=""></router-link></div>
                        <h3>{{good.goodsName}}</h3>
                        <p class="goods-price">{{good.goodsPrice}}</p>
                    </div>
                </div>
            </div>
            <div class="prefume">
                <div class="title-other">
                    男士香水
                </div>

                <div class="goods" data-goodstype=8>
                    <div class="goods-module"  v-for="(good,index) in prefumeMan" :key="index">
                        <div class="goods-pic" data-goodsID="${ele.goods_id}"><router-link :to="{name:'detail',query:{goodsId:good.goodsId}}"><img :src="url+good.picUrl" alt=""></router-link></div>
                        <h3>{{good.goodsName}}</h3>
                        <p class="goods-price">{{good.goodsPrice}}</p>
                    </div>
                </div>
            </div>
            <div class="lip">
                <div class="title">
                    唇部
                </div>

                <div class="goods " data-goodstype=6>
                    <div class="goods-module"  v-for="(good,index) in lip" :key="index">
                        <div class="goods-pic" data-goodsID="${ele.goods_id}"><router-link :to="{name:'detail',query:{goodsId:good.goodsId}}"><img :src="url+good.picUrl" alt=""></router-link></div>
                        <h3>{{good.goodsName}}</h3>
                        <p class="goods-price">{{good.goodsPrice}}</p>
                    </div>
                </div>
            </div>
            <div class="eye">
                <div class="title">
                    眼部
                </div>
                <div class="goods " data-goodstype=11>
                    <div class="goods-module"  v-for="(good,index) in eye" :key="index">
                        <div class="goods-pic" data-goodsID="${ele.goods_id}"><router-link :to="{name:'detail',query:{goodsId:good.goodsId}}"><img :src="url+good.picUrl" alt=""></router-link></div>
                        <h3>{{good.goodsName}}</h3>
                        <p class="goods-price">{{good.goodsPrice}}</p>
                    </div>
                </div>
                <div class="more" v-if="eye.length>=6">
                    查看更多
                </div>
            </div>
            <div class="foundation">
                <div class="title">
                    底妆
                </div>

                <div class="goods data-goodstype=12" data-goodstype=12>
                    <div class="goods-module"  v-for="(good,index) in foundation" :key="index">
                        <div class="goods-pic" data-goodsID="${ele.goods_id}"><router-link :to="{name:'detail',query:{goodsId:good.goodsId}}"><img :src="url+good.picUrl" alt=""></router-link></div>
                        <h3>{{good.goodsName}}</h3>
                        <p class="goods-price">{{good.goodsPrice}}</p>
                    </div>
                </div>
            </div>
            <div class="pencil">
                <div class="title">
                    眉毛
                </div>
                <div class="goods" data-goodstype=10>
                    <div class="goods-module"  v-for="(good,index) in pencil" :key="index">
                        <div class="goods-pic" ><router-link :to="{name:'detail',query:{goodsId:good.goodsId}}"><img :src="url+good.picUrl" alt=""></router-link></div>
                        <h3>{{good.goodsName}}</h3>
                        <p class="goods-price">{{good.goodsPrice}}</p>
                    </div>
                </div>
            </div>
            <div class="tool">
                <div class="title-other ">
                    美妆工具
                </div>
                <div class="goods" data-goodstype=5>
                    <div class="goods-module"  v-for="(good,index) in tool" :key="index">
                        <div class="goods-pic" ><router-link :to="{name:'detail',query:{goodsId:good.goodsId}}"><img :src="url+good.picUrl" alt=""></router-link></div>
                        <h3>{{good.goodsName}}</h3>
                        <p class="goods-price">{{good.goodsPrice}}</p>
                    </div>
                </div>
            </div>
        </div>
        <Foot></Foot>
    </div>
</template>
<style scoped>
    @import "../assets/css/givenchy.css";
</style>
<script>
    import Head from"../components/head.vue";
    import Foot from "../components/foot.vue";
    export default{
        name: 'givenchy',
        data(){
            return{
                banner1:true,
                banner2:false,
                banner3:false,
                banner4:false,
                prefume:[],
                prefumeMan:'',
                lip:'',
                eye:'',
                foundation:'',
                pencil:'',
                tool:'',
                url:''

            }
        },
        components:{
            Head,
            Foot
        },
        created(){
            this.url=localStorage.getItem('URL')
            this.getGoods(2,9);
            this.getGoods(2,6);
            this.getGoods(2,8);
            this.getGoods(2,11);
            this.getGoods(2,10);
            this.getGoods(2,12);
            this.getGoods(2,5)

        },
        methods:{
            banner(index){
                this.banner1=false;
                this.banner2=false;
                this.banner3=false;
                this.banner4=false;
                this['banner'+index]=true;

            },
            getGoods(brandId,goodstypeId){
                this.$http.get('/goods/gettypegoodsGi.do',{
                    params:{
                        goodsTypeId: goodstypeId,   // 商品分类id
                        brandId: brandId,     // 品牌id

                    }
                })
                    .then( (res) =>{
                        console.log('纪梵希',res);
                        console.log(goodstypeId);
                        if(goodstypeId==9){
                            this.prefume=res.data.data;
                            console.log(res.data.data);
                            console.log( this.prefume);
                        }
                        if(goodstypeId==8){
                            this.prefumeMan=res.data.data
                            console.log(res.data.data);
                        }
                        if(goodstypeId==6){
                            this.lip=res.data.data
                            console.log(res.data.data);
                        }
                        if(goodstypeId==11){
                            this.eye=res.data.data
                            console.log(res.data.data);
                        }

                        if(goodstypeId==12){
                            this.foundation=res.data.data
                            console.log(res.data.data);
                        }
                        if(goodstypeId==10){
                            this.pencil=res.data.data
                            console.log(res.data.data);
                        }
                        if(goodstypeId==5){
                            this.tool=res.data.data
                            console.log(res.data.data);
                        }
                    })
                    .catch( (err) =>{
                            console.log(err);
                        }

                    )

            },
        }

    }
</script>