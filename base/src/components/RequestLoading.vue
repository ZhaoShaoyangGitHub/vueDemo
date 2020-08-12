<template>
  <transition name="fade-transform" mode="out-in">
    <div class="request-loading-component" v-if="requestLoading">
      <svg-icon icon-class="loading" />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "requestLoading",
  computed: {
    ...mapGetters(["requestLoading"]),
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@keyframes turnAround {
  from {
    transform: none;
  }
  to {
    transform: rotate(360deg);
  }
}
.request-loading-component {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(48, 65, 86, 0.2);
  font-size: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  .svg-icon {
    animation: turnAround 1s linear infinite;
  }
}
</style>
