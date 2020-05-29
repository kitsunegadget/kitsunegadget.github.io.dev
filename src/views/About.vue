<template>
    <div>
        <div id="dock">
            <AboutGrid />
            <!-- <BioData /> -->
        </div>
        <Social />
    </div>
</template>
<script>
import AboutGrid from '@/components/AboutGrid.vue';
// import BioData from '@/components/BioData.vue';
import Social from '@/components/Social.vue';

export default {
    components: {
        AboutGrid,
        // BioData,
        Social
    }
}
</script>

<style lang="scss">
#dock{
    margin:auto;
    /* padding-bottom: 10px;  */
    max-width: 700px;
}
</style>