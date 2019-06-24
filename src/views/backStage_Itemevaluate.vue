<template>
  <div>
    <main class="specification-content">
      <!-- 头部搜索 -->
      <header class="specification-content-top">
        <div style>
          <input type="text" placeholder="请输入商品名称" v-model="goodsName">
          <!-- 日期选择 -->
          <div class="block" id="block">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              align="right"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="serchTime"
            ></el-date-picker>
          </div>
          <!-- 品牌选择 -->
          <select name v-model="brandName">
            <option disabled value>请选择品牌名称</option>
            <option
              v-for="(item,index) in brandData"
              :key="index"
              :value="item.brandName"
            >{{item.brandName}}</option>
          </select>

          <!-- 等级选择 -->
          <select name v-model="commentLevel">
            <option value disabled>评价等级</option>
            <option value="1">好评</option>
            <option value="0">中评</option>
            <option value="-1">差评</option>
          </select>
          <!-- 回复选择 -->
          <select name v-model="replyState">
            <option value disabled>是否回复</option>
            <option value="0">未回复</option>
            <option value="1">已回复</option>
          </select>
          <button type="button" @click="serch">查询</button>
        </div>
      </header>
      <!-- 表格内容 -->
      <div class="specification-content-main">
        <table class="evaluateTable">
          <tr>
            <th>用户</th>
            <th>商品信息</th>
            <th>评价内容</th>
            <th>评价时间</th>
            <th>评价等级</th>
            <th>评价状态</th>
            <th>操作</th>
          </tr>
          <backStageItemEvaluates v-for="(item,index) in evaluateData" :key="index" :data="item"></backStageItemEvaluates>
        </table>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="pagingData.totalCount"
        :page-size="5"
        id="paging"
      ></el-pagination>
    </main>
  </div>
</template>
<script>
import backStageItemEvaluates from "@/components/backStage-ItemEvaluates.vue";
export default {
  name: "ItemS",
  components: {
    backStageItemEvaluates
  },
  data() {
    return {
      uuid: "",
      evaluateData: "", //评论数据
      brandData: "", //品牌数据
      pagingData: "", //分页数据
      currentPage: "", //当前页数
      goodsName: "", //搜索商品名
      brandName: "", //搜索品牌名
      beginTime: "", //开始时间
      endTime: "", //结束时间
      commentLevel: "", //评价等级
      replyState: "", //是否回复
      value1: "",
      value2: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {
   this.uuid =JSON.parse(localStorage.getItem("userinfo")).uuid
  // this.uuid='92628a3fbd1044b2aa5c78ccbaf1e7f2'
    // 品牌信息请求
    this.$http
      .post(
        "/manage/getbrand.do",
        this.$qs.stringify({
          uuid: this.uuid
        })
      )
      .then(res => {
        if (res.data.returncode == 200) {
          console.log("品牌请求成功");
            // console.log(res.data.data)
          this.brandData = res.data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });

    //   调用评论信息
    this.paging();
  },

  methods: {
    //   评论信息请求
    paging() {
      this.$http
        .post(
          "/manage/getcomment.do",
          this.$qs.stringify({
            uuid: this.uuid,
            pageSize: 5,
            currentPage: this.currentPage || 1,
            goodsName: this.goodsName || "",
            brandName: this.brandName || "",
            beginTime: this.beginTime || "",
            endTime: this.endTime || "",
            commentLevel: this.commentLevel || "",
            replyState:this.replyState||""
          })
        )
        .then(res => {
          if (res.data.returncode == 200) {
            console.log("评论请求成功");
            console.log(res.data.data);
            this.pagingData = res.data.data[1];
            this.evaluateData = res.data.data[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获得当前页数(并且再次发送请求)
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(`当前页: ${this.currentPage}`);
      this.paging();
    },
    //获取搜索的时间
    serchTime(val) {
      console.log(`时间改变了：${val}`);
      if (val == 0 || val == null) return;
      this.beginTime = val[0];
      this.endTime = val[1];
    },
    // 搜索查询
    serch() {
      this.paging();
    }
  }
};
</script>
<style scoped>
@import "../assets/css/backStage_Itemevaluate.css";
</style>

