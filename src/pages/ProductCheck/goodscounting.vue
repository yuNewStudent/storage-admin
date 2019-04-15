<template>
  <div class="goodscounting">
    <el-header>
      <div class="selectStore">
        仓库名称:
        <el-select size='medium' v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search">
        商品名称:
        <el-input placeholder="请输入商品名称"></el-input>
      </div>
      <div class="search">
        商品状态:
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in ordersStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary">搜索</el-button>
       <el-button type="primary" size="medium" @click="buttonaudit" class="output">保存</el-button>
      <el-button type="primary" size="medium" @click="buttonaudit" class="output">导出</el-button>
    </el-header>
    <el-main>
      <el-table
        :data="orders"
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
        <el-table-column label="商品类别" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="商品名称" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="商品编码" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="仓库名称" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="商品总库存" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="商品状态" prop='goodsCategory'>
        </el-table-column>
        <el-table-column label="操作" prop='goodsCategory'>
          <el-button>详情</el-button>
        </el-table-column>
      </el-table>

      <h5>商品详情：</h5>
      <el-table size='mini' :data="tableData" border style="width: 100%" :cell-style='warningStyle'>
        <el-table-column type='selection'>
        </el-table-column>
        <el-table-column prop='goodsCategory' label="条形码">
        </el-table-column>
        <el-table-column prop='goodsCategory' label="商品类别">
        </el-table-column>
        <el-table-column prop='goodsName' label="商品名称">
        </el-table-column>
        <el-table-column prop='goodsCode' label="商品编码">
        </el-table-column>
        <el-table-column prop='goodsModel' label="规格型号">
        </el-table-column>
        <el-table-column prop='goodsUnit' label="单位">
        </el-table-column>
        <el-table-column prop='goodsStorage' label="所在货位">
        </el-table-column>
        <el-table-column prop='currentNum' label="当前库存">
        </el-table-column>
         <el-table-column prop="address" label="盘点库存">
          <el-input></el-input>
         </el-table-column>
        <!-- <el-table-column label="商品预警数"
          class-name='warning'>
          <el-table-column prop='goodsMinNum' label="最小值">
          </el-table-column>
          <el-table-column prop='goodsMaxNum' label="最大值">
          </el-table-column>
        </el-table-column> -->
        <el-table-column prop='price' label="采购单价">
        </el-table-column>
        <el-table-column prop="address" label="购入时间"></el-table-column>
        <el-table-column prop="address" label="生产日期"></el-table-column>
        <el-table-column prop="address" label="保质期"></el-table-column>
        <el-table-column prop="address" label="到期时间"></el-table-column>
        <!-- <el-table-column prop="address" label="预警时间"></el-table-column> -->
        <el-table-column prop="address" label="上次入库时间"></el-table-column>
        <!-- <el-table-column prop="address" label="库管员"></el-table-column>
        <el-table-column prop="address" label="联系电话"></el-table-column> -->
        <el-table-column prop="address" label="状态">
        </el-table-column>
        <el-table-column prop="address" label="盈亏原因">
          <el-input></el-input>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      input10: "",
      currentPage:4,
      tableData: [
        // {
        //   goodsCategory: '医用物资',
        //   goodsName: '阿莫西林',
        //   goodsCode: '123',
        //   goodsModel: '1/23/4',
        //   goodsUnit: '箱',
        //   goodsStorage: 'a区101',
        //   currentNum: 12,
        //   goodsMinNum: 20,
        //   goodsMaxNum: 100,
        //   price: 23,
        //   remark: '',
        //   // status: '',
        //   // orderCode: '',
        //   // writeDate: '',
        //   // operatorUser: '',
        //   // purpose: '',
        // }
        {
          date: "哈哈哈",
          name: "王小虎",
          address: "1518 弄"
        },
        {
          date: "话啊哈哈哈",
          name: "王小虎",
          address: "1517 弄"
        }
      ],
      formInline: {
        user: "",
        region: ""
      },
      ordersStatus: [
        {
          label: '正常',
        },
        {
          label: '已过期',
        },
        {
          label: '预警状态',
        }
      ],
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
  methods: {
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
    handleCurrentChange(val) {
    console.log(`当前页: ${val}`);
  },
    handleSizeChange(val) {
    console.log(`每页 ${val} 条`);
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
      margin: 30px 0 10px;
    }
}
</style>