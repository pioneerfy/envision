<template>
    <div>
        <Head></Head>
        <main class="main">
            <div class="cart-top" v-if="shopdata.length!==0">
                <div class="cart-step">
                    <div class="step-icon"><span class="iconfont icon-diyibu"></span></div>
                    <h2 class="step-word">我的购物车</h2>
                    <div class="step-line step-line1"></div>
                </div>
                <div class="cart-step">
                    <div class="step-icon"><span class="iconfont icon-dierbu"></span></div>
                    <h2 class="step-word">确认并提交订单</h2>
                    <div class="step-line step-line2"></div>
                </div>
                <div class="cart-step">
                    <div class="step-icon"><span class="iconfont icon-disanbu"></span></div>
                    <h2 class="step-word">支付</h2>
                    <div class="step-line step-line3"></div>
                </div>
            </div>

            <p class="continue"><router-link to="/">继续购物<span class="iconfont icon-lunbo"></span></router-link></p>
            <!--商品标题和列表-->
            <div class="cart-info">
                <!--购物车为空的时候-->
                <div class="cart-null" v-if="shopdata.length===0">
                    <div class="cartnull-icon"><span class="iconfont icon-gouwuche1"></span></div>
                    <p class="cartnull-p">您的购物车还是空的喔!</p>
                    <p>您可以<router-link to="/fav" class="tofav">查看收藏夹<span class="iconfont icon-lunbo"></span></router-link> <router-link to="/">随便看看<span class="iconfont icon-lunbo"></span></router-link></p>
                </div>

                <!--购物车不为空的时候-->
                <div v-if="shopdata.length!==0">
                    <!--购物车的头部-->
                    <ul class="cart-title">
                        <li><span class="check-span fl check-all" :class="{'check-true':isSelectAll}" @click="selectProduct(isSelectAll);changeBtnState()"></span>全选</li>
                        <li>商品信息</li>
                        <li>单价</li>
                        <li>数量</li>
                        <li>金额</li>
                        <li>操作</li>
                    </ul>
                    <!--购物车中的商品-->
                    <ul class="cart-goods" v-for="(item,index) in shopdata" :key="index">
                        <li><span class="check-span" @click="item.select=!item.select;changeBtnState()" :class="{'check-true':item.select}"></span></li>
                        <li>
                            <div class="g-img">
                                <img :src="url+item.pic_url" alt="">
                            </div>
                            <div class="g-info">
                                <p class="g-name">{{item.goods_name}}</p>
                                <p class="g-attr">{{item.attr_name}}：{{item.attr_value}}</p>
                            </div>
                        </li>
                        <li><span class="g-price">{{Number(item.goods_price).toFixed(2)}}</span></li>
                        <li>
                             <span class="clear nums-wrap" data-index="${ele.cart_id}">
                                <input type="button" value="-" class="reduce" @click="reducenums(item,item.attr_id)">
                                <input type="text" class="goods-nums" v-model="item.cart_number" @keyup="changeNums(item.attr_id,item.cart_number)">
                                <input type="button" value="+" class="add" @click="addnums(item,item.attr_id)">
                            </span>
                        </li>
                        <li>
                            <span class="total-price" >{{(item.goods_price*Number(item.cart_number)).toFixed(2)}}</span>
                        </li>
                        <li>
                            <div class="g-ctrl">
                                <p><a href="javascript:;" class="g-del" @click="delCart(item.cart_id,item.attr_id)">删除</a></p>
                                <p><a href="javascript:;" class="g-fav" @click="addfav(item.goods_id)">移入收藏夹</a></p>
                            </div>
                        </li>
                    </ul>

                    <!--购物车的bar-->
                    <div class="cart-bar">
                        <div class="cartbar-left">
                            <span><span class="check-span fl check-all check-all-bottom" :class="{'check-true':isSelectAll}" @click="selectProduct(isSelectAll);changeBtnState()"></span>全选</span>
                            <a href="javascript:;" class="cart-del" @click="delAll">删除</a>
                        </div>
                        <div class="cartbar-center">
                            <span class="carts-nums">已选商品 <span class="cnums-value">{{getTotal.totalNum}}</span>件</span>
                        </div>
                        <div class="cartbar-right">
                            <span>合计(不含运费): <span class="c-price">{{getTotal.totalPrice}}</span></span>
                            <button id="settle-btn" type="button" :class="{'settlebtn-active':!btnState}" :disabled="btnState"   @click="settle()" >结算</button>
                        </div>
                    </div>
                </div>
            </div>

            <!--为你推荐-->
            <Recommend></Recommend>

        </main>
        <foot></foot>
    </div>

