<!--
 * @Author: your name
 * @Date: 2021-03-03 10:54:16
 * @LastEditTime: 2021-03-03 15:46:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\login\index1.vue
-->
<template>
  <div class="login-container">
    <canvas class="cavs" width="1920" height="927" />

    <div class="loginmain">
      <div class="login-title">
        <span>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">管理员登录</font>
          </font>
        </span>
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" class="login-btn" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
function colorValue(min) {
  return Math.floor(Math.random() * 255 + min)
}
function createColorStyle(r, g, b) {
  return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)'
}
function Color(min) {
  min = min || 0
  this.r = colorValue(min)
  this.g = colorValue(min)
  this.b = colorValue(min)
  this.style = createColorStyle(this.r, this.g, this.b)
}
function Dot() {
  const canvas = document.querySelector('canvas')
  this.x = Math.random() * canvas.width
  this.y = Math.random() * canvas.height

  this.vx = -0.5 + Math.random()
  this.vy = -0.5 + Math.random()

  this.radius = Math.random() * 2

  this.color = new Color()
}

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'pwl201314',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      canvas: null,
      ctx: null,
      dots: {},
      mousePosition: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 粒子特效初始化
    init() {
      const canvas = document.querySelector('canvas')
      const ctx = canvas.getContext('2d')
      this.dots = {
        nb: 250,
        distance: 100,
        d_radius: 150,
        array: []
      }
      const mousePosition = {
        x: (30 * canvas.width) / 100,
        y: (30 * canvas.height) / 100
      }
      this.mousePosition = mousePosition
      try {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          // 1
        } else {
          // this.canvas.width = $(window).width();
          // this.canvas.height = $(window).height();
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
          ctx.lineWidth = 0.3
          ctx.strokeStyle = new Color(150).style

          canvas.addEventListener('mousemove', function(e) {
            mousePosition.x = e.pageX
            mousePosition.y = e.pageY
          })

          canvas.addEventListener('mouseleave', function(e) {
            mousePosition.x = canvas.width / 2
            mousePosition.y = canvas.height / 2
          })

          this.createDots()
          requestAnimationFrame(this.animateDots)
        }
      } catch (e) {
        console.log(e)
        // 1
      }
    },
    // 显示密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    mixComponents(comp1, weight1, comp2, weight2) {
      return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2)
    },
    averageColorStyles(dot1, dot2) {
      var color1 = dot1.color
      var color2 = dot2.color

      var r = this.mixComponents(color1.r, dot1.radius, color2.r, dot2.radius)
      var g = this.mixComponents(color1.g, dot1.radius, color2.g, dot2.radius)
      var b = this.mixComponents(color1.b, dot1.radius, color2.b, dot2.radius)
      return createColorStyle(
        Math.floor(r),
        Math.floor(g),
        Math.floor(b)
      )
    },
    createDots() {
      const canvas = document.querySelector('canvas')
      const ctx = canvas.getContext('2d')
      Dot.prototype = {
        draw: function() {
          ctx.beginPath()
          ctx.fillStyle = this.color.style
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI, false)
          ctx.fill()
        }
      }
      for (let i = 0; i < this.dots.nb; i++) {
        this.dots.array.push(new Dot())
      }
    },
    moveDots() {
      const canvas = document.querySelector('canvas')
      const dots = this.dots
      for (let i = 0; i < dots.nb; i++) {
        var dot = dots.array[i]
        if (dot.y < 0 || dot.y > canvas.height) {
          // dot.vx = dot.vx
          dot.vy = -dot.vy
        } else if (dot.x < 0 || dot.x > canvas.width) {
          dot.vx = -dot.vx
          // dot.vy = dot.vy
        }
        dot.x += dot.vx
        dot.y += dot.vy
      }
    },
    connectDots() {
      const canvas = document.querySelector('canvas')
      const ctx = canvas.getContext('2d')
      const dots = this.dots
      const mousePosition = this.mousePosition
      for (let i = 0; i < dots.nb; i++) {
        for (let j = 0; j < dots.nb; j++) {
          var i_dot = dots.array[i]
          var j_dot = dots.array[j]

          if (
            i_dot.x - j_dot.x < dots.distance &&
                    i_dot.y - j_dot.y < dots.distance &&
                    i_dot.x - j_dot.x > -dots.distance &&
                    i_dot.y - j_dot.y > -dots.distance
          ) {
            if (
              i_dot.x - mousePosition.x < dots.d_radius &&
                        i_dot.y - mousePosition.y < dots.d_radius &&
                        i_dot.x - mousePosition.x > -dots.d_radius &&
                        i_dot.y - mousePosition.y > -dots.d_radius
            ) {
              ctx.beginPath()
              ctx.strokeStyle = this.averageColorStyles(i_dot, j_dot)
              ctx.moveTo(i_dot.x, i_dot.y)
              ctx.lineTo(j_dot.x, j_dot.y)
              ctx.stroke()
              ctx.closePath()
            }
          }
        }
      }
    },
    drawDots() {
      const dots = this.dots
      for (let i = 0; i < dots.nb; i++) {
        var dot = dots.array[i]
        dot.draw()
      }
    },
    animateDots() {
      const canvas = document.querySelector('canvas')
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      this.moveDots()
      this.connectDots()
      this.drawDots()
      requestAnimationFrame(this.animateDots)
    }
  }
}
</script>

