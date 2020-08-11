<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld
      :msg.sync="title"
      :subTitle="subTitle"
      @childSubTitle="emitSubTitle"
    />
    <h2>{{ title }}</h2>
    <h3>{{ subTitle }}</h3>
    <hr />
    <h3>Store</h3>
    <button>store-commit</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import user from "@/api/user.js";

export default {
  name: "home",
  metaInfo: {
    meta: [
      {
        name: "keywords",
        content: "首页",
      },
      {
        name: "discription",
        content: "测试",
      },
    ],
  },
  data() {
    return {
      title: "Welcome to Your Vue.js App",
      subTitle: "subIitle",
    };
  },
  components: {
    HelloWorld,
  },
  created() {
    user
      .banner()
      .then((res) => {
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  },
  methods: {
    emitSubTitle(value) {
      this.subTitle = value;
    },
  },
};
</script>
