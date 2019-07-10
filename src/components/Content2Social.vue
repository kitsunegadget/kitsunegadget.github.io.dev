<template>
    <div id="social">
        <div class="content-2-dock">
            <h3 id="social-title">Links</h3>
            <ul>
                <li v-for="social in socials" :key="social.id">
                    <a :href="social.url" target="_blank" rel="noopener">
                        <img :src="social.img" height="64" width="64">
                    </a>
                </li>
            </ul>
            <nav id="nav">
                <p>
                    <a href="http://www.nicovideo.jp/user/53050562" target="_blank"></a>
                </p>
                <p>
                    <a></a>
                </p>
                <p>
                    <a href="https://kitsune-gadget.hatenablog.com" target="_blank"></a>
                </p>
                <p>
                    <a></a>
                </p>

            </nav>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            socials: [
                {
                    id: 0,
                    url: "https://twitter.com/kitsunegadget",
                    img: require("../assets/social_imgs/Twitter_Social_Icon_Circle_White.svg")
                },
                {
                    id: 1,
                    url: "https://github.com/kitsunegadget",
                    img: require("../assets/social_imgs/GitHub-Mark-Light-120px-plus.png")
                },
                {
                    id: 2,
                    url: "https://kitsune-gadget.hatenablog.com",
                    img: require("../assets/social_imgs/hatenablog-logo-fff.svg")
                },
                {
                    id: 3,
                    url: "https://soundcloud.com/kitsunegadget",
                    img: require("../assets/social_imgs/white_transparent_64.png")
                }
            ]
        }
    }
}
</script>

<style>
@import '../css/social.css';
</style>
