<!--
 * @Author: your name
 * @Date: 2021-01-27 11:30:15
 * @LastEditTime: 2021-01-29 11:30:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\tagManage\tagList\index.vue
-->
<template>
  <div>
    <el-tabs type="border-card">
      <el-button type="primary" class="creata-tag" size="small" @click="createTag">添加标签<i class="el-icon-upload el-icon--right" /></el-button>
      <el-tab-pane label="标签管理" class="box-card-container">
        <el-row class="demo-autocomplete" :gutter="20">
          <el-col v-for="(item, index) in CategoryList" :key="item.id" :lg="6" :md="18" :xs="24">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ item.name }}</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <el-tag
                v-for="tag in dynamicTags"
                :key="tag"
                class="tag-item"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="inputVisible"
                ref="saveTagInput"
                v-model="inputValue[index]"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleInputConfirm(item.id)"
                @blur="handleInputConfirm(item.id)"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <addTag @createParentTag="createParentTag" />
  </div>
</template>

<script>
import addTag from './addTag'
import bus from '@/views/bus'
import { createCategory, getCategoryList } from '@/api/tag'
export default {
  components: {
    addTag
  },
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      CategoryList: [], // 标签列表
      inputValue: []
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    // 获取标签列表
    async getCategoryList() {
      const params = {
        categoryId: '',
        type: 1
      }
      const { data } = await getCategoryList(params)
      this.CategoryList = data
    },
    // 创建父类标签
    createTag() {
      bus.$emit('creataTag')
    },
    // 创建父标签
    createParentTag(name) {
      this.createCategory('', name, 1)
    },
    /**
     * @description: 创建标签请求
     * @param {*} categoryId 父标签id 创建子级标签才传
     * @param {*} name 标签名称
     * @param {*} type 1 父标签  2 子标签
     * @return {*}
     */
    async createCategory(categoryId, name, type) {
      const params = {
        categoryId,
        name,
        type
      }
      const { data } = await createCategory(params)
      console.log(data)
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(id) {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.createCategory(id, inputValue, 2)
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card-container {
    // display: flex;
    height: calc(100vh - 50px);
    overflow: hidden;
  }
  .box-card {
    width: 100%;
    float: left;
    margin-right: 20px;
  }
  .box-card:nth-child(3n) {
    margin-right: 0;
  }
  .creata-tag {
    margin-bottom: 10px;
  }
  .tag-item {
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
