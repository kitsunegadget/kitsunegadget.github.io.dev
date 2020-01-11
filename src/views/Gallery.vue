<template>
    <div class="gallery">
        <div class="sort-menu"></div>
        <div class="wrap-box">
            <article id="gallery-box" v-for="pic in pictures" :key="pic.date">
                <img :src="pic.img" class="image" @click="clickImage(pic)" />
            </article>
        </div>
        <div class="overlay" @click="clickOverlay" disable>
            <div class="picture-title">
                <h2>Loading...</h2>
            </div>
            <div class="picture-main">
                <div id="left-side">
                </div>
                <div id="picture">
                    <img id="overlay-image" src="" >
                </div>
                <div id="right-side">
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
            scrollPosition: {
                X: Number,
                Y: Number
            }
        }
    },
    created: function() {
        this.getData();
        window.addEventListener("resize", this.onresize);
    },
    destroyed: function() {
        window.removeEventListener("resize", this.onresize);
    },
    mounted: function() {
        let gallerybox = document.querySelectorAll("#gallery-box");
        if (window.innerWidth < 615)
        {
            gallerybox.forEach(elem => {
                elem.style.width = "99vw"
            });
        }
    },
    methods: {
        onresize: function() {
            let gallerybox = document.querySelectorAll("#gallery-box");
            if (window.innerWidth < 615)
            {
                gallerybox.forEach(elem => {
                    elem.style.width = "99vw"
                });
            } 
            else
            {
                gallerybox.forEach(elem => {
                    elem.style.width = "300px"
                });
            }
        },
        getData: function () {
            // axios.get('/json/gallery_data.json')
            //     .then(response => {
            //         this.products = response.data;
            //     })
            //     .catch(error => {
            //         console.log("json error");
            //     });

            //ローカルファイルに直接アクセス用
            this.pictures = require("../assets/json/gallery_data.json");
        },
        clickImage: function(picture) {
            let overlayImage = document.querySelector(".gallery #overlay-image");
            let pictureTitle = document.querySelector(".picture-title h2");
            overlayImage.setAttribute("src", picture.img);
            pictureTitle.innerText = picture.title;

            let overlay = document.querySelector(".gallery .overlay");
            let wrapbox = document.querySelector(".gallery .wrap-box");
            overlay.removeAttribute("disable");

            this.scrollPosition.X = window.scrollX;
            this.scrollPosition.Y = window.scrollY;
            wrapbox.style.display = "none";
        },
        clickOverlay: function() {
            let overlay = document.querySelector(".gallery .overlay");
            let wrapbox = document.querySelector(".gallery .wrap-box");
            overlay.setAttribute("disable","");
            //前回の画像が一瞬表示されるのを防ぐため、空にしておく
            let overlayImage = document.querySelector(".gallery #overlay-image");
            overlayImage.setAttribute("src", "");

            wrapbox.style.display = "flex";
            document.body.style.overflowY = "scroll";
            //スクロール位置を戻す前にsmoothを切る
            document.documentElement.style.scrollBehavior = ""
            window.scroll(this.scrollPosition.X, this.scrollPosition.Y);
            // console.log(this.scrollPosition.Y);
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
    animation: fadeIn ease 200ms;
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
}
.image {
    max-width: 100%;
    height: auto;
    animation: fadeIn ease 0.5s;
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
    width: 60px;
    margin-right: -60px;
}
.picture-main #right-side {
    max-height: calc(100vh - 10vh);
    max-width: 100vw;
    text-align: center;
    width: 60px;
    margin-left: -60px;
}
.close-button {
    margin-bottom: -60px;
    margin-top: 5px;
    text-align: center;
}
.fa-times {
    color: #fff;
    cursor: pointer;
    font-size: 3em;
    text-align: center;
    width: 50px;
}
.fa-times:hover {
    background: #fff4;
    border-radius: 50px;
    transition: ease 0.5s;
}

.picture-main #overlay-image {
    min-height: 100px;
    min-width: 100px;
    max-height: calc(100vh - 20vh);
    max-width: 100vw;
}
</style>