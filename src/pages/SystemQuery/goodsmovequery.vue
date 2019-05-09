<template>
  <div class="goodsmovequery">
    <el-header>
      <div class="search">
        商品名称:
        <el-input placeholder="请输入商品名称"></el-input>
      </div>
      <div class="select_date">
        日期选择:
        <el-date-picker
          v-model="value1"
          type="date">
        </el-date-picker>
        -
        <el-date-picker
          v-model="value1"
          type="date">
        </el-date-picker>
      </div>
      <!-- <el-button type="primary">搜索</el-button> -->
      <div class="out_put">
        <el-button type="primary" size="medium" @click="buttonaudit">导出</el-button>
      </div>
    </el-header>
    <div class="goodsmovequery_list">
      <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
        <el-table-column type='selection'></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="category" label="商品类别"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="number" label="移出数量"></el-table-column>
        <el-table-column prop="out_location" label="移出仓库"></el-table-column>
        <el-table-column prop="in_location" label="移入仓库"></el-table-column>
        <el-table-column prop="datetime" label="移库时间"></el-table-column>
        <el-table-column prop="comment" label="备注"></el-table-column>
      </el-table>
    </div>
    <div class="block">
    <span class="demonstration"></span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  </div>
</template>
<script>
import outputTable from '@/assets/js/outputTable'
export default {
  data() {
    return {
      show: false,
      input10: "",
      currentPage:4,
      tableData: [
        // {
        //   category: "医药",
        //   commodity: "阿莫西林",
        //   specifications: "1/23/25",
        //   number: "2",
        //   number1: "1",
        //   unit: "箱",
        //   warehouse: "A区",
        //   Barcode: "12123343344",
        //   agent: "李先生",
        //   outboundthedata: "2019/03/28",
        //   putthedata: "2019/03/30",
        //   procurement: "治疗",
        //   note: "希望尽快发货"
        // },
        // {
        //   category: "医药",
        //   commodity: "阿莫西林",
        //   number: "2",
        //   unit: "箱",
        //   warehouse: "A区",
        //   Barcode: "12123343344",
        //   agent: "李先生",
        //   thedata: "2019/03/28",
        //   procurement: "治疗",
        //   note: "希望尽快发货"
        // },
        // {
        //   category: "医药",
        //   commodity: "阿莫西林",
        //   number: "2",
        //   unit: "箱",
        //   warehouse: "A区",
        //   Barcode: "12123343344",
        //   agent: "李先生",
        //   thedata: "2019/03/28",
        //   procurement: "治疗",
        //   note: "希望尽快发货"
        // },
        // {
        //   category: "医药",
        //   commodity: "阿莫西林",
        //   number: "2",
        //   unit: "箱",
        //   warehouse: "A区",
        //   Barcode: "12123343344",
        //   agent: "李先生",
        //   thedata: "2019/03/28",
        //   procurement: "治疗",
        //   note: "希望尽快发货"
        // }
      ],
      formInline: {
        user: "",
        region: ""
      },
      goodsmalist:[],
      options: [
        {
          value: "选项1",
          label: "A区"
        },
        {
          value: "选项2",
          label: "B区"
        },
        {
          value: "选项3",
          label: "C区"
        },
        {
          value: "选项4",
          label: "D区"
        },
        {
          value: "选项5",
          label: "F区"
        }
      ],
      value: "",
      value1: ""
    };
  },
  components: {},
  created(){
    this.Removedlist();
  },
  methods: {
    Removedlist(){
       const data = {
        all: 1,
        name: "",
        apply_datetime_start:"",
        apply_datetime_end:""
      };
      this.$http
        .post(`${config.httpBaseUrl}/medicine/query_transfer_storage/`, data)
        .then(res => {
          if (res.status == 1) {
            this.tableData = res.content;
          } else {
            return;
          }
        });
    },
     handleSelectionChange (val) {
      this.goodsmalist=val;
    },
    buttonModifythe: function() {
      if (this.show == false) {
        this.show = true;
      } else {
        this.show = false;
      }
      console.log(this.show);
    },
    onSubmit() {
      console.log("submit!");
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    buttonsave: function() {},
    buttonaudit: function() {
       var title="移库查询.cvs";
      var name=[
        {value:"商品类别"},
        {value:"商品名称"},
        {value:"移出数量"},
        {value:"移出仓库"},
        {value:"移入库存"},
        {value:"移库时间"},
        {value:"备注"},
      ]
      outputTable(this.goodsmalist,name,title)
    }
  }
};
</script>
<style lang='scss' scoped>
.el-header {
  margin: 20px 0 0;
  padding: 0;
  >div {
    display: inline-block;
  }
  .search {
    width: 250px;
    .el-input {
      width: 150px;
    }
  }
  .out_put {
    margin-left: 30px;
    float: right;
  }
}
.goodsmovequery {
  padding: 0 30px;
}
.block{
  float: right;
  margin-top: 20px;
}
</style>