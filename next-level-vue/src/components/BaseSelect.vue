<template>
  <div>
    <label for="" v-if="label">{{ label }}</label>
    <select
      :value="value"
      v-on="$listeners"
      @change="updateValue"
      v-bind="$attrs"
    >
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin'

export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      reuired: true,
    },
  },
}
</script>

<style></style>
