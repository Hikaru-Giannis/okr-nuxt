<template>
   <v-text-field
      :value="value"
      :error-messages="passwordErrors"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      label="パスワード"
      required
      counter
      @click:append="show = !show"
      @blur="$v.value.$touch()"
      @input="$emit('input', $event)"
    ></v-text-field>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  props: {
    value: {
      type: String,
      required: true
    }
  },
  validations: {
    value: { required, minLength: minLength(8), maxLength: maxLength(20)}
  },
  data: () => ({
    show: false,
  }),
  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.value.$dirty) return errors
      !this.$v.value.minLength && errors.push('パスワードは最低8文字以内で入力してください。')
      !this.$v.value.maxLength && errors.push('パスワードは最大20文字以内で入力してください。')
      !this.$v.value.required && errors.push('パスワードは入力必須です。')
      return errors
    }
  }
}
</script>

<style>

</style>
