<template>
  <div class="goodsmanage">
  	<el-header>
      <div class="selectStore">
        仓库名称:
        <el-select v-model="value" placeholder="请选择">
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
        <el-button type="primary">搜索</el-button>
      </div>
      <div class="buttons">
        <el-button type="primary" @click='isShowAddGoods=true'>新增</el-button>
        <el-button type="primary" @click='isShowSetMeasurement=true'>计量单位</el-button>
        <el-button type="primary" @click='handleGoodsCategory'>商品类别</el-button>
        <el-button class="del" @click='handleDelGoods'>删除</el-button>
        <el-button class="output" @click='handleOutput'>导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        border
        size='mini'
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-main>
    <set-measurement
      :type='messageBoxType.measurement'
      v-if='isShowSetMeasurement'
      @hideSetmeasurement='isShowSetMeasurement=!isShowSetMeasurement'>
    </set-measurement>
    <del-goods
      :type='messageBoxType.del'
      v-if='isShowDelGoods'
      @hideDelGoods='isShowDelGoods=!isShowDelGoods'>
    </del-goods>
    <goods-category
      :type='messageBoxType.goodsClass'
      v-if='isShowGoodsCategory'
      @hideGoodsCategory='isShowGoodsCategory=!isShowGoodsCategory'></goods-category>
    <add-goods
      :type='messageBoxType.add'
      v-if='isShowAddGoods'
      @hideGoodsCategory='isShowAddGoods=!isShowAddGoods'></add-goods>
  </div>
</template>

<script>
import SetMeasurement from '@/components/SystemSetup/goodsmanage/setmeasurement.vue'
import DelGoods from '@/components/SystemSetup/goodsmanage/delgoods.vue'
import GoodsCategory from '@/components/SystemSetup/goodsmanage/goodscategory.vue'
import AddGoods from '@/components/SystemSetup/goodsmanage/addgoods.vue'
import outputTable from '@/assets/js/outputTable'
export default {
  data () {
  	return {
      messageBoxType: {
        add: '商品管理>新增',
        measurement: '商品管理>计量单位设置',
        del: '商品管理>删除',
        goodsClass: '商品管理>商品类别'
      },
      isShowSetMeasurement: false,
      isShowDelGoods: false,
      isShowGoodsCategory: false,
      isShowAddGoods: false,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      tableData3: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: []
    }
  },
  components: {
    SetMeasurement,
    DelGoods,
    GoodsCategory,
    AddGoods
  },
  methods: {
    handleSelectionChange () {
      console.log(1)
    },
    handleDelGoods () {
      this.isShowDelGoods = true
    },
    handleGoodsCategory () {
      this.isShowGoodsCategory = true
    },
    //导出表格
    handleOutput () {
      outputTable(this.tableData3)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  margin: 20px 0;
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
    width: 380px;
    .el-input {
      width: 200px;
    }
  }
  .buttons {
    font-size: 14px;
    .del,.output {
      color: #87baef;
      border: 1px solid #87baef;
    }
  }
}
.el-main {
  padding-top: 0;
}
</style>
