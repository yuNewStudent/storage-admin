<template>
  <message-box
    @closeMessageBox='DelCustom'
    :type='type'
    :btns='btns'>
    <p class="content">你确定要删除{{selectClient.client.purchaser}}的信息和相关资料吗?<br/>删除后系统不能回复</p>
  </message-box>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
  props: ['type', 'selectClient'],
  data () {
    return {
      btns: {
        cancel: '取消', 
        comfirm: '确定'
      }
    }
  },
  components: {
    MessageBox
  },
  methods: {
    DelCustom (bol) {
      this.$emit('hideDelCustom', bol)
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

