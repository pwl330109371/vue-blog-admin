<!--
 * @Author: your name
 * @Date: 2021-01-27 18:44:21
 * @LastEditTime: 2021-01-29 11:17:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\tagManage\tagList\addTag.vue
-->
<template>
  <div>
    <el-dialog title="创建分类" :visible.sync="dialogFormVisible" :width="dialogWidth">
      <el-form ref="ruleForm" :model="form" :label-position="labelPosition" :rules="rules">
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入分类名称"
            maxlength="15"
            show-word-limit
          />
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
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '100px',
      labelPosition: 'left',
      dialogWidth: '50%',
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
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
    bus.$off('creataTag')
    bus.$on('creataTag', () => {
      this.dialogFormVisible = true
    })
    this.labelPosition = this.device === 'desktop' ? 'left' : 'top' // 兼容手机端
    this.dialogWidth = this.device === 'desktop' ? '50%' : '90%'
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('createParentTag', this.form.name)
          this.resetForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单状态
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    }
  }
}
</script>

<style>

</style>
