<template>
    <header>
        <div id="title">
            <h1>
                <router-link 
                    to="/" 
                    @click.native="navClick(undefined)">
                    Kitsune Gadget
                </router-link>
            </h1>
        </div>    
        <div id=dummy>
        </div>
        <nav class="header-nav" draggable="true">
            <ul 
                class="normal-ul"
                :narrow="narrowNormalUl">
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
                :navigations="navigations"
                :buttonAnimated="toggleButtonAnimated"
                :navOpened="toggleNavOpened"
                @buttonClick="toggleButtonClick"
                @navClick="navClick"
            />
        </nav>
        <div 
            id="togglecover" 
            :style="{ visibility: toggleCoverVisibility }"
            @click="closeToggleCover"
        />
    </header>
</template>

<script>
import ToggleMenu from "./Header/ToggleMenu.vue";

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
            toggleButtonAnimated: false,
            toggleNavOpened: false,
            selectionBarTransform: "",
            toggleCoverVisibility: "hidden",

            narrowNormalUl: false
        }
    },
    created() {
        window.addEventListener("popstate", this.onpopstate);
        window.addEventListener("resize", this.onresize);
        document.addEventListener("scroll", this.onscroll);
    },
    mounted() {
        this.changeStateOnLoad();
        this.onresize();
    },
    beforeDestroy() {
        // headerコンポーネントの削除はしないが、リスナ削除はとりあえず書いておく
        window.removeEventListener("popstate", this.onpopstate);
        window.removeEventListener("resize", this.onresize);
        document.removeEventListener("scroll", this.onscroll);
    },
    methods: {
        onresize: function() {
            // リサイズ発火頻度は多いのでlodash _.debounceを利用するのも検討
            if (window.innerWidth < 800)
            {
                this.narrowNormalUl = true;
            } 
            else {
                this.narrowNormalUl = false;
            }
        },
        onpopstate() {
            this.changeState();
        },
        onscroll() {
            // スクロール中何度も実行されるため
            // toggleNavOpened条件で1回のみトリガーさせる検討
            if (this.toggleNavOpened) {
                this.closeToggleCover();
            }
        },

        navClick(id){
            this.changeState(id);
            this.closeToggleCover();
        },
        toggleButtonClick(){
            if (this.toggleNavOpened){
                this.toggleNavOpened = false;
                this.toggleButtonAnimated = false;
                this.toggleCoverVisibility = "hidden";
            }
            else {
                this.toggleNavOpened = true;
                this.toggleButtonAnimated = true;
                this.toggleCoverVisibility = "visible";
            }
        },
        closeToggleCover(){
            this.toggleNavOpened = false;
            this.toggleButtonAnimated = false;
            this.toggleCoverVisibility = "hidden";
        },
        changeState(targetId){
            // reset isPage
            this.navigations.forEach((elem)=>{
                elem.isPage = false;
            });
            // reset transform
            this.selectionBarTransform = "translateX(" + -100 + "%) scaleX("+ 0 +")";

            if (targetId !== undefined) {
                let barWidth = 1 / this.navigations.length;
                let leftPos = - barWidth * 100;

                leftPos += barWidth * 100 * targetId;
                this.selectionBarTransform = 
                    "translateX(" + leftPos + "%) scaleX("+ barWidth +")"
                this.navigations[targetId].isPage = true;
            }
        },
        changeStateOnLoad() {
            // githubPagesでの直接ロケーションは
            // 一度ルートに戻ってから自動遷移するので
            // パスごとのステート位置保持のため
            if (location.pathname === "/bio") {
                this.changeState(0);
            }
            else if (location.pathname === "/product") {
                this.changeState(1);
            }
            else if (location.pathname === "/gallery") {
                this.changeState(2);
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