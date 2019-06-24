<template>
    <section class="four-pic">
        <div class="s-bannerpic banner-pic" v-for="item in banner2_data">
            <div class="sb-word">
                <p class="w-p">{{item.bannerDesc}}</p>
            </div>
            <img :src="url+item.bannerUrl" alt="">
            <div class="spic-mask"></div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "banner2",
        data(){
            return {
                banner2_data:'',
                url:''
            }
        },
        created() {
            this.url=localStorage.getItem('URL')
            //请求banner2数据
            this.$http.get('/goods/getBanner2.do',{
                params:{
                    bannerType:2,
                }})
                .then((res)=>{
                    console.log('banner2信息',res);
                    this.banner2_data = res.data.data;
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
    }
</script>


<style scoped>
/*banner2*/
.four-pic{
    width: 1170px;
    height: 220px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
}
.s-bannerpic{
    height: 100%;
    width: 260px;
    background-color: #1e89f6;
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 3px 10px -3px #a8a8a8;
}
.s-bannerpic img{
    width: 100%;
    height: 100%;
    transition: all 2s;
}
.s-bannerpic:hover img{
    transform: scale(1.2);
}
.spic-mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(117, 117, 117, 0.45);
}
.sb-word{
    position: absolute;
    bottom: 15px;
    font-size: 18px;
    width: 100%;
    text-align: center;
    color: #ffffff;
    z-index: 2;
}
</style>