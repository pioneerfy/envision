<template>
    <div>
        <!--头部-->
        <div class="top">
            <h1>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                </el-breadcrumb>
            </h1>
        </div>
        <!--条件筛选-->
        <div class="select">
            <el-select v-model="brandValue" placeholder="商品品牌">
                <el-option :label="val.brandName" :value="val.brandId" :key="val.brandId" v-for="val in brandData"></el-option>
            </el-select>

            <el-select v-model="typeValue" placeholder="商品分类">
                <el-option :label="val.goodstype_name" :key="val.goodstype_id" :value="val.goodstype_id" v-for="val in goodsTypeData"></el-option>
            </el-select>

            <el-input
                    placeholder="商品名称"
                    v-model="nameValue"
                    clearable>
            </el-input>

            <el-button type="info" icon="el-icon-search" @click="search()">搜索</el-button>
        </div>

        <!--添加商品-->
        <div class="addGoods-wrap">
            <el-button type="primary" icon="el-icon-plus" @click="addGoods()">添加商品</el-button>
        </div>

        <!--商品列表-->
        <section class="goods-list">
            <el-table
                    :data="goodsData"
                    border
                    stripe
                    style="width: 100%">
                <el-table-column
                        :resizable="false"
                        align="center"
                        type="selection"
                        width="50">
                </el-table-column>

                <el-table-column
                        class="goodsinfo"
                        align="center"
                        :resizable="false"
                        label="商品信息"
                        width="300">
                    <template slot-scope="scope">
                      <div class="goodsinfo">
                          <div class="img-wrap">
                              <img :src="'http://172.16.7.91:8080/'+scope.row.url" alt="">
                          </div>
                          <p class="goods-name">{{scope.row.goods_name}}</p>
                      </div>
                    </template>

                </el-table-column>

                <el-table-column
                        :resizable="false"
                        prop="brand_name"
                        width="80"
                        label="品牌">
                </el-table-column>

                <el-table-column
                        :resizable="false"
                        prop="goodstype_name"
                        label="分类">
                </el-table-column>

                <el-table-column
                        :resizable="false"
                        prop="attr[0].goodsPrice"
                        label="售价">
                </el-table-column>


                <el-table-column
                        :resizable="false"
                        prop="goods_isIntegral"
                        label="是否为积分商品">
                    <template slot-scope="scope">
                        <span v-if="scope.row.goods_isIntegral ===0">是</span>
                        <span v-if="scope.row.goods_isIntegral ===1">否</span>
                    </template>
                </el-table-column>

                <el-table-column
                        :resizable="false"
                        prop="attr[0].stockNumber"
                        label="库存">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row.goods_id, scope.row)">编辑</el-button>
                        <el-button
                                v-if="scope.row.goods_isDel ===0"
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row.goods_id,1)">下架</el-button>
                        <el-button
                                v-if="scope.row.goods_isDel ===1"
                                size="mini"
                                type="primary"
                                @click="handleDelete(scope.row.goods_id,0)">上架</el-button>
                    </template>
                </el-table-column>

            </el-table>

        </section>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import  qs  from 'qs'
    export default {
        name: "goodsManage",
        data(){
            return {
                goodsData:[],
                brandData:[],
                goodsTypeData:[],
                totalCount:0,
                currentPage:1,
                pageSize:10,
                brandValue: '',
                typeValue: '',
                nameValue: '',
            }
        },
        methods:{
            //获取商品数据
            getGoods(){
                this.$http.get('/manage/getGoods.do',{
                    params:{
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                        // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                        pageSize:this.pageSize,
                        currentPage:this.currentPage
                    }
                })
                    .then((res)=>{
                        console.log('获取商品的数据',res.data.data);
                        this.goodsData = res.data.data[0]
                        this.totalCount = res.data.data[1].totalCount
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            //获取品牌
            getBrand() {
                this.$http.get('/manage/getbrand.do', {
                    params: {
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                        // uuid: '92628a3fbd1044b2aa5c78ccbaf1e7f2'
                    }
                })
                    .then((res) => {
                        if (res.data.returncode === '200') {
                            this.brandData = res.data.data
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            //获取分类
            getType(){
                this.$http.get('/manage/getGoodstype.do',{
                    params:{
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                        // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2'
                    }
                })
                    .then((res)=>{
                        if (res.data.returncode ==='200'){
                            this.goodsTypeData = res.data.data
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            //搜索商品
            search(){
                console.log(this.brandValue);
                console.log(this.typeValue);
                console.log(this.nameValue);
                this.$http.get('/manage/goodsSearch.do',{
                    params:{
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                        brandId:this.brandValue,
                        goodstypeId:this.typeValue,
                        goodsName:this.nameValue
                    }
                }).then((res)=>{
                    console.log('搜索商品的结果',res);
                    this.goodsData = res.data.data
                    this.totalCount = res.data.data[0].totalCount
                })
            },
            //编辑商品
            handleEdit(goodsid,goodsinfo){
                let goods = {
                    'id':goodsid,
                    'info':goodsinfo
                }
                //将要编辑的商品信息存入localStorage中
                localStorage.setItem('goods',JSON.stringify(goods));
                //跳转到编辑界面
                this.$router.push({name:'editGoods'})
            },
            //上下架商品
            handleDelete(goodsid,state){
                if (state ===1){
                    this.$confirm('您确定要下架该商品吗？','提示',{
                        confirmButtonText:'确定',
                        cancelButtonText:'取消',
                        type:'warning'
                    })
                        .then(()=>{
                            this.$http.post('/manage/upOrdownGoods.do',qs.stringify({
                                // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                                goodsId:goodsid,
                                goodsIsdel:state,
                                uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                            }))
                                .then((res)=>{
                                    this.$message({
                                        type: 'success',
                                        message: '下架成功!'
                                    });
                                    this.getGoods()
                                })
                                .catch((err)=>{
                                    console.log(err);
                                })
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消下架'
                            });
                        });
                } else{
                    this.$http.post('/manage/upOrdownGoods.do',qs.stringify({
                        // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                        goodsId:goodsid,
                        goodsIsdel:state,
                        uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                    }))
                        .then((res)=>{
                            this.$message({
                                type: 'success',
                                message: '上架成功!'
                            });
                            this.getGoods()
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                }

            },
            //改变每一页展示的商品数目
            handleSizeChange(size) {
                this.pageSize = size;
                console.log(this.pageSize);
                console.log(this.currentPage);
                if (this.brandValue==='' && this.typeValue==='' && this.nameValue==='') {
                    this.$http.get('/manage/getGoods.do',{
                        params:{
                            // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                            uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                            pageSize:this.pageSize,
                            currentPage:this.currentPage
                        }
                    })
                        .then((res)=>{
                            this.goodsData = res.data.data[0]
                            this.totalCount = res.data.data[1].totalCount

                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                }else{
                    this.$http.get('/manage/goodsSearch.do',{
                        params:{
                            uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                            // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                            brandId:this.brandValue,
                            goodstypeId:this.typeValue,
                            goodsName:this.nameValue,
                            pageSize:this.pageSize,
                            currentPage:this.currentPage
                        }
                    }).then((res)=>{
                        this.goodsData = res.data.data
                        this.totalCount = res.data.data[1].totalCount
                    })
                }

            },
            //改变当前页
            handleCurrentChange(currentPage){
                this.currentPage = currentPage;
                console.log(this.pageSize);
                console.log(this.currentPage);
                if (this.brandValue==='' && this.typeValue==='' && this.nameValue==='') {
                    this.$http.get('/manage/getGoods.do',{
                        params:{
                            // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                            pageSize:this.pageSize,
                            uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                            currentPage:this.currentPage
                        }
                    })
                        .then((res)=>{
                            this.goodsData = res.data.data[0]
                            this.totalCount = res.data.data[1].totalCount
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                }else{
                    this.$http.get('/manage/goodsSearch.do',{
                        params:{
                            // uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',
                            uuid:JSON.parse(localStorage.getItem('userinfo')).uuid,
                            brandId:this.brandValue,
                            goodstypeId:this.typeValue,
                            goodsName:this.nameValue,
                            pageSize:this.pageSize,
                            currentPage:this.currentPage
                        }
                    }).then((res)=>{
                        this.goodsData = res.data.data
                        this.totalCount = res.data.data[1].totalCount
                    })
                }
            },
            //跳转到添加商品界面
            addGoods(){
                localStorage.removeItem('goods')
                this.$router.push({name:'editGoods'})
            }
        },
        created(){
            this.getGoods()
            this.getBrand()
            this.getType()
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
    /*条件筛选*/
.select{
    margin-top: 15px;
    height: 50px;
    width: 100%;
    background-color: #e6e6e6;
    box-sizing: border-box;
    padding-top: 5px;
    padding-left: 15px;
}
    .select .el-select{
    margin-right: 20px;
    width: 222px;
}
    .select .el-input{
    width: 222px;
    margin-right: 20px;
}
    .select .el-button{
        height: 40px;
        padding: 12px 10px;
    }

    /*添加商品*/
    .addGoods-wrap{
        height: 40px;
        margin-top: 15px;
        padding-left: 15px;
    }
    .addGoods-wrap .el-button{
        padding: 12px 10px;
        height: 40px;
    }
    /*商品列表*/
    .goods-list{
        padding-left: 15px;
        padding-right: 15px;
        margin-top: 20px;
        height: auto;
        background-color: #ffffff;
    }
    .el-table td, .el-table th{
        padding: 8px 0;
    }
    .img-wrap{
        width: 55px;
        height: 55px;
        border: 1px solid #d4d4d4;
    }
    .img-wrap img{
        width: 100%;
        height: 100%;
    }
    .goods-name{
        margin-left: 10px;
    }
    .goodsinfo{
        display: flex;
    }
    .pagination{
        margin-top: 30px;
        text-align: center;
    }
</style>