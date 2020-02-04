<template>
    <div class="pictureScroll">
        <div class="ps-main-container">
            <ul class="ps-inside-images">
                <li class="ps-image" for>
                    <!-- img -->
                </li>
            </ul>
            <div class="ps-under-point">
                <div class="ps-left-button">
                    <img id="left-arrow" src="../assets/arrow_dot.svg" width="25px" height="25px"/>
                </div>
                <div id="ps-fixed-mark" for>
                    
                </div>
                <div id="ps-movable-mark"></div>
                <div class="ps-right-button">
                    <img id="right-arrow" src="../assets/arrow_dot.svg" width="25px" height="25px"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.pictureScroll {
    height: 380px;
    max-width: 700px;
    margin: auto;
}
.ps-main-container {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-basis: 0 1 auto;
}
.ps-inside-images {
    margin: 0;
    padding: 0;
    display: flex;
    width: 100%;
    height: 350px;
    flex-direction: colmun;
    overflow: hidden;
    list-style: none;
    min-height: 300px;
    background: #fffa;
}
.ps-image {
    width: inherit;
}
.ps-under-point {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-content: center;
    min-height: 30px;
    position: relative;
    background: #00f;
}
.ps-under-point #ps-moveable-mark {
    position: absolute;
}
.ps-left-button {
    width: 50px;
    display: flex;
    align-content: center;
    justify-content: center;
    /* background: #f00; */
}
.ps-right-button {
    width: 50px;
    display: flex;
    align-content: center;
    justify-content: center;
    /* background: #f00; */
}
#left-arrow {
    align-self: center;
    justify-self: center;
    transform: rotateZ(-90deg);
}
#right-arrow {
    align-self: center;
    justify-self: center;
    transform: rotateZ(90deg);
}
</style>