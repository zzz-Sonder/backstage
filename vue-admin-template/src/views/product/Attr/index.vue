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
      <div slot="header"></div>
      <div></div>
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
    };
  },

  mounted() {},
  methods: {
    getCategoryId(data) {
      this.category1Id = data[0];
      this.category2Id = data[1];
      this.category3Id = data[2];
      console.log(this.category1Id);
      console.log(this.category2Id);
      console.log(this.category3Id);
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