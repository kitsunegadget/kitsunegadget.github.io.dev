<template>
    <div class="product">
        <center style="opacity: 0.3;">ｵﾓｼﾛｲﾓﾉﾊ ﾅｲﾖ</center>
        <article id="product-box" v-for="prd in products" :key="prd.id">
            <h2 id="product-name">{{ prd.name }}</h2>
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
export default {
    data() {
        return {
            products: [
                {
                    id: 0,
                    name: "Page Tweeter",
                    text: "Twitterボタンが無いページでも簡単にリンク共有。Chrome 拡張機能。\
                        クリップボードにコピーやページタイトルのみコピー機能も。",
                    text_alt: "A Chrome Extention. You can share any web page that no Tweet button.",
                    img: require("../assets/product_imgs/img_pagetweeter.png")
                },
                {
                    id: 1,
                    name: "YouTube Viewing Tools",
                    text: "元々はチャット欄の高さ最大化の機能から始まった Chrome 拡張機能。\
                        現在は他にも音声の左右位置調整とスナップショット機能を追加。今後も機能を追加予定。",
                    text_alt: "",
                    img: require("../assets/product_imgs/img_yvt.png")
                },
                {
                    id: 2,
                    name: "Orig Image View Link",
                    text: "Tweetdeck でオリジナルサイズの画像にワンタップでリンク。Chrome 拡張機能。",
                    text_alt: "A Chrome Extention. You can see Orig size image link on Tweetdeck."
                },
                {
                    id: 3,
                    name: "Quick Change Proxy",
                    text: "プロキシ接続を簡単目的にしたタスクトレイ常駐型のアプリケーション。\
                        最大で４つのプロキシ情報を保存し、2クリックで切り替え。",
                    text_alt: "This apprication purpose is Proxy change quickly.",
                    img: require("../assets/product_imgs/img_qcp.png")
                },
                {
                    id: 4,
                    name: "Simple Multi Counter",
                    text: "シンプルな複数カウンターをまとめて管理。Android アプリ。Xamarin.Android ビルド。",
                    text_alt: "A android App. Simple Multiple Tally counter. Built at Xamarin.Android.",
                    img: require("../assets/product_imgs/img_smc.png")
                },
                {
                    id: 5,
                    name: "Tetris CLI",
                    text: "コンソールで動くシンプルテトリス。",
                    text_alt: "Simple Tetris game in Console Window.",
                    img: require("../assets/product_imgs/img_consoletetris.png")
                },
                {
                    id: 6,
                    name: "Reversi",
                    text: "四角いままのリバーシ。Built at Python with Tkinter.",
                    text_alt: "Square Reversi.",
                    img: require("../assets/product_imgs/img_reversi.png")
                },
                {
                    id: 7,
                    name: "Encoder Bridge",
                    text: "コマンドラインを弄らなくても、wav,mp3,aacの相互エンコードを\
                        lameとqaacを指定して簡単にブリッジするソフト。Electron ビルド。※ベータ版。",
                    text_alt: "wav, mp3, aac encode to easy connect to lame and qaac \
                        without Commandline. Build at Electron.",
                    img: require("../assets/product_imgs/img_encoderbridge.png")
                },
                {
                    id: 8,
                    name: "Developing...",
                    text: "This game is developing.",
                    text_alt: "",
                    img: require("../assets/product_imgs/img_dev1.png")
                },
            ]
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
    background-color: #1118;
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