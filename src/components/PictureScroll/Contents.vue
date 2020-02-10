<template>
    <li class="ps-content">
        <div id="content-inside">
            <div id="backImage"></div>
            <div id="titleImage"></div>
            <div id="text"></div>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        content: {
            type: Object,
            required: false
        }
    }
}
</script>

<style>
.ps-content {
    scroll-snap-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
}
#content-inside {
    height: calc(var(--content-height) - 30px);
    width: calc((var(--content-height) - 30px) * (16 / 9));
    position: relative;
}
#backImage {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #000a;
}
#titleImage {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 250px;
    height: 100px;
    background: #0f0a;
}
.ps-content #text {
    position: absolute;
    bottom: 20px;
    left: 30px;
    width: 350px;
    height: 150px;
    background: #00fa;
}
</style>