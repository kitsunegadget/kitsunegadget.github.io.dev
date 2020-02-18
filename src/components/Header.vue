<template>
    <header>
        <div id="title">
            <h1>
                <router-link 
                    to="/" @click.native="navClick(undefined)">
                    Kitsune Gadget
                </router-link>
            </h1>
        </div>    
        <div id=dummy>
        </div>
        <nav class="header-nav">
            <ul class="normal-ul">
                <div class="ul-wrap">
                    <div 
                        id="selectionBar" 
                        :style="{ transform: selectionBarTransform }"
                    />
                    <li 
                        v-for="navi in navigations" 
                        :key="navi.id" 
                        :id="navi.id">
                        <router-link 
                            :to="navi.url" 
                            @click.native="navClick(navi.id)"
                            :class="{ activePage: navi.isPage }">
                            {{ navi.text }}
                        </router-link>
                    </li>
                </div>
            </ul>
            <!-- レスポンシブ用トグルメニュー -->
            <ToggleMenu
                :navigations=navigations
                :animated=togglenavAnimated
                @toggleClick="toggleNavClick"
                @navClick="navClick"
            />
        </nav>
        <div id="togglecover"/>
    </header>
</template>

<script>
import ToggleMenu from "./ToggleMenu.vue";

export default {
    components: {
        ToggleMenu
    },
    data() {
        return {
            navigations: [
                {
                    id: 0,
                    text: "BIO",
                    url: "/bio",
                    isPage: false
                },
                {
                    id: 1,
                    text: "PRODUCT",
                    url: "/product",
                    isPage: false
                },
                {
                    id: 2,
                    text: "GALLERY",
                    url: "/gallery",
                    isPage: false
                },
            ],
            togglenavAnimated: false,
            selectionBarTransform: ""
        }
    },
    created() {
        window.addEventListener("load", this.onload);
        window.addEventListener("popstate", this.onpopstate);
        window.addEventListener("resize", this.onresize);
        document.addEventListener("scroll", this.onscroll);
    },
    methods: {
        onload() {
            this.changeState();
            let cover = document.querySelector("#togglecover");
            cover.addEventListener("click", () => {
                this.closeToggleCover();
            });
            let headernav = document.querySelector(".header-nav");
            let normalul = document.querySelector(".normal-ul");
            if (headernav.scrollWidth < 300)
            {
                headernav.setAttribute("narrow", "");
                normalul.setAttribute("narrow", "");
            }
        },
        onresize() {
            let headernav = document.querySelector(".header-nav");
            let normalul = document.querySelector(".normal-ul");
            if (headernav.scrollWidth < 300)
            {
                headernav.setAttribute("narrow", "");
                normalul.setAttribute("narrow", "");
            } else {
                headernav.removeAttribute("narrow");
                normalul.removeAttribute("narrow");
            }
        },
        onpopstate() {
            this.changeState();
        },
        onscroll() {
            this.closeToggleCover();
        },

        navClick(id){
            this.changeState(id);
            this.closeToggleCover();
        },
        toggleNavClick(){
            let cover = document.querySelector("#togglecover");
            let status = document.querySelector(".toggle-ul");
            if (status.getAttribute("open") === null){
                status.setAttribute("open", "");
                cover.style.visibility = "visible";
            }
            else {
                status.removeAttribute("open");
                cover.style.visibility= "hidden";
            }
            this.togglenavAnimated = !this.togglenavAnimated;
        },
        closeToggleCover(){
            let cover = document.querySelector("#togglecover");
            let status = document.querySelector(".toggle-ul");
            if (status.getAttribute("open") !== null){
                status.removeAttribute("open");
                cover.style.visibility= "hidden";
            }
            this.togglenavAnimated = false;
        },
        changeState(targetId){
            this.navigations.forEach((elem)=>{
                this.$set(
                    elem,
                    "isPage", 
                    false
                );
            });
            // reset transform
            this.$set(
                this.$data,
                "selectionBarTransform", 
                "translateX(" + -100 + "%) scaleX("+ 0 +")"
            );

            let barWidth = 1 / this.navigations.length;
            let leftPos = - barWidth * 100;
            if (targetId === undefined)
            {
                // 直接ロケーションは一度ルートに戻ってから自動遷移するので
                // ステート位置保持のため
                if (location.pathname === "/bio") {
                    leftPos += barWidth * 100 * 0;
                    this.$set(
                        this.$data,
                        "selectionBarTransform", 
                        "translateX(" + leftPos + "%) scaleX("+ barWidth +")"
                    );
                    this.$set(
                        this.navigations[0],
                        "isPage", 
                        true
                    );
                }
                else if (location.pathname === "/product") {
                    leftPos += barWidth * 100 * 1;
                    this.$set(
                        this.$data,
                        "selectionBarTransform", 
                        "translateX(" + leftPos + "%) scaleX("+ barWidth +")"
                    );
                    this.$set(
                        this.navigations[1],
                        "isPage", 
                        true
                    );
                }
                else if (location.pathname === "/gallery") {
                    leftPos += barWidth * 100 * 2;
                    this.$set(
                        this.$data,
                        "selectionBarTransform", 
                        "translateX(" + leftPos + "%) scaleX("+ barWidth +")"
                    );
                    this.$set(
                        this.navigations[2],
                        "isPage", 
                        true
                    );
                }
            } else {
                leftPos += barWidth * 100 * targetId;
                this.$set(
                    this.$data,
                    "selectionBarTransform", 
                    "translateX(" + leftPos + "%) scaleX("+ barWidth +")"
                );
                this.$set(
                    this.navigations[targetId],
                    "isPage", 
                    true
                );
            }
        }
    }
}
</script>
<style>
@import '../variables.css';

header {
    /* position: relative; */
    /* z-index: 0; */
    display: inline-flex;
    min-width: 100%;
    height: 60px;
    /* background-color: var(--main-black); */
}

header #dummy {
    flex: 1;
}

#title {
    flex: 1;
    margin: 0 20px;
    line-height: 3.5em;
    min-width: 300px;
    /* text-align: center; */
    color: var(--main-orange);  
}
#title > h1 {
    margin: 0;
    font-size: 1.5em;
}
h1 a {
    color: inherit;
    text-decoration: none;
}

header nav {
    flex: 1;
    display: flex;
    text-align: right;
    align-items: center;
    justify-content: flex-end;
    height: inherit;
    margin-left: -40px;
}
header nav[narrow] {
    justify-content: flex-end;
}
header nav .normal-ul {
    position: relative;
    margin: 0;
    padding: 0;
    display: flex;
    flex: 1 1 auto;
    justify-content: flex-end;
    height: inherit;
}
header nav .normal-ul[narrow] {
    display: none;
}
.ul-wrap {
    position: absolute;
    right: 0;
    display: flex;
    height: 100%;
}
header nav .normal-ul #selectionBar {
    position: absolute;
    height: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: solid 2px var(--main-orange);
    transition: transform ease 0.5s;
    transform: translateX(-100%) scaleX(0);
    border-bottom-width: 2px;
}
header nav .normal-ul .ul-wrap li {
    width: 100px;
    list-style-type: none;
    border-bottom: solid  #3330 2px;
}
header nav a {
    /* router-linkがaタグに変わる */
    position: relative;
    padding: 0 5px;
    color: white;
    font-weight: bold;
    text-decoration:  none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    transition: all ease-out 250ms;
}
header nav a:hover {
    color: var(--main-orange);
}
.activePage {
    color: #FFB74C;
}
#togglecover {
    background: #0005;
    position: absolute;
    z-index: 2;
    visibility: hidden;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0
}
</style>