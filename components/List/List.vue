<template>
  <div>
    <ListItem
      v-for="item of items" :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>
import ListItem from '@/components/List/_ListItem'

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
  },
  components: {
    ListItem
  },
  computed: {

  },
 }
</script>

<style>

</style>