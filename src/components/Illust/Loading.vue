<template>
  <div class="loading-wrap">
    <h2
      :complete="loaded">
      {{ "Loading" }}
    </h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    loaded: {
      type: Boolean,
      require: true
    }
  }
})
</script>

<style lang="scss">
.loading-wrap {
  @include flex-centering;
  height: 50px;
  width: 100%;
  min-width: 320px;
  background: #0005;
  padding: 5px;
  border-radius: 10px;
  /* animation: startLoading ease .5s forwards; */
  /* transition: all .5s; */

  > h2 {
    animation: startLoadingLiteral ease 500ms forwards;

    &::before {
      position: absolute;
      left: -100px;
      content: '・・・';
      font-size: 1.2em;
      animation: rot linear 1s infinite;
    }
    &::after {
      position: absolute;
      right: -100px;
      content: '・・・';
      font-size: 1.2em;
      animation: rot linear 1s infinite;
    }
    &[complete] {
      animation: endLoading ease 600ms forwards;
    }
  }
}

@keyframes startLoading {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
@keyframes startLoadingLiteral {
  0% {
    opacity: 0;
    transform: translateX(-50%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes endLoading {
  100% { 
    opacity: 0;
    transform: translateX(50%);
  }
}
</style>
