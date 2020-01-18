<template>
    <div class="gallery">
        <div class="sort-menu"></div>
        <div class="wrap-box" v-show="wrapDisplay">
            <article id="gallery-box" v-for="(pic, index) in pictures" :key="pic.date">
                <img :id="index" :src="pic.url" class="image" @click="clickImage(pic, $event)" />
            </article>
        </div>
        <div class="overlay" @click="clickOverlay" disable>
            <div class="picture-title">
                <h2>Loading...</h2>
            </div>
            <div class="picture-main">
                <div id="left-side" @click.stop="prev()">
                    <i class="fas fa-arrow-left" v-show="isActiveLeftButton"></i>
                </div>
                <div id="picture">
                    <img id="overlay-image" src="" draggable="true">
                </div>
                <div id="right-side" @click.stop="next()">
                    <i class="fas fa-arrow-right" v-show="isActiveRightButton"></i>
                </div>
            </div>
            <div class="close-button">
                <i class="fas fa-times"></i>
            </div>
        </div>
        <div class="loading-box"></div>
    </div>
</template>

<script>
// import axios from 'axios';
import firebase, { firestore } from "firebase/app";
import "firebase/firestore";
const gallery_store = firestore().collection("gallery");

export default {
    data() {
        return {
            pictures: [
                {
                    date: 0,
                    title: "Loading...",
                    img: "",
                    tag: "",
                    thumPoint: "up"
                }
            ],
            wrapDisplay: true,
            isActiveLeftButton: true,
            isActiveRightButton: true,
            scrollPosition: {
                X: Number,
                Y: Number
            },
            currentImagePos: Number,
        }
    },
    created: function() {
        // this.getData().then(() => {
        //     this.changeBoxSize();
        // });
        this.getData(true).then(() => {
            this.changeBoxSize();
        }); //デバッグ用。ビルド時に入れ替え。
        window.addEventListener("resize", this.onresize);
    },
    destroyed: function() {
        window.removeEventListener("resize", this.onresize);
    },
    mounted: function() {
        this.changeBoxSize();
    },
    methods: {
        onresize: function() {
            this.changeBoxSize();
        },
        changeBoxSize: function () {
            let gallerybox = document.querySelectorAll("#gallery-box");
            let wrapbox = document.querySelector(".wrap-box");
            if (window.innerWidth < 615)
            {
                gallerybox.forEach(elem => {
                    elem.style.width = "49vw"
                    elem.style.height = "49vw"
                    elem.style.marginLeft = "0";
                });
                wrapbox.style.justifyContent = "space-around";
            } 
            else
            {
                gallerybox.forEach(elem => {
                    elem.style.width = "300px"
                    elem.style.height = "180px"
                    elem.style.marginLeft = "2px";
                });
                wrapbox.style.justifyContent = "center";
            }
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
                                        = doc.data().date.seconds;;
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
        clickImage: function(picture, event) {
            let overlayImage = document.querySelector(".gallery #overlay-image");
            let pictureTitle = document.querySelector(".picture-title h2");
            overlayImage.setAttribute("src", picture.url);
            pictureTitle.innerText = picture.title;

            let overlay = document.querySelector(".gallery .overlay");
            let wrapbox = document.querySelector(".gallery .wrap-box");
            overlay.removeAttribute("disable");

            this.scrollPosition.X = window.scrollX;
            this.scrollPosition.Y = window.scrollY;
            //this.wrapDisplay = false; こっちだとなぜかスクロールが戻らなかった
            wrapbox.style.display = "none";

            //console.log(event.target.id, this.pictures.length);
            this.currentImagePos = parseInt(event.target.id);
            this.switchSideButton();
        },
        clickOverlay: function() {
            let overlay = document.querySelector(".gallery .overlay");
            let wrapbox = document.querySelector(".gallery .wrap-box");
            overlay.setAttribute("disable","");
            //前回の画像が一瞬表示されるのを防ぐため、空にしておく
            let overlayImage = document.querySelector(".gallery #overlay-image");
            overlayImage.setAttribute("src", "");

            //this.wrapDisplay = true; こっちだとなぜかスクロールが戻らなかった
            wrapbox.style.display = "flex";
            document.body.style.overflowY = "scroll";
            //スクロール位置を戻す前にsmoothを切る
            document.documentElement.style.scrollBehavior = ""
            window.scroll(this.scrollPosition.X, this.scrollPosition.Y);
            // console.log(this.scrollPosition.Y);
        },
        prev: function() {
            if(this.currentImagePos > 0) {
                this.currentImagePos--;
                this.transitionImage();
                this.switchSideButton();
            }
        },
        next: function() {
            if(this.currentImagePos < this.pictures.length - 1) {
                this.currentImagePos++;
                this.transitionImage();
                this.switchSideButton();
            }
        },
        transitionImage: function() {
            let overlayImage = document.querySelector(".gallery #overlay-image");
            let pictureTitle = document.querySelector(".picture-title h2");
            overlayImage.style.opacity = "0";
            window.setTimeout(() => { //トランジションのためのタイムアウト
                overlayImage.setAttribute("src", this.pictures[this.currentImagePos].url);
                pictureTitle.innerText = this.pictures[this.currentImagePos].title;
                overlayImage.style.opacity = "1";
            }, 250);
        },
        switchSideButton: function() {
            if (this.currentImagePos === 0) {
                this.isActiveLeftButton = false;
            } else {
                this.isActiveLeftButton = true;
            }
            if (this.currentImagePos + 1 === this.pictures.length) {
                this.isActiveRightButton = false;
            } else {
                this.isActiveRightButton = true;
            }
        }
    }
}
</script>

<style>
@import '../variables.css';
.gallery {
    margin: auto;
    max-width: 1200px;
    color: white;
}
.wrap-box {
    display: flex;
    margin-top: 5px;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    /* transform: translateY(0.05%); */
}
#gallery-box {
    flex: none;
    display: flex;
    margin: 2px; 
    border-radius: 15px;
    background-color: #111c;
    overflow: hidden;
    width: 300px;
    height: 180px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    animation: fade ease 300ms forwards;
}
.image {
    max-width: 100%;
    height: auto;
    animation: fade ease 300ms;
}
@keyframes fade {
    0% { opacity: 0; }
    100% { opacity: 1;}
}
.overlay {
    background: #0009;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: fadeIn ease 200ms;
}
.overlay[disable] {
    display: none;
}
.picture-title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 75px;
    text-align: center;
    background: #000a;
    animation: moving ease 0.5s forwards;
    transform: translateY(-50%);
    overflow: hidden;
}

.picture-main {
    display: flex;
}
.picture-main #left-side {
    position: absolute;
    top: 75px;
    left: 0;
    bottom: 75px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}
.picture-main #left-side:active {
    background: #fff2;
}
.fa-arrow-left {
    margin-bottom: 20px;
    font-size: 1.5em;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background: #3334;
}
.picture-main #right-side {
    position: absolute;
    top: 75px;
    right: 0;
    bottom: 75px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}
.picture-main #right-side:active {
    background: #fff2;
}
.fa-arrow-right {
    margin-bottom: 20px;
    font-size: 1.5em;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background: #3334;
}
.close-button {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    /* margin-bottom: -60px;
    margin-top: 5px; */
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.fa-times {
    color: #fff;
    cursor: pointer;
    font-size: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
}
.fa-times:hover {
    background: #fff4;
    border-radius: 50px;
    transition: ease 0.5s;
}

.picture-main #overlay-image {
    min-height: 100px;
    min-width: 100px;
    max-height: calc(100vh - 25vh);
    max-width: 100vw;
    transition: all 250ms ease-out;
}
</style>