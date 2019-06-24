<template>
    <!--帮助解决问题+客户+问题-->
    <div class="container content-wrap">
        <div class="p container"><span>首页</span>&gt;<span>帮助中心</span>&gt;<span>常见问题</span></div>
        <div class="container-fluid content">
            <!--解决问题-->
            <div class="col-sm-9 col-xs-12 solve">
                <h2>我们如何帮助<br>您？</h2>
                <div class="solve-order" v-for="(item,i) in datas" :key="i">
                    <p class="p1">{{item.til}}<span class="toggle" @click="change(i)">{{item.toggle}}</span></p>
                    <p class="p2" v-show="item.state==true">{{item.txt}}</p>
                </div>
            </div>
            <!--客户中心+常见问题-->
            <div class="col-sm-3 serve-issue">
                <!--&lt;!&ndash;客户中心-->
                <div class="col-xs-12 serve">
                    <p>客服中心</p>
                    <p>如有任何问题，请联系我们</p>
                    <p>400-820-8888</p>
                    <p>400-820-9898</p>
                </div>
                <!--常见问题-->
                <div class="col-xs-12 issue">
                    <p>常见问题</p>
                    <p><span class="do-order" @click="change(0)">如何下订单？</span></p>
                    <p><span class="do-send" @click="change(1)">如何查询订单配送状态？</span></p>
                    <p><span class="send-way" @click="change(2)">有哪些配送方式</span></p>
                    <p><span class="select-all" @click="change(10)">查看所有</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export  default {
        name:'help',
        data(){
            return{
                datas:[
                    {
                        til:'如何下订单?',
                        txt:'找到想要购买的产品，请点击”立即购买“。 您的订单内容会在窗口中显示，选择您需要的产品数量然后点击“立即购买”。如果您的购物车中已经有几件产品，您可以点击“查看订单”了解订单详情。 大部分产品都可以直接通过网上购买，一些在网上无法购买的产品，您可以选择去各品牌最近的柜台购买。'
                        ,state: false,
                        toggle:'+'
                    },
                    {
                        til:'如何查询订单配送状态？',
                        txt:'如果您想查询订单处理情况，请登录您的账号，然后点击订单管理。查看订单管理“订单状态说明”中的具体情况。'
                        ,state: false,
                        toggle:'+'
                    },
                    {
                        til:'有哪些配送方式？',
                        txt:'主要有：顺丰快递、申通快递、韵达快递、圆通快递等，大件物流的话还有德邦物流、优速物流、邮政包裹等等。我们公司跟菜鸟裹裹和蜂巢有合作，为不方便收快递的人提供快递代收服务。'
                        ,state: false,
                        toggle:'+'
                    },
                    {
                        til:'有哪些付款方式？',
                        txt:'主要有支付宝、余额宝、中国工商银行储蓄卡、中国建设银行储蓄卡等我们还支持花呗分期付款。'
                        ,state: false,
                        toggle:'+'
                    },
                    {
                        til:'签收商品时需要注意哪些问题？',
                        txt:'送货上门、货到付款订单：快递员送货上门时，请您务必当面对照发货单核对商品，如果出现商品数量缺少、商品破损，请您当场办理整单商品的退货。若订单中含有赠品，请一并退回。一旦您确认签字，我们将无法为您办理退换或补发。'
                        ,state: false,
                        toggle:'+'
                    },
                    {
                        til:'有哪些配送方式？',
                        txt:'找到想要购买的产品，请点击”立即购买“。 您的订单内容会在窗口中显示，选择您需要的产品数量然后点击“立即购买”。如果您的购物车中已经有几件产品，您可以点击“查看订单”了解订单详情。 大部分产品都可以直接通过网上购买，一些在网上无法购买的产品，您可以选择去各品牌最近的柜台购买。'
                        ,state: false,
                        toggle:'+'
                    },
                ],
            }
        },
        methods: {
            //点击切换问题解决状态
            change(index) {
                console.log(index)

                    for (let i = 0; i < this.datas.length; i++) {
                        if (index != i) {
                            this.datas[i].state = false;
                            this.datas[i].toggle = '+'
                        }
                    }
                    this.datas[index].state = !this.datas[index].state
                    console.log(this.datas[index].state)
                    if (this.datas[index].state === true) {
                        return this.datas[index].toggle = '-'
                    } else {
                        return this.datas[index].toggle = '+'
                    }

            }


        }

    }
</script>
<style scoped>
@import "../assets/css/help.css";

</style>