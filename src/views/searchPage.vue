<template>
    <div id="searchPage">
        <Head />

        <div class="word-wrap">
            <div id="search-keyword">
                <div class="all-goods" :class="[typeRank == 1 ? on : '']" @click="allGoods">所有产品</div>

                <div class="filter-nav" v-if="typeRank >= 2"> &nbsp; > &nbsp;<span @click="brandFilter" class="l-filter">{{brandName}}
                    <svg class="icon up l-up" aria-hidden="true">
                        <use xlink:href="#icon-shangjiantou"></use>
                    </svg></span>
                    <!-- 品牌名 -->
                    <ul class="filter-list">
                        <li @click="allBrand">全部品牌</li>
                        <li v-for="item in brand" :key="item.brand_id" @click="clickBrand(item.brand_name,item.brand_id)">{{item.brand_name}}</li>
                    </ul>
                </div>

                <!-- 分类 -->
                <div class="filter-nav" v-if="typeRank >= 3">&nbsp; > &nbsp;<span @click="typeFilter" class="l-filter">{{typeName}}
                    <svg class="icon up l-up" aria-hidden="true">
                        <use xlink:href="#icon-shangjiantou"></use>
                    </svg></span>
                    <!-- 类名 -->
                    <ul class="filter-list">
                        <li @click="allType">全部分类</li>
                        <li v-for="item in type" :key="item.goodstype_id" @click="clickType(item.goodstype_name,item.goodstype_id)">{{item.goodstype_name}}</li>
                    </ul>
                </div>
                <!-- keyWord -->
                <div class="searchWord" v-if="keyword && typeRank == 4">&nbsp;>&nbsp; <span>({{keyword}})</span></div>
            </div>
            <div class="tiaojian-wrap" v-if="displayResult.length>1">
                <div class="fr updown-wrap pri">
                    <div class="updown" :class="{ on : priceUp}">
                        <svg class="icon up" aria-hidden="true">
                                <use xlink:href="#icon-shangjiantou"></use>
                        </svg>
                    </div>
                    <div class="updown" :class="{ on : priceDown}">
                        <svg class="icon down" aria-hidden="true">
                            <use xlink:href="#icon-sjt"></use>
                        </svg>                

                    </div>
                </div>
                <div class="filter pri fr" :class="{ on : priceFilter}" id="ppr" @click="price">价格</div>
                <div class="filter fr" :class="{ on : isHot}" id="hot" v-if="recommend" @click="hot">热销</div>
                <div class="filter fr" :class="{ on : moren}" id="default" v-if="recommend" @click="recom">推荐</div>
            </div>
        </div>

        <!-- 结果展示 -->
        <div id="search-wrap" v-if="hasResault == 1">
            <searchItem :displayResult="displayResult"></searchItem> 
            <el-pagination background layout="prev, pager, next" :total="searchLength"   :current-page.sync="currentPage" :page-size="pageSize"></el-pagination>
        </div>
        <!-- 没有结果 -->
        <div id="not-resault" v-if="hasResault == 0">
            <div class="not-resault-wrap">没找到符合条件的商品,换个条件或关键词试试吧。</div>
            <div class="tuijian">本店推荐：</div>
            <searchItem :displayResult="noResault"></searchItem> 
        </div>
        <Foot></Foot>
    </div>
</template>

<script>

import Head from '../components/head.vue'
import Foot from '../components/foot.vue'
import searchItem from '../components/searchItem.vue'
// import func from '../../vue-temp/vue-editor-bridge';

require ('../assets/fonts/fonts-x/iconfont.js')

