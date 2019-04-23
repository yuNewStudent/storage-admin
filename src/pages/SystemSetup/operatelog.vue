
<template>
  <div class="opeatelog">
    <el-header>
      <div class="select_date">
        操作日期:
        <!-- <el-date-picker size='medium'
          v-model="value1"
          type="date">
        </el-date-picker>-->
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="pickDate"
        ></el-date-picker>
      </div>
      <div class="buttons">
        <el-button type="primary" size="medium" @click="handleOutput">导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table :data="orders" size="small" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column label="操作人" prop="receipt_no"></el-table-column>
        <el-table-column label="操作模块" prop="supplier"></el-table-column>
        <el-table-column label="操作内容" prop="applicant"></el-table-column>
        <el-table-column label="操作时间" prop="apply_datetime"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-main>
    <div class="pop">
      <div class="pop_t">
        <p>预警提示</p>
      </div>
      <div class="pop_c">
        <P>编号001，条形码12346544679的商品阿莫西林已经入预警状态，即将过期，请及时管理、更换采购该商品，以便库存充足，方便下次出库。</P>
      </div>
      <div class="pop_f">
       <div slot="footer" class="pop_f-footer">
          <el-button type="primary">我知道了</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageBox from "@/components/MessageBox";
export default {
  data() {
    return {
      currentPage: 4,
      centerDialogVisible: false,
      dialogVisible: true,
      date: "",
      datalist: [],
      reason_return: "",
      isShowAddGoods: false,
      options: [
        // {
        //   value: "选项1",
        //   label: "四川省经济贸易公司"
        // },
        // {
        //   value: "选项2",
        //   label: "四川棋照科技有限公司"
        // },
        // {
        //   value: "选项3",
        //   label: "攀枝花攀钢公司"
        // },
        // {
        //   value: "选项4",
        //   label: "阿里巴巴有限公司"
        // },
        // {
        //   value: "选项5",
        //   label: "北京经贸技校公司"
        // }
      ],
      receipt_no: "",
      value: "",
      name: "",
      orders: [
        // {
        //   receipt_no: '哈德',
        //   supplier: '哈德',
        //   applicant: '哈德',
        //   apply_datetime: '哈德',
        //   status: '哈德',
        // }
      ],
      starttime: "",
      endtime: "",
      ordersStatus: [
        {
          label: "已审核",
          status: 1
        },
        {
          label: "已入库",
          status: 3
        },
        {
          label: "未通过",
          status: 2
        }
      ]
    };
  },
  components: {
    MessageBox
  },
  mounted() {
    this.allaudit();
    // this.applicantlist();
  },
  methods: {
    handleClose() {},
    //申请人排序
    applicantbutton() {
      this.querylist();
    },
    //排序状态
    statebutton() {
      this.querylist();
    },
    //排序查询
    querylist() {
      var user = JSON.parse(this.$cookie.get("user") || "{}");
      this.$http
        .post(`${config.httpBaseUrl}/medicine/get_inStorageReceipt/`, {
          all: 0,
          applicant: user.name,
          status: 1,
          apply_datetime_start: this.starttime,
          apply_datetime_end: this.endtime
        })
        .then(res => {
          if (res.status == 1) {
            this.orders = res.content;
          } else {
            return;
          }
        });
    },
    //查询所有的订单
    allaudit() {
      this.$http
        .post(`${config.httpBaseUrl}/medicine/get_inStorageReceipt/`, {
          all: 1
        })
        .then(res => {
          if (res.status == 1) {
            this.orders = res.content;
          } else {
            return;
          }
        });
    },
    //详情
    outordetails(index, row) {
      this.receipt_no = row.receipt_no;
      this.$http
        .post(`${config.httpBaseUrl}/medicine/detail_inStorageReceipt/`, {
          receipt_no: this.receipt_no
        })
        .then(res => {
          if (res.status == 1) {
            this.datalist = res.content;
          } else {
            return;
          }
        });
    },
    //提交审核
    goodsubmit() {
      var receipt_no = this.receipt_no;
      var datalist = this.datalist;
      var user = JSON.parse(this.$cookie.get("user") || "{}");
      var date = new Date();
      var time = this.moment(new Date()).format("YYYY-MM-DD");
      let multipleSelection = this.datalist.map(v => {
        v.audited_datetime = time;
        v.receipt_no = receipt_no;
        v.auditor = user.name;
        return v;
      });
      this.$http
        .post(
          `${config.httpBaseUrl}/medicine/audited_inStorageReceipt/`,
          multipleSelection
        )
        .then(res => {
          if (res.status == 1) {
            this.datalist = res.content;
            this.$message({
              showClose: true,
              message: res.content,
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: res.content,
              type: "warning"
            });
          }
        });
    },
    //回退
    outorfallback() {
      var receipt_no = this.receipt_no;
      var datalist = this.datalist;
      var user = JSON.parse(this.$cookie.get("user") || "{}");
      var date = new Date();
      var time = this.moment(new Date()).format("YYYY-MM-DD");
      let multipleSelection = this.datalist.map(v => {
        v.audited_datetime = time;
        v.receipt_no = receipt_no;
        v.auditor = user.name;
        return v;
      });
      this.$http
        .post(
          `${config.httpBaseUrl}/medicine/return_inStorageReceipt/`,
          multipleSelection
        )
        .then(res => {
          if (res.status == 1) {
            this.datalist = res.content;
            this.$message({
              showClose: true,
              message: res.content,
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: res.content,
              type: "warning"
            });
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //日期查询
    pickDate(date) {
      let time = date;
      let starttime = this.moment(time[0]).format("YYYY-MM-DD");
      let endtime = this.moment(time[1]).format("YYYY-MM-DD");
      this.starttime = starttime;
      this.endtime = endtime;
      this.querylist();
    },
    handleOutput() {}
  }
};
</script>

<style lang="scss" scoped>
.opeatelog {
  padding: 0 30px;
  .el-header {
    margin: 20px 0 0;
    padding: 0;
    > div {
      display: inline-block;
    }
    .selectStore {
      width: 250px;
      .el-select {
        width: 150px;
      }
    }
    .buttons {
      float: right;
    }
  }
  .el-main {
    padding: 0;
    h5 {
      margin: 30px 0 10px;
    }
    .el-pagination {
      margin-top: 10px;
      text-align: right;
    }
  }
  .warehousing {
    float: right;
    margin: 20px 0px;
  }
}
.pop {
  width: 400px;
  height: 200px;
  position: fixed;
  z-index: 2000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  border-radius: 5px;
  border:1px solid #eae6e6;
}
.pop_t{
  width: 100%;
  line-height: 50px;
  text-align: center;
  color: red;
  background-color: #fde4e4;
}
.pop_c{
  width: 380px;
  margin: 0 auto;
  text-align: center;
  color: #333333;
  background-color: #FFFFFF;
}
.pop_c p{
  margin-top: 10px;
}
.pop_f{
  width: 100%;
  float: right;
  margin-top: 30px;
}
.pop_f-footer{
  margin-right: 20px;
  float: right;
}
</style>


