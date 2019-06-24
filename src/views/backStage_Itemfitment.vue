<template>
  <div>
    <header>
      <h2>店铺装修</h2>
    </header>
    <main>
      <!-- 头部搜索 -->
      <!--  <header class="specification-content-top">
      <div style>-->
      <!-- 品牌选择 -->
      <!--   <select name v-model="brandName">
              <option disabled value>请选择品牌名称</option>
              <option
                v-for="(item,index) in brandData"
                :key="index"
                :value="item.brandName"
              >{{item.brandName}}</option>
            </select>
            <button type="button" >添加</button>
          </div>
      </header>-->
      <el-row class="specification-content">
        <!-- 迪奥 -->
        <el-col :span="4" class="fitment-content">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image" @click="card(1)"
            >
            <div style="padding: 14px;">
              <span>迪奥</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button">添加图片</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 阿玛尼 -->
        <el-col :span="4" class="fitment-content">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image" @click="card(2)"
            >
            <div style="padding: 14px;">
              <span>阿玛尼</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button">添加图片</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 香奈儿 -->
        <el-col :span="4" class="fitment-content">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image" @click="card(3)"
            >
            <div style="padding: 14px;">
              <span>香奈儿</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button">添加图片</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 纪梵希 -->
        <el-col :span="4" class="fitment-content">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image" @click="card(4)"
            >
            <div style="padding: 14px;">
              <span>纪梵希</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button">添加图片</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 圣罗兰 -->
        <el-col :span="4" class="fitment-content">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image" @click="card(5)"
            >
            <div style="padding: 14px;">
              <span>圣罗兰</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button">添加图片</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods:{
      card(index){
          this.$router.push({name:'backStage_fitmentCard',params:{pinpai:index}})
      }
  }
};
</script>
<style scoped>
@import "../assets/css/backStage_Itemevaluate.css";
.time {
  font-size: 13px;
  color: #cccccc;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
  color: #333333;
  font-weight: 700
}

.image {
  width: 100%;
  display: block;
  cursor: pointer;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.fitment-content {
  margin-right: 20px;
}
.specification-content{
    margin-top: 100px;
}
.fitment-content:first-child{
    margin-left: 55px;
}
</style>
