<!--
 * @Author: your name
 * @Date: 2021-01-27 11:13:32
 * @LastEditTime: 2021-01-27 14:43:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\userManger\userList\index.vue
-->
<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">
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
          />
          <el-table-column
            prop="name"
            label="用户名"
            width="180"
            align="center"
          />
          <el-table-column
            prop="name"
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
              <el-tag v-if="scope.row.sex === 1">男</el-tag>
              <el-tag v-if="scope.row.sex === 2" type="danger">女</el-tag>
              <el-tag v-if="scope.row.sex === 3" type="warning">保密</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
          />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
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
            :total="100"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        sex: 1,
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        sex: 2,
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        sex: 3,
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        sex: 1,
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
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
