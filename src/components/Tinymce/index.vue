<!--
 * @文件描述: 文件描述
 * @作者: 作者
 * @Date: 2019-06-03 19:44:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-02 11:56:53
 -->
<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container editor-container">
    <textarea v-if="!isInline" :id="tinymceId" class="tinymce-textarea" />
    <!-- 测试 -->
    <div v-if="isInline" :id="tinymceId" :style="{height:height+'px'}" :class="{isInline:isInline}" />

    <div v-if="!isInline" class="editor-custom-btn-container" />
  </div>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'
// import zh_CN from './../../../public/static/tinymce4.7.5/langs/zh_CN'
// import zh_CN from './zh_CN'
// import {uploadImg , removeFlie} from '@/api/api'
import { uploadImgs } from '@/api/upload'
// import { apiManage } from '@/utlis/production'

export default {
  name: 'Tinymce',
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      // default: 'file edit insert view format table' //菜单栏
      default: 'false'
    },
    height: {
      type: Number,
      required: false,
      default: 450
    },
    // 是否内联
    isInline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN'
      },
      fileId: null,
      imgUrl: null
    }
  },
  computed: {
    language() {
      return this.languageTypeList['zh']
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    },
    language() {
      this.destroyTinymce()
      this.$nextTick(() => this.initTinymce())
    },
    height(h) {
      this.initTinymce()
    }
    // fileId(e, x) {
    //   if (x) {
    //     this.removeFlie(x, e)
    //   }
    // }

  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        convert_urls: true, // img 地址路径为
        inline: _this.isInline, // 内联编辑
        // inline: true, //内联编辑
        statusbar: false, // 禁止拉伸
        //  object_resizing: false, //禁止图片缩放
        language: this.language, // 语言
        selector: `#${this.tinymceId}`,
        branding: false, // 去除右下角的'由tinymce驱动'
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        // images_dataimg_filter(img) {
        //       console.log(img);
        //       setTimeout(() => {
        //       const $image = $(img);
        //       $image.removeAttr('width');
        //       $image.removeAttr('height');
        //       if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //       }
        //       }, 0);
        //       return img
        //   },
        // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
        images_upload_handler(blobInfo, success, failure, progress) {
          _this.uploadImg(blobInfo, success, failure, progress)
          //  progress(0);
          //   progress(100);
          //  failure('出现未知问题，刷新页面，或者联系程序员')
        }
      })
    },
    async uploadImg(blobInfo, success, failure, progress) {
      const formdata = new FormData()
      formdata.append('file', this.convertBase64UrlToBlob(blobInfo.base64(), blobInfo.blob().type, blobInfo.filename()))
      const { data } = await uploadImgs(formdata)
      this.fileId = data
      setTimeout(() => {
        success(data)
      }, 1000)
    },
    convertBase64UrlToBlob(urlData, type, fileName) {
      if (urlData.indexOf(',') !== -1) {
        //  第二次
        var arr = urlData.split(','); var mime = arr[0].match(/:(.*?);/)[1]
        var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([new Blob([u8arr], { type: mime })], fileName, { type: mime })
      } else {
        //  第一次
        var bstr = atob(urlData)
        var n = bstr.length
        var u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([new Blob([u8arr], { type: type })], fileName, { type: type })
      }
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    // 设置内容
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    // 获取内容
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    }

  }
}
</script>

<style lang="scss">
  $fontColor:var(--fontColor1);

// .mce-stack-layout-item{
//   background: #fff !important;
// }
// .mce-menubar{
//   border: none !important;
// }
// div.mce-edit-area, .mce-panel{
//   background: rgba(255, 255, 255, 0.1) !important;
//   color: red !important;
//   border: 1px solid  $fontColor !important;
// }
</style>

<style  scoped >

.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
 .isInline {
  /* display: block; */
    overflow: auto;
    background: rgba(255,255,255,.1) !important;
    border:1px solid rgba(255,255,255,1);
    /* height: 3em; */
    color: #000;
    margin: 0;
    padding: 0;
}
.isInline >>> p {
  margin: 0 !important;
  padding: 0 !important;
}

</style>

