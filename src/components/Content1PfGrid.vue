<template>
    <div id="dock">
        <div class="pf_wrap">
            <div id="dummy">
            </div>
            <div id="pficon" class="icon_delay">
                <span>
                    <img src="../assets/pficon.png" height="160" width="160" title="me">
                </span>
            </div>
            <div id="line1" class="str_delay">
                <p>NAME</p>
                <hr />
            </div>
            <div id="line2" class="str_delay">
                <hr />
            </div>
            <div id="nameplate" class="str_delay">
                <p>Yu\w* (beta)</p>
            </div>
            <div id="line3" class="str_delay">
                <p>INTEREST</p>
                <hr />
            </div>
            <div id="line4" class="str_delay">
                <hr />
            </div>
            <div id="interest" class="str_delay">
                <p>Video Game</p>
                <p>Programming</p>
                <p>Illust</p>
                <p>Sound</p>
                <p></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
// for low width
// window.onload = () => {
//     if (window.innerWidth < 700) {
//         document.getElementById("dock").style.width = window.innerWidth + "px";
//     }
//     // console.log("width changed.");
// }

</script>

<style>
@import '../variables.css';
@import '../css/pf-grid.css';
</style>
