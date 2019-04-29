<template>
  <div class="overduewarning">
    <el-header>
      <div class="selectStore">
        仓库名称:
        <el-select v-model="repertory" placeholder="请选择" @change="storage" >
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
        <el-input placeholder="请输入商品名称" v-model="goods_name"></el-input>
        <el-button type="primary" @click="querylist()">搜索</el-button>
      </div>
       <div class="selectStore">
        状态:
        <el-select v-model="status" placeholder="请选择" @change="storage" >
          <el-option
            v-for="item in ordersStatus"
            :key="item.status"
            :label="item.label"
            :value="item.status">
          </el-option>
        </el-select>
      </div>
    </el-header>
    <el-main>
      <el-table :data="paginationData" size="small" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column label="商品类别" prop="category"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所在库位" prop="location"></el-table-column>
        <el-table-column label="库存数量" prop="stock_quantity"></el-table-column>
        <el-table-column label="库存预警" prop="waring_quantity_min">
        </el-table-column>
        <el-table-column label="状态" prop="datetime" width="200">
          <template slot-scope="scope">
            <el-tag type="success" v-if='scope.row.status=="1"'>已过期</el-tag>
            <el-tag type="success" v-if='scope.row.status=="2"'>过期预警</el-tag>
            <el-tag type="success" v-if='scope.row.status=="3"'>库存不足</el-tag>
          </template>
        </el-table-column>
         <el-table-column label="操作" prop="datetime">
          <template slot-scope="scope">
        <el-button
         v-if='scope.row.status=="1"'
          size="mini"
          disabled
          >商品盘点</el-button>
          <el-button
          disabled
          v-if='scope.row.status=="2"'
          size="mini"
          >商品盘点</el-button>
          <el-button
          v-if='scope.row.status=="3"'
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">填写入库单</el-button>
      </template>
        </el-table-column>
        <el-table-column label="温馨提示">
          <template  slot-scope="scope">
            <span v-if='scope.row.status=="1"'>该商品快过期,请尽快盘点</span>
             <span v-if='scope.row.status=="2"'>该商品快过期,请尽快盘点</span>
            <span v-if='scope.row.status=="3"'>该商品库存不足，及时补货</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count='orders.length/5'
          :page-size='pageSize'
          layout="total, prev, pager, next, jumper"
          :total="orders.length"
      ></el-pagination>
    </el-main>
  </div>
</template>

<script>
import MessageBox from "@/components/MessageBox";
export default {
  data() {
    return {
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
      goods_name:"",
      value: "",
      repertory:"",
      status:"",
      orders: [
        // {
        //   receipt_no: '哈德',
        //   supplier: '哈德',
        //   applicant: '哈德',
        //   apply_datetime: '10',
        //   status: '哈德',
        // }
      ],
      ordersStatus: [
        {
          label: "已过期",
          status: 1
        },
        {
          label: "过期预警",
          status: 2
        },
        {
          label: "库存不足",
          status: 3
        }
      ],
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5
    };
  },
  components: {
    MessageBox
  },
  mounted() {
    this.allaudit();
    this.warehouse();
    // this.applicantlist();
  },
  methods: {
    handleEdit(index,row){
      let _this=this;
      if(row.status==1){
        _this.$router.push('/productcheck/goodscounting');
      }else if(row.status==2){
       _this.$router.push('/productcheck/goodscounting');
      }else{
         _this.$router.push('/productstorage/writeorder');
      }
    },
    handleClose() {},
    applicantbutton() {
      this.querylist();
    },
    //仓库名称
    warehouse(){
       this.$http
        .post(`${config.httpBaseUrl}/storage/get_all_repertory/`,)
        .then(res => {
          console.log(res);
          if (res.status == 1) {
            this.options = res.content;;
          } else {
            return;
          }
        });
    },
    goodsearch(){
      this.querylist();
    },
    storage(){
    this.status=this.status;
       this.querylist();
    },
    //排序状态
    statebutton() {
      this.querylist();
    },
    //排序查询
    querylist() {
      this.$http
        .post(`${config.httpBaseUrl}/medicine/warning/`, {
           goods_name:this.goods_name,
          repertory:this.repertory,
          status:this.status,
          
        })
        .then(res => {
          if (res.status == 1) {
            this.orders = res.content;
            this.getPaginationData(this.currentPage);
          } else {
            return;
          }
        });
    },
    //查询所有的订单
    allaudit() {
      this.$http
        .post(`${config.httpBaseUrl}/medicine/warning/`,{
          goods_name:this.goods_name,
          repertory:this.repertory,
          status:-1,

        })
        .then(res => {
          if (res.status == 1) {
            this.orders = res.content;
            this.getPaginationData(this.currentPage)
          } else {
            return;
          }
        });
    },
    // 分页
    getPaginationData (pageIndex) {
      const start = (pageIndex - 1) * this.pageSize
      const end = pageIndex * this.pageSize
      this.paginationData = this.orders.slice(start, end)
    },
     // 跳转至对应分页
    handleCurrentChange(val) {
      this.getPaginationData(val)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
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

