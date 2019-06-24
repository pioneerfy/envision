<template>
  <div>
    <main>
      <!-- 头部订单量的展示 -->
      <div class="itemHome">
        <!-- 未支付 -->
        <div class="ordersShow">
          <i class="iconfont icon-dingdandaifukuan"></i>
          <p>
            <span>{{dataStatus.pendingPaymentName}}</span>
            <span class="orderStrength">{{dataStatus.pendingPayment}}</span>
          </p>
        </div>
        <!-- 未发货 -->
        <div class="ordersShow specital1">
          <i class="iconfont icon-yuyuedingdan"></i>
          <p>
            <span>{{dataStatus.toBeShippedName}}</span>
            <span class="orderStrength">{{dataStatus.toBeShipped}}</span>
          </p>
        </div>
        <!-- 未收货 -->
        <div class="ordersShow specital2">
          <i class="iconfont icon-dingdanchulizhong"></i>
          <p>
            <span>{{dataStatus.goodsToBeReceivedName}}</span>
            <span class="orderStrength">{{dataStatus.goodsToBeReceived}}</span>
          </p>
        </div>
        <!-- 待评价 -->
        <div class="ordersShow specital3">
          <i class="iconfont icon-dingdanyichenggong"></i>
          <p>
            <span>{{dataStatus.toBeEvaluatedName}}</span>
            <span class="orderStrength">{{dataStatus.toBeEvaluated}}</span>
          </p>
        </div>
        <!-- 退款单 -->
        <div class="ordersShow specital4">
          <i class="iconfont icon-dingdan"></i>
          <p>
            <span>{{dataStatus.refundName}}</span>
            <span class="orderStrength">{{dataStatus.refund}}</span>
          </p>
        </div>
      </div>
      <!-- 快速页面跳转 -->
      <div class="header-common">
        <h2>常用功能</h2>
        <p class="commonFunction">
          <span class="iconfont icon-fabu"></span>
          <span @click="$router.push('/manage/goodslist')" style="cursor: pointer">发布商品</span>
        </p>
        <p class="commonFunction">
          <span class="iconfont icon-icon"></span>
          <span @click="$router.push('/manage/HOrder')" style="cursor: pointer">订单管理</span>
        </p>
        <p class="commonFunction commonFunction1">
          <span class="iconfont icon-tuikuan"></span>
          <span @click="$router.push('/manage/HOrder')" style="cursor: pointer">处理退款</span>
        </p>
        <p class="commonFunction">
          <span class="iconfont icon-pingjia-copy"></span>
           <span @click="$router.push('/manage/backStage_Itemevaluate')" style="cursor: pointer">评价回复</span>
        </p>
      </div>
      <!-- 中间数据表的展示 -->
      <div class="dataChart clear">
        <!-- 商品分类销售额 -->
        <div id="myChart"></div>
        <!-- 商品品牌销售额 -->
        <div id="myChart1"></div>
        <!-- 退款单 -->
        <div id="myChartrefund"></div>
        <!-- 订单状态销售额 -->
        <div id="myChartOrder"></div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      dataStatus: "",
      uuid: "",
      dataClassify: [], //分类数据
      dataClasses: [], //分类数量
      datas: [], //品牌数据
      databrand: [], //品牌数量
      dataRefund: [], //退款数据
      datastrenth: [], //退款数量
      dataorder:[],//订单状态数据,
      dataorders:[],//订单状态数量
      flag: false
    };
  },
  created() {
    this.uuid =JSON.parse(localStorage.getItem("userinfo")).uuid
    this.orderStutas(); // 订单状态数量
    this.brand(); //品牌（种类）数量
    this.refund(); //退款数量比例
  },
  mounted() {
  },
  methods: {
    // 订单状态数量请求
    orderStutas() {
      this.$http
        .post(
          "/order/count.do",
          this.$qs.stringify({
            uuid: this.uuid
          })
        )
        .then(res => {
          if (res.data.returncode == 200) {
            console.log(res);
            this.dataStatus = res.data.data[0];
            // console.log("订单状态数量请求成功", res.data.data[0]);
            this.dataorder.push(this.dataStatus.pendingPaymentName)
            this.dataorder.push(this.dataStatus.toBeShippedName)
            this.dataorder.push(this.dataStatus.goodsToBeReceivedName)
            this.dataorder.push(this.dataStatus.toBeEvaluatedName)
            this.dataorder.push(this.dataStatus.alreadyEvaluatedName)
            this.dataorder.push(this.dataStatus.cancellationOfOrderName)
            console.log("订单状态数据请求成功", this.dataorder);


            this.dataorders.push(this.dataStatus.pendingPayment)
            this.dataorders.push(this.dataStatus.toBeShipped)
            this.dataorders.push(this.dataStatus.goodsToBeReceived)
            this.dataorders.push(this.dataStatus.toBeEvaluated)
            this.dataorders.push(this.dataStatus.alreadyEvaluated)
            this.dataorders.push(this.dataStatus.cancellationOfOrder)
              console.log("订单状态数量成功", this.dataorders);
            this.drawLine2();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 品牌(种类)请求
    brand() {
        let that=this
      this.$http
        .post("/manage/selectBrandAndPid.do", this.$qs.stringify({
          uuid: that.uuid
        }))
        .then(res => {
            console.log(res)
          if (res.data.returncode == 200) {
            // 品牌
            console.log("品牌种类请求成功", res.data.data[0]);
            that.datas.push(res.data.data[0].brand1Name);
            that.datas.push(res.data.data[0].brand2Name);
            that.datas.push(res.data.data[0].brand3Name);
            that.datas.push(res.data.data[0].brand4Name);
            that.datas.push(res.data.data[0].brand5Name);
            that.databrand.push(res.data.data[0].brand1);
            that.databrand.push(res.data.data[0].brand2);
            that.databrand.push(res.data.data[0].brand3);
            that.databrand.push(res.data.data[0].brand4);
            that.databrand.push(res.data.data[0].brand5);
            // 分类
            that.dataClassify.push(res.data.data[0].pid1Name);
            that.dataClassify.push(res.data.data[0].pid2Name);
            that.dataClassify.push(res.data.data[0].pid3Name);
            that.dataClassify.push(res.data.data[0].pid4Name);
            that.dataClassify.push(res.data.data[0].pid5Name);
            that.dataClasses.push(res.data.data[0].pid1);
            that.dataClasses.push(res.data.data[0].pid2);
            that.dataClasses.push(res.data.data[0].pid3);
            that.dataClasses.push(res.data.data[0].pid4);
            that.dataClasses.push(res.data.data[0].pid5);
            this.drawLine();
            that.drawLine1();

            // this.flag=true;
          }
        });
    },
    //退款数据请求
    refund() {
      const that = this;
      that.$http
        .post("/manage/selectRefundCount.do", this.$qs.stringify({
          uuid: that.uuid
        }))
        .then(res => {
          if (res.data.returncode == 200) {
            that.dataRefund.push(res.data.data[0].applyedName);
            that.dataRefund.push(res.data.data[0].applyingName);
            that.dataRefund.push(res.data.data[0].notApplyName);
            console.log("退款数据请求成功", that.dataRefund);

            that.datastrenth.push(res.data.data[0].applyed);
            that.datastrenth.push(res.data.data[0].applying);
            that.datastrenth.push(res.data.data[0].notApply);
            console.log("退款数据请求成功", that.dataRefund);
            that.drawLine3();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //   商品分类展示
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "商品分类销售额" },
        tooltip: {},
        xAxis: {
          type: "category",
          data: this.dataClassify
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.dataClasses,
            itemStyle: {
              normal: {
                color: "rgb(89, 187, 253)"
              }
            }
          }
        ]
      });
    },
    // 商品品牌展示
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      console.log(this.datas);
      // 绘制图表
      myChart.setOption({
        title: { text: "商品品牌销售额" },
        tooltip: {},
        xAxis: {
          type: "category",
          data: this.datas
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.databrand,
            itemStyle: {
              normal: {
                color: "rgb(211, 230, 104)"
              }
            }
          }
        ]
      });
    },
    // 订单状态销售额
    drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChartOrder"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "订单状态比例"
        },
        tooltip: {
          trigger: "axis"
        },
        radar: [
          {
            indicator: [
              { text: this.dataorder[0], min: 0 },
              { text: this.dataorder[1], min: 0},
              { text: this.dataorder[2], min: 0 },
              { text:this.dataorder[3], min: 0 },
              { text: this.dataorder[4], min: 0},
              { text: this.dataorder[5], min: 0}
            ],
            center: ["50%", "50%"],
            radius: 80
          }
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [
              {
                value: this.dataorders,
                name: "某软件"
              }
            ]
          }
        ]
      });
    },
    // 订单退款销售额
    drawLine3() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("myChartrefund")
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: "订单退款比例",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.dataRefund
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: this.datastrenth[0], name: this.dataRefund[0] },
              { value: this.datastrenth[1], name: this.dataRefund[1] },
              { value: this.datastrenth[2], name: this.dataRefund[2] }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
  @import '../assets/fonts/fonts-s/iconfont.css';
