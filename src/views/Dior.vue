<template>
    <div id="dior">
        <Head />

        <Banner :brandId="brandId" />
        <!-- 分割图 -->
        <section class="synopsis-wrap">
            <div class="synopsis">
            <img src="..\assets\images\dior\timgg.jpg" alt="">
            </div>
        </section>
        <!-- 香氛 -->
        <DiorModule :item="list.perfume" :type="list.perfume.goodsType" >
                <Goods :goodsTypeId="list.perfume.goodsType" />
        </DiorModule>
        <!-- 口红 -->
        <DiorModule :item="list.lip" :type="list.lip.goodsType" >
            <Goods :goodsTypeId="list.lip.goodsType" />
        </DiorModule>
        <!-- 眼影 -->
        <DiorModule :item="list.eye" :type="list.eye.goodsType" >
            <Goods :goodsTypeId="list.eye.goodsType" />
        </DiorModule>
        <!-- 眉笔 -->
        <DiorModule :item="list.pencil" :type="list.pencil.goodsType" >
            <Goods :goodsTypeId="list.pencil.goodsType" />
        </DiorModule>
        <!-- 粉底 -->
        <DiorModule :item="list.foundation" :type="list.foundation.goodsType" >
            <Goods :goodsTypeId="list.foundation.goodsType" />
        </DiorModule>
        <Foot></Foot>
    </div>
</template>

<script>
    import Head from '../components/head.vue'
    import Foot from '../components/foot.vue'
    import DiorModule from '../components/diorModule.vue'
    import Banner from '../components/banner.vue'
    import Goods from '../components/dGoods.vue'
    export default {
        name: 'dior',
        data() {
            return {
                list: {
                    perfume: {
                        name: 'perfume',
                        title: 'Dior香氛',
                        titleDes: '一段迷人而清新的花园圆舞',
                        currentPage: 1,
                        goodsType: 9
                    },
                    lip: {
                        name: 'lip',
                        title: 'Dior口红',
                        titleDes: '从标志性杰作到最新作品，探索Dior迪奥演绎的妩媚魅力',
                        currentPage: 1,
                        goodsType: 7
                    },
                    eye: {
                        title: 'Dior眼影',
                        titleDes: '将秋日色彩映上眼眸，从哑光感到金属感，重现经典魅力',
                        currentPage: 1,
                        goodsType: 11
                    },
                    pencil: {
                        title: 'Dior眉笔',
                        titleDes: 'Dior迪奥后台臻效修颜笔，遮瑕、修颜、提亮，一“笔”完成',
                        currentPage: 1,
                        goodsType: 10
                    },
                    foundation: {
                        title: 'Dior粉底',
                        titleDes: '一段迷人而清新的花园圆舞',
                        currentPage: 1,
                        goodsType: 12
                    },

                },
                brandId: 1,
            }
        },
        methods: {

        },
        components: {
            Head,
            Foot,
            Banner,
            DiorModule,
            Goods,
        },
        watch: {

            
        },
        created() {
            // this.getBanner()
        }
    }
</script>

<style scoped>
    @import '../assets/css/dior.css';
</style>
