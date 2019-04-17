<template>
  <message-box
    @closeMessageBox='add'
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
              v-model='goodsInfo.stock_quantity'
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
              v-model="goodsInfo.location"
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
            <el-input size='small' v-model='goodsInfo.unit'></el-input>
            <!-- <el-select
              v-model="goodsInfo.company"
              placeholder="请选择"
              size='small'>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
            
            <label>备注:</label>
            <el-input size='small' v-model='goodsInfo.comment'></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品设置">
          <div class="content_wrapper">
            <label for=""><span>*</span>商品预警数</label>
            <label for="">最大值:</label>
            <el-input
              v-model="goodsInfo.waring_quantity_min"
              size='small'></el-input>
            <label for="">最小值:</label>
            <el-input
              v-model="goodsInfo.waring_quantity_max"
              size='small'></el-input>
              
            <hr/>
            <label for="">当前库存:</label>
            <el-input
              v-model="goodsInfo.stock_quantity"
              size='small'></el-input>
            <label for="">预估单价:</label>
            <el-input
              v-model="goodsInfo.estimated_price"
              size='small'></el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type', 'selectUsers'],
  data () {
    return {
      btns: {
        comfirm: '确定',
        cancel: '取消'
      },
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
      goodsInfo: {
        name: '',
        type: '',
        unit:'',
        location:'',
        stock_quantity:'',
        waring_quantity_min:'',
        waring_quantity_max:'',
        estimated_price:'',
        comment:'',
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
    add(block){
       if (block) {
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

