<template>
  <tr>
    <td>用户：{{data.user_name}}</td>
    <td>
      <!--<div class="attitudeImg">-->
        <!--<img :src="url+this.data.url" alt="pictrue">-->
      <!--</div>-->
      <p class="attitudeshopping">
        <span>{{data.goods_name}}</span>
        <!-- <span>{{data.attr_name}}：{{data.attr_value}}</span> -->
      </p>
    </td>
    <td>
      <p class="comment-text">{{data.comment_text}}</p>
    </td>
    <td>{{data.create_at}}</td>
    <td>{{data.comment_level==1?'好评':data.comment_level==0?'中评':'差评'}}</td>
    <td>{{data.reply_state==0?'未回复':"已回复"}}</td>
    <td class="operate">
      <button type="button" :disabled="disabled" :class="state" @click="commentReply">回复</button>
      <button type="button" class="operateButton" @click="commentInfo">详情</button>
    </td>
  </tr>
</template>
<script>
export default {
  name: "backStage-ItemEvaluates",
  props: ["data"],
  data() {
    return {
      pic_url:this.data.pic_url,
      disabled: false,
      states: false,
        url:''
    };
  },
  computed: {
    state() {
      if (this.data.reply_state == 0) {
        this.states = true;
        this.disabled=false;
        return {
          operateButton: this.states && !this.disabled
        };
      } else {
        this.states = false;
        this.disabled = true;
        return {
          color: !this.states && this.disabled
        };
      }
    }
    //
  },
  methods: {
    // 回复跳转
    commentReply(){
      this.$router.push({name:'comment_reply',query:{comment_id:this.data.comment_id}})
    },
    // 详情跳转
    commentInfo(){
      this.$router.push({name:'comment_Info',query:{comment_id:this.data.comment_id}})
    }
  },
    created(){
        this.url=localStorage.getItem('URL')
    }
};
</script>
<style scoped>
tr td {
  height: 80px;
  /* line-height: 80px; */
  vertical-align: middle;
}
.attitudeImg {
  float: left;
  width: 50px;
  height: 42px;
}
.attitudeshopping{
    /* float: left; */
    height: 25px;
    overflow: hidden;
    margin-top: 20px;
     margin-left: 58px;
}
.attitudeshopping > span {
  display: block;
  text-align: left;
 
}
.attitudeImg > img {
  width: 100%;
  height: 100%;
}
.operateButton {
  background: black;
  color: white;
  border: none;
  outline: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.color {
  background: #999999;
  cursor: not-allowed;
    color: white;
  border: none;
  outline: none;
  padding: 5px 10px;
  border-radius: 5px;
}
.operate > button:first-child {
  margin-right: 15px;
}
.comment-text{
margin: 0 auto;
width: 80px;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
}
</style>


