<template>
  <h2 class="view-title">
    {{ text }}
  </h2>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    text: {
      type: String
    }
  }
})
</script>

<style lang="scss">
.view-title {
  position: relative;
  color: #fff;
  margin-left: 20px;
  padding-left: 10px;
  border-left: 5px solid $orange;
  height: 30px;
  font-size: 1.5rem;

  text-transform: capitalize;

  &:before {
    position: absolute;
    height: 60%;
    content: '';
    left: -10px;
    border-left: 2px solid $orange;
  }
}
</style>