<template>
    <div class="body">
        <div class="bg">
            <div id="hello">{{time}},{{rname}}{{sex}}</div>
        </div>
        <div class="content clearFix">
            <nav class="fl">
                <ul id="nav">
                    <li><router-link to="/account">我的个人中心</router-link></li>
                    <li><router-link to="/personalInfo">个人资料</router-link></li>
                    <li><router-link to="/accountSafe">账户安全</router-link></li>
                    <li><router-link to="/myOrders">我的订单</router-link></li>
                    <li><router-link to="/foot">浏览足迹</router-link></li>
                    <li><router-link to="/myCous">优惠券</router-link></li>
                    <li><router-link to="/myAddress">我的地址</router-link></li>
                    <li><router-link to="/refund">退款记录</router-link></li>
                    <li><router-link to="/fav">我的心愿单</router-link></li>
                </ul>
            </nav>
            <div id="navcontent" class="fr">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "accountCon",
        data(){
            return{
                time:'',
                rname:'',
                sex:''
            }
        },
        created(){
            let uuid=JSON.parse(localStorage.getItem('userinfo')).uuid
            this.$http.post('/user/getHelloInfo.do', this.$qs.stringify({uuid:uuid})).then((res)=>{
                console.log(res);
                let sex=res.data.data[0].user_sex=='男'?'先生':'女士'
                this.$store.commit('setNameSex',{rname:res.data.data[0].user_name,sex:sex})
                this.rname=this.$store.state.rname
                this.sex=this.$store.state.sex
                // this.name=res.data.data[0].user_name
                // this.sex=res.data.data[0].user_sex=='男'?'先生':'女士'
            }).catch((err)=>{
                console.log(err)
            })
            let date=new Date();
            if(date.getHours()>=6&&date.getHours()<12){
                this.time='早上好';
            }else if(date.getHours()>=12&&date.getHours()<18){
                this.time='下午好';
            }else{
                this.time='晚上好'
            }
        },
        updated(){
            this.rname=this.$store.state.rname
            this.sex=this.$store.state.sex
        }
    }
</script>

<style scoped>
    @import '../assets/css/account.css';
</style>