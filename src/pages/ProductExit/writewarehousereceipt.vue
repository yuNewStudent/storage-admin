<template>
  <div class="writewarehousereceipt">
    <div style="clear: both;"></div>
    <div class="writewarehousereceipt_operation">
      <div class="writewarehousereceipt_operationr">
        <el-row>
          <el-button type="primary" size="medium" @click="handleSave">保存</el-button>
          <el-button type="primary" size="medium" @click="handleOut">导出</el-button>
        </el-row>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="writewarehousereceipt_list">
      <el-table
        :data="orders"
        border
        size='small'
        style="width: 100%">
        <el-table-column
          type="index"
          label='序号'
          width="55">
        </el-table-column>
        <el-table-column label="收货单位" width='200'>
          <template slot-scope="scope">
            <el-select
              size='mini'
              v-if='!isEditor'
              v-model="orders[scope.$index].client" placeholder="请选择">
              <el-option
                v-for="item in clients"
                :key="item.value"
                :label="item.purchaser"
                :value="item.purchaser">
              </el-option>
            </el-select>
            <el-select
              size='mini'
              v-else
              v-model="orders[scope.$index].client" disabled  placeholder="请选择">
              <el-option
                v-for="item in clients"
                :key="item.value"
                :label="item.purchaser"
                :value="item.purchaser">
              </el-option>
            </el-select>
            <el-button @click='handleAddCust' size="mini">+</el-button>
          </template>
        </el-table-column>
        <el-table-column label="商品类别" width='150'>
          <template slot-scope="scope">
            <el-select
              size='mini'
               v-if='!isEditor'
              v-model="orders[scope.$index].category"
              placeholder="请选择">
              <el-option
                v-for="item in categories"
                :key="item.value"
                :label="item.category"
                :value="item.category">
              </el-option>
            </el-select>
            <el-select
              size='mini'
              v-else
              disabled
              v-model="orders[scope.$index].category"
              placeholder="请选择">
              <el-option
                v-for="item in categories"
                :key="item.value"
                :label="item.category"
                :value="item.category">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width='150'>
          <template slot-scope="scope">
            <el-select
              v-model="orders[scope.$index].goods_name"
              size='mini'
              v-if='!isEditor'
              placeholder="请选择"
              @focus="getGoods(scope.row.category)"
              @change='selectGoodsName(orders[scope.$index].goods_name)'>
              <el-option
                v-for="item in goodses"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select
              v-model="orders[scope.$index].goods_name"
              size='mini'
              v-else
              disabled
              placeholder="请选择"
              @change='selectGoodsName(orders[scope.$index].goods_name)'>
              <el-option
                v-for="item in goodses"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="scope">
            <el-input 
              size='mini'
              v-model="orders[scope.$index].unit"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="所在仓库" width='150'>
          <template slot-scope="scope">
            <el-select 
                size='mini'
                v-if='!isEditor'
                v-model="orders[scope.$index].location" placeholder="请选择">
              <el-option
                v-for="item in allStorage"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <el-select 
                size='mini'
                v-else
                disabled
                v-model="orders[scope.$index].location" placeholder="请选择">
              <el-option
                v-for="item in allStorage"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="出库数量">
          <template slot-scope="scope">
            <el-input 
              size='mini'
              @change='verifyNum(scope.$index)'
              v-model="orders[scope.$index].out_number"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商品单价">
          <template slot-scope="scope">
            <el-input 
              size='mini'
              v-model="orders[scope.$index].price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商品总额">
          <template slot-scope="scope">
            <el-input 
              size='mini'
              v-model="orders[scope.$index].money"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="收货地址">
          <template slot-scope="scope">
            <el-input 
              size='mini'
              v-model="orders[scope.$index].client_address"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="收货人">
          <template slot-scope="scope">
            <el-input
              size='mini'
              v-model="orders[scope.$index].client_contact"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="联系方式">
          <template slot-scope="scope">
            <el-input
              size='mini'
              v-model="orders[scope.$index].client_phone"></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column label="申请人">
          <template slot-scope="scope">
            <el-input
              size='mini'
              v-model="orders[scope.$index].applicant"></el-input>
          </template>
        </el-table-column> -->
        <el-table-column label="出库用途">
          <template slot-scope="scope">
            <el-input
              size='mini'
              v-model="orders[scope.$index].purpose"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input
              size='mini'
              v-model="orders[scope.$index].apply_comment"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="回退理由" v-if='isEditor'>
           <template slot-scope="scope">
            <el-input
             :disabled="true"
              size='mini'
              v-model="orders[scope.$index].reason_return"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作"
        v-if="isEditor">
          <template slot-scope="scope">
            <el-button
            :disabled="true"
              @click='handleDelOrder(scope.row, scope.$index)'
              size='mini'>删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作"
        v-if="!isEditor">
          <template slot-scope="scope">
            <el-button
              @click='handleDelOrder(scope.row, scope.$index)'
              size='mini'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class='add_row' v-if="!isEditor">
        <el-button size='medium' type='primary' @click='addRow'>新增行</el-button>
      </el-row>
    </div>

    <div
      class="allGoods">
      <h4 class="header">参考数据(实际数据以提交订单时为准)</h4>
      <el-table
        :data='allGoods'
        border>
        <el-table-column prop='category' label="商品类别">
        </el-table-column>
        <el-table-column prop='name' label="商品名称">
        </el-table-column>
        <el-table-column prop='estimated_price' label="商品单价">
        </el-table-column>
        <el-table-column prop='unit' label="单位">
        </el-table-column>
        <el-table-column prop='location' label="所在仓库">
        </el-table-column>
        <el-table-column prop='stock_quantity' label="库存数量">
        </el-table-column>
      </el-table>
    </div>

    <change-custom
      v-if='isShowAddCustom'
      :type='type'
      @hideChangeCustom='addCustom'></change-custom>
  </div>
