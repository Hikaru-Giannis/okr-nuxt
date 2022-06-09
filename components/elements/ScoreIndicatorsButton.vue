<template>
  <v-btn
    class="mx-5 my-5"
    color="primary"
    @click="scoreIndicators"
  >
  OCRを続ける
  </v-btn>
</template>

<script>
export default {
  methods: {
    scoreIndicators() {
      this.$emit('score-indicators')
    }
  }
}
</script>

<style>

</style>
