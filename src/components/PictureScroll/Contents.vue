<template>
    <li class="ps-content">
        <a :href="view.link" rel="noopener" v-bind="{existLink: view.link}">
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
                    <div v-show="view.title" id="titleText">
                        {{view.title}}
                    </div>
                </div>
                <div class="ps-text">
                    <div id="text" v-bind="{existLink: view.link}">
                        {{view.text}}
                        <i 
                            v-if="view.link && view.linkType === 'internal'" 
                            style="font-size: 0.65rem;" 
                            class="fas fa-link">
                        </i>
                        <i 
                            v-else-if="view.link && view.linkType === 'external'" 
                            style="font-size: 0.65rem;" 
                            class="fas fa-external-link-alt">
                        </i>
                    </div>
                </div>
            </div>
        </a>
    </li>
</template>

<script lang="ts">
import Vue from 'vue';
import imgLoader from "@/modules/img-loader.ts";
let imgLoad = new imgLoader();

export default Vue.extend ({
    props: {
        view: {
            type: Object,
            required: false
        }
    },
    directives: {
        imgSource: {
            inserted: function(el: HTMLElement, binding: any) {
                imgLoad.observe(el, binding.arg);
            }
        }
    }
})
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

    > a { 
        height: 100%;
        transition: all 0.25s ease;
        color: #fff;
        

        &[existLink]:hover {
            color: $green;
            background: #fff1;
        }

        @media (max-width: 615px) {
            width: 100%;
        }
    }
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
    height: 100%;
    /* height: calc(var(--content-height) - 30px); */
    width: ($ps-content-height - 30px) * (16 / 9);
    position: relative;

    .ps-title {
        position: absolute;
        top: 20px;
        left: 0px;
        /* width: 250px; */
        width: fit-content;
        /* height: 100px; */
        height: fit-content;
        background: #000b;
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
        background: #000b;

        #text {
            max-width: calc(100vw - 20px);
            padding: 20px;
            font-size: 0.8em;
            font-weight: lighter;
            color: #fff;

            &[existlink] {
                color: inherit;
            }
        }
    }
}
</style>