<template>
  <div class="app-footer">
    <div class="app-footer__inner text-center">
      Copyright&nbsp;&copy;&nbsp;2019&nbsp;CCBOT.us
      <br />Theme&nbsp;From&nbsp;DashboardPack.com
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

library.add(faEllipsisV);
export default {
  name: "Footer",
  components: {}
};
</script>
