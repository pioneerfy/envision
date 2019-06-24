<template>
    <div>
        <Head/>
        <CommentUpload />
        <Foot />
    </div>
</template>

<script>
    import Head from '@/components/head.vue'
    import CommentUpload from "../components/comment/commentUpload";
    import Foot from '../components/foot.vue'
    export default {
        name: "Comment",
        components: {CommentUpload, Head, Foot},
        data() {
            return {
            }
        },
    }
</script>

<style scoped>
    @import '../assets/fonts/fonts-d/iconfont.css';
    /*@import '../assets/css/comment.css';*/

</style>