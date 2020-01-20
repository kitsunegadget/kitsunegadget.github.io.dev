<template>
<div>
    <header>
        <div id="title">
            <h1><router-link to="/" @click.native="navClick(undefined)">Kitsune Gadget</router-link></h1>
        </div>    
        <div id=dummy>
        </div>
        <nav class="header-nav">
            <ul class="normal-ul">
                <li v-for="navi in navigations" :key="navi.id" :id="navi.id">
                    <router-link :to="navi.url" @click.native="navClick(navi.id)">
                        {{ navi.text }}
                    </router-link>
                </li>
            </ul>
            <!-- レスポンシブ用トグルメニュー -->
            <div id="togglenav-button" @click="toggleNavClick">
                <a><img src="../assets/bars_24.svg" height="30px"></a>
            </div>
            <div class="toggle-ul">
                <ul>
                    <li v-for="navi in navigations" :key="navi.id" :id="navi.id">
                        <router-link :to="navi.url" @click.native="navClick(navi.id)">
                            {{ navi.text }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
        
    </header>
    <div id="togglecover"></div>
</div>
</template>

<script>
export default {
    data() {
        return {
            navigations: [
                {
                    id: 0,
                    text: "PRODUCT",
                    url: "/product"
                },
                {
                    id: 1,
                    text: "GALLERY",
                    url: "/gallery"
                },
            ]
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
            changeState();
            let cover = document.querySelector("#togglecover");
            cover.addEventListener("click", () => {
                closeToggleCover();
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
            changeState();
        },
        onscroll() {
            closeToggleCover();
        },

        navClick(id){
            changeState(id);
            closeToggleCover();
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
        }
    }
}
function changeState(targetId){
    document.querySelectorAll(".header-nav .normal-ul li").forEach(elem => {
        elem.style.borderBottom = "solid #3330 2px";
    });
    if (targetId === undefined)
    {
        if (location.pathname === "/product") {
            document.querySelector(".header-nav .normal-ul li[id='0']").style.borderBottom = "solid #FFB74C 2px";
        }
        else if (location.pathname === "/gallery") {
            document.querySelector(".header-nav .normal-ul li[id='1']").style.borderBottom = "solid #FFB74C 2px";
        }
    } else {
        document.querySelector(".header-nav .normal-ul li[id='" + targetId + "']")
            .style.borderBottom = "solid #FFB74C 2px";
    }
    
}
function closeToggleCover(){
    let cover = document.querySelector("#togglecover");
    let status = document.querySelector(".toggle-ul");
    if (status.getAttribute("open") !== null){
        status.removeAttribute("open");
        cover.style.visibility= "hidden";
    }
}
</script>
<style>
@import '../variables.css';

header {
    position: relative;
    z-index: 2;
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
    margin: 0;
    padding: 0;
    display: inline-flex;
    height: inherit;
}
header nav .normal-ul[narrow] {
    display: none;
}
header nav .normal-ul li {
    width: 100px;
    list-style-type: none;
    border-bottom: solid  #3330 2px;
}
header nav a {
    /* router-linkがaタグに変わる */
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
    background: var(--main-orange);
}
#togglenav-button {
    margin-right: 10px;
    margin-left: 10px;
    /* border: white solid 1px; */
    width: 40px;
    height: 40px;
    border-radius: 5px;
}
.toggle-ul {
    filter:drop-shadow(-5px 5px 5px #000a);
    position: fixed;
    z-index: 1;
    right: 0;
    top: 60px;
    /* bottom: 0; */
    width: 250px;
    border-left: solid 1px #111;
    border-bottom: solid 1px #111;
    background: #111c;
    transform: translateX(100.5%);
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
.toggle-ul a:hover, #togglenav-button a:hover {
    background: var(--main-orange);
    /* border-radius: 2px; */
    cursor: pointer;
}
#togglecover {
    background: #0005;
    position: absolute;
    z-index: 1;
    visibility: hidden;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0
}
</style>