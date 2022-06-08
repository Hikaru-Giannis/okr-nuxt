<template>
  <div>
    <div
      v-if="targetList.length > 0"
    >
      <TargetCard
        :target-list="targetList"
      />
      <NewTargetRegisterButton />
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
import TargetCard from '@/components/block/TargetCard'
import NewTargetRegisterButton from '@/components/elements/NewTargetRegisterButton'

export default {
  components: {
    TargetCard,
    NewTargetRegisterButton
  },
  props: {
    targetList: {
      type: Array,
      required: true
    }
  },

}
</script>
