<template>
    <!--找回密码-->
    <div class="container content-wrap">
        <div class="p container"><span>首页</span>&gt;<span>找回密码</span></div>
        <!--验证码验证-->
        <div class="col-sm-9 col-xs-12 find">
            <h2 class="title">找回密码</h2>
            <!--找回密码流程-->
            <div class="container-fluid flow">
                <div class="step13">
                    <p>1</p>
                    <p>选择找回方式</p>
                </div>
                <div class="step13">
                    <p>2</p>
                    <p>确认验证消息</p>
                </div>
                <div class="step15">
                    <p>3</p>
                    <p>修改信息</p></div>
                <div class="step16">
                    <p>4</p>
                    <p>修改密码成功</p>
                </div>
            </div>
            <!--返回登录-->
            <div class="return">
                <p>您的密码已经修改成功，请重新登录</p>
                <button type="button" @click="returnLogin">返回登录</button>
            </div>
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
        name:'setsuccess',
        data(){
            return{

            }
        },
        methods:{
            returnLogin(){
                this.$router.push({name:'lg'})
            }
        }
    }
</script>
<style scoped>
    @import "../assets/css/setsuccess.css";
</style>