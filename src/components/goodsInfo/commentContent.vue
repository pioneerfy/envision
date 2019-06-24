<template>
    <div>
        <div class="demo-comment clear" v-for="(comment,index) in comments" :key="index">
            <!-- 头像 -->
            <div class="comment-head">
                <div class="head-top">
                    <img :src="url+comment.user_head" class="head-img">
                </div>
                <div class="head-bottom">
                    <p class="p-head-name">{{comment.user_name}}</p>
                </div>
            </div>
            <!-- 内容 -->
            <div class="comment-info">
                <div class="star-div">
                    <!--<span class="iconfont icon-shoucang"></span>-->
                    <el-rate
                            v-model="comment.star"
                            disabled
                            show-score
                            text-color="#ff9900"
                            :score-template="comment.star+'分'">
                    </el-rate>
                </div>
                <div class="comment-descript">
                    {{comment.comment_text}}
                    <div class="comment-img" v-if="comments">
                        <img v-for="(picList,index1) in comments[index].pic_url" :key="index1" :src="url+picList" id="comment-img">
                    </div>
                    <div class="time">
                        <div class="comment-time">{{comment.create_at}}</div>
                        <div class="attr">{{comment.attr_num}}</div>
                    </div>
                    <!-- 客服回复 -->
                    <div class="reply" v-if="comment.replyComText">
                        <div class="reply-content">卖家回复：{{comment.replyComText}}</div>
                        <p class="reply-time">{{comment.replyComTime}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CommentContent",
        props: ['comments'],
        data() {
            return {
                picList: '',
                url:''
            }
        },
        methods: {
            fn() {
                // 判断内容是否为空
                for (let i=0;i<this.comments.length;i++) {
                    if (!this.comments[i].comment_text){
                        this.comments[i].comment_text = '此用户没有填写评论!'
                    }
                }
            }
        },
        created() {
            this.url=localStorage.getItem('URL')
            this.fn();
        }
    }
</script>

<style scoped>
    /* 回复 */
    .reply,.reply-content,.reply-time{
        padding: 10px 0;
        color: #AF874D;
        font-size: 14px;
    }
    /* 评论列表 */
    .demo-comment{
        padding: 20px 70px;
        border-bottom: 1px solid #eeeeee;
    }
    /*.demo-comment:last-child{*/
        /*border-bottom: 0;*/
    /*}*/
    .h2-name{
        font-size: 20px;
        font-weight: bolder;
        margin-bottom: 15px;
    }
    .p-descript{
        font-size: 16px;
        color: #999999;
    }
    .comment-head,.comment-info{
        float: left;
    }
    .comment-head{
        width: 8%;
        /*background-color: yellow;*/
        text-align: center;
    }
    .comment-info{
        width: 92%;
        padding: 0 10px 20px 40px;
        /*background-color: #63a35c;*/
    }
    /* 头像图片 */
    .head-img{
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
    .p-head-name{
        font-size: 12px;
    }
    /* 评论内容 */
    .comment-descript,.comment-img,.time{
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .comment-img img{
        width: 100px;
        height: 100px;
        margin-right: 10px;
    }
    .comment-time,.attr{
        width: 25%;
        float: left;
        color: #cccccc;
        font-size: 14px;
    }
    .icon-shoucang {
        width: 30px;
        display: inline-block;
        height: 30px;
        font-size: 15px;
        cursor: pointer;
        text-align: center;
        color: red;
        transition: all linear .2s;
    }
</style>