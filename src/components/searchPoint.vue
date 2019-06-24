<template>
    <div class="search">
        <div class="sh-wrap">
            <input type="text" class="sh-input" id="search-inp" v-model="inpValue" @keyup="onInp($event)" @blur="goodsName = [];currentSelection = -1;inpValue=''" placeholder="输入商品名查找" autocomplete="off">
            <button type="button" class="sh-btn iconfont icon-chazhao" id="search-btn" @click="searchBegin('search')"></button>
        </div>
        <ul id="search-word" class="proposal-list">
            <li class="proposal" v-for="(item,index) in goodsName" :key="index" :class="{selected : currentSelection == index}" @click="check(item)">{{item}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'searchPoint',
    data() {
        return {
            userInp: '',    // 用户输入的值
            inpValue: '',   // input的值
            currentSelection: -1,   // 提示下拉位置
            goodsName: [],
        }
    },
    methods: {
        onInp: function(e) {
            if(this.inpValue != '' && this.inpValue != ' ') {
                switch(e.keyCode) {
                    case 38: // Up arrow
                    this.$options.methods.upArrow.bind(this)()
                    break
                    case 40: // Down arrow
                    this.$options.methods.downArrow.bind(this)()
                    break
                    case 13: // Enter
                    this.$options.methods.searchBegin.bind(this)('search')
                    this.goodsName = []
                    this.currentSelection = -1
                    this.inpValue = ''
                    break 
                    case 27: // Esc
                    this.$options.methods.esc.bind(this)()
                    break
                    default: 
                    this.userInp = JSON.parse(JSON.stringify(this.inpValue))
                    this.$options.methods.point.bind(this)(this.userInp)    
                }
            }
        },
        downArrow() {
            if(this.currentSelection + 1 < this.goodsName.length) {
                this.currentSelection++
                this.inpValue = this.goodsName[this.currentSelection]
            }
        },
        upArrow() {
            if((this.currentSelection -1) >= 0) {
                this.currentSelection--
                this.inpValue = this.goodsName[this.currentSelection]
            } else {
                this.currentSelection = -1
                this.inpValue = this.userInp
            }
        },
        keyEnter() {
            this.$options.methods.search.bind(this)()
        },
        esc() {
            this.inpValue = ''
            this.goodsName = []
        },
        check(keyWord) {
            this.currentSelection = -1
            this.inpValue = keyWord
            this.goodsName = []
        },
        searchBegin(url) {  // 点击搜索按钮
            if(this.inpValue != '' && this.inpValue != ' ') {
               const route = {
                   name: url,
                   query: {keyword:this.inpValue},
               };
               this.$router.push(route) 
            }
        },
        point() {
            if(this.inpValue != '' && this.inpValue != ' ') {
                this.$http.get('/goods/search.do',{
                    params: {
                        keyWord: this.userInp,
                        current: 1,
                        size: 6,
                        isHot: 1,
                    }
                })
                .then((res) => {
                    if(res.data.returncode != -1) {
                        this.goodsName = res.data.data[3].map(function(ele) {
                            return ele.goods_name
                        })
                    } else {
                        this.goodsName = []
                    }
                })
                .catch()
            }   
        }
    }
}
</script>

<style scoped>
    .selected {
        background: #0e0e0e;
        color: white;
    }

    .proposal:hover {
        background: #0e0e0e;
        color: white;
    }

    .proposal-list {
        width: 263px;
        margin-top: 10px;
        position: absolute;
        z-index: 2;
        background: white;
        border: 1px solid #e4e3e3;
        border-radius: 8px;
    }
    .proposal {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        cursor: pointer;
        padding-left: 15px;
        padding-right: 15px;
    }
    .proposal:first-child {
        padding-top: 10px;
        height: 50px;
    }
    .proposal:last-child {
        height: 50px;;
        padding-bottom: 10px;
    }
    .proposal:not(:last-child) {
        border-bottom: 1px solid #adadad;
    }
</style>
