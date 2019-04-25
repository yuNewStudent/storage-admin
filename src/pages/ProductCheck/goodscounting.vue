<template>
  <div class="goodscounting">
    <el-header>
      <div class="selectStore">
        仓库名称:
        <el-select size='medium' v-model="value" placeholder="请选择"  filterable @change="storage()">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search">
        商品状态:
        <el-select v-model="status" placeholder="请选择" @change="Goodsstate()">
          <el-option
            v-for="item in ordersStatus"
            :key="item.status"
            :label="item.label"
            :value="item.status">
          </el-option>
        </el-select>
      </div>
      <div class="search">
        商品名称:
        <el-input v-model="goods_name" placeholder="请输入商品名称"></el-input>
      </div>
      <el-button type="primary" @click="goodsearch()">搜索</el-button>
       <!-- <el-button type="primary" size="medium" @click="buttonaudit" class="output">保存</el-button> -->
      <el-button type="primary" size="medium" @click="buttonaudit" class="output">导出</el-button>
    </el-header>
    <el-main>
      <el-table
        :data="paginationData"
        border
        size='small'
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="55">
        </el-table-column>
        <el-table-column label="商品类别" prop='category'>
        </el-table-column>
        <el-table-column label="商品名称" prop='name'>
        </el-table-column>
        <el-table-column label="商品编码" prop='unit'>
        </el-table-column>
        <el-table-column label="所在货位" prop='location'>
        </el-table-column>
        <el-table-column label="商品总库存" prop='stock_quantity'>
        </el-table-column>
        <el-table-column label="商品状态">
          <!-- <span>{{orders.status}}</span> -->
          <template slot-scope="scope">
            <el-tag type="success" v-if='scope.row.status=="正常"'>正常</el-tag>
            <el-tag type="danger" v-else-if='scope.row.status=="已过期"'>已过期</el-tag>
            <el-tag type="warning" v-else-if='scope.row.status=="预警装填"'>预警装填</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
             <el-button @click="details(scope.$index, scope.row)">详情</el-button>
              <el-button @click="inventory(scope.$index, scope.row)">盘点</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count='orders.length/pageSize'
          :page-size='pageSize'
          layout="total, prev, pager, next, jumper"
          :total="orders.length"
        ></el-pagination>
      </div>
      <h5>商品详情：</h5>
      <el-table size='mini' :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%" :cell-style='warningStyle'>
        <el-table-column type='selection' >
        </el-table-column>
        <el-table-column prop='barcode' label="条形码">
        </el-table-column>
        <el-table-column prop='category' label="商品类别">
        </el-table-column>
        <el-table-column prop='name' label="商品名称">
        </el-table-column>
        <el-table-column prop='medicine_no' label="商品编码">
        </el-table-column>
        <el-table-column prop='specification' label="规格型号">
        </el-table-column>
        <el-table-column prop='unit' label="单位">
        </el-table-column>
        <el-table-column prop='location' label="所在货位">
        </el-table-column>
        <el-table-column prop='stock_quantity' label="当前库存">
        </el-table-column>
         <el-table-column prop="address" label="盘点库存">
         <template slot-scope="scope">
            <el-input type="number" v-model="tableData[scope.$index].check_stock"></el-input>
         </template>
         </el-table-column>
        <!-- <el-table-column label="商品预警数"
          class-name='warning'>
          <el-table-column prop='waring_quantity_min' label="最小值">
          </el-table-column>
          <el-table-column prop='waring_quantity_max' label="最大值">
          </el-table-column>
        </el-table-column> -->
        <el-table-column prop='estimated_price' label="采购单价">
        </el-table-column>
        <el-table-column prop="in_storage_time" label="购入时间"></el-table-column>
        <el-table-column prop="date_manufacture" label="生产日期"></el-table-column>
        <el-table-column prop="shelf_life" label="保质期"></el-table-column>
        <el-table-column prop="expired_time" label="到期时间"></el-table-column>
        <!-- <el-table-column prop="address" label="预警时间"></el-table-column> -->
        <el-table-column prop="in_storage_time" label="上次入库时间"></el-table-column>
        <!-- <el-table-column prop="address" label="库管员"></el-table-column>
        <el-table-column prop="address" label="联系电话"></el-table-column> -->
        <el-table-column  label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if='scope.row.status=="正常"'>正常</el-tag>
            <el-tag type="danger" v-else-if='scope.row.status=="已过期"'>已过期</el-tag>
            <el-tag type="warning" v-else-if='scope.row.status=="预警装填"'>预警装填</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="盈亏原因">
          <template slot-scope="scope">
            <el-input type=text v-model="tableData[scope.$index].reason"></el-input>
         </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      input10: "",
      status:'',
      goods_name:'',
      orders: [
  //      {
  //       "id": "000001",
  //       "category":"商品类别",
  //       "name": "商品名称",
  //       "unit": "单位",
  //       "location": "所在位置",
  //       "stock_quantity": 20, 
  //       "waring_quantity_min": 10,
  //       "waring_quantity_max": 100,
  //       "estimated_price": 2.3,
  //       "comment": "商品备注",
  //       "status": "正常"
  //   },
      ],
      tableData:[
    //     {
    //     "barcode":"条形码",
    //     "name":"商品名称",
    //     "category":"商品类别",
    //     "medicine_no":"商品编码",
    //     "specification":"商品规格",
    //     "location": "所在位置",
    //     "stock_quantity":"库存",
    //     "estimated_price":"预估价格",
    //     "date_manufacture":"生产日期",
    //     "shelf_life":"保质期",
    //     "expired_time":"过期时间",
    //     "in_storage_time":"上次入库时间",
    //     "reason":"",
    // }
      ],
      multipleSelection:[],
      formInline: {
        user: "",
        region: ""
      },
      ordersStatus: [
        {
          label: '正常',
          status:0,
        },
        {
          label: '已过期',
          status:1,
        },
        {
          label: '预警状态',
          status:2
        }
      ],
      options: [
        // {
        //   value: "选项1",
        //   label: "A区"
        // },
        // {
        //   value: "选项2",
        //   label: "B区"
        // },
        // {
        //   value: "选项3",
        //   label: "C区"
        // },
        // {
        //   value: "选项4",
        //   label: "D区"
        // },
        // {
        //   value: "选项5",
        //   label: "F区"
        // }
      ],
      value: "",
      value1: "",
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5
    };
  },
  components: {},
  created(){
     this.inventorylist();
     this.warehouse();
  },
  methods: {
    //仓库名称
    warehouse(){
      this.$http.post(`${config.httpBaseUrl}/storage/get_all_repertory/`).then(res=>{
          if(res.status==1){
            console.log(res)
            this.options=res.content;
            console.log(this.options)
          }else{
            return
          }
        })
    },
    //详情
    details(index,row){
      this.$http.post(`${config.httpBaseUrl}/medicine/detail_goods/`,{
          name:row.name
        }).then(res=>{
          if(res.status==1){
            this.tableData=res.content;
          }else{
            return
          }
        })
    },
    //商品状态
    Goodsstate(){
      console.log(this.status)
        this.findinventory();
    },
    //仓库名称搜索
    storage(){
     this.findinventory();
    },
    //所有商品名称
    goodsearch(){
     this.findinventory();
    },
    //查找所有
   findinventory(){
     this.$http.post(`${config.httpBaseUrl}/medicine/get_goodsStatus/`,{
          all:0,
          repertory:this.value,
          goods_name:this.goods_name,
          status:this.status,
        }).then(res=>{
          if(res.status==1){
            this.orders=res.content
            // 刚打开页面时加载前pageSize项、且自动生成分页数量
            this.getPaginationData(1)
          }else{
            return
          }
        })
   },
    //货物盘点
    inventorylist(){
     this.$http.post(`${config.httpBaseUrl}/medicine/get_goodsStatus/`,{
          all:1,
          repertory:"",
          goods_name:"",
          status:"-1"
        }).then(res=>{
          console.log(res.status)
          if(res.status==1){
            this.orders=res.content
            // 刚打开页面时加载前pageSize项、且自动生成分页数量
           this.getPaginationData(1)
          }else{
            return
          }
        })
    },
    //
    inventory(index,row){
       var time=this.moment(new Date()).format('YYYY-MM-DD');
       let multipleSelection = this.multipleSelection.map(v => {
         v.datetime = time;
         return v;
       })
       this.$http.post(`${config.httpBaseUrl}/medicine/add_inventory/`,
          multipleSelection
        ).then(res=>{
          console.log(res)
          if(res.status==1){
            this.$message({
              message: res.content,
              type: 'success'
            });
            this.inventorylist();
            this.details();
            // this.orders=res.content;
          }else{
            return
          }
        })
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    // 分页
    getPaginationData (pageIndex) {
      const start = (pageIndex - 1) * this.pageSize
      const end = pageIndex * this.pageSize
      this.paginationData = this.orders.slice(start, end)
    },
    // 跳转至对应分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPaginationData(val)
    },
    buttonsave: function() {},
    buttonaudit: function() {},
    warningStyle (row, column, rowIndex, columnIndex) {
      if (row.column.label === '最小值' || row.column.label === '最大值' ||row.column.label === '预警时间') {
        return 'background: pink' 
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.el-header {
  margin: 20px 0 0;
  > div {
    display: inline-block;
  }
  .selectStore {
    width: 250px;
    .el-select {
      width: 150px;
    }
  }
  .search {
    width: 300px;
    .el-input {
      width: 200px;
    }
  }
  .output {
    float: right;
  }
}
.el-main {
  margin: 0 20px;
  padding: 0;
    h5 {
      margin: 70px 0 10px;
    }
}
</style>