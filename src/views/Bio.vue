<template>
    <div>
        <div id="dock">
            <BioGrid />
            <!-- <BioData /> -->
        </div>
        <Social />
    </div>
</template>
<script>
import BioGrid from '@/components/BioGrid.vue';
// import BioData from '@/components/BioData.vue';
import Social from '@/components/Social.vue';

export default {
    components: {
        BioGrid,
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