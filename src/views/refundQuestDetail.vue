<template>
  <div class="refundrequest-specific">
    <div class="refundrequest-content">
      <p>退款原因*</p>
      <select name="" id="" class="refund-reason" v-model="reason">
        <option value="不喜欢，不想要">不喜欢，不想要</option>
        <option value="空包裹">空包裹</option>
        <option value="未按约定时间发货">未按约定时间发货</option>
        <option value="快递物流一直未送到">快递物流一直未送到</option>
        <option value="快递物流无跟踪记录">快递物流无跟踪记录</option>
        <option value="货物破碎已拒签">货物破碎已拒签</option>
      </select>
    </div>
    <div class="refundrequest-content">
      <p>退款金额*</p>
      <input type="text" class="refund-reason"  v-model="datas.goods_price" id="refundPrice" disabled>
    </div>
    <div class="refundrequest-content">
      <p>退款说明</p>
      <textarea name="" id="textarea" class="refund-reason" placeholder="退款说明" v-model="explain"></textarea>
    </div>
    <div>
      <el-button style="margin-top: 12px;" @click="next" id="refund-button">提交</el-button>
      <!-- <button type="button" id="refund-button">提交</button> -->
    </div>
  </div>
</template>
<script>
export default {
  props:['datas'],
  data() {
    return {
      price:'',
      reason:'',
      explain:''
    };
  },
  methods: {
    // 填写退款请求，点击提交，发送请求
    next() {
      this.$emit("nexts",this.reason,this.explain);
    } 


  }
};
</script>

