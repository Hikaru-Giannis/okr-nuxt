<template>
  <v-btn
    class="mx-5 my-5 orange darken-3 white--text"
    @click="completeEvaluate"
  >
  OCRを終了する
  </v-btn>
</template>

<script>
export default {
  methods: {
    completeEvaluate() {
      this.$emit('complete-evaluate')
    }
  }
}
</script>

<style>

</style>