</template>

<script>
    import Head from '@/components/head.vue'
    import Foot from '@/components/foot.vue'
    import Recommend from '@/components/recommend.vue'
    import  qs  from 'qs'
    export default {
        name: "shoppingCart",
        components: {
            Head,Foot,Recommend
        },
        data(){
            return{
                shopdata:'',
                reduce:'',
                btnState:'true',
                cartid:'',
                url:''
            }
        },
        computed:{
            //检测是否全选
            isSelectAll() {
                let _this = this
                if (_this.shopdata){
                    //如果shopdata中每一条数据的select都为true，返回true，否则返回false;
                    return _this.shopdata.every(function (val) { return val.select});
                }
            },
            //获取总价和产品总件数
            getTotal() {
                if (this.shopdata){
                    //获取productList中select为true的数据。
                    let _proList = this.shopdata.filter(function (val) { return val.select}),
                        totalPrice=0;
                    for(var i = 0,len = _proList.length; i < len; i++) {
                        (function (i) {
                        //总价累加
                        totalPrice += _proList[i].cart_number * _proList[i].goods_price;
                        })(i);
                    }
                    //选择产品的件数就是_proList.length，总价就是totalPrice
                    return {totalNum:_proList.length,totalPrice:totalPrice}

                }else{
                    //选择产品的件数就是_proList.length，总价就是totalPrice
                    return {totalNum:0,totalPrice:0}
                }
            }
        },
        methods:{
            //获取购物车的商品数据
            getCart(){
                this.$http.get('/order/getCart.do',{
                    params:{
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                        // uuid:'03500238841f40a9844eec941f84e0f5'
                    }
                })
                    .then((res)=>{
                        console.log(res);
                        if (res.data.returncode ==='200'){
                            this.shopdata=res.data.data
                            console.log(this.shopdata);
                            //为所有的数据添加select（是否选中）字段,初始值为false
                            let _this = this;
                            this.shopdata.map(function (item) {
                                _this.$set(item,'select',false)
                            })
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            //改变数量的请求
            changeNums(id,number){
                console.log(id);
                console.log(number);
                console.log(JSON.parse(localStorage.getItem('userinfo')).uuid);
                this.$http.post('/user/addCar.do',qs.stringify({
                    uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                    attrId:id,
                    number:number,
                    // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                }))
                    .then((res)=>{
                        console.log(res);
                        if(res.data.returncode ==='200'){
                            //改变请求成功
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            //减少数量
            reducenums(item,id){
                if (item.cart_number<=1){
                    item.cart_number =1;
                }else{
                    item.cart_number--;
                    this.changeNums(id,item.cart_number)
                }
            },
            //增加数量
            addnums(item,id){
                item.cart_number++;
                this.changeNums(id,item.cart_number)
            },
            // 全选与取消全选
            selectProduct: function(_isSelect) {
                //遍历shopdata，全部取反
                for (let i = 0, len = this.shopdata.length; i < len; i++) {
                    this.shopdata[i].select = !_isSelect;
                }
            },
            //删除购物车单个商品
            delCart(cartid,attrid){
                console.log('cartid',cartid);
                console.log('attrid',attrid);
                this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.post('/order/delCart.do',qs.stringify({
                            cartId:String(cartid),
                            attrId:String(attrid),
                            uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                            // uuid:'03500238841f40a9844eec941f84e0f5',
                        }))
                            .then((res)=>{
                                console.log('删除单个',res);
                                if (res.data.returncode ==='200') {
                                    //删除商品成功
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    //重新获取购物车
                                    this.getCart()
                                }
                            })
                            .catch((err)=>{
                                console.log(err);
                            })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            },
            //删除购物车全部商品
            delAll(){
                this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let cartid = [];
                    let attrid = [];
                    this.shopdata.filter(function (val) { return val.select}).map(function (item) {
                        cartid.push(item.cart_id);
                        attrid.push(item.attr_id);
                    })
                    console.log('cartid',cartid);
                    console.log('attrid',attrid);
                    this.$http.post('/order/delCart.do',
                        qs.stringify({
                            cartId: cartid.join(','),
                            attrId:attrid.join(','),
                            uuid:JSON.parse(localStorage.getItem('userinfo')).uuid
                            // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                        }))
                        .then((res)=>{
                            console.log('删除全部',res);
                            if (res.data.returncode ==='200'){
                                //删除购物车成功
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                //重新获取购物车
                                this.getCart()
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //判断按钮是否能点击
            changeBtnState(){
                let _this = this
                let data = _this.shopdata.some(function (val) {
                    return val.select
                })
                if (data){
                    _this.btnState =false
                } else{
                    _this.btnState =true
                }
            },
            success() {
                this.$message({
                    message: '收藏商品成功',
                    type: 'success'
                });
            },
            fail(){
                this.$message.error('商品已存在于收藏夹中');
            },
            //添加收藏
            addfav(id){
                this.$http.post('user/customerCollect.do',
                   qs.stringify( {
                       goodsId: id,
                       uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                       // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2'
                   }))
                    .then((res)=>{
                        console.log('添加收藏',res);
                        if (res.data.returncode ==='200'){
                            this.success()
                        }else{
                            this.fail()
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            //点击结算
            settle(){
                let cartid = [];
                let attrid= [];
                this.shopdata.filter(function (val) { return val.select}).map(function (item) {
                    cartid.push(item.cart_id);
                    attrid.push(item.attr_id)
                })
                //将cartid和attrid存入localStorage中
                localStorage.setItem('cartid',cartid.join(','));
                localStorage.setItem('attrid',attrid.join(','));
                //购物车跳转，不需要isPoint,先清空isPoint
                localStorage.removeItem('isPoint');
                //再跳转到订单界面
                this.$router.push({name:'order'})
            }
        },
        created() {
            this.getCart();
            this.url = localStorage.getItem('URL')
        }

    }
</script>

<style scoped>
    .router-link-active{
        font-weight: unset;
    }
    .cart-top{
        background-color: #fff;
        box-shadow: 0 3px 10px -3px #a8a8a8;
        height: auto;
        padding: 20px 0 20px 0;
        display: flex;
        justify-content: space-between;
    }
    .cart-step{
        width: 300px;
        height: auto;
        text-align: center;
    }
    .step-icon>.iconfont{
        font-size: 30px!important;
    }
    .step-word{
        margin: 10px auto;
    }
    .step-line{
        margin: 0 auto;
        width: 220px;
        height: 15px;
    }
    .step-line1{
        background: url("../assets/images/gwy/currentstep.png")no-repeat;
        background-size: 100% 100%;
    }
    .step-line2{
        background: url("../assets/images/gwy/nextstep.png")no-repeat;
        background-size: 100% 100%;
    }
    .step-line3{
        background: url("../assets/images/gwy/nextstep.png")no-repeat;
        background-size: 100% 100%;
    }
    .continue{
        margin: 20px 0;
    }
    .continue a{
        color: #1e89f6;
    }
    .continue .icon-lunbo{
        font-size: 14px;
    }

    .cart-title{
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin: 40px auto;
        display: flex;
        justify-content: space-around;
        border-bottom: 4px solid #000000;
    }
    .cart-title li{
        height: 100%;
        text-align: center;
    }
    .cart-title li:nth-of-type(1){
        width: 60px;
    }
    .cart-title li:nth-of-type(2){
        width: 480px;
    }
    .cart-title li:nth-of-type(3){
        width: 120px;
    }
    .cart-title li:nth-of-type(4){
        width: 120px;
    }
    .cart-title li:nth-of-type(5){
        width: 120px;
    }
    .cart-title li:nth-of-type(6){
        width: 140px;
    }
    .choiceall{
        width: 15px;
        height: 15px;
        vertical-align: middle;
        cursor: pointer;
        margin-right: 3px;
    }
    .cart-goods{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;
        background-color: #ffffff;
        box-shadow: 0 3px 10px -3px #a8a8a8;
    }
    .cart-goods li{
        height: auto;
        text-align: center;
        padding: 20px 0 20px 0;
    }
    .cart-goods li:nth-of-type(1){
        width: 60px;
    }
    .cart-goods li:nth-of-type(2){
        width: 480px;
    }
    .cart-goods li:nth-of-type(3){
        width: 120px;
    }
    .cart-goods li:nth-of-type(4){
        width: 120px;
    }
    .cart-goods li:nth-of-type(5){
        width: 120px;
    }
    .cart-goods li:nth-of-type(6){
        width: 140px;
    }
    .g-img{
        float: left;
        width: 94px;
        height: 94px;
        margin-right: 5px;
        overflow: hidden;
        border: 1px solid #c6c6c6;
    }
    .g-img img{
        width: 100%;
        height: 100%;
    }
    .g-info{
        height: 94px;
        display: flex;
        justify-content: space-between;
    }
    .g-name,.g-attr{
        width: 48%;
        height: 100%;
        text-align: left;
    }
    .g-attr{
        color: #9e9e9e;
        font-size: 14px;
    }
    .choice{
        width: 15px;
        height: 15px;
        cursor: pointer;
    }
    .g-price{
        font-weight: bolder;
    }
    .nums-wrap{
        display: inline-block;
    }
    .reduce,.add{
        float: left;
        width: 19px;
        height: 25px;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .goods-nums{
        float: left;
        width: 41px;
        height: 25px;
        text-align: center;
    }
    .total-price{
        color: #f10000;
        font-weight: bolder;
    }
    .g-ctrl{
        margin: 0 auto;
        width: 80%;
    }
    .g-ctrl a{
        color: #444444;
        font-size: 14px;
    }
    .cart-bar{
        width: 100%;
        height: 42px;
        background-color: #DCDFE6;
        display: flex;
        justify-content: space-between;
        line-height: 42px;
    }
    .cartbar-left{
        margin-left: 5px;
        width: 200px;
        height: 100%;
    }
    .cart-del{
        color: #444444;
        margin-left: 30px;
    }
    .cnums-value,.c-price{
        color: #f10000;
        font-weight: bolder;
        margin: 0 5px;
    }
    .cartbar-center{
        width: 200px;
        height: 100%;
        text-align: center;
    }
    .cartbar-right{
        width: 350px;
        height: 100%;
        text-align: center;
    }
    #settle-btn{
        float: right;
        border: none;
        outline: none;
        width: 90px;
        height: 100%;
        color: #FFFFFF;
        font-size: 16px;
        background-color: #959595;
        cursor: pointer;
    }
    #settle-btn.settlebtn-active{
        background-color: #000000;
    }
    .cart-null{
        padding-bottom: 20px;
        text-align: center;
        border-bottom: 1px solid #d8d8d8;
    }
    .cartnull-icon .icon-gouwuche1{
        font-size: 80px;
        color: #d8d8d8;
    }
    .cartnull-p{
        font-size: 30px;
        color: #d8d8d8;
        font-weight: bolder;
        margin: 30px 0;
    }
    .cart-null p:nth-of-type(2){
        font-size: 14px;
    }
    .cart-null p:nth-of-type(2) a{
        color: #1e89f6;
    }
    .cart-null p:nth-of-type(2) a:nth-of-type(1){
        margin-right: 20px;
    }
    .cart-null .icon-lunbo{
        font-size: 12px;
    }
    .check-span {
        display: block;
        margin-top: 3px;
        width: 20px;
        height: 20px;
        background: url("../assets/images/gwy/shopping_cart.png") no-repeat 0 0;
    }
    .check-span.check-true {
        background: url("../assets/images/gwy/shopping_cart.png") no-repeat -3px -20px;
    }
    .check-all-bottom{
        margin-top: 11px;
    }
</style>