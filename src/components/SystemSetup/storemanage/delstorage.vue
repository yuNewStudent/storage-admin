<template>
  <message-box
    @closeMessageBox='buttondel'
    :type='type'
    :btns='btns'>
    <p class="content">你确定要删除{{this.starge_rack}}仓库吗?<br/>删除后系统不能回复</p>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type',"Deltor"],
  data () {
    return {
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      },
      starge_rack:"",

    }
  },
  components: {
    MessageBox
  },
  mounted(){
    this.starge_rack=this.Deltor.starge_rack;
  },
  methods:{
     buttondel(bol){
         if(bol){
           if(this.Deltor){
            this.$http.post(`${config.httpBaseUrl}/storage/del_repertory/`,{
              starge_rack:this.starge_rack

            }).then(res=>{
            if(res.status==1){
                      this.$message({
                        message: res.content,
                        type: 'success'
                      })
                    this.$emit("hideDelStorage");
                }else{
                   this.$message({
                      message: res.content,
                      type: 'warning'
                    })
                    this.$emit("hideDelStorage");
                  return
                }
            })
            }else{
              return
              this.$emit("hideDelStorage");
            }
          } else {
            this.$emit("hideDelStorage")
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

