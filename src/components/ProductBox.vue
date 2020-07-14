<template>
  <article>
    <span id="image">
      <img 
        v-imgSource:[prd.img]
        height="200px"
        loading="lazy"
        style="opacity: 0;"
        draggable="false"
      />
    </span>

    <h3 id="product-name">
      <a :href="prd.link" target="_blank" rel="noopener">
        {{ prd.title }}
        <i 
          v-if="prd.link && !isLinkTypeExternal(prd.link)" 
          style="font-size: 0.8rem;" 
          class="fas fa-link">
        </i>
        <i 
          v-if="prd.link && isLinkTypeExternal(prd.link)" 
          style="font-size: 0.8rem;" 
          class="fas fa-external-link-alt">
        </i>
      </a>
    </h3>

    <span id="text">
      <p>{{ prd.text }}</p>
    </span>

  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import imgLoader from '@/modules/img-loader'
const imgLoad = new imgLoader()

export default Vue.extend({
  props: {
    prd: {
      type: Object,
      required: true
    }
  },
  directives: {
    imgSource: {
      // 画像の読み込みができたら表示する
      inserted: function(el, binding) {
        // console.log("imgload", binding.arg);
        imgLoad.observe(el, binding.arg);
      }
    }
    },
    methods: {
      isLinkTypeExternal(linkstring: string) {
        const re = /^(http).+/
        const re2 = /^(https:\/\/kitsunegadget\.xyz\/).+/
        return re.test(linkstring) && !re2.test(linkstring)
      }
    }
})
</script>

<style lang="scss">

</style>