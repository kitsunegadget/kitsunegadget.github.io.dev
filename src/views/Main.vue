<template>
    <div class="main-content">
        <PictureScroll />
        <Social /> 
    </div>
</template>

<script>
import PictureScroll from "@/components/PictureScroll.vue";
import Social from "@/components/Social.vue";

export default {
    components: {
        PictureScroll,
        Social
    }
}
</script>
<style lang="scss">
    .main-content {
        flex: 1;
    }
</style>