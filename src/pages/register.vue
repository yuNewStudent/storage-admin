<template>
  <div class="register">
    <div class="registerl">
      <div class="register_w">
        <p>Wellcome</p>
      </div>
      <!-- <img src="@/assets/img/logot.png" alt=""> -->
      <div class="register_h">
        <div class="register_hl">
          <h1>注册</h1>
        </div>
        <div class="register_hd">
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- <el-form-item prop="pass">
              <el-input class="userName" type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  prop="checkPass">
              <el-input class="password" type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
            </el-form-item>-->
            <el-form-item>
              <el-input
                class="userName"
                v-model="ruleForm2.account"
                type="text"
                size="middle"
                placeholder="请输入手机号码"
              >
                <template slot="prepend">
                  <img src="@/assets/img/icon_user.png" alt>
                </template>
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
        <div class="next">
          <el-radio v-model="radio" label="1">管理员</el-radio>
          <el-radio v-model="radio" label="2">非管理员</el-radio>
        </div>
        <div>
          <el-form>
            <el-form-item style="width:80%;">
              <el-button
                type="primary"
                style="width:100%;"
                @click="submitForm('form')"
                :loading="logining"
              >注册</el-button>
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
      radio:1,
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
    },
    login() {
      var _this = this;
      _this.$router.push("/login");
    }
  }
};
</script>
<style lang='scss' scoped>
.register {
  width: 100%;
  height: 100%;
  background: url("../assets/img/bg.png") no-repeat;

  /* 背景图垂直、水平均居中 */
  background-position: center center;

  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;

  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  .el-input {
    margin-left: -50px;
  }
}
.registerl {
  width: 400px;
  /* background-color: #FFFFFF; */
  float: right;
  margin-right: 113px;
  margin-top: 150px;
}
.register_w {
  width: 400px;
  height: 30px;
  background: url("../assets/img/logot.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
}
.register_h {
  width: 100%;
  height: 450px;
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 0px 0px 4px 4px;
}
.register_w p {
  font-size: 20px;
  color: #4499f2;
  margin-top: 15px;
  margin-left: 40px;
}
.register_hl {
  padding-top: 50px;
  text-align: center;
  font-size: 22px;
  color: #4499f2;
}
.el-button {
  margin-left: 40px;
}
.register_hd {
  width: 400px;
  margin: 0 auto;
  margin-top: 10px;
}
.el-input__inner {
  width: 100%;
}
.register_hd .demo-ruleForm {
  width: 100%;
  margin: 0 auto;
}
/* .userName .el-input__inner template {
  background: url(../assets/img/icon_user.png) no-repeat 3% 10%;
} */
/* .password .el-input__inner template {
  background: url(../assets/img/icon_password.png) no-repeat 3% 10%;
} */
.next {
  width: 70%;
  height: 50px;
  margin: 0 auto;
}
.reg {
  width: 100%;
  text-align: center;
  cursor: pointer;
}
/* .system{
 width: 100%;
 text-align: center;
} */
.system {
  width: 500px;
  height: 500px;
  float: left;
  margin-left: 265px;
  margin-top: 160px;
}
.system_t {
  text-align: center;
  margin-left: 20px;
}
.system_x {
  width: 100%;
  height: 20px;
  margin-top: 150px;
}
.system_xl {
  float: left;
}
.system_xr {
  float: right;
}
.system_n {
  text-align: center;
  font-size: 30px;
  color: #ffffff;
  margin-top: 30px;
}
.system_l {
  width: 75%;
  background-color: #4499f2;
  margin: 0 auto;
  margin-top: 130px;
}
.system_ll {
  float: left;
}
.system_lr {
  float: right;
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 30px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
}
.el-input-group__prepend img {
  width: 20px;
  height: 20px;
}
</style>
