<template>
  <div class="goodsmanage">
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
        <el-input placeholder="请输入商品名称" v-model="goods"></el-input>
        <el-button type="primary" @click="Commodity()">搜索</el-button>
      </div>
      <div class="buttons">
        <el-button type="primary" @click='isShowAddGoods=true'>新增</el-button>
        <!-- <el-button type="primary" @click='isShowSetMeasurement=true'>计量单位</el-button> -->
        <el-button type="primary" @click='handleGoodsCategory'>商品类别</el-button>
        <!-- <el-button class="del" @click='handleDelGoods'>删除</el-button> -->
        <el-button class="output" @click='handleOutput'>导出</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="paginationData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        size='small'
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop='category' label="商品类别">
        </el-table-column>
        <el-table-column prop='name' label="商品名称">
        </el-table-column>
        <!-- <el-table-column prop='goodsCode' label="商品编码">
        </el-table-column> -->
        <el-table-column prop='unit' label="单位">
        </el-table-column>
        <el-table-column prop='location' label="所在仓库">
        </el-table-column>
        <el-table-column prop='stock_quantity' label="当前库存">
        </el-table-column>
        <el-table-column label="商品预警数">
          <el-table-column prop='waring_quantity_min' label="最小值">
          </el-table-column>
          <el-table-column prop='waring_quantity_max' label="最大值">
          </el-table-column>
        </el-table-column>
        <el-table-column prop='estimated_price' label="预估单价">
        </el-table-column>
        <el-table-column prop='comment' label="备注">

        </el-table-column>
        <el-table-column label="操作"
          align='center'
          width="100">
          <template slot-scope="scope">
            <span @click="handleEditorGoods(scope.row)">
              <img src="@/assets/icon/系统管理-商品管理/修改IC.png">
            </span>
            <span @click='handleDelGoods(scope.$index,scope.row)'>
              <img src="@/assets/icon/系统管理-人员管理/删除IC.png">
            </span>
          </template>
        </el-table-column>
      </el-table>
       <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count='allgoods.length/5'
          :page-size='pageSize'
          layout="total, prev, pager, next, jumper"
          :total="allgoods.length"
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
      @hideDelGoods='hideDelGoods' :delgood="delgood">
    </del-goods>
    <!-- <del-goods
      :type='messageBoxType.del'
      v-if='isShowDelGoods'
      @hideDelGoods='isShowDelGoods=!isShowDelGoods'>
    </del-goods> -->
    <editor-goods
      :type='messageBoxType.editor'
      v-if='isShowEditorGoods'
      @goodsEditor='goodsEditor' :Editor="Editor"></editor-goods>
    <goods-category
      :type='messageBoxType.goodsClass'
      v-if='isShowGoodsCategory'
      @hideGoodsCategory='isShowGoodsCategory=!isShowGoodsCategory'></goods-category>
    
    <add-goods
      :type='messageBoxType.add'
      v-if='isShowAddGoods'
      @hideGoodsCategoryadd='hideGoodsCategoryadd'></add-goods>
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
      goods:"",
      selectUsers: {
        index: '',
        allgoods: []
      },
      Editor:{},
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
      delgood:{},
      allgoods: [
        // {
        //   category: '医用物资',
        //   name: '阿莫西林',
        //   unit: '箱',
        //   // location: '1/23/4',
        //   // goodsUnit: '箱',
        //   location: 'a区101',
        //   stock_quantity: 12,
        //   waring_quantity_min: 20,
        //   waring_quantity_max: 100,
        //   estimated_price: 23,
        //   comment: '',
        //   // status: '',
        //   // orderCode: '',
        //   // writeDate: '',
        //   // operatorUser: '',
        //   // purpose: '',
        // }
      ],
      multipleSelection: [],
      tableData4:[],
      // 分页
      currentPage: 1,
      paginationData: [],
      pageSize: 5
    }
  },
  components: {
    SetMeasurement,
    DelGoods,
    GoodsCategory,
    AddGoods,
    EditorGoods
  },
  created(){
   this.medicine();
   this.warehouse();
  },
  methods: {
    //  Accessgoods(){
    //   console.log(1221);
    //    this.$http.post(`${config.httpBaseUrl}/medicine/get_category/`, {
    //     }).then(res => {
    //         this.tableData4=res.content;
    //     })
    // },
    //查询所有的商品
    medicine(){
      this.$http.post(`${config.httpBaseUrl}/medicine/query_medicine/`,{
        repertory: "",
        goods: "",
      }).then(res=>{
        console.log(res)
        this.allgoods=res.content
        // 刚打开页面时加载前5项、且自动生成分页数量
        this.getPaginationData(this.currentPage)
      })
    },
    //查询仓库名称
   warehouse(){
      this.$http.post(`${config.httpBaseUrl}/storage/get_all_repertory/`).then(res=>{
          if(res.status==1){
            console.log(res)
            this.options=res.content
          }else{
            return
          }
        })
    },
    storage(){
      this.findinventory();
    },
    findinventory(){
    this.$http.post(`${config.httpBaseUrl}/medicine/query_medicine/`,{
        repertory:this.value,
        goods:this.goods
      }).then(res=>{
        if(res.status==1){
          this.allgoods = res.content
          
          // 刚打开页面时加载前5项、且自动生成分页数量
          this.getPaginationData(this.currentPage)
        }else{
          return
        }
      })
    },
    //根据商品名称搜索
    Commodity(){
       this.findinventory();
    },
    // 展示修改商品页面
    handleEditorGoods (row) {
      this.Editor=row;
      this.isShowEditorGoods = true
    },
    goodsEditor (bol) {
      // this.allgoods=this.allgood;
      this.isShowEditorGoods = false
    },
    handleSelectionChange () {
      console.log(1)
    },
    handleDelGoods (index,row) {
      this.delgood={
        row:row,
        index:index
      }
      this.isShowDelGoods = true;
      // this.allgoods=this.allgood;
    },
    hideDelGoods(delgood,bol){
       this.allgoods.splice(delgood.index,1);
       this.isShowDelGoods = false;
       
    },
    handleGoodsCategory () {
      this.isShowGoodsCategory = true
    },
    hideGoodsCategoryadd(allgood,bol){
      console.log(allgood)
      this.findinventory()
      this.isShowAddGoods = false
    },
    //导出表格
    handleOutput () {
      outputTable(this.tableData3)
    },
    // 分页
    getPaginationData (pageIndex) {
      const start = (pageIndex - 1) * this.pageSize
      const end = pageIndex * this.pageSize
      this.paginationData = this.allgoods.slice(start, end)
    },
    // 跳转至对应分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPaginationData(val)
    }
  }
}
</script>

<style lang="scss" scoped>
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
