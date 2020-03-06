<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </component>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    layout(): string {
      return (this.$route.meta.layout || "default") + "_layout";
    }
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    var store = sessionStorage.getItem("store");
    if (store) {
      this.$store.replaceState(
        Object.assign({}, this.$store.state, JSON.parse(store))
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });

    this.refresh(); // 刷新数据
  },
  watch: {
    $route: "refresh" // 当导航变动时刷新数据
  },
  methods: {
    refresh() {
      /* 刷新CB */
      if ((this.$store.state as CStore).user.islogin) {
        const time = new Date().getTime();
        /* 验证间隔时间 */
        const lastTimeStr = localStorage.getItem("lastCBTime");
        if (lastTimeStr) {
          const lastTime = parseInt(lastTimeStr);
          if (time < lastTime + 15 * 1000) {
            return;
          }
        }
        localStorage.setItem("lastCBTime", time.toString());
        fetch(
          (this.$store.state as CStore).config.api_base + "auth/getCB.php",
          {
            credentials: "include"
          }
        )
          .then(data => {
            if (data.ok) {
              return data.json();
            }
            throw new Error(data.status + " | " + data.statusText);
          })
          .then(data => {
            if (data.s == 200) {
              (this.$store.state as CStore).user.cb = data.cb;
            } else {
              throw new Error("Can't get CB: " + JSON.stringify(data));
            }
          })
          .catch(error => {
            throw new Error(error);
          });
      }
    }
  }
});
</script>

<style lang="scss">
</style>
