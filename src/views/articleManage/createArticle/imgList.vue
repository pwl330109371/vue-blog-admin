<!--
 * @Author: your name
 * @Date: 2021-04-11 17:33:32
 * @LastEditTime: 2021-04-11 18:33:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\views\articleManage\createArticle\imgList.vue
-->
<template>
  <div class="img-container">
    <el-dialog title="选择封面(单击选中，双击预览)" :visible.sync="dialogFormVisible" :width="dialogWidth">
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow:auto;height:450px">
        <li v-for="(item, index) in tableData" :key="item.id" class="infinite-list-item">
          <el-image
            class="item-img"
            :class="selectActive === index ? 'active': ''" fit="cover"
            :src="item.imgUrl"
            lazy
            @click="selectImg(index, item.imgUrl)"
            @dblclick="dialogVisible = true"
          />
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="selectImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getImgList } from '@/api/img'
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogVisible: false, // 是否显示预览
      selectActive: 0, // 默认选中第一张
      selectImgUrl: '', // 选中的图片地址
      dialogWidth: '80%',
      tableData: [], // 图片列表
      req: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  computed: {
    // 是pc 还是 手机
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    this.dialogWidth = this.device === 'desktop' ? '70%' : '95%'
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
      if (data.rows.length === 0) return
      this.tableData = this.tableData.concat(data.rows)
      this.req.total = data.total
      this.selectImgUrl = data.rows[0].imgUrl
    },
    selectImg(index, url) {
      this.selectActive = index
      this.selectImgUrl = url
    },
    submitForm() {
      this.$emit('selectImgUrl', this.selectImgUrl)
      this.dialogFormVisible = false
    },
    load() {
      this.req.pageIndex += 1
      this.getImgList()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.img-container {
  .el-dialog__body {
    padding-top: 10px;
  }
  .infinite-list {
    padding: 0;
  }
  .item-img {
    cursor: pointer;
    width: 300px;
    height: 300px;
    border: 3px solid #fff;
    float: left;
  }
  .item-img.active {
    border: 3px solid red;
  }
}

</style>
