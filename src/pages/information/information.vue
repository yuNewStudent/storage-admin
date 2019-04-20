<template>
  <div class="information">
    <div class="information_user">
      <div class="information_userl">用户信息</div>
      <div class="information_userr">
        <el-button type="primary" @click="Backbutton">返回主页面</el-button>
      </div>
    </div>
    <div class="information_switch">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人基本信息" name="first">
          <div class="information_switchp">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <div class="item_bock head_p">
                <div class="head_img">
                  <img :src="userInfo.avatar">
                </div>
                <div class="setting_right" @click.stop="uploadHeadImg">
                  <div class="caption">
                      <img src="@/assets/img/tx.png" alt="">
                  </div>
                </div>
                <input type="file" accept="image/*" @change="handleFile" class="hiddenInput">
              </div>
              <el-form-item label="登陆账户" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="所属部门" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <div class="information_switchp">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="原始密码" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
      userInfo: {
      avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg'
    },
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
      }
    };
  },
  components: {},
  methods: {
    Backbutton:function() {
        var _this = this;
      _this.$router.push('/systemsetup/personmanage');
    },
       // 打开图片上传
    uploadHeadImg: function () {
      this.$el.querySelector('.hiddenInput').click()
    },
    // 将头像显示
    handleFile: function (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.userInfo.avatar = res.result
      }
      reader.readAsDataURL(file)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang='scss' scoped>
.information {
  padding: 40px 40px;
}
.information_user {
  width: 100%;
  height: 60px;
  border-radius: 10px 10px 0px 0px;
  background-color: #ffffff;
  border-bottom: 1px solid #dedede;
}
.information_userl {
  padding: 22px 20px;
  float: left;
}
.information_userr {
  float: right;
  padding: 10px 20px;
}
.information_switch {
  width: 100%;
  background-color: #ffffff;
  position: relative;
}
.el-form-item__content {
  width: 200px;
}
.el-tab-pane {
  width: 1240px;
  height: 500px;
  position: relative;
}
.information_switchp {
  width: 400px;
  height: 400px;
  position: absolute;
  left: 0;
  top: 10;
  right: 0;
  bottom: 0;
  margin: 0 auto;
}
.item_bock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height:94px;
  width: 100px;
  border-bottom: 1px solid #f7f7f7;
  background: #fff;
  margin: 0 auto;
}
.head_p {
  height:132px;
}
.head_img{
  height: 90px;
}
.head_img img{
  width:90px;
  height:90px;
  border-radius:50px
}
.setting_right{
  display: flex;
  height: 37px;
  justify-content: flex-end;
  align-items: center;
}
.hiddenInput{
  display: none;
}
.caption {
  color: #8F8F8F;
  margin-left: -27px;
 margin-top: 67px;
  font-size: 26px;
  height: 37px;
}
</style>