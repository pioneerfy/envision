<template>
    <div class="ysl-content">
        <!-- 品牌系列 -->
        <div class="type">
            <!-- 口红 -->
            <div id="lip" v-if="goodsInfo.lips">
                <h2>口红系列</h2>
                <TypeContent :goodsInfo="goodsInfo.lips"/>
                <p class="more p-more" @click="getMore(goodsInfo.lips[0].goodstype_id)">+查看更多</p>
            </div>
            <!-- 粉底 -->
            <div id="foundation" v-if="goodsInfo.foundation">
                <h2>粉底系列</h2>
                <TypeContent :goodsInfo="goodsInfo.foundation"/>
                <p class="more p-more" @click="getMore(goodsInfo.foundation[0].goodstype_id)">+查看更多</p>
            </div>
            <!-- 眼影 -->
            <div id="eye" v-if="goodsInfo.eyes">
                <h2>眼影系列</h2>
                <TypeContent :goodsInfo="goodsInfo.eyes"/>
                <p class="more p-more" @click="getMore(goodsInfo.eyes[0].goodstype_id)">+查看更多</p>
            </div>
            <!-- 香水 -->
            <div id="perfume" v-if="goodsInfo.perfume">
                <h2>香水系列</h2>
                <TypeContent :goodsInfo="goodsInfo.perfume"/>
                <p class="more p-more" @click="getMore(goodsInfo.perfume[0].goodstype_id)">+查看更多</p>
            </div>
            <!-- 美容工具 -->
            <div id="tool" v-if="goodsInfo.tools">
                <h2>美容工具</h2>
                <TypeContent :goodsInfo="goodsInfo.tools"/>
                <p class="more p-more" @click="getMore(goodsInfo.tools[0].goodstype_id)">+查看更多</p>
            </div>
        </div>
    </div>
</template>

<script>
    import TypeContent from './typeContent'
    export default {
        name: "YslContent",
        props:['brandId'],
        components: {
            TypeContent,
        },
        data() {
            return {
                goodsInfo: {
                    lips: '',
                    foundation: '',
                    eyes: '',
                    perfume: '',
                    tools: ''
                }
            }
        },
        methods:{
            // 获取ysl
            getGoods(goodsTypePid) {
                let data = {brandId: this.brandId,goodsTypePid: goodsTypePid,current: 1,size: 4};
                return new Promise((resolve) => {
                    this.$http.get('/goods/dior.do', {params:
                        data}).then((res) => {
                        resolve(res.data.data[1])
                    })
                    .catch(err => {
                        console.log('获取ysl商品请求失败', err);
                        this.$message({
                            message: '获取ysl商品请求失败',
                            type: 'error',
                            duration: 1000
                        });
                    });
                })
            },
            getMore(goodstype_id) {
                this.$emit('getMore',this.brandId,goodstype_id);
            }
        },
        created() {
            let p=this.getGoods;
            Promise.all([p(1),p(4),p(3),p(2),p(5)]).then(res=>{
            this.goodsInfo.lips=res[0];
            this.goodsInfo.foundation=res[1];
            this.goodsInfo.eyes=res[2];
            this.goodsInfo.perfume=res[3];
            this.goodsInfo.tools=res[4];
            });
        }
    }
</script>

<style scoped>
    h2{
        text-align: center;
        font-weight: bold;
        color: #666666;
        font-size: 18px;
        padding-bottom: 15px;
    }
    .more{
        padding: 0 10px;
        text-align: right;
        cursor: pointer;
        transition: all linear;
        color: #666666;
    }
    .p-more{
        position: absolute;
        bottom: 5px;
        right: 0;
    }
    .more:hover{
        color: #333333;
    }
    .ysl-content .type{
        width: 1170px;
        margin: 0 auto;
        padding: 15px;
    }
    #lip,#perfume,#foundation,#tool,#eye{
        position: relative;
    }
    #lip,#foundation,#eye,#perfume,#tool{
        margin-bottom: 20px;
    }
    body{
        position: relative;
    }
</style>