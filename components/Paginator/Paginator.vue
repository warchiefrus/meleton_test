<template>
  <div class="paginator pa-4">
    <PaginatorItem v-for="item of pageNumbers" :key="item"
      :item="item"
      :curPage="curPage"
      @clicked="itemClicked"
    />
  </div>
</template>

<script>
import PaginatorItem from "@/components/Paginator/_PaginatorItem";

export default {
  props: {
    pages: {
      type: Number,
      default: () => 0
    },
    curPage: {
      type: Number,
      default: () => 0
    },
  },
  components: {
    PaginatorItem
  },
  computed: {
    pageNumbers() {
      return Array.from(Array(this.pages).keys());
    }
  },
  methods: {
    itemClicked(page) {
      this.$emit('change', page)
    }
  }
};
</script>

<style lang="scss" scoped>
.paginator {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
