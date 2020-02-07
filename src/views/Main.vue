<template>
    <div class="main-content">
        <!-- <Content1PfGrid /> -->
        <PictureScroll />
        <Content2 /> 
    </div>
</template>

<script>
import Content1PfGrid from "../components/Content1PfGrid.vue"; // eslint-disable-line
import PictureScroll from "../components/PictureScroll.vue"
import Content2 from "../components/Content2.vue";

export default {
    components: {
        Content1PfGrid, // eslint-disable-line
        PictureScroll,
        Content2
    }
}
</script>