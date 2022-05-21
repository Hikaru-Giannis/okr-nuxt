<template>
  <div>
    <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        目標を設定
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        期限を設定
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 3"
        step="3"
      >
        成果目標を設定
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4">
        確認
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-10"
          height="auto"
          outlined
        >
          <form>
            <v-card-title>目標を設定しよう！</v-card-title>
              <div class="ml-4 target--field">
                <v-text-field
                  v-model="target"
                  :error-messages="targetErrors"
                  lavel="目標"
                  required
                  placeholder="キャリアアップのために転職する"
                  @blur="$v.target.$touch()"
                ></v-text-field>
              </div>
            <v-card-subtitle>目標を設定する際のヒント</v-card-subtitle>
            <v-card-text>
              <ul class="hint--list">
                <li>若干気後れするくらいのレベルを設定する。</li>
                <li>目標の60 ~ 70%の達成率が理想的である。</li>
                <li>常に達成率が100%の場合、設定ベルが低いと言えるため野心的な目標を設定する必要がある。</li>
                <li>過度な負担になるため、目標は3~5個に絞ること。</li>
                <li>「現状を維持」のような高みを求めない表現は控える。</li>
                <li>「~という機能を実装する」「LTを3回する」など、到達点や状態を示す表現を使用する。</li>
                <li>目標を客観的に評価できるように具体的、客観的、かつ明確な言葉を使用する。具体性が高いほど達成できる割合が高いことが明らかである。</li>
              </ul>
            </v-card-text>
          </form>
        </v-card>

        <v-btn
          color="primary"
          :disabled="$v.$invalid"
          @click="e1 = 2"
        >
          次へ
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-10"
          height="auto"
          outlined
        >
        <form>
          <v-card-title>期限を設定しよう！</v-card-title>
            <v-date-picker
              v-model="expirationDate"
              no-title
              scrollable
            >
          </v-date-picker>
        </form>
        </v-card>

        <v-btn
          color="error"
          @click="e1 = 1"
        >
          前へ
        </v-btn>
        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          次へ
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-10"
          height="auto"
          outlined
        >
        <v-card-title>成果目標を設定しよう！</v-card-title>
          <div
            v-for="(form, index) in indicatorForms"
            :key="index"
            class="ml-4 target--field d-flex"
          >
            <v-text-field
              v-model="indicators[index]"
              lavel="成果目標"
              required
              placeholder="1ヶ月以内にカジュアル面談を３社受ける"
            ></v-text-field>
            <v-btn
              fab
              dark
              small
              color="error"
            >
              <v-icon
                @click="deleteIndicatorForm(index)"
              >
                mdi-minus
              </v-icon>
            </v-btn>
          </div>
          <v-btn
            v-if="indicatorForms.length < 5"
            class="mx-5 mb-5"
            fab
            dark
            small
            color="indigo"
          >
            <v-icon
              @click="addIndicatorForm"
            >
              mdi-plus
            </v-icon>
          </v-btn>
          <v-alert
            v-if="5 <= indicatorForms.length"
            class="mx-2 indicator--alert"
            color="red lighten-2"
            dark
          >
            成果目標は5個以内に設定しよう！
          </v-alert>
          <v-card-subtitle>成果目標を設定する際のヒント</v-card-subtitle>
          <v-card-text>
            <ul class="hint--list">
              <li>1つの目標につき、成果指標を3個ほど設定する。</li>
              <li>計測可能で、実現すれば目標達成に直接結びつくことがわかるような指標にする。</li>
              <li>行動ではなく、行動の成果を定義する。「~までに3社カジュアル面談をする」など</li>
              <li>計測可能な指標には、完遂の証拠を含める必要がある。</li>
            </ul>
          </v-card-text>
        </v-card>

        <v-btn
          color="error"
          @click="e1 = 2"
        >
          前へ
        </v-btn>
        <v-btn
          color="primary"
          @click="e1 = 4"
        >
          次へ
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card
          class="mb-10"
          height="auto"
          outlined
        >
        <v-card-title>
          {{ target }}
        </v-card-title>

        <v-card-text>
          期限日 : {{ expirationDate }}まで
        </v-card-text>

        <v-card-subtitle>成果目標</v-card-subtitle>
          <v-card-text>
              <ul
                v-for="(indicator, index) in indicators"
                :key="index"
                class="hint--list"
              >
                <li>{{ indicator }}</li>
              </ul>
          </v-card-text>
        </v-card>

        <v-btn
          color="error"
          @click="e1 = 3"
        >
          前へ
        </v-btn>
        <v-btn
          color="primary"
        >
          設定完了
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    target: { required }
  },

  data () {
    return {
      e1: 1,
      target: null,
      expirationDate: null,
      indicators: [],
      indicatorForms: [''],
      indicatorErrorMessage: ''
    }
  },
  computed: {
    targetErrors () {
      const errors = []
      if (!this.$v.target.$dirty) return errors
      !this.$v.target.required && errors.push('目標は入力必須です。')
      return errors
    }
  },
  methods: {
    addIndicatorForm() {
      this.indicatorForms.push('')
    },
    deleteIndicatorForm(index) {
      this.indicatorForms.splice(index, 1)
    },
    toStep2() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
    }
  }
}
</script>

<style scoped>
  .hint--list li {
    margin-bottom: 5px;
  }

  .target--field {
    width: 50%;
  }

  .indicator--alert {
    width: 50%;
  }
</style>
