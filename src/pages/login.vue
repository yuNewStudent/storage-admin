<template>
  <div class="login">
    <div class="logonl">
      <div class="logon_w">
        <p>Wellcome</p>
      </div>
      <!-- <img src="@/assets/img/logot.png" alt=""> -->
      <div class="logon_h">
        <div class="logon_hl">
          <h1>欢迎登陆</h1>
        </div>
        <div class="logon_hd">
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                class="userName"
                v-model="ruleForm2.username"
                type=""
                size="email"
                auto-complete="off"
                placeholder="请输入邮箱"
              ><template slot="prepend">
                  <img src="@/assets/img/icon_user.png" alt>
                </template></el-input>
            </el-form-item>
            <el-form-item prop="passwd">
              <el-input
                class="password"
                :maxlength="20"
                v-model="ruleForm2.passwd"
                type="password"
                placeholder="输入密码"
              > <template slot="prepend">
                  <img src="@/assets/img/icon_password.png" alt>
                </template></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="next">
          <div style="float:left;width:50%;color:#aaaaaa;">
            <p>
              <input type="checkbox" name="vehicle" value="Bike">记住密码
            </p>
          </div>
          <div style="float:right;width:50%;color: #4499f2;cursor:pointer">
            <p style=" text-align: right;" type="text" @click="forget">忘记密码？</p>
          </div>
        </div>
        <div>
          <el-form>
            <el-form-item style="width:80%;">
              <el-button
                type="primary"
                style="width:100%;"
                @click="submitForm('form')"
                :loading="logining"
              >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- <div class="reg" @click="reg">
          <span>立即注册</span>
        </div> -->
      </div>
    </div>
    <div class="footer">
      <p>2019 © 成都棋照科技有限公司 版权所有</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        username: "",
        passwd: "",
      },
      logining: false,
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
    var _this=this;
     this.$http.post(`${config.httpBaseUrl}/man/login/`,{
          username:this.ruleForm2.username,
          passwd:this.ruleForm2.passwd,
        }).then(res=>{
          if(res.status==1){
             _this.$router.push('/systemsetup/personmanage');
             this.$message({
              showClose: true,
              message:"恭喜你登陆成功",
              type: 'success'
            });
            this.$cookie.set('user',JSON.stringify(res.content));
          }else{
             this.$message({
              showClose: true,
              message: res.content,
              type: 'error'
            });
             return

          }
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    reg(){
      	var _this = this;
					_this.$router.push('/register');
    },
    //忘记密码
    forget(){
      var _this=this;
      _this.$router.push('/forget');
    }
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/img/bg.png") no-repeat;

  /* 背景图垂直、水平均居中 */
  background-position: center center;

  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;

  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
}
.logonl {
  width: 400px;
  /* background-color: #FFFFFF; */
  float: right;
  margin-right: 113px;
  margin-top: 150px;
}
.logon_w {
  width: 400px;
  height: 30px;
  background: url("../assets/img/logot.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
}
.logon_h {
  width: 100%;
  height: 400px;
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 0px 0px 4px 4px;
}
.logon_w p {
  font-size: 20px;
  color: #4499f2;
  margin-top: 15px;
  margin-left: 40px;
}
.logon_hl {
  padding-top: 50px;
  text-align: center;
  font-size: 22px;
  color: #4499f2;
}
.el-input {
  margin-left: -50px;
}
.el-button {
  margin-left: 40px;
}
.logon_hd {
  width: 400px;
  margin: 0 auto;
  margin-top: 10px;
}
.el-input__inner {
  width: 100%;
}
.logon_hd .demo-ruleForm {
  width: 100%;
  margin: 0 auto;
}
.next {
  width: 75%;
  height: 50px;
  margin: 0 auto;
  font-size: 12px;
}
.reg{
  width: 100%;
  text-align: center;
   cursor:pointer;
}
/* .system{
 width: 100%;
 text-align: center;
} */
.system{
  width: 500px;
  height: 500px;
  float: left;
  margin-left: 265px;
  margin-top: 160px;
}
.system_t{
  text-align: center;
  margin-left: 20px;
}
.system_x{
  width: 100%;
  height: 20px;
  margin-top: 150px;
}
.system_xl{
  float: left;
}
.system_xr{
  float: right;
}
.system_n{
  text-align: center;
  font-size: 30px;
  color: #FFFFFF;
  margin-top: 30px;
}
.system_l{
  width:75%;
  background-color: #4499f2;
  margin: 0 auto;
  margin-top: 130px;
}
.system_ll{
  float: left;
}
.system_lr{
  float: right;
}
.footer{
  width: 100%;
  position: fixed;  
  bottom: 60px;
  font-size: 16px;
  color: #FFFFFF;
  text-align: center;
}
.el-input-group__prepend img {
  width: 20px;
  height: 20px;
}
</style>
