<template>
    <canvas class="Verification" @click="refreshCode" id="s-canvas" :width="contentWidth" :height="contentHeight" ></canvas>
</template>

<script>

    export default {
        name: "Test",
        props: {
            fontSizeMin: {
                type: Number,
                default: 16
            },
            fontSizeMax: {
                type: Number,
                default: 40
            },
            backgroundColorMin: {
                type: Number,
                default: 180
            },
            backgroundColorMax: {
                type: Number,
                default: 240
            },
            colorMin: {
                type: Number,
                default: 50
            },
            colorMax: {
                type: Number,
                default: 160
            },
            lineColorMin: {
                type: Number,
                default: 40
            },
            lineColorMax: {
                type: Number,
                default: 180
            },
            dotColorMin: {
                type: Number,
                default: 0
            },
            dotColorMax: {
                type: Number,
                default: 255
            },
            contentWidth: {
                type: Number,
                default: 125
            },
            contentHeight: {
                type: Number,
                default: 46
            }
        },
       data() {
           return {
               fontstyle: {},
               loginForm: {
                   verifycode: ''
               },
               checked: false,
               identifyCode: { //默认注册码
                   type: String,
                   default: '1234'
               },
               identifyCodes: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345789'
           }
       },
       created() {
       },
        watch: {
            identifyCode () {
                this.drawPic()
            }
        },
       mounted() {
           // 验证码初始化
           this.identifyCode = ''
           this.makeCode(this.identifyCodes, 4)
           this.drawPic()
           this.$emit('getCode',this.identifyCode)
       },
       computed: {
       },
        methods: {
            // 通过改变input的type使密码可见
            showPassword() {
                this.fontstyle === '' ? (this.fontstyle = 'color: red') : (this.fontstyle = '') // 改变密码可见按钮颜色
                this.passwordType === ''
                    ? (this.passwordType = 'password')
                    : (this.passwordType = '')
            },
            // 生成随机数
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min)
            },
            // 切换验证码
            refreshCode() {
                this.identifyCode = ''
                this.makeCode(this.identifyCodes, 4)
                this.$emit('getCode',this.identifyCode)
            },
            // 生成四位随机验证码
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ]
                }
                console.log(this.identifyCode)
            },
            // 生成一个随机的颜色
            randomColor (min, max) {
                let r = this.randomNum(min, max)
                let g = this.randomNum(min, max)
                let b = this.randomNum(min, max)
                return 'rgb(' + r + ',' + g + ',' + b + ')'
            },
            drawPic () {
                let canvas = document.getElementById('s-canvas')
                let ctx = canvas.getContext('2d')
                ctx.textBaseline = 'bottom'
                // 绘制背景
                ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
                ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
                // 绘制文字
                for (let i = 0; i < this.identifyCode.length; i++) {
                    this.drawText(ctx, this.identifyCode[i], i)
                }
                this.drawLine(ctx)
                this.drawDot(ctx)
            },
            drawText (ctx, txt, i) {
                ctx.fillStyle = this.randomColor(50, 160) //随机生成字体颜色
                ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei' //随机生成字体大小
                let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
                let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
                var deg = this.randomNum(-30, 30)
                // 修改坐标原点和旋转角度
                ctx.translate(x, y)
                ctx.rotate(deg * Math.PI / 180)
                ctx.fillText(txt, 0, 0)
                // 恢复坐标原点和旋转角度
                ctx.rotate(-deg * Math.PI / 180)
                ctx.translate(-x, -y)
            },
            drawLine (ctx) {
                // 绘制干扰线
                for (let i = 0; i < 4; i++) {
                    ctx.strokeStyle = this.randomColor(100, 200)
                    ctx.beginPath()
                    ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
                    ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
                    ctx.stroke()
                }
            },
            drawDot (ctx) {
                // 绘制干扰点
                for (let i = 0; i < 30; i++) {
                    ctx.fillStyle = this.randomColor(0, 255)
                    ctx.beginPath()
                    ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
                    ctx.fill()
                }
            }
        }
    }
</script>

<style scoped>
    .sbody .Verification{
        width: 160px;
        height: 40px;
        background: #ccc;
        float: right;
        margin-left: 20px;
        cursor: pointer;
    }
</style>