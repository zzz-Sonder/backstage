<template>
  <div>
    <div>
      <el-form :inline="true" class="demo-form-inline" :model="cForm">
        <el-form-item label="一级分类">
          <el-select
            placeholder="请选择"
            value=""
            v-model="cForm.category1Id"
            @change="handler1"
            :disabled="show"
          >
            <el-option
              :label="c1.name"
              :value="c1.id"
              v-for="c1 in list1"
              :key="c1.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            placeholder="请选择"
            value=""
            v-model="cForm.category2Id"
            @change="handler2"
            :disabled="show"
          >
            <el-option
              :label="c2.name"
              :value="c2.id"
              v-for="c2 in list2"
              :key="c2.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select
            placeholder="请选择"
            value=""
            v-model="cForm.category3Id"
            @change="handler3"
            :disabled="show"
          >
            <el-option
              :label="c3.name"
              :value="c3.id"
              v-for="c3 in list3"
              :key="c3.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: ["show"],
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      //收集分类的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  methods: {
    //获取一级数据
    async getCategory1List() {
      let request1 = await this.$API.attr.reqCategory1List();
      if (request1.code == 200) {
        this.list1 = request1.data;
        console.log(this.list1);
      }
    },
    //一级分类的select回调
    async handler1() {
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";

      const { category1Id } = this.cForm;
      console.log(this.cForm.category1Id);
      let request2 = await this.$API.attr.reqCategory2List(
        this.cForm.category1Id
      );
      console.log(request2);
      if (request2.code == 200) {
        this.list2 = request2.data;
        console.log(this.list2);
        // this.$emit("getCategoryId", category1Id);
        this.$emit("clear1");
      }
    },
    async handler2() {
      this.list3 = [];
      this.cForm.category3Id = "";
      const { category2Id } = this.cForm;
      console.log(this.cForm.category2Id);
      let request3 = await this.$API.attr.reqCategory3List(
        this.cForm.category1Id
      );
      console.log(request3);
      if (request3.code == 200) {
        this.list3 = request3.data;
        console.log(this.list3);
        // this.$emit("getCategoryId", category2Id);
        this.$emit("clear2");
      }
    },
    handler3() {
      const { category3Id } = this.cForm;
      // this.$emit("getCategoryId", category3Id);
      this.$emit("getCategoryId", [
        this.cForm.category1Id,
        this.cForm.category2Id,
        this.cForm.category3Id,
      ]);
    },
  },
  mounted() {
    this.getCategory1List();
  },
};
</script>

<style lang="scss" scoped>
</style>