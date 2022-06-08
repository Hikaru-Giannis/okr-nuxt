<template>
  <Index
    :target-list="targetList"
  />
</template>

<script>
import Index from '@/components/pages/Index'

export default {
  components: {
    Index
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
