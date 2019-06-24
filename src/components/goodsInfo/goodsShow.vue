<template>
    <div v-if="goods">
        <section class="two-section">
            <div class="big-box clear" id="big-box">
                <div class="big-left">
                    <div class="left-top">
                        <img :src="url+pic_url">
                        <div class="stock">库存{{stock_number}}</div>
                    </div>
                    <!--<Dot :showDot="showDot" :goods="goods" :changeStyle="changeStyle" :flag="flag"/>-->
                </div>
                <div class="big-right">
                    <div class="right-top">
                        <h2 class="head-h2">{{goods[0].goods_name}}</h2>
                        <p class="head-h3">{{goods[0].goods_descript}}</p>
                        <a class="get-more" href="#1">>>查看更多</a>
                    </div>
                    <div class="right-middle">
                        <p>选择规格</p>
                        <!--<Color :showDot="showDot" :goods="goods" :changeStyle="changeStyle" :flag="flag"/>-->
                        <Weight :goods="goods" :changeStyle="changeStyle" :flag="flag"/>
                        <!--<No :showNo="showNo" :changeStyle="changeStyle" :flag="flag"/>-->
                        <div class="num">
                            <p>选择数量</p>
                            <el-input-number v-model="num" @change="handleChange" :min="1" :max="stock_number" label="描述文字"></el-input-number>
                        </div>
                    </div>
                    <div class="right-bottom">
                        <div class="price">￥{{goods[0].goods_price.toFixed(2)}}</div>
                        <div class="numbers">
                            <span @click="updateFav" class="iconfont icon-shoucang" :class="{'star-show':starShow}"></span>
                            <span class="sc-number">（收藏指数{{fav_num}}）</span>
                        </div>
                    </div>
                    <div class="car">
                        <!-- Table -->
                        <el-button type="button" id="add-car" @click="addBtn" v-text="btnText"></el-button>
                        <!-- 购物商品信息 -->
                        <el-dialog title="商品信息" :visible.sync="dialogTableVisible">
                            <el-table :data="cartData">
                                <el-table-column property="cartName" label="商品名称"></el-table-column>
                                <el-table-column property="cartAttrValue" label="商品规格"></el-table-column>
                                <el-table-column property="cartPrice" label="商品单价"></el-table-column>
                                <el-table-column property="cartNum" label="商品数量"></el-table-column>
                                <el-table-column property="cartTotal" label="商品总价"></el-table-column>
                            </el-table>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogTableVisible = false">取 消</el-button>
                                <el-button type="primary" @click="addOk">确 定</el-button>
                            </div>
                        </el-dialog>
                        <el-dialog
                                width="30%"
                                title="添加商品成功"
                                :visible.sync="innerVisible"
                                center>
                            <span>跳转至购物车？</span>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="innerVisible = false">取 消</el-button>
                                <el-button type="primary" @click="openCart">确 定</el-button>
                            </div>
                        </el-dialog>
                        <!-- 商品下架 -->
                        <el-dialog title="下架提示" :visible.sync="dialogDelVisible" width="40%" :show-close="false" >
                            <span>该商品已下架，请选购其他商品</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="dialogDelVisible = false">确 定</el-button>
                            </span>
                        </el-dialog>
                        <!-- 商品库存为0 -->
                        <el-dialog title="库存提示" :visible.sync="dialogStockVisible" width="40%" :show-close="false" >
                            <span>该商品库存为0，请重新选择规格或其他商品</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="dialogStockVisible = false">确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    // import Dot from "./dot";
    // import Color from "./color";
    import Weight from "./weight";
    // import No from "./no";
    export default {
        name: "goodsShow",
        props: ['goodsId','uuid'],
        components: {Weight},
        data() {
            return {
                goods:'',
                num: 1, //选择的数量
                stock_number: '', //库存  this.goods[0].stock_number
                goods_isDel: '',
                flag: 0, //小圆点 颜色 切换
                // showDot:true, //小圆点 颜色
                showWeight: true, //净含量
                // showNo: false, //无规格
                starShow: false, //收藏
                pic_url: '', //改变主图背景
                attrId: '', //属性id
                attr_num: '',
                goods_price: '',
                fav_num:'',
                btnText:'', //加入购物车 积分兑换 按钮
                cartData: [{
                    cartName: '',  //this.goods[0].goods_name
                    cartAttrValue: '',  //this.goods[0].attr_num
                    cartPrice: '',  //this.goods[0].goods_price
                    cartNum: 1,
                    cartTotal: '' //this.goods[0].goods_price
                }],
                innerVisible: false,
                dialogTableVisible: false,
                dialogDelVisible: false,
                dialogStockVisible: false,
                url:''
            }
        },
        methods: {
            // 选择规格
            changeStyle(index) {
                this.flag=index;
                this.stock_number=Number(this.goods[index].stock_number);
                this.pic_url=this.goods[index].pic_url;
                this.attrId=this.goods[index].attr_id;
                this.goods_price=this.goods[index].goods_price;
                this.cartData[0].cartAttrValue=this.goods[index].attr_value;
                this.cartData[0].cartPrice=this.goods[index].goods_price;
                this.cartData[0].cartTotal=Number(this.goods[index].goods_price)*Number(this.cartData[0].cartNum);
            },
            // 选择数量
            handleChange(value) {
                this.cartData[0].cartNum=value;
                this.cartData[0].cartTotal=Number(this.cartData[0].cartPrice)*Number(value);
            },
            // 改变收藏状态
            updateFav() {
                let data=this.$qs.stringify({uuid: this.uuid,goodsId: this.goodsId});
                if (this.uuid){
                    if (this.starShow) {
                        this.$confirm('确定取消此收藏商品, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$http.post('/user/userCollect.do', data).then((res) => {
                                if (res.data.returncode==='200') {
                                    this.$message({
                                        type: 'success',
                                        message: '取消收藏成功!',
                                        duration: 1000
                                    });
                                    console.log(res.data.data.fav_num)
                                    this.starShow=!this.starShow;
                                    this.fav_num=res.data.data[0].fav_num;
                                }
                            })
                                .catch(err => {
                                    console.log('updateFav请求失败', err);
                                    this.$message({
                                        message: 'updateFav请求失败',
                                        type: 'error',
                                        duration: 1000
                                    });
                                });
                        }).catch(() => {
                        });
                    }else {
                        this.$confirm('确定收藏此商品, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$http.post('/user/userCollect.do', data).then((res) => {
                                if (res.data.returncode==='200') {
                                    this.$message({
                                        type: 'success',
                                        message: '收藏成功!',
                                        duration: 1000
                                    });
                                    console.log(res.data)
                                    this.starShow=!this.starShow;
                                    this.fav_num=res.data.data[0].fav_num;
                                }
                            })
                                .catch(err => {
                                    console.log('updateFav请求失败', err);
                                    this.$message({
                                        message: 'updateFav请求失败',
                                        type: 'error',
                                        duration: 1000
                                    });
                                });
                        }).catch(() => {
                        });
                    }
                } else {
                    this.$router.push({name: 'lg'});
                }
            },
            // 积分兑换  or  加入购物车
            changeBtnText() {
                if (this.goods){
                    if(!this.goods[0].goods_isIntegral) {
                        this.btnText = '积分兑换'
                    }else {
                        this.btnText = '加入购物车'
                    }
                } else {
                    console.log(11)
                }
            },
            // 点击 加至购物车  积分兑换
            addBtn() {
                if (this.stock_number){
                    if (!this.goods_isDel){
                        if (this.uuid){
                            this.dialogTableVisible = true
                        } else {
                            this.$router.push({name: 'lg'});
                        }
                    }else {
                        // 商品已下架
                        this.dialogDelVisible = true
                    }
                } else {
                    // 库存为 0
                    this.dialogStockVisible = true
                }
            },
            // 添加至购物车  积分兑换跳转订单页面
            addOk() {
                this.dialogTableVisible=false;
                if (!this.goods[0].goods_isIntegral){
                    // 积分兑换
                    this.$router.push({name:'order',params:{attrId: this.attrId,isPoint: 0}})
                } else {
                    // 加入购物车
                    let data = this.$qs.stringify({uuid: this.uuid,attrId: this.attrId,number: this.cartData[0].cartNum});
                    console.log(data);
                    // this.$http.post({url:'http://172.16.7.91:8080/user/addCar.do', params: data}).then((res) => {
                    this.$http.post('/user/addCar.do', data).then((res) => {
                        console.log('加入购物车',res)
                        if (res.data.returncode==='200'){
                            // this.innerVisible=true
                            // console.log('加入购物车成功')
                            this.$message({
                                message: '加入购物车成功',
                                type: 'success',
                                duration: 1000
                            });
                        }
                    })
                    .catch((err) => {
                        console.log('加入购物车请求失败', err);
                        this.$message({
                            message: '加入购物车请求失败',
                            type: 'error',
                            duration: 1000
                        });
                    });
                }
            },
            // 跳转到购物车
            openCart() {
                // 跳转至购物车
                this.$router.push({name:'shopCart'})
            },
            // 获取goods
            getGoods () {
                // let that=this;
                return new Promise((resolve) => {
                    let data = '';
                    if (this.uuid){
                        data = this.$qs.stringify({goodsId: this.goodsId,uuid: this.uuid});
                    } else {
                        data = this.$qs.stringify({goodsId: this.goodsId})
                    }
                    this.$http.post('/goodsmess.do', data).then((res) => {
                        resolve(res.data)
                    })
                    .catch(err => {
                        console.log('获取商品详情', err);
                        this.$message({
                            message: '获取商品详情失败',
                            type: 'error',
                            duration: 1000
                        });
                    });
                })
            },
        },
        created() {
            this.url=localStorage.getItem('URL')
            // 获取商品goods
            this.getGoods().then(res=>{
                // console.log('goods',res.data);
                if (res.returncode==='200'){
                    this.goods=res.data;
                    this.changeBtnText();

                    console.log(res.data[0])

                    this.fav_num=this.goods[0].fav_num;
                    this.cartData[0].cartAttrValue=this.goods[0].attr_value;
                    this.cartData[0].cartPrice=this.goods[0].goods_price;
                    this.cartData[0].cartTotal=Number(this.goods[0].goods_price)*Number(this.cartData[0].cartNum);
                    this.cartData[0].cartName=this.goods[0].goods_name;
                    // this.pic_url=require('../../assets/images/goodsimg/Dior-eye-004-1.jpg')   // this.goods[0].pic_url;
                    this.pic_url=this.goods[0].pic_url;
                    this.stock_number=this.goods[0].stock_number;
                    this.attrId=this.goods[0].attr_id

                    if (this.uuid){
                        // 登录状态
                        if(this.goods[0].is_deleted){
                            this.starShow=true
                        }else {
                            this.starShow=false
                        }
                    }
                }
            });
        },
        mounted() {

        },
    }
