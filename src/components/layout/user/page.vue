<template>
  <div class="app-container app-theme-white">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "app",
  components: {},
  methods: {}
});
</script>


<style lang="scss">
@import "@/assets/ArchitectUI/base.scss";
</style>