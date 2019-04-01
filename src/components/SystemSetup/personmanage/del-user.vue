<template>
  <message-box
    @closeMessageBox='$emit("hideDelPerson")'
    :type='type'
    :btns='btns'>
    <p class="content">你确定要删除张三的相关信息吗?<br/>删除后系统不能回复</p>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type'],
  data () {
    return {
      departmentData: [
        {
          部门编号: 1,
          部门名称: '行政部'
        },{
          部门编号: 2,
          部门名称: '财务部'
        },{
          部门编号: 3,
          部门名称: '设计部'
        }
      ],
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      },
      radio: ''
    }
  },
  components: {
    MessageBox
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

