<template>
 <message-box
    @closeMessageBox='goodsdelete'
    :type='type'
    :btns='btns'>
    <p class="content">你确定要删除{{(delgood.row || {}).name||''}}商品及相关信息吗?<br/>删除后系统不能回复</p>
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
      allgoodx:[],
    }
  },
  components: {
    MessageBox
  },
  created(){
    console.log(this.delgood.row.name)
    // if (this.delgood) {
    //   this.delgoods
    // }
  },
  methods: {
    goodsdelete(bol){
      if (bol) {
        const loginUser = JSON.parse(this.$cookie.get('user'))
        const data = {
          login_name: loginUser.name,
          login_email: loginUser.email,
          name: this.delgood.row.name
        }
        this.$http.post(`${config.httpBaseUrl}/medicine/del_medicine/`, data).then(res=>{
          if(res.status==1){
            this.$message({
              message:res.content,
              type: 'success'
            })
            var delgoodxd=this.delgood;
            this.$emit("hideDelGoods");
          }else{
            this.$message({
              message:res.content,
              type: 'warning'
            })
          }
        })
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

