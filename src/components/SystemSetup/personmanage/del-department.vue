<template>
  <message-box
    @closeMessageBox='delPerson'
    :type='type'
    :btns='btns'>
    <p class="content">你确定要删除张三的相关信息吗?<br/>删除后系统不能回复</p>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type', 'selectUser'],
  data () {
    return {
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      },
      radio: ''
    }
  },
  methods: {
    delPerson (bol) {
      this.$emit("hideDelPerson", bol)
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
