<template>
    <div id="about">
        <div class="content_2_dock">
            <p>{{ aboutText }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            aboutText: "\
                Kitsune Gadget は旧名の Garakuta Gadget: 役に立つかわからない道具を生み出すものの、\
                その中から面白いモノが生み出せることを期待して名付けられています。（きつねかわいい）\
            "
        }
    }
}
</script>


<style>
#about{
    color: #fff;
    background-color: #333;
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>
