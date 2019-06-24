<template>
    <div class="sbody">
        <div class="content">
            <div class="wrap">
                <h1>个人资料</h1>
                <div class="form clearFix">
                    <div class="head fl">
                        <form id="headForm" enctype="multipart/form-data">
                            <div id="head" :style="{backgroundImage: 'url('+ url + headImgUrl + ')'}"></div>
                            <label for="edit-head">
                                <input type="file" name="edit-head" id="edit-head" accept="image/*" @change="changeImage($event)">
                                <div id="edit-head-btn">设置头像</div>
                            </label>
                        </form>
                    </div>
                    <div class="personInfo fr">
                        <el-form ref="infoFormdata" :model="infoFormdata" status-icon :rules="infoRules" style="width: 403px" :inline-message=true>
                                <el-form-item label="姓名" prop="rname">
                                    <el-input type="text" id="user_rname" name="user_rname" v-model="infoFormdata.rname" autocomplete="off" style="width: 220px;float: left" placeholder="真实姓名"></el-input>
                                </el-form-item>
                                <!--<label class="label">真实姓名：</label><el-input type="text" id="user_rname" name="user_rname" v-model="name"><span id="rname_msg" :class="{op:vali}"><i class="iconfont icon-gantanhao-yuankuang"></i>{{nameMsg}}</span>-->
                            <el-form-item label="性别" prop="sex">
                                <div class="radios" id="user-sex">
                                    <div>
                                        <input id="user-sex-male" type="radio" name="user-sex" v-model="radio" value="男">
                                        <label for="user-sex-male"></label>
                                        <span style="margin-left: 15px;margin-right: 10px">男</span>
                                    </div>
                                    <div>
                                        <input id="user-sex-female" type="radio" name="user-sex" v-model="radio" value="女" checked>
                                        <label for="user-sex-female"></label>
                                        <span style="margin-left: 15px">女</span>
                                    </div>
                                </div>
                            </el-form-item>
                                <!--<label class="label">性别</label>-->
                                <!--<div class="radios" id="user-sex">-->
                                    <!--<div>-->
                                        <!--<input id="user-sex-male" type="radio" name="user-sex" v-model="radio" value="男">-->
                                        <!--<label for="user-sex-male"></label>-->
                                        <!--<span style="margin-left: 15px;margin-right: 10px">男</span>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<input id="user-sex-female" type="radio" name="user-sex" v-model="radio" value="女" checked>-->
                                        <!--<label for="user-sex-female"></label>-->
                                        <!--<span style="margin-left: 15px">女</span>-->
                                    <!--</div>-->
                                <!--</div>-->
                                    <el-form-item label="生日" prop="brithday">
                                        <el-date-picker
                                                v-model="infoFormdata.brithday"
                                                type="date"
                                                value-format="yyyy-MM-dd"
                                                placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <!--<span class="demonstration">生日：</span>-->
                                    <!--<el-date-picker-->
                                            <!--v-model="value"-->
                                            <!--type="date"-->
                                            <!--value-format="yyyy-MM-dd"-->
                                            <!--placeholder="选择日期">-->
                                    <!--</el-date-picker>-->
                        </el-form>
                        <div class="clearFix">
                            <button id="edit_person_btn" type="button" @click="editSave('infoFormdata')">
                                保存修改
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "personal-info",
        data(){
            var validateName = (rule, value, callback) => {
                let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
                if (value === '') {
                    callback(new Error('请输入真实姓名'));
                }else if(reg.test(this.infoFormdata.rname)==false){
                    callback(new Error('姓名是中文且长度2-20位'));
                } else {
                    callback();
                }
            };
            var validateBrithday = (rule, value, callback) => {
                console.log('error')
                if (value === '') {
                    callback(new Error('请输入生日'));
                } else {
                    callback();
                }
            };
            return{
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                infoFormdata:{
                    rname:'',
                    brithday:''
                },
                radio:'男',
                file:'',
                headImgUrl:'',
                url:'',
                infoRules:{
                    rname:[
                        { validator: validateName, trigger: 'blur' }
                    ],
                    brithday:[
                        { validator: validateBrithday, trigger: 'blur' }
                    ]
                }
            };
        },
        created(){
            this.url = localStorage.getItem('URL')
            this.getInfo()
        },
        methods:{
            editSave(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            let uuid = JSON.parse(localStorage.getItem('userinfo')).uuid
                            let userName = this.infoFormdata.rname
                            let userSex = this.radio
                            let userBrithday = this.infoFormdata.brithday
                            this.$http.post('/user/setPersonInfo.do', this.$qs.stringify({
                                uuid: uuid,
                                userName: userName,
                                userSex: userSex,
                                userBrithday: userBrithday
                            })).then((res) => {
                                if (res.data.returncode == '200') {
                                    this.$message({
                                        message: '保存修改成功！',
                                        type: 'success'
                                    });
                                    let sex=userSex=='男'?'先生':'女士'
                                    this.$store.commit('setNameSex',{rname:userName,sex:sex})
                                } else {
                                    this.$message({
                                        message: '保存修改失败！',
                                        type: 'error'
                                    });
                                }
                            }).catch(() => {
                                this.$message({
                                    message: '保存修改失败！',
                                    type: 'error'
                                });
                            })

                        } else {
                            this.$message({
                                message: '请确定格式填写正确！',
                                type: 'warning'
                            });
                        }
                })
            },
            getInfo(){
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/user/getPersonInfo.do',this.$qs.stringify({uuid:uuid})).then((res)=>{
                    this.infoFormdata.rname=res.data.data[0].userName;
                    this.radio=res.data.data[0].userSex;
                    this.infoFormdata.brithday=res.data.data[0].userBrithday;
                    this.headImgUrl=res.data.data[0].userHead;
                }).catch((err)=>{
                    console.log(err)
                })
            },
            changeImage(e){
                let file = e.target.files[0];
                if(file) {
                    this.file=file
                    let reader = new FileReader()
                    let that=this
                    reader.readAsDataURL(file);

                    reader.onload = function () {
                        that.headImgUrl= this.result
                    };
                    if(file.size > 2 * 1024 * 1024) { // 判断图片大小
                        this.$message.error('上传头像图片大小不能超过 2MB!');
                    } else {
                        let formData = new FormData();
                        let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                        console.log(this.file)
                        formData.append('userHead',this.file);
                        formData.append('uuid',uuid);
                        this.$http.post('/user/setHeadImg.do',formData).then((res)=>{
                            console.log(res)
                            if(res.data.returncode=='200') {
                                this.$message({
                                    message: '设置头像成功！',
                                    type: 'success'
                                });
                                this.getInfo()
                            }else {
                                this.$message({
                                    message: '设置头像失败！',
                                    type: 'error'
                                });
                            }
                        }).catch((err)=>{
                            console.log(err)
                            this.$message({
                                message: '设置头像失败！',
                                type: 'error'
                            });
                        })
                    }

                }
            }
        }
    }
