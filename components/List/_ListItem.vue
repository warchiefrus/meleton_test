<template>
  <nuxt-link :to="{ path: `/courses/course/${item.id}`}" class="mb-2 link">
    <div class="list__item pa-4">
      <h2>
        {{ item.name }}
      </h2>
      <h5>
        {{ item.description }}
      </h5>
      <div>Цена: {{ item.price }}</div>
      <div>Дата начала: {{ item.startDate | formatDate }}</div>
    </div>
  </nuxt-link>
</template>

<script>
import {filters} from '@/mixins/filters.js'

export default {
  mixins: [
    filters
  ],
  props: {
    item: {
      type: Object,
      default: () => ({
        id: null,
        name: "",
        description: "",
        price: 0,
        startDate: ""
      })
    }
  },

};
</script>

<style lang="scss" scoped>
.list__item {
  width: 100%;
  border-radius: 5px;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.25);
  border: 1px solid #ccc;
}

.link {
  display: block;
}
</style>
