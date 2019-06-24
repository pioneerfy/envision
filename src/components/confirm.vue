<template>
    <!--找回密码-->
    <div class="container content-wrap">
        <div class="p container"><span>首页</span>&gt;<span>找回密码</span></div>
        <!--验证码验证-->
        <div class="col-sm-9 col-xs-12 find">
            <h2 class="title">找回密码</h2>
            <!--找回密码流程-->
            <div class="container-fluid flow">
                <div class="step5">
                    <p>1</p>
                    <p>选择找回方式</p>
                </div>
                <div class="step6">
                    <p>2</p>
                    <p class="confirm">确认验证消息</p>
                </div>
                <div class="step7">
                    <p>3</p>
                    <p>修改信息</p></div>
                <div class="step8">
                    <p>4</p>
                    <p>修改密码成功</p>
                </div>
            </div>
            <!--电话验证码-->
            <form action="">
                <div class="txt">{{userTel}}</div>
                <div class="img-code">
                    <input type="text" placeholder="请输入验证码*" class="codeWrite2" v-model="codeTxt" @blur="codeCheck2">
                    <!--<canvas id="canvas" width="100" height="34"></canvas>-->
                    <div id="canvas"><imgcode :identifyCode="identifyCode1"></imgcode></div>
                    <span>看不清？</span>
                    <span class="change" @click="refreshCode()">换一张</span>
                </div>
                <div class="tipbox"><span  class="tip">{{codeTip}}</span></div>
                <div class="msg-code">
                    <input type="text" placeholder="短信验证码*" class="telcode" @blur="checkMsgCode" v-model="telTxt">
                    <button type="button" id="getcode" @click="getmsg" :disabled="isused">获取短信验证码</button>
                </div>
                <div class="tipbox2" v-cloak><span class="tip2" v-text="timeTotal"></span></div>
                <button type="button" id="submit" @click="linkTo">下一步</button>
            </form>
        </div>
        <div class="col-sm-3 col-xs-12 serve">
            <h2>客服中心</h2>
            <p class="contact">如有任何问题，请联系我们</p>
            <p class="tel">订购咨询热线</p>
            <p>400-820-4888</p>
            <p class="tel">客户关怀中心</p>
            <p>400-820-9029</p>
        </div>

    </div>
</template>
<script>
    import imgcode from './imgCodeF/imgcode'
    export default {
        name:'confirm',
        components:{
            imgcode
        },
        data(){
            return{
                userTel:'用户:'+localStorage.getItem('userTel'),
                isused:false,
                timeTotal:'',
                codeTxt:'',
                codeTip:'',
                imgcodeState:false,
                send:false,
                macth:false,
                identifyCode1:'qdfg',
                telTxt:'',
                identifyCodes:'0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
            }
        },
        methods:{
            //图形验证码
            // 生成随机数
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min)
            },
            // 切换验证码
            refreshCode() {
                this.identifyCode1 = '123'
                this.makeCode(this.identifyCodes, 4)
            },
            // 生成四位随机验证码
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode1 += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ]
                }
                console.log(this.identifyCode1)
            },
            //验证码是否正确
            codeCheck2(){
               if(this.codeTxt){
                  if(this.codeTxt.toLocaleLowerCase()==this.identifyCode1.toLocaleLowerCase()){
                        this.codeTip=null
                      this.imgcodeState=true
                  }else{
                      this.codeTip='验证码输入不正确'
                      this.imgcodeState=false
                  }
               }else{
                   this.codeTip='验证码不能为空'
                   this.imgcodeState=false
               }
            },
            //获取短信验证码
            getmsg(){
                var index=60
                this.$http.post('/sendCode.do',this.$qs.stringify({userTelephone: localStorage.getItem('userTel')}))
                    .then(res => {
                        console.log(res,'res')
                        if(res.status==200){
                            this.isused=true
                            var _that=this
                            _that.send=true
                            setInterval(function () {
                                index--;
                                _that.timeTotal=index+'秒后重新发送'
                                if(_that.match){
                                    index=0;
                                }
                                if(index<=0){
                                    _that.timeTotal=''
                                    _that.isused=false
                                }
                            },1000)
                        }else{
                            this.timeTotal=''
                            this.isused=false
                            this.send=false
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            //校验
            checkMsgCode(){
                console.log(this.telTxt,'验证码')
                var tel=localStorage.getItem('userTel')
                console.log(tel,'电话')
                if(this.send){
                    this.$http.post('/matchCode.do',this.$qs.stringify({userTelephone: tel,code:this.telTxt}))
                        .then(res => {
                            console.log(res,'res')
                            if(res.status==200){
                                this.timeTotal=''
                                this.match=true
                            }else{
                                this.timeTotal='验证码输入不正确'
                            }
                        })
                        .catch( err => {
                            console.log(err,'err')
                        })
                }
            },
            //跳转
            linkTo(){
                if(this.imgcodeState&&this.match){
                    this.$router.replace('/resetpw')
                }
                else{
                    console.log('图形验证码或短信验证码有误')
                }
            }
        }

    }
</script>
<style scoped>
    @import "../assets/css/confirm.css";
    [v-cloak] {
        display: none !important;
    }
</style>