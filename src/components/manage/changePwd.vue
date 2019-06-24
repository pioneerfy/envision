<template>
    <div class="change-pwd">
        <!--头部-->
        <div class="top">
            <h1>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>修改密码</el-breadcrumb-item>
                </el-breadcrumb>
            </h1>
        </div>
        <!-- 步骤 -->
        <el-steps :active="index" align-center>
            <el-step title="手机验证" description=""></el-step>
            <el-step title="重置密码" description=""></el-step>
            <el-step title="修改成功" description=""></el-step>
        </el-steps>
        <!-- 内容1 -->
        <div v-if="stepVisible1">
            <el-form class="phone" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="当前用户" prop="phone">
                    <el-input type="text" disabled v-model="phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="phoneCode">
                    <el-input type="text" placeholder="请输入验证码" v-model="ruleForm.phoneCode" autocomplete="off"></el-input>
                </el-form-item>

                <div>
                    <slide-verify :l="42"
                                  :r="10"
                                  :w="400"
                                  :h="175"
                                  @success="onSuccess"
                                  @refresh="onRefresh"
                                  @fail="onFail"
                                  :slider-text="text"
                    ></slide-verify>
                    <!--<div style="padding-top: 10px" :class="{color: 'hasColor'}">{{msg}}</div>-->
                </div>

                <el-form-item class="step1">
                    <el-button type="primary" @click="step1('ruleForm')">下一步</el-button>
                    <el-button type="primary" @click="getCode()">{{codeText}}</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 内容2 -->
        <div v-if="stepVisible2">
            <el-form class="pass demo-ruleForm" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">

                <el-form-item label="原始密码" prop="oldPass">
                    <el-input type="password" placeholder="请输入原始密码" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" placeholder="请输入新密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" placeholder="请再次输入密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item class="step1">
                    <el-button type="primary" @click="step2('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 内容3 -->
        <div v-if="stepVisible3" class="success">
            <i class="el-icon-success"></i>修改成功,即将跳转登陆！
        </div>
    </div>
</template>

