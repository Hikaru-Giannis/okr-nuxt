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
              v-model="scores[index]"
              class="align-center"
              :max="max"
              :min="min"
              step="0.1"
              ticks="always"
              hide-details
            >
              <template #append>
                <v-text-field
                  v-model="scores[index]"
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

      return {
        target: response.data.target
      }
    },
    data() {
      return {
        min: 0,
        max: 1,
        step: 0.1,
        scores: [
          0.0,
          0.0
        ]
      }
    },
    methods: {
      scoreIndicators() {
        console.log(this.scores)
      }
    }
  }
</script>

<style>

</style>
