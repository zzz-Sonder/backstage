<template>
  <div>
    <el-card style="margin: 20px 0px">
      <div>
        <CategorySelect
          @getCategoryId="getCategoryId"
          @clear1="clear1"
          @clear2="clear2"
          :show="!isShow"
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
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin-right: 30px"
              >
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150" align="center">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updataAttr(row)"
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
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
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
                size="mini"
                v-if="row.flag"
                @blur="tolook(row)"
                @keyup.native.enter="tolook(row)"
                :ref="$index"
              >
              </el-input>
              <span v-else @click="toedit(row, $index)" style="display: block">
                {{ row.valueName }}
              </span>
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
              <el-popconfirm
                :title="`确定删除属性值为 ${row.valueName} 吗？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addOrUpdateAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="isShow = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      //控制table的显示和隐藏
      isShow: true,
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
        attrId: this.attrInfo.id,
        valueName: "",
        //flag属性：给每一个属性值添加一个标记flag，用户切换查看模式与编辑模式，好处，每一个属性值可以控制自己的模式切换
        //当前flag属性，响应式数据（数据变化视图跟着变化）
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //修改某一个属性
    updataAttr(row) {
      this.isShow = false;
      this.attrInfo = cloneDeep(row);
      //在修改某一个属性的时候，将相应的属性值元素添加上flag这个标记
      this.attrInfo.attrValueList.forEach((item) => {
        // 这样书写相当于flag不是响应式的
        // item.flag=false

        // 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
        this.$set(item, "flag", false);
      });
    },
    //失去焦点的回调
    tolook(row) {
      if (row.valueName.trim() == "") {
        this.$message("请你输入一个正常的属性");
        return;
      }
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        //需要将row从数组里面判断的时候去除
        //row最新新增的属性值【数组的最后一项元素】
        //判断的时候，需要把已有的数组当中新增的这个属性值去除
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      console.log(isRepat);
      // 如果属性值为空不能作为新的属性值，需要给用户提示，让他输入一个其他的属性值
      row.flag = false;
    },
    toedit(row, index) {
      row.flag = true;
      //获取input节点，实现自动聚焦
      //需要注意：点击span的时候，切换为input变为编辑模式，但是需要注意，对于浏览器而言，页面重绘与重拍耗时间的
      //点击span的时候，重绘重拍一个input它是需要耗费事件，因此我们不可能一点击span立马获取到input
      //
      //$nextTick,当节点渲染完毕了，会执行一次
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    //气泡确认框确定按钮的回调
    deleteAttrValue(index) {
      //当前删除属性值的操作是不需要发请求的
      //最新版本的ElementUI----2.15.6，目前模板中的版本号2.13.x
      // alert(111);
      this.attrInfo.attrValueList.splice(index, 1);
    },
    async addOrUpdateAttr() {
      //整理参数：如果添加了很多空属性不应该提交服务器
      // 不能出现flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName != "") {
            // 删除掉flag属性
            delete item.flag;
            return true;
          }
        }
      );
      // 发请求
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        //展示平台属性的信号量进行切换
        this.isShow = true;
        this.$message({ type: "success", message: "保存成功" });
        await this.getAttrList(
          this.category1Id,
          this.category2Id,
          this.category3Id
        );
      } catch (error) {
        this.$message("保存失败");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>