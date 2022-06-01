<template>
  <div>
    <h2 class="text-title font-weight-bold ml-3">
      {{ target.contents }}
    </h2>
    <v-simple-table>
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
    color="primary"
    @click="scoreIndicators"
  >
  保存
  </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'EvaluatePage',
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
        step: 0.1
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

        await this.$axios.$get(this.$config.API_BASE_URL + '/sanctum/csrf-cookie', { withCredentials: true })
        .then(async (res) => {
          await this.$axios.$post(
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

        // TODO エラー処理要検討
        return this.$router.push('/')
      }
    }
  }
</script>

<style>

</style>
