<template>
  <div>
    <div v-for="(item,index) in texts" :key="index">
      <div :class="'card-border mb-3 card card-body border-'+item.type">
        <h5 class="card-title">{{ title(item.type) }}</h5>
        {{ item.text }}&nbsp;
        <a
          data-toggle="tooltip"
          title="Click to cancel"
          @click="clear(index)"
          v-if="item.timeout&&item.timeout!=0"
        >({{ item.timeout }}s)</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
interface components {
  title: Function;
}
export default Vue.extend({
  name: "card",
  props: {
    type: String,
    text: String
  },
  data() {
    var data: {
      texts: {
        type: string;
        text: string;
        timeout: number;
        time: number;
      }[];
      interval: number;
    } = {
      texts: [],
      interval: 0
    };
    return data;
  },
  created() {
    this.interval = setInterval(this.checkTime, 100);
  },
  destroyed() {
    if (this.interval) clearInterval(this.interval);
  },
  methods: {
    title(_type: string): string {
      const typeList: { [key: string]: string } = {
        warning: "警告！",
        danger: "错误！"
      };
      return _type in typeList ? typeList[_type] : _type;
    },
    addText(type: string, text: string, timeout = 0) {
      if (timeout != 0) {
        this.texts.push({
          type: type,
          text: text,
          timeout: timeout,
          time: 0
        });
      } else {
        this.texts.push({
          type: type,
          text: text,
          timeout: 0,
          time: 0
        });
      }
    },
    checkTime() {
      this.texts.forEach((element, index) => {
        element.time++;
        element.timeout = (element.timeout * 10 - 1) / 10;
        if (element.time >= element.timeout * 10) {
          this.clear(index);
        }
      });
    },
    clear(id: number) {
      this.$delete(this.texts, id);
    }
  }
});
</script>

<style>
</style>