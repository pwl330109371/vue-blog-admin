<!--
 * @Author: your name
 * @Date: 2021-02-23 15:12:07
 * @LastEditTime: 2021-02-23 17:03:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\userManage\userList\addUser.vue
-->
<template>
  <div>
    <el-dialog title="创建用户" :visible.sync="dialogFormVisible" :width="dialogWidth">
      <el-form ref="ruleForm" :model="form" :label-position="labelPosition" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input
            v-model="form.userName"
            autocomplete="off"
            placeholder="请输入用户名(登录账号!)"
            maxlength="15"
            show-word-limit
          />
        </el-form-item>
        <el-form-item v-if="type === 1" label="密码" :label-width="formLabelWidth" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
            maxlength="15"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickName">
          <el-input
            v-model="form.nickName"
            autocomplete="off"
            placeholder="请输入用户昵称"
            maxlength="15"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
            <el-radio label="3">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <div class="bottomMiddle">
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
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bus from '@/views/bus'
import { uploadImgs } from '@/api/upload'
import { registerUser } from '@/api/user'
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        userName: '', // 用户名
        password: '', // 密码
        nickName: '', // 昵称
        gender: '1' // 性别 1 男 2 女 3 保密
      },
      type: 1, // 1 添加 2 编辑
      limit: 1,
      fileList: [], // 图片列表
      fileData: '', // 上传文件对象
      fileInfo: '', // 上传封面链接
      formLabelWidth: '100px',
      labelPosition: 'left',
      dialogWidth: '50%',
      rules: {
        userName: [
          { required: true, message: '请输入用户名名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    bus.$off('creataUser')
    bus.$on('creataUser', (data) => {
      this.dialogFormVisible = true
      this.type = data === 1 ? 1 : 2 // 1 添加 2 编辑
      this.title = data === 1 ? '创建用户' : '编辑用户'
      if (typeof (data) === 'object') {
        this.form = data
        if (data.picture) {
          this.fileInfo = data.picture
          this.fileList.push({
            name: 'xxx',
            url: data.picture
          })
        }
      }
    })
    this.labelPosition = this.device === 'desktop' ? 'left' : 'top' // 兼容手机端
    this.dialogWidth = this.device === 'desktop' ? '50%' : '90%'
  },
  methods: {
    /**
     * @description: 用户注册
     * @param {string} userName 用户名
     * @param {string} password 密码
     * @param {string} gender 性别 1 男 2 女 3 保密
     * @param {string} nickName 昵称
     * @param {string} picture 头像
     * @return {*}
     */
    submitForm(formName) {
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
            userName: this.form.userName,
            password: this.form.password,
            picture: this.fileInfo,
            gender: this.form.gender,
            nickName: this.form.nickName
          }
          const { code } = await registerUser(params)
          if (code === 200) {
            this.$message.success('创建成功!')
            this.resetForm('ruleForm')
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
    },
    // 重置表单状态
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.fileList = []
      // this.fileInfo = null
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep.bottomMiddle {
    .active {
      .el-upload--picture-card {
        display: none;
      }
    }
    .el-upload--picture-card {
      width: 150px !important;
      height: 150px !important;
      line-height: 150px !important;
      display: block;
    }
    @media only screen and (max-width: 760px) {
      .el-upload--picture-card {
        width: 150px !important;
        min-width: 150px !important;
        max-width: 150px !important;
        margin-bottom: 10px;
      }
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 150px !important;
    }
    .thumn {
      width: 150px;
      height: 150px;
      .el-textarea__inner{
          height: 100% !important;
      }
    }
    .el-upload-list--picture-card .el-upload-list__item{
      margin: 0;
    }
  }
</style>
