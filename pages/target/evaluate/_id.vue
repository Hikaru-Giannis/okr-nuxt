<template>
  <div>
    <SnackBar
      v-show="isError"
      :color="'red'"
      :message="errorMessage"
    />
    <v-card>
      <v-card-title class="font-weight-bold ml-3 mt-3">
        {{ target.contents }}
      </v-card-title>
      <p
        class="d-flex justify-center text-h2 mx-5 green--text font-weight-medium"
      >
        {{ totalScore }}
      </p>
      <v-simple-table
        class="mx-5"
      >
        <template
          #default
        >
          <thead>
            <tr>
              <th
                class="text-subtitle-1 font-weight-bold text-left"
              >
                成果目標
              </th>
              <th
                class="text-subtitle-1 font-weight-bold text-left"
              >
                スコア
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(indicator, index) in target.indicators"
              :key="indicator.id"
            >
              <td>
                {{ indicator.contents }}
              </td>
              <td>
                <v-slider
                  v-model="target.indicators[index].score"
                  class="align-center"
                  :max="max"
                  :min="min"
                  step="0.1"
                  ticks="always"
                  hide-details
                >
                  <template #append>
                    <v-text-field
                      v-model="target.indicators[index].score"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      step="0.1"
                      style="width: 60px"
                    ></v-text-field>
                  </template>
              </v-slider>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn
        class="mx-5 my-5"
        color="primary"
        @click="scoreIndicators"
      >
      OCRを続ける
      </v-btn>
      <v-btn
        class="mx-5 my-5 orange darken-3 white--text"
        @click="completeEvaluate"
      >
      OCRを終了する
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import SnackBar from '@/components/elements/SnackBar'

export default {
  name: 'EvaluatePage',
  components: {
    SnackBar
  },
  async asyncData({ params, $axios, $config }) {
    const response = await $axios.$get($config.API_BASE_URL + '/api/target/',
      {
        params: {
          target_id: params.id
        },
        withCredentials: true
      }
    )
    .catch(err => {
      return err.response
    })

    const target = response.data.target

    return {
      target
    }
  },
  data() {
    return {
      min: 0,
      max: 1,
      step: 0.1,
      isError: false,
      errorMessage: ''
    }
  },
  computed: {
    totalScore() {
      const totalScore = this.target.indicators.reduce(function (accumlator, current) {
        return accumlator + Number(current.score)
      }, 0)
      return totalScore.toFixed(2)
    }
  },
  methods: {
    async scoreIndicators() {
      const indicators = this.target.indicators
      const indicatorsForm = []
      for (const indicator of indicators) {
        indicatorsForm.push({
          indicator_id: indicator.id,
          score: indicator.score
        })
      }

      const response = await this.$axios.$get(this.$config.API_BASE_URL + '/sanctum/csrf-cookie', { withCredentials: true })
        .then(async () => {
          return await this.$axios.$post(
            this.$config.API_BASE_URL + '/api/target/score',
            {
              target_id: this.target.id,
              indicators: indicatorsForm
            },
            {
              withCredentials: true
            }
          )
        })
        .catch(err => {
          return err.response
        })

      if (response.status !== 200) {
        this.isError = true
        this.errorMessage = "評価に失敗しました。"
        return
      }

      return this.$router.push('/')
    },
    async completeEvaluate() {
      const indicators = this.target.indicators
      const indicatorsForm = []
      for (const indicator of indicators) {
        indicatorsForm.push({
          indicator_id: indicator.id,
          score: indicator.score
        })
      }

      const response = await this.$axios.$get(this.$config.API_BASE_URL + '/sanctum/csrf-cookie', { withCredentials: true })
        .then(async () => {
          return await this.$axios.$post(
            this.$config.API_BASE_URL + '/api/target/complete',
            {
              target_id: this.target.id,
              indicators: indicatorsForm
            },
            {
              withCredentials: true
            }
          )
        })
        .catch(err => {
          return err.response
        })

      if (response.status !== 200) {
        this.isError = true
        this.errorMessage = "評価に失敗しました。"
        return
      }

      return this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
