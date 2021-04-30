<!--
 * @Author: your name
 * @Date: 2021-04-10 14:46:16
 * @LastEditTime: 2021-04-30 17:05:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\imgManage\index.vue
-->
<template>
  <div>
    <vue-waterfall-easy :imgs-arr="tableData" :height="800" :max-cols="5" src-key="imgUrl" href-key="imgUrl" @scrollReachBottom="load">
      <div slot-scope="props" class="img-info">
        <div class="some-title">
          <time class="time">{{ props.value.createdAt }}</time>
          <el-tag type="success">{{ props.value.categoryName }}</el-tag>
        </div>
      </div>
    </vue-waterfall-easy>
  </div>
</template>

<script>
import { getImgList } from '@/api/img'
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      tableData: [],
      req: {
        pageIndex: 1,
        pageSize: 20,
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
      this.tableData = this.tableData.concat(data.rows)
      this.req.total = data.total
    },
    load() {
      this.req.pageIndex += 1
      this.getImgList()
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
  .some-title {
    padding: 10px;
    display: flex;
    align-items: center;
    time {
      flex: 1;
    }
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
