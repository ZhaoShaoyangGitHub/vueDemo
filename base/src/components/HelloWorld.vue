<template>
  <div class="hello">
    <h1>child: {{ msg }}</h1>
    <button @click="emit()">childTitleBtn</button>
    <h2>child: {{ subTitle }}</h2>
    <button @click="emitSubTitle">subTitle</button>
    <RequestLoading />
  </div>
</template>

<script>
import RequestLoading from "./RequestLoading";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    subTitle: String,
    childsubtitle: Function
  },
  methods: {
    emit() {
      this.$emit("update:msg", "childTitle");
    },
    emitSubTitle() {
      this.$emit("childsubtitle", "change subTitle");
    },
  },
  components: {
    RequestLoading,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