.dataChart > div {
  float: left;
  margin-top: 50px;
  color: rgb(230, 165, 104);
}
#myChart,
#myChart1 {
  width: 40% !important;
  height: 400px !important;
  margin-left: 50px;
}
#myChartOrder,
#myChartrefund {
  width: 85%;
  height: 300px;
  margin-left: 50px;
}
/* #myChartrefund {
  width: 100%;
  height: 400px;
  margin-left: 50px;

} */
/* 头部订单量 */
.itemHome {
  text-align: center;
  margin: 30px 0px;
}
.ordersShow {
  width: 180px;
  height: 180px;
  line-height: 180px;
  border-radius: 50%;
  /* border-radius: 50%; */
  background: rgba(204, 204, 204, 0.148);
  display: inline-block;
  margin-right: 30px;
  color: #999999;
  font-weight: 700;
  position: relative;
  letter-spacing: 8px;
}
.ordersShow:last-child {
  margin-right: 0px;
}
.ordersShow .iconfont {
  font-size: 60px;
  color: rgb(241, 146, 146);
  float: left;
  margin-left: 15px;
  font-weight: 500;
}
.specital1 .iconfont {
  color: rgb(146, 241, 201);
}
.specital2 .iconfont {
  color: rgb(146, 179, 241);
}
.specital3 .iconfont {
  color: rgb(241, 231, 146);
}
.specital4 .iconfont {
  color: rgb(241, 146, 217);
}
.orderStrength {
  /* display: block; */
  position: absolute;
  right: 20px;
  bottom: -30px;
  font-weight: 400;
  color: rgb(150, 148, 148, 0.508);
  letter-spacing: 0;
}
/* 常用功能设置 */
.commonFunction {
  width: 250px;
  height: 100px;
  line-height: 100px;
  display: inline-block;
  margin-right: 20px;
  border-radius: 5px;
  color: white;
  background: hsl(182, 46%, 77%) !important;
}
.commonFunction .iconfont {
  font-size: 26px;
  margin-left: 25px;
  margin-right: 5px;
}
.commonFunction1 .iconfont {
  font-size: 30px;
  margin-left: 25px;
  margin-right: 5px;
}
.commonFunction:nth-child(2) {
  background: hsl(203, 46%, 77%) !important;
}
.commonFunction:nth-child(3) {
  background: hsl(310, 46%, 77%) !important;
}
.commonFunction:nth-child(4) {
  background: hsl(0, 46%, 77%) !important;
}
.header-common {
  margin: 50px 0px 50px 50px;
  text-align: center;
}
.header-common > h2 {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
}
</style>



