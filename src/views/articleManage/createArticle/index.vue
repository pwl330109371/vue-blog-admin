<!--
 * @Author: your name
 * @Date: 2021-01-27 11:22:21
 * @LastEditTime: 2021-04-28 15:56:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\articleManage\createArticle\index.vue
-->
<template>
  <div class="add-article">
    <el-tabs type="border-card">
      <el-tab-pane label="发布文章">
        <el-form ref="form" :model="form" :label-position="labelPosition" label-width="90px" :rules="rule">
          <el-row class="demo-autocomplete" :gutter="20">
            <el-col :lg="10" :md="12" :xs="24">
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入标题" />
              </el-form-item>
            </el-col>
            <el-col :lg="10" :md="12" :xs="24">
              <el-form-item label="作者">
                <el-input v-model="form.author" placeholder="转载请标明出处,填写原作者名称与地址!" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="demo-autocomplete" :gutter="20">
            <el-col :lg="10" :md="12" :xs="24">
              <el-form-item label="选择分类" prop="categoryId">
                <el-cascader
                  ref="cascader"
                  v-model="form.categoryId"
                  :options="options"
                  placeholder="请选择分类"
                  :props="{ children: 'subcategories', value: 'id', label: 'name' }"
                  @change="handleChange"
                >
                  <template slot-scope="{ node, data }">
                    <span>{{ data.name }}</span>
                    <span v-if="!node.isLeaf"> ({{ data.subcategories.length }}) </span>
                  </template>
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="封面和摘要">
            <div class="bottomMiddle">
              <el-row class="demo-autocomplete" :gutter="5">
                <el-col :lg="4" :md="6" :xs="24">
                  <el-upload
                    ref="upload"
                    class="avatar"
                    :class="fileList.length > 0 ? 'active' : '' "
                    action="1"
                    :limit="limit"
                    accept="image/jpeg,image/jpg,image/png,image/bmp,image/webp,image/gif"
                    :on-change="beforeAvatarUpload"
                    :on-remove="handRemove"
                    list-type="picture-card"
                    :auto-upload="false"
                    :file-list="fileList"
                    :http-request="uploadSuccess"
                  >
                    <i v-if="fileList.length === 0" class="el-icon-plus" />
                    <el-button class="select-img" type="default" size="small" @click.stop="selectImg">图库列表</el-button>
                  </el-upload>
                </el-col>
                <el-col :lg="16" :md="18" :xs="24">
                  <el-input
                    v-model="form.make"
                    class="thumn"
                    type="textarea"
                    placeholder="选填，帮助用户快速了解内容，如不填写自动抓取内容前50字"
                    maxlength="120"
                    show-word-limit
                  />
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-row class="demo-autocomplete">
            <el-col :lg="20" :md="18" :xs="24">
              <el-form-item label="内容" class="content" prop="content">
                <tinymce
                  ref="editor"
                  v-model="form.content"
                  class="tinymce"
                  :height="300"
                  :is-inline="false"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="demo-autocomplete">
            <el-col :lg="20" :md="18" :xs="24">
              <el-form-item class="bottom">
                <el-button type="primary" :loading="isLoading" @click="saveClick('form')">{{ isLoading ? '提交中' : '保存' }}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <imgList ref="imgList" @selectImgUrl="selectImgUrl" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import imgList from './imgList'
import { getCategoryList } from '@/api/tag'
import { uploadImgs } from '@/api/upload'
import { createArticle } from '@/api/article'
export default {
  components: {
    Tinymce,
    imgList
  },
  data() {
    return {
      labelPosition: 'left',
      limit: 1, // 图片上传数量
      options: [], // 分类集合
      fileList: [], // 图片列表
      fileData: '', // 上传文件对象
      fileInfo: '', // 上传封面链接
      isLoading: false, // 是否提交
      form: {
        title: '', // 标题
        author: '', // 作者
        content: '', // 内容
        make: '', // 描述
        categoryName: '', // 标签名称
        categoryId: '' // 一级选中的id
      },
      rule: {
        categoryId: [{ required: true, message: '请选择一级分类', trigger: 'blur' }],
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  watch: {
    device() {
      this.labelPosition = this.device === 'desktop' ? 'left' : 'top' // 兼容手机端
    }
  },
  mounted() {
    this.getCategoryList() // 获取一级分类
    this.labelPosition = this.device === 'desktop' ? 'left' : 'top' // 兼容手机端
  },
  methods: {
    // 选择封面
    selectImg() {
      this.$refs.imgList.dialogFormVisible = true
      console.log('xunze')
    },
    // 图片回选
    selectImgUrl(url) {
      this.fileInfo = url
      this.fileList.push({
        name: 'xxx',
        url
      })
    },
    // 获取分类
    async getCategoryList() {
      const { data } = await getCategoryList()
      this.options = data
    },
    // 选择分类
    handleChange(e) {
      const nodesObj = this.$refs['cascader'].getCheckedNodes()
      this.form.categoryName = nodesObj[0].label
      this.form.categoryId = nodesObj[0].value
    },
    // 发布文章
    async saveClick(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.$refs.upload.submit()
          // 如果没有上传图片就不走上传图片的请求
          if (this.fileList.length !== 0 && this.fileInfo === '') {
            await uploadImgs(this.fileData).then((res) => {
              console.log(res)
              this.fileInfo = res.data
            })
          }
          const params = {
            title: this.form.title, // 标题
            author: this.form.author, // 发布人
            picture: this.fileInfo, // 封面
            categoryId: this.form.categoryId, // 标签
            categoryName: this.form.categoryName, // 标签名称
            describe: this.form.make, // 简介
            content: this.form.content // 资讯内容
          }
          const { code } = await createArticle(params)
          if (code === 200) {
            this.$message.success('创建成功!')
            // this.$router.push({ path:'information'})
            this.$refs[formName].resetFields()
          }
          this.fileInfo = ''
        }
      })
    },
    // 图片上传前
    beforeAvatarUpload(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 /jpeg/png/jpeg 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },
    // 删除图片
    handRemove(file, fileList) {
      this.fileList = fileList
      this.fileInfo = ''
    },
    uploadSuccess(file) {
      this.fileData = new FormData()
      this.fileData.append('file', file.file)
    }
  }
}
</script>

<style scoped lang="scss">
 ::v-deep.add-article {
  width: 100%;
  height: 100%;
  background: #fff;
  .content{
    width:100%;
    height: 300px;
    .tinymce{
          border: 1px solid #DCDFE6;
    }
  }
  .demo-autocomplete {
    width: 100%;
    .el-select, .el-cascader {
      width: 100%;
    }
  }
  .bottomMiddle {
    .active {
      .el-upload--picture-card {
        display: none;
      }
    }
    .el-upload--picture-card {
      width: 100% !important;
      min-width: 150px !important;
      max-width: 300px !important;
      height: 150px !important;
      line-height: 150px !important;
      display: block;
    }
    .avatar {
      position: relative;
    }
    .select-img {
      position: absolute;
      right: 5px;
      top: 5px;
    }
    @media only screen and (max-width: 760px) {
      .el-upload--picture-card {
        width: 100% !important;
        min-width: 100% !important;
        max-width: 100% !important;
        margin-bottom: 10px;
      }
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 100% !important;
    }
    .thumn {
      width: 100%;
      height: 150px;
      .el-textarea__inner{
          height: 100% !important;
      }
    }
    .el-upload-list--picture-card .el-upload-list__item{
      margin: 0;
    }
  }
  .bottom {
    margin-top: 120px;
    padding-top: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
