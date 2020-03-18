<template>
    <div class="social">
        <ul>
            <li 
                v-for="social in socials" 
                :key="social.id">
                <a 
                    :href="social.url" 
                    target="_blank" 
                    rel="noopener">
                    <i :class="social.tag"></i>
                    <img 
                        :class="social.imgcls" 
                        :src="social.img" 
                        :height="social.size" 
                        :width="social.size"
                    />
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
</template>

<script>
export default {
    data() {
        return {
            socials: [
                {
                    id: 0,
                    url: "https://twitter.com/kitsunegadget",
                    // img: require("../assets/social_imgs/Twitter_Social_Icon_Circle_White.svg"),
                    tag: "fab fa-twitter-square",
                    size: "0"
                },
                {
                    id: 1,
                    url: "https://github.com/kitsunegadget",
                    //img: require("../assets/social_imgs/GitHub-Mark-Light-120px-plus.png"),
                    tag: "fab fa-github",
                    size: "0"
                },
                {
                    id: 2,
                    url: "https://kitsune-gadget.hatenablog.com",
                    img: require("../assets/social_imgs/hatenablog-logo-fff.svg"),
                    imgcls: "hatena",
                    size: "32"
                },
                {
                    id: 3,
                    url: "https://soundcloud.com/kitsunegadget",
                    //img: require("../assets/social_imgs/white_transparent_64.png"),
                    tag: "fab fa-soundcloud",
                    size: "0"
                }
            ]
        }
    }
}
</script>

<style lang="scss">
@import '../css/social.scss';

$icon-size: 32px;
@mixin social-icon-sizing {
    font-size: $icon-size;
    width: $icon-size;
    height: $icon-size;
    text-align: center;
    display: flex;
}

.fa-twitter-square {
    color:  #1DA1F2;
    /* color:  #14171A; */
    @include social-icon-sizing;
}
.fa-github {
    color:  #fff;
    /* color:  #14171A; */
    @include social-icon-sizing;
}
.hatena {
    margin-bottom: -4px;
}
.fa-soundcloud {
    color:  #ff5500;
    /* color:  #14171A; */
    font-size: $icon-size - 6px;
    width: $icon-size;
    height: $icon-size - 2px;
    padding-top: 4px;
}
</style>
