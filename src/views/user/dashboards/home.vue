<template>
  <div>
    <page-title
      heading="CCBOT - 用户中心"
      subheading="主页紧张测试中～可能会出现各种问题，请谅解！"
      icon="pe-7s-plane icon-gradient bg-tempting-azure"
    ></page-title>
    <div class="mb-3 card">
      <div class="card-header-tab card-header">
        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
          <i class="header-icon lnr-charts icon-gradient bg-happy-green"></i>
          用户信息
        </div>
      </div>
      <div class="no-gutters row">
        <div class="col-sm-6 col-md-4 col-xl-4">
          <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
            <div class="icon-wrapper rounded-circle">
              <div class="icon-wrapper-bg opacity-10 bg-warning"></div>
              <i class="pe-7s-cash text-white opacity-8"></i>
            </div>
            <div class="widget-chart-content">
              <div class="widget-subheading">剩余CB</div>
              <div class="widget-numbers">{{ user.cb }}</div>
              <!-- <div class="widget-description opacity-8 text-focus">
                <div class="d-inline text-danger pr-1">
                  <font-awesome-icon icon="angle-down" />
                  <span class="pl-1">54.1%</span>
                </div>less earnings
              </div>-->
            </div>
          </div>
          <div class="divider m-0 d-md-none d-sm-block"></div>
        </div>
        <div class="col-sm-6 col-md-4 col-xl-4">
          <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
            <div class="icon-wrapper rounded-circle">
              <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
              <i class="pe-7s-radio text-white"></i>
            </div>
            <div class="widget-chart-content">
              <div class="widget-subheading">Invested Dividents</div>
              <div class="widget-numbers">
                <span>9M</span>
              </div>
              <div class="widget-description opacity-8 text-focus">
                Grow Rate:
                <span class="text-info pl-1">
                  <font-awesome-icon icon="angle-down" />
                  <span class="pl-1">14.1%</span>
                </span>
              </div>
            </div>
          </div>
          <div class="divider m-0 d-md-none d-sm-block"></div>
        </div>
        <div class="col-sm-12 col-md-4 col-xl-4">
          <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
            <div class="icon-wrapper rounded-circle">
              <div class="icon-wrapper-bg opacity-9 bg-success"></div>
              <i class="pe-7s-musiclist text-white"></i>
            </div>
            <div class="widget-chart-content">
              <div class="widget-subheading">Capital Gains</div>
              <div class="widget-numbers text-success">
                <span>$563</span>
              </div>
              <div class="widget-description text-focus">
                Increased by
                <span class="text-warning pl-1">
                  <font-awesome-icon icon="angle-up" />
                  <span class="pl-1">7.35%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import PageTitle from "@/components/user/base/PageTitle.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faCheck,
  faCalendarAlt,
  faAngleDown,
  faAngleUp,
  faTh
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faTrashAlt, faCheck, faAngleDown, faAngleUp, faTh, faCalendarAlt);

export default Vue.extend({
  components: {
    PageTitle,
    "font-awesome-icon": FontAwesomeIcon
  },
  computed: {
    ...mapState(["user"])
  }
});
</script>

<style>
</style>