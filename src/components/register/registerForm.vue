<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="rgContent">
            <div class="warDiv"></div>
            <!-- 手机号 -->
            <el-form-item class="userTop" prop="phone">
                <el-input type="text" class="numberInput" placeholder="请输入手机号" v-model="ruleForm.phone" autocomplete="off"></el-input>
                <span class="iconfont icon-phone"></span>
            </el-form-item>
            <!-- 手机验证码 -->
            <el-form-item class="passTop code" prop="phoneCode">
                <el-input type="text" class="phoneInput" placeholder="输入手机验证码" name="phoneInput" v-model="ruleForm.phoneCode" autocomplete="off"></el-input>
                <span class="iconfont icon-yanzhengmashibie"></span>
                <input type="button" v-model="codeText" class="getPhoneCode" @click="getCode" :disabled="codeState">
            </el-form-item>
            <!-- 密码 -->
            <el-form-item class="passTop" prop="pass">
                <el-input type="password" class="passInput" placeholder="密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
                <span class="iconfont icon-password1"></span>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item class="passTop" prop="checkPass">
                <el-input type="password" class="passInput" placeholder="确认密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                <span class="iconfont icon-password1"></span>
            </el-form-item>
            <!-- 图形验证码 -->
            <el-form-item class="passTop code" prop="imgCode">
                <el-input type="text" class="phoneInput" placeholder="输入图形验证码" v-model="ruleForm.imgCode" autocomplete="off"></el-input>
                <span class="iconfont icon-yanzhengmashibie icon-yanzhengmashibie2"></span>
                <!--<canvas width="125px" height="46px" id="getImgCode" style="background: #111111;"></canvas>-->
                <!--<input type="button" v-model="codeText" class="getPhoneCode" @click="getCode" :disabled="codeState">-->
                <ImgCode :identifyCode="identifyCode" @refreshCode="refreshCode"/>
            </el-form-item>
            <!-- 同意条款 -->
            <!--<el-form-item prop="policy">
                <el-checkbox-group v-model="ruleForm.policy">
                    <el-checkbox label="我已阅读并接受条款：" name="policy"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>-->
        </div>
        <!-- 点击注册 -->
        <el-form-item class="registerOk">
            <el-button type="button" id="submitBtn" @click="register('ruleForm')">注册</el-button>
        </el-form-item>
    </el-form>
        <el-dialog
                title="注册协议"
                :visible.sync="dialogVisible"
                width="50%"
                :show-close="false">
            <p><strong style="font-weight: bolder">【审慎阅读】</strong>您在申请注册流程中点击同意前，应当认真阅读以下协议。请您务必审慎阅读、充分理解协议中相关条款内容，其中包括：</p>

            <p>1、与您约定免除或限制责任的条款；</p>

            <p>2、与您约定法律适用和管辖的条款；</p>

            <p>3、其他以粗体下划线标识的重要条款。</p>

            <p>如您对协议有任何疑问，可向平台客服咨询。</p><br>

            <p><strong style="font-weight: bolder">【特别提示】</strong>当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后，即表示您已充分阅读、理解并接受协议的全部内容。如您因平台服务与淘宝发生争议的，适用《淘宝平台服务协议》处理。如您在使用平台服务过程中与其他用户发生争议的，依您与其他用户达成的协议处理。</p>

            <p>阅读协议的过程中，如果您不同意相关协议或其中任何条款约定，您应立即停止注册程序。</p><br>

            <p><a href=""><strong style="font-weight: bolder">淘宝平台服务协议</strong></a></p>

            <p><a href=""><strong style="font-weight: bolder">隐私权政策</strong></a></p>

            <p><a href=""><strong style="font-weight: bolder">法律声明</strong></a></p>

            <p><a href=""><strong style="font-weight: bolder">支付宝及客户端服务协议</strong></a></p>
            <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="agree()">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    /*
    cnpm i js-md5 --save
    import md5 from 'js-md5';
    Vue.prototype.$md5 = md5;
    * */
    import ImgCode from "./imgCode";
    export default {
        name: "registerForm",
        components: {ImgCode},
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
            //手机号码是否注册---格式
            let checkPhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'))
                } else if (!this.phoneReg.test(value)){
                    callback(new Error('手机号码格式不正确!'))
                } else {
                    // 检验手机号是否注册
                    this.$http.post('/registercheck.do', this.$qs.stringify({
                        userTelephone: value
                    }))
                    .then((res) => {
                        if (res.data.returncode === '200') {
                            this.isExit=false; //手机号不存在
                            callback();
                            // this.$message({
                            //     message: '该手机号码已被注册',
                            //     type: 'warning',
                            //     duration: 1000
                            // });
                        } else {
                            callback(new Error('该手机号码已被注册'))
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
            // 手机验证码
            let checkPhoneCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                } else {
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!this.passReg.test(value)){
                    callback(new Error('至少包含字母、数字、特殊符号两种，长度7-25位'))
                }else {
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                dialogVisible: true,
                codeText: '获取验证码',
                codeState: false,
                isExit: true, // 手机号存在
                count: 60,
                identifyCodes: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345789',
                identifyCode: '', // 图形验证码
                passReg: /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{7,25}$/,  // 至少包含字母、数字、特殊符号，长度7-25位
                phoneReg: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/,
                ruleForm: {
                    phone: '',
                    phoneCode: '',
                    pass: '',
                    checkPass: '',
                    imgCode: '',
                    // policy: [],
                },
                rules: {
                    pass: [
                        { required: true, trigger: 'blur',validator: validatePass },
                        // { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true,validator: checkPhone, trigger: 'blur'}
                    ],
                    phoneCode: [
                        { required: true,validator: checkPhoneCode, trigger: 'blur'}
                    ],
                    imgCode: [
                        { required: true, trigger: 'blur', validator: validateVerifycode }
                    ],
                    // policy: [
                    //     { type: 'array', required: true, message: '请勾选', trigger: 'change' }
                    // ],
                }
            }
        },
        methods: {
            /* 获取手机验证码 */
            getCode() {
                if(this.ruleForm.phone){
                    if (this.phoneReg.test(this.ruleForm.phone)) {
                        if (!this.isExit){
                            console.log('获取验证码');
                            this.$http.post('/registerCode.do',this.$qs.stringify({
                                userTelephone: this.ruleForm.phone
                            })).then((res)=>{
                                console.log('获取验证码',res.data);
                                let that=this;
                                if (res.data.returncode === '200') {
                                    this.$message({
                                        message: res.data.msg,  //发送成功
                                        type: 'success',
                                        duration: 1000
                                    });
                                    that.timerCode=setInterval(function () {
                                        that.codeText=that.count+'s后获取';
                                        that.codeState=true;
                                        that.count--;
                                        if(that.count===-2){
                                            that.codeState=false;
                                            clearInterval(that.timerCode);
                                            that.codeText='获取验证码';
                                            that.count=60;
                                        }
                                    },1000);
                                    // this.identifyPhoneCode=res.data;  //获取到的手机验证码
                                } else {
                                    this.$message({
                                        message: '获取失败',
                                        type: 'warning',
                                        duration: 1000
                                    });
                                }
                            })
                            .catch(err => {
                                console.log('获取验证码请求失败',err);
                            })
                        } else {
                            this.$message({
                                message: '改手机号已被注册',
                                type: 'warning',
                                duration: 1000
                            });
                        }
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
            // 点击注册
            register(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.insertInfo();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 提交
            insertInfo() {
                let data={'userTelephone':this.ruleForm.phone,'userPwd':this.ruleForm.pass,'code':this.ruleForm.phoneCode}
                this.$http.post('/register.do',this.$qs.stringify(data)).then((res)=>{
                    console.log('注册',res.data);
                    if (res.data.returncode==='200') {
                        this.$message({
                            message: '注册成功,跳转是登录页面',
                            type: 'success',
                            duration: 1000
                        });
                        this.timerReg=setTimeout(function () {
                            this.$router.push({name:'lg'});
                        }.bind(this),1000)
                    }else {
                        this.$message({
                            message: '注册失败',
                            type: 'error',
                            duration: 1000
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$message({
                        message: '注册请求失败',
                        type: 'error',
                        duration: 1000
                    });
                })
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
            beforeDestroy() {
                clearTimeout(this.timerReg)
                clearTimeout(this.timerCode)
            },
            created() {
            },
            mounted() {
                this.identifyCode = '';
                this.makeCode(this.identifyCodes, 4)
            },
            agree() {
                this.dialogVisible = false;
                this.identifyCode = '';
                this.makeCode(this.identifyCodes, 4)
            },
            cancel() {
                this.dialogVisible = false;
                this.$router.push({name:'lg'});
            }
        }
    }
</script>

<style>
    /* 警告框 */
    .warDiv{
        margin-top: 16px;
        min-height: 19px;
        margin-bottom: 5px;
        line-height: 1.5;
        display: block;
        width: 500px;
        float: right;
        transition: all linear .2s;
    }
    .rg form{
        width: 360px !important;
        height: auto !important;
    }
    .rgContent,.registerOk{
        padding: 0 30px 0 30px;
    }
    .userTop,.passTop{
        position: relative;
    }
    /* 输入框 */
    .rg .el-input{
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
    .rg .el-input__inner{
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
    .getPhoneCode,.getImgCode{
        transition: all linear .2s;
        outline: none;
        width: 125px;
        height: 46px;
        cursor: pointer;
        margin-left: 5px;
    }
    .getPhoneCode{
        border-radius: 3px;
        border: 1px solid #cccccc;
        line-height: 32px;
        padding: 6px 0 6px 0;
        color: #ffffff;
        background-color: #111111;
    }
    .getPhoneCode{
        padding: 0;
    }
    #submitBtn{
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
    .rg  .el-input:hover{
        border: 1px solid #383838;
    }
    .getPhoneCode:hover,#submitBtn:hover{
        background-color: #222222;
    }
    .rg .el-form-item__content{
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
    .rg .icon-password1,.icon-phone,.icon-yanzhengmashibie{
        position: absolute;
        left: 10px;
        bottom: 3px;
        color: #cccccc;
    }
    .rg .icon-yanzhengmashibie2{
        top: 3px;
        bottom: 0px;
    }
    .rg .imgInput,.phoneInput{
        float: left;
    }
    .rg .el-checkbox__label{
        font-size: 15px !important;
    }
</style>