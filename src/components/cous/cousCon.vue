<template>
        <li>
            <div class="cous-con">
                <div class="con-top clearFix">
                    <div class="fl">￥<span>{{cous.cousPrice}}</span></div>
                    <div class="fr">全店通用</div>
                </div>
                <div class="con-bottom">
                    <div>使用条件：无门槛</div>
                    <div>有效时间：{{cous.cousBtime}} 至 {{cous.cousEndtime}}</div>
                </div>
            </div>
        </li>
</template>

<script>
    export default {
        name: "cous-con",
        props:['cous']
    }
</script>

<style scoped>
    #cous-content{
        padding-top: 40px;
        height: 400px;
    }
    #cous-content li{
        display: inline-block;
        height: 153px;
        width: 241px;
        background-image: url("../../assets/images/sxb/cousbg.png");
        background-color: #ed544c;
        /*background-color: #111111;*/
        background-position: -123px 0;
        padding: 15px;
        opacity: .75;
        margin-right: 43px;
        margin-top: 20px;
    }
    #cous-content li:nth-child(3n){
        margin-right: 0;
    }
    #cous-content li:hover{
        opacity: 1;
    }
    #cous-content li .cous-con{
        width: 100%;
        height: 100%;
        color: white;
        font-size: 12px;
    }
    .cous-con .con-top{
        margin-bottom: 30px;
    }
    .cous-con .fl{
        font-size: 20px;
        font-weight: bold;
    }
    .cous-con .fl span{
        font-size: 30px;
    }
    .cous-con .fr{
        font-size: 14px;
        padding-top: 10px;
        font-weight: normal;
    }
    .con-bottom{
        font-family: tahoma,arial,'Hiragino Sans GB',SimSun,'\5b8b\4f53',sans-serif;
        font-weight: lighter;
    }
</style>