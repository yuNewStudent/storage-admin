<template>
  <div class="forget">
    <div class="forgetl">
      <div class="forget_w">
        <p>Wellcome</p>
      </div>
      <!-- <img src="@/assets/img/logot.png" alt=""> -->
      <div class="forget_h">
        <div class="forget_hl">
          <h1>忘记密码</h1>
        </div>
        <div class="forget_hd">
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item prop="account">
              <el-input
                class="userName"
                style="cursor:pointer"
                :maxlength="11"
                v-model="ruleForm2.account"
                type="text"
                size="middle"
                auto-complete="off"
                placeholder="请输入邮箱"
              ><template slot="prepend">
                  <img src="@/assets/img/icon_user.png" alt>
                </template>
                <template style="cursor:pointer" slot="append">
                    <span>发送邮箱</span>
                 </template> 
                </el-input>
            </el-form-item>
             <el-form-item prop="password">
              <el-input
                class="password"
                :maxlength="20"
                v-model="ruleForm2.password"
                type="password"
                placeholder="请输入验证码"
              >
              </el-input>
            </el-form-item>
              <el-form-item>
              <el-input 
                type="password" v-model="ruleForm2.pass" auto-complete="off"
                 placeholder="请输入密码"
              >
                <template slot="prepend">
                  <img src="@/assets/img/icon_password.png" alt>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item  prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请输入确认密码" auto-complete="off">
                <template slot="prepend">
                  <img src="@/assets/img/icon_password.png" alt>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-form>
            <el-form-item style="width:80%;">
              <el-button
                type="primary"
                style="width:100%;"
                @click="submitForm('form')"
                :loading="logining"
              > 确认</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="reg" @click="login">
          <span>直接登陆</span>
        </div>
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
        pass: "",
        checkPass: "",
        age: ""
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
     _this.$router.push('/systemsetup/personmanage');
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     	_this.$router.push('/register');
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login() {
      var _this = this;
      _this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.forget {
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
.forgetl {
  width: 400px;
  /* background-color: #FFFFFF; */
  float: right;
  margin-right: 113px;
  margin-top: 150px;
}
.forget_w {
  width: 400px;
  height: 30px;
  background: url("../assets/img/logot.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
}
.forget_h {
  width: 100%;
  height: 450px;
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 0px 0px 4px 4px;
}
.forget_w p {
  font-size: 20px;
  color: #4499f2;
  margin-top: 15px;
  margin-left: 40px;
}
.forget_hl {
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
.forget_hd {
  width: 400px;
  margin: 0 auto;
  margin-top: 10px;
}
.el-input__inner {
  width: 100%;
}
.forget_hd .demo-ruleForm {
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
.footer{
  width: 100%;
  position: fixed;  
  bottom: 30px;
  font-size: 16px;
  color: #FFFFFF;
  text-align: center;
}
.el-input-group__append{
    background: #4499f2;
    color: #FFFFFF;
}
.el-input-group__prepend img {
  width: 20px;
  height: 20px;
}
</style>