<template>
  <message-box
    @closeMessageBox='$emit("hideGoodsCategory")'
    :type='type'
    :btns='btns'>
    <div class="content">
      <el-tabs type="border-card">
        <el-tab-pane label="基础设置">
          <div class="content_wrapper">
            <label><span>*</span>商品名称:</label>
            <el-input size='small' v-model='goodsInfo.name'></el-input>
            <label for=""><span>*</span>商品类型:</label>
            <el-select
              v-model='goodsInfo.type'
              placeholder="请选择"
              size='small'>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <label for=""><span>*</span>规格型号:</label>
            <el-input
              size='small'
              v-model='goodsInfo.model'></el-input> -->
            <!-- <label for=""><span>*</span>商品编码:</label>
            <el-input
              size='small'
               v-model='goodsInfo.code'></el-input> -->
            <label for=""><span>*</span>所在货位:</label>
            <el-select
              v-model="goodsInfo.address"
              placeholder="请选择"
              size='small'>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <label for=""><span>*</span>单位:</label>
            <el-select
              v-model="goodsInfo.company"
              placeholder="请选择"
              size='small'>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            
            <label>备注:</label>
            <el-input size='small' v-model='goodsInfo.name'></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品设置">
          <div class="content_wrapper">
            <label for=""><span>*</span>商品预警数</label>
            <label for="">最大值:</label>
            <el-input
              v-model="goodsInfo.GoodsNumWarning"
              size='small'></el-input>
            <label for="">最小值:</label>
            <el-input
              v-model="goodsInfo.GoodsNumWarning"
              size='small'></el-input>
              
            <hr/>
            <label for="">当前库存:</label>
            <el-input
              v-model="goodsInfo.currentGoodsNum"
              size='small'></el-input>
            <label for="">预估单价:</label>
            <el-input
              v-model="goodsInfo.currentGoodsNum"
              size='small'></el-input>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="日期设置">
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
  props: ['type'],
  data () {
    return {
      btns: {
        comfirm: '确定',
        cancel: '取消'
      },
      goodsInfo: {
        name: '',
        type: '',
        model: '',
        code: '',
        address: '',
        company: '',
        GoodsNumWarning: 0,
        currentGoodsNum: 0,
        buyTime: '',
        productionTime: '',
        fullTime: '',
        expireTime: '',
        expireTimeWarning: '',
        lastOutTime: ''
      }
    }
  },
  components: {
    MessageBox,
  },
  mounted(){
     this.Commodity();
     this.storage();
  },
  methods:{
    //商品类型
    Commodity(){
         this.$http.post('${config.httpBaseUrl}/storage/get_repertory/',{
          // goods:goods,
        }).then(res=>{
        this.allgoods=res.data.allgoods;
      })
    },
    //所在货位
    storage(){
       let _this=this;
      this.$http.post('${config.httpBaseUrl}/storage/get_repertory/').then(res=>{
        this.options=res.data.allgoods;
      })
    },
    add(blo){
       if (blo) {
         console.log(this.goodsInfo)
        // 信息不能为空
        for (var k in this.goodsInfo) {
          if (!this.goodsInfo[k]) {
            this.$message({
              message: '信息不能为空',
              type: 'warning'
            })
            return
          }
        }
        this.$http.post('${config.httpBaseUrl}/medicine/add_medicine/',{
          goodsInfo:this.goodsInfo,
        }).then(res=>{
        this.options=res.data.allgoods;
        })
        this.$emit('isShowSettingPermission', this.goodsInfo)
      } else {
        this.$emit("isShowSettingPermission")
      }
    },
    created () {
    console.log(this.selectUsers)
    // this.userInfo = this.selectUsers.userInfo
    // 获取部门列表
    // this.$http.post(`${config.httpBaseUrl}/man/get_department/`).then(res => {
    //   console.log(res)
    //   this.departmentData = res.data
    // })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
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

