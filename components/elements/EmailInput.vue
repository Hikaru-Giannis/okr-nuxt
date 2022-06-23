<template>
  <v-text-field
    :value="value"
    :error-messages="emailErrors"
    label="メールアドレス"
    required
    @blur="$v.value.$touch()"
    @input="$emit('input', $event)"
  ></v-text-field>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  props: {
    value: {
      type: String,
      required: true
    }
  },
  validations: {
    value: { required, email }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.value.$dirty) return errors
      !this.$v.value.email && errors.push('無効なメールアドレスです。')
      !this.$v.value.required && errors.push('メールアドレスは入力必須です。')
      return errors
    }
  }
}
</script>

<style>

</style>
