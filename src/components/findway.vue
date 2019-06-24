<template>
    <!--找回密码-->
    <div class="container content-wrap">
        <div class="p container"><span>首页</span>&gt;<span>找回密码</span></div>
        <!--验证码验证-->
        <div class="col-sm-9 col-xs-12 find">
            <h2 class="title">找回密码</h2>
            <!--找回密码流程-->
            <div class="container-fluid flow">
                <div class="step1 findway">
                    <p>1</p>
                    <p>选择找回方式</p>
                </div>
                <div class="step2">
                    <p>2</p>
                    <p>确认验证消息</p>
                </div>
                <div class="step3">
                    <p>3</p>
                    <p>修改信息</p></div>
                <div class="step4">
                    <p>4</p>
                    <p>修改密码成功</p>
                </div>
            </div>
            <!--电话验证码-->
            <form>
                <!--电话-->
                <div class="check">
                    <p>输入您注册时使用的手机号,</p><p>进入下一步进行验证</p>
                    <div class="number"><input type="tel" placeholder="您的手机号*" v-model="telNum"  @blur='telCheck' class="number-write" name="tel"></div>
                    <span class="tip">{{telTip}}</span>
                </div>
                <!--验证码-->
                <div class="code-check">
                    <input type="text" class="imgcode" v-model="codeTxt" @blur="codeCheck" placeholder="输入验证码">
                    <div id="canvas"><imgcode :identifyCode="identifyCode"></imgcode></div>
                    <span class="change" @click="refreshCode">看不清？换一张</span>
                </div>
                <div class="codetip"> <span type="text" class="imgCodeTip">{{codeTip}}</span></div>
                <!--提交-->
                <button type="button" id="submit" @click="handIn">确认</button>
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
        name:'findway',
        components:{
            imgcode
        },
        data(){
            return{
                telNum:'',
                telTip:'',
                codeTxt:'',
                codeTip:'',
                state1:false,
                state2:false,
                identifyCode:'wer4',
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
                this.identifyCode = ''
                this.makeCode(this.identifyCodes, 4)
            },
            // 生成四位随机验证码
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ]
                }
                console.log(this.identifyCode)
            },
            //验证码检验
            codeCheck(){
                if(this.codeTxt){
                    if(this.codeTxt.toLocaleLowerCase()==this.identifyCode.toLocaleLowerCase()){
                        this.codeTip=''
                        this.state2=true
                    }else{
                        this.state2=false
                        return this.codeTip='验证码输入不正确'
                    }
                }else{
                    this.state2=false
                    return this.codeTip='验证码不能为空'
                }

            },
            //电话号码正则
            telCheck(){
                if(this.telNum){
                    if(/^1[34578]\d{9}$/.test(this.telNum)){
                        this.telTip=''
                        this.state1=true
                    }else{
                        this.state1=false
                        return this.telTip='号码格式不正确，请重新输入'

                    }
                }
                else{
                    this.state1=false
                    return this.telTip='不能为空，请重新输入'

                }
            },
            //提交
            handIn(){
                localStorage.setItem('userTel',this.telNum)


                if(this.state1&&this.state2){
                    this.$http.get('/getTel.do',{
                        params:{
                            userTel:this.telNum
                        }
                    })
                        .then((res) => {
                            if(res.status==200){
                                this.$router.replace('/confirm')
                                this.telTip=''
                            }else{
                                this.telTip='用户不存在'
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }else{
                    console.log('用户名或验证码不正确')
                }

            }

        },

        }


</script>
<style scoped>
    @import "../assets/css/findway.css";
</style>