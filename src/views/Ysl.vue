<template>
    <div>
        <!-- this.$route.params.name -->
        <Head/>
        <Banner :brandId="brandId"/>
        <YslContent :brandId="brandId" @getMore="getMore"/>
        <Foot/>
    </div>
</template>

<script>
    import Head from '@/components/head.vue'
    import Banner from '@/components/ysl/banner.vue'
    import YslContent from '@/components/ysl/yslContent.vue'
    import Foot from '@/components/foot.vue'

    export default {
        name: "Ysl",
        components: {
            Head,
            Banner,
            YslContent,
            Foot
        },
        created() {
        },
        data() {
            return {
                brandId: 3
            }
        },
        methods: {
            getMore(brandId,goodstype_id) {
                console.log('查看更多',goodstype_id);
                this.$router.push({name: 'search'});
            }
        },
    }
</script>

<style>
    @import '../assets/fonts/fonts-d/iconfont.css';
    /*@import '../assets/css/ysl.css';*/
    .clear::before,
    .clear::after{
        display: table;
        content: '';
    }
    .clear::after{
        clear: both;
    }
</style>