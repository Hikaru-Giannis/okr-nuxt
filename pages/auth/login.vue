<template>
  <div>
    <SnackBar
      v-show="isError"
      :color="'red'"
      :message="errorMessage"
    />
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
    <v-btn
      class="mt-2"
      color="success"
      to="/auth/signup"
    >
    新規登録
    </v-btn>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import SnackBar from '@/components/common/SnackBar'

export default {
  name: 'Login',
  components: {
    SnackBar
  },
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(20)}
  },

  data: () => ({
    email: '',
    password: '',
    show: false,
    isError: false,
    errorMessage: ''
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
      const response = await this.$auth.loginWith('laravelSanctum', {
        data: loginParams
      }).catch(err => {
        return err.response
      })

      if (response.status === 401) {
        await this.clearPassword()
        this.isError = true
        this.errorMessage = 'ログインに失敗しました。'
      } else if (response.status !== 200) {
        await this.clearEmail()
        await this.clearPassword()
        this.isError = true
        this.errorMessage = '画面を更新してください。'
      }

      return this.$router.push('/')
    },
    clearPassword () {
      this.password = ""
    },
    clearEmail () {
      this.email = ""
    }
  }

}
</script>
