<template>
    <div class="product">
        <center style="opacity: 0.3;">ｵﾓｼﾛｲﾓﾉﾊ ﾅｲﾖ</center>
        <article id="product-box" v-for="prd in products" :key="prd.id">
            <h2 id="product-name">{{ prd.title }}</h2>
            <div id="deplicate-flex">
                <span id="image">
                    <img :src="prd.img" />
                </span>
                <span id="text">
                    <p>{{ prd.text }}</p>
                </span>
            </div>
        </article>
    </div>
</template>

<script>
//import axios from 'axios';
import firebase, { firestore, storage } from "firebase/app";
import "firebase/firestore";
// import "firebase/storage";

const products_store = firestore().collection("products");
// const ref = storage().ref("product-imgs");
// ref.child('img_pagetweeter.png').getDownloadURL().then((url) => {
//     console.log("img url: ", url);
// })


export default {
    data() {
        return {
            products: [
                {
                    id: 0,
                    title: "Loading",
                    text: "Please wait...",
                    text_alt: "",
                    img: ""
                }
            ]
        }
    },
    created: function() {
        this.getData();
    },
    methods: {
        getData: function () {
            products_store
                //.where("visible", "==", true)
                .orderBy("order")
                .get().then((querySnapshot) => {
                    this.products = [];
                    querySnapshot.forEach((doc) => {
                        this.products.push(doc.data());
                        //console.log(doc.id, "=>", doc.data());
                        //console.log(this.products);
                    });
                }).catch((error) => {
                    console.log("Error getting docs: ", error);
                    this.products =  [
                        {
                            id: "error",
                            title: "Loading Error"
                        }
                    ];
                });
            // axios.get('/json/products_data.json')
            //     .then(response => {
            //         this.products = response.data;
            //     })
            //     .catch(error => {
            //         console.log("json error");
            //     });

            //ファイルに直接アクセス用
            //this.products = require("../assets/json/products_data.json");
        }
    }
}
</script>

<style>
@import '../variables.css';
.product {
    margin: auto;
    max-width: 1200px;
    color: white;
}
#product-box {
    min-height: 400px;
    background-color: #111c;
    /* margin-bottom: 5px; */
    animation: fadeIn ease 1s, moving ease 1s forwards;
    transform: translateY(10%);
}
#deplicate-flex {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-around;
    padding: 10px;
}
#deplicate-flex > #image {
    flex: 1;
    display:  flex;
    min-width: 350px;
    min-height: 250px;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
}
#image > img {
    max-width: 350px;
    max-height: 250px;
    opacity: 0;
    animation: fade ease 2s forwards;
}
@keyframes fade {
    0% { opacity: 0; }
    100% { opacity: 1;}
}
#deplicate-flex > #text {
    flex: 1;
    min-width: 350px;
    text-align: center;
    color: #fdfdfd;
}

.product h2 {
    text-align: center;
    padding: 20px 0;
    border-bottom: solid #30c75d 1px;
}
.product h2:hover::before{
    position: absolute;
    margin-left: -30px;
    margin-top: 3px;
    content: "▷ ";
    animation: rot linear 1s infinite;
}
.product h2:hover::after{
    position: absolute;
    margin-left: 15px;
    margin-top: 3px;
    content: " ◁";
    animation: rot linear 1s infinite;
}
.product h2:hover{
    color: #30c75d;
}
@keyframes move1{
    100% { transform: translateX(0);}
}
</style>