<template>

      <el-form ref="form"  label-width="80px" size="small">
        <el-form-item label="用户名称">
            <el-input  disabled v-model="this.forms[0].user_name" style="width:20%"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" class="shoppingName">
          <el-input  disabled v-model="this.forms[0].goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品详情" class="shoppingName">
          <span>
            品牌
            <el-input  class="miniInput" disabled v-model="forms[0].brand_name"></el-input>
          </span>
          <span>
           {{this.forms[0].attr_name}}
            <el-input v-model="this.forms[0].attr_value" class="miniInput" disabled></el-input>
          </span>
          <span>
            价格：
            <el-input v-model="this.forms[0].goods_price" class="miniInput" disabled></el-input>
          </span>
          <span>
            积分：
            <el-input v-model="this.forms[0].goods_point" class="miniInput" disabled></el-input>
          </span>
        </el-form-item>
        <!--<el-form-item label="商品图片">-->
          <!--<img :src="url+this.forms[0].attrpic" alt="picture" id="shoppingImg">-->
        <!--</el-form-item>-->
        <el-form-item label="商品描述" class="shoppingName1">
          <el-input  disabled v-model="this.forms[0].goods_descript"></el-input>
        </el-form-item>
        <div class="part-line">
          <p>评价信息</p>
        </div>
        <el-form-item label="评价时间">
            <span id="time">{{this.forms[0].create_at}}</span>
        </el-form-item>
        <el-form-item label="评价等级">
            <el-radio label="好评"  v-model="radio"  ></el-radio>
            <el-radio label="中评" v-model="radio"  ></el-radio>
            <el-radio label="差评" v-model="radio"  ></el-radio>
        </el-form-item>
        <!--<el-form-item label="评价图片">-->
          <!--<div class="evaluateImg" v-for="(item,index) in forms[0].commentPic" :key="index">-->
            <!--<img :src="url+item.pic_url" alt="picture">-->
          <!--</div>-->
        <!--</el-form-item>-->
        <el-form-item label="评价内容" class="shoppingName1">
          <el-input
            type="textarea"
            v-model="this.forms[0].comment_text"
            maxlength="30"
            show-word-limit
            resize="none"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
</template>
<script>
export default {
  name:"evaluationInfo",
  props:['forms'],
  data(){
    return{
      radio:'',
        url:''
    }
  },
  created(){
      this.url=localStorage.getItem('URL')
    // console.log("这是子组件里的值",this.forms)
    this.grade();
  },
  methods:{
    // 判断现在评论等级
    grade(){
      console.log(this.forms[0])
      if(this.forms[0].comment_level==1){
        this.radio="好评"
      }
      if(this.forms[0].comment_level==0){
        this.radio="中评"
      }
      if(this.forms[0].comment_level==-1){
        this.radio="差评"
      }
    }
  }
}
</script>
<style scoped>
#time{
  color: rgb(171, 174, 180);
  font-weight: 500;
  -webkit-margin-collapse: 8px;
}
</style>