<style lang="scss" scoped>
.cavs{
    z-index:1;
    position: fixed;
    width:95%;
    margin-left: 20px;
    margin-right: 20px;
}

.login-container{
    width: 100%;
    height: 100%;
    background: url("https://www.17sucai.com/preview/806169/2020-11-24/%E7%99%BB%E9%99%86/image/bg1.jpg") no-repeat;
    background-size: 100% 100%;

}

.loginmain{
    background: rgba(0, 0, 0, 0.5);
    max-width: 540px;
    height: 350px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 58px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    z-index: 99999;
}
.login-title{
    color: #D3D7F7;
    height: 60px;
    font-size:20px;
    text-align: center;
    margin-top: -20px;
}
.login-con{
    height: 208px;
    position: absolute;
    left: 0;
    width: 80%;
    margin:0 10%;
}
.login-user{
    position: relative;
}
.icon{
    position: absolute;
    z-index: 1;
    left: 36px;
    top: 8px;
    opacity: 1;
}
.login-con input{
    width: calc(100% - 130px);
    margin-top: -2px;
    background: rgba(57, 61, 82, 0);
    left: 0;
    padding: 10px 65px;
    border-top: 2px solid rgba(57, 61, 82, 0);
    border-bottom: 2px solid rgba(57, 61, 82, 0);
    border-right: none;
    border-left: none;
    outline: none;
    font-family: 'Gudea', sans-serif;
    box-shadow: none;
    color: #61BFFF !important;
}
.login-pwd, .login-yan{
    position: relative;
}
/*
.login-pwd .icon{
    position: absolute;
    z-index: 1;
    left: 36px;
    top: 8px;
    opacity: .5;
}*/
.login-btn{
    width: 80%;
    margin: 0 auto;
    position: relative;
}
.login-btn{
    border-radius: 3px;
    background: transparent;
    border: 2px solid #4FA1D9;
    color: #4FA1D9;
    text-transform: uppercase;
    font-size: 11px;
    cursor: pointer;
    position: absolute;
    top: 160px;
    left: 0;
    right: 0;
    margin: auto;
    width: 80%;
    transition-property: background,color;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
}
.login-btn:hover{
    color: white !important;
    background: #4FA1D9;
    cursor: pointer;
    -webkit-transition-property: background,color;
    transition-property: background,color;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
}
</style>>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 320px;
    max-width: 100%;
    // padding: 160px 35px 0;
    margin: 0 auto;
    // overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
