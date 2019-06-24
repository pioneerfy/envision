<template>
    <!--找回密码-->
    <div class="container content-wrap">
        <div class="p container"><span>首页</span>&gt;<span>找回密码</span></div>
        <!--验证码验证-->
        <div class="col-sm-9 col-xs-12 find">
            <h2 class="title">找回密码</h2>
            <!--找回密码流程-->
            <div class="container-fluid flow">
                <div class="step9">
                    <p>1</p>
                    <p>选择找回方式</p>
                </div>
                <div class="step10">
                    <p>2</p>
                    <p>确认验证消息</p>
                </div>
                <div class="step11">
                    <p>3</p>
                    <p>修改信息</p></div>
                <div class="step12">
                    <p>4</p>
                    <p>修改密码成功</p>
                </div>
            </div>
            <!--电话验证码-->
            <form action="">
                <div class="newpw"><input class="pw" type="password" placeholder="请输入新密码：" v-model="pwTxt" @blur="pwCheck()"></div>
                <div><span class="tip1">{{pwTip}}</span></div>
                <!--onKeyUp=pwStrength(this.value) onBlur=pwStrength(this.value)-->
                <div><input class="pwagain" type="password" placeholder="确认新密码："  v-model="pwTxtAgain" @blur="pwCheckAgain"></div>
                <div><span class="tip2">{{pwTipAgain}}</span></div>
                <!--<div class="strong">-->
                    <!--<span>密码强度：</span>-->
                    <!--<span id="strength_L" bgcolor="#eeeeee"n>弱</span>-->
                    <!--<span id="strength_M" bgcolor="#eeeeee">中</span>-->
                    <!--<span id="strength_H" bgcolor="#eeeeee">强</span>-->
                <!--</div>-->
                <button type="button" id="submit" @click="link">提交</button>
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
    export default {
        name:'resetpw',
        data(){
            return{
                pwTxt:'',
                pwTxtAgain:'',
                statea:'',
                stateb:'',
                pwTip:'',
                pwTipAgain:'',
            }
        },
        methods:{
            //密码正则
            pwCheck(){
                console.log(this.pwTxt)
                if(this.pwTxt){
                    if(/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{7,25}$/.test(this.pwTxt)){
                        this.pwTip='.'
                        this.statea=true
                    }else{
                        this.pwTip='密码格式不正确'
                        this.statea=false
                    }
                }else{
                    this.pwTip='请输入密码'
                    this.statea=false
                }

            },
            //重新输入密码正则
            pwCheckAgain(){
                if(this.pwTxtAgain){
                    if(/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{7,25}$/.test(this.pwTxtAgain)){
                        if(this.pwTxtAgain==this.pwTxt){
                            this.pwTipAgain='.'
                            this.stateb=true
                        }else{
                            this.pwTipAgain='两次输入密码不一致'
                            this.stateb=false
                        }
                    }else{
                        this.pwTipAgain='密码格式不正确'
                        this.stateb=false
                    }
                }else{
                    this.pwTipAgain='请输入密码'
                    this.stateb=false
                }
            },
            //跳转
            link(){
                console.log('验证')
                if(this.statea&&this.stateb){
                    this.$router.replace('/setsuccess')
            }else{
                console.log('密码不正确')
                }
            }

        }
    }
</script>
<style scoped>
    @import "../assets/css/resetpw.css";
</style>