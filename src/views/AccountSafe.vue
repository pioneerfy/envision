<template>
    <div class="sbody">
        <div class="content">
            <div class="wrap">
                <h1>账户安全</h1>
                <div class="form">
                    <div class="safe">
                        <span class="safelevel">安全等级</span>
                        <el-progress :percentage="safeLine" :color="safeColor" :show-text=false :stroke-width="10" class="bar"></el-progress>
                        <span class="safeMsg" :style="{color:safeColor}">{{safeMsg}}</span>
                    </div>
                    <div class="group clearFix">
                        <div class="group-l fl">
                            <div class="iconfont icon-password"></div>
                            <div class="group-name">
                                <h3>账号密码</h3>
                                <p>用于保护帐号信息和登录安全</p>
                            </div>
                        </div>
                        <div class="group-r fr">
                            <div id="pwd-btn" class="group-btn" @click="pwdDialogVisible=true">
                                修改
                            </div>
                        </div>
                    </div>
                    <div class="group clearFix">
                        <div class="group-l fl">
                            <div class="iconfont icon-youxiang"></div>
                            <div class="group-name">
                                <h3>安全邮箱 <span id="safe-email">{{userEmailS}}</span></h3>
                                <p>用于登录帐号和重置密码<span id="email-msg" v-if="!userEmail"><i class="iconfont icon-gantanhao-yuankuang"></i>未绑定安全邮箱</span></p>
                            </div>
                        </div>
                        <div class="group-r fr">
                            <div  class="group-btn" v-show="userEmail" @click="emailDialogVisible=true">
                                修改
                            </div>
                            <div  class="group-btn" v-show="!userEmail" @click="emailDialogVisible=true">
                                绑定
                            </div>
                        </div>
                    </div>
                    <div class="group clearFix">
                        <div class="group-l fl">
                            <div class="iconfont icon-shouji"></div>
                            <div class="group-name">
                                <h3>密保手机 <span id="safe-tel">{{userTelS}}</span></h3>
                                <p>用于登录帐号和重置密码或其他安全验证</p>
                            </div>
                        </div>
                        <div class="group-r fr">
                            <div id="tel-btn" class="group-btn" @click="telDialogVisible=true">
                                修改
                            </div>
                        </div>
                    </div>
                    <div class="group clearFix">
                        <div class="group-l fl">
                            <div class="iconfont icon-zhifufangshi"></div>
                            <div class="group-name">
                                <h3>支付密码 </h3>
                                <p>用于支付订单时的密码<span id="zpwd-msg" v-if="isZpwd==0"><i class="iconfont icon-gantanhao-yuankuang"></i>未设置支付密码</span></p>
                            </div>
                        </div>
                        <div class="group-r fr">
                            <div  class="group-btn" v-if="isZpwd" @click="zpwdDialogVisible=true">
                                修改
                            </div>
                            <div  class="group-btn" v-if="!isZpwd" @click="zpwdDialogVisible=true">
                                设置
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--修改密码模态框-->
        <el-dialog
                title="修改密码"
                :visible.sync="pwdDialogVisible"
                width="30%"
                @close="closeDialog(pwdDialogActive==0?'pwdFormData':'pwdFormDataNew')">
            <div>
                <el-steps :active="pwdDialogActive" finish-status="success" align-center style="margin-bottom: 10px">
                    <el-step title="验证原密码"></el-step>
                    <el-step title="输入新密码"></el-step>
                </el-steps>
            </div>
            <div>
                <el-form ref="pwdFormData" :model="pwdFormData" status-icon :rules="pwdRules" label-width="80px" v-show="pwdDialogActive==0">
                    <el-form-item label="原密码" prop="oldPwd">
                        <el-input type='password' v-model="pwdFormData.oldPwd" autocomplete="off" placeholder="请输入原密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="oldPwdCheck">
                        <el-input type='password' v-model="pwdFormData.oldPwdCheck" autocomplete="off" placeholder="请再次输入原密码"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="imgCode">
                        <el-input v-model="pwdFormData.imgCode" style="width: 147px;float: left;" placeholder="图形验证码"></el-input>
                        <!--<div class="Verification" @click="clickVerification">-->
                            <!--<img :src="VerificationImg"/>-->
                        <!--</div>-->
                        <img-code @getCode="getImgCode"></img-code>
                    </el-form-item>
                </el-form>
                <el-form ref="pwdFormDataNew" :model="pwdFormDataNew" status-icon :rules="pwdRules" label-width="80px" v-show="pwdDialogActive==1">
                    <el-form-item label="新密码" prop="newPwd">
                        <el-input type='password' v-model="pwdFormDataNew.newPwd" autocomplete="off" placeholder="输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="newPwdCheck">
                        <el-input type='password' v-model="pwdFormDataNew.newPwdCheck" autocomplete="off" placeholder="请再次输入新密码"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer btn-wrap" v-show="pwdDialogActive==0">
                <button type="button" class="del-close" @click="closeDialog('pwdFormData')">关闭</button>
                <button type="button" class="del-sure"  @click="pwdNext('pwdFormData')">下一步</button>
            </span>
            <span slot="footer" class="dialog-footer btn-wrap" v-show="pwdDialogActive==1">
                <button type="button" class="del-close" @click="closeDialog('pwdFormDataNew')">关闭</button>
                <button type="button" class="del-sure" id="editPwd-save" @click="pwdFinish('pwdFormDataNew')">完成</button>
            </span>
        </el-dialog>
        <!--修改邮箱模态框-->
        <el-dialog
                title="绑定安全邮箱"
                :visible.sync="emailDialogVisible"
                width="30%"
                @close="closeDialog('emailFormData')">
            <div>
                <el-steps :active="emailDialogActive" finish-status="success" align-center style="margin-bottom: 10px">
                    <el-step title="确认身份"></el-step>
                    <el-step title="邮箱验证"></el-step>
                </el-steps>
            </div>
            <div>
                <el-form ref="emailFormData" :model="emailFormData" label-width="80px" status-icon :rules="emailRules" v-show="emailDialogActive==0">
                    <h3 style="text-align: center;margin-bottom: 20px">为了确认身份，请使用安全手机{{userTelS}}<br>获取验证码短信</h3>
                    <el-form-item label="验证码" prop="code">
                        <el-input  v-model="emailFormData.code" autocomplete="off"  style="width: 157px;float: left;" placeholder="短信验证码"></el-input>
                        <button class="send-tel-btn" @click="sendCode" :disabled="isSendCode" :class="{isSendCodeCSS:isSendCode}">{{sendCodeText}}</button>
                    </el-form-item>
                </el-form>
                <el-form ref="emailFormDataNew" :model="emailFormDataNew" status-icon :rules="emailRules2" label-width="80px" v-show="emailDialogActive==1">
                    <h3 style="text-align: center;margin-bottom: 20px">请输入邮箱号，点击下一步<br>我们将向您的邮箱发送验证邮件</h3>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="emailFormDataNew.email"  placeholder="输入绑定的邮箱"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer btn-wrap" v-show="emailDialogActive==0">
                <button type="button" class="del-close" @click="closeDialog('emailFormData')">关闭</button>
                <button type="button" class="del-sure"  @click="emailNext('emailFormData')">下一步</button>
            </span>
            <span slot="footer" class="dialog-footer btn-wrap" v-show="emailDialogActive==1">
                <button type="button" class="del-close" @click="closeDialog('emailFormDataNew')">关闭</button>
                <button type="button" class="del-sure"  @click="emailFinish('emailFormDataNew')">下一步</button>
            </span>
        </el-dialog>
        <!--修改手机模态框-->
        <el-dialog
                title="修改安全手机"
                :visible.sync="telDialogVisible"
                width="30%"
                @close="closeDialog(telDialogActive==0?'telFormData':'telFormDataNew')">
            <div>
                <el-steps :active="telDialogActive" finish-status="success" align-center style="margin-bottom: 10px">
                    <el-step title="确认身份"></el-step>
                    <el-step title="手机验证"></el-step>
                </el-steps>
            </div>
            <div>
                <el-form ref="telFormData" :model="telFormData" status-icon :rules="telRules" label-width="80px" v-show="telDialogActive==0">
                    <h3 style="text-align: center;margin-bottom: 20px">为了确认身份，请使用安全手机{{userTelS}}<br>获取验证码短信</h3>
                    <el-form-item label="验证码" prop="code">
                        <el-input  v-model="telFormData.code" autocomplete="off"  style="width: 157px;float: left;" placeholder="短信验证码"></el-input>
                        <button class="send-tel-btn" @click="sendCode2" :disabled="isSendCode2" :class="{isSendCodeCSS:isSendCode2}">{{sendCodeText2}}</button>
                    </el-form-item>
                </el-form>
                <el-form ref="telFormDataNew" :model="telFormDataNew" status-icon :rules="telRules2" label-width="80px" v-show="telDialogActive==1">
                    <el-form-item label="新手机号" prop="tel">
                        <el-input v-model="telFormDataNew.tel" autocomplete="off" placeholder="输入新的绑定手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-input  v-model="telFormDataNew.code"  style="width: 157px;float: left;" placeholder="短信验证码"></el-input>
                        <button class="send-tel-btn" @click="sendCode3" :disabled="isSendCode3" :class="{isSendCodeCSS:isSendCode3}">{{sendCodeText3}}</button>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer btn-wrap" v-show="telDialogActive==0">
                <button type="button" class="del-close" @click="closeDialog('telFormData')">关闭</button>
                <button type="button" class="del-sure"  @click="telNext('telFormData')">下一步</button>
            </span>
            <span slot="footer" class="dialog-footer btn-wrap" v-show="telDialogActive==1">
                <button type="button" class="del-close" @click="closeDialog('telFormDataNew')">关闭</button>
                <button type="button" class="del-sure" @click="telFinish('telFormDataNew')">下一步</button>
            </span>
        </el-dialog>
        <!--修改支付密码模态框-->
        <el-dialog
                title="设置支付密码"
                :visible.sync="zpwdDialogVisible"
                width="30%"
                @close="closeDialog(zpwdDialogActive==0?'zpwdFormData':'zpwdFormDataNew')">
            <div>
                <el-steps :active="zpwdDialogActive" finish-status="success" align-center style="margin-bottom: 10px">
                    <el-step title="确认身份"></el-step>
                    <el-step title="修改密码"></el-step>
                </el-steps>
            </div>
            <div>
                <el-form ref="zpwdFormData" :model="zpwdFormData" status-icon :rules="zpwdRules" label-width="80px" v-show="zpwdDialogActive==0">
                    <h3 style="text-align: center;margin-bottom: 20px">为了确认身份，请使用安全手机{{userTelS}}<br>获取验证码短信</h3>
                    <el-form-item label="验证码" prop="code">
                        <el-input  v-model="zpwdFormData.code" autocomplete="off"  style="width: 157px;float: left;" placeholder="短信验证码"></el-input>
                        <button class="send-tel-btn" @click="sendCode4" :disabled="isSendCode4" :class="{isSendCodeCSS:isSendCode4}">{{sendCodeText4}}</button>
                    </el-form-item>
                </el-form>
                <el-form ref="zpwdFormDataNew" :model="zpwdFormDataNew" status-icon :rules="zpwdRules2" label-width="80px" v-show="zpwdDialogActive==1">

                    <el-form-item label="支付密码" prop="zpwd">
                        <el-input type='password' v-model="zpwdFormDataNew.zpwd" autocomplete="off" placeholder="输入支付密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="zpwdCheck">
                        <el-input type='password' v-model="zpwdFormDataNew.zpwdCheck" autocomplete="off" placeholder="请再次输入支付密码"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer btn-wrap" v-show="zpwdDialogActive==0">
                <button type="button" class="del-close" @click="closeDialog('zpwdFormData')">关闭</button>
                <button type="button" class="del-sure"  @click="zpwdNext('zpwdFormData')">下一步</button>
            </span>
            <span slot="footer" class="dialog-footer btn-wrap" v-show="zpwdDialogActive==1">
                <button type="button" class="del-close" @click="closeDialog('zpwdFormDataNew')">关闭</button>
                <button type="button" class="del-sure" @click="zpwdFinish('zpwdFormDataNew')">下一步</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import imgCode from '@/components/imgCode.vue'
    export default {
        name: "account-safe",
        created(){
            this.getSafeInfo()
        },
        data(){
            var validatePass = (rule, value, callback) => {
                let reg=/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{7,25}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(reg.test(this.pwdFormData.oldPwd)==false){
                    callback(new Error('至少包含字母、数字、特殊符号，长度7-25位'));
                } else {
                    if (this.pwdFormData.oldPwdCheck !== '') {
                        this.$refs.pwdFormData.validateField('oldPwdCheck');
                    }
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                let reg=/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{7,25}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(reg.test(this.pwdFormDataNew.newPwd)==false){
                    callback(new Error('至少包含字母、数字、特殊符号，长度7-25位'));
                } else {
                    if (this.pwdFormDataNew.newPwdCheck !== '') {
                        this.$refs.pwdFormDataNew.validateField('newPwdCheck');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.pwdFormData.oldPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass4 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.pwdFormDataNew.newPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validateZpwd = (rule, value, callback) => {
                let reg=/^\d{6}$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(reg.test(this.zpwdFormDataNew.zpwd)==false){
                    callback(new Error('只能为数字，且长度为6位'));
                } else {
                    if (this.zpwdFormDataNew.zpwdCheck !== '') {
                        this.$refs.zpwdFormDataNew.validateField('zpwdCheck');
                    }
                    callback();
                }
            };
            var validateZpwd2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.zpwdFormDataNew.zpwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            var validateEmail= (rule, value, callback) =>{
                let reg= /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                }else if(reg.test(this.emailFormDataNew.email)==false){
                    callback(new Error('邮箱格式不正确'));
                } else {
                    callback();
                }
            };
            var validateCode=(rule, value, callback) =>{
                if (value === '') {
                    callback(new Error('请输入验证码'));
                }else {
                    callback()
                }
            };
            var validateImgCode=(rule, value, callback) =>{
                if (value === '') {
                    callback(new Error('请输入验证码'));
                }else if (value !== this.identifyCode.toLowerCase()) {
                    console.log(this.identifyCode)
                    console.log('validateVerifycode:', value)
                    callback(new Error('验证码不正确!'))
                } else {
                    callback()
                }
            }
            var validateTel=(rule, value, callback) =>{
                let reg= /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
                if (value === '') {
                    callback(new Error('请输入手机号'));
                }else if(reg.test(this.telFormDataNew.tel)==false){
                    callback(new Error('手机号格式不正确'));
                } else {
                    callback();
                }
            }
            return{
                userEmail:'',
                userEmailS:'',
                userTel:'',
                userTelS:'',
                isZpwd:0,
                pwdDialogVisible: false,
                emailDialogVisible:false,
                telDialogVisible:false,
                zpwdDialogVisible:false,
                pwdDialogActive:0,
                emailDialogActive:0,
                telDialogActive:0,
                zpwdDialogActive:0,
                isSendCode:false,
                isSendCode2:false,
                isSendCode3:false,
                isSendCode4:false,
                sendCodeText:'发送验证码',
                sendCodeText2:'发送验证码',
                sendCodeText3:'发送验证码',
                sendCodeText4:'发送验证码',
                pwdFormData:{
                    oldPwd:'',
                    oldPwdCheck:'',
                    imgCode:''
                },
                pwdFormDataNew:{
                    newPwd:'',
                    newPwdCheck:''
                },
                emailFormData:{
                    code:''
                },
                emailFormDataNew:{
                    email:''
                },
                telFormData:{
                    code:''
                },
                telFormDataNew:{
                    tel:'',
                    code:''
                },
                zpwdFormData:{
                    code:''
                },
                zpwdFormDataNew:{
                    zpwd:'',
                    zpwdCheck:''
                },
                pwdRules: {
                    oldPwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    oldPwdCheck: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    imgCode:[
                        { validator: validateImgCode, trigger: 'blur' }
                    ],
                    newPwd:[
                        { validator: validatePass3, trigger: 'blur' }
                    ],
                    newPwdCheck:[
                        { validator: validatePass4, trigger: 'blur' }
                    ]
                },
                emailRules:{
                    code:[
                        { validator: validateCode, trigger: 'blur'}
                    ]
                },
                emailRules2:{
                    email:[
                        { validator: validateEmail, trigger: 'blur'}
                    ],
                },
                telRules: {
                    code: [
                        { validator: validateCode, trigger: 'blur'}
                    ]
                },
                telRules2: {
                    code: [
                        { validator: validateCode, trigger: 'blur'}
                    ],
                    tel:[
                        { validator: validateTel, trigger: 'blur'}
                    ]
                },
                zpwdRules:{
                    code:[
                        { validator: validateCode, trigger: 'blur'}
                    ]
                },
                zpwdRules2: {
                    zpwd: [
                        { validator: validateZpwd, trigger: 'blur'}
                    ],
                    zpwdCheck:[
                        { validator: validateZpwd2, trigger: 'blur'}
                    ]
                },
                identifyCode:''
            }
        },
        components:{
            imgCode
        },
        computed:{
            safeLine(){
                console.log(this.isZpwd)
                if((this.userEmail!=null&&this.userEmail!='')&&this.isZpwd==1){
                    return 100
                }else if((this.userEmail!=null&&this.userEmail!='')||this.isZpwd==1){
                    return 60
                }else {
                    return 20
                }
            },
            safeColor(){
                if((this.userEmail!=null&&this.userEmail!='')&&this.isZpwd==1){
                    return '#8bc34a'
                }else if((this.userEmail!=null&&this.userEmail!='')||this.isZpwd==1){
                    return '#dece3d'
                }else {
                    return '#c92629'
                }
            },
            safeMsg(){
                if((this.userEmail!=null&&this.userEmail!='')&&this.isZpwd==1){
                    return '高'
                }else if((this.userEmail!=null&&this.userEmail!='')||this.isZpwd==1){
                    return '中'
                }else {
                    return '低'
                }
            }
        },
        methods:{
            clickVerification(){
                var num = Math.random();
                this.imgUrls(num)
            },
            imgUrls(num){
                this.VerificationImg="http://farming.wowocode.com:8081/captcha/new?height=40&width=160&font_size=20?"+num
            },
            pwdNext(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                        this.$http.post('/user/matchPwd.do',this.$qs.stringify({
                            uuid:uuid,
                            userPwd:this.pwdFormData.oldPwd
                        })).then((res)=>{
                            console.log(res)
                            if(res.data.returncode=="200") {
                                this.pwdDialogActive = 1
                                this.$refs[formName].resetFields();
                            }else {
                                this.$message({
                                    message: '原密码输入错误，请确认是否填写正确！',
                                    type: 'error'
                                });
                            }
                        }).catch((err)=>{
                            console.log(err)
                            this.$message({
                                message: '服务器错误！',
                                type: 'error'
                            });
                        })
                    } else {
                        this.$message({
                            message: '请确定信息填写正确！',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            pwdFinish(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                        this.$http.post('/user/editPwd.do',this.$qs.stringify({
                            uuid:uuid,
                            userPwd:this.pwdFormDataNew.newPwd
                        })).then((res)=>{
                            if(res.data.returncode=="200") {
                                this.closeDialog(formName)
                                this.$message({
                                    message: '密码修改成功，请重新登录！',
                                    type: 'success'
                                });
                                this.$router.push({name:'lg'})
                                localStorage.removeItem('userinfo')
                            }else {
                                this.$message({
                                    message: '密码修改失败！',
                                    type: 'error'
                                });
                            }
                        }).catch((err)=>{
                            console.log(err)
                            this.$message({
                                message: '服务器错误！',
                                type: 'error'
                            });
                        })
                    } else {
                        this.$message({
                            message: '请确定信息填写正确！',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            emailNext(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let uuid = JSON.parse(localStorage.getItem('userinfo')).uuid
                        this.$http.post('/matchCode.do',this.$qs.stringify({
                            uuid:uuid,
                            code: this.emailFormData.code,
                            userTelephone:this.userTel,
                        })).then((res) => {
                            if (res.data.returncode == "200") {
                                this.emailDialogActive = 1
                                this.$refs[formName].resetFields();
                                this.$message({
                                    message: '验证码输入正确！',
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: '验证码输入错误！',
                                    type: 'error'
                                });
                                this.$refs[formName].resetFields();
                            }
                        }).catch((err) => {
                            console.log(err)
                            this.$message({
                                message: '服务器错误！',
                                type: 'error'
                            });
                        })
                        // if(this.emailFormData.code=='1234'){
                        //     this.emailDialogActive = 1
                        //     this.$refs[formName].resetFields();
                        // }else {
                        //     this.$message({
                        //         message: '验证码输入错误！',
                        //         type: 'error'
                        //     });
                        //     this.$refs[formName].resetFields();
                        // }
                    } else {
                        return false
                    }
                })
            },
            emailFinish(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                        this.$http.post('/user/editEmail.do',this.$qs.stringify({
                            uuid:uuid,
                            userEmail:this.emailFormDataNew.email
                        })).then((res)=>{
                            if(res.data.returncode=="200") {
                                this.closeDialog(formName)
                                this.$message({
                                    message: '邮件发送成功，请去您的邮箱查看邮件，完成验证！',
                                    type: 'success'
                                });
                            }else {
                                this.$message({
                                    message: '邮件发送失败！',
                                    type: 'error'
                                });
                            }
                        }).catch((err)=>{
                            console.log(err)
                            this.$message({
                                message: '服务器错误！',
                                type: 'error'
                            });
                        })
                    } else {
                        this.$message({
                            message: '请确定信息填写正确！',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            telNext(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.telFormData.code)
                        let uuid = JSON.parse(localStorage.getItem('userinfo')).uuid
                        this.$http.post('/matchCode.do', this.$qs.stringify({
                            uuid:uuid,
                            code: this.telFormData.code,
                            userTelephone:this.userTel,
                        })).then((res) => {
                            if (res.data.returncode == "200") {
                                this.telDialogActive = 1
                                this.$refs[formName].resetFields();
                                this.$message({
                                    message: '验证码输入正确！',
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: '验证码输入错误！',
                                    type: 'error'
                                });
                                this.$refs[formName].resetFields();
                            }
                        }).catch((err) => {
                            console.log(err)
                            this.$message({
                                message: '服务器错误！',
                                type: 'error'
                            });
                        })
                    } else {
                        return false
                    }
                })
            },
            telFinish(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let uuid = JSON.parse(localStorage.getItem('userinfo')).uuid
                        this.$http.post('/matchCode.do', this.$qs.stringify({
                            uuid:uuid,
                            code: this.telFormDataNew.code,
                            userTelephone:this.telFormDataNew.tel
                        })).then((res) => {
                            if (res.data.returncode == "200") {
                                this.closeDialog(formName)
                                this.getSafeInfo()
                                this.$message({
                                    message: '安全手机修改成功！',
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: '验证码输入错误！',
                                    type: 'error'
                                });
                                this.$refs[formName].resetFields();
                            }
                        }).catch((err) => {
                            console.log(err)
                            this.$message({
                                message: '服务器错误！',
                                type: 'error'
                            });
                        })
                    } else {
                        return false
                    }
                })
            },
            zpwdFinish(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let uuid = JSON.parse(localStorage.getItem('userinfo')).uuid
                        this.$http.post('/user/editZpwd.do', this.$qs.stringify({
                            uuid:uuid,
                            newPwd: this.zpwdFormDataNew.zpwd
                        })).then((res) => {
                            console.log(res)
                            if (res.data.returncode == "200") {
                                this.closeDialog(formName)
                                this.$message({
                                    message: '支付密码修改成功！',
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: '支付密码修改失败！',
                                    type: 'error'
                                });
                                this.$refs[formName].resetFields();
                            }
                        }).catch((err) => {
                            console.log(err)
                            this.$message({
                                message: '服务器错误！',
                                type: 'error'
                            });
                        })
                    } else {
                        return false
                    }
                })
            },
            zpwdNext(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let uuid = JSON.parse(localStorage.getItem('userinfo')).uuid
                        this.$http.post('/matchCode.do', this.$qs.stringify({
                            uuid:uuid,
                            code: this.zpwdFormData.code,
                            userTelephone:this.userTel
                        })).then((res) => {
                            if (res.data.returncode == "200") {
                                this.zpwdDialogActive = 1
                                this.$refs[formName].resetFields();
                                this.$message({
                                    message: '验证码输入正确！',
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: '验证码输入错误！',
                                    type: 'error'
                                });
                                this.$refs[formName].resetFields();
                            }
                        }).catch((err) => {
                            console.log(err)
                            this.$message({
                                message: '服务器错误！',
                                type: 'error'
                            });
                        })
                    } else {
                        return false
                    }
                })
            },
            closeDialog(formName){
                this.pwdDialogVisible = false
                this.pwdDialogActive=0
                this.emailDialogVisible=false
                this.emailDialogActive=0
                this.telDialogVisible=false
                this.telDialogActive=0
                this.zpwdDialogVisible=false
                this.zpwdDialogActive=0
                this.$refs[formName].resetFields()
            },
            sendCode(){
                this.isSendCode=true
                let seconds=60;
                let that=this
                let timer=setInterval(function () {
                    seconds--;
                    that.sendCodeText='发送验证码('+seconds+')'
                    if(seconds==0){
                        clearInterval(timer);
                        that.sendCodeText='发送验证码'
                        that.isSendCode=false
                    }
                },1000);
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/sendCode.do',this.$qs.stringify({
                    uuid:uuid,
                    userTelephone:this.userTel
                })).then((res)=>{
                    if(res.data.returncode=="200") {
                        this.$message({
                            message: '发送短信验证码成功！',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: '发送短信验证码失败！',
                            type: 'error'
                        });
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            sendCode2(){
                this.isSendCode2=true
                let seconds=60;
                let that=this
                let timer=setInterval(function () {
                    seconds--;
                    that.sendCodeText2='发送验证码('+seconds+')'
                    if(seconds==0){
                        clearInterval(timer);
                        that.sendCodeText2='发送验证码'
                        that.isSendCode2=false
                    }
                },1000);
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/sendCode.do',this.$qs.stringify({
                    uuid:uuid,
                    userTelephone:this.userTel
                })).then((res)=>{
                    if(res.data.returncode=="200") {
                        this.$message({
                            message: '发送短信验证码成功！',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: '发送短信验证码失败！',
                            type: 'error'
                        });
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            sendCode3(){
                this.isSendCode3=true
                let seconds=60;
                let that=this
                let timer=setInterval(function () {
                    seconds--;
                    that.sendCodeText3='发送验证码('+seconds+')'
                    if(seconds==0){
                        clearInterval(timer);
                        that.sendCodeText3='发送验证码'
                        that.isSendCode3=false
                    }
                },1000);
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/sendCode.do',this.$qs.stringify({
                    uuid:uuid,
                    userTelephone:this.telFormDataNew.tel
                })).then((res)=>{
                    if(res.data.returncode=="200") {
                        this.$message({
                            message: '发送短信验证码成功！',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: '发送短信验证码失败！',
                            type: 'error'
                        });
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            sendCode4(){
                this.isSendCode4=true
                let seconds=60;
                let that=this
                let timer=setInterval(function () {
                    seconds--;
                    that.sendCodeText4='发送验证码('+seconds+')'
                    if(seconds==0){
                        clearInterval(timer);
                        that.sendCodeText4='发送验证码'
                        that.isSendCode4=false
                    }
                },1000);
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/sendCode.do',this.$qs.stringify({
                    uuid:uuid,
                    userTelephone:this.userTel
                })).then((res)=>{
                    if(res.data.returncode=="200") {
                        this.$message({
                            message: '发送短信验证码成功！',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: '发送短信验证码失败！',
                            type: 'error'
                        });
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            getImgCode(data){
                this.identifyCode=data
            },
            getSafeInfo(){
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                console.log('uuid:',uuid)
                this.$http.post('/user/getSafeInfo.do',this.$qs.stringify({
                    uuid:uuid
                })).then((res)=>{
                    console.log('账户安全',res)
                    let safeEmail=res.data.data[0].user_email
                    let safeTel=res.data.data[0].user_telephone
                    this.isZpwd=res.data.data[0].zpwd
                    console.log(safeEmail)
                    if(safeEmail!=''&&safeEmail!=null) {
                        this.userEmail=safeEmail
                        let safe_emailarr = safeEmail.split('');
                        for (let i = 3; i < safe_emailarr.length - 3; i++) {
                            safe_emailarr[i] = '*';
                        }
                        this.userEmailS=safe_emailarr.join('');
                    }
                    if(safeTel!=''&&safeTel!=null){
                        this.userTel=safeTel
                        let safe_telarr = safeTel.split('');
                        for (let i = 3; i < safe_telarr.length - 3; i++) {
                            safe_telarr[i] = '*';
                        }
                        this.userTelS=safe_telarr.join('');
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },

        mounted() {
            this.imgUrls(0.1)
        }
    }
</script>

<style scoped>
    @import '../assets/fonts/fonts-s/iconfont.css';
    .sbody .content{
        padding-bottom: 0;
    }
    .sbody .form{
        padding-bottom: 0;
    }
    .content{
        padding: 20px 0px;
    }
    .wrap{
        padding: 0 80px;
    }
    .content h1{
        font-size: 24px;
        font-weight: bold;
        border-bottom: 1px solid #BBBBBB;
        padding-bottom: 30px;
    }
    .group-l>.iconfont{
        display: inline-block;
        font-size: 40px;
    }
    .group{
        border-bottom: .5px solid #eaeaea;
        padding: 30px 0;
    }
    .group-name{
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
    }
    h3{
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
    }
    .group-name p{
        font-size: 14px;
        color: #888;
    }
    /*按钮样式*/
    .group-btn{
        display: inline-block;
        padding: 8px 20px;
        width: 120px;
        text-align: center;
        border-radius: 5px;
        background-color: white;
        cursor: pointer;
        transition: all .2s;
        border: 1px solid #cccccc;
        margin-left: 10px;
        position: relative;
        z-index: 1;
        color: black;
    }
    .group-btn:before{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 100%;
        background-color: #111;
        z-index: -1;
        transition: all 0.5s ease;
        border-radius: 5px;
    }
    .group-btn:hover{
        color: white;
    }
    .group-btn:hover:before{
        width: 100%;
    }
    #email-msg,#zpwd-msg{
        display: inline-block;
        color: red;
        margin-left: 20px;
        opacity: 1;
        width: 163px;
        font-size: 14px;
    }
    /*修改密码模态框*/
    .edit-pwd-panel,.edit-email-panel,.edit-tel-panel,.edit-zpwd-panel{
        position: fixed;
        background-color: #f5f5f5;
        left: calc(50% - 205px);
        top:-500px;
        z-index: 6;
        padding: 10px 15px;
        border-radius: 5px;
        visibility: hidden;
        transition: all .3s;
    }
    .del-top{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #bbbbbb;
    }
    .del-h{
        float: left;
        font-weight: 600;
    }
    .close{
        float: right;
        font-size: 12px!important;
        vertical-align: middle;
        cursor: pointer;
    }
    .del-p{
        margin: 30px 0;
    }
    .btn-wrap button{
        padding: 6px 25px;
        border: none;
        outline: none;
        background-color: #000;
        color: #FFFFFF;
        border-radius: 5px;
        cursor: pointer;
    }
    .btn-wrap button:nth-child(1){
        margin-right: 15px;
    }
    .btn-wrap .del-close{
        background-color: #FFFFFF;
        color: #000;
        border: 1px solid #cccccc;
    }
    .btn-wrap .del-sure:hover{
        background-color: #333333;
    }
    .btn-wrap .del-close:hover{
        background-color: #e9e9e9;
    }
    .mask{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(44, 44, 44, 0.55);
        z-index: 4;
        display: none;
    }
    .modal-con{
        padding: 30px 40px;
    }
    .modal-con input[type=text],.modal-con input[type=password]{
        display: block;
        height: 34px;
        padding: 6px 12px;
        width: 330px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 10px;
    }

    #codeImgInput{
        display: inline-block;
        width: 120px;
        margin-bottom: 10px;
    }
    #getImgCode{
        display: inline-block;
        width: 200px;
        height: 34px;
        vertical-align: top;
        margin-left: 10px;
    }
    .btn-wrap{
        text-align: center;
    }
    .msg{
        color: red;
        font-size: 14px;
        margin-bottom: 10px;
        visibility: hidden;
        width: 330px;
    }
    #send-email-btn,.send-tel-btn,#send-zpwd-btn{
        float: right;
        display: inline-block;
        width: 130px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        border-radius: 5px;
        background-color: #111111;
        color: white;
        cursor: pointer;
        transition: all .2s;
        border: 1px solid #cccccc;
        font-size: 12px;
        margin-right: 20px;
    }
    .isSendCodeCSS{
        background-color: #888;
    }
    #user_email,#codeTelInput,#codeZpwdInput{
        display: inline-block;
        width: 200px;
        margin-right: 10px;
    }
    #codeTelInput,#codeZpwdInput{
        width: 180px;
    }
    #send-tel-btn,#send-zpwd-btn{
        width: 140px;
    }
    .icon-ok,.icon-gantanhao-yuankuang{
        font-size: 14px;
    }
    h3 span{
        color: green;
    }
    /*进度条*/
    .bar{
        width: 85%;
        display: inline-block;
    }
    .safelevel{
        font-size: 16px;
        font-weight: bold;
        margin-right: 10px;
    }
    .safeMsg{
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
    }
    .safe{
        padding: 10px 0;
    }
</style>