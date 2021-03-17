<!--
 * @Author: your name
 * @Date: 2021-01-27 11:13:32
 * @LastEditTime: 2021-02-24 17:43:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\userManger\userList\index.vue
-->
<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">
        <el-button type="primary" class="creata-btn" size="small" @click="createUser">创建用户<i class="el-icon-user el-icon--right" /></el-button>
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
            prop="date"
            label="注册时间"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.createdAt | formatTime }}
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            width="180"
            align="center"
          />
          <el-table-column
            prop="nickName"
            label="昵称"
            width="180"
            align="center"
          />
          <el-table-column
            label="性别"
            width="90"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.gender == 1">男</el-tag>
              <el-tag v-if="scope.row.gender == 2" type="danger">女</el-tag>
              <el-tag v-if="scope.row.gender == 3" type="warning">保密</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="角色"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.role === 1">超级管理员</el-tag>
              <el-tag v-if="scope.row.role === 2" type="danger">管理员</el-tag>
              <el-tag v-if="scope.row.role === 3" type="warning">普通用户</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="头像"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-image
                :src='scope.row.picture'
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="city"
            label="地址"
          />
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
                @click="handleDelete(scope.$index, scope.row.id)"
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
            :total="10"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <addUser @updata="updata" />
  </div>
</template>

<script>
import { getUserList, deleteUser } from '@/api/user'
import bus from '@/views/bus'
import addUser from './addUser'

export default {
  components: {
    addUser
  },
  data() {
    return {
      tableData: [] // 用户列表
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    // 分页获取用户列表
    handleChange(e) {
      console.log(e)
    },
    // 获取用户列表
    async getUserList() {
      const { data } = await getUserList()
      this.tableData = data
    },
    // 创建用户
    createUser() {
      bus.$emit('creataUser', 1)
    },
    // 用户信息编辑
    handleEdit(row) {
      bus.$emit('creataUser', row)
    },
    // 更新数据
    updata() {
      this.getUserList()
    },
    // 删除用户
    handleDelete(index, id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { code } = await deleteUser(id)
        if (code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.tableData.splice(index, 1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .creata-btn {
    margin-bottom: 15px;
  }
  .pagination {
    padding: 20px 0;
    text-align: center;
  }
</style>
