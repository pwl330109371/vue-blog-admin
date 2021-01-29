<!--
 * @Author: your name
 * @Date: 2021-01-27 11:22:21
 * @LastEditTime: 2021-01-29 23:05:48
 * @LastEditors: Peng wenlei
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\articleManage\createArticle\index.vue
-->
<template>
  <div class="add-article">
    <el-tabs type="border-card">
      <el-tab-pane label="发布文章">
        <el-form ref="form" :model="form" :label-position="labelPosition" label-width="90px" :rules="rule">
          <!-- <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row> -->
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
                  v-model="form.categoryId"
                  :options="options"
                  :props="{ children: 'subcategories', value: 'id', label: 'name' }"
                >
                  <template slot-scope="{ node, data }">
                    <span>{{ data.name }}</span>
                    <span v-if="!node.isLeaf"> ({{ data.subcategories.length }}) </span>
                  </template>
                </el-cascader>
                <!-- <el-select v-model="form.categoryId" clearable placeholder="请选择" @change="selectTag">
                  <el-option
                    v-for="item in fTagList"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  />
                </el-select> -->
              </el-form-item>
            </el-col>
            <!-- <el-col :lg="10" :md="12" :xs="24">
              <el-form-item label="二级分类" prop="cTagId">
                <el-select v-model="form.cTagId" multiple placeholder="请选择">
                  <el-option
                    v-for="item in cTagList"
                    :key="item._id"
                    multiple-limit="’2‘"
                    :label="item.name"
                    :value="item._id"
                  />
                </el-select>
              </el-form-item>
            </el-col> -->
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
                <tinymce v-model="form.content" class="tinymce" :height="300" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="demo-autocomplete">
            <el-col :lg="20" :md="18" :xs="24">
              <el-form-item class="bottom">
                <el-button type="primary" @click="saveClick('form')">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getCategoryList } from '@/api/tag'
import { uploadImgs } from '@/api/upload'
import { createArticle } from '@/api/article'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      labelPosition: 'left',
      limit: 1, // 图片上传数量
      options: [],
      fileList: [], // 图片列表
      fTagList: [], // 一级标签
      cTagList: [], // 二级标签
      fileData: '',
      fileId: '',
      fileInfo: '',
      form: {
        title: '', // 标题
        author: '', // 作者
        content: '', // 内容
        make: '', // 描述
        categoryId: '' // 一级选中的id
        // cTagId: [] // 二级选中的List
      },
      rule: {
        categoryId: [{ required: true, message: '请选择一级分类', trigger: 'blur' }],
        // cTagId: [{ required: true, message: '请选择二级分类', trigger: 'blur' }],
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
    console.log(this.device)
    this.labelPosition = this.device === 'desktop' ? 'left' : 'top' // 兼容手机端
  },
  methods: {
    // 获取分类
    async getCategoryList() {
      const { data } = await getCategoryList()
      this.options = data
    },
    // 选择分类
    handleChange(e) {
      console.log(e)
    },
    // 发布文章
    async saveClick(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.$refs.upload.submit()
          // 如果没有上传图片就不走上传图片的请求
          if (this.fileList.length !== 0) {
            await uploadImgs(this.fileData).then((res) => {
              console.log(res)
              this.fileInfo = res.data
            })
          }
          const params = {
            title: this.form.title, // 标题
            author: this.form.author, // 发布人
            picture: this.fileInfo, // 封面
            categoryId: this.form.categoryId[1], // 标签
            describe: this.form.make, // 简介
            content: this.form.content // 资讯内容
          }
          const { data } = await createArticle(params)
          if (data.state === 200) {
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
