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
          <el-input v-model="username" disabled></el-input>
        </el-form-item>
        <el-form-item label="回复内容" class="shoppingName1">
          <el-input
            type="textarea"
            v-model="replyComText"
            maxlength="30"
            show-word-limit
            resize="none"
            disabled
          ></el-input>
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
      replyComText:"",
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
    this.username =JSON.parse(localStorage.getItem("userinfo")).username
    // this.uuid='92628a3fbd1044b2aa5c78ccbaf1e7f2'
    this.replyComment();
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    onSubmit() {
      console.log("submit!");
    },
    // 评论回复请求
    replyComment() {
      this.$http
        .post(
          "/manage/replyComment.do",
          this.$qs.stringify({
            uuid: this.uuid,
            commentId: this.$route.query.comment_id
          })
        )
        .then(res => {
          if (res.data.returncode == 200) {
            this.form= res.data.data;
             console.log("这是父组件里的值",)
             this.replyComText=res.data.data[0].replyComText
          }
        })
        .catch(err => {
          console.log(err);
        });
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

