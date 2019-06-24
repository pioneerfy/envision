<template>
        <div>
            <Head></Head>
            <accountCon></accountCon>
            <Foot></Foot>
        </div>
</template>


<script>
    import Head from '@/components/head.vue'
    import accountCon from '@/components/accountCon.vue'
    import Foot from '@/components/foot.vue'
    export default {
        name: "account",
        components:{
            Head,
            accountCon,
            Foot
        },
        created(){
            // let userinfo={ uuid:'92628a3fbd1044b2aa5c78ccbaf1e7f2',username:'苏小博'}
            // let userJson=JSON.stringify(userinfo)
            // localStorage.setItem('userinfo',userJson)
        }
    }
</script>

<style scoped>

</style>