<template>
    <div>
        <Head />

        <div class="ques">
            <span id="search-keyword">如何登陆/注册</span>
        </div>
        <section class="txt-wrap">
            <div class="ques-wrap">
                <div>
                    <h2 class="h2">如何创建账户？</h2>
                    <p class="txt">您可以建立您的易美逊账户，请点击位于网站上方选单栏内的“我的账户”一栏。然后点击“建立账户”，并在标有星号的必填栏内提供所有必要信息。最后点击“确认”。 您在建立账户时提供的电子邮箱将收到一封确认邮件或者是手机号码将收到一条确认短信。您若需要帮助或希望了解更多信息，请联系致电客服部门。
                        <span class="phone-num">400-800-5678</span>
                    </p>
                </div>
                <div>
                    <h2 class="h2">创建账户有和便利？</h2>
                    <p class="txt">
                            在易美逊上创建账户后，当您在网上精品店购物时，品牌能够即刻识别您的身份。<br>
                            您还可以：<br>
                            - 查阅订单记录<br>
                            - 关注订单进展<br>
                            - 更换或退回商品<br>
                            - 更新您的个人信息<br>
                            <br>
                            为了确保数据安全，易美逊不会保存您的银行卡信息，且在任何情况下都不会与第三方分享您的个人信息。
                    </p>
                </div>
                <div>
                    <h2 class="h2">我能修改或删除在易美逊上创建的账户吗？</h2>
                    <p class="txt">您可以通过"我的账户"一栏，更改易美逊账户信息。输入您的用户名和密码，登录后，访问"我的个人信息"一栏，
                    更改或删除信息。您若希望删除账户，请联系品牌客户服务部门，品牌顾问将陪伴您完成后续步骤。</p>
                </div>
                <div>
                    <h2 class="h2">如何取回我的账户密码？</h2>
                    <p class="txt">您若忘记密码，请点击"我的账户"一栏，然后再点击"忘记密码"。您将收到一封重置密码的电子邮件或短信验证。</p>
                </div>
            </div>
        </section>

        <Foot></Foot>
    </div>
</template>

<style scoped>
.ques {
    height: 80px;
    padding: 18px 60px;
    border-top: 2px solid #cccccc;
    border-bottom: 2px solid #cccccc;
    font-size: 28px;
    font-weight: 500;
}
#search-keyword {
    display: block;
    float: left;
}

.txt-wrap {
    margin-top: 120px;
    margin-bottom: 90px;
    text-align: center;
}
.ques-wrap {
    width: 1170px;
    display: inline-block;
}

.h2 {
    font-size: 24px;
    font-weight: 500;
    text-align: left;
    margin-bottom: 40px;
}
.txt {
    width: 850px;
    text-align: left;
    font-size: 16px;
    line-height: 1.5em;
    margin-bottom: 70px;
    margin-left: 40px;
}
</style>

<script>
import Head from '../components/head.vue'
import Foot from '../components/foot.vue'
export default {
    name: 'staticLoginReg',
    components: {
        Head,
        Foot
    }
}
</script>
