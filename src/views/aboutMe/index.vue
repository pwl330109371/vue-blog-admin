<!--
 * @Author: your name
 * @Date: 2021-03-01 16:03:28
 * @LastEditTime: 2021-03-01 18:08:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\aboutMe\index.vue
-->
<template>
  <div class="about-me">
    <el-row class="demo-autocomplete">
      <el-col :lg="20" :md="18" :xs="24">
        <tinymce v-model="content" class="tinymce" :height="500" />
      </el-col>
    </el-row>
    <el-row class="demo-autocomplete">
      <el-col :lg="20" :md="18" :xs="24">
        <div class="save-btn">
          <el-button type="primary" :loading="isLoading" @click="saveClick">{{ isLoading ? '提交中' : '保存' }}</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getAboutContent, addAboutContent, editAboutContent } from '@/api/user'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      contentId: '',
      content: '', // 个人信息资料
      isLoading: false,
      userId: 1,
      type: 1 // 1为添加 2为编辑
    }
  },
  mounted() {
    this.getAboutContent()
  },
  methods: {
    // 获取关于我的内容
    async getAboutContent() {
      const { data } = await getAboutContent(this.userId)
      if (data) {
        this.content = data.content
        this.contentId = data.id
      }
      this.type = !data ? 1 : 2 // 1为添加 2为编辑
    },
    // 获取关于我的内容
    async addAboutContent() {
      const params = {
        content: this.content
      }
      const { code } = await addAboutContent(params)
      if (code === 200) {
        this.$message.success('发布成功!')
      }
    },
    // 编辑关于我的内容
    async editAboutContent() {
      const params = {
        content: this.content,
        id: this.contentId
      }
      const { code } = await editAboutContent(params)
      if (code === 200) {
        this.$message.success('编辑成功!')
      }
    },
    // 提交
    saveClick() {
      // 内容为null是添加 否则是编辑
      this.type === 1 ? this.addAboutContent() : this.editAboutContent()
    }
  }
}
</script>

<style lang="scss" scoped>
.save-btn {
  text-align: right;
  margin-top: 15px;
}
</style>
