<template>
  <message-box
    @closeMessageBox='hideGoodsEditor'
    :type='type'
    :btns='btns'>
    <div class="content">
      <el-tabs type="border-card">
        <el-tab-pane label="基础设置">
          <div class="content_wrapper">
            <label><span>*</span>商品名称:</label>
            <el-input size='small' :disabled="true" v-model='goodsInfo.name'></el-input>
            <label for=""><span>*</span>商品类型:</label>
            <el-select
              v-model='goodsInfo.category'
              placeholder="请选择"
              size='small'>
              <el-option
                v-for="item in allgoods"
                :key="item.category"
                :label="item.category"
                :value="item.category">
              </el-option>
            </el-select>
            <!-- <label for=""><span>*</span>规格型号:</label>
            <el-input
              size='small'
              v-model='goodsInfo.unit'></el-input> -->
            <!-- <label for=""><span>*</span>商品编码:</label>
            <el-input
              size='small'
               v-model='goodsInfo.goodsCode'></el-input> -->
            <label for=""><span>*</span>所在货位:</label>
            <el-select
              v-model="goodsInfo.location"
              placeholder="请选择"
              size='small'>
              <el-option
                v-for="item in options"
                :key="item.starge_rack"
                :label="item.starge_rack"
                :value="item.starge_rack">
              </el-option>
            </el-select>
            <label for=""><span>*</span>单位:</label>
            <el-input size='small' v-model='goodsInfo.unit'></el-input>
            <label for=""><span>*</span>备注:</label>
            <el-input
              v-model="goodsInfo.comment"
              size='small'></el-input>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="商品设置">
          <div class="content_wrapper">
            <div class="goodsNumWarn">
              <label for=""><span>*</span>商品预警数:</label>
              <label for="">最高库存预警:</label>
              <el-input
                type="number"
                :controls=false
                v-model="goodsInfo.waring_quantity_max"
                size='small'></el-input>
              <label for="">最低库存预警:</label>
              <el-input
               type="number"
                :controls=false
                :max="goodsInfo.waring_quantity_max"
                v-model="goodsInfo.waring_quantity_min"
                size='small'></el-input>
            </div>
            <label for="">采购单价:</label>
            <el-input
              v-model="goodsInfo.estimated_price"
              size='small'></el-input>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="商品数量">
          <div class="content_wrapper">
            <label for=""><span>*</span>商品预警数:</label>
            <el-input
              v-model="goodsInfo.GoodsNumWarning"
              size='small'></el-input>
            <label for="">当前库存:</label>
            <el-input
              v-model="goodsInfo.currentGoodsNum"
              size='small'></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="日期设置">
          <div class="content_wrapper">
            <label for="">采购时间:</label>
            <el-date-picker
              v-model="goodsInfo.buyTime"
              type="date"
              size='small'
              placeholder="选择日期">
            </el-date-picker><label for=""><span>*</span>生产日期:</label>
            <el-date-picker
              v-model="goodsInfo.productionTime"
              type="date"
              size='small'
              placeholder="选择日期">
            </el-date-picker>
            <label for=""><span>*</span>保质期:</label>
            <el-input
              size='small'
              v-model="goodsInfo.fullTime"></el-input>
            <label for="">到期时间:</label>
            <el-date-picker
              v-model="goodsInfo.expireTime"
              type="date"
              size='small'
              placeholder="选择日期">
            </el-date-picker>
            <label for="">到期时间预警:</label>
            <el-date-picker
              v-model="goodsInfo.expireTimeWarning"
              type="date"
              size='small'
              placeholder="选择日期">
            </el-date-picker>
            <label for=""><span>*</span>上次入库时间:</label>
            <el-date-picker
              v-model="goodsInfo.lastOutTime"
              type="date"
              size='small'
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type',"Editor"],
  data () {
    return {
      btns: {
        comfirm: '确定',
        cancel: '取消'
      },
      allgoods:[],
      allgood:[],
      options:[],
      goodsInfo: {
        category:"",
        name:"",
        unit:"",
        location:"",
        stock_quantity:"",
        waring_quantity_min:"",
        waring_quantity_max:"",
        estimated_price:"",
        comment:"",
      },
    }
  },
  components: {
    MessageBox
  },
  created(){
     this.goodsInfo=this.Editor;
      this.Commodity();
     this.storage();
  },
  methods: {
    //商品类型
    Commodity(){
         this.$http.post(`${config.httpBaseUrl}/medicine/get_category/`,{
          // goods:goods,
        }).then(res=>{
        this.allgoods=res.content;
      })
    },
    //所在货位
    storage(){
       let _this=this;
      this.$http.post(`${config.httpBaseUrl}/storage/get_repertory/`).then(res=>{
        this.options=res.content;
      })
    },
    hideGoodsEditor (bol) {
      // 确认修改
      if (bol) {
        const loginUser = JSON.parse(this.$cookie.get('user'))
        const data = {
          // login_name: loginUser.name,
          // login_email: loginUser.email,
          ...this.goodsInfo
        }
        this.$http.post(`${config.httpBaseUrl}/medicine/upd_medicine/`, data).then(res=>{
          if(res.status==1){
              // this.$http.post(`${config.httpBaseUrl}/medicine/query_medicine/`,{
              //    repertory:"",
              //    goods:""
              // }).then(res=>{
              if(res.status==1){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$emit('goodsEditor')
              }else{
                return
              }
            
            // })
          }else{
            this.$message({
              message: '信息不能为空',
              type: 'warning'
            })
            return
          }
        })
        // this.$emit('goodsEditor')
      } else {
        this.$emit("goodsEditor")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 460px;
  .el-tabs {
    border: none;
    box-shadow: none;
    .content_wrapper {
      margin: 0px 20px;
      label {
        font-size: 12px;
        margin: 0 0 5px;
        display: block;
        color: #aaa;
        font-size: 14px;
        span {
          color: red;
          margin-right: 5px; 
        }
      }
      .el-input {
        margin-bottom: 16px; 
      }
      .el-date-editor {
        width: 100%;
      }
      .el-select {
        display: block;
        margin-bottom: 16px;
      }
    }
  }
}
</style>

