<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">
            {{scope.row.add_time | date-time}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editShopInfo(scope.row.goods_id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分配权限的对话框 -->
      <el-dialog title="商品编辑" :visible.sync="shopDialogVisible" width="50%" @close="shopDialogClosed">
        <!-- 树形控件 -->
        <el-form :model="shopInfo" :rules="shopInfoRules" ref="shopInfoRef" label-width="100px">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="shopInfo.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model.number="shopInfo.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model.number="shopInfo.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model.number="shopInfo.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品介绍" prop="desc">
            <el-input type="textarea" v-model="shopInfo.goods_introduce"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="shopDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveShopInfo">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 商品列表
      goodslist: [],
      // 总数据条数
      total: 0,
      shopInfo: {},
      shopDialogVisible: false,
      shopInfoRules: {
        goods_name: [
          { required: true, message: '请输入商品名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '商品名的长度在2~10个字符之间',
            trigger: 'blur'
          }
        ],
        goods_price: [
          { type: 'number',required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { type: 'number',required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { type: 'number',required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList() {
      const { data: res } = await this.$api.get('goods', {
        params: this.queryInfo
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败！')
      }

      this.$message.success('获取商品列表成功！')
      this.goodslist = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该商品, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除！')
      }

      const { data: res } = await this.$api.delete(`goods/${id}`)

      if (res.meta.status !== 200) {
        return this.$message.error('删除失败！')
      }

      this.$message.success('删除成功！')
      this.getGoodsList()
    },
    goAddpage() {
      this.$router.push('/goods/add')
    },
    async editShopInfo (id) {
      const { data: res } = await this.$api.get(`goods/${id}`)
      if (res.meta.status !== 200) return false
      this.$message.success('根据id获取商品成功！')
      this.shopInfo = res.data
      this.shopDialogVisible = true
    },
    shopDialogClosed () {
      this.$refs.shopInfoRef.resetFields()
    },
    saveShopInfo () {
      this.$refs.shopInfoRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$api.put(`goods/${this.shopInfo.goods_id}`,this.shopInfo)
        if (res.meta.status !== 200) {
          return this.$message.error('修改商品信息失败！')
        }
        this.shopDialogVisible = false
        this.getGoodsList()
        // 提示修改成功
        this.$message.success('修改商品信息成功！')
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
