<template>
  <message-box
    @closeMessageBox='Delsupplier'
    :type='type'
    :btns='btns'>
    <p class="content">你确定要删除{{this.multiple.supplier}}公司的信息和相关资料吗?<br/>删除后系统不能回复</p>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type',"multiple"],
  data () {
    return {
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      },
      purchaser:"",
    }
  },
  components: {
    MessageBox
  },
  created(){
    this.purchaser=this.multiple.suplierPar;
  },
  methods:{
    Delsupplier(bol){
       if (bol) {
        this.$http.post(`${config.httpBaseUrl}/man/del_supplier/`,[this.multiple]).then(res=>{
          if(res.status==1){
                      this.$message({
                        message: res.content,
                        type: 'success'
                      })
                    this.$emit('hideDelSupplier',)
                }else{
                   this.$message({
                      message: res.content,
                      type: 'warning'
                    })
                    this.$emit('hideDelSupplier',)
                  return
                }
        })
        this.$emit('hideDelSupplier',)
      } else {
        this.$emit("hideDelSupplier")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  line-height: 30px;
  font-size: 16px;
  color: #333;
  margin: 50px 100px;
}
</style>

