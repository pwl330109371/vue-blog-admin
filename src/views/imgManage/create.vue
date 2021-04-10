<!--
 * @Author: your name
 * @Date: 2021-04-10 14:49:51
 * @LastEditTime: 2021-04-10 16:23:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\imgManage\create.vue
-->
<template>
  <div class="add-article">
    <el-tabs type="border-card">
      <el-tab-pane label="添加图片">
        <el-form ref="form" :model="form" :label-position="labelPosition" label-width="90px" :rules="rule">
          <el-row class="demo-autocomplete" :gutter="20">
            <el-col :lg="10" :md="12" :xs="24">
              <el-form-item label="选择分类" prop="categoryId">
                <el-select v-model="form.categoryId" placeholder="请选择分类">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id + ',' + item.name"
                  />
                </el-select>
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
                    multiple
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
              </el-row>
            </div>
          </el-form-item>
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
  </div>
</template>

<script>
import { getCategoryList } from '@/api/tag'
import { uploadImgs } from '@/api/upload'
import { createImg } from '@/api/img'
export default {
  data() {
    return {
      labelPosition: 'left',
      limit: 9, // 图片上传数量
      options: [], // 分类集合
      fileList: [], // 图片列表
      fileData: '', // 上传文件对象
      fileInfo: '', // 上传封面链接
      isLoading: false, // 是否提交
      form: {
        categoryId: '' // 一级选中的id
      },
      rule: {
        categoryId: [{ required: true, message: '请选择一级分类', trigger: 'blur' }]
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
    // 获取分类
    async getCategoryList() {
      const { data } = await getCategoryList()
      this.options = data
    },
    // 发布文章
    async saveClick(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.$refs.upload.submit()
          // 如果没有上传图片就不走上传图片的请求
          if (this.fileList.length !== 0) {
            await uploadImgs(this.fileData).then((res) => {
              this.fileInfo = res.data
            })
          }
          const params = {
            imgUrl: this.fileInfo, // 封面
            categoryId: this.form.categoryId.split(',')[0], // 标签id
            categoryName: this.form.categoryId.split(',')[1] // 标签名称
          }
          const { code } = await createImg(params)
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
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 /jpeg/png/jpeg 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt10M
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
