<template>
    <main class="comment-main" v-if="orderInfo" >
        <div class="goodscomment clear">
            <!--商品图片-->
            <div class="picture fl"><img :src="url+orderInfo.pic_url" alt=""></div>
            <!--评论-->
            <div class="comment fl">
                <h2 class="til" v-html="orderInfo.goods_name"></h2>
                <p style="font-size: 16px;color: #aaaaaa">{{orderInfo.goods_descript}}</p>
                <p class="price-box">价格：&nbsp;&nbsp;￥<span id="price" v-html="orderInfo.goods_price">元</span></p>
                <p>规格 &nbsp;&nbsp;&nbsp;<span id="color" v-html="orderInfo.attr_num"></span></p>
                <div class="serve-comment">
                    <p class="suit"><s>*</s>描述相符
                        <el-rate v-model="uuid.decStar" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                    </p>
                    <p class="serve"><s>*</s>卖家服务
                        <el-rate v-model="uuid.attitudeStar" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                    </p>
                    <p class="car-serve"><s>*</s>物流服务
                        <el-rate v-model="uuid.logisticsStar" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                    </p>
                </div>
            </div>
        </div>
        <el-form>
            <el-form-item>
                <div class="fl">描述</div>
                <div class="fr pic-box clear">
                    <textarea v-model="uuid.commentText" placeholder="请填写你的评价描述"></textarea>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="fl">晒单</div>
                <div class="fr pic-box clear">
                    <el-form-item>
                        <el-upload
                                ref="upload"
                                name="picList"
                                class="upload-demo"
                                action="http://172.16.7.96:8080/user/commentssubmit.do"
                                accept="image/png,image/gif,image/jpg,image/jpeg"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-change="handleChange"
                                :before-remove="beforeRemove"
                                :file-list="fileList"
                                :auto-upload=false
                                list-type="picture-card">
                            <!--<i class="el-icon-plus"></i>-->
                            <el-button type="i" class="el-icon-upload"></el-button>
                            <div slot="tip" class="el-upload__tip">当前限制选择 3 个文件,只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                </div>
            </el-form-item>
            <div class="is-anonymous">
                <el-checkbox v-model="checked" :change="change()">匿名</el-checkbox>
            </div>
            <el-button type="primary" @click="uploadFile">提交评论</el-button>
            <el-dialog title="评论信息" :visible.sync="dialogTableVisible" width="40%" :show-close="false" >
                <span>提交评论成功，即将跳转至我的订单界面</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addComment">确 定</el-button>
                </span>
            </el-dialog>
        </el-form>
    </main>
</template>