</template>

<script>
import ChangeCustom from '@/components/SystemSetup/customermanage/changecustom'
export default {
  data() {
    return {
      isShowAddCustom: false,
      type: '客户管理>新增',
      orders: [
        {
          client: '',
          client_address: '',
          apply_datetime: '',
          goods_name: '',
          location: '',
          category: '',
          out_number: '', // 出库数量
          unit: '',
          price: '', // 价格
          money: '', // 总价
          client_contact: '',
          client_phone: '',
          purpose: '',
          apply_comment: '',
        },
      ],
      // 商品类别
      categories: [
        {
          id: "001",
          category: "商品类别"
        },
        {
          id: "002",
          category: "商品类别"
        },
        {
          id: "003",
          category: "商品类别"
        }
      ],
      // 仓库
      allStorage: [
        {name: "仓库1"},
        {name: "仓库2"}
      ],
      // 收货单位
      clients: [
        {
          address: "天府四街1",
          purchaser: "四川省经济贸易公司"
        },
        {
          address: "天府四街1",
          purchaser: "四川棋照科技有限公司"
        },
        {
          address: "天府四街1",
          purchaser: "攀枝花攀钢公司"
        }
      ],
      goodses: [
        // {name: ''},
        // {name: ''}
      ],
      allGoods: [
        // {
        //   category:"商品类别",
        //   name: "商品名称",
        //   unit: "单位",
        //   location: "所在货位",
        //   stock_quantity: "库存",
        //   waring_quantity_min: 10, // 库存预警最小值
        //   waring_quantity_ma: 100, // 库存预警最大值
        //   estimated_price: 2.3, // 预估价格
        //   comment: "申请人备注"
        // }
      ],
      isEditor: false
    }
  },
  components: {
    ChangeCustom
  },
  methods: {
    // 保存提交申请单
    handleSave () {
      this.comfirm()
    },
    // 导出表格
    handleOut () {

    },
    // 弹出新增客户
    handleAddCust () {
      console.log(1)
      this.isShowAddCustom = true
    },
    addCustom () {
      this.isShowAddCustom = false
    },
    
    // 删除填写的商品
    handleDelOrder (row, index) {
      this.orders.splice(index, 1)
    },
    //新增行
    addRow () {
      this.orders.push(
        {
          client: '',
          client_address: '',
          apply_datetime: '',
          goods_name: '',
          location: '',
          category: '',
          out_number: '', // 出库数量
          unit: '',
          price: '', // 价格
          money: '', // 总价
          client_contact: '',
          client_phone: '',
          purpose: '',
          apply_comment: ''
        }
      )
    },
    //根据输入商品名字，返回对应商品信息
    selectGoodsName (name) {
      this.$http.post(`${config.httpBaseUrl}/medicine/query_goods/`, {
        name: name
      }).then(res => {
        this.allGoods = res.content
      })
    },
    // 弹出确认框
    comfirm () {
      let multipleSelection=[];
      this.$confirm('请确认你填入的信息是否正确后, 再进行提交?', '提示', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let apply_datetime = this.moment(new Date()).format('YYYY-MM-DD');
        var user = JSON.parse(this.$cookie.get('user')||'{}');
        this.orders.map(item => {
          item.apply_datetime = apply_datetime;
          item.applicant=user.name;
        })
     
         if(this.$route.params.receipt_no){
           multipleSelection = this.orders.map(v => {
              v.receipt_no = this.$route.params.receipt_no;
              return v;
            })
        }else{
           multipleSelection=this.orders;
        }
        console.log(multipleSelection);
        // 信息不能为空
        // 向后台发送订单请求
        this.$http.post(`${config.httpBaseUrl}/medicine/add_outStorageReceipt/`,multipleSelection).then(res => {
          if (res.status == 1) {
            this.$message({
              type: 'success',
              message: res.content
            })
            this.orders = [
              {
                client: '',
                client_address: '',
                apply_datetime: '',
                goods_name: '',
                location: '',
                category: '',
                out_number: '', // 出库数量
                unit: '',
                price: '', // 价格
                money: '', // 总价
                client_contact: '',
                client_phone: '',
                purpose: '',
                apply_comment: ''
              }
            ]
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })         
      })
    },
    // 获取所有的商品名称
    getGoods (category) {
        console.log(category)
      this.$http.post(`${config.httpBaseUrl}/medicine/get_all_goods/`, {
        category: category
      }).then(res => {
        if (res.status === 1) {
          this.goodses = res.content
        }
      })
    },
    // 验证出库数量是否合理
    verifyNum (index) {
      if (this.orders[index].out_number > this.allGoods[0].stock_quantity) {
        this.$message.error('出库数量大于库存数量，请重新填写')
        this.orders[index].out_number = ''
      }
    }
  },
  created () {
    // 如果是修改订单
    if (this.$route.params.receipt_no) {
      const receipt_no = this.$route.params.receipt_no
      this.isEditor = true
      this.$http.post(`${config.httpBaseUrl}/medicine/get_abnormalOutReceipt/`,{
        receipt_no
      }).then(res=>{
        this.orders = res.content;
      })
    }
    // 获取所有客户
    this.$http.post(`${config.httpBaseUrl}/man/get_all_client/`).then(res => {
      if (res.status === 1) {
        this.clients = res.content
      }
    })
    // 获取所有的商品类别
    this.$http.post(`${config.httpBaseUrl}/medicine/get_category/`).then(res => {
      if (res.status === 1) {
        this.categories = res.content
      }
    })
    // 获取所有仓库
    this.$http.post(`${config.httpBaseUrl}/storage/get_all_repertory/`).then(res => {
      if (res.status === 1) {
        this.allStorage = res.content
      }
    })
  }
};
</script>
<style lang='scss' scoped>
.writewarehousereceipt {
  padding: 20px 20px;
}
.writewarehousereceipt_unitl {
  float: left;
}
.writewarehousereceipt_unitr {
  line-height: 30px;
  float: right;
  text-align: center;
}
.writewarehousereceipt_unitr p {
  color: #777777;
}
.writewarehousereceipt_unitr span {
  border-bottom: 1px solid #777777;
  color: #000;
}
.writewarehousereceipt_operationl {
  float: left;
  margin-left: 60px;
}
.writewarehousereceipt_operationr {
  float: right;
}
.writewarehousereceipt_list {
  margin-top: 20px;
  .el-select {
    width: 130px;
  }
  .add_row {
    text-align: right;
    margin-top: 20px;
  }
}
.allGoods {
  margin-top: 20px;
}
  .header {
    margin: 0 0 10px;
  }
</style>