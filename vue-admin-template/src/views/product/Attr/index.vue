<template>
  <div>
    <el-card style="margin: 20px 0px">
      <div>
        <CategorySelect
          @getCategoryId="getCategoryId"
          @clear1="clear1"
          @clear2="clear2"
        ></CategorySelect>
      </div>
    </el-card>

    <el-card>
      <el-button type="primary" icon="el-icon-plus">添加属性</el-button>
      <el-table style="width: 100%" :data="attrList">
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="attrName"
          label="属性名称"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="prop" label="属性值列表" width="width">
          <template slot-scope="{ row, $index }">
            <el-tag
              type="success"
              v-for="(attrValue, index) in row.attrValueList"
              :key="attrValue.id"
              style="margin-right: 30px"
            >
              {{ attrValue.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="150" align="center">
          <template slot-scope="{ row, $index }">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",

  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
    };
  },

  mounted() {},
  methods: {
    async getAttrList(x, y, z) {
      // console.log(x, y, z);
      // console.log(this);
      let request = await this.$API.attr.reqAttrList(x, y, z);
      if (request.code == 200) {
        this.attrList = request.data;
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
  },
};
</script>

<style lang="scss" scoped>
</style>