<template>
    <div class="main">
        <Head></Head>
        <div class="luckbg">
            <!--<div class="title">-->
            <!--积分抽奖-->
            <!--</div>-->
            <div class="lucktitle"></div>
            <div class="surplus">
                剩余积分:<span class="surplusPoint" v-text="upoint"></span>
            </div>
            <div class="luck">
                <div id="lottery">
                    <!--<div class="bg">-->

                    <!--</div>-->
                    <table border="0" cellpadding="0" cellspacing="0" >
                        <tr>
                            <td class="lottery-unit lottery-unit-0" data-prize="0" :class="{active:box0}"><img src="../assets/pointimg/jifen2.jpg"/><div class="mask1"></div></td>
                            <td class="lottery-unit lottery-unit-1" data-prize="1" :class="{active:box1}"><img src="../assets/pointimg/jifen1.jpg"/><div class="mask1"></div></td>
                            <td class="lottery-unit lottery-unit-2" data-prize="2" :class="{active:box2}"><img src="../assets/pointimg/quan1.jpg"/><div class="mask1"></div></td>
                        </tr>
                        <tr>
                            <td class="lottery-unit lottery-unit-7" data-prize="7" :class="{active:box7}"><img src="../assets/pointimg/jifen2.jpg"/><div class="mask1"></div></td>
                            <td><div class="sta" @click="Sclick">
                            </div ></td>
                            <td class="lottery-unit lottery-unit-3" data-prize="3" :class="{active:box3}"><img src="../assets/pointimg/jifen1.jpg"/><div class="mask1"></div></td>
                        </tr>
                        <tr>
                            <td class="lottery-unit lottery-unit-6" data-prize="6" :class="{active:box6}"><img src="../assets/pointimg/quan2.jpg"/><div class="mask1"></div></td>
                            <td class="lottery-unit lottery-unit-5" data-prize="5" :class="{active:box5}"><img src="../assets/pointimg/jifen2.jpg"/><div class="mask1"></div></td>
                            <td class="lottery-unit lottery-unit-4" data-prize="4" :class="{active:box4}"><img src="../assets/pointimg/jifen1.jpg"/><div class="mask1"></div></td>
                        </tr>
                    </table>
                </div>


            </div>
            <div class="rule">
                <h3> 抽奖规则</h3>
                <div class="rule-box">
                    1. 易美购会员每次抽奖需要扣除50个积分，扣除的积分不退还，每天参与抽奖次数不限。<br>

                    2. 通过本次活动获得的积分仅限易美购商城内使用，可以和其他活动中获得积分累积使用。<br>
                    3  易美购积分可兑换实物商品，但不能提现，不可转让他人。<br>
                    4 在获取和使用积分过程中，如果出现违规行为（如作弊领取、恶意套现等），天猫将取消您获得积分的资格，并有权撤销违规交易，收回活动中所得的积分（含已使用的积分及未使用的积分），必要时将追究法律责任。<br>
                    5 发放积分的相关税款已经由易美购承担并支付。对于中奖积分换购商品，将不开具相应发票。
                </div>



            </div>
            <el-dialog
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                <span>恭喜您获得<span style="color: #710909;font-weight: bolder" >{{info}}！</span></span>
                <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="ok">确 定</el-button>
  </span>
            </el-dialog>


            <!--弹框-->

        </div>
        <pointGoods/>
        <Foot></Foot>
    </div>
</template>
<style>
    @import "../assets/css/point.css";
