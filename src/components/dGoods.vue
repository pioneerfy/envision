<template>
    <div class="shows-row clear">
        <div class="goods-module fl" v-for="(goods,index) in goods" :key="index">
            <router-link tag="a" :to="{name:'detail',query:{goodsId:goods.goodsId}}">
                <div class="goods-pic"><img :src="url+goods.pic_url" alt=""></div>
                <h3 class="h3">{{goods.goods_name}}</h3>
                <p class="d-goods-price">￥{{goods.goods_price}}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import { URL } from 'url';
export default {
    name: 'goodsRow',
    props: ['goodsTypeId'],
    data() {
        return {
            url: '',
            goods: []
        }
    },
    methods: {
        getGoods(currentPage,pageSize,brandId,goodstypeId) {              
            this.$http.get('/goods/dior.do',{
                params: {
                    goodsTypeId: goodstypeId,
                    brandId: brandId,
                    current: currentPage,
                    size: pageSize
                }
            })
            .then((res) => {
                this.goods = res.data.data[1]
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.url = localStorage.getItem('URL')
        this.getGoods(1,4,1,this.goodsTypeId)
    }
}
</script>

<style scoped>
a {
    color: #444;
}
</style>
