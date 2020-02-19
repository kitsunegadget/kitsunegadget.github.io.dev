<template>
    <div class="pictureScroll">
        <div class="ps-main-container">
            <ul 
                class="ps-inside-contents" 
                v-scrolling:[currentPos]>
                <Contents 
                    v-for="content in contentData" 
                    :key="content.id" 
                    :view="content"
                />
            </ul>
            <div class="ps-under" draggable="true">
                <div 
                    class="ps-button ps-left-button"
                    @click="psArrowClick('Left')">
                    <img 
                        class="ps-arrow" 
                        id="left-arrow" 
                        src="../assets/arrow_dot.svg" 
                        width="25px" 
                        height="25px"
                    />
                </div>
                <div class="ps-under-fixed">
                    <div 
                        class="ps-moveable-mark"
                        :style="{ transform: moveMarkTransform }">
                        <img 
                            class="ps-square"
                            src="../assets/square_dot.svg" 
                            width="12px" 
                            height="12px"
                        />
                    </div>
                    <div class="ps-fixed-marks" draggable="true">
                        <div 
                            v-for="n in contentData.length"
                            :key="n"
                            class="ps-fixed-mark"
                            :id="n">
                            <img 
                                class="ps-square-back" 
                                src="../assets/square_dot.svg" 
                                width="6px" 
                                height="6px"
                            />
                        </div>
                    </div>
                </div>
                <div 
                    class="ps-button ps-right-button" 
                    draggable="true" 
                    @click="psArrowClick('Right')">
                    <img 
                        class="ps-arrow" 
                        id="right-arrow" 
                        src="../assets/arrow_dot.svg" 
                        width="25px" 
                        height="25px"
                    />
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
                    title: "ERROR",
                    titleImage: "",
                    backImage: "",
                    text: "erRor errOr Error erroR eRror",
                },
            ],
            currentPos: 0,
            moveMarkTransform: "translateX(4px)",
        }
    },
    created() {
        this.contentData = require("../json/ps_data.json");
    },
    mounted() {
        // スマホフリック用、動作検討中
        // let inContents = document.querySelector(".ps-inside-contents");
        // let xPos = 0; // eslint-disable-line
        // let mouseMoveEv = (event) => {
        //     event.preventDefault();
        //     event.stopPropagation();
        //     console.log(event);
        //     //inContents.scrollBy(event.movementX, 0);
        // };
        // inContents.addEventListener("mousedown", (event) => {
        //     event.preventDefault();
        //     event.stopPropagation();
        //     inContents.addEventListener("mousemove", mouseMoveEv);
        // });
        // inContents.addEventListener("mouseup", (event) => {
        //     event.preventDefault();
        //     event.stopPropagation();
        //     inContents.removeEventListener("mousemove", mouseMoveEv);
        // });

        // ポイントからクリックしてスクロール
        // 遠い位置だとスクロール早くなって気持ち悪い
        // 矢印ナビでひとつずつ移動させるほうが感触が良い気がする…
        // let fixedMark = document.querySelectorAll(".ps-fixed-mark");
        // fixedMark.forEach(mark => {
        //     mark.addEventListener("click", ()=>{
        //         this.moveContent(mark.id - 1);
        //     });
        // });
    },
    directives: {
        // currentPos更新時にスクロール
        scrolling: {
            update: function(el, binding) {
                el.scroll(el.scrollWidth * binding.arg, 0);
            }
        }
    },
    methods: {
        psArrowClick: function(dir) {
            if(dir === "Left") {
                this.moveContent(
                    this.currentPos - 1 < 0 
                    ? 0 : this.currentPos - 1);
            }
            else if (dir === "Right") {
                this.moveContent(
                    this.currentPos + 1 >= this.contentData.length
                    ? this.currentPos : this.currentPos + 1
                );
            }
        },
        moveContent: function(nextPosition) {
            this.moveMarkTransform = "translateX(" + ((nextPosition * 30) + 4) + "px)";
            this.currentPos = nextPosition;
        }
    }
}
</script>

<style>
.pictureScroll {
    --content-height: 380px;
    height: var(--content-height);
    /* max-width: calc((var(--content-height) - 30px) * (16 / 9)); */
    max-width: 100vw;
    margin: 0 auto;
    /* margin-top: 10px; */
    margin-bottom: 100px;
    animation: fadeIn 1s ease;
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
    overflow: hidden;
    scrollbar-width: none;
    list-style: none;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    /* background: #fffa; */
}
.ps-under {
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
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
    align-items: center;
    color: #fff7;
    height: 100%;
}
.ps-fixed-mark {
    padding-top: 0.5px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
    height: 100%;
}
.ps-moveable-mark {
    margin: 0 5px; 
    position: absolute;
    z-index: 1;
    color: #fff;
    transition: transform ease-in-out 0.5s;
    height: 30px;
    display: flex;
    transform: translateX(4px);
}
.ps-square {
    align-self: center;
    justify-self: center;
}
.ps-square-back {
    opacity: 0.5;
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
.ps-button:active {
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