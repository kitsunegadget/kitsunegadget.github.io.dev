<template>
  <div class="about">
    <ViewTitle text="About" />
    <div id="dock">
      <AboutGrid />
      <!-- <BioData /> -->
    </div>
    <Social />
  </div>
</template>
<script>
import ViewTitle from '@/components/ViewTitle'
import AboutGrid from '@/components/AboutGrid.vue';
// import BioData from '@/components/BioData.vue';
import Social from '@/components/Social.vue';

export default {
  components: {
    ViewTitle,
    AboutGrid,
    // BioData,
    Social
  }
}
</script>

<style lang="scss">
.about {
  max-width: 1200px;
  width: 100vw;
  margin: auto;
}
#dock{
  margin:auto;
  /* padding-bottom: 10px;  */
  max-width: 700px;
}
</style>