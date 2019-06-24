<template>
        <div class="sbody">
            <div class="content">
                <div class="wrap">
                    <h1>我的地址</h1>
                    <div class="form">
                        <div class="address-content">
                            <address-con v-for="(address,index) in addressList" :key="index" :address="address" :index="index">
                                <button class="defaule" type="button" @click="defaultAddress(address.addressId)" v-if="index!=0">设为默认地址</button>
                                <button class="edit" type="button" @click="beforeEdit(address.addressId)">修改本地址</button>
                                <button class="del" type="button" @click="removeAddress(address.addressId)" v-if="index!=0">删除</button>
                            </address-con>
                            <div class="address-add" @click="newAddress" v-if="addressList.length<6">
                                <div class="add-icon"><span class="iconfont icon-xinzeng"></span></div>
                                <p class="add-new" >添加新地址</p>
                            </div>
                            <!--<el-pagination-->
                                    <!--background-->
                                    <!--layout="prev, pager, next"-->
                                    <!--:current-page.sync="page.currentPage"-->
                                    <!--:total="total"-->
                                    <!--style="position: absolute;bottom: 20px;right: 80px"-->
                                    <!--@current-change="currentChange"-->
                                    <!--v-if="addressList.length!=0"-->
                            <!--&gt;-->
                            <!--</el-pagination>-->

                        </div>
                    </div>
                </div>
            </div>
            <el-dialog :title="modeltitle" :visible.sync="dialogVisible" width="35%"  @close="closeDialog('form')">
                <el-form ref="form" :model="formData" :rules="rules" status-icon label-width="80px">
                    <el-form-item label="姓名" prop="name" class="test">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="号码" prop="tel">
                        <el-input v-model="formData.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" class="address-style" prop="selected">
                        <area-cascader  v-if="cityshow" :level="1" type="text" placeholder="请选择地区" v-model='selected' :data="pcaa"></area-cascader>
                    </el-form-item>
                    <el-form-item label="街道地址" prop="street">
                        <el-input type="textarea" v-model="formData.street" :rows="3" :maxlength="50" class="textarea-wrap"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer btn-wrap">
                <button type="button" class="del-close" @click="closeDialog('form')">取消</button>
                <button v-if="modeltitle==='修改地址'" type="button" class="del-sure" @click="submitForm('form')">确定</button>
                <button v-else type="button"  class="del-sure" @click="commitAddress('form')">确定</button>
            </span>
            </el-dialog>
        </div>
</template>

