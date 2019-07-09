<template>
    <div id="app">
        <div id="bg"></div>
        <Header />
        <div class="content-1">
            <Content1PfGrid />
        </div>
        <Content2 />
        <Footer />
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import Content1PfGrid from "./components/Content1PfGrid.vue";
import Content2 from "./components/Content2.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "app",
    components: {
        Header,
        Content1PfGrid,
        Content2,
        Footer
    }
};
</script>

<style>
body {
    margin: 0;
    padding: 0;
    /* height: 100%; */
    background-color: #222;
}

#app {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#bg {
    background: url(./assets/bg2.png) no-repeat fixed;
    background-size: cover;
    background-position-x: right;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.5;
}

/* .content-1{
    background-color: #333; 
} */
</style>
