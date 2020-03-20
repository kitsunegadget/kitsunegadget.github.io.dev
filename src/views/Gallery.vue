<template>
    <div class="gallery">
        <div class="sort-menu"></div>
        <div 
            class="wrap-box" 
            v-show="isWrapDisplay"
            draggable="false"
        >
            <article 
                id="gallery-box" 
                v-for="(pic, index) in pictures" 
                :key="pic.date"
                v-resize:[windowInnerWidth]
                @click="clickImage(index)"
            >
                <img 
                    v-imgSource:[pic.url]
                    class="image" 
                    width="300px"
                    draggable="false"
                    loading="lazy"
                    style="opacity: 0;"
                />
            </article>
        </div>
         <!-- Vueのenter/leaveトランジションが動いてくれないので属性のonOffで対応  -->
        <div 
            class="loading-wrap" 
            v-show="loadingDisplay"
        >
            <h2
                :complete="loaded">
                Loading
            </h2>
        </div>
        <!-- 画像拡大時のオーバーレイ -->
        <Overlay
            v-show="isShowOverlay"
            :pictures="pictures"
            :currentPos="selectImagePos"
            @changePos="setImagePos"
            @baseDisplay="switchWrapDisplay"
            @show="switchOverlay"
            @scroll="setScroll"
        />
    </div>
</template>

<script>
import Overlay from "@/components/Gallery/Overlay.vue"
import imgLoader from "@/modules/img-loader.js"
// import axios from 'axios';
import { firestore } from "firebase/app";
import "firebase/firestore";
const gallery_store = firestore().collection("gallery");

let imgLoad = new imgLoader();

export default {
    components: {
        Overlay
    },
    data() {
        return {
            debug: false,
            pictures: [
                {
                    "id": "",
                     "name": "",
                     "title": "",
                     "title_alt": "",
                     "url": "",
                     "tag": ""
                }
            ],
            loaded: false,
            loadingDisplay: true,
            isWrapDisplay: false,
            windowInnerWidth: window.innerWidth,

            isShowOverlay: false,
            scrollPosition: {
                X: 0,
                Y: 0
            },
            selectImagePos: 0
        }
    },
    created: function() {
        this.getData(this.debug).then(() => {
            this.loaded = true;
            setTimeout(() => {
                this.loadingDisplay = false;
                this.switchWrapDisplay(true);
            }, 500)
        });

        window.addEventListener("resize", this.onresize);
    },
    beforeDestroy: function() {
        window.removeEventListener("resize", this.onresize);
    },
    directives: {
        resize: {
            update: function(el) {
                // console.log("update");
                if(window.innerWidth < 615) {
                    el.style.width = "49vw";
                    el.style.height = "49vw"
                    el.style.marginLeft = "0";
                    el.style.marginBottom = "2px";
                }
                else {
                    el.style.width = "200px"
                    el.style.height = "calc(200px * 3/4)"
                    el.style.marginLeft = "2px";
                    el.style.marginBottom = "25px";
                }
            }
        },
        imgSource: {
            // 画像の読み込みができたら表示する
            inserted: function(el, binding) {
                // console.log("imgload", binding.arg);
                imgLoad.observe(el, binding.arg);
            }
        }
    },
    methods: {
        onresize: function() {
            // debounce案件
            this.windowInnerWidth = window.innerWidth;
        },
        getData: async function (debug=false) {
            if(!debug) {
                await Promise.all([
                    (async() => {
                        await new Promise((resolve) => {
                            gallery_store
                            .orderBy("date", "desc")
                            .get()
                            .then((query) => {
                                this.pictures = [];
                                query.forEach((doc) => {
                                    // タイムスタンプは配列なので文字列にする。
                                    // seconds情報しかないのでそれを使う
                                    this.pictures.push(doc.data());
                                    this.pictures[this.pictures.length - 1].date 
                                        = doc.data().date.seconds;
                                    //console.log(doc.data());
                                });
                                resolve("pictureOnLoad"); 
                            })
                            .catch((error) => {
                                console.log("Error geting docs: ", error);
                                this.pictures = [
                                    {
                                        date: "error",
                                        title: "Loading Error"
                                    }
                                ]
                            });
                        });
                    })()
                    // Promis.all内に()での無名関数で記述する際は
                    // 最後にも関数としての()がないと動かないので注意
                ]);
            }
            else {
                //ローカルファイルでのテスト・デバッグ用
                this.pictures = require("../json/gallery_data.json");
            }
            // axios.get('/json/gallery_data.json')
            //     .then(response => {
            //         this.products = response.data;
            //     })
            //     .catch(error => {
            //         console.log("json error");
            //     });
        },
        clickImage: function(index) {
            this.selectImagePos = index;
            this.switchOverlay(true);

            this.scrollPosition.X = window.scrollX;
            this.scrollPosition.Y = window.scrollY;

            this.switchWrapDisplay(false);
        },
        switchWrapDisplay: function(bool) {
            this.isWrapDisplay = bool;
        },
        switchOverlay: function(bool) {
            this.isShowOverlay = bool;
        },
        setScroll: function() {
            //スクロール位置を戻す前にsmoothを切る
            document.documentElement.style.scrollBehavior = ""
            window.scroll(this.scrollPosition.X, this.scrollPosition.Y);
        },
        setImagePos: function(n) {
            this.selectImagePos = n;
        }
    }
}
</script>

<style lang="scss">
.gallery {
    margin: auto;
    max-width: 1200px;
    min-height: 544px;
    width: 100vw;
    color: white;
}
.wrap-box {
    display: flex;
    flex-flow: row wrap;
    margin-top: 5px;
    margin-bottom: 5px;
    justify-content: space-evenly;
    /* align-content: space-between; */

    #gallery-box {
        @include flex-centering;
        flex: none;
        margin: 2px; 
        border-radius: 25px;
        background-color: #111c;
        overflow: hidden;
        width: 300px;
        height: 180px;
        cursor: pointer;
        opacity: 0;
        animation: gly-fade-in ease .5s forwards;
    }

    .image {
        /* max-width: 100%;
        height: auto; */
        width: 100%;
        height: 100%;
        object-fit: scale-down;
        transition: opacity .5s ease-in-out;
    }
}
.loading-wrap {
    @include flex-centering;
    height: 50px;
    width: 100%;
    min-width: 320px;
    background: #0005;
    padding: 5px;
    border-radius: 10px;
    /* animation: startLoading ease .5s forwards; */
    /* transition: all .5s; */

    > h2 {
        animation: startLoadingLiteral ease 500ms forwards;

        &::before {
            position: absolute;
            left: -100px;
            content: '・・・';
            font-size: 1.2em;
            animation: rot linear 1s infinite;
        }
        &::after {
            position: absolute;
            right: -100px;
            content: '・・・';
            font-size: 1.2em;
            animation: rot linear 1s infinite;
        }
        &[complete] {
            animation: endLoading ease 600ms forwards;
        }
    }
}

@keyframes gly-fade-in {
    0% { opacity: 0; }
    100% { opacity: 1;}
}
@keyframes startLoading {
    0% {
        transform: scaleY(0);
    }
    100% {
        transform: scaleY(1);
    }
}
@keyframes startLoadingLiteral {
    0% {
        opacity: 0;
        transform: translateX(-50%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
@keyframes endLoading {
    100% { 
        opacity: 0;
        transform: translateX(50%);
    }
}
</style>