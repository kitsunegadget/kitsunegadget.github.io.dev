<template>
    <li class="ps-content">
        <div class="ps-backImage">
            <img 
                id="backImg" 
                v-imgSource:[view.backImage]
                height="350px"
                loading="lazy"
            />
        </div>
        <div class="ps-content-inside">
            <div class="ps-title">
                <div id="titleImage">

                </div>
                <div id="titleText">
                    {{view.title}}
                </div>
            </div>
            <div class="ps-text">
                <div id="text">
                    {{view.text}}
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import imgLoader from "../../modules/img-loader.js";
let imgLoad = new imgLoader();

export default {
    props: {
        view: {
            type: Object,
            required: false
        }
    },
    directives: {
        imgSource: {
            inserted: function(el, binding) {
                imgLoad.observe(el, binding.arg);
            }
        }
    }
}
</script>

<style lang="scss">
.ps-content {
    scroll-snap-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
}
.ps-backImage {
    z-index: -1;
    @include absolute-centering;
    background: #0005;

    > img {
        width: 100%;
        height: 100%;
        object-fit: scale-down;
        object-position: 50% 50%;
        transition: opacity .5s ease-in-out;
    }
}
.ps-content-inside {
    /* height: calc(var(--content-height) - 30px); */
    width: calc((var(--content-height) - 30px) * (16 / 9));
    position: relative;

    .ps-title {
        position: absolute;
        top: 20px;
        left: 0px;
        /* width: 250px; */
        width: fit-content;
        /* height: 100px; */
        height: fit-content;
        background: #0008;
        display: flex;
        justify-content: center;

        #titleImage {
            display: none;
        }
        #titleText {
            padding: 20px;
            align-self: center;
            font-size: 1.5em;
            font-weight: lighter;
            color: #fff;
        }

    }
    .ps-text {
        position: absolute;
        bottom: 20px;
        left: 20px;
        /* width: 350px; */
        width: fit-content;
        /* height: 150px; */
        height: fit-content;
        background: #0008;

        #text {
            max-width: calc(100vw - 20px);
            padding: 20px;
            font-size: 0.8em;
            font-weight: lighter;
            color: #fff;
        }
    }
}
</style>