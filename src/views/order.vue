<template>
    <div>
        <Head></Head>
        <main class="main">

            <!--修改地址模态框-->
            <el-dialog :title="modeltitle" status-icon :visible.sync="dialogVisible" width="35%">
                <el-form ref="orderForm" :model="formData" :rules="rules" label-width="80px" >
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="号码" prop="tel">
                        <el-input v-model="formData.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" class="address-style" prop="selected">
                        <area-cascader v-if="cityshow" :level="1" type="text" placeholder="请选择地区" v-model='selected' :data="pcaa"></area-cascader>
                    </el-form-item>
                    <el-form-item label="街道地址" prop="street">
                        <el-input type="textarea" v-model="formData.street" :rows="3" :maxlength="50" class="textarea-wrap"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="modeltitle==='修改地址'" type="primary" @click="submitForm('orderForm')">确 定</el-button>
        <el-button v-else type="primary" @click="commitAddress('orderForm')">确 定</el-button>
      </span>
            </el-dialog>


            <div class="cart-top">
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
            <div class="address">
                <div class="address-title">选择收货地址</div>
                <div class="address-content" :class="{'showAllAdd':showAll}">
                    <!--地址组件-->
                    <Address v-for="(item,index) in addressData" :key="index" :data="item" :class="{'current-addr':item.select}" @click.native="selectAddress(item.address_id)">
                        <button slot="edit" type="button" @click.stop="beforeEdit(item.address_id)">修改本地址</button>
                    </Address>
                    <div class="address-add" @click="newAddress()">
                        <div class="add-icon"><span class="iconfont icon-xinzeng"></span></div>
                        <p class="add-new" >添加新地址</p>
                    </div>
                </div>
                <div class="address-bottom">
                    <p class="show-add" v-if="addressData.length>3 && showAll===false" @click="showAdd()">显示全部地址</p>
                    <p class="manage-add" @click="$router.push({name:'myAddress'})">管理收货地址</p>
                </div>
            </div>
            <!--订单信息-->
            <div class="order">
                <div class="order-top">确认订单信息</div>
                <div class="order-content">
                    <!--订单头部-->
                    <ul class="order-title">
                        <li>商品信息</li>
                        <li>商品属性</li>
                        <li>单价</li>
                        <li>数量</li>
                        <li>运送方式</li>
                        <li>小计</li>
                    </ul>
                    <!--订单列表-->
                    <OrderList v-for="(item,index) in orderData" :key="index" :data="item" ></OrderList>

                </div>
                <div class="order-address">
                    <div class="reamark">
                        <label for="remark">备注：</label><textarea id="remark" v-model="orderRemark" cols="30" rows="10" placeholder="给商家留言"></textarea>
                    </div>
                    <div class="address-info">
                        <p> <span class="addinfo-title">寄送至：</span> <span class="addr-1">{{orderAddress}}</span> </p>
                        <p><span class="addinfo-title">收货人：</span> <span class="addr-2" >{{personinfo}}</span> </p>
                    </div>
                </div>
                <div class="order-bar">
                    <p class="total">总计：<span class="total-price">{{(getTotal.totalPrice).toFixed(2)}}</span></p>
                    <p class="discount">优惠方式
                        <select name="" id="discount" v-model="cousid" >
                            <option value="" selected >无优惠</option>
                            <option :value="item.cous_id" v-for="(item,index) in cousData" :key="index">{{item.cous_price}}元优惠券</option>
                        </select>
                    </p>
                    <p class="real">实付金额：<span class="real-price">{{(getTotal.totalPrice -getDiscount.discount).toFixed(2)}}</span> </p>
                </div>
                <div class="oc-line">
                    <button type="button" class="order-commit" @click="commitOrder()">提交订单</button>
                </div>
            </div>

            <!--商城承诺-->
            <Promise></Promise>
        </main>
        <foot></foot>
    </div>
</template>

<script>
    import Head from '@/components/head.vue'
    import Foot from '@/components/foot.vue'
    import Address from '@/components/address.vue'
    import OrderList from '@/components/orderlist.vue'
    import Promise from '@/components/promise.vue'
    import  qs  from 'qs'
    import { pca, pcaa } from 'area-data';
    export default {
        name: "order",
        components: {
            Head,Foot,Address,OrderList,Promise
        },
        data(){
            //验证姓名
            let checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('姓名不能为空'));
                }
                setTimeout(() => {
                    if (value.match('^[0-9]*$')) {
                        callback(new Error('姓名格式不正确'));
                    }else{
                        callback()
                    }
                }, 500);
            };
            //验证手机号码
            let checkTel = (rule,value,callback)=>{
                if (!value){
                    return callback(new Error('手机号码不能为空'));
                }
                setTimeout(() => {
                    if (!value.match('^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$')) {
                        callback(new Error('手机号码格式不正确'));
                    }else{
                        callback()
                    }
                }, 500);
            };
            //验证省市区地址
            let checkAddress = (rule,value,callback)=>{
                if (!value){
                    return callback(new Error('地址不能为空'));
                }else{
                    callback()
                }
            };
            //验证街道地址
            let checkStreet = (rule,value,callback)=>{
                if (!value){
                    return callback(new Error('街道地址不能为空'));
                }
                setTimeout(() => {
                    if (value.match('^[0-9]*$')) {
                        callback(new Error('街道地址格式不正确'));
                    }else{
                        callback()
                    }
                }, 500);
            };
            return{
                addressData:'',
                orderData:'',
                showAll:false,
                cartid:'',
                attrid:'',
                cousid:'',
                goodsid:'',
                discount:'',
                cousData:'',
                isPoint:'',
                cityshow:true,
                orderAddress:'',
                addressId:'',
                orderRemark:'',
                personinfo:'',
                dialogVisible:false,
                modeltitle:'',
                formData:{
                    id:'',
                    name:'',
                    tel:'',
                    address:'',
                    street:''
                },
                rules: {
                    name: [
                        { validator: checkName, trigger: 'blur' }
                    ],
                    tel: [
                        { validator: checkTel, trigger: 'blur' }
                    ],
                    address:[
                        {validator:checkAddress,trigger:'blur'}
                    ],
                    street: [
                        { validator: checkStreet, trigger: 'blur' }
                    ],
                },
                pca:pca,
                pcaa: pcaa,//最多省市区三级，结合:level='2'选择，0省、1省市、2省市区
                selected:[]
            }
        },
        computed:{
            //获取总价
            getTotal(){
                let totalPrice = 0;
                let _this = this
                for (let i=0;i<_this.orderData.length;i++){
                    (function (i) {
                        //总价累加
                        totalPrice +=_this.orderData[i].cart_number * _this.orderData[i].goods_price
                    })(i)
                }
                return {totalPrice:totalPrice}
            },
            //计算折扣的价格
            getDiscount(){
                let discount = 0
                let _this = this
                console.log(this.cousid);
                if (this.cousid === ''){
                    //折扣为0
                    discount =0
                } else{
                    //获取选中的优惠券
                    let cous = _this.cousData.filter(function (val) {
                        return val.cous_id === _this.cousid
                    });
                    //获取折扣的价格
                    discount = Number(cous[0].cous_price)
                }
                return {discount:discount}

            }
        },
        methods:{
            //获取地址
            getAddress(){
                this.$http.get('/order/getAddress.do',{
                    params:{
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid
                        // uuid:'03500238841f40a9844eec941f84e0f5',
                    }
                })
                    .then((res)=>{
                        console.log(res);
                        if (res.data.returncode ==='200'){
                            this.addressData = res.data.data
                            this.addressId = res.data.data[0].address_id
                            //为所有的地址添加select（是否选中）字段，初始值为false，默认地址为true
                            let _this = this
                            _this.addressData.map(function (val,index) {
                                if (index ===0){
                                    _this.$set(val,'select',true)
                                    _this.orderAddress = val.address_pro +" "+ val.address_city +" "+ val.address_dis +" "+ val.address_minute
                                    _this.personinfo = val.address_name +" "+ val.address_tel
                                }else{
                                    _this.$set(val,'select',false)
                                }
                            })

                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            //展示全部地址
            showAdd(){
                this.showAll = true
            },
            //选中地址
            selectAddress(id){
                let _this = this
                //遍历所有地址,切换选中的样式
                for (let i=0;i<_this.addressData.length;i++){
                    _this.addressData[i].select=false
                    if (_this.addressData[i].address_id === id){
                        _this.addressData[i].select = true
                        _this.orderAddress = _this.addressData[i].address_pro +" "+  _this.addressData[i].address_city +" "+ _this.addressData[i].address_dis +" "+ _this.addressData[i].address_minute
                        _this.personinfo = _this.addressData[i].address_name +" "+ _this.addressData[i].address_tel
                        _this.addressId = _this.addressData[i].address_id
                        console.log(_this.addressId);
                    }
                }
            },
            //点击修改地址
            beforeEdit(id){
                this.modeltitle = '修改地址';
                this.dialogVisible =true
                //发送请求查询此条地址信息
                this.$http.get('/order/getSingleAddress.do',{
                    params:{
                        addressId:id,
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                        // uuid:'03500238841f40a9844eec941f84e0f5',
                    }
                })
                    .then((res)=>{
                        console.log(res);
                        if (res.data.returncode ==='200'){
                            this.iscityShow()
                            this.formData.id = res.data.data[0].address_id
                            this.formData.name = res.data.data[0].address_name
                            this.formData.tel = res.data.data[0].address_tel
                            this.selected = [res.data.data[0].address_pro,res.data.data[0].address_city,res.data.data[0].address_dis]
                            this.formData.street = res.data.data[0].address_minute
                            console.log(this.selected);
                        }
                    })
            },
            //清空已选择的地区
            iscityShow(){
                this.cityshow = false;
                this.selected = [];
                setTimeout(() => {this.cityshow = true},0);
            },
            //提交修改
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/order/changeAddress.do',qs.stringify({
                            // uuid:'03500238841f40a9844eec941f84e0f5',
                            uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                            addressId:this.formData.id,
                            addressName:this.formData.name,
                            addressPro:this.selected[0],
                            addressCity:this.selected[1],
                            addressDist:this.selected[2],
                            addressStreet:this.formData.street,
                            addressTel:this.formData.tel
                        }))
                            .then((res)=>{
                                console.log(res);
                                if (res.data.returncode ==='200'){
                                    this.dialogVisible = false
                                    console.log('成功')
                                    //获取订单界面的地址信息
                                    this.getAddress();
                                }
                            })
                            .catch((err)=>{
                                console.log(err);
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //点击新增地址
            newAddress(){
                this.iscityShow()
                this.modeltitle = '新增地址';
                this.formData.id='';
                this.formData.name='';
                this.formData.tel='';
                this.formData.address='';
                this.formData.street='';
                this.dialogVisible = true;
            },
            //确认新增地址
            commitAddress(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/order/insertAddress.do',qs.stringify({
                            uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                            // uuid:'03500238841f40a9844eec941f84e0f5',
                            addressName:this.formData.name,
                            addressPro:this.selected[0],
                            addressCity:this.selected[1],
                            addressDist:this.selected[2],
                            addressStreet:this.formData.street,
                            addressTel:this.formData.tel
                        }))
                            .then((res)=>{
                                if (res.data.returncode ==='200'){
                                    this.dialogVisible = false
                                    console.log('成功')
                                    //获取订单界面的地址信息
                                    this.getAddress();
                                }
                            })
                            .catch((err)=>{
                                console.log(err);
                            })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //获取非积分商品的订单
            getOrder(){
                console.log(this.cartid);
                this.$http.post('/order/createOrder.do',qs.stringify({
                    uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                    cartId:this.cartid,
                    // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                }))
                    .then((res)=>{
                        console.log(res);
                        if (res.data.returncode ==='200'){
                            console.log(res);
                            this.orderData = res.data.data
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            //获取积分商品的订单
            getPointOrder(){
                this.$http.get('/order/createOrder.do',{
                    params:{
                        attrid:this.attrid,
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                        // uuid:'03500238841f40a9844eec941f84e0f5',
                    }
                })
                    .then((res)=>{
                        if (res.data.returncode ==='200'){
                            console.log(res);
                            this.orderData = res.data.data
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },

            //获取优惠券信息
            getCous(){
                this.$http.get('/user/getCoupon.do',{
                    params:{
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                        // uuid:'03500238841f40a9844eec941f84e0f5'
                    }
                })
                    .then((res)=>{
                        this.cousData = res.data.data
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            commitOrder(){
                console.log(this.addressId);
                console.log(this.cartid);
                console.log(this.orderRemark);
                //非积分商品提交订单
                if (this.isPoint ==null){
                    this.$http.post('/order/commitOrder.do',qs.stringify({
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                        // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                        addressId:this.addressId,
                        remark:this.orderRemark,
                        // uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                        cartId:this.cartid
                    }))
                        .then((res)=>{
                            console.log(res);
                            if (res.data.returncode ==='200'){
                                //将订单流水号和商品类型存入localstorage
                                localStorage.setItem('orderNo',res.data.data[0].orderNo)
                                //订单提交成功，跳转到支付界面
                                this.$router.push({name:'pay'})
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                } else{//积分商品提交订单

                }

            }
        },
        created() {
            //获取cartid
            this.cartid=localStorage.getItem('cartid')
            console.log(this.cartid);
            //获取商品是否为积分商品的属性
            this.isPoint = localStorage.getItem('isPoint')
            console.log(this.isPoint);
            //判断如果不是积分商品
            if (this.isPoint ==null){
                //获取优惠券
                this.getCous()
                //获取非积分商品的订单信息
                this.getOrder()
            }else{
                //获取属性id
                this.attrid = localStorage.getItem('attrid')
                //获取积分商品的订单信息
                this.getPointOrder()
            }
            //获取订单界面的地址信息
            this.getAddress();
        }
    }
</script>

<style >
    /*头部*/
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
        background: url("../assets/images/gwy/nextstep.png")no-repeat;
        background-size: 100% 100%;
    }
    .step-line2{
        background: url("../assets/images/gwy/currentstep.png")no-repeat;
        background-size: 100% 100%;
    }
    .step-line3{
        background: url("../assets/images/gwy/nextstep.png")no-repeat;
        background-size: 100% 100%;
    }
    /*地址*/
    .address{
        margin-top: 20px;
        height: auto;
    }
    .address-title{
        font-weight: bolder;
        margin-bottom: 8px;
    }
    .address-content{
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        height: 180px;
        overflow: hidden;
    }
    .showAllAdd{
        height: auto;
    }
    .address-add{
        width: 250px;
        height: 180px;
        margin-right: 40px;
        background-color: #ffffff;
        margin-bottom: 15px;
        border: 1px solid #e0e0e0;
        padding: 20px;
        font-size: 14px;
        color: #757575;
        cursor: pointer;
        text-align: center;
        box-shadow: 0 3px 10px -3px #a8a8a8;
    }
    .address-add .icon-xinzeng{
        line-height: 120px;
        font-size: 45px!important;
        color: #757575;
    }
    .address-bottom{
        margin-top: 20px;
        height: 25px;
        line-height: 25px;
        display: flex;
        justify-content: space-between;
    }
    .show-add,.manage-add{
        cursor: pointer;
        font-size: 15px;
        color: #81b8f1;
    }
    .address-style{
        height: 40px;
    }
    .address-style .el-form-item__content{
        height: 100%;
        line-height: unset;
    }
    .address-style .el-form-item__content .area-cascader-wrap{
        height: 100%;
    }
    .address-style .el-form-item__content .area-cascader-wrap .area-select.large{
        height: 100%;
        width: 100%;
    }
    .address-style .area-cascader-wrap .area-select .area-selected-trigger{
        height: 100%;
    }
    .textarea-wrap textarea{
        resize: none;
        overflow: hidden;
    }
    /*订单信息*/
    .order{
        margin-top: 20px;
    }
    .order-top{
        font-weight: bolder;
    }
    .order-content{
        border-bottom: 1px dashed #bbbbbb;
        margin-bottom: 20px;
    }
    .order-title{
        display: flex;
        justify-content: space-between;
        color: #FFFFFF;
        background-color: #111111;
        margin: 20px auto;
        height: 30px;
        line-height: 30px;
    }
    .order-title li{
        text-align: center;
    }
    .order-title li:nth-of-type(1){
        width: 370px;
    }
    .order-title li:nth-of-type(2){
        width: 220px;
    }
    .order-title li:nth-of-type(3){
        width: 120px;
    }
    .order-title li:nth-of-type(4){
        width: 100px;
    }
    .order-title li:nth-of-type(5){
        width: 120px;
    }
    .order-title li:nth-of-type(6){
        width: 120px;
    }

    .order-address{
        display: flex;
        justify-content: space-between;
    }
    .reamark label{
        font-size: 14px;
    }
    .reamark textarea{
        vertical-align: top;
        resize: none;
        height: 60px;
        width: 240px;
        font-size: 14px;
    }
    .address-info{
        height: 60px;
        padding: 10px 25px;
        background-color: #a8babb;
        font-size: 14px;
    }
    .addinfo-title{
        font-weight: bolder;
    }
    .address-info p:nth-of-type(1){
        margin-bottom: 5px;
    }
    .address-content>div:nth-of-type(4n){
        margin-right: 0;
    }
    .address-wrap.current-addr{
        background-image: url("../assets/images/gwy/select.png");
        background-repeat: no-repeat;
        background-position:right top;
        background-size: 35px 35px;
        border: 1px solid #111111;
    }
    .order-bar{
        margin-top: 20px;
        height: 50px;
        background-color: #DCDFE6;
        display: flex;
        justify-content: space-between;
        line-height: 50px;
    }
    .total{
        margin-left: 10px;
    }
    .calc-price,.total-price{
        color: #f10000;
        font-weight: bolder;
    }
    .total-price::before,.real-price::before{
        content: '￥';
    }
    #discount{
        height: 30px;
        width: 110px;
        text-align: center;
        padding: 0 10px;
        outline: none;
        border-radius: 5px;
    }
    .real{
        margin-right: 10px;
    }
    .real-price{
        color: #f10000;
        font-weight: bolder;
    }
    .oc-line{
        text-align: right;
    }
    .order-commit{
        width: 110px;
        height: 50px;
        background-color: #000000;
        outline: none;
        border: none;
        color: #FFFFFF;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
    }
    /*自定义对话框样式*/

</style>