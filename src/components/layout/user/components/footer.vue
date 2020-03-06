<template>
  <div class="app-footer">
    <div class="app-footer__inner text-center">
      Copyright &copy; CCBOT 2020
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
