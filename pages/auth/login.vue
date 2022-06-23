<template>
  <div>
    <SnackBar
      v-show="isError"
      :color="'red'"
      :message="errorMessage"
    />
    <h2>ログイン画面</h2>
    <form>
      <EmailInput
        ref="email"
        v-model="email"
      />
      <PasswordInput
        ref="password"
        v-model="password"
      />
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
import SnackBar from '@/components/elements/SnackBar'
import EmailInput from '@/components/elements/EmailInput'
import PasswordInput from '@/components/elements/PasswordInput'

export default {
  name: 'Login',
  components: {
    SnackBar,
    EmailInput,
    PasswordInput
  },
  data: () => ({
    email: '',
    password: '',
    isError: false,
    errorMessage: ''
  }),
  methods: {
    async login () {
      this.$refs.email.$v.$touch()
      this.$refs.password.$v.$touch()
      if (this.$refs.email.$v.$invalid || this.$refs.password.$v.$invalid) {
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
