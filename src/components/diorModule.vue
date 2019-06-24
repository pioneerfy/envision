<template>
    <section class="perfume">
        <div class="perfume-wrap">
            <h2 class="h2">{{item.title}}</h2>
            <p>{{item.titleDes}}</p>
            <div class="shows clear">
            <!-- goods -->
                <slot></slot>
            </div>
            <div>
                <button class="read-more" id="perfume-more" :data-current="item.currentPage" @click="readMore">
                    <span>探索更多</span>
                    <br>
                    <span class="iconfont icon-gui_shuangjiantou"></span>
                </button>
            </div>
        </div>
    </section> 
</template>

<script>
export default {
    name:"diorModule",
    props: ['item','type'],
    methods: {
        readMore() {
            const route = {
                   name: 'search',
                   query: {typeId:this.item.goodsType,brandId: 1},
               };
            this.$router.push(route) 
        }
    },
}
</script>
