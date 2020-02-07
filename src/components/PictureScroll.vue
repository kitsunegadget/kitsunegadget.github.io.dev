<template>
    <div class="pictureScroll">
        <div class="ps-main-container">
            <ul class="ps-inside-contents">
                <Contents 
                    v-for="content in contentData" 
                    :key="content.id" 
                    :view="content"
                />
            </ul>
            <div class="ps-under">
                <div class="ps-button ps-left-button" draggable="true">
                    <img class="ps-arrow" id="left-arrow" 
                        src="../assets/arrow_dot.svg" width="25px" height="25px"/>
                </div>
                <div class="ps-under-fixed">
                    <div id="ps-movable-mark"></div>
                    <div class="ps-fixed-marks" for draggable="true">
                        <div id="ps-fixed-mark">●</div>
                        <div id="ps-fixed-mark">●</div>
                    </div>
                </div>
                <div class="ps-button ps-right-button" draggable="true">
                    <img class="ps-arrow" id="right-arrow" 
                        src="../assets/arrow_dot.svg" width="25px" height="25px"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Contents from "./PictureScroll/Contents.vue"

export default {
    components: {
        Contents,
    },
    data() {
        return {
            contentData: [
                {
                    title: "",
                    titleImage: "",
                    anotherImage: "",
                    text: "",
                },
                {
                    title: "",
                    titleImage: "",
                    anotherImage: "",
                    text: "",
                }
            ]
        }
    }
}
</script>

<style>
.pictureScroll {
    --content-height: 380px;
    height: var(--content-height);
    max-width: calc((var(--content-height) - 30px) * (16 / 9));
    margin: 0 auto;
    margin-top: 10px;
}
.ps-main-container {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-basis: 0 1 auto;
}
.ps-inside-contents {
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    height: calc(var(--content-height) - 30px);
    overflow: auto;
    list-style: none;
    scroll-snap-type: x mandatory;
    /* background: #fffa; */
}
.ps-under {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    min-height: 30px;
    position: relative;
    /* background: #00f; */
}
.ps-under-fixed {
    position: relative;
    margin: 0;
    padding: 0;
}
.ps-fixed-marks {
    /* min-width: 100px; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    color: #fffa;
    font-size: 1.5em;
}
#ps-fixed-mark {
    display: block;
    cursor: pointer;
    margin: 0px 5px;
    line-height: 1.1em;
}
.ps-under-fixed #ps-moveable-mark {
    position: absolute;
}
.ps-button {
    width: 50px;
    display: flex;
    align-content: center;
    justify-content: center;
    /* background: #f00; */
    cursor: pointer;
    transition: background ease 200ms;
    border-radius: 10px;
}
.ps-button:hover {
    background: #000a;
}
.ps-arrow {
    align-self: center;
    justify-self: center;
}
#left-arrow {
    transform: rotateZ(-90deg);
}
#right-arrow {
    transform: rotateZ(90deg);
}
</style>