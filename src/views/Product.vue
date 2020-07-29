<template>
  <div class="product">
    <ViewTitle text="Product" />
    <center style="opacity: 0.3;">ｵﾓｼﾛｲﾓﾉﾊ ﾅｲﾖ</center>
    <div 
      class="product-wrap"
      v-if="isShowWrap"
    >
      <ProductBox 
        class="product-box" 
        v-for="prd in products" 
        :key="prd.id"
        :prd="prd"
      />
    </div>

    <div 
      class="loading-box product-box"
      v-show="isShowLoading"
      v-opacity:[loaded]
    >
      <h3 id="product-name">
        {{ loadingTitle }}
      </h3>
      <span id="text">
        <p>{{ loadingText }}</p>
      </span>
    </div>
  </div>
</template>

<script>
import ViewTitle from '@/components/ViewTitle'
import ProductBox from '@/components/ProductBox'
//import axios from 'axios';
import { firestore, /* storage */ } from "firebase/app";
import "firebase/firestore";
// import "firebase/storage";

const products_store = firestore().collection("products");
// const ref = storage().ref("product-imgs");
// ref.child('img_pagetweeter.png').getDownloadURL().then((url) => {
//     console.log("img url: ", url);
// })

export default {
  components: {
    ViewTitle,
    ProductBox
  },
  data() {
    return {
      debug: process.env.NODE_ENV === 'development',
      loadingTitle: "Loading ...",
      loadingText: "Please wait.",
      products: [
        {
          id: 0,
          title: "Loading ...",
          text: "Please wait.",
          text_alt: "",
          // img: ""
        }
      ],
      loaded: false, // loading end for anim
      isShowWrap: false,
      isShowLoading: true,
      windowInnerWidth: 0,
    }
  },
  created: function() {
    this.getData(this.debug).then(() => {
      // console.log("loaded");
      this.loaded = true;
      setTimeout(() => {
        this.isShowLoading = false;
        this.isShowWrap = true;
      }, 1000);
    });

    // window.addEventListener("resize", this.onresize);
  },
  mounted: function() {
    // this.onResize();
  },
  beforeDestroy: function() {
    // window.removeEventListener("resize", this.onresize);
  },
  directives: {
    opacity: {
        update: function(el, binding) {
          if(binding.arg === true && el.style.opacity === "") {
          // console.log(binding.arg)
          setTimeout(() => {
            el.style.opacity = "0";
          }, 600);
        }
      }
    }
  },
  methods: {
    onresize: function() {
      // need debounce
      // this.windowInnerWidth = window.innerWidth;
    },
    getData: async function (debug=false) {
      if(!debug) { 
        return products_store
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
            this.loadingTitle = "Loading Error";
            this.loadingText = "Error occured.";
          });
      } 
      else {
        //ローカルファイルにアクセス
        this.products = require("../json/test_products_data.json");
      }
      // axios.get('/json/products_data.json')
      //     .then(response => {
      //         this.products = response.data;
      //     })
      //     .catch(error => {
      //         console.log("json error");
      //     });
    }
  }
}
</script>

<style lang="scss">
.product {
  margin: 0 auto;
  max-width: 1200px;
  min-height: 544px;
  width: 100vw;
  color: white;

  h3 {
    /* text-align: center; */
    line-height: 1.6em;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 20px;
    /* background: #adf5ff; */
    border-bottom: dashed $green 1px;
    border-top: dashed $green 1px;
    font-size: 1.15rem;

    a:hover {
      color: $green;

      &::before {
        position: absolute;
        margin-left: -15px;
        margin-top: 2px;
        content: "▲ ";
        font-size: 0.7rem;
        /* transform: rotateZ(90deg); */
        animation: pd-rotate linear 1s infinite;
      }
      // &::after{
      //     position: absolute;
      //     margin-left: 15px;
      //     margin-top: 3px;
      //     content: " ◁";
      //     animation: rot linear 1s infinite;
      // }
    }
  }
}
.product-wrap {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  /* align-content: center; */
  /* align-items: stretch; */
  transition: opacity .5s;
}
.product-box {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* align-items: center; */
  width: 350px;
  height: 350px;
  margin: 5px;
  border-radius: 25px;
  overflow: hidden;
  background-color: #111c;
  animation: pd-fade-in ease .5s;
  /* transform: translateY(10%); */

  @media (max-width: 615px) {
    width: 100vw;
  }

  > h3 {
    margin: 0;
    height: 30px;
    cursor: default;
  }

  #image {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    transition: opacity .5s ease-in-out;
  }

  #text {
    font-size: 0.95rem;
    margin-top: -8px;
    padding-left: 20px;
    width: 90%;
    /* text-align: center; */
    color: #fdfdfd;
  }
}
.loading-box {
  margin: auto;
  justify-content: center;
  transition: opacity .5s;
}

@keyframes pd-fade-in {
  0% { opacity: 0; }
  100% { opacity: 1;}
}
@keyframes pd-rotate {
  100% { transform: rotateY(360deg);}
}
</style>