<template>
  <div class="gallery">
    <ViewTitle text="Illust" v-show="isShowMain" />
    <!-- ソート用空間 -->
    <div class="sort-menu"></div>
    <!-- Main Box -->
    <div 
      class="wrap-box" 
      v-show="isShowMain"
      draggable="false"
    >
      <IllustBox 
        v-for="(pic, index) in pictures" 
        :key="pic.date"
        :pic="pic"
        :index="index"
        @click="clickImage"
      />
    </div>
    <!-- ロード中要素 -->
    <!-- Vueのenter/leaveトランジションが動いてくれないので属性のonOffで対応  -->
    <Loading
      v-show="isShowLoading"
      :loaded="loaded"
    />
    <!-- 画像拡大時のオーバーレイ -->
    <Overlay
      v-show="isShowOverlay"
      :pictures="pictures"
      :currentPos="selectImagePos"
      @changePos="setImagePos"
      @showMainBox="switchMainBox"
      @show="switchOverlay"
      @scroll="setScroll"
    />
  </div>
</template>

<script>
import ViewTitle from '@/components/ViewTitle'
import IllustBox from '@/components/Illust/IllustBox'
import Loading from '@/components/Illust/Loading'
import Overlay from "@/components/Illust/Overlay.vue"
// import axios from 'axios';
import { firestore } from "firebase/app";
import "firebase/firestore";
const gallery_store = firestore().collection("gallery");

export default {
  components: {
    ViewTitle,
    IllustBox,
    Loading,
    Overlay
  },
  data() {
    return {
      debug: process.env.NODE_ENV === 'development',
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
      loaded: false, // loading wrap end for anim
      isShowLoading: true, // is show loading wrap 
      isShowMain: false, // is show main box
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
          this.isShowLoading = false;
          this.switchMainBox(true);
        }, 500)
    });

    // window.addEventListener("resize", this.onresize);
  },
  beforeDestroy: function() {
    // window.removeEventListener("resize", this.onresize);
  },
  methods: {
    onresize: function() {
      // debounce案件
      // this.windowInnerWidth = window.innerWidth;
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
        this.pictures = require("../json/illust_data.json");
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

      this.switchMainBox(false);
    },
    switchMainBox: function(bool) {
      this.isShowMain = bool;
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
}
</style>
