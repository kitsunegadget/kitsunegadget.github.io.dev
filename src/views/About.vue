<template>
    <div style="flex: 1;">
        <div id="dock">
            <ViewTitle text="About" />
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
#dock{
    margin:auto;
    /* padding-bottom: 10px;  */
    max-width: 700px;
}
</style>