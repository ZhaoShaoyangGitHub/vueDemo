<template>
  <div class="about">
    <h1 class="top" ref="title">{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      title: ''
    }
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.title = 'This is an about page'
      this.addClass(this.$refs.title, 'show')
    }
  }
}
</script>

<style lang="scss" scoped>
  .show {
    font-size: 50px;
  }
</style>
