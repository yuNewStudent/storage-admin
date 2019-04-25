<template>
  <message-box
    @closeMessageBox='library'
    :type='type'
    :btns='btns'>
    <div class="content">
      <!-- <label>仓库编号:</label>
      <el-input size='large'></el-input> -->
      <label>仓库名称:</label>
      <el-input v-model="datalist.name"></el-input>
      <label>仓库货位:</label>
      <el-input :disabled="editor" v-model="datalist.starge_rack"></el-input>
    </div>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type','editor'],
  data () {
    return {
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      },
      datalist:{
         name:"",
         starge_rack:"",
      }
    }
  },
  components: {
    MessageBox
  },
  created(){
    console.log(this.editor)
    if(this.editor==undefined){
      return
    }else{
      if(this.editor.name||''){
      this.datalist=this.editor;
      }else{
        return
      }
    }
  },
  methods:{
    library(blo){
          if (blo) {
            if(this.editor!=undefined){
              for (var k in this.datalist) {
                if (!this.datalist[k]) {
                  this.$message({
                    message: '信息不能为空',
                    type: 'warning'
                  })
                  return
                }
              }
              const loginUser = JSON.parse(this.$cookie.get('user'))
              const data = {
                // login_name: loginUser.name,
                // login_email: loginUser.email,
                name:this.datalist.name,
                starge_rack:this.datalist.starge_rack
              }
              this.$http.post(`${config.httpBaseUrl}/storage/upd_repertory/`, data).then(res=>{
                if(res.status==1){
                      this.$message({
                        message: res.content,
                        type: 'success'
                      })
                    this.$emit('hideChangeStorage')
                }else{
                   this.$message({
                      message: res.content,
                      type: 'warning'
                    })
                    this.$emit('hideChangeStorage')
                  return
                }
              // this.$http.post(`${config.httpBaseUrl}/storage/get_repertory/`).then(res=>{
              //   var tableData3=res.tableData3;
              // this.options=res.data.allgoods;
              // })
              })
            }else{
              // 信息不能为空
            for (var k in this.datalist) {
              if (!this.datalist[k]) {
                this.$message({
                  message: '信息不能为空',
                  type: 'warning'
                })
                return
              }
            }
            const data = {
              name: this.datalist.name,
              starge_rack: this.datalist.starge_rack
            }
            this.$http.post(`${config.httpBaseUrl}/storage/add_repertory/`, data).then(res=>{
              if(res.status==1){
                this.$message({
                  message: res.content,
                  type: 'success'
                })
                this.$emit('hideChangeStorage')
              }else{
                this.$message({
                  message: res.content,
                  type: 'warning'
                })
                return
              }
            })
          }
          this.$emit('hideChangeStorage')
        }else{
          this.$emit('hideChangeStorage')
        }
      },
    }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 30px;
  label {
    font-size: 12px;
    margin: 0 0 5px;
    display: inline-block;
    color: #aaa;
    font-size: 14px;
  }
  .el-input {
    margin-bottom: 16px; 
  }
}
</style>

