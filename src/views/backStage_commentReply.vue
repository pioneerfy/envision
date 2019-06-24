<template>
  <div>
    <main class="replymain">
      <!-- 基本信息表格 -->
      <evaluationInfo v-if="form" :forms="form" ></evaluationInfo>

      <!-- 回复表格 -->
      <el-form ref="form"  label-width="80px" size="small">
        <div class="part-line">
          <p>回复信息</p>
        </div>
        <el-form-item label="回复人" style="width:300px">
          <el-input  disabled v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="回复内容" class="shoppingName1">
          <div class="edit_container">
            <quill-editor
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            ></quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="comment" class="replayCommit">确定回复</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; // 导入quillEditor组件
import evaluationInfo from "@/components/evaluationInfo.vue";
export default {
  name: "CommentReply",
  data: function() {
    return {
      form: "", //表单的数据
      uuid:'',
      username:"",

      content: "", // 编辑器的内容
      editorOption: {
        // 编辑器的配置
        // something config
      }
    };
  },
  components: {
    evaluationInfo,
    quillEditor // 声明组件quillEditor
  },
  created() {
    this.uuid =JSON.parse(localStorage.getItem("userinfo")).uuid
    this.username =JSON.parse(localStorage.getItem("userinfo")).username ;
    this.replyComment();
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    // 评论回复页面请求
    replyComment() {
      this.$http
        .post(
          "/manage/replyComment.do",
          this.$qs.stringify({
            uuid: this.uuid,
            commentId: this.$route.query.comment_id,

          })
        )
        .then(res => {
            console.log(res)
          if (res.data.returncode == 200) {
            console.log("请求成功");
            this.form= res.data.data;
             console.log("这是父组件里的值", this.form)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  //点击回复，发送请求
  comment(){
    this.$http.post('/user/customreply.do',this.$qs.stringify({
    uuid: this.uuid,
    commentId: this.$route.query.comment_id,
    replycomtext:this.content
    }))
    .then(res=>{
      if(res.data.returncode == 200){
        console.log("发送回复成功")
      }
    })
    .catch(err=>{
      console.log("发送回复失败")
      console.log(err)
    })
  }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>
<style scoped>
@import "../assets/css/backStage_commentReplay.css";
</style>

