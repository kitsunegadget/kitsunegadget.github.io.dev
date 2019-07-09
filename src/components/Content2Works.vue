<template>
    <div id="works">
        <div class="content_2_dock">
            <div v-for="product in products" :key="product.id">
                <h2>{{ product.title }}</h2>
                <article>
                    <p>{{ product.text }}</p>
                    <p>{{ product.text_alt }}</p>
                </article>
            </div>
            <article id="end">
                <p>そのほかのProducts</p>
            </article>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [
                {
                    id: 0,
                    title: "Page Tweeter",
                    text: "Twitterボタンが無いページでも簡単にリンク共有できるようにした Google Chrome 拡張機能。",
                    text_alt: "A Chrome Extention. You can share any web page that no Tweet button."
                },
                {
                    id: 1,
                    title: "Quick Change Proxy",
                    text: "プロキシ接続をよりすばやくを目的にしたタスクトレイ常駐型のアプリケーション。",
                    text_alt: "This apprication purpose is Proxy change quickly."
                },
                {
                    id: 2,
                    title: "Orig Image View Link",
                    text: "Tweetdeck でオリジナルサイズの画像にワンタップでリンク出来るようにした Google Chrome 拡張機能。",
                    text_alt: "A Chrome Extention. You can see Orig size image link on Tweetdeck."
                },
                {
                    id: 3,
                    title: "",
                    text: "",
                    text_alt: ""
                }
            ]
        }
    }
}
</script>

<style>
/* #product{
    display: none;
} */
#works {
    background-color: #ddd;
    padding: 0.01em 0;
    /* display: none; */
}
#works h2:hover::before{
    position: absolute;
    margin-left: -30px;
    margin-top: 3px;
    content: "▷ ";
    animation: rot linear 1s infinite;
}
#works h2:hover{
    color: #3f3933;
}
#works #end{
    text-align: right;
    padding-right: 20px;
    transition: ease 1s;
}
#works #end p:hover{
    color: #3f3933;
}
#works #end p:hover::before{
    position: absolute;
    content: ">";
    margin-left: -15px;
    animation: move1 ease 0.5s forwards;
    transform: translateX(-10px);
}
#works #end p:hover::after{
    position: absolute;
    content: "<";
    margin-left: 5px;
    animation: move1 ease 0.5s forwards;
    transform: translateX(10px);
}
@keyframes move1{
    100% { transform: translateX(0);}
}
</style>

