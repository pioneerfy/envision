<template>
<div>
    <header>
        <h2>店铺装修>迪奥</h2>
    </header>
     <el-carousel :interval="2000" type="card" height="350px" trigger="click">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3 class="medium">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
export default {
name:'fitmentCard',
  data() {
    return {};
  },
};
</script>
<style scoped>
.el-carousel{
    width:90%;
    margin: 50px auto;

}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>