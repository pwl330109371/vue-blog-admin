(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e3d471d4"],{"2aaf":function(t,e,n){},"3f91":function(t,e,n){},"56ea":function(t,e,n){var s=n("1c8b"),o=n("fa41"),i=n("258f");s({target:"Array",proto:!0},{fill:o}),i("fill")},"615a":function(t,e,n){"use strict";n("96bb")},"62f0":function(t,e,n){"use strict";n("3f91")},"96bb":function(t,e,n){},"9e9e":function(t,e,n){},b29b:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login-container"},[n("canvas",{staticClass:"cavs",attrs:{width:"1920",height:"927"}}),t._m(0),n("div",{staticClass:"loginmain"},[n("div",{staticClass:"login-title"},[n("span",[n("font",{staticStyle:{"vertical-align":"inherit"}},[n("font",{staticStyle:{"vertical-align":"inherit"}},[t._v("管理员登录")])],1)],1)]),n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,"auto-complete":"on","label-position":"left"}},[n("el-form-item",{attrs:{prop:"username"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"user"}})],1),n("el-input",{ref:"username",attrs:{placeholder:"Username",name:"username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}})],1),n("el-form-item",{attrs:{prop:"password"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"password"}})],1),n("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"Password",name:"password",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleLogin(e)}},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),n("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[n("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1),n("el-button",{staticClass:"login-btn",staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("Login")])],1)],1)])},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"stars"},[n("div",{staticClass:"star"}),n("div",{staticClass:"star"}),n("div",{staticClass:"star"})])}];n("56ea");function i(t){return Math.floor(255*Math.random()+t)}function r(t,e,n){return"rgba("+t+","+e+","+n+", 0.8)"}function a(t){t=t||0,this.r=i(t),this.g=i(t),this.b=i(t),this.style=r(this.r,this.g,this.b)}function c(){var t=document.querySelector("canvas");this.x=Math.random()*t.width,this.y=Math.random()*t.height,this.vx=-.5+Math.random(),this.vy=-.5+Math.random(),this.radius=2*Math.random(),this.color=new a}var l={name:"Login",data:function(){var t=function(t,e,n){e.length<3?n(new Error("用户名长度不能小于三位数!")):n()},e=function(t,e,n){e.length<6?n(new Error("密码长度不能小于六位数!")):n()};return{loginForm:{username:"pwl201314",password:""},loginRules:{username:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur",validator:e}]},loading:!1,passwordType:"password",redirect:void 0,canvas:null,ctx:null,dots:{},mousePosition:{}}},watch:{$route:{handler:function(t){this.redirect=t.query&&t.query.redirect},immediate:!0}},mounted:function(){this.init()},methods:{init:function(){var t=document.querySelector("canvas"),e=t.getContext("2d");this.dots={nb:250,distance:100,d_radius:150,array:[]};var n={x:30*t.width/100,y:30*t.height/100};this.mousePosition=n;try{/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)||(t.width=window.innerWidth,t.height=window.innerHeight,e.lineWidth=.3,e.strokeStyle=new a(150).style,t.addEventListener("mousemove",(function(t){n.x=t.pageX,n.y=t.pageY})),t.addEventListener("mouseleave",(function(e){n.x=t.width/2,n.y=t.height/2})),this.createDots(),requestAnimationFrame(this.animateDots))}catch(s){console.log(s)}},showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},handleLogin:function(){var t=this;this.$refs.loginForm.validate((function(e){if(!e)return console.log("error submit!!"),!1;t.loading=!0,t.$store.dispatch("user/login",t.loginForm).then((function(e){t.$store.dispatch("user/getInfo",{userId:e}).then((function(e){3!==e.role?(t.$router.push({path:t.redirect||"/"}),t.loading=!1):(t.$message.error("没有权限进行后台管理系统,请联系管理员!"),t.loading=!1)}))})).catch((function(){t.loading=!1}))}))},mixComponents:function(t,e,n,s){return(t*e+n*s)/(e+s)},averageColorStyles:function(t,e){var n=t.color,s=e.color,o=this.mixComponents(n.r,t.radius,s.r,e.radius),i=this.mixComponents(n.g,t.radius,s.g,e.radius),a=this.mixComponents(n.b,t.radius,s.b,e.radius);return r(Math.floor(o),Math.floor(i),Math.floor(a))},createDots:function(){var t=document.querySelector("canvas"),e=t.getContext("2d");c.prototype={draw:function(){e.beginPath(),e.fillStyle=this.color.style,e.arc(this.x,this.y,this.radius,0,Math.PI,!1),e.fill()}};for(var n=0;n<this.dots.nb;n++)this.dots.array.push(new c)},moveDots:function(){for(var t=document.querySelector("canvas"),e=this.dots,n=0;n<e.nb;n++){var s=e.array[n];s.y<0||s.y>t.height?s.vy=-s.vy:(s.x<0||s.x>t.width)&&(s.vx=-s.vx),s.x+=s.vx,s.y+=s.vy}},connectDots:function(){for(var t=document.querySelector("canvas"),e=t.getContext("2d"),n=this.dots,s=this.mousePosition,o=0;o<n.nb;o++)for(var i=0;i<n.nb;i++){var r=n.array[o],a=n.array[i];r.x-a.x<n.distance&&r.y-a.y<n.distance&&r.x-a.x>-n.distance&&r.y-a.y>-n.distance&&r.x-s.x<n.d_radius&&r.y-s.y<n.d_radius&&r.x-s.x>-n.d_radius&&r.y-s.y>-n.d_radius&&(e.beginPath(),e.strokeStyle=this.averageColorStyles(r,a),e.moveTo(r.x,r.y),e.lineTo(a.x,a.y),e.stroke(),e.closePath())}},drawDots:function(){for(var t=this.dots,e=0;e<t.nb;e++){var n=t.array[e];n.draw()}},animateDots:function(){var t=document.querySelector("canvas"),e=t.getContext("2d");e.clearRect(0,0,t.width,t.height),this.moveDots(),this.connectDots(),this.drawDots(),requestAnimationFrame(this.animateDots)}}},d=l,u=(n("b7c3"),n("62f0"),n("615a"),n("bf44"),n("5d22")),h=Object(u["a"])(d,s,o,!1,null,"701095ff",null);e["default"]=h.exports},b7c3:function(t,e,n){"use strict";n("2aaf")},bf44:function(t,e,n){"use strict";n("9e9e")},fa41:function(t,e,n){"use strict";var s=n("3553"),o=n("e1d6"),i=n("d88d");t.exports=function(t){var e=s(this),n=i(e.length),r=arguments.length,a=o(r>1?arguments[1]:void 0,n),c=r>2?arguments[2]:void 0,l=void 0===c?n:o(c,n);while(l>a)e[a++]=t;return e}}}]);