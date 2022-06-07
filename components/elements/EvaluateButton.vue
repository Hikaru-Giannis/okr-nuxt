<template>
  <v-btn
    v-if="isImplementing(status)"
    class="mx-5 mb-5"
    dark
    tile
    color="success"
    :to="{ name: 'target-evaluate-id', params: { id: id }}"
  >
    <v-icon left>
      mdi-chevron-right
    </v-icon>
    評価する
  </v-btn>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    status: {
      type: Number,
      required: true
    }
  },
  methods: {
    isImplementing(status) {
      return status === this.$config.STATUS_IMPLEMENTATION
    },
  }
}
</script>

<style>

</style>
