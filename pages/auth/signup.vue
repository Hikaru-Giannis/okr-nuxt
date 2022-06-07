<template>
  <div>
    <SnackBar
      v-show="isError"
      :color="'red'"
      :message="errorMessage"
    />
    <h2>新規登録画面</h2>
    <form>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        label="ユーザー名"
        required
        counter
        @input="$v.name.$touch()"
      ></v-text-field>
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
        @input="$v.password.$touch()"
      ></v-text-field>
      <v-btn
        class="mr-4 mt-4"
        @click="signup"
      >
        新規登録
      </v-btn>
    </form>
    <v-btn
      class="mt-2"
      color="success"
      to="/auth/login"
    >
    ログイン
    </v-btn>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import SnackBar from '@/components/elements/SnackBar'

export default {
  name: 'SignUp',
  components: {
    SnackBar
  },
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(20)}
  },

  data: () => ({
    name: '',
    email: '',
    password: '',
    show: false,
    isError: false,
    errorMessage: ''
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('ユーザー名は最大10文字以内で入力してください。')
      !this.$v.name.required && errors.push('ユーザー名は入力必須です。')
      return errors
    },
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
      !this.$v.password.minLength && errors.push('パスワードは最低8文字以内で入力してください。')
      !this.$v.password.maxLength && errors.push('パスワードは最大20文字以内で入力してください。')
      !this.$v.password.required && errors.push('パスワードは入力必須です。')
      return errors
    }
  },

  methods: {
    async signup () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }

      const signupParams = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      let signupResponse = null;
      await this.$axios.$get(this.$config.API_BASE_URL + '/sanctum/csrf-cookie', { withCredentials: true })
        .then(async (res) => {
          signupResponse = await this.$axios.$post(this.$config.API_BASE_URL + '/api/user', signupParams, { withCredentials: true })
        })
        .catch(err => {
          return err.response
        })

      if (signupResponse.status !== 200) {
        await this.clearEmail()
        await this.clearPassword()
        this.isError = true
        this.errorMessage = '画面を更新してください。'
        return
      }

      const loginParams = {
        email: this.email,
        password: this.password
      }

      const loginResponse = await this.$auth.loginWith('laravelSanctum', {
        data: loginParams
      })
      .catch(err => {
        return err.response
      })

      if (loginResponse.status === 401) {
        await this.clearPassword()
        this.isError = true
        this.errorMessage = 'ログインに失敗しました。'
        return
      } else if (loginResponse.status !== 200) {
        await this.clearEmail()
        await this.clearPassword()
        this.isError = true
        this.errorMessage = '画面を更新してください。'
        return
      }

      return this.$router.push('/')

    },
    clearPassword () {
      this.password = ""
    },
    clearEmail () {
      this.email = ""
    },
    clearName () {
      this.name = ""
    }
  }

}
</script>
