<template>
  <div class="app_header">
    <div class="project_info">
      <span class="project_name">仓库管理系统</span>
    </div>
    <div class="header_right">
      <img src="@/assets/img/userImg.png" alt="">
      <span class="user_name">hahah</span>
      <span class="dividing_line"></span>
      <span class="user_role">系统管理员</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.app_header {
  background: #0b223a;
  height: 60px;
  line-height: 60px;
  padding: 0 30px;
  color: white;
  .project_info {
    font-size: 20px;
    float: left;
  }
  .header_right {
    float: right;
    line-height: 60px;
    height: 60px;
    font-size: 14px;
    img {
      width: 65px;
      height: 60px;
      border-radius: 50%;
      vertical-align: top;
    }
    .user_role {
      color: rgb(181,181,181);
      font-size: 13px;
    }
  }
}
</style>

