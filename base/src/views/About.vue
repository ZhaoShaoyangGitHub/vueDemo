<template>
  <div class="about">
    <h1 class="top" ref="title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "",
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "关于"
      },
      {
        name: "discription",
        content: "我们"
      }
    ]
  },
  data() {
    return {
      title: ""
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.title = "This is an about page";
      this.addClass(this.$refs.title, "show");
    }
  }
};
</script>

<style lang="scss" scoped>
.show {
  font-size: 50px;
}
</style>
