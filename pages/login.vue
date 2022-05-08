<template>
  <div>
    <h2>ログイン画面</h2>
    <form>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="メールアドレス"
        required
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        label="パスワード"
        required
        counter
        @click:append="show = !show"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-btn
        class="mr-4 mt-4"
        @click="login"
      >
        ログイン
      </v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(20)}
  },

  data: () => ({
    email: '',
    password: '',
    show: false
  }),

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('無効なメールアドレスです。')
      !this.$v.email.required && errors.push('メールアドレスは入力必須です。')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.maxLength && errors.push('ユーザー名は最大20文字以内で入力してください。')
      !this.$v.password.maxLength && errors.push('ユーザー名は最低8文字以内で入力してください。')
      !this.$v.password.required && errors.push('パスワードは入力必須です。')
      return errors
    }
  },

  methods: {
    async login () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }

      const loginParams = {
        email: this.email,
        password: this.password
      }
      await this.$axios.$get(this.$config.API_BASE_URL + '/sanctum/csrf-cookie', { withCredentials: true })
        .then((res) => {
          const response = this.$axios.$post(this.$config.API_BASE_URL + '/login', loginParams, { withCredentials: true })
          console.log(response)
        })

    }
  }

}
</script>
