<template>
    <div class="main-content">
        <Content1PfGrid />
        <Content2 /> 
    </div>
</template>

<script>
import Content1PfGrid from "../components/Content1PfGrid.vue";
import Content2 from "../components/Content2.vue";

export default {
    components: {
        Content1PfGrid,
        Content2
    }
}
</script>