<script>
    import addressCon from '@/components/address/addressCon.vue'
    import { pca, pcaa } from 'area-data';
    export default {
        name: "my-address",
        components:{
            addressCon
        },
        data(){
            //验证姓名
            let checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('姓名不能为空'));
                }
                setTimeout(() => {
                    if (value.match('^[0-9]*$')) {
                        callback(new Error('姓名格式不正确'));
                    }else{
                        callback()
                    }
                }, 500);
            };
            //验证手机号码
            let checkTel = (rule,value,callback)=>{
                if (!value){
                    return callback(new Error('手机号码不能为空'));
                }
                setTimeout(() => {
                    if (!value.match('^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$')) {
                        callback(new Error('手机号码格式不正确'));
                    }else{
                        callback()
                    }
                }, 500);
            };
            //验证省市区地址
            let checkAddress = (rule,value,callback)=>{
                if (!value){
                    return callback(new Error('地址不能为空'));
                }else{
                    callback()
                }
            };
            //验证街道地址
            let checkStreet = (rule,value,callback)=>{
                if (!value){
                    return callback(new Error('街道地址不能为空'));
                }
                setTimeout(() => {
                    if (value.match('^[0-9]*$')) {
                        callback(new Error('街道地址格式不正确'));
                    }else{
                        callback()
                    }
                }, 500);
            };
            return{
                addressList:[],
                page: {
                    currentPage: 1
                },
                total:0,
                dialogVisible:false,
                modeltitle:'',
                cityshow:true,
                formData:{
                    id:'',
                    name:'',
                    tel:'',
                    address:'',
                    street:''
                },
                rules: {
                    name: [
                        { validator: checkName, trigger: 'blur' }
                    ],
                    tel: [
                        { validator: checkTel, trigger: 'blur' }
                    ],
                    address:[
                        {validator:checkAddress,trigger:'blur'}
                    ],
                    street: [
                        { validator: checkStreet, trigger: 'blur' }
                    ],
                },
                pca:pca,
                pcaa: pcaa,//最多省市区三级，结合:level='2'选择，0省、1省市、2省市区
                selected:[]
            }
        },
        //清空已选择的地区

        created(){
            this.getAddress()
        },
        methods:{
            iscityShow(){
                this.cityshow = false;
                this.selected = [];
                setTimeout(() => {this.cityshow = true},0);
            },
            getAddress(){
                let uuid = JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/user/getAddressP.do', this.$qs.stringify({
                    uuid:uuid
                })).then((res)=>{
                    console.log(res)
                    this.addressList=res.data.data[0]
                }).catch((err)=>{
                    console.log(err)
                    this.$message({
                        message: '服务器错误！',
                        type: 'error'
                    });
                })
            },
            currentChange() {
                this.getAddress()
            },
            //点击修改地址
            beforeEdit(id) {
                this.modeltitle = '修改地址';
                this.dialogVisible = true
                //发送请求查询此条地址信息
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.get('/order/getSingleAddress.do', {
                    params: {addressId: id,uuid:uuid}
                })
                    .then((res) => {
                        if (res.data.returncode === '200') {
                            this.iscityShow()
                            this.formData.id = res.data.data[0].address_id
                            this.formData.name = res.data.data[0].address_name
                            this.formData.tel = res.data.data[0].address_tel
                            this.selected = [res.data.data[0].address_pro,res.data.data[0].address_city,res.data.data[0].address_dis]
                            // this.formData.address = res.data.data[0].address_pro +"-"+res.data.data[0].address_city+"-"+res.data.data[0].address_dis
                            // this.selected[0] = res.data.data[0].address_pro
                            // this.selected[1] = res.data.data[0].address_city
                            // this.selected[2] = res.data.data[0].address_dis
                            this.formData.street = res.data.data[0].address_minute
                        }
                    })
            },
                //提交修改
                submitForm(formName) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                            this.$http.post('/order/changeAddress.do', this.$qs.stringify({
                                uuid:uuid,
                                addressId: this.formData.id,
                                addressName: this.formData.name,
                                addressPro: this.selected[0],
                                addressCity: this.selected[1],
                                addressDist: this.selected[2],
                                addressStreet: this.formData.street,
                                addressTel: this.formData.tel
                            }))
                                .then((res) => {
                                    console.log(res)
                                    if (res.data.returncode === '200') {
                                        this.dialogVisible = false
                                        this.$message({
                                            message: '修改地址成功！',
                                            type: 'success'
                                        })
                                        this.getAddress()
                                    }else {
                                        this.$message({
                                            message: '修改地址失败！',
                                            type: 'error'
                                        })
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                })

                        } else {
                            this.$message({
                                message: '请确认资料填写正确！',
                                type: 'warning'
                            })
                            return false;
                        }

                    });
                },
            //设置默认地址
            defaultAddress(id){
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/user/defaultAddress.do', this.$qs.stringify({
                    uuid:uuid,
                    addressId:id
                })).then((res)=>{
                    if (res.data.returncode === '200') {
                        this.$message({
                            message: '设置默认地址成功！',
                            type: 'success'
                        })
                        this.getAddress()
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            //点击新增地址
            newAddress(){
                this.iscityShow()
                this.modeltitle = '新增地址';
                this.formData.id='';
                this.formData.name='';
                this.formData.tel='';
                this.formData.address='';
                this.formData.select=[];
                this.formData.street='';
                this.dialogVisible = true;
            },
            //确认新增地址
            commitAddress(formName){
                console.log(2222)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                        this.$http.post('/order/insertAddress.do', this.$qs.stringify({
                            uuid: uuid,
                            addressName: this.formData.name,
                            addressPro: this.selected[0],
                            addressCity: this.selected[1],
                            addressDist: this.selected[2],
                            addressStreet: this.formData.street,
                            addressTel: this.formData.tel

                        }))
                            .then((res) => {
                                console.log(res)
                                if (res.data.returncode === '200') {
                                    this.dialogVisible = false
                                    console.log('成功')
                                    //获取订单界面的地址信息
                                    this.$message({
                                        message: '新增地址成功！',
                                        type: 'success'
                                    })
                                    this.getAddress();
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                })
            },

        //删除地址
            removeAddress(id){
                let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
                this.$http.post('/user/delAddress.do', this.$qs.stringify({
                    uuid:uuid,
                    addressId:id
                })).then((res)=>{
                    console.log(res)
                    if (res.data.returncode === '200') {
                        this.$message({
                            message: '删除地址成功！',
                            type: 'success'
                        })
                        this.getAddress()
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            closeDialog(formName){
                this.dialogVisible = false
                this.$refs[formName].resetFields()
            },
        },
    }
</script>

<style>
    @import '../assets/fonts/fonts-g/iconfont.css';

    .address-content .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #111;
    }
    .address-content .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: white;
        background-color: #111;
    }
    .sbody .el-form-item__content{
        line-height: 14px!important;
    }
    .sbody .area-selected-trigger{
        line-height: 14px;
    }
    .sbody .content{
        padding: 20px 0px;
    }
    .sbody .wrap{
        padding: 0 80px;
    }
    .sbody .content h1{
        font-size: 24px;
        font-weight: bold;
        border-bottom: 1px solid #BBBBBB;
        padding-bottom: 30px;
    }
    .sbody .form{
        padding-top: 30px;
        padding-bottom: 50px;
    }
    .sbody .address{
        margin-top: 20px;
        height: auto;
    }
    .sbody .address-title{
        font-weight: bolder;
        margin-bottom: 8px;
    }
    .sbody .address-content{
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
    }
    .sbody .address-content .address-add{
        width: 250px;
        height: 180px;
        margin-right: 23px;
        background-color: #ffffff;
        margin-bottom: 15px;
        border: 1px solid #e0e0e0;
        padding: 20px;
        font-size: 14px;
        color: #757575;
        cursor: pointer;
        text-align: center;
        box-shadow: 0 3px 10px -3px #a8a8a8;
        opacity: .75;
    }
    .sbody .address-content .address-add:hover{
        opacity: 1;
    }
    .sbody .address-content .address-add .icon-xinzeng{
        line-height: 120px;
        font-size: 45px!important;
        color: #757575;
    }
    .sbody .address-content .address-bottom{
        margin-top: 20px;
        height: 25px;
        line-height: 25px;
        display: flex;
        justify-content: space-between;
    }
    .sbody .show-add,.manage-add{
        cursor: pointer;
        font-size: 15px;
        color: #81b8f1;
    }
    .sbody .address-style{
        height: 40px;
    }
    .sbody .address-style .el-form-item__content{
        height: 100%;
        line-height: unset;
    }
     .address-style .el-form-item__content{
        height: 100%;
         line-height: 14px;
    }
    .sbody .address-style .el-form-item__content .area-cascader-wrap .area-select.large{
        height: 100%;
        width: 100%;
    }
    .sbody .address-style .area-cascader-wrap .area-select .area-selected-trigger{
        height: 100%;
        line-height: 14px;
    }
    .sbody .textarea-wrap textarea{
        resize: none;
        overflow: hidden;
    }
    .sbody .btn-wrap button{
        padding: 6px 25px;
        border: none;
        outline: none;
        background-color: #000;
        color: #FFFFFF;
        border-radius: 5px;
        cursor: pointer;
    }
    .sbody .btn-wrap button:nth-child(1){
        margin-right: 15px;
    }
    .sbody .btn-wrap .del-close{
        background-color: #FFFFFF;
        color: #000;
        border: 1px solid #cccccc;
    }
    .sbody .btn-wrap .del-sure:hover{
        background-color: #333333;
    }
    .sbody .btn-wrap .del-close:hover{
        background-color: #e9e9e9;
    }
</style>