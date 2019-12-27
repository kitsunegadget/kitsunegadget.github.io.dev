<template>
    <div class="gallery">
        <div class="sort-menu"></div>
        <div class="wrap-box">
            <article id="gallery-box" v-for="pic in pictures" :key="pic.id">
                <img :src="pic.img" class="image" />
            </article>
        </div>
        <div class="overlay">
            <div id="close-button"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            pictures: [
                {
                    id: 0,
                    name: "Loading",
                    text: "Please wait...",
                    text_alt: "",
                    img: "../assets/bg2.png",
                    date: "",
                    tag: "",
                }
            ]
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
                elem.style.width = "100vw"
            });
        }
    },
    methods: {
        onresize: function() {
            let gallerybox = document.querySelectorAll("#gallery-box");
            if (window.innerWidth < 615)
            {
                gallerybox.forEach(elem => {
                    elem.style.width = "100vw"
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

            //現在はファイルに直接アクセス、将来的にはAPIで接続するべき？
            this.pictures = require("../assets/json/gallery_data.json");
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
    animation: fadeIn ease 1s, moving ease 1s forwards;
    transform: translateY(10%);
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
}
.image {
    max-width: 100%;
    height: auto;
}
</style>