<!--
 * @Author: your name
 * @Date: 2021-01-27 11:30:15
 * @LastEditTime: 2021-02-20 14:15:29
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
                v-for="(tag, self) in item.subcategories"
                :key="tag.id"
                class="tag-item"
                closable
                :disable-transitions="false"
                @close="handleClose(tag.id, 2, index, self)"
              >
                {{ tag.name }}
              </el-tag>
              <el-input
                v-if="inputVisible === index"
                ref="saveTagInput"
                v-model="inputValue[index]"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="$event.target.blur"
                @blur="handleInputConfirm(item.id, index)"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">+ New Tag</el-button>
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
import { createCategory, getCategoryList, delCategory } from '@/api/tag'
export default {
  components: {
    addTag
  },
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: -1,
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
    // 打开模态框
    createTag() {
      bus.$emit('creataTag')
    },
    // 创建父标签
    async createParentTag(name) {
      await this.createCategory('', name, 1)
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
      this.getCategoryList()
    },
    /**
     * @description: 删除标签
     * @param {string} categoryId // 标签id
     * @param {*} type 1 父标签  2 子标签
     * @return {*}
     */
    async handleClose(categoryId, type, fIndex, cIndex) {
      const params = {
        categoryId,
        type
      }
      const { code } = await delCategory(params)
      if (code === 200) {
        // 物理删除
        this.CategoryList[fIndex].subcategories.splice(cIndex, 1)
      }
    },
    showInput(index) {
      console.log(index)
      this.inputVisible = index
      this.$nextTick(_ => {
        console.log(this.$refs.saveTagInput[index])
        this.$refs.saveTagInput[index].$refs.input.focus()
      })
    },
    handleInputConfirm(id, index) {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      if (inputValue[index] === '') return
      this.createCategory(id, inputValue[index], 2)
      this.inputVisible = -1
      this.inputValue = []
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
    margin-bottom: 20px;
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
