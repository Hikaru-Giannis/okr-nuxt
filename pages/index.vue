<template>
  <div>
    <div
      v-if="targetList.length > 0"
    >
      <TargetCardVue
        :target-list="targetList"
      />
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
import TargetCardVue from '@/components/block/TargetCard'

export default {
  name: 'IndexPage',
  components: {
    TargetCardVue
  },
  async asyncData({ $axios, $config, error }) {
    const response = await $axios.$get($config.API_BASE_URL + '/api/target/index', { withCredentials: true })
      .catch(err => {
        return err.response
      })

    if (typeof response.data === 'undefined' || response.data.status !== 200) {
      error({
        stausCode: response.status
      })
      return
    }

    const targetList = response.data.targets
    return { targetList }
  },
}
</script>