export default {
    name: 'searchPage',
    data() {
        return {
            keyword: '',
            currentPage: 1,
            pageSize: 8,
            searchLength: 8,  // 筛选结果总条目数

            hasResault: 0,    // 1:有结果 0:无结果
            reqErr: 0,    // 1:请求错误
            
            // 左 条件检索
            brandName: '全部品牌',
            typeName: '全部分类',
            brand: [],   // brand 筛选
            type: [],    // type 筛选
            // 筛选参数
            filterHot: 1,   // 是否热门
            brandId: -1,   // 品牌id
            typeId: -1,    // 类型id
            typePidId: -1,  // 大类
            typeRank: 4,    // 筛选等级

            moren: true,     // 选中推荐
            isHot: false,     // 选中热门
            priceFilter: false,   // 选中价格
            priceUp: false,    // 升序
            priceDown: false,    // 降序
            // 结果及条件
            recommend: true,   // 控制推荐，热门按钮显隐
            priceUpdown: true,  // true升序,false降序
            tuiJian: [],  // 搜索结果，在推荐展示
            displayResult: [],   // 渲染的筛选结果
            noResault: []   // 无结果时渲染的商品
        }
    },
    components: {
        Head,
        Foot,
        searchItem
    },
    methods: {
        // 左 筛选
        allGoods() {
            this.filterHot = 1  
            this.brandId = -1  
            this.typeId = -1    
            this.typePidId = -1
            this.currentPage = 1
            this.pageSize = 8

            this.typeRank = 3
            this.$options.methods.filter.bind(this)()     
        },
        allBrand() {
            this.brandName = '全部品牌'
            this.brandId = -1
            this.$options.methods.filter.bind(this)()
        },
        allType() {
            this.typeName = '全部分类'
            this.typeId = -1
            this.$options.methods.filter.bind(this)()
        },
        clickBrand(name,brandid) {
            this.brandName = name
            this.brandId = brandid
            this.typeRank = 3
            this.$options.methods.filter.bind(this)()
        },
        clickType(name,typeid) {
            this.typeName = name
            this.typeId = typeid
            this.typeRank = 3
            this.$options.methods.filter.bind(this)()
        },

        brandFilter() {
            if(this.brandId) {
                this.recommend = true
                this.typeRank = 2
            }
            this.$options.methods.filter.bind(this)()
        },
        typeFilter() {
            if(this.typeId) {
                this.recommend = true
                this.typeRank = 3
            }
            this.$options.methods.filter.bind(this)()
        },

        price() {
            this.priceUpdown = !this.priceUpdown

            this.moren = false
            this.isHot = false
            this.priceFilter = true
            
            if(this.priceUpdown) {
                this.priceDown = false
                this.priceUp = true
            } else {
                this.priceUp = false
                this.priceDown = true
            }
            if(this.typeRank == 4) {
                this.$options.methods.search.bind(this)()
            } else {
                this.$options.methods.filter.bind(this)()
            }
        },
        hot() {
            this.moren = false
            this.isHot = true
            this.priceFilter = false
            this.priceUp = false
            this.priceDown = false
            if(this.typeRank == 4) {
                this.$options.methods.search.bind(this)()
            } else {
                this.$options.methods.filter.bind(this)()
            }
        },
        recom() {
            this.moren = true
            this.isHot = false
            this.priceFilter = false
            this.priceUp = false
            this.priceDown = false

            if(this.typeRank == 4) {
                this.$options.methods.search.bind(this)()
            } else {
                this.$options.methods.filter.bind(this)()
            }
        },
        // 搜索请求
        search() {
            var reqHot
            var sort
            if(this.isHot) {
                reqHot = 0
            } else {
                reqHot = 1
            }
            if(this.priceUp) {
                sort = 1
            } else if(this.priceDown) {
                sort = 0
            }          
            this.$http.get('/goods/search.do',{
                params: {
                    keyWord: this.keyword,
                    current: this.currentPage,
                    size: this.pageSize,
                    isHot: reqHot,
                    sortPrice: sort
                }
            })
            .then((res) => {
                if(res.data.returncode != -1) {   // 有结果
                    this.searchLength = res.data.data[0].total
                    if(res.data.data[3].length == 0) {
                        this.hasResault = 0
                        this.displayResult = []
                    } else {
                        this.hasResault = 1
                        this.displayResult = res.data.data[3]
                        if(res.data.data[1].length == 1) {
                            this.brandName = res.data.data[1][0].brand_name
                            this.brandId = res.data.data[1][0].brand_id
                            this.brand = []
                        } else {
                            this.brandName = '全部品牌'
                            this.brand = res.data.data[1]
                        }
                        if(res.data.data[2].length == 1) {
                            this.typeName = res.data.data[2][0].goodstype_name
                            this.typeId = res.data.data[2][0].goodstype_id
                        } else {
                            this.typeName = '全部分类'
                            this.type = res.data.data[2]
                        }
                    }
                } else {
                    this.hasResault = 0
                }
            })
            .catch()
        },
        // 筛选
        filter() {
            var reqHot
            var sort
            if(this.isHot) {
                reqHot = 0
            } else {
                reqHot = 1
            }
            if(this.priceUp) {
                sort = 1
            } else if(this.priceDown) {
                sort = 0
            }
            this.$http.get('goods/filter.do',{
                params: {
                    current: this.currentPage,
                    size: this.pageSize,
                    goodsTypeId: this.typeId,
                    goodsTypePid: this.typePidId,
                    brandId: this.brandId,
                    isHot: reqHot,
                    sortPrice: sort
                }
            })
            .then((res) => {
                if(res.data.returncode != -1) { 
                    this.searchLength = res.data.data[0].total
                    if(res.data.data[3].length == 0) {
                        this.hasResault = 0
                        this.displayResult = []
                    } else {
                        this.hasResault = 1
                        this.displayResult = res.data.data[3]
                        if(res.data.data[1].length == 1) {
                            this.brandName = res.data.data[1][0].brand_name
                            this.brandId = res.data.data[1][0].brand_id
                        } else {
                            this.brandName = '全部品牌'
                            this.brand = res.data.data[1]
                        }
                        if(res.data.data[2].length == 1) {
                            this.typeName = res.data.data[2][0].goodstype_name
                            this.typeId = res.data.data[2][0].goodstype_id
                        } else {
                            this.typeName = '全部分类'
                            this.type = res.data.data[2]
                        }
                    }
                } else {
                    this.hasResault = 0
                }               
            })
            .catch()
        }
    },
    watch: {
        // 无筛选结果时
        hasResault(newHasResault) {
            if(newHasResault == 0) {                
                this.$http.get('goods/filter.do',{
                    params: {
                        current: 1,
                        size: 8,
                        goodsTypeId: -1,
                        goodsTypePid: -1,
                        brandId: -1,
                        isHot: 0,
                    }
                })
                .then((res) => {
                    this.noResault = res.data.data[3]
                    }               
                )
                .catch()
            }
        },
        $route: {
            handler: function() {
                this.keyword = this.$route.query.keyword
                this.search()
            },
            deep: true
        },
        currentPage() {
            if(this.typeRank == 4) {
                this.search()
            } else {
                this.filter()
            }
        }
    },
    created() {
        // url 取参
        if(this.$route.query.keyword) {
            this.keyword = this.$route.query.keyword
        }
        if(this.$route.query.brandId) {
            this.brandId = this.$route.query.brandId
        }
        if(this.$route.query.typeId) {
            this.typeId = this.$route.query.typeId
        }
        if(this.$route.query.typePidId) {
            this.typePidId = this.$route.query.typePidId
        }
        if(this.$route.query.isHot) {
            this.filterHot = this.$route.query.isHot
        }
        if(this.filterHot != 1) {
            this.recommend = false;
        }

        // 加载时请求数据
        if(this.keyword) {
            this.search()
        } else {
            this.filter()
        }


        this.displayResult = this.tuiJian
    }
}
</script>

<style scoped>
    @import '../assets/fonts/fonts-x/iconfont.css';
    @import '../assets/css/searchpage.css';

    .el-pagination {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 40px;
    }
</style>
