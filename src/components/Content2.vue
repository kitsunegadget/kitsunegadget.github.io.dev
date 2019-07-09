<template>
    <div class="content-2">
        <!-- <h1 class="section_title">Social</h1> -->
        <Social/>
        <!-- <h1 class="section_title">About</h1> -->
        <About/>
        <!-- <h1 class="section_title" id="product">Products</h1> -->
        <Works/>
    </div>
</template>

<script>
import Social from './Content2Social.vue'
// import About from './Content2About.vue'
// import Works from './Content2Works.vue'

export default {
    components: {
        Social
        // About,
        // Works
    }
}
</script>

<style>
.content-2{
    /* display: block; */
    margin: auto;
    /* background-color: rgba(86, 89, 105, 0.514); */
    max-width: 600px;
    margin-bottom: 50px;
}

.section_title{
    /* position: relative; */
    background: #FFB74C;
    height: 45px;
    width: 200px;
    padding: 10px 0;
    text-align: center;
    color: #fff;
    margin: 0 7vw;
}

.content_2_dock{
    margin: 0 15%;
}
</style>
