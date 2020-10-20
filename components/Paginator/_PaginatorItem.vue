<template>
  <div class="paginator__item"
    :class="{'paginator__item--active': isActive}"
    @click="$emit('clicked', item)"
  >
    {{ item + 1}}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Number,
      default: () => 0,
    },
    curPage: {
      type: Number,
      default: () => 0,
    }
  },
  computed: {
    isActive() {
      return this.item == this.curPage
    }
  }

};
</script>

<style lang="scss" scoped>
.paginator__item {
  height: 30px;
  width: 30px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin: 0 2px;
  cursor: pointer;

  &--active {
    background-color: #283593;
    color: white;
  }
}
</style>
