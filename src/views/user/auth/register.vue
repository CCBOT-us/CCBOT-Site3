<template>
  <div>
    <div class="h-100 bg-premium-dark bg-animation">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <b-col md="8" class="mx-auto app-login-box">
          <div class="app-logo-inverse mx-auto mb-3" />
          <div class="modal-dialog w-100">
            <div class="modal-content">
              <div class="modal-body">
                <div class="h5 modal-title">
                  <h4 class="mt-2">
                    <div>欢迎！</div>
                    <span>填写下方表单即可快速注册账号</span>
                  </h4>
                </div>
                <card ref="card"></card>
                <b-form-group id="groupInputUsername" label-for="inputUsername">
                  <b-form-input
                    id="inputUsername"
                    type="text"
                    required
                    placeholder="输入用户名"
                    v-model="modelUsername"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="groupInputEmail"
                  label-for="inputEmail"
                  description="此邮箱用于激活用户、重置密码及接收条款更新"
                >
                  <b-form-input
                    id="inputEmail"
                    type="text"
                    required
                    placeholder="输入邮箱"
                    v-model="modelEmail"
                  ></b-form-input>
                </b-form-group>
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group id="groupInputPassword" label-for="inputPassword">
                      <b-form-input
                        id="inputPassword"
                        type="password"
                        required
                        placeholder="输入密码"
                        v-model="modelPassword"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group id="groupInputPasswordR" label-for="inputPasswordR">
                      <b-form-input
                        id="inputPasswordR"
                        type="password"
                        required
                        placeholder="重复一次"
                        v-model="modelPasswordR"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <b-form-checkbox name="check" id="inputAgreeTOS" v-model="modelAgreeTOS">
                  我同意
                  <a href="/user/TOS" target="_blank">CCBOT 用户协议（草案）</a>
                </b-form-checkbox>
                <div class="divider" />
                <h6 class="mb-0">
                  已有账号？
                  <router-link to="/user/login" class="text-primary">登录</router-link>&nbsp;|&nbsp;
                  <router-link to="/user/forgotPassword" class="text-primary">找回密码</router-link>
                </h6>
              </div>
              <div class="modal-footer clearfix justify-content-center">
                <div class="float-left">
                  <b-button variant="primary" size="lg" @click="submit">创建账号</b-button>
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
  components: {
    card
  },
  data() {
    return {
      modelUsername: "",
      modelEmail: "",
      modelPassword: "",
      modelPasswordR: "",
      modelAgreeTOS: false
    };
  },
  computed: {
    ...mapState(["config"])
  },
  methods: {
    verify() {
      var addText = (this.$refs.card as HTMLFormElement).addText as Function;
      if (!this.modelUsername) {
        // 验证用户名
        addText("danger", "用户名必须填写！", 20);
        return false;
      }
      if (
        !new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$").test(
          this.modelUsername
        )
      ) {
        // 验证邮箱
        addText("danger", "邮箱无效！", 20);
        return false;
      }
      if (
        !new RegExp("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,16}$").test(
          this.modelPassword
        )
      ) {
        // 验证密码
        addText("alert", "密码必须6到16位！", 20);
        return false;
      }
      if (!this.modelAgreeTOS) {
        // 同意协议
        addText("alert", "请阅读并确认同意用户协议！", 20);
        return false;
      }
      return true;
    },
    submit() {
      if (!this.verify()) {
        return;
      }
      fetch(this.config.api_base + "auth/register.php", {
        method: "POST",
        body: JSON.stringify({
          username: this.modelUsername,
          email: this.modelEmail,
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
            this.$bvModal
              .msgBoxOk("注册成功！点击OK跳转到新界面", {
                title: "注册结果",
                size: "sm",
                buttonSize: "sm",
                okVariant: "success",
                headerClass: "p-2 border-bottom-0",
                footerClass: "p-2 border-top-0",
                centered: true
              })
              .then(value => {
                this.$router.push("/user/login");
              })
              .catch(err => {
                // An error occurred
              });
          } else {
            throw new Error("Register Fetch:" + data.msg);
          }
        })
        .catch(error => {
          ((this.$refs.card as HTMLFormElement).addText as Function)(
            "danger",
            "尝试注册时出现错误：\r\n" + error,
            20
          );
        });
    }
  }
});
</script>

<style>
</style>