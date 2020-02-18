<template>
<div>
    <div id="togglenav-button" @click="$emit('toggleClick')">
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewbox="0 0 32 32"
            height="32"
            width="32"
            id="svg-hmb" 
        >
            <line class="hmb" id="hmb-1" x1="6" y1="8" x2="26" y2="8"/>
            <line class="hmb" id="hmb-2" x1="6" y1="16" x2="26" y2="16"/>
            <line class="hmb" id="hmb-3" x1="6" y1="24" x2="26" y2="24"/>
            <animate class="hmbAnim" href="#hmb-1" attributeName="y1" to="24" dur="0.2s" begin="idenfinite" fill="freeze"/>
            <animate class="hmbAnim" href="#hmb-2" attributeName="opacity" to="0" dur="0.2s" begin="indefinite" fill="freeze"/>
            <animate class="hmbAnim" href="#hmb-3" attributeName="y1" to="8" dur="0.2s" begin="indefinite" fill="freeze"/>
            <animate class="hmbAnim" href="#hmb-1" attributeName="x1" to="8" dur="0.2s" begin="indefinite" fill="freeze"/>
            <animate class="hmbAnim" href="#hmb-1" attributeName="x2" to="24" dur="0.2s" begin="indefinite" fill="freeze"/>
            <animate class="hmbAnim" href="#hmb-3" attributeName="x1" to="8" dur="0.2s" begin="indefinite" fill="freeze"/>
            <animate class="hmbAnim" href="#hmb-3" attributeName="x2" to="24" dur="0.2s" begin="indefinite" fill="freeze"/>
            <!-- reverse -->
            <animate class="hmbAnimR" href="#hmb-1" attributeName="y1" to="8" dur="0.2s" begin="indefinite" fill="freeze"/>
            <animate class="hmbAnimR" href="#hmb-2" attributeName="opacity" to="1" dur="0.2s" begin="indefinite" fill="freeze"/>
            <animate class="hmbAnimR" href="#hmb-3" attributeName="y1" to="24" dur="0.2s" begin="indefinite" fill="freeze"/>
            <animate class="hmbAnimR" href="#hmb-1" attributeName="x1" to="6" dur="0.2s" begin="indefinite" fill="freeze"/>
            <animate class="hmbAnimR" href="#hmb-1" attributeName="x2" to="26" dur="0.2s" begin="indefinite" fill="freeze"/>
            <animate class="hmbAnimR" href="#hmb-3" attributeName="x1" to="6" dur="0.2s" begin="indefinite" fill="freeze"/>
            <animate class="hmbAnimR" href="#hmb-3" attributeName="x2" to="26" dur="0.2s" begin="indefinite" fill="freeze"/>
        </svg>
    </div>
    <div class="toggle-ul">
        <ul>
            <li v-for="navi in navigations" :key="navi.id" :id="navi.id">
                <router-link 
                    :to="navi.url" 
                    @click.native="$emit('navClick', navi.id)"
                    :class="{ activePage: navi.isPage }">
                    {{ navi.text }}
                </router-link>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
    props: {
        navigations: {
            type: Array,
            required: true
        },
        animated: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        animated: function() {
            if (this.animated) {
                let anim = document.querySelectorAll(".hmbAnim");
                anim.forEach(elem => {
                    elem.beginElement();
                });
            }
            else {
                let animR = document.querySelectorAll(".hmbAnimR");
                animR.forEach(elem => {
                    elem.beginElement();
                });
            }
        }
    }
}
</script>
<style>
.hmb{stroke:#fff;stroke-width:3px;stroke-linecap:round;stroke-linejoin:round}
#togglenav-button {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-left: 10px;
    /* border: white solid 1px; */
    width: 40px;
    height: 40px;
    border-radius: 10px;
    transition: all 0.25s;
}
#togglenav-button:hover {
    color: var(--main-orange);
}
.toggle-ul {
    filter:drop-shadow(-5px 5px 5px #000a);
    position: fixed;
    z-index: 2;
    right: 0;
    top: 60px;
    /* bottom: 0; */
    width: 250px;
    border-left: solid 1px #111;
    border-bottom: solid 1px #111;
    background: #111c;
    transform: translateX(104.0%);
    transition-duration: 200ms;
}
.toggle-ul[open] {
    transform: translateX(0);
}
.toggle-ul ul {
    margin: 0;
    padding: 0;
    display: inline-flex;
    flex-direction: column;
    width: inherit;
}
.toggle-ul li {
    height: 50px;
    width: 100%;
    list-style-type: none;
    border-top: solid  #111 1px;
    /* border-bottom: solid  #111 0px; */
}
.toggle-ul a:hover, #togglenav-button:hover {
    color: var(--main-orange);
    /* border-radius: 2px; */
    cursor: pointer;
}
</style>