<script>
    export default {
        name: "upload",
        data() {
            return {
                checked: true,
                orderInfo: '',
                fileList: [],
                dialogImageUrl: '',
                dialogVisible: false,
                formLabelWidth: '80px',
                picList: {},
                uuid: {
                    uuid: JSON.parse(localStorage.getItem('userinfo')).uuid,
                    commentText: '',
                    decStar: 5,
                    attitudeStar: 5,
                    logisticsStar: 5,
                    isAnonymous: '',
                    ordersId: this.$route.params.ordersId,
                    attrId: this.$route.params.attrId,
                    goodsId: this.$route.params.goodsId,
                    // ordersId: 1,
                    // attrId: 1,
                    // goodsId: 1
                },
                dialogTableVisible: false,
                url:''
            };
        },
        created() {
            this.url=localStorage.getItem('URL')
            this.getOrderInfo();
        },
        methods: {
            change() {
                // this.uuid.isAnonymous=!this.checked;
                if (this.checked){
                    this.uuid.isAnonymous = 0
                } else {
                    this.uuid.isAnonymous = 1
                }
            },
            // 获取需要评论的信息
            getOrderInfo() {
                let data=this.$qs.stringify({attrId: this.uuid.attrId,uuid: this.uuid.uuid});
                this.$http.post('/user/getOrderAttrInfo.do',data).then((res) => {
                    console.log(res.data,data);
                    if (res.data.returncode==='200'){
                        this.orderInfo=res.data.data[0];
                    } else {
                        this.$message({
                            message: '获取订单商品评论信息失败',
                            type: 'error',
                            duration: 1000
                        });
                    }
                })
                .catch(err => {
                    console.log('获取订单商品评论信息请求失败', err);
                    this.$message({
                        message: '获取订单商品评论信息请求失败',
                        type: 'error',
                        duration: 1000
                    });
                });
            },
            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            // 点击文件列表中已上传的文件时的钩子
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 文件超出个数限制时的钩子
            handleExceed(files, fileList) {
                // 文件选多的提示
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                console.log(file,fileList);
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            uploadFile() {
                // this.$refs.upload.submit();
                let fd=new FormData();
                Object.entries(this.picList).forEach(file=>{
                    file[1].forEach(item=>{
                        fd.append('picList',item.raw)
                        fd.append(item.name,file[0])
                    })
                });
                // console.log(this.fd.get('picList'));
                fd.append('uuid',this.uuid.uuid);
                fd.append('commentText',this.uuid.commentText);
                fd.append('decStar',this.uuid.decStar);
                fd.append('logisticsStar',this.uuid.logisticsStar);
                fd.append('attitudeStar',this.uuid.attitudeStar);
                fd.append('isAnonymous',this.uuid.isAnonymous);
                fd.append('ordersId',this.uuid.ordersId);
                fd.append('attrId',this.uuid.attrId);
                fd.append('goodsId',this.uuid.goodsId);

                let that = this;
                that.$http.post('/user/commentssubmit.do',fd,{withCredentials: true},{ "Content-Type": "multipart/form-data" }).then(function(res){
                    if(res.data.returncode==='200'){
                        console.log('成功',res);
                        that.dialogTableVisible=true
                    }else{
                        console.log('失败',res)
                    }
                })
                .catch(err=>{
                    console.log('上传请求失败',err)
                })
            },
            handleChange(file,fileList) {
                this.picList['']=fileList;
                console.log(file,fileList);
            },
            addComment() {
                // 跳转至我的订单
                this.dialogTableVisible=false
                this.$router.push('/myOrders');
            }
        },
    }
</script>

<style scoped>
.comment-main .el-rate{
    display: inline-block;
}
.clear:before,
.clear:after{
    display: table;
    content: '';
}
.clear:before{
    clear: both;
}
.comment-main{
    width: 1170px;
    margin: 0 auto;
    background: #ffffff;
    padding: 40px 0 100px 0;
    position: relative;
}
/*商品评论*/
.goodscomment{
    width: 1100px;
    margin: 0 auto;
}
/*商品图片*/
.picture{
    width: 400px;
    height: 400px;
    margin-right: 100px;
    /*border: 1px solid red;*/
    text-align: center;
}
.picture img{
    width: 400px;
    height: 400px;
}
/*评价*/
.comment{
    padding: 60px 0 0 20px;
    width: 600px;
    height: 400px;
}
.comment h2{
    font-weight: normal;
    font-size: 18px;
    margin-bottom: 20px;
}
s{
    color: #f56c6c;
}
.comment p{
    margin-bottom: 20px;
    color: #ccc;
    font-size: 14px;
}
.comment .serve-comment p{
    line-height: 30px;
    height: 30px;
}
.comment-main .el-form{
        width: 1100px!important;
        height: auto!important;
        margin: 0 auto!important;
        padding-top: 40px!important;
    }
.comment-main .el-form .fl{
        width: 130px;
        padding: 8px 0;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        color: #999999;
        background: #F3F3F3;
        float: left;
        /*border: 1px solid #d9e3eb;*/
        position: absolute;
        top: 20px;
    }
.comment-main .el-form{
    border: 1px solid #d9e3eb;
}
.comment-main .el-form-item{
    position: relative;
    padding: 15px 30px;
    margin-bottom: 0px!important;
    padding-bottom: 30px!important;
}
.comment-main .el-form-item:nth-child(2){
    padding-top: 30px!important;
}
.comment-main .el-form-item:nth-child(1){
    border-bottom: 1px #DDD dashed;
}
form .fr{
    width: 780px;
    background: #F3F3F3;
    padding: 15px 20px;
}
textarea{
    padding: 10px 20px;
    outline: none;
    resize: none;
    width: 740px;
    min-height: 120px!important;
    border: 0!important;
    background: #ffffff!important;
    font-size: 14px;
}
textarea::placeholder{
    color: #cccccc;
}
.out-pic .fr{
    height: auto !important;
}
.comment-main .el-upload{
    padding-top: 14px!important;
    /*position: relative!important;*/
}
.comment-main .el-form>.el-button--primary{
    background: #111111!important;
    border: 1px solid #cccccc!important;
    position: absolute;
    bottom: 30px;
    left: 536px;
}
.comment-main .el-icon-upload{
    width: 146px;
    height: 146px;
    font-size: 60px !important;
    text-align: center;
    color: cornflowerblue !important;
    /*line-height: 80px;*/
    cursor: pointer;
    border: 0!important;
}
.comment-main  .el-upload__tip{
    min-width: 200px;
    margin-top: 0!important;
    margin-left: 20px;
    font-size: 14px!important;
    color: #666666;
    line-height: 148px;
}
.comment-main .upload-demo div{
    display: inline-block;
}
.is-anonymous{
    padding: 10px 30px;
}
</style>
