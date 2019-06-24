<template>
  <div class="refund-content-goods">
    <div class="refund-content-goodsImg">
      <img :src="url+this.datas.pic_url" alt="picture">
    </div>
    <div class="refund-content-goodsInfo">
      <p>{{datas.goods_name}}</p>
      <p>{{datas.goods_descript}}</p>
      <p>{{datas.attr_name}}：{{datas.attr_value}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name:'refundShopping',
  props:['datas'],
  data(){
    return{
        url:''
    }
  },
    created(){
        this.url=localStorage.getItem('URL')
    }
}
</script>

