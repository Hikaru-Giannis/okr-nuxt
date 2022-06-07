<template>
  <div
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
        v-if="isImplementing(target.status)"
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
  </div>
</template>

<script>
export default {
  name: 'TargetCardComponent',
  props: {
    targetList: {
      type: Array,
      required: true
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

<style>

</style>
