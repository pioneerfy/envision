<template>
    <div id="search-show">
        <div class="search-moudl" v-for="(item,index) in displayResult" :key="index">
            <router-link tag="a" :to="{name:'detail',query:{goodsId:item.goods_id}}">
                <div class="goods-pic"><img :src="url+item.pic_url" alt="" draggable="false"></div>
                <h3 class="goods-name">{{item.goods_name}}</h3>
                <p class="goods-price">￥{{item.goods_price}}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'searchItem',
    props: ['displayResult'],
    data() {
        return {
            url: ''
        }
    },
    created() {
        this.url = localStorage.getItem('URL')
    }
}
</script>

<style>

</style>
