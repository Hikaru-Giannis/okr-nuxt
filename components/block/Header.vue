<template>
  <v-card
    dark
  >
    <v-app-bar
      color="blue lighten-2"
      fixed
      :clipped-left="clipped"
      app
    >
      <v-app-bar-nav-icon
        v-if="$auth.loggedIn"
        @click="drawer = true"
      />
      <v-toolbar-title>OCR</v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="$auth.loggedIn"
        color="error"
        @click="logout"
      >
        ログアウト
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      fixed
      class="blue lighten-2"
      :clipped="clipped"
      app
    >
      <v-list
        tile
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item
            to="/"
          >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ホーム</v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/target/register"
          >
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>目標設定</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    clipped: false
  }),
  methods: {
    async logout() {
      await this.$auth.logout()
      return this.$router.push('/auth/login')
    }
  }
}
</script>

<style>

</style>
