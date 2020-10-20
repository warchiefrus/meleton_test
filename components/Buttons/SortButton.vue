<template>
  <button
    class="button"
    :class="{ 'button--active': isActive }"
    @click="sortClick"
  >
    <span v-html="buttonText"></span>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    sortField: {
      type: String,
      required: true
    },
    curSortField: {
      type: String
    },
    curSortDirection: {
      type: Number
    }
  },
  computed: {
    buttonText() {
      let text = "";
      if (this.isActive) {
        if (this.curSortDirection > 0) {
          text = `${this.text} &darr;`;
        } else if (this.curSortDirection < 0) {
          text = `${this.text} &uarr;`;
        } else {
          text = this.text;
        }
      } else {
        text = this.text;
      }
      return text;
    },
    isActive() {
      return this.sortField == this.curSortField;
    }
  },
  methods: {
    sortClick() {
      this.$emit("sortClick", this.sortField);
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  border-radius: 4px;
  border: none;
  text-decoration: none;
  font-size: 1rem;
  padding: 3px 20px;
  margin-left: 15px;
  background-color: unset;
  outline: none;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #35495e;
  }

  &--active {
    background-color: #cfd8dc;
  }
}
</style>
