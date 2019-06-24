<template>
    <div>
        <el-form v-show="showUser" :model="ruleForm" status-icon :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
            <!-- 密码登录 -->
            <div class="one">
                <!-- 用户名 -->
                <el-form-item class="userTop" prop="phoneEmail">
                    <el-input type="text" class="userInput" placeholder="请输入邮箱地址或手机号" v-model="ruleForm.phoneEmail" autocomplete="off"></el-input>
                    <span class="iconfont icon-person"></span>
                    <!--<div class="userBottom"></div>-->
                </el-form-item>
                <!-- 密码 -->
                <el-form-item class="passTop" prop="pass">
                    <el-input :type="passwordType" class="passInput" placeholder="密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    <span class="iconfont icon-password1"></span>
                    <!--<i class="el-icon-view el-input__icon" :style="fontstyle" slot="suffix" @click="showPassword"></i>-->
                    <!--<i slot="prefix" class="icon-mima"></i>-->
                    <!--<div class="passBottom"></div>-->
                </el-form-item>
                <!-- 图形验证码 -->
                <el-form-item class="passTop code" prop="imgCode">
                    <el-input type="text" class="phoneInput" placeholder="输入图形验证码" v-model="ruleForm.imgCode" autocomplete="off"></el-input>
                    <span class="iconfont icon-yanzhengmashibie icon-yanzhengmashibie2"></span>
                    <!--<canvas width="125px" height="46px" id="getImgCode" style="background: #111111;"></canvas>-->
                    <!--<input type="button" v-model="codeText" class="getPhoneCode" @click="getCode" :disabled="codeState">-->
                    <ImgCode :identifyCode="identifyCode" @refreshCode="refreshCode"/>
                </el-form-item>
                <!-- 注册-忘记 -->
                <div class="remember clear">
                    <div class="checkPass">
                        <div class="checkContent">
                            <router-link to="/rg">免费注册</router-link>
                        </div>
                    </div>
                    <div class="forgetPass"><a href="/findway">忘记密码</a></div>
                </div>
            </div>
            <!-- 点击登录 -->
            <el-form-item class="loginOk">
                <!--<button type="button" id="loginBtn" @click="login">登录</button>-->
                <el-button type="button" id="submitBtn1" @click="login('ruleForm1')">登录</el-button>
            </el-form-item>
        </el-form>
        <el-form v-show="showPhone" :model="ruleForm" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <!-- 手机验证登录 -->
            <div class="two">
                <!-- 手机号 -->
                <el-form-item class="userTop" prop="phone">
                    <el-input type="text" class="numberInput" placeholder="请输入手机号" v-model="ruleForm.phone" autocomplete="off"></el-input>
                    <span class="iconfont icon-phone"></span>
                    <!--<div class="phoneBottom" id="phoneBottom">&lt;!&ndash; 请输入手机号 &ndash;&gt;</div>-->
                </el-form-item>
                <!-- 手机验证码 -->
                <el-form-item class="passTop code" prop="phoneCode">
                    <el-input type="text" class="phoneInput" placeholder="输入手机验证码" name="phoneInput" v-model="ruleForm.phoneCode" autocomplete="off"></el-input>
                    <span class="iconfont icon-yanzhengmashibie"></span>
                    <input type="button" v-model="codeText" class="getPhoneCode" @click="getCode" :disabled="codeState">
                </el-form-item>
            </div>
            <!-- 点击登录 -->
            <el-form-item class="loginOk">
                <!--<button type="button" id="loginBtn" @click="login">登录</button>-->
                <el-button type="button" id="submitBtn2" @click="login('ruleForm2')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import ImgCode from "./imgCode";
    export default {
        name: "loginForm",
        components: {ImgCode},
        props: ['showUser','showPhone'],
        data() {
            // 图形验证码
            let validateVerifycode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输图形入验证码'))
                } else if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
                    callback(new Error('图形验证码不正确!'))
                } else {
                    callback()
                }
            };
            // 手机验证码
            let validatePhonecode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机验证码'))
                } else {
                    callback()
                }
            };
            //手机号码是否注册---格式
            let validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'))
                } else if (!this.reg.test(value)){
                    callback(new Error('手机号码格式不正确!'))
                } else {
                    // 检验手机号是否注册
                    this.$http.post('/checkphone.do', this.$qs.stringify({
                        userTelephone: value
                    }))
                    .then((res) => {
                        console.log(res.data.returncode)
                        if (res.data.returncode === '200') {
                            callback();
                            // this.$message({
                            //     message: '该手机号码已被注册',
                            //     type: 'warning',
                            //     duration: 1000
                            // });
                        } else {
                            callback(new Error('该手机号码未被注册'))
                        }
                    })
                    .catch(err => {
                        this.$message({
                            message: '查询手机是否注册失败',
                            type: 'warning',
                            duration: 1000
                        });
                        console.log('查询手机是否注册失败',err)
                    })
                }
            };
            // 数据
            return {
                fontstyle: {},
                codeText: '获取验证码',
                codeState: false,
                count: 60,
                checked: false,
                identifyCodes: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345789',
                identifyCode: '', // 图形验证码
                ruleForm: {
                    phoneEmail: '',
                    imgCode: '',
                    pass: '',
                    phoneCode: '',
                    phone: '',
                },
                rules: {
                    pass: [
                        {required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    phoneEmail: [
                        {required:true, message: '请输入手机号或邮箱地址', trigger: 'blur'}
                    ],
                    phone: [
                        {required:true, trigger: 'blur', validator: validatePhone }
                    ],
                    imgCode: [
                        { required: true, trigger: 'blur', validator: validateVerifycode }
                    ],
                    phoneCode: [
                        {required:true, trigger: 'blur', validator: validatePhonecode }
                    ]
                },
                passwordType: 'password',
                reg: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/
            }
        },
        methods: {
            userLogin() {
                console.log('密码登录');
                let data= {'userName':this.ruleForm.phoneEmail,'userPwd':this.ruleForm.pass};
                this.$http.post('/login1.do',this.$qs.stringify(data)).then((res)=>{
                    console.log('密码登录',res.data);
                    if (res.data.returncode === '200') {
                        let user={
                            'uuid': res.data.data[0].uuid,
                            'username': res.data.data[0].user_name,
                            'identity_id':res.data.data[0].identity_id
                        };
                        localStorage.setItem('userinfo',JSON.stringify(user));
                        // 使用 this.$router 对象
                        this.$message({
                            message: res.data.msg,
                            type: 'success',
                            duration: 1000
                        });
                        let that=this;
                        that.timer2=setTimeout(function () {
                            that.$router.push('/')
                        },1000)
                    } else {
                        this.$message({
                            message: '用户名或密码错误',
                            type: 'error',
                            duration: 1000
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$message({
                        message: '密码登录失败',
                        type: 'error',
                        duration: 1000
                    });
                })
            },
            codeLogin() {
                let data= this.$qs.stringify({'userTelephone':this.ruleForm.phone,'code':this.ruleForm.phoneCode});
                this.$http.post('/login2.do',data).then((res)=>{
                    console.log('验证码登录',res.data);
                    if (res.data.returncode === '200') {
                        console.log('用户');
                        let user={
                            'uuid': res.data.data[0].uuid,
                            'username': res.data.data[0].user_name,
                            'identity_id':res.data.data[0].identity_id
                        };
                        localStorage.setItem('userinfo',JSON.stringify(user));
                        // 使用 this.$router 对象
                        this.$message({
                            message: res.data.msg,
                            type: 'success',
                            duration: 1000
                        });
                        let that=this;
                        that.timer2=setTimeout(function () {
                            that.$router.push('/')
                        },1000)
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'error',
                            duration: 1000
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$message({
                        message: '验证码登录失败',
                        type: 'warning',
                        duration: 1000
                    });
                })
            },
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.showUser){
                            this.userLogin();
                        } else{
                            this.codeLogin();
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 通过改变input的type使密码可见
            showPassword() {
                this.fontstyle === '' ? (this.fontstyle = 'color: red') : (this.fontstyle = '') // 改变密码可见按钮颜色
                this.passwordType === ''
                    ? (this.passwordType = 'password')
                    : (this.passwordType = '')
            },
            /* 获取手机验证码 */
            getCode() {
                if(this.ruleForm.phone){
                    const reg=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                    if (reg.test(this.ruleForm.phone)) {
                        console.log('获取验证码');
                        this.$http.post('/getCode.do',this.$qs.stringify({
                            userTelephone: this.ruleForm.phone
                        })).then((res)=>{
                            console.log('获取验证码',res.data);
                            if (res.data.returncode === '200') {
                                this.$message({
                                    message: res.data.msg,  //发送成功
                                    type: 'success',
                                    duration: 1000
                                });
                                let that=this;
                                that.timer3=setInterval(function () {
                                    that.codeText=that.count+'s后获取';
                                    that.codeState=true;
                                    that.count--;
                                    if(that.count===-2){
                                        that.codeState=false;
                                        clearInterval(that.timer3);
                                        that.count=60;
                                        that.codeText='获取验证码';
                                    }
                                },1000);
                            } else {
                                this.$message({
                                    message: '获取验证码失败',
                                    type: 'warning',
                                    duration: 1000
                                });
                            }
                        })
                        .catch(err => {
                            console.log('获取验证码请求失败',err);
                        })
                    }else {
                        this.$message({
                        message: '手机号码格式错误',
                        type: 'warning',
                        duration: 1000
                    });
                    }
                }else {
                    this.$message({
                        message: '手机号码为空',
                        type: 'warning',
                        duration: 1000
                    });
                }
            },
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
        },
        beforeDestroy() {
            clearTimeout(this.timer1)
            clearTimeout(this.timer2)
            clearTimeout(this.timer3)
        },
        created() {
        },
        mounted() {
            this.identifyCode = '';
            this.makeCode(this.identifyCodes, 4)
        }
    }
</script>

<style>
    .userTop,.passTop{
        position: relative;
    }
    /* 输入框 */
    .lg .el-input{
        padding: 6px 10px 6px 40px!important;
        width: 300px!important;
        height: 46px!important;
        line-height: 32px!important;
        border-radius: 3px!important;
        border: 1px solid #cccccc!important;
        transition: all linear .2s!important;
        outline: none!important;
        color: #333333!important;
    }
    .lg .el-input__inner{
        padding: 0px 10px 0px 0px!important;
        width: 248px!important;
        height: 30px!important;
        line-height: 32px!important;
        border-radius: 3px!important;
        border: 0!important;
        transition: all linear .2s!important;
        outline: none!important;
        color: #333333!important;
    }
    input::placeholder{
        color: #cccccc;
    }
    .code .el-input{
        width: 170px !important;
    }
    .code .el-input__inner{
        width: 118px !important;
    }
    .getPhoneCode{
        padding: 6px 0px 6px 0px;
        line-height: 32px;
        border-radius: 3px;
        border: 1px solid #cccccc;
        transition: all linear .2s;
        outline: none;
        width: 125px;
        height: 46px;
        color: #ffffff;
        background-color: #111111;
        cursor: pointer;
        margin-left: 5px;
    }
    .lg #submitBtn1,#submitBtn2{
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
    .lg .el-input:hover{
        border: 1px solid #383838;
    }
    .getPhoneCode:hover,#submitBtn1:hover,#submitBtn2:hover{
        background-color: #222222;
    }
    .lg .el-form-item__content{
        margin-left: 0!important;
    }

    /* 密码强度 */
    .pwd-status{
        /*margin-top: -10px;*/
        margin-bottom: 14px;
        font-size: 0;
    }
    .pwd-status span{
        font-size: 16px;
        display: inline-block;
        width: 96px;
        background-color: #eeeeee;
        text-align: center;
        line-height: 20px;
    }
    .pwd-status span:not(:last-child){
        margin-left: 0;
        margin-right: 6px;
    }
    .lg .icon-person,.icon-password1,.icon-phone,.icon-yanzhengmashibie{
        position: absolute;
        left: 10px;
        bottom: 3px;
        color: #cccccc;
    }
    .lg .icon-yanzhengmashibie2{
        top: 3px;
        bottom: 0px;
    }
    .lg .imgInput,.phoneInput{
        float: left;
    }
    .lg .el-checkbox__label{
        font-size: 15px !important;
    }
    /* 记住密码 */
    .remember{
        height: 45px;
    }
    .checkPass{
        float: left;
        position: relative;
        color: #cccccc;
    }
    .checkContent a{
        color: #666666;
        transition: all linear .2s;
    }
    .forgetPass{
        float: right
    }
    #remember_name{
        visibility: hidden;
    }
    #remember_name +label{
        display: block;
        width: 20px;
        height: 20px;
        cursor: pointer;
        position: absolute;
        top: 2px;
        background: #333333;
    }

    #remember_name:checked +label::before {
        display: block;
        content: "\2714";
        text-align: center;
        font-size: 16px;
        color: #ffffff;
    }
    .rememberLabel{
        margin-left: 10px;
        color: #666666;
    }
    .forgetPass a{
        transition: all linear .2s;
        color: #666666;
    }
    .forgetPass a:hover,.checkContent a:hover{
        color: #333333;
    }
    .lg .identifybox{
        display: flex;
        justify-content: space-between;
        margin-top:7px;
    }
    .iconstyle{
        color:#409EFF;
    }
</style>