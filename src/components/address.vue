<template>
    <div class="address-wrap" >
        <div class="add-name">{{data.address_name}}</div>
        <div class="add-tel">{{data.address_tel}}</div>
        <div class="add-address1">{{data.address_pro+' '+data.address_city+' '+data.address_dis}}</div>
        <div class="add-address2">{{data.address_minute}}</div>
        <div class="add-ctrl">
            <slot name="default"></slot>
            <slot name="edit"></slot>
            <!--<button class="edit" type="button" data-addid="${ele.address_id}">修改本地址</button>-->
            <slot name="del"></slot>
        </div>
    </div>




</template>

<script>
    export default {
        name: "Address",
        props:['data'],
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>

<style scoped>
    .address-wrap{
        width: 250px;
        height: 180px;
        margin-right: 55px;
        background-color: #ffffff;
        margin-bottom: 15px;
        border: 1px solid #e0e0e0;
        padding: 20px;
        font-size: 14px;
        color: #757575;
        cursor: pointer;
        box-shadow: 0 3px 10px -3px #a8a8a8;
    }
    .address-content>div:nth-of-type(4n){
        margin-right: 0;
    }

    .address-wrap:hover .add-ctrl{
        display: block;
    }
    .add-name{
        font-size: 18px;
        margin-bottom: 15px;
        color: #444444;
    }
    .add-tel{
        margin-bottom: 5px;
    }
    .add-address1,.add-address2{
        margin-bottom: 5px;
        height: 22px;
        line-height: 22px;
    }
    .add-ctrl{
        margin-top: 20px;
        text-align: right;
        display: none;
    }
    .add-ctrl button{
        border: none;
        outline: none;
        color: #888;
        padding: 2px 4px;
        background-color: white;
        cursor: pointer;
        font-size: 12px;
    }
    .add-ctrl button:hover{
        text-decoration: underline;
        color: black;
    }
</style>