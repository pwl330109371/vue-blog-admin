<!--
 * @Author: your name
 * @Date: 2021-04-10 14:46:16
 * @LastEditTime: 2021-04-10 16:25:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\imgManage\index.vue
-->
<template>
  <div>
    <el-row>
      <el-col v-for="(item, index) in tableData" :key="item.id" :span="7" :offset="index > 0 ? 1 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <el-image
            :src="item.imgUrl"
            fit="cover"
            class="image"
          />
          <div style="padding: 14px;">
            <span>{{ item.categoryName }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.createdAt }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getImgList } from '@/api/img'
export default {
  data() {
    return {
      tableData: [],
      req: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted() {
    this.getImgList()
  },
  methods: {
    // 获取文章列表
    async getImgList() {
      const params = {
        categoryId: '',
        pageIndex: this.req.pageIndex,
        pageSize: this.req.pageSize
      }
      const { data } = await getImgList(params)
      this.tableData = data.rows
      this.req.total = data.total
    }
  }
}
</script>

<style lang="scss" scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 300px;
    display: block;
    cursor: pointer;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>
