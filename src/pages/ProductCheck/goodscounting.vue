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
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" size="medium" @click="buttonaudit" class="output">导出</el-button>
    </el-header>
    <el-main>
      <el-table size='mini' :data="tableData" border style="width: 100%" :cell-style='warningStyle'>
        <el-table-column type='selection'>
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
        <el-table-column prop='goodsStorage' label="所在仓库">
        </el-table-column>
        <el-table-column prop='currentNum' label="当前库存">
        </el-table-column>
        <el-table-column label="商品预警数"
          class-name='warning'>
          <el-table-column prop='goodsMinNum' label="最小值">
          </el-table-column>
          <el-table-column prop='goodsMaxNum' label="最大值">
          </el-table-column>
        </el-table-column>
        <el-table-column prop='price' label="采购单价">
        </el-table-column>
        <el-table-column prop='remark' label="备注">
        </el-table-column>
        <el-table-column prop="address" label="购入时间"></el-table-column>
        <el-table-column prop="address" label="生产日期"></el-table-column>
        <el-table-column prop="address" label="保质期"></el-table-column>
        <el-table-column prop="address" label="到期时间"></el-table-column>
        <el-table-column prop="address" label="预警时间"></el-table-column>
        <el-table-column prop="address" label="上次入库时间"></el-table-column>
        <el-table-column prop="address" label="存放货位"></el-table-column>
        <el-table-column prop="address" label="保管人"></el-table-column>
        <el-table-column prop="address" label="联系电话"></el-table-column>
        <el-table-column prop="address" label="状态" filters="[{text:'已处理',value: 'aa'},{text: '未处理', value: 'j'}]">
        </el-table-column>
        <el-table-column prop="address" label="备注"></el-table-column>
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
}
</style>