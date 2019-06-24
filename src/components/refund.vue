<template>
    <div class="refund">
        <div class="input" style="text-align: center">
            <el-input
                    placeholder="请输入订单号"
                    v-model="input1"
                    clearable >
            </el-input>
        </div>
        <div class="sesearch" style="text-align: center;margin-bottom: 30px">
            <el-button type="info" @click="search">搜索</el-button>
        </div>
        <el-table
                ref="multipleTable"
                :data="searchData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange" class="a" border>
            <el-table-column
                    label="订单编号"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.orders_no}}</template>
            </el-table-column>
            <el-table-column
                    label="订单金额"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.orders_price}}</template>
            </el-table-column>
            <el-table-column
                    label="支付方式"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.orders_pay=='0'?'支付宝':'积分支付'}}</template>
            </el-table-column>
            <el-table-column
                    label="用户名"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.order_name}}</template>
            </el-table-column>
            <el-table-column
                    label="下单时间"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.orders_ctime}}</template>
            </el-table-column>

            <el-table-column
                    label="状态"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.orders_state}}</template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    show-overflow-tooltip
            >
                <template slot-scope="scope">

                        <el-button type="success" @click="link(scope.row.orders_id)" >退款</el-button>

                </template>
            </el-table-column>
        </el-table>
        <!--分页-->

    </div>
</template>
<style scoped>
    .order{
        /*width: 1170px;*/
        min-height: 500px;
    }
    .main{
        width: 1000px;
        margin: 0 auto ;
        padding-top: 30px;
        padding-left: 15px;
    }
    .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
    }
    .tab-button:hover {
        background: #e0e0e0;
    }
    .tab-button.active {
        background: #e0e0e0;
    }
    .tab {
        border: 1px solid #ccc;
        padding: 10px;
    }
    .table span{
        text-align: center;
        margin: 0 20px 20px;
        cursor: pointer;
    }
    .table{
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid black;
    }
    .input{
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .el-input{
        width: 200px;
        margin: 0 40px;
    }
    .form{
        margin-top: 50px;
    }
    .order{
        background: #ffffff;
    }
    .search{
        margin-bottom: 30px;
    }


    .router-link-active {
        text-decoration: none;
    }

    .router-link-active {
        text-decoration: none;
        color: white;
        font-weight: bold;
    }
    .router-link-exact-active{
        text-decoration: none;
        color:white;
        font-weight: bold;
    }
    a:-webkit-any-link {
        color: white;
    }

    .cell{
        text-align: center;
    }
    .el-pagination{
        /*float: right;*/
        margin-top: 20px;
        padding-bottom: 100px;
    }
    .btn{
        margin: 5px;
    }
    .el-button{
        padding: 7px;
    }
    .el-dialog__body{
        overflow: hidden;
    }

</style>
<script>
    export default {
        name:'refund',
        data() {
            return {
                pageSize :1, //每页显示数量
                pageCount :'', //总页数
                page:'',
                id:'',
                centerDialogVisible: false,//弹框
                input1:null,
                currentPage: 1,
                value: null,
                // dialogTableVisible: false,
                // modifyVisible:false,
                searchData:[],
                tableData: [],
                uuid:''

            }
        },
        created(){
            this.uuid=JSON.parse(localStorage.getItem('userinfo')).uuid,
            this.$http.get('/manage/showRefundGoods.do',{
                params:{
                    uuid:this.uuid,
                    // pageSize:this.pageSize,
                    // ordersNo:this.input1,
                    ordersSestate:1,
                }
            })
                .then((res)=>{
                    console.log(res.data.data);

                    // console.log(res.data.data.splice(0,res.data.data.length-1));
                    // this.page=res.data.data.splice(res.data.data.length-1,1)[0];
                    // this.currentPage=this.page.currentPage;
                    // this.pageCount=this.page.totalPage;
                    // console.log(this.currentPage);
                    // console.log(this.pageCount);
                    this.tableData=res.data.data;
                    this.searchData=this.tableData;
                    console.log(this.searchData);
                })
                .catch((err)=>{
                    return console.log(err);
                })
        },
        methods: {
            search(){

                this.$http.get('/users/Hsearch.do',{ params:{

                        ordersNo:this.input1,
                        ordersseState:1

                    }})
                    .then((res)=>{
                        this.page=res.data.data.splice(res.data.data.length-1,1)[0];
                        this.currentPage=this.page.currentPage;
                        this.pageCount=this.page.totalPage;
                        console.log(this.currentPage);
                        console.log(this.pageCount);
                        this.tableData=res.data.data;
                        this.searchData=this.tableData;
                        console.log(this.tableData);

                    })
                    .catch((err)=>{
                        return console.log(err);
                    })
            },
            toggleSelection(rows) {//表格初始化
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.$http.get('/users/Hsearch.do',{
                    params:{
                        currentPage:this.currentPage,
                        pageSize:val,
                        ordersNo:this.input1,
                        ordersseState:1,
                    }
                })
                    .then((res)=>{
                        // console.log(res);
                        // console.log(res.data.data.splice(0,res.data.data.length-1));
                        this.page=res.data.data.splice(res.data.data.length-1,1)[0];
                        this.currentPage=this.page.currentPage;
                        this.pageCount=this.page.totalPage;
                        // console.log(this.currentPage);
                        // console.log(this.pageCount);
                        this.tableData=res.data.data;
                        this.searchData=this.tableData;
                        // console.log(this.tableData);
                    })
                    .catch((err)=>{
                        return console.log(err);
                    })
            },
            handleCurrentChange(val) {
                console.log(val);
                this.$http.get('/users/Hsearch.do',{
                    params:{
                        currentPage:val,
                        pageSize:this.pageSize,
                        ordersNo:this.input1,
                        ordersseState:1,
                    }
                })
                    .then((res)=>{
                        // console.log(res);
                        // console.log(res.data.data.splice(0,res.data.data.length-1));
                        this.page=res.data.data.splice(res.data.data.length-1,1)[0];
                        this.currentPage=this.page.currentPage;
                        this.pageCount=this.page.totalPage;
                        // console.log(this.currentPage);
                        // console.log(this.pageCount);
                        this.tableData=res.data.data;
                        this.searchData=this.tableData;
                        // console.log(this.tableData);
                    })
                    .catch((err)=>{
                        return console.log(err);
                    })
            },

            link(i){

                this.id=i;
                console.log(this.a);
                sessionStorage.setItem("id",this.id);
                this.$router.push('/dia2')
            },


        }
    }
</script>