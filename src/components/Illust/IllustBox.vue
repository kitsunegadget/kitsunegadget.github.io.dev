<template>
  <article 
    class="gallery-box"
    @click="$emit('click', index)"
  >
    <div v-dataSrc:[pic.url]>
      <img
        class="image" 
        width="300px"
        draggable="false"
        loading="lazy"
        style="opacity: 0;"
      />
      <video
        loop
        muted
        type="video/mp4"
        class="video"
        width="300px"
        draggable="false"
        style="opacity: 0;"
      />
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import imgLoader from '@/modules/img-loader'
const imgLoad = new imgLoader()

export default Vue.extend({
  props: {
    pic: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  directives: {
    DataSrc: {
      inserted: function(el, binding) {
        const re = RegExp('\\.mp4\\?')

        if (binding.arg) {
          if (re.test(binding.arg)) {
            const img = el.getElementsByTagName('img')[0]
            img.style.display = 'none'
            const video = el.getElementsByTagName('video')[0]
            imgLoad.observe(video, binding.arg);
          } else {
            const video = el.getElementsByTagName('video')[0]
            video.style.display = 'none'
            const img = el.getElementsByTagName('img')[0]
            imgLoad.observe(img, binding.arg);
          }
        }
      }
    },
    imgSource: {
      // 画像の読み込みができたら表示する
      inserted: function(el, binding) {
        if (binding.arg) {
          // console.log("imgload", binding.arg);
          imgLoad.observe(el, binding.arg);
        }
      }
    }
  },
})
</script>

<style lang="scss">
.gallery-box {
  @include flex-centering;
  flex: none;
  // margin: 2px; 
  border-radius: 25px;
  background-color: #111c;
  overflow: hidden;
  width: 200px;
  height: calc(200px * 3/4);
  margin-left: 2px;
  margin-bottom: 25px;
  cursor: pointer;
  opacity: 0;
  animation: gly-fade-in ease .5s forwards;

  @media (max-width: 615px) {
    width: 49vw;
    height: 49vw;
    margin-left: 0;
    margin-bottom: 2px;
  }

  .image, .video {
    /* max-width: 100%;
    height: auto; */
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    transition: opacity .5s ease-in-out;
  }
}

@keyframes gly-fade-in {
    0% { opacity: 0; }
    100% { opacity: 1;}
}

</style>