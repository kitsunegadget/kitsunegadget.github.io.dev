<template>
    <div id="app">
        <div id="bg"></div>
        <Header />
        <div class="fixed-spacing"></div>
        <router-view />
        <Footer />
        <div class="pageup-button" @click="pageUp">
            <i class="fas fa-angle-up upcolor"></i>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import "firebase/auth";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "app",
    components: {
        Header,
        Footer
    },
    created: function(){
        window.addEventListener("scroll", this.onScroll);
        this.autoAuthFirebase();
    },
    methods: {
        onScroll: function() {
            let upButton = document.querySelector(".pageup-button");
            if(window.scrollY >= 450){
                upButton.setAttribute("fading", "");
            }
            else {
                upButton.removeAttribute("fading");
            }
        },
        pageUp: function() {
            //console.log(window.navigator.userAgent);
            //scroll-behavier はSafariとIEが対応してないので振り分け
            //IEはしらん…Edgeは今後Chrominumベースになるので対応はしない
            let userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.indexOf("chrome") != -1){
                //動かすときにscrollBehaviorをSmooth
                document.documentElement.style.scrollBehavior = "smooth";
                window.scrollBy(0, -window.scrollY);
            }
            else if (userAgent.indexOf("safari") != -1){
                let i=1,j=1;
                let interval = setInterval(() => {
                    if(window.scrollY < i) {
                        window.scrollBy(0, -window.scrollY);
                        clearInterval(interval);
                    }
                    else {
                        window.scrollBy(0, -i);
                        i = j * 1.001;
                        j++;
                    }
                    // console.log(i);
                }, 10);
            }
            else {
                document.documentElement.style.scrollBehavior = "smooth";
                window.scrollBy(0, -window.scrollY);
            }
        },
        autoAuthFirebase: function() {
            firebase.auth().signInAnonymously()
                .catch((error) => {
                    console.log("Anonymous signIn error...", error);
                });
            firebase.auth().onAuthStateChanged((user) => {
                //console.log(user.uid);
            });
        }
    }
};
</script>

<style>
@import './css/all.css';
:root {
    /* scroll-behavior: auto; */
}

body {
    margin: 0;
    padding: 0;
    /* height: 100%; */
    background-color: #222;
    overflow-y: scroll;
    overflow-x: hidden; 
}

#app {
    display: flex;
    flex-direction: column;
    /* position: absolute;
    top: 0;
    left: 0;
    right: 0; */
    /* width: 100%; */
    min-height: 100%;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#bg {
    background: url(./assets/bg2.png) no-repeat fixed;
    background-size: cover;
    background-position-x: right;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.5;
}

.fixed-spacing {
    height: 0px;
}
.pageup-button {
    position: fixed;
    right: 10px;
    bottom: 10px;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background: #000b;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.5s ease 0.05s;
    pointer-events: none;
}
.pageup-button[fading] {
    pointer-events: auto;
    opacity: 1;
}
.upcolor {
    font-size: 30px;
    color: #fff;
}

/* .content-1{
    background-color: #333; 
} */
</style>
