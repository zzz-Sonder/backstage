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
      <div v-show="isShow">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="isShow = false"
          >添加属性</el-button
        >
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
                @click="isShow = false"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 修改属性的结构 -->
      <div v-show="!isShow">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button>取消</el-button>
        <el-table
          style="width: 100%; margin: 25px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            header-align="center"
            align="center"
            type="index"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            width="width"
            header-align="center"
            align="center"
            prop="prop"
            label="属性值名称"
          >
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                @change="ex(row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            width="width"
            header-align="center"
            align="center"
            prop="prop"
            label="操作"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShow = true">取消</el-button>
      </div>
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
      //控制table的显示和隐藏
      isShow: false,
      //手机新增属性|修改属性
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },

  mounted() {},
  methods: {
    ex(row) {
      console.log(row);
    },
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
    addAttrValue() {
      // 向属性值的数组里面添加元素
      this.attrInfo.attrValueList.push({
        attrId: undefined,
        valueName: "",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>