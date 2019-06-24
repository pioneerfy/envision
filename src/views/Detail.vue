<template>
    <div>
        <!-- 头部 -->
        <Head/>
        <!-- 图片展示 -->
        <GoodsShow v-if="goodsId" :goodsId="goodsId" :uuid="uuid"/>
        <!-- 商品详情及评价 -->
        <InfoShow :goodsId="goodsId" :uuid="uuid"/>
        <Foot />
    </div>
</template>

<script>
    import Head from '@/components/head.vue'
    import GoodsShow from '@/components/goodsInfo/goodsShow.vue'
    import InfoShow from '@/components/goodsInfo/infoShow.vue'
    import Foot from '@/components/foot.vue'
    export default {
        name: "detail",
        components: {
            Head,
            GoodsShow,
            InfoShow,
            Foot
        },
        data() {
            return {
                uuid: '',
                goodsId: this.$route.query.goodsId,
                // goodsId: 1,
                goodstype_id: 6,
                /*goods: [
                    {
                        goods_id: '4',
                        goods_name: 'Dior迪奥全新惊艳单色眼影',
                        goods_descript: '“红色是一种宣言，是存在的证明，是女性气质充满张力的演绎。”圣罗兰纯口红，真正为优雅美丽高级定制的口红！融合纯正色彩、耀眼光泽和滋润质地于一身，赋予双唇丝缎般细腻与浓郁的色泽质感。金色方管高定设计，如珠宝般纯粹高贵。无论是身穿优雅晚装或时尚便服，圣罗兰纯口红都能搭配不同形象，成为隐藏于手袋内的一个美妆法宝。',
                        pic_url: require('../assets/images/goodsimg/Dior-eye-004-1.jpg'),  //商品图片
                        stock_number: '101',
                        stock_id: '16',
                        goodstype_id: '6',
                        attr_value: '#E05C47',
                        goods_isIntegral: 1,
                        goods_price: '500',
                        fav_nums: 2,
                        attr_num: '#014',
                        goods_isDel: 0
                    },
                    {
                        goods_id: '4',
                        goods_name: 'Dior迪奥全新惊艳单色眼影',
                        goods_descript: '“红色是一种宣言，是存在的证明，是女性气质充满张力的演绎。”<br>圣罗兰纯口红，真正为优雅美丽高级定制的口红！融合纯正色彩、耀眼光泽和滋润质地于一身，赋予双唇丝缎般细腻与浓郁的色泽质感。<br>金色方管高定设计，如珠宝般纯粹高贵。无论是身穿优雅晚装或时尚便服，圣罗兰纯口红都能搭配不同形象，成为隐藏于手袋内的一个美妆法宝。',
                        pic_url: require('../assets/images/goodsimg/Dior-eye-004-2.jpg'),  //商品图片
                        stock_number: '121',
                        stock_id: '17',
                        goodstype_id: '6',
                        attr_value: '#7A7C7B',
                        goods_isIntegral: 1,
                        goods_price: '500',
                        fav_nums: 2,
                        attr_num: '#012',
                        goods_isDel: 0
                    },
                ],
                comments: [
                    {
                        user_name: '*匿名*',
                        user_head: require('../assets/images/headimg/head.jpg'),
                        attr_num: '#012',
                        star: 3.6,
                        pic_url: require('../assets/images/goodsimg/Dior-eye-004-1.jpg'),  //商品图片
                        create_at: '2019-03-12',
                        comment_text: '非常好',
                        replyComTime: '2019-01-01',
                        replyComText:'哈哈哈哈哈'
                    },
                    {
                        user_name: '*匿名*',
                        user_head: require('../assets/images/headimg/head1.jpg'),
                        attr_num: '#014',
                        star: 4.7,
                        pic_url: require('../assets/images/goodsimg/Dior-eye-004-1.jpg'),  //商品图片
                        create_at: '2019-03-16',
                        comment_text: '非常好哈哈哈哈哈',
                        replyComTime: '2019-01-01',
                        replyComText:'哈哈哈哈哈'
                    },
                ]*/
            }
        },
        created() {
            this.uuid=JSON.parse(localStorage.getItem('userinfo'))
            if (this.uuid){
                this.uuid=this.uuid.uuid;

                let data=this.$qs.stringify({uuid: this.uuid,goodsId: this.goodsId});
                // 添加足迹  5秒后
                this.timerFoot=setTimeout(function () {
                    this.$http.post('user/userfoot.do',data).then((res)=>{
                        console.log('增加足迹',res);
                        if (res.data.returncode==='200'){
                            console.log('足迹添加成功')
                        } else {
                            console.log('足迹添加失败')
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.$message({
                            message: '足迹添加请求失败',
                            type: 'error',
                            duration: 1000
                        });
                    })
                }.bind(this),5000)
            }else {
                this.uuid=''
            }
        },
        computed: {

        },
        methods: {
        },
        beforeDestroy() {
            clearTimeout(this.timerFoot);
        }
    }
</script>

<style scoped>
    @import '../assets/fonts/fonts-d/iconfont.css';
    /*@import '../assets/css/getGoodsInfo.css';*/

</style>