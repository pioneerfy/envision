<template>
    <!--<div class="foot">-->

        <div class="sbody">
            <div class="content footContent">
                <div class="wrap">
                    <h1>我的足迹</h1>
                    <div class="form">
                        <div class="showDay">
                            <div class="orders-title" v-if="today.length!=0">
                                <div>今天.</div>
                            </div>
                            <div class="show">
                                <div class="goods-module" v-for="(goods,index) in today " :key="index">
                                    <div class="goods-pic "><img :src="url+goods.picUrl" alt=""></div>
                                    <h3>{{goods.goodsName}}</h3>
                                    <p class="goods-price">￥{{goods.goodsPrice.toFixed(2)}}</p>
                            </div>
                            </div>
                        </div>
                        <div class="showWeek">
                            <div class="orders-title"  v-if="week.length!=0">
                                <div>一周内</div>
                            </div>
                            <div class="show">
                                <div class="goods-module" v-for="(goods,index) in week " :key="index">
                                    <div class="goods-pic "><img :src="url+goods.picUrl" alt=""></div>
                                    <h3>{{goods.goodsName}}</h3>
                                    <p class="goods-price">￥{{goods.goodsPrice.toFixed(2)}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="showMore">
                            <div class="orders-title"   v-if="more.length!=0">
                                <div>更早</div>
                            </div>
                            <div class="show">
                                <div class="goods-module" v-for="(goods,index) in more " :key="index">
                                    <div class="goods-pic "><img :src="url+goods.picUrl" alt=""></div>
                                    <h3>{{goods.goodsName}}</h3>
                                    <p class="goods-price">￥{{goods.goodsPrice.toFixed(2)}}</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="today.length==0&&week.length==0&&more.length==0">
                            <div class="err">暂无浏览足迹</div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    <!--</div>-->

</template>
<style scoped>
    @import "../assets/css/foot.css";
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
                uid:1,
                today:[],
                week:[],
                more:[],
                url:'',
            }
        },
        created() {
            let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
            this.$http.get('/user/foot.do',{
                params:{
                    uuid:uuid
                }
            })
                .then((res)=>{
                    console.log('足迹',res)
                    this.url=localStorage.getItem('URL')
                    console.log('浏览足迹',res.data.data);
                    for(let i=0;i<res.data.data.length;i++)
                    {
                       let time=res.data.data[i].footTime;
                        let timeT=new Date(time).getTime();
                        let newtime=new Date().getTime();
                        if(newtime-timeT<=86400000){
                            this.today.push(res.data.data[i]);
                            console.log(this.today);
                        }
                        if(86400000<newtime-timeT && newtime-timeT<604800000){
                            this.week.push(res.data.data[i]);
                            console.log(this.week);
                        }
                        if(newtime-timeT>604800000 && newtime-timeT<25920000000){
                            this.more.push(res.data.data[i]);
                            console.log(this.more);
                        }
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        },

    }
</script>