</style>
<script>
    import Head from '@/components/head.vue'
    import Foot from '@/components/foot.vue'
    import pointGoods from '@/components/pointGoods.vue'
    export default {
        name: 'point',
        components: {
            pointGoods,
            Foot,
            Head
        },
        data(){
                return{
                    box0:false, //选择框
                    box1:false,
                    box2:false,
                    box3:false,
                    box4:false,
                    box5:false,
                    box6:false,
                    box7:false,
                    index:-1,    //当前转动到哪个位置，起点位置
                    count:8,    //总共有多少个位置
                    timer:0,    //setTimeout的ID，用clearTimeout清除
                    speed:20,    //初始转动速度
                    times:0,    //转动次数
                    cycle:50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
                    prize:-1, //中奖位置
                    point:10000, //积分
                    id:12,//用户ID
                    click:false,//防止重复点击
                    upoint:0,//用户积分
                    modal:false,//模态框
                    userId:1,
                    dialogVisible: false,//弹框
                    info:''//中奖信息
                }
        },
        created() {
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.get('/user/userpoint.do',{ params:{
                        uuid:uuid

                    }})
                        .then((res)=>{
                            console.log(res.data.data[0].userPoint);
                            this.upoint=res.data.data[0].userPoint;

                        })
                        .catch((err)=>{
                            return console.log(err);
                        })

        },
        methods:{

            Sclick(){
                if (this.click||this.upoint<50) {//click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                    if(this.upoint<50){
                        let flag=0
                        if(flag==0){
                            alert('你的积分不足')
                            flag=1
                        }
                        setTimeout(function () {
                            flag=0
                        },2000)
                    }

                }else{
                    this.speed=100;
                    this.roll(); //转圈过程不响应click事件，会将click置为false
                    this.start()
                    this.click=true; //一次抽奖完成后，设置click为true，可继续抽奖

                }
            },
            roll(){
                let that=this;
                this.times += 1;
               this. rollinit()
                if (this.times > this.cycle+10 && this.prize==this.index) {
                    clearTimeout(this.timer);
                    this.prize=-1;
                    this.times=0;
                    this.click=false;
                }else{
                    if (this.times<this.cycle) {
                        this.speed -= 10;
                    }else if(this.times===this.cycle) {
                        let index = Math.random()*(this.count)|0;
                        this.prize = index;
                        this.luck();
                        // this.start();

                    }else{

                        this.speed += 20;

                    }
                    if (this.speed<40) {
                        this.speed=40;

                    }
                    //console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
                    this.timer = setTimeout(that.roll,that.speed);//循环调用
                }
                return false;
            },
            rollinit(){

                this['box'+this.index]=false;
                this.index+=1;
                if (this.index>this.count-1) {
                    this.index = 0;
                }
                this['box'+this.index]=true;
            },
            start(){
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.get('/user/start.do',{params:{
                        uuid:uuid
                    }})
                    .then((res)=>{
                        console.log(res);
                    })
                    .catch((err)=>{
                        return console.log(err);
                    })
            },
            luck(){


                let prizeID=this.prize;
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.get('/user/luck.do',{
                    params:{
                        uuid:uuid,
                        prizeId:this.prize
                    }
                })
                    .then((res)=>{
                        console.log(res.data);

                            let that=this;
                            setTimeout(function () {

                                if(prizeID==0){
                                    that.info='20积分';
                                    that.dialogVisible = true;
                                    console.log(prizeID);
                                }
                                else if(prizeID==1){
                                    that.info='10积分';
                                    that.dialogVisible = true;
                                    console.log(prizeID);
                                }else if(prizeID==2){
                                    that.info='十元无门槛优惠券';
                                    that.dialogVisible = true;
                                    console.log(prizeID);
                                } else if(prizeID==3){
                                    that.info='10积分';
                                    that.dialogVisible = true;
                                    console.log(prizeID);
                                } else if(prizeID==4){
                                    that.info='10积分';
                                    that.dialogVisible = true;
                                    console.log(prizeID);
                                } else if(prizeID==5){
                                    that.info='20积分';
                                    that.dialogVisible = true;
                                    console.log(prizeID);
                                } else if(prizeID==6){
                                    that.info='二十元无门槛优惠券';
                                    console.log(prizeID);
                                    that.dialogVisible = true;
                                } else if(prizeID==7){
                                    that.info='20积分';
                                    that.dialogVisible = true;
                                    console.log(prizeID);
                                }

                            },3000);




                    })
            .catch(function (err) {
                    console.log(err);
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        console.log(1);
                        done();

                    })
                    .catch(() => {});
            },
            ok(){
                this.dialogVisible = false;
                location.reload()
            }

            }
        }



</script>