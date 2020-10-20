<template>
  <input
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
    class="input"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: () => ""
    },
    placeholder: {
      type: String,
      default: () => ""
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  height: 50px;
  width: 100%;
  padding: 8px;
  font-size: 16px;
}
</style>
