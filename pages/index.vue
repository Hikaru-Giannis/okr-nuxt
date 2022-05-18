<template>
  <div>
    <div
      v-if="targetList.length > 0"
    >
      <v-card
        v-for="target in targetList"
        :key="target.id"
        elevation="2"
        class="mb-3"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="mt-3 mb-3 text-h5"
            >
            {{ target.contents }}
            </v-list-item-title>
            <div class="text-subtitle-1 mb-2">
              成果目標
            </div>
            <ul
              v-for="indicator in target.indicators"
              :key="indicator.id"
              class="mb-2 text-subtitle-2"
            >
              <li>{{ indicator.contents }}</li>
            </ul>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
    <div
      v-else
    >
      <v-card
        elevation="2"
        class="mb-3"
      >
      <v-card-text>目標が登録されておりません。目標を登録しましょう！！</v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $axios, $config, error }) {
    const response = await $axios.$get($config.API_BASE_URL + '/api/target/index', { withCredentials: true })
      .catch(err => {
        return err.response
      })

    // TODO エラー処理要検討
    if (response.data.status !== 200) {
      return error(401);
    }

    const targetList = response.data.targets
    return { targetList }
  }
}
</script>
