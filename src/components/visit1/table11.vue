<template>
  <div class="details">
    <div class="table">
      <el-button type="primary" size="mini" style="margin-bottom: 20px;" @click="addAction">上传附件</el-button>
      <el-table
        :data="tableData"
        border
        :header-cell-style="{background:'#fafafa',color:'#E3853A'}"
        v-loading="loading"
        style="width: 100%"
      >
        <!-- @selection-change="handleSelectionChange" -->
        <!-- <el-table-column fixed="left" type="selection" align="center" width="55"></el-table-column> -->
        <el-table-column label="序号" type="index" align="center" width="55"></el-table-column>
        <el-table-column label="附件名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="附件要求" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.roleCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="附件大小" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="createBy" label="创建人" align="center"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="updateBy" label="修改人" align="center"></el-table-column>
        <el-table-column prop="updateDate" label="修改时间" align="center"></el-table-column>-->
        <!-- <el-table-column label="授权" align="center">
              <template slot-scope="scope">
                <span class="color" @click="handleAssess(scope.$index, scope.row.id)">访问授权</span>
                <span class="color" @click="handleCategory(scope.$index, scope.row.id)">分类授权</span>
                <span class="color" @click="handleUser(scope.$index, scope.row.id)">成员授权</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="160" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.ph_state===1?'success-state':''||scope.row.ph_state===0?'error-state':''"
                >{{ state_list[scope.row.ph_state] }}</span>
              </template>
        </el-table-column>-->
        <el-table-column label="操作" fixed="right" width="280" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.id)">上传</el-button>
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row.id)">查看</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDownload(scope.$index, scope.row)"
            >下载模板</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="visible" top="10vh" width="30%" center>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible = false">确定</el-button>
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="附件内容" :visible.sync="contentVisible" top="10vh" width="50%" center>
      <img :src="image" alt />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadAction">确定</el-button>
        <el-button @click="contentVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import chart_01 from "../../common/images/chart_01.png";
import chart_02 from "../../common/images/chart_02.png";
import chart_03 from "../../common/images/chart_02.png";
import chart_04 from "../../common/images/chart_02.png";
export default {
  name: "Details",
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [
          {
            roleCode: "必传",
            roleName: "邀请函原件扫描件",
            remark: "500kb"
          },
          {
            roleCode: "必传。提示：邀请函信息翻译完整，不可有信息缺漏。",
            roleName: "邀请函翻译件",
            remark: "500kb"
          },
          {
            roleCode: "必传。清晰，正反面在同一页上。",
            roleName: "身份证扫描件",
            remark: "500kb"
          },
          {
            roleCode:
              "必传。提供模板，模板见因公出国材料包。模板有两个，分为1.因公出国请示；2.特殊原因持因私证照执行因公任务请示。",
            roleName: "出访请示",
            remark: "500kb"
          },
          {
            roleCode:
              "选传。提供模板，模板见因公出国材料包。提示：免签国家、落地签国家免提供。多个申根国家提供需办理签证国家所对应的个人情况表。",
            roleName: "出访国家个人情况表",
            remark: "500kb"
          },
          {
            roleCode:
              "选传。提供模板，模板见因公出国材料包。提示：根据各国签证要求提供。各国签证要求下载网址：http://www.gdfao.gov.cn/Category_210/Index.aspx ",
            roleName: "派出证明",
            remark: "500kb"
          },
          {
            roleCode: "选传。可增加。",
            roleName: "其他材料",
            remark: "500kb"
          }
        ];
      }
    }
  },
  data() {
    return {
      image: chart_01,
      loading: false,
      title: "附件",
      visible: false,
      contentVisible: false,
      content: "<p>123123123123</p>",
      searchDate: "",
      searchData: {
        roleName: ""
      },
      page: {
        total: 0
      },
      URLparams: {
        pageNumber: 1,
        pageSize: 10
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      downShow: 0
    };
  },
  watch: {},
  created() {
    // this.init();
    this.page.total = 6;
  },
  methods: {
    init() {
      this.loading = true;
      this.$api.role
        .form(this.URLparams, this.searchData)
        .then(res => {
          this.tableData = res.data;
          this.page.total = res.count;
          this.loading = false;
        })
        .catch(err => {
          this.$message.error("查询失败！");
        });
    },
    handleEdit(index, id) {
      this.visible = true;
    },
    handleDownload(index, row) {
      console.log(row);
      if (row.content) {
        if (row.content === "chart_02") {
          this.image = chart_02;
          this.downShow = 2;
        } else if (row.content === "chart_01") {
          this.image = chart_01;
          this.downShow = 1;
        } else if (row.content === "chart_03") {
          this.image = chart_03;
          this.downShow = 3;
        } else if (row.content === "chart_04") {
          this.image = chart_04;
          this.downShow = 4;
        }
      }
      console.log(this.image);
      this.contentVisible = true;
    },
    downloadAction() {
      console.log(this.downShow);
      if (this.downShow === 1) {
        window.open(
          "http://193.112.76.40:7071/downloadfile/cce95981-6f00-469c-b06b-5fc67b7d7642"
        );
      } else if (this.downShow === 2) {
        window.open(
          "http://193.112.76.40:7071/downloadfile/d315a446-3a83-4137-be47-bba4d48d4bcc"
        );
      } else if (this.downShow === 3) {
        window.open(
          "http://193.112.76.40:7071/downloadfile/467d03fc-7734-461c-936c-344e2c8d4a22"
        );
      } else if (this.downShow === 4) {
        window.open(
          "http://193.112.76.40:7071/downloadfile/5d0fb95b-5029-402d-b3eb-ad21f25b7b52"
        );
      }
      this.contentVisible = false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSizeChange(val) {
      this.URLparams.pageNumber = 1;
      this.URLparams.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.URLparams.pageNumber = val;
      this.init();
    },
    addAction() {
      this.tableData.push({
        roleCode: "选传。可增加。",
        roleName: "其他材料",
        remark: "500kb"
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.table {
  padding: 0 20px;
}
</style>
