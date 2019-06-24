<template>
    <div class="deliver">
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
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange" class="a" border>
            <el-table-column
                    label="订单编号"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.ordersNo}}</template>
            </el-table-column>
            <el-table-column
                    label="订单金额"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.ordersPrice}}</template>
            </el-table-column>
            <el-table-column
                    label="支付方式"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.ordersPay=='0'?'支付宝':'积分支付'}}</template>
            </el-table-column>
            <el-table-column
                    label="用户名"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{  scope.row.userName}}</template>
            </el-table-column>
            <el-table-column
                    label="下单时间"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.ordersCtime}}</template>
            </el-table-column>

            <el-table-column
                    label="状态"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.ordersState}}</template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    show-overflow-tooltip
            >
                <template slot-scope="scope"> <div class="btn" >
                    <el-button type="primary" @click="link(scope.row.ordersId)" >详情</el-button>
                </div>
                    <div class="btn" v-if="scope.row.ordersState=='待发货'"  @click="centerDialogVisible = true;id=scope.row.ordersId" >
                        <el-button type="success" >发货</el-button>
                    </div>
                </template>

            </el-table-column>
        </el-table>

        <el-dialog

                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <span>请选择物流公司</span>
            <template>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </template>

            <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="change">确 定</el-button>
  </span>
        </el-dialog>
        <!--分页-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.totalsize">
            </el-pagination>
        </div>
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

</style>
<script>
    export default {
        name:'deliver',
        data() {
            return {  options: [{
                    value: '顺丰',
                    label: '顺丰'
                }, {
                    value: '申通',
                    label: '申通'
                }],
                value: '',

                centerDialogVisible: false,//弹框
                input1: '',
                pageSize :10, //每页显示数量
                pageCount :1, //总页数
                currentPage: 1,//当前页
                page:'',
                id:'',
                tableData: [],
                searchData:[],
                multipleSelection: []
            }
        },
        created(){
            this.$http.get('/users/Hsearch.do',{
                params:{
                    ordersState:1
                }
            })
                .then((res)=>{
                    // console.log(res.data.data.splice(0,res.data.data.length-1));
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
        methods: {
            search(){
                console.log(this.input1,this.input2,this.value);

                this.$http.get('/users/Hsearch.do',{ params:{
                        ordersNo:this.input1,
                        ordersState:1

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
                        ordersState:1,
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
                        ordersState:1,
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
                this.$router.push('/dia')
            },
            change(){
                console.log(this.value);
                this.$http.get('/users/Deliver.do',{
                    params:{
                        ordersId:this.id,
                        logName:this.value
                    }
                })
                    .then((res)=>{
                        console.log(res);
                        this.centerDialogVisible = false;
                        location.reload()
                    })
                    .catch((err)=>{
                        return console.log(err);
                    })
            }

        }
    }
</script>