<template>
  <div class="app-container app-theme-white">
    <transition name="fade" mode="out-in" appear>
      <Header />
    </transition>
    <transition name="fade" mode="out-in" appear>
      <Sidebar />
    </transition>
    <div class="app-main__outer">
      <div class="app-main__inner">
        <slot></slot>
      </div>
      <transition name="fade" mode="out-in" appear>
        <Footer />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import Header from "./components/header.vue";
import Sidebar from "./components/sidebar.vue";
import Footer from "./components/footer.vue";

export default Vue.extend({
  name: "app",
  components: {
    Header,
    Sidebar,
    Footer
  },
  methods: {}
});
</script>

<style lang="scss">
@import "@/assets/ArchitectUI/base.scss";
</style>