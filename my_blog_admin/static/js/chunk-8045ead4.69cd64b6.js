(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8045ead4"],{"04ed":function(e,t,a){},"3a72":function(e,t,a){"use strict";a("04ed")},"83a3":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"add-article"},[a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:"发布文章"}},[a("el-form",{ref:"form",attrs:{model:e.form,"label-position":e.labelPosition,"label-width":"90px",rules:e.rule}},[a("el-row",{staticClass:"demo-autocomplete",attrs:{gutter:20}},[a("el-col",{attrs:{lg:10,md:12,xs:24}},[a("el-form-item",{attrs:{label:"标题",prop:"title"}},[a("el-input",{attrs:{placeholder:"请输入标题"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1)],1),a("el-col",{attrs:{lg:10,md:12,xs:24}},[a("el-form-item",{attrs:{label:"作者"}},[a("el-input",{attrs:{placeholder:"转载请标明出处,填写原作者名称与地址!"},model:{value:e.form.author,callback:function(t){e.$set(e.form,"author",t)},expression:"form.author"}})],1)],1)],1),a("el-row",{staticClass:"demo-autocomplete",attrs:{gutter:20}},[a("el-col",{attrs:{lg:10,md:12,xs:24}},[a("el-form-item",{attrs:{label:"选择分类",prop:"categoryId"}},[a("el-cascader",{ref:"cascader",attrs:{options:e.options,placeholder:"请选择分类",props:{children:"subcategories",value:"id",label:"name"}},on:{change:e.handleChange},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.node,o=t.data;return[a("span",[e._v(e._s(o.name))]),r.isLeaf?e._e():a("span",[e._v(" ("+e._s(o.subcategories.length)+") ")])]}}]),model:{value:e.form.categoryId,callback:function(t){e.$set(e.form,"categoryId",t)},expression:"form.categoryId"}})],1)],1)],1),a("el-form-item",{attrs:{label:"封面和摘要"}},[a("div",{staticClass:"bottomMiddle"},[a("el-row",{staticClass:"demo-autocomplete",attrs:{gutter:5}},[a("el-col",{attrs:{lg:4,md:6,xs:24}},[a("el-upload",{ref:"upload",staticClass:"avatar",class:e.fileList.length>0?"active":"",attrs:{action:"1",limit:e.limit,accept:"image/jpeg,image/jpg,image/png,image/bmp,image/webp,image/gif","on-change":e.beforeAvatarUpload,"on-remove":e.handRemove,"list-type":"picture-card","auto-upload":!1,"file-list":e.fileList,"http-request":e.uploadSuccess}},[0===e.fileList.length?a("i",{staticClass:"el-icon-plus"}):e._e(),a("el-button",{staticClass:"select-img",attrs:{type:"default",size:"small"},on:{click:function(t){return t.stopPropagation(),e.selectImg(t)}}},[e._v("图库列表")])],1)],1),a("el-col",{attrs:{lg:16,md:18,xs:24}},[a("el-input",{staticClass:"thumn",attrs:{type:"textarea",placeholder:"选填，帮助用户快速了解内容，如不填写自动抓取内容前50字",maxlength:"120","show-word-limit":""},model:{value:e.form.make,callback:function(t){e.$set(e.form,"make",t)},expression:"form.make"}})],1)],1)],1)]),a("el-row",{staticClass:"demo-autocomplete"},[a("el-col",{attrs:{lg:20,md:18,xs:24}},[a("el-form-item",{staticClass:"content",attrs:{label:"内容",prop:"content"}},[a("tinymce",{ref:"editor",staticClass:"tinymce",attrs:{height:300,"is-inline":!1},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1)],1)],1),a("el-row",{staticClass:"demo-autocomplete"},[a("el-col",{attrs:{lg:20,md:18,xs:24}},[a("el-form-item",{staticClass:"bottom"},[a("el-button",{attrs:{type:"primary",loading:e.isLoading},on:{click:function(t){return e.saveClick("form")}}},[e._v(e._s(e.isLoading?"提交中":"保存"))])],1)],1)],1)],1)],1)],1),a("imgList",{ref:"imgList",on:{selectImgUrl:e.selectImgUrl}})],1)},o=[],s=(a("6a61"),a("2e91")),i=a("8256"),l=a("1a5e"),n=a("d28d"),c=a("91b6"),m=a("2423"),u={components:{Tinymce:i["a"],imgList:l["a"]},data:function(){return{labelPosition:"left",limit:1,options:[],fileList:[],fileData:"",fileInfo:"",isLoading:!1,form:{title:"",author:"",content:"",make:"",categoryName:"",categoryId:""},rule:{categoryId:[{required:!0,message:"请选择一级分类",trigger:"blur"}],title:[{required:!0,message:"标题不能为空",trigger:"blur"}],content:[{required:!0,message:"内容不能为空",trigger:"blur"}]}}},computed:{device:function(){return this.$store.state.app.device}},watch:{device:function(){this.labelPosition="desktop"===this.device?"left":"top"}},mounted:function(){this.getCategoryList(),this.labelPosition="desktop"===this.device?"left":"top"},methods:{selectImg:function(){this.$refs.imgList.dialogFormVisible=!0,console.log("xunze")},selectImgUrl:function(e){this.fileInfo=e,this.fileList.push({name:"xxx",url:e})},getCategoryList:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(n["c"])();case 2:a=t.sent,r=a.data,e.options=r;case 5:case"end":return t.stop()}}),t)})))()},handleChange:function(e){var t=this.$refs["cascader"].getCheckedNodes();this.form.categoryName=t[0].label,this.form.categoryId=t[0].value},saveClick:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.$refs[e].validate(function(){var a=Object(s["a"])(regeneratorRuntime.mark((function a(r){var o,s,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!r){a.next=12;break}if(t.$refs.upload.submit(),0===t.fileList.length||""!==t.fileInfo){a.next=5;break}return a.next=5,Object(c["a"])(t.fileData).then((function(e){console.log(e),t.fileInfo=e.data}));case 5:return o={title:t.form.title,author:t.form.author,picture:t.fileInfo,categoryId:t.form.categoryId,categoryName:t.form.categoryName,describe:t.form.make,content:t.form.content},a.next=8,Object(m["a"])(o);case 8:s=a.sent,i=s.code,200===i&&(t.$message.success("创建成功!"),t.$refs[e].resetFields()),t.fileInfo="";case 12:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}());case 1:case"end":return a.stop()}}),a)})))()},beforeAvatarUpload:function(e,t){console.log(e,t),this.fileList=t;var a="image/jpeg"===e.type||"image/jpg",r=e.size/1024/1024<5;return a||this.$message.error("上传头像图片只能是 /jpeg/png/jpeg 格式!"),r||this.$message.error("上传头像图片大小不能超过 5MB!"),a&&r},handRemove:function(e,t){this.fileList=t,this.fileInfo=""},uploadSuccess:function(e){this.fileData=new FormData,this.fileData.append("file",e.file)}}},f=u,d=(a("3a72"),a("5d22")),p=Object(d["a"])(f,r,o,!1,null,"28536a85",null);t["default"]=p.exports}}]);