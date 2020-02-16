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
                <div 
                    class="ps-button ps-left-button" 
                    draggable="true" 
                    @click="psArrowClick('Left')"
                >
                    <img class="ps-arrow" id="left-arrow" 
                        src="../../assets/arrow_dot.svg" width="25px" height="25px"/>
                </div>
                <div class="ps-under-fixed">
                    <div class="ps-moveable-mark" draggable="true">
                        <img class="ps-square" 
                            src="../../assets/square_dot.svg" width="15px" height="15px"/>
                    </div>
                    <div class="ps-fixed-marks" for draggable="true">
                        <div id="ps-fixed-mark">●</div>
                        <div id="ps-fixed-mark">●</div>
                    </div>
                </div>
                <div 
                    class="ps-button ps-right-button" 
                    draggable="true" 
                    @click="psArrowClick('Right')"
                >
                    <img class="ps-arrow" id="right-arrow" 
                        src="../../assets/arrow_dot.svg" width="25px" height="25px"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Contents from "./Contents.vue"

export default {
    components: {
        Contents,
    },
    data() {
        return {
            contentData: [
                {
                    title: "Kitsune Gadget β",
                    titleImage: "",
                    backImage: require("../../assets/bg2.png"),
                    text: "そこに何があるのか… 誰も知らない。",
                },
                {
                    title: "",
                    titleImage: "",
                    backImage: "",
                    text: "",
                }
            ]
        }
    },
    mounted() {
        let inContents = document.querySelector(".ps-inside-contents");
        let xPos = 0; // eslint-disable-line
        let mouseMoveEv = (event) => {
            event.preventDefault();
            event.stopPropagation();
            console.log(event);
            //inContents.scrollBy(event.movementX, 0);
        };
        inContents.addEventListener("mousedown", (event) => {
            event.preventDefault();
            event.stopPropagation();
            inContents.addEventListener("mousemove", mouseMoveEv);
        });
        inContents.addEventListener("mouseup", (event) => {
            event.preventDefault();
            event.stopPropagation();
            inContents.removeEventListener("mousemove", mouseMoveEv);
        });

    },
    methods: {
        psArrowClick: function(dir) {
            let inContents = document.querySelector(".ps-inside-contents");
            let mainContainer = document.querySelector(".ps-main-container");
            let scrollWidth = mainContainer.scrollWidth;
            if(dir === "Left") {
                inContents.scrollBy(-scrollWidth, 0);
                this.moveMark(inContents.scrollLeft, 0);
            }
            else if (dir === "Right") {
                inContents.scrollBy(scrollWidth, 0);
                this.moveMark(inContents.scrollLeft, 165);
            }
        },
        moveMark: function(currentPosition, moveX) { // eslint-disable-line
            let mark = document.querySelector(".ps-moveable-mark");
            if(currentPosition < 0) {
                mark.style.transform = "translateX(0%)";
            }
            else if(currentPosition > window.innerWidth) {
                mark.style.transform = "translateX(165%)";
            }
            else {
                mark.style.transform = "translateX(" + moveX + "%)";
            }
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
    margin-bottom: 10px;
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
    align-content: center;
    color: #fff7;
    font-size: 1.5em;
}
#ps-fixed-mark {
    padding: 0;
    display: block;
    cursor: pointer;
    margin: 0px 5px;
    line-height: 1.1em;
}
.ps-moveable-mark {
    margin: 0 5px; 
    position: absolute;
    color: #fff;
    font-size: 1.5em;
    line-height: 1.1em;
    cursor: pointer;
    transition: transform ease-in-out 0.5s;
    display: flex;
    height: 100%;
}
.ps-square {
    align-self: center;
    justify-self: center;
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