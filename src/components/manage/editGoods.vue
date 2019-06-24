<template>
    <div>
        <!--头部-->
        <div class="top">
            <h1>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path:'/manage/goodsList'}">商品列表</el-breadcrumb-item>
                    <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </h1>
        </div>

        <!--内容容器-->
        <div class="edit-content">
            <!--二级标题-->
            <div class="ec-title">
                <h2>商品信息</h2>
            </div>
            <div class="edit-form">
                <el-form ref="form" status-icon :model="goodsinfo" :rules="rules" label-width="80px" label-position="top" size="mini" placeholder="最多允许输入30个汉字" style="width: 75%">
                    <el-form-item label="商品名称" prop="goods_name" >
                        <el-input v-model="goodsinfo.goods_name" style="width: 100%" ></el-input>
                    </el-form-item>

                    <el-form-item label="商品描述" prop="goods_descript">
                        <el-input v-model="goodsinfo.goods_descript" style="width: 100%" ></el-input>
                    </el-form-item>

                    <el-form-item label="商品品牌" prop="brand_name">
                            <el-select v-model="goodsinfo.brand_name" placeholder="请选择品牌">
                                <el-option :label="val.brandName" :key="val.brandName" :value="val.brandName" v-for="val in brandData"></el-option>
                            </el-select>
                    </el-form-item>

                    <el-form-item label="商品分类" prop="goodstype_name">
                            <el-select v-model="goodsinfo.goodstype_name" placeholder="请选择分类">
                                <el-option :label="val.goodstype_name" :key="val.goodstype_id" :value="val.goodstype_name" v-for="val in goodsTypeData"></el-option>
                            </el-select>
                    </el-form-item>

                    <el-form-item label="商品属性" >
                        <el-form-item  v-for="(val,index) in goodsinfo.attr" :key="index" class="goods-attr">
                            <el-col :span="4">
                                <el-form-item  label="属性名称" :prop="'attr.'+index+'.attrName'" :rules="rules.attrName">
                                    <el-input
                                            placeholder="属性名称"
                                            v-model="val.attrName">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <!--<el-col class="line" :span="1.5" style="text-align: center;margin: 0 10px"></el-col>-->
                            <el-col :span="4" style="margin: 0 20px">
                                <el-form-item  label="属性值" :prop="'attr.'+index+'.attrValue'" :rules="rules.attrValue">
                                    <el-input
                                            placeholder="属性值"
                                            v-model="val.attrValue">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <!--<el-col class="line" :span="1.5" style="text-align: center;margin: 0 10px"></el-col>-->
                            <el-col :span="4">
                                <el-form-item  label="商品价格" :prop="'attr.'+index+'.goodsPrice'" :rules="rules.goodsPrice">
                                    <el-input
                                            style="color: red"
                                            placeholder="价格"
                                            v-model="val.goodsPrice">
                                    </el-input>
                                </el-form-item>
                            </el-col>

                            <!--<el-col class="line" :span="1.5" style="text-align: center;margin: 0 10px">——</el-col>-->
                            <el-col :span="4" style="margin: 0 0 0 20px">
                                <el-form-item  label="库存数量"  :prop="'attr.'+index+'.stockNumber'" :rules="rules.stockNumber">
                                    <el-input
                                            style="color: red"
                                            placeholder="库存数量"
                                            v-model="val.stockNumber">
                                    </el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="1.5" style="margin-left: 15px" v-if="index!==0">
                                <el-button type="text" icon="el-icon-minus" @click="delAttr(index)">删除</el-button>
                            </el-col>

                            <el-col :span="1.5" v-if="index===goodsinfo.attr.length-1" style="margin-left: 15px">
                                <el-button type="text" icon="el-icon-plus" @click="addAttr()">添加属性</el-button>
                            </el-col>
                        </el-form-item>
                    </el-form-item>

                    <el-form-item label="是否为积分商品" >
                        <el-radio v-model="goodsinfo.goods_isIntegral" :label=0>是</el-radio>
                        <el-radio v-model="goodsinfo.goods_isIntegral" :label=1>否</el-radio>
                    </el-form-item>

                    <el-form-item label="商品保质期" prop="goods_period">
                        <el-select v-model="goodsinfo.goods_period" placeholder="请选择">
                            <el-option
                                    v-for="item in period"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="商品图片" prop="file">
                        <el-upload
                                prop="file"
                                action="http://172.16.7.91:8080/manage/insertGoods.do/posts"
                                name='files'
                                :http-request="handleFile"
                                :file-list="imgList"
                                list-type="picture-card"
                                :auto-upload='false'
                                :on-change="filechange"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" >
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>

                    <el-form-item size="large">
                        <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>

    
