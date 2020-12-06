<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld
      :msg.sync="title"
      :subTitle="subTitle"
      @childsubtitle="emitSubTitle"
    />
    <h2 v-role="color">{{ title}}</h2>
    <h3>{{ subTitle }}</h3>
    <hr />
    <h3>Store</h3>
    <button>store-commit</button>
    <h3>Watch</h3>
    <button @click="add">增加222</button><div>{{numerber1 | capitalize }}</div>
    <button @click="subtraction">减少</button><div>{{numerber2}}</div>
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
        content: "首页"
      },
      {
        name: "discription",
        content: "测试"
      }
    ]
  },

  data() {
    return {
      title: "Welcome to Your Vue.js App",
      subTitle: "subIitle",
      numerber1: 1,
      numerber2: 2,
      color: "#eeeeee"
    };
  },

  components: {
    HelloWorld
  },
  created() {
    let unwatchFn = this.$watch(
      "numerber2",
      function(newVal, oldVal) {
        console.log("count 新值：" + newVal);
        console.log("count 旧值：" + oldVal);
        unwatchFn && unwatchFn();
      },
      {
        immediate: true
      }
    );
    user
      .banner()
      .then(res => {})
      .then(err => {});
  },
  mounted() {},
  destory() {
    // this.unWatch();
  },
  methods: {
    emitSubTitle(value) {
      this.subTitle = value;
    },
    add() {
      this.numerber1++;
    },
    subtraction() {
      this.numerber2 = this.$options.filters.capitalize(this.numerber2--);
    }
  },
  watch: {
    numerber1(newVal, oldVal) {
      console.log(newVal, oldVal);
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return `${value}filter`;
    }
  }
};
</script>
