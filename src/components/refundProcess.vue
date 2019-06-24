<template>
  <div>
    <el-steps :actives="active" finish-status="success">
      <el-step title="1、买家申请退款"></el-step>
      <el-step title="2、卖家处理退款申请"></el-step>
      <el-step title="3、退款完毕"></el-step>
    </el-steps>
  </div>
</template>
<script>
export default {
    name:'process',
    prop:['active'],
    data(){
        return {
            actives:''
        }
    } 
}
</script>

