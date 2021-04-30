(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c866d7a"],{"0ba0":function(e,t,a){"use strict";a("4091")},"0ee7":function(e,t,a){},4091:function(e,t,a){},"7e41":function(e,t,a){"use strict";var r=a("6e6d");t["a"]=new r["default"]},"82b7":function(e,t,a){"use strict";a("0ee7")},"9bbf":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:"文章列表"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{label:"序号",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.$index+1))]}}])}),a("el-table-column",{attrs:{prop:"title",label:"标题",width:"180",align:"center"}}),a("el-table-column",{attrs:{label:"创建时间",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("formatDate")(t.row.createdAt))+" ")]}}])}),a("el-table-column",{attrs:{prop:"date",label:"封面图片",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.row.picture,fit:"contain"}})]}}])}),a("el-table-column",{attrs:{label:"发布人",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.user.nickName)+" ")]}}])}),a("el-table-column",{attrs:{prop:"visitsNum",label:"浏览量",width:"180",align:"center"}}),a("el-table-column",{attrs:{label:"标签",width:"90",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",[e._v(e._s(t.row.categoryName))])]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v(" 编辑 ")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v(" 删除 ")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","current-change":e.handleChange,total:e.req.total}})],1)],1)],1),a("editarticle",{on:{updateList:e.updateList}})],1)},i=[],n=(a("ea69"),a("6a61"),a("2e91")),o=a("2423"),l=a("ed08"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"edit-article"},[a("el-dialog",{attrs:{title:"文章编辑",visible:e.dialogVisible,"before-close":e.closelClick,"destroy-on-close":"",width:"70%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,top:"5vh","label-position":e.labelPosition,"label-width":"90px",rules:e.rule}},[a("el-row",{staticClass:"demo-autocomplete",attrs:{gutter:20}},[a("el-col",{attrs:{lg:10,md:12,xs:24}},[a("el-form-item",{attrs:{label:"标题",prop:"title"}},[a("el-input",{attrs:{placeholder:"请输入标题"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1)],1),a("el-col",{attrs:{lg:10,md:12,xs:24}},[a("el-form-item",{attrs:{label:"作者"}},[a("el-input",{attrs:{placeholder:"转载请标明出处,填写原作者名称与地址!"},model:{value:e.form.author,callback:function(t){e.$set(e.form,"author",t)},expression:"form.author"}})],1)],1)],1),a("el-row",{staticClass:"demo-autocomplete",attrs:{gutter:20}},[a("el-col",{attrs:{lg:10,md:12,xs:24}},[a("el-form-item",{attrs:{label:"选择分类",prop:"categoryId"}},[a("el-cascader",{ref:"cascader",attrs:{options:e.options,placeholder:"请选择分类",props:{children:"subcategories",value:"id",label:"name"}},on:{change:e.handleChange},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.node,i=t.data;return[a("span",[e._v(e._s(i.name))]),r.isLeaf?e._e():a("span",[e._v(" ("+e._s(i.subcategories.length)+") ")])]}}]),model:{value:e.form.categoryId,callback:function(t){e.$set(e.form,"categoryId",t)},expression:"form.categoryId"}})],1)],1)],1),a("el-form-item",{attrs:{label:"封面和摘要"}},[a("div",{staticClass:"bottomMiddle"},[a("el-row",{staticClass:"demo-autocomplete",attrs:{gutter:5}},[a("el-col",{attrs:{lg:4,md:6,xs:24}},[a("el-upload",{ref:"upload",staticClass:"avatar",class:e.fileList.length>0?"active":"",attrs:{action:"1",limit:e.limit,accept:"image/jpeg,image/jpg,image/png,image/bmp,image/webp,image/gif","on-change":e.beforeAvatarUpload,"on-remove":e.handRemove,"list-type":"picture-card","auto-upload":!1,"file-list":e.fileList,"http-request":e.uploadSuccess}},[0===e.fileList.length?a("i",{staticClass:"el-icon-plus"}):e._e(),a("el-button",{staticClass:"select-img",attrs:{type:"default",size:"small"},on:{click:function(t){return t.stopPropagation(),e.selectImg(t)}}},[e._v("图库列表")])],1)],1),a("el-col",{attrs:{lg:16,md:18,xs:24}},[a("el-input",{staticClass:"thumn",attrs:{type:"textarea",placeholder:"选填，帮助用户快速了解内容，如不填写自动抓取内容前50字",maxlength:"120","show-word-limit":""},model:{value:e.form.make,callback:function(t){e.$set(e.form,"make",t)},expression:"form.make"}})],1)],1)],1)]),a("el-row",{staticClass:"demo-autocomplete"},[a("el-col",{attrs:{lg:20,md:18,xs:24}},[a("el-form-item",{staticClass:"content",attrs:{label:"内容",prop:"content"}},[a("tinymce",{ref:"editor",staticClass:"tinymce",attrs:{height:300,"is-inline":!1},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1)],1)],1),a("el-row",{staticClass:"demo-autocomplete"},[a("el-col",{attrs:{lg:20,md:18,xs:24}},[a("el-form-item",{staticClass:"bottom"},[a("el-button",{on:{click:function(t){return e.calcel("form")}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",loading:e.isLoading},on:{click:function(t){return e.saveClick("form")}}},[e._v(e._s(e.isLoading?"提交中":"保存"))])],1)],1)],1)],1),a("imgList",{ref:"imgList",on:{selectImgUrl:e.selectImgUrl}})],1)],1)},c=[],u=a("8256"),f=a("1a5e"),d=a("d28d"),m=a("91b6"),g=a("7e41"),p={components:{Tinymce:u["a"],imgList:f["a"]},data:function(){return{articleId:"",dialogVisible:!1,labelPosition:"left",limit:1,options:[],fileList:[],fileData:"",fileInfo:"",isLoading:!1,form:{title:"",author:"",content:"",make:"",categoryName:"",categoryId:""},rule:{categoryId:[{required:!0,message:"请选择一级分类",trigger:"blur"}],title:[{required:!0,message:"标题不能为空",trigger:"blur"}],content:[{required:!0,message:"内容不能为空",trigger:"blur"}]}}},computed:{device:function(){return this.$store.state.app.device}},watch:{device:function(){this.labelPosition="desktop"===this.device?"left":"top"}},mounted:function(){var e=this;g["a"].$off(),g["a"].$on("editArticle",(function(t){e.dialogVisible=!0,e.articleId=t.id,e.form.title=t.title,e.form.author=t.author,e.form.content=t.content,e.form.categoryName=t.categoryName,e.form.categoryId=t.categoryId,e.selectImgUrl(t.picture),console.log("row",t)})),this.getCategoryList(),this.labelPosition="desktop"===this.device?"left":"top"},methods:{selectImg:function(){this.$refs.imgList.dialogFormVisible=!0},selectImgUrl:function(e){this.fileInfo=e,this.fileList.push({name:"xxx",url:e})},getCategoryList:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(d["c"])();case 2:a=t.sent,r=a.data,e.options=r;case 5:case"end":return t.stop()}}),t)})))()},handleChange:function(e){var t=this.$refs["cascader"].getCheckedNodes();this.form.categoryName=t[0].label,this.form.categoryId=t[0].value},saveClick:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.$refs[e].validate(function(){var a=Object(n["a"])(regeneratorRuntime.mark((function a(r){var i,n,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!r){a.next=12;break}if(t.$refs.upload.submit(),0===t.fileList.length||""!==t.fileInfo){a.next=5;break}return a.next=5,Object(m["a"])(t.fileData).then((function(e){console.log(e),t.fileInfo=e.data}));case 5:return i={articleId:t.articleId,title:t.form.title,author:t.form.author,picture:t.fileInfo,categoryId:t.form.categoryId,categoryName:t.form.categoryName,describe:t.form.make,content:t.form.content},a.next=8,Object(o["c"])(i);case 8:n=a.sent,l=n.code,200===l&&(t.$message.success("编辑成功!"),t.$refs[e].resetFields(),t.dialogVisible=!1,t.$emit("updateList")),t.fileInfo="";case 12:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}());case 1:case"end":return a.stop()}}),a)})))()},beforeAvatarUpload:function(e,t){console.log(e,t),this.fileList=t;var a="image/jpeg"===e.type||"image/jpg",r=e.size/1024/1024<5;return a||this.$message.error("上传头像图片只能是 /jpeg/png/jpeg 格式!"),r||this.$message.error("上传头像图片大小不能超过 5MB!"),a&&r},handRemove:function(e,t){this.fileList=t,this.fileInfo=""},closelClick:function(){this.calcel("form")},calcel:function(e){this.dialogVisible=!1,this.form.content="",this.$refs["form"].resetFields(),this.fileList=[],this.fileInfo=""},uploadSuccess:function(e){this.fileData=new FormData,this.fileData.append("file",e.file)}}},h=p,b=(a("82b7"),a("5d22")),v=Object(b["a"])(h,s,c,!1,null,"159856ed",null),w=v.exports,y={filters:{formatDate:function(e){return Object(l["a"])(e,"yyyy-MM-dd hh:mm:ss")}},components:{editarticle:w},data:function(){return{req:{pageIndex:1,pageSize:10,total:0},tableData:[]}},mounted:function(){this.getArticleList()},methods:{getArticleList:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={keyword:"",pageIndex:e.req.pageIndex,pageSize:e.req.pageSize},t.next=3,Object(o["d"])(a);case 3:r=t.sent,i=r.data,e.tableData=i.rows,e.req.total=i.total;case 7:case"end":return t.stop()}}),t)})))()},handleEdit:function(e){g["a"].$emit("editArticle",e)},updateList:function(){this.getArticleList()},handleDelete:function(e,t){var a=this;this.$confirm("此操作将永久删除该文章, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.delArticle(e,t.id)})).catch((function(){a.$message({type:"info",message:"已取消删除"})}))},delArticle:function(e,t){var a=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var i,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(o["b"])(t);case 2:i=r.sent,n=i.code,200===n&&(a.tableData.splice(e,1),a.$message({type:"success",message:"删除成功!"}));case 5:case"end":return r.stop()}}),r)})))()},handleChange:function(e){console.log(e)}}},x=y,k=(a("0ba0"),Object(b["a"])(x,r,i,!1,null,"2bc664b0",null));t["default"]=k.exports},ea69:function(e,t,a){"use strict";var r=a("1c8b"),i=a("e1d6"),n=a("3da3"),o=a("d88d"),l=a("3553"),s=a("1ca1"),c=a("1bbd"),u=a("1ea7"),f=a("ff9c"),d=u("splice"),m=f("splice",{ACCESSORS:!0,0:0,1:2}),g=Math.max,p=Math.min,h=9007199254740991,b="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!d||!m},{splice:function(e,t){var a,r,u,f,d,m,v=l(this),w=o(v.length),y=i(e,w),x=arguments.length;if(0===x?a=r=0:1===x?(a=0,r=w-y):(a=x-2,r=p(g(n(t),0),w-y)),w+a-r>h)throw TypeError(b);for(u=s(v,r),f=0;f<r;f++)d=y+f,d in v&&c(u,f,v[d]);if(u.length=r,a<r){for(f=y;f<w-r;f++)d=f+r,m=f+a,d in v?v[m]=v[d]:delete v[m];for(f=w;f>w-r+a;f--)delete v[f-1]}else if(a>r)for(f=w-r;f>y;f--)d=f+r-1,m=f+a-1,d in v?v[m]=v[d]:delete v[m];for(f=0;f<a;f++)v[f+y]=arguments[f+2];return v.length=w-r+a,u}})}}]);