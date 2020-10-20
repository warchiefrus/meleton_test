<template>
  <button
    @click.prevent="$emit('click')"
    class="button"
    :class="`button--${type}`"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: () => 'TEXT'
    },
    type: {
      type: String,
      default: () => 'secondary'
    },

  }
};
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;

  &--secondary {
    color: #35495e;
    &:hover {
      color: #fff;
      background-color: #35495e;
    }
  }  

  &--success {
    color: #1B5E20;
    &:hover {
      color: #fff;
      background-color: #1B5E20;
    }
  }   

  &--error {
    color: #C62828;
    &:hover {
      color: #fff;
      background-color:#C62828;
    }
  }   
}


</style>
