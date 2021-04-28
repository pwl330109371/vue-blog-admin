<!--
 * @Author: your name
 * @Date: 2021-01-27 11:17:36
 * @LastEditTime: 2021-04-28 11:04:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\articleManage\articleList\index.vue
-->
<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="文章列表">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            align="center"
            width="120"
          >
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="180"
            align="center"
          />
          <el-table-column
            label="创建时间"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.createdAt | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="封面图片"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.picture"
                fit="contain"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="发布人"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.user.nickName }}
            </template>
          </el-table-column>
          <el-table-column
            prop="visitsNum"
            label="浏览量"
            width="180"
            align="center"
          />
          <el-table-column
            label="标签"
            width="90"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag>{{ scope.row.categoryName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-change="handleChange"
            :total="req.total"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getArticleList, delArticle } from '@/api/article'
import { formatDate } from '@/utils'
export default {
  filters: {
    formatDate(val) {
      return formatDate(val, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      req: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [] // 文章列表
    }
  },
  mounted() {
    this.getArticleList()
  },
  methods: {
    // 获取文章列表
    async getArticleList() {
      const params = {
        keyword: '',
        pageIndex: this.req.pageIndex,
        pageSize: this.req.pageSize
      }
      const { data } = await getArticleList(params)
      this.tableData = data.rows
      this.req.total = data.total
    },
    // 编辑
    handleEdit(row) {
      console.log(row)
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delArticle(index, row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async delArticle(index, id) {
      const { code } = await delArticle(id)
      if (code === 200) {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }
    },
    // 分页获取用户列表
    handleChange(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination {
    padding: 20px 0;
    text-align: center;
  }
</style>
