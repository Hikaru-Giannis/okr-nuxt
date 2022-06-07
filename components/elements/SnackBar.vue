<template>
  <v-snackbar
    :value="true"
    tile
    top
    timeout="-1"
    :color="color"
    class="snack-bar"
  >
  {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  props: {
    message: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .snack-bar {
    position: fixed;
    top: 15px;
  }
</style>