</script>

<style scoped lang="less">
    //上传头像
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
        border-radius: 50%;
        border: 5px solid white;
    }
    //
    .op{
        opacity: 0;
    }
    .demonstration{
        display: inline-block;
        width: 90px;
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
    .head{
        display: inline-block;
    }
    #headForm #head{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 5px solid white;
        background-size: cover;
        background-position: center;
        background-color: white;
        box-shadow: 0 3px 10px -3px #a8a8a8;
        margin-bottom: 40px;
    }
    .con-bottom{
        padding: 30px 50px;
        background-color: white;
    }
    #head-msg{
        color: red;
        font-size: 14px;
        text-align: center;
    }
    #headForm{
        position: relative;
        text-align: center;
        margin-left: 40px;
    }
    #edit-head{
        position: absolute;
        clip: rect(0,0,0,0);
    }
    #edit-head-btn{
        display: inline-block;
        padding: 8px 20px;
        border-radius: 5px;
        background-color: #111111;
        color: white;
        cursor: pointer;
        margin-bottom: 20px;
        transition: all .2s;
        border: 1px solid #cccccc;
        font-size: 12px;
    }
    #edit-head-btn:hover{
        background-color: #383838;
        border: 1px solid #333333;
    }
    .sbody .form{
        padding: 100px 0;
    }
    /*radio*/
    .radios{
        display: inline-block;
    }
    .radios>div {
        display: inline-block;
        position: relative;
        line-height: 30px;
    }

    input[type="radio"] {
        width: 20px;
        height: 20px;
        opacity: 0;
    }

    .radios label {
        position: absolute;
        left: 5px;
        top: 5px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #999;
    }

    /*设置选中的input的样式*/
    /* + 是兄弟选择器,获取选中后的label元素*/
    .radios input:checked+label {
        background-color: #111111;
        border: 1px solid #111111;
    }

    .radios input:checked+label::after {
        position: absolute;
        content: "";
        width: 5px;
        height: 10px;
        top: 1px;
        left: 6px;
        border: 2px solid #fff;
        border-top: none;
        border-left: none;
        transform: rotate(45deg);
    }
    .group:nth-child(1) input{
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    label{
        display: inline-block;
        width: 90px;
    }
    .label{
        position: relative;
    }
    .group {
        margin-bottom: 28px;
    }
    select{
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 60px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 6px 12px 6px 12px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    }
    .down-list1 select{
        width: 100px;
    }
    .down-list{
        display: inline-block;
        position: relative;
    }
    .down-list:after{
        content: "";
        width: 14px;
        height: 8px;
        /*background: url(../images/bgimg/xiala.png) no-repeat center;*/
        position: absolute;
        right: 12px;
        top: 45%;
        pointer-events: none;
    }
    #rname_msg{
        display: inline-block;
        color: red;
        margin-left: 20px;
        width: 163px;
        font-size: 13px;
        vertical-align: top;
    }
    #edit_person_btn{
        display: inline-block;
        padding: 8px 20px;
        border-radius: 5px;
        background-color: #111111;
        color: white;
        cursor: pointer;
        margin-bottom: 20px;
        transition: all .2s;
        border: 1px solid #cccccc;
        font-size: 12px;
    }
    #edit_person_btn:hover{
        background-color: #383838;
        border: 1px solid #333333;
    }
    #rname_msg .icon-gantanhao-yuankuang{
        display: inline-block;
        line-height: 19.2px;
        height: 19.2px;
        vertical-align: top;
    }
    .icon-ok{
        font-size: 18px;
        vertical-align: middle;
    }

</style>