<script>
    export default {
        name: "changePwd",
        data() {
            // 手机验证码
            let validatePhonecode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机验证码'))
                } else {
                    callback()
                }
            };

            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!this.reg.test(value)){
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
                index: 1,
                count:60,
                msg: '',
                uuid: '92628a3fbd1044b2aa5c78ccbaf1e7f2',
                hasColor: false,
                text: '向右滑',
                stepVisible1: true,
                stepVisible2: false,
                stepVisible3: false,
                phone: '13990780790',
                // phone: localStorage.getItem('phone'),
                codeText: '获取验证码',
                reg: /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{7,25}$/,  // 至少包含字母、数字、特殊符号，长度7-25位
                ruleForm: {
                    phoneCode: '',
                    oldPass: '',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    phoneCode: [
                        {required:true, trigger: 'blur', validator: validatePhonecode }
                    ],
                    oldPass: [
                        { required: true, trigger: 'blur', message: '请输入原始密码'}
                    ],
                    pass: [
                        { required: true, trigger: 'blur',validator: validatePass }
                    ],
                    checkPass: [
                        { required: true, trigger: 'blur', validator: validatePass2 }
                    ],
                }
            }
        },
        methods: {
            onSuccess(){
                // this.msg = '验证成功'
                this.$message({
                    message: '图形验证成功',
                    type: 'success',
                    duration: 1000
                });
                this.hasColor=true
            },
            onFail(){
                // this.msg = '验证失败'
                this.$message({
                    message: '图形验证失败',
                    type: 'error',
                    duration: 1000
                });
                this.hasColor=false
            },
            onRefresh(){
                this.hasColor=false
            },
            /* 获取手机验证码 */
            getCode() {
                if(this.phone){
                    this.$http.post('/getCode.do',this.$qs.stringify({
                        userTelephone: this.phone
                    })).then((res)=>{
                        console.log('获取验证码',res.data);
                        if (res.data.returncode === '200') {
                            this.$message({
                                message: res.data.msg,  //发送成功
                                type: 'success',
                                duration: 1000
                            });
                            let that=this;
                            that.timer1=setInterval(function () {
                                that.codeText=that.count+'s后获取';
                                that.codeState=true;
                                that.count--;
                                if(that.count===-2){
                                    that.codeState=false;
                                    clearInterval(that.timer1);
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
                        message: '手机号码为空',
                        type: 'warning',
                        duration: 1000
                    });
                }
            },
            /* 第一步 */
            step1(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(!this.hasColor){
                            this.$message({
                                message: '请滑动验证',
                                type: 'warning',
                                duration: 1000
                            });
                        } else {
                            this.codeLogin();
                        }
                    } else {
                        this.hasColor=false;
                        this.$message({
                            message: '验证失败',
                            type: 'error',
                            duration: 1000
                        });
                        return false;
                    }
                });
            },
            codeLogin() {
                let data= this.$qs.stringify({'userTelephone':this.phone,'code':this.ruleForm.phoneCode});
                this.$http.post('/login2.do',data).then((res)=>{
                    if (res.data.returncode === '200') {
                        console.log('step1成功')
                        this.stepVisible1=false;
                        this.stepVisible2=true;
                        this.index=2
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
                        message: 'step1失败',
                        type: 'warning',
                        duration: 1000
                    });
                })
            },

            /* 第二步 */
            step2(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.change();
                    } else {
                        return false;
                    }
                });
            },
            change() {
                console.log(this.ruleForm.oldPass,this.uuid)
                this.$http.post('/user/matchPwd.do',this.$qs.stringify({
                    uuid:this.uuid,
                    userPwd:this.ruleForm.oldPass
                }))
                .then((res)=> {
                    console.log('旧密码匹配',res.data);
                    if (res.data.returncode==='200') {
                        console.log('旧密码匹配成功',res.data)
                        this.$http.post('/user/editPwd.do',this.$qs.stringify({
                            // userTelephone: this.ruleForm.phone,
                            uuid:this.uuid,
                            userPwd: this.ruleForm.pass
                        })).then((res)=>{
                            console.log('修改密码成功',res.data);
                            if (res.data.returncode === '200') {
                                this.stepVisible2=false;
                                this.stepVisible3=true;
                                this.index=3;
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                let that=this;
                                that.timer2=setTimeout(function () {
                                    that.$router.push({name:'manageLogin'});
                                },1000);
                            } else {
                                this.$message({
                                    message: '修改密码失败',
                                    type: 'warning',
                                    duration: 1000
                                });
                            }
                        })
                        .catch(err => {
                            console.log('修改密码请求失败',err);
                        })
                    }
                })
                .catch(err=>{
                    console.log('旧密码匹配请求失败',err)
                });
            }
        },
        beforeDestroy() {
            clearTimeout(this.timer1);
            clearTimeout(this.timer2);
        }
    }
</script>

<style scoped>
    .add .el-form-item__label{
        text-align: left!important;
    }
    .add .el-form-item__content{
        display: inline-block;
        width: 300px;
    }
    /*头部信息*/
    .change-pwd .top{
        width: 100%;
        height: 50px;
        border-bottom: #444444;
        line-height: 50px;
        background-color: #fff;
        padding-left: 15px;
        border-bottom: 1px solid #e6e6e6;
    }
    .change-pwd .top h1 .el-breadcrumb{
        line-height: 50px;
    }
    .change-pwd .el-breadcrumb{
        font-size: 16px;
    }
    /* 步骤 */
    .change-pwd .el-steps{
        padding: 50px 20px;
    }
    .change-pwd .el-input:hover{
        border: 0;
    }
    .phone,.pass{
        width: 400px;
        margin: 0 auto;
    }
    .step1{
        margin-top: 50px;
        text-align: center;
    }
    .color{
        color: red;
    }
    .success i{
        color: #67C23A;
        font-size: 60px!important;
        margin-right: 20px;
    }
    .success{
        text-align: center;
        padding-top: 80px;
        font-size: 45px!important;
    }
</style>