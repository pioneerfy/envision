<template>

</template>

<script>
    export default {
        name: "pagination",
        data() {
            return {
                total: 5, //总数
                pageSize: 1, //每页显示个数
                currentPage: 1, //当前页
                pagerCount:5, //显示的按钮个数
                pageSizes: 10  //每页显示个数选择器的选项设置
            }
        }
    }
</script>

<style scoped>

</style>