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
    <!-- Modal Component -->
    <b-modal id="modal1" title="Bootstrap-Vue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
    <b-modal id="modallg" size="lg" title="Large Modal">Hello Modal!</b-modal>
    <b-modal id="modalsm" size="sm" title="Small Modal">Hello Modal!</b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
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