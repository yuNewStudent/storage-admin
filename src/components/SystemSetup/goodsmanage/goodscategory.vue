<template>
  <message-box
    @closeMessageBox='$emit("hideGoodsCategory")'
    :type='type'
    :btns='btns'>
    <div class="content">
      <el-table
        :data="tableData"
        border
        style="width: 100%" height="350"
        size='mini'>
        <el-table-column
          prop="id"
          label="商品类别编码"
          align='center'>
        </el-table-column>
        <el-table-column
          prop="category"
          label="商品类别"
          align='center'>
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
          width="150">
          <template slot-scope="scope">
            <!-- <span @click="modifiModify(scope)">
              <img src="@/assets/icon/系统管理-商品管理/修改IC.png">
            </span> -->
            <span @click="modifidelete(scope)">
              <img src="@/assets/icon/系统管理-人员管理/删除IC.png">
            </span>
            <span @click="modification">
              <img src="@/assets/icon/系统管理-人员管理/插入行.png">
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type','tableData4'],
  data () {
    return {
      tableData: [
        {
          id: '001',
          name: '个人防护'
        }
      ],
      btns: {
        comfirm: '确定'
      },
    }
  },
  components: {
    MessageBox
  },
  created(){
   this.Accessgoods();
  },
  methods:{
    Accessgoods(){
       this.$http.post(`${config.httpBaseUrl}/medicine/get_category/`, {
        }).then(res => {
             if(res.status==1){
               this.tableData=res.content;
             }else{
               return
             }
        })
    },
    modifiModify(scope){
      this.$prompt('请输入商品类型', '修改商品类型', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({value}) => {
        if (!value) {return}
        // 向后台发送新增部门
        
        const loginUser = JSON.parse(this.$cookie.get('user'))
        const data = {
          login_name: loginUser.name,
          login_email: loginUser.email,
          category: value
        }
        this.$http.post(`${config.httpBaseUrl}/medicine/add_category/`, data).then(res => {
          if(res.status==1){
            this.$message({
              type: 'success',
              message: res.content
            })
            this.Accessgoods();
          }else{
            this.$message({
              type: info,
              message: res.content
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消新增商品'
        })
      })

    },
    modifidelete(scope){
      this.$confirm(`此操作将删除${scope.row.category}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          // 删除本地部门
          // this.Accessgoods();
          // 向后台发送删除部门
          const loginUser = JSON.parse(this.$cookie.get('user'))
          const data = {
            login_name: loginUser.name,
            login_email: loginUser.email,
            category:scope.row.category
          }
          this.$http.post(`${config.httpBaseUrl}/medicine/del_category/`, data).then(res => {
            this.tableData.splice(scope.$index, 1)
            if(res.status==1){
              this.Accessgoods();
               this.$message({
                type: 'success',
                message: '删除成功!'
              })
             }else{
               this.$message({
                type: 'info',
                message: res.content
              }) 
               return
             }
          })     
        })
    },
    modification(){
       this.$prompt('请输入商品类型', '新增商品类型', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({value}) => {
        if (!value) {return}
        // 向后台发送新增部门
        this.$http.post(`${config.httpBaseUrl}/medicine/add_category/`, {
          category: value
        }).then(res => {
          this.Accessgoods();
        })
        this.$message({
          type: 'success',
          message: '商品新增成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消新增商品'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  line-height: 30px;
  font-size: 16px;
  color: #333;
  margin: 20px 20px;
  img {
    vertical-align: middle;
    width: 13px;
    height: 15px;
    margin: 0 5px;
  }
}
</style>

