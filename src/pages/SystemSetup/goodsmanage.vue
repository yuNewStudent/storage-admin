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
        <!-- <el-button type="primary" @click='isShowSetMeasurement=true'>计量单位</el-button> -->
        <el-button type="primary" @click='handleGoodsCategory'>商品类别</el-button>
        <el-button class="del" @click='handleDelGoods'>删除</el-button>
        <el-button class="output" @click='handleOutput'>导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="allgoods"
        tooltip-effect="dark"
        style="width: 100%"
        border
        size='small'
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="操作"
          align='center'
          width="100">
          <template slot-scope="scope">
            <span @click="handleEditorGoods(scope.row)">
              <img src="@/assets/icon/系统管理-商品管理/修改IC.png">
            </span>
            <span @click='handleDelGoods'>
              <img src="@/assets/icon/系统管理-人员管理/删除IC.png">
            </span>
          </template>
        </el-table-column>
        <el-table-column prop='goodsCategory' label="商品类别">
        </el-table-column>
        <el-table-column prop='goodsName' label="商品名称">
        </el-table-column>
        <!-- <el-table-column prop='goodsCode' label="商品编码">
        </el-table-column> -->
        <el-table-column prop='goodsUnit' label="单位">
        </el-table-column>
        <el-table-column prop='goodsStorage' label="所在仓库">
        </el-table-column>
        <el-table-column prop='currentNum' label="当前库存">
        </el-table-column>
        <el-table-column label="商品预警数">
          <el-table-column prop='goodsMinNum' label="最小值">
          </el-table-column>
          <el-table-column prop='goodsMaxNum' label="最大值">
          </el-table-column>
        </el-table-column>
        <el-table-column prop='price' label="预估单价">
        </el-table-column>
        <el-table-column prop='remark' label="备注">
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
    <del-goods
      :type='messageBoxType.del'
      v-if='isShowDelGoods'
      @hideDelGoods='isShowDelGoods=!isShowDelGoods'>
    </del-goods>
    <editor-goods
      :type='messageBoxType.editor'
      v-if='isShowEditorGoods'
      @goodsEditor='goodsEditor'></editor-goods>
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
import EditorGoods from '@/components/SystemSetup/goodsmanage/editorgoods.vue'
import outputTable from '@/assets/js/outputTable'
export default {
  data () {
  	return {
      currentPage:4,
      messageBoxType: {
        add: '商品管理>新增',
        measurement: '商品管理>计量单位设置',
        del: '商品管理>删除',
        editor: '商品管理>修改',
        goodsClass: '商品管理>商品类别'
      },
      isShowSetMeasurement: false,
      isShowDelGoods: false,
      isShowGoodsCategory: false,
      isShowAddGoods: false,
      isShowEditorGoods: false,
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
      allgoods: [
        {
          goodsCategory: '医用物资',
          goodsName: '阿莫西林',
          goodsCode: '123',
          goodsModel: '1/23/4',
          goodsUnit: '箱',
          goodsStorage: 'a区101',
          currentNum: 12,
          goodsMinNum: 20,
          goodsMaxNum: 100,
          price: 23,
          remark: '',
          // status: '',
          // orderCode: '',
          // writeDate: '',
          // operatorUser: '',
          // purpose: '',
        }
      ],
      multipleSelection: []
    }
  },
  components: {
    SetMeasurement,
    DelGoods,
    GoodsCategory,
    AddGoods,
    EditorGoods
  },
  methods: {
    // 展示修改商品页面
    handleEditorGoods (row) {
      console.log(row)
      this.isShowEditorGoods = true
    },
    goodsEditor (bol) {
      this.isShowEditorGoods = false
    },
    handleSelectionChange () {
      console.log(1)
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
    float: right;
    font-size: 14px;
    .del,.output {
      color: #87baef;
      border: 1px solid #87baef;
    }
  }
}
.el-main {
  padding-top: 0;
  
  img {
    vertical-align: middle;
    width: 13px;
    height: 15px;
    margin: 0 5px;
  }
}
</style>
