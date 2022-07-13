<template>
  <div>
    品牌管理
    <br />
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0">
      添加
    </el-button>
    <el-table style="width: 100%" border>
      <el-table-column prop="prop" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="prop"
        label="品牌Logo"
        width="width "
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="prop"
        label="  操作  "
        width="width"
        align="center"
      >
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- 当前第几页，数据总条数，每一页展示的条数 连续页码数-->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="6"
      :total="99"
      :pager-count="9"
      :page-size="3"
      :page-sizes="[10, 20, 50, 100, 200]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout=" prev, pager, next, jumper,->,  sizes,total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "trademark",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>