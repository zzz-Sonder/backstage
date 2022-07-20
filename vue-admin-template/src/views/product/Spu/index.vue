<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        @clear1="clear1"
        @clear2="clear2"
        :show="!isShow"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div>
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <el-table style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里按钮将来用hintButton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              ></hint-button>
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
                slot="reference"
              ></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 
          @size-change="handleSizeChange" -->
        <el-pagination
          style="text-align: center"
          :current-page="6"
          :page-sizes="[3, 5, 10]"
          :page-size="3"
          layout="prev, pager, next, jumper,->, sizes,total"
          :total="23"
          @current-change="getSpuList"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Spu",

  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      //控制table的显示和隐藏
      isShow: true,
      //手机新增属性|修改属性
      page: 1, //分页器当前第几页
      limit: 3, //每一页需要展示多少条数据
    };
  },

  mounted() {
    console.log(this.$API);
  },

  methods: {
    async getAttrList(x, y, z) {
      // console.log(x, y, z);
      // console.log(this);
      let request = await this.$API.attr.reqAttrList(x, y, z);
      if (request.code == 200) {
        this.attrList = request.data;
        console.log(this.attrList);
      }
    },
    getCategoryId(data) {
      this.category1Id = data[0];
      this.category2Id = data[1];
      this.category3Id = data[2];
      console.log(this.category1Id);
      console.log(this.category2Id);
      console.log(this.category3Id);
      this.getAttrList(this.category1Id, this.category2Id, this.category3Id);
    },
    clear1() {
      this.category2Id = "";
      this.category3Id = "";
    },
    clear2() {
      this.category3Id = "";
    },
    async getSpuList() {
      // 携带三个参数
      const { page, limit, category3Id } = this;
      //携带三个参数:page 第几页  limit 每一页需要展示多少条数据  三级分类id
      let result = await this.$API.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        console.log(result);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>