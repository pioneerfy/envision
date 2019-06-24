<template>
    <div class="pointGoods">
        <div class="title">
            积分商城
        </div>
        <div class="exchange">
            <div class="goods-module"  v-for="(goods,index) in pointGoods " :key="index" >
                <div class="goods-pic" ><img :src="url+goods.picUrl" alt=""></div>
                <h3>{{goods.goodsName}}</h3>
                <p class="goods-price">{{goods.goodsPoint*20}}积分</p>
                <div class="btn" @click="$router.push({name:'detail',query:{goodsId:goods.goodsId}})">立即兑换</div>
            </div>
        </div>
    </div>


</template>
<script>
    export default{
        name:'pointGoods',
        data(){
            return{
                pointGoods:[],
                url:''
            }
        },
        created(){
            this.url=localStorage.getItem('URL')

        this.$http.get('/goods/pointgoods.do'
        )
            .then((res)=>{
                // sessionStorage.setItem('pointgoods', JSON.stringify(res.data));
                console.log('积分',res)
                this.pointGoods=res.data.data;
            })
            .catch((err)=>{
                return console.log(err);
            })
        },
        methods:{

        }



    }
</script>