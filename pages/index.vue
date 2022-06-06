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
            <div
              class="d-flex justify-start"
            >
              <div>
                <v-list-item-title
                  class="my-3 text-h5"
                >
                {{ target.contents }}
                </v-list-item-title>
              </div>
              <v-chip
                class="ma-2"
                :color="getTargetStatusColor(target.status)"
              >
                {{ getTargetStatusText(target.status) }}
              </v-chip>
            </div>

            <p
              class="d-flex justify-center text-h2 mx-5 green--text font-weight-medium"
            >
              {{ target.total_score.toFixed(2) }}
            </p>

            <div class="text-subtitle-1 mb-2">
              期限日 : {{ $dateFns.format(new Date(target.expiration_date), 'yyyy-MM-dd') }}まで
            </div>
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
        <v-btn
          :disabled="!isImplementing(target.status)"
          class="mx-5 mb-5"
          dark
          tile
          color="success"
          :to="{ name: 'target-evaluate-id', params: { id: target.id }}"
        >
          <v-icon left>
            mdi-chevron-right
          </v-icon>
          評価する
        </v-btn>
      </v-card>
      <v-btn
        class="mx-5 my-5"
        dark
        tile
        color="success"
        to="/target/register"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        新規登録
      </v-btn>
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
  },
  data () {
    return {
      targetStatusColor: ''
    }
  },
  methods: {
    isCompleted(status) {
      return status === this.$config.STATUS_COMPLETION
    },
    isImplementing(status) {
      return status === this.$config.STATUS_IMPLEMENTATION
    },
    getTargetStatusColor(status) {
      if (this.isCompleted(status)) {
        return 'success'
      }

      return 'primary'
    },
    getTargetStatusText(status) {
      if (this.isCompleted(status)) {
        return '完了'
      }

      return '実行中'
    },
  }
}
</script>
