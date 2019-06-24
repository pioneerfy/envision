<template>
    <div class="all">
        <div class="input">
            <el-input
                    placeholder="请输入商品名称"
                    v-model="input2"
                    clearable >
            </el-input>
            <el-select v-model="value" clearable placeholder="选择退款状态">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="refundSearch">
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
                <template slot-scope="scope">{{ scope.row.no}}</template>
            </el-table-column>
            <el-table-column
                    label="退款金额"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.list}}</template>
            </el-table-column>
            <el-table-column
                    label="商品名称"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.pay}}</template>
            </el-table-column>
            <el-table-column
                    label="用户名"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.name}}</template>
            </el-table-column>
            <el-table-column
                    label="下单时间"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.OrderTime}}</template>
            </el-table-column>

            <el-table-column
                    label="状态"
                    show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.state}}</template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    show-overflow-tooltip
            >
                <template slot-scope="scope"> <div class="btn" >
                    <el-button type="primary" @click="link" ><div @click="a=scope.row.id">详情</div></el-button>
                </div>
                    <div class="btn" v-if="scope.row.state=='待发货'" @click="centerDialogVisible = true">
                        <el-button type="success">发货</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog

                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <span>确定退款吗？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
        </el-dialog> <!--弹框-->
        <!--分页-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "refund-all-back",
        data(){
            return{
                a:'',
                centerDialogVisible: false,//弹框
                input1: '',
                input2: '',
                currentPage: 1,
                options: [
                    {
                        value: '退款中',
                        label: '退款中'
                    }, {
                        value: '已退款',
                        label: '已退款'
                    }
                ],
                value: '',
                searchData:[],
                tableData:[]
            }
        },
        created(){
            let uuid= JSON.parse(localStorage.getItem('userinfo')).uuid
            this.$http.post('/user/getOrderRefund.do',this.$qs.stringify({
                    uuid:uuid
                }))
                .then((res)=>{
                    console.log(res);
                    this.tableData=res.data.data[0]
                })
                .catch((err)=>{
                    return console.log(err);
                })
        },
    }
</script>

<style scoped>
    .refundSearch{
        margin-bottom: 30px;
    }
    .input{
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .el-input{
        width: 200px;
        margin: 0 40px;
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