</template>

<script>
    export default {
        name: "editGoods",
        data(){
            let valiImg = (rule, value, callback)=>{
                if (!this.hasFmt) {
                    callback(new Error('请上传图片'));
                } else {
                    callback();
                }
            };
            let checkPrice = (rule,value,callback)=>{
                if (value==='') {
                    return callback(new Error('价格不能为空'));
                }
                setTimeout(() => {
                    if (!String(value).match('^[0-9]*$')) {
                        callback(new Error('价格必须为数字'));
                    }else{
                        callback()
                    }
                }, 500);
            };
            let checkNumber = (rule,value,callback)=>{
                if (!value) {
                    return callback(new Error('数量不能为空'));
                }
                setTimeout(() => {
                    if (!String(value).match('^[0-9]*$')) {
                        callback(new Error('库存数量必须为数字'));
                    }else{
                        callback()
                    }
                }, 500);
            }
            return{
                goodsid:0,
                goodsinfo:{},
                brandData:[],
                goodsTypeData:[],
                fileList:{},
                attr:'',
                period:[
                    {value:1,
                    label:'一年'},
                    {value:2,
                    label:'两年'},
                    {value:3,
                    label:'三年'},
                    {value:4,
                    label:'四年'},
                    {value:5,
                    label:'五年'}],
                hasFmt:'',
                title:'',
                rules:{
                    goods_name:[
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                        { min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur' }
                    ],
                    goods_descript:[
                        { required: true, message: '请输入商品描述', trigger: 'blur' },
                        { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
                    ],
                    brand_name:[
                        { required: true, message: '品牌不能为空', trigger: 'blur' },
                    ],
                    goodstype_name:[
                        { required: true, message: '分类不能为空', trigger: 'blur' },
                    ],
                    attrName:[
                        { required: true, message: '请输入属性名称', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ],
                    attrValue:[
                        { required: true, message: '请输入属性值', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ],
                    goodsPrice:[
                        {required: true, validator: checkPrice, trigger: 'blur' }
                    ],
                    stockNumber:[
                        {required: true, validator: checkNumber, trigger: 'blur' }
                    ],
                    goods_period:[
                        { required: true, message: '保质期不能为空', trigger: 'blur' },
                    ],
                    file:[
                        {required:true, validator: valiImg, trigger: 'change' }  // 图片验证
                    ]
               },
                dialogImageUrl: '',
                dialogVisible: false,
                imgList:[]
            }
        },
        updated(){
            this.getBrandId()
            this.getTypeId()
            console.log(this.goodsinfo.goods_period);
        },
        methods:{
            //获取品牌id
            getBrandId(){
                switch (this.goodsinfo.brand_name) {
                    case "迪奥":
                        this.goodsinfo.brand_id =1;
                        break;
                    case "纪梵希":
                        this.goodsinfo.brand_id =2;
                        break;
                    case "圣罗兰":
                        this.goodsinfo.brand_id =3;
                        break;
                    case "香奈儿":
                        this.goodsinfo.brand_id =4;
                        break;
                    case "阿玛尼":
                        this.goodsinfo.brand_id =5;
                        break;
                }
            },
            //获取分类id
            getTypeId(){
                switch (this.goodsinfo.goodstype_name) {
                    case "美容工具":
                        this.goodsinfo.goodstype_id =5;
                        break;
                    case "口红":
                        this.goodsinfo.goodstype_id =6;
                        break;
                    case "唇膏":
                        this.goodsinfo.goodstype_id =7;
                        break;
                    case "男士香水":
                        this.goodsinfo.goodstype_id =8;
                        break;
                    case "女士香水":
                        this.goodsinfo.goodstype_id =9;
                        break;
                    case "眉笔":
                        this.goodsinfo.goodstype_id =10;
                        break;
                    case "眼影":
                        this.goodsinfo.goodstype_id =11;
                        break;
                    case "粉底":
                        this.goodsinfo.goodstype_id =12;
                        break;
                }
            },
            //获取品牌
            getBrand(){
              this.$http.get('/manage/getbrand.do',{
                  params:{
                      uuid:JSON.parse(localStorage.getItem('userinfo')).uuid
                      // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2'
                  }
              })
                  .then((res)=>{
                      console.log('获取品牌',res);
                      if (res.data.returncode ==='200'){
                          this.brandData = res.data.data
                          console.log(this.brandData);
                      }
                  })
                  .catch((err)=>{
                      console.log(err);
                  })
            },
            //获取分类
            getType(){
              this.$http.get('/manage/getGoodstype.do',{
                  params:{
                      uuid:JSON.parse(localStorage.getItem('userinfo')).uuid
                      // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2'
                  }
              })
                  .then((res)=>{
                      console.log('获取分类',res);
                      if (res.data.returncode ==='200'){
                          this.goodsTypeData = res.data.data
                          console.log(this.goodsTypeData);
                      }
                  })
                  .catch((err)=>{
                      console.log(err);
                  })
            },
            //新增属性
            addAttr(){
                this.goodsinfo.attr.push({})
            },
            //删除属性
            delAttr(index){
                console.log(index);
                this.goodsinfo.attr.splice(index,1)
            },
            //移除图片
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            //查看预览图
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleFile(){
            },
            //图片改变时
            filechange(file,fileList){
                this.fileList[''] = fileList
                if(fileList.length>0){
                    this.hasFmt = true;
                }
            },
            //提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    this.attr = JSON.stringify(this.goodsinfo.attr)
                    let uuid =JSON.parse(localStorage.getItem('userinfo')).uuid
                    console.log(this.attr);
                    if (valid) {
                        let form = new FormData();
                        Object.entries(this.fileList).forEach(file=>{
                            file[1].forEach(item=>{
                                form.append('files',item.raw)
                                form.append(item.name,file[0])
                            })
                        })
                        // form.append('uuid',uuid);
                        // form.append('attr',this.attr);
                        // form.append('goodsName',this.goodsinfo.goods_name);
                        // form.append('goodsId',this.goodsinfo.goods_id);
                        // form.append('goodsDescript',this.goodsinfo.goods_descript);
                        // form.append('brandId',this.goodsinfo.brand_id);
                        // form.append('goodstypeId',this.goodsinfo.goodstype_id);
                        // form.append('goodsIsintegral',this.goodsinfo.goods_isIntegral);
                        // form.append('goodsPeriod',this.goodsinfo.goods_period);
                        // form.append('url',this.imgList);
                        const instance=this.$http.create({
                            withCredentials: true
                        })
                        if(localStorage.getItem('goods')!==null){
                            form.append('uuid',uuid);
                            form.append('attr',this.attr);
                            form.append('goodsName',this.goodsinfo.goods_name);
                            form.append('goodsId',this.goodsinfo.goods_id);
                            form.append('goodsDescript',this.goodsinfo.goods_descript);
                            form.append('brandId',this.goodsinfo.brand_id);
                            form.append('goodstypeId',this.goodsinfo.goodstype_id);
                            form.append('goodsIsintegral',this.goodsinfo.goods_isIntegral);
                            form.append('goodsPeriod',this.goodsinfo.goods_period);
                            form.append('url',this.imgList);
                            instance.post('/manage/editorGoodsInfo.do',form)
                                .then((res)=>{
                                    console.log(res);
                                    if (res.data.returncode ==='200'){
                                        this.$message({
                                            type: 'success',
                                            message: '商品修改成功'
                                        });
                                    }else{
                                        this.$message({
                                            type: 'warning',
                                            message: '商品修改失败'
                                        });
                                    }
                                })
                                .catch((err)=>{
                                    console.log(err);
                                })
                        }else{
                            form.append('uuid',uuid);
                            form.append('attr',this.attr);
                            form.append('goodsName',this.goodsinfo.goods_name);
                            // form.append('goodsId',this.goodsinfo.goods_id);
                            form.append('goodsDescript',this.goodsinfo.goods_descript);
                            form.append('brandId',this.goodsinfo.brand_id);
                            form.append('goodstypeId',this.goodsinfo.goodstype_id);
                            form.append('goodsIsintegral',this.goodsinfo.goods_isIntegral);
                            form.append('goodsPeriod',this.goodsinfo.goods_period);
                            form.append('url',this.imgList);
                            instance.post('manage/insertGoods.do',form)
                                .then((res)=>{
                                    console.log(res);
                                    if (res.data.returncode ==='200'){
                                        this.$message({
                                            type: 'success',
                                            message: '商品新增成功'
                                        });
                                    }else{
                                        this.$message({
                                            type: 'warning',
                                            message: '商品新增失败'
                                        });
                                    }
                                })
                                .catch((err)=>{
                                    console.log(err);
                                })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        created() {
            //获取品牌
            this.getBrand()
            //获取分类
            this.getType()
            if (localStorage.getItem('goods')!==null){
                //获取商品id和商品的信息
                this.goodsid = JSON.parse(localStorage.getItem('goods')).id
                this.goodsinfo = JSON.parse(localStorage.getItem('goods')).info

                if (this.goodsinfo.attr.length===0){
                    this.goodsinfo.attr.push({})
                }
                //遍历图片信息
                if (this.goodsinfo.url.length>0){
                    this.hasFmt = true;
                    let _this=this
                    for(let i =0;i<_this.goodsinfo.url.length;i++){
                        _this.imgList.push({})
                        _this.imgList[i].url = 'http://172.16.7.91:8080/'+this.goodsinfo.url[i]
                    }
                }
                console.log('图片列表',this.imgList);
                //动态设置title
                this.title = '编辑商品'
            }else{
                this.title = '新增商品'
                this.goodsinfo = {
                    attr:[{
                        attrName: "",
                        attrValue: "",
                        goodsPrice: '',
                        stockNumber: '',
                    }],
                    brand_id:0,
                    brand_name:'',
                    goods_check:0,
                    goods_descript:'',
                    goods_isIntegral:1,
                    goods_ishot:1,
                    goods_name:'',
                    goods_period:"",
                    goodstype_id:0,
                    goodstype_name:'',
                    is_deleted:1,
                    file:[]
                }
            }
            console.log('商品编辑之前的信息',this.goodsinfo);
        }
    }
</script>

<style>
    /*头部信息*/
    .top{
        width: 100%;
        height: 50px;
        border-bottom: #444444;
        line-height: 50px;
        background-color: #fff;
        padding-left: 15px;
        border-bottom: 1px solid #e6e6e6;
    }
    .top h1 .el-breadcrumb{
        line-height: 50px;
    }
    .el-breadcrumb{
        font-size: 16px;
    }
    /*内容容器*/
    .edit-content{
        height: auto;
        background-color: #fff;
        border: 1px solid #e6e6e6;
        margin: 20px 15px;
    }
    .ec-title{
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        color: #969696;
        border-bottom: 1px solid #e6e6e6;
        padding-left: 10px;
    }
    .edit-form{
        padding: 40px 30px;
    }
    .el-form.el-form--label-top>.el-form-item>label{
        font-weight: bolder;
    }
    .el-form-item.el-form-item--mini:nth-of-type(5) .el-form-item__content{
        background-color: #f5f5f5;
        box-sizing: border-box;
    }
    .el-form-item.el-form-item--mini:nth-of-type(5) .el-form-item__content  .el-form-item__label{
        color: #969696;
        text-align: center;
        width: 100%;
    }
    .el-form-item.el-form-item--mini:nth-of-type(5) .el-form-item__content input{
        text-align: center;
    }
    .el-form-item.el-form-item--mini:nth-of-type(5) .el-form-item__content .el-form-item__error{
        width:100%;
        text-align: center;
    }
</style>