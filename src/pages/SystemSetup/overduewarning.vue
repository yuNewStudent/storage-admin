<template>
  <div class="overduewarning">
    <el-header>
      <div class="selectStore">
        仓库名称:
        <el-select v-model="value" placeholder="请选择" @change="storage" >
          <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </div>
     <div class="search">
        商品名称:
        <el-input placeholder="请输入操作人" v-model="person"></el-input>
        <el-button type="primary" @click="querylist()">搜索</el-button>
      </div>
       <div class="selectStore">
        状态:
        <el-select v-model="value" placeholder="请选择" @change="storage" >
          <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </div>
    </el-header>
    <el-main>
      <el-table :data="orders" size="small" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column label="商品类别" prop="receipt_no"></el-table-column>
        <el-table-column label="商品名称" prop="supplier"></el-table-column>
        <el-table-column label="所在库位" prop="applicant"></el-table-column>
        <el-table-column label="库存数量" prop="receipt_no"></el-table-column>
        <el-table-column label="库存预警" prop="status">
        </el-table-column>
        <el-table-column label="状态" prop="datetime" width="200">
          <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">已经过期</el-button> -->
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">库存不足</el-button>
      </template>
        </el-table-column>
         <el-table-column label="操作" prop="datetime">
          <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">商品盘存</el-button> -->
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">填写入库单</el-button>
      </template>
        </el-table-column>
        <el-table-column label="温馨提示">
          <template>
            <span>该商品库存不足，及时补货</span>
            <!-- <span>该商品已经过期了，把盘点数量改为零</span> -->
          </template>
        </el-table-column>
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
      show:true,
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
      person: "",
      orders: [
        {
          receipt_no: '哈德',
          supplier: '哈德',
          applicant: '哈德',
          apply_datetime: '10',
          status: '哈德',
        }
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
    // this.allaudit();
    // this.applicantlist();
  },
  methods: {
    handleClose() {},
    //申请人排序
    applicantbutton() {
      this.querylist();
    },
    goodsearch(){
      this.querylist();
    },
    storage(){
       
    },
    //排序状态
    statebutton() {
      this.querylist();
    },
    hidden(){
         this.show=!this.show;
    },
    //排序查询
    querylist() {
      this.$http
        .post(`${config.httpBaseUrl}/log/get_log/`, {
          person:this.person,
          datetime_end:this.endtime,
          datetime_start:this.starttime,
          
        })
        .then(res => {
          if (res.status == 1) {
            this.orders = res.content.OperationLog;;
          } else {
            return;
          }
        });
    },
    //查询所有的订单
    allaudit() {
      this.$http
        .post(`${config.httpBaseUrl}/log/get_log/`,{
          person:this.person,
          datetime_end:"",
          datetime_start:"",
        })
        .then(res => {
          if (res.status == 1) {
            this.orders = res.content.OperationLog;
          } else {
            return;
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
      let starttime = this.moment(time[0]).format("YYYY-MM-DD h:mm:ss");
      let endtime = this.moment(time[1]).format("YYYY-MM-DD h:mm:ss");
      this.starttime = starttime;
      this.endtime = endtime;
      this.querylist();
    },
    handleOutput() {}
  }
};
</script>

<style lang="scss" scoped>
.overduewarning {
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
.bg_layer {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,.5);
  z-index: 3;
  border-radius: 10px;
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
  color: red;
  background-color: #fde4e4;
  display: flex;
}
.pop_tl{
  width: 10%;
}
.pop_tc{
  width: 80%;
  text-align: center;
}
.pop_tr{
  width: 10%;
  margin-left: 5px;
  text-align: center；
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
.search {
    width: 380px;
    .el-input {
      width: 200px;
    }
  }
</style>

