<template>
  <div>
    <!-- 头部 -->
    <heads/>
    <div class="refund-info refundQequst">
      <div>
        <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
          <el-step title="买家申请退款"></el-step>
          <el-step title="退款完成"></el-step>
        </el-steps>
      </div>

      <main>
        <!--商品基本信息 -->
        <refundShopping :datas="datas"/>
        <!-- 买家选择退款类型等 -->
        <router-view @nexts="next" :datas="datas"></router-view>
      </main>
    </div>
    <foots/>
  </div>
</template>
<script>
// import refundProcess from "@/components/refundProcess.vue";
import refundShopping from "@/components/refundShopping";
import heads from "@/components/head.vue";
import foots from "@/components/foot.vue";
export default {
  data() {
    return {
      active: 1,
      datas: "",
      uuid: "",
      attrId: null,
      ordersId: null,
    };
  },
  created() {
    this.ordersId = this.$route.query.ordersId;
    this.attrId = this.$route.query.attrId;
    this.uuid = JSON.parse(localStorage.getItem("userinfo")).uuid
    this.$http
      .post(
        "/user/refundment.do",
        this.$qs.stringify(
       {
          uuid: this.uuid,
          ordersId:this.ordersId,
          attrId:this.attrId
        })
      )
      .then(res => {
        if (res.data.returncode == 200) {
          console.log("退款商品详情请求成功",res.data.data[0]);
          this.datas = res.data.data[0];
          return this.datas;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // 发送退款请求
     next(reason,explain) {
         console.log('订单id',this.ordersId)
      this.$http.post(
        "/user/refundmentinfo.do",
        this.$qs.stringify({
          uuid: this.uuid,
          orderId: this.ordersId,
          attrId:this.attrId,
          totalPrice:this.datas.goods_price,//请求的金额
          refundReason: reason,
          refundState: explain
        })
      )
      .then(res=>{
        if(res.data.returncode==200){
          console.log("上传退款原因成功");
          this.$router.push('/refundQequest/refundWaitting')
          if (this.active++ > 2) this.active = 0;
        }
      })
      .catch(err=>{
        console.log(err)
      })
      
    }
  },
  components: {
    heads,
    foots,
    refundShopping
  }
};
</script>

<style scoped>
@import "../assets/css/refund_info.css";
@import "../assets/css/refundQequest.css";
</style>
