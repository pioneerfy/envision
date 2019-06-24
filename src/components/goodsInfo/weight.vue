<template>
    <div>
        <span @click="changeStyle(index)" :class="{'weight-style':index==flag}" class="weight-span" v-for="(goods,index) in goods" :key="index">{{goods.attr_value}}</span>
    </div>
</template>

<script>
    export default {
        name: "Weight",
        props: ['showWeight','goods','flag','changeStyle']
    }
</script>

<style scoped>
    .weight-span{
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #cccccc;
        margin-bottom: 10px;
    }
    .weight-span{
        display: inline-block;
        cursor: pointer;
        transition: all linear .2s;
        border-radius: 5px;
        user-select: none;
    }
    .weight-span:hover{
        box-shadow: #666 0 0 3px;
    }
    .weight-span:not(:last-child){
        margin-right: 10px;
    }
    .weight-style{
        border: 3px solid #cccccc!important;
    }
</style>