</script>

<style scoped>
    .clear::before,
    .clear::after{
        display: table;
        content: '';
    }
    .clear::after{
        clear: both;
    }
    .nav-top ul li a{
        color: #ffffff;
    }
    .brand-ul a{
        color: #cccccc;
        transition: all linear .2s;
    }
    .brand-ul a:hover{
        color: #333333;
    }
    .one-section{
        width: 1170px;
        height: 170px;
        background-color: #ffffff;
        margin: 0 auto;
        padding: 15px;
    }
    .logo-content a,.logo-content a img{
        display: block;
        width: 170px;
        height: 80px;
        transition: all linear .2s;
    }
    /* 分类 */
    .brand-ul li{
        position: relative;
    }
    .brand-ul li:not(:last-child)::after{
        position: absolute;
        right: 5px;
        top: 16px;
        width: 1px;
        height: 19px;
        /*background-color: #ccc;*/
        content: '';
        font-size: 0;
        line-height: 0;
    }
    .brand-type li{
        display: inline-block;
        padding: 1px 25px;
        /*background-color: #007aff;*/
        font-size: 14px;
    }

    /* content */
    .two-section{
        width: 1170px;
        background-color: #ffffff;
        margin: 0 auto;
        padding: 5px 15px 5px 15px;
    }
    .two-section>div{
        padding: 15px 0 50px 0;
        border-bottom: 1px solid #cccccc;
    }
    .big-left,.big-right{
        width: 50%;
        padding: 20px 20px;
        float: left;
        height: 530px;
    }
    .big-right{
        /*background-color: #007aff;*/
    }
    .left-top{
        text-align: center;
        position: relative;
    }
    .stock{
        position: absolute;
        width: 500px;
        height: 500px;
        background: rgba(255,255,255,.4);
        transition: all linear .2s;
        bottom: 0;
        left: 15px;
        text-align: center;
        line-height: 500px;
        opacity: 0;
    }
    .left-top:hover .stock{
        opacity: 1;
        /*visibility: visible;*/
    }
    .left-top img{
        width: 500px;
        height: 500px;
        transition: all linear .2s;
    }
    /* 商品名字 */
    .right-top,.right-middle,.right-bottom{
        padding: 20px 20px 40px 40px;
    }
    .right-middle{
        margin-bottom: 50px;
    }
    .head-h2{
        font-size: 24px;
        font-weight: bolder;
        margin-bottom: 15px;
    }
    /* 选择规格 */
    .head-h3{
        width: 300px;
        height: 22px;
        display: inline-block;
        font-size: 16px;
        font-weight: normal;
        overflow: hidden;
    }
    .right-top h3{
        float: left;
    }
    .get-more{
        cursor: pointer;
        color: #0077aa;
        font-size: 16px;
        float: right;
    }
    .right-middle{
        text-align: left;
        height: 200px;
    }
    .right-middle p{
        font-size: 18px;
        margin-bottom: 20px;
    }
    /* 数量 */
    .num{
        padding-top: 20px;
    }
    /* 价格 指数 */
    .price,.numbers{
        float: left;
        width: 50%;
        height: 50px;
        line-height: 50px;
        text-align: left;
    }
    .icon-shoucang{
        width: 30px;
        display: inline-block;
        height: 30px;
        font-size: 30px;
        cursor: pointer;
        text-align: center;
        color: #cccccc;
        transition: all linear .2s;
    }
    .star-show{
        color: red;
        cursor: pointer;
    }
    .sc-number{
        color: #cccccc;
    }

    /* 加入购物车 */
    .car{
        padding: 50px 30px;
    }
    #add-car{
        background-color: #111111;
        border: 1px solid #cccccc;
        outline: none;
        display: inline-block;
        border-radius: 3px;
        text-align: center;
        width: 300px;
        margin-top: 4px;
        color: #ffffff;
        transition: all linear .2s;
        vertical-align: top;
        height: 46px;
        transition: all linear .2s;
        cursor: pointer;
    }
    #add-car:hover,#exchange:hover{
        border: 1px solid #333333;
        background-color: #222222;
    }
</style>