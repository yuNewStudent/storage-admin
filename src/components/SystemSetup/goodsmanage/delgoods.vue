<template>
 <message-box
    @closeMessageBox='goodsdelete'
    :type='type'
    :btns='btns'>
    <p class="content">你确定要删除{{(delgood || {}).name||''}}商品及相关信息吗?<br/>删除后系统不能回复</p>
  </message-box>
  <!-- <message-box
    @closeMessageBox='$emit("hideDelGoods")'
    :type='type'
    :btns='btns'>
    <p class="content">你确定要删除这五种商品及相关信息吗?<br/>删除后系统不能回复</p>
  </message-box> -->
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type',"delgood"],
  data () {
    return {
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      },
      radio: '',
      delgoods: this.delgood || {},
      name:"",
      allgood:[],
    }
  },
  components: {
    MessageBox
  },
  created(){
    if (this.delgood) {
    }
  },
  methods: {
    goodsdelete(bol){
      // console.log(this.delgoods)
      if (bol) {
        this.$http.post(`${config.httpBaseUrl}/medicine/del_medicine/`,{
          name:this.delgood.name,
        }).then(res=>{
          if(res.status==1){
             this.$http.post(`${config.httpBaseUrl}/medicine/query_medicine/`,{
                 repertory:"",
                 goods:""
              }).then(res=>{
              if(res.status==1){
                this.allgood=res.content;
                this.$emit('hideDelGoods', this.allgood)
              }else{
                return
              }
            this.$message({
              message:"删除成功",
              type: 'warning'
            })
          })
          }else{
            this.$message({
              message:res.content,
              type: 'warning'
            })
          }
        })
        this.$emit('hideDelGoods')
      } else {
        this.$emit("hideDelGoods")
      }
    }
  },
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

