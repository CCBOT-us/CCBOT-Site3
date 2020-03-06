<template>
  <div>
    <div class="h-100 bg-premium-dark bg-animation">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <b-col md="8" class="mx-auto app-login-box">
          <div class="app-logo-inverse mx-auto mb-3" />
          <div class="modal-dialog w-100 mx-auto">
            <div class="modal-content">
              <div class="modal-body">
                <div class="h5 modal-title">
                  <h4 class="mt-2">
                    <div>欢迎回来！</div>
                    <span>在下方登录您的账户</span>
                  </h4>
                </div>
                <card ref="card"></card>
                <b-form-group id="groupInputUsername" label-for="inputUsername">
                  <b-form-input
                    id="inputUsername"
                    type="email"
                    required
                    placeholder="输入用户名/邮箱"
                    v-model="modelUsername"
                  ></b-form-input>
                </b-form-group>
                <b-form-group id="groupInputPassword" label-for="inputPassword">
                  <b-form-input
                    id="inputPassword"
                    type="password"
                    required
                    placeholder="输入密码"
                    v-model="modelPassword"
                  ></b-form-input>
                </b-form-group>
                <b-form-checkbox name="check" id="checkKeepLogin" v-model="modelKeepLogin">保持登录状态</b-form-checkbox>
                <div class="divider" />没有账户？
                <router-link to="/user/register" class="text-primary">现在注册</router-link>&nbsp;|&nbsp;
                <router-link to="/user/forgotPassword" class="text-primary">找回密码</router-link>
              </div>
              <div class="modal-footer clearfix justify-content-center">
                <div class="float-left">
                  <b-button variant="primary" size="lg" @click="submit">登录</b-button>
                </div>
                <div class="float-right">
                  <router-link to="/">
                    <b-button variant="primary" size="lg">返回首页</b-button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center text-white opacity-8 mt-3">Copyright &copy; CCBOT 2020</div>
        </b-col>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Md5 } from "ts-md5/dist/md5";
import card from "@/components/user/auth/login/card.vue";

export default Vue.extend({
  name: "LoginBoxed",
  components: {
    card
  },
  data() {
    return {
      modelUsername: "",
      modelPassword: "",
      modelKeepLogin: false
    };
  },
  computed: {
    ...mapState(["config", "user"])
  },
  methods: {
    verify() {
      if (!this.modelUsername) {
        ((this.$refs.card as HTMLFormElement).addText as Function)(
          "danger",
          "用户名必须填写！",
          20
        );
        return false;
      }
      if (!/^(.+){6,16}$/.test(this.modelPassword)) {
        ((this.$refs.card as HTMLFormElement).addText as Function)(
          "alert",
          "密码必须6到16位！",
          20
        );
        return false;
      }
      return true;
    },
    submit() {
      if (!this.verify()) {
        return;
      }
      fetch(this.config.api_base + "auth/login.php", {
        method: "POST",
        body: JSON.stringify({
          username: this.modelUsername,
          passtype: "md5",
          password: Md5.hashStr(this.modelPassword)
        }),
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        credentials: "include"
      })
        .then(data => {
          if (data.ok) {
            return data.json();
          }
          throw new Error(data.status + " | " + data.statusText);
        })
        .then(data => {
          if (data.s == 200) {
            fetch(this.config.api_base + "auth/fastapi.php", {
              credentials: "include"
            })
              .then(data => {
                if (data.ok) {
                  return data.json();
                }
                throw new Error(data.status + " | " + data.statusText);
              })
              .then(data => {
                this.user.username = data.username;
                this.user.email = data.email;
                this.user.qq = data.qq;
                this.user.iconUrl =
                  "https://q2.qlogo.cn/headimg_dl?dst_uin=" +
                  this.user.qq +
                  "&spec=100&url_enc=0&referer=bu_interface&term_type=PC";
                this.user.islogin = true;
                this.$router.push("/user/home");
                if (this.modelKeepLogin) {
                  localStorage.setItem("user", JSON.stringify(this.user));
                }
                this.$router.push("/user/home");
              })
              .catch(error => {
                throw new Error(error);
              });
          } else {
            throw new Error("Login Fetch:" + data.msg);
          }
        })
        .catch(error => {
          ((this.$refs.card as HTMLFormElement).addText as Function)(
            "danger",
            "尝试登录时出现错误：\r\n" + error,
            20
          );
        });
    }
  }
});
</script>

<style>
</style>