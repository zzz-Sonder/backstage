<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        @clear1="clear1"
        @clear2="clear2"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 三部分 table template 分页 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
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
           -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[1, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->, sizes,total"
          :total="total"
          @current-change="handleCurrentChange(page)"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="scene == 1"
        ref="spu"
        @changeScene="changeScene"
      ></SpuForm>
      <SkuForm v-show="scene == 2" ref="sku"></SkuForm>
    </el-card>
  </div>
</template>

<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
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
      records: [], //spu列表数组
      total: 0,
      scene: 0, //代表SPu列表数据 1添加SPU||修改SPU 2添加SPU
    };
  },

  components: { SkuForm, SpuForm },

  mounted() {
    console.log(this.$API);
  },

  methods: {
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList;
    },
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
      this.getSpuList();
    },
    clear1() {
      this.category2Id = "";
      this.category3Id = "";
    },
    clear2() {
      this.category3Id = "";
    },
    async getSpuList(pages = 1) {
      this.page = pages;
      // 携带三个参数
      const { page, limit, category3Id } = this;
      //携带三个参数:page 第几页  limit 每一页需要展示多少条数据  三级分类id
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        console.log(this.total);
        console.log(result.data.total);
        console.log(result.data.records);
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    addSpu() {
      this.scene = 1;
      //通知子组件SpuForm发请求---两个
      this.$refs.spu.addSpuData(this.category3Id);
    },
    updateSpu(row) {
      this.scene = 1;
      //获取子组件SpuForm子组件的
      //在父组件当中可以通过$ref获取子组件等等
      this.$refs.spu.initSpuData(row);
    },
    changeScene({ scene, flag }) {
      this.scene = scene;
      //子组件通知父组件切换场景，需要再次获取SPU列表的数据进行展示
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>