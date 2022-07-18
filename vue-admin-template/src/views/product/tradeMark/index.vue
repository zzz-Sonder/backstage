<template>
  <div>
    品牌管理
    <br />
    <el-button
      type="primary"
      @click="dialogFormVisible = true"
      icon="el-icon-plus"
      style="margin: 10px 0"
    >
      添加
    </el-button>

    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- :rules="rules" -->
      <el-form style="width: 80%" :model="tmForm" ref="ruleForm">
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="品牌logo"
          :label-width="formLabelWidth"
          prop="region"
        >
          <!-- 
          不能使用v-model因为不是表单元素 
          action属性:设置上传图片地址
          :on-success 可以检测图片上传成功，当图片上传成功会执行一次
          :before-upload 可以在上传图片之前，会执行一次
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg文件,且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="Cancel">取 消</el-button>
        <el-button type="primary" @click.native="addorUpdateTradeMark">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 
      elementUI中的table组件展示的数据是以一列进行展示数据的 
      prop:对应列内容的字段名
    -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        prop="prop"
        label="序号"
        width="80px"
        align="center"
        type="index"
      >
      </el-table-column>
      <el-table-column
        prop="tmName"
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
        <template slot-scope="{ row }">
          <!-- {{ row }} -->
          <img :src="row.logoUrl" alt="" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column
        prop="prop"
        label="  操作  "
        width="width"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- 当前第几页，数据总条数，每一页展示的条数 连续页码数-->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="5"
      :page-sizes="[3, 5, 10]"
      layout=" prev, pager, next, jumper,->,  sizes,total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    >
      <!-- @size-change="handleSizeChange" -->
      <!-- @current-change="handleCurrentChange" -->
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "trademark",

  data() {
    return {
      page: 1,
      limit: 3,
      //总数居条数
      total: 0,
      // 展示的数据
      list: [],
      //对话框显示与隐藏的属性
      dialogFormVisible: false,
      //不能瞎写，需要看文档
      tmForm: {
        id: "",
        tmName: "",
        logoUrl: "",
      },
      formLabelWidth: "120px",
      imageUrl: "",
      //表单验证规则
      rules: {
        // 品牌名称验证规则·
        name: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 品牌图标验证规则
        region: [{ required: true, message: "请上传品牌图标" }],
      },
    };
  },

  mounted() {
    this.getPageList();
    // console.log(this.$API);
  },

  methods: {
    //获取品牌列表的数据
    async getPageList(pager = 1) {
      this.page = pager;
      //解构出参数
      const { page, limit } = this;
      //获取品牌列表的接口
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      console.log(result.data.records[0]);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
        console.log(this.total);
        console.log(this.list);
      }
    },
    handleCurrentChange(pager) {
      // console.log(pager);
      // 修改参数
      this.page = pager;
      this.getPageList();
    },
    handleSizeChange(limit) {
      // console.log(limit);
      this.limit = limit;
      this.getPageList();
    },

    //上传图片相关的回调（上传成功）
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl = res.data;
      console.log(res);
      // res 是上传成功之后返回的地址
      // file 是上传成功之后服务器返回给前端的数据
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    Cancel() {
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
      this.dialogFormVisible = false;
    },
    addorUpdateTradeMark(row) {
      this.$refs["ruleForm"].validate(async (success) => {
        //发请求（添加品牌/修改品牌）
        this.dialogFormVisible = false;
        let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
          this.tmForm
        );
        if (result.code == 200) {
          this.$message(
            this.tmForm.id
              ? {
                  message: "恭喜你，修改成功！",
                  type: "success",
                }
              : {
                  message: "恭喜你，上传成功！",
                  type: "success",
                }
          );
          this.getPageList(this.tmForm.id ? this.page : 1);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateTradeMark(row) {
      //row当前用户选中品牌的信息
      // console.log(row);
      this.tmForm = { ...row };
      this.dialogFormVisible = true;
      this.getPageList(this.tmForm.id ? this.page : 1);
    },
    deleteTradeMark(row) {
      console.log(row);
      //弹框
      this.$confirm(`你确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //当用户点击确定按钮的时候会出发
          //向服务器发请求
          console.log(1);
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          console.log(result);
          //如果删除成功
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //再次获取品牌列表数据
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
          }
        })
        .catch(() => {
          console.log(2);
          //当用户点击取消按钮的时候会触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>