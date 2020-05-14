<template>
    <div 
        class="overlay" 
        @click="clickOverlay" 
    >
        <div class="picture-title">
            <h2>{{ pictures[currentPos].title }}</h2>
        </div>
        <div class="picture-main">
            <div 
                id="left-side" 
                @click.stop="prev()"
                draggable="true"
            >
                <i class="fas fa-arrow-left" v-show="switchLeftButton"></i>
            </div>
            <div id="picture" v-source:[pictures[currentPos]]>
                <img 
                    id="overlay-image" 
                    :src="pictures[currentPos].url"
                    :class="{ 'opacity-off': imageOpacityOff }"
                />
                <video 
                    style="display: none;"
                    autoplay
                    loop
                    muted
                    :src="pictures[currentPos].url"
                    type="video/mp4"
                    id="overlay-video" 
                    :class="{ 'opacity-off': imageOpacityOff }"
                />
            </div>
            <div 
                id="right-side" 
                @click.stop="next()"
                draggable="true"
            >
                <i class="fas fa-arrow-right" v-show="switchRightButton"></i>
            </div>
        </div>
        <div class="close-button">
            <i class="fas fa-times"></i>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        pictures: {
            type: Array,
            required: true
        },
        currentPos: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            isActiveLeftButton: true,
            isActiveRightButton: true,

            imageOpacityOff: false
        }
    },
    directives: {
        source: {
            update: function(el, binding) {
                const re = RegExp('\\.mp4\\?')
                if (re.test(binding.arg.url)) {
                    const img = el.getElementsByTagName('img')[0]
                    img.style.display = 'none'
                    const video = el.getElementsByTagName('video')[0]
                    video.style.display = 'block'
                } else {
                    const video = el.getElementsByTagName('video')[0]
                    video.style.display = 'none'
                    const img = el.getElementsByTagName('img')[0]
                    img.style.display = 'block'
                }
            }
        }
    },
    computed: {
        switchLeftButton: function() {
            if (this.currentPos <= 0) {
                return false;
            } else {
                return true;
            }
            
        },
        switchRightButton: function() {
            if (this.currentPos + 1 >= this.pictures.length) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        clickOverlay: function() {
            this.$emit("show", false);
            this.$emit("baseDisplay", true);
            
            // displayが戻ると同時に実行されるようなので1msだけずらす
            window.setTimeout(() => {
                this.$emit("scroll");
            }, 1);
        },
        prev: function() {
            if(this.currentPos > 0) {
                this.imageOpacityOff = true;
                // 同時に実行されないようにタイムアウト
                window.setTimeout(() => {
                    this.$emit("changePos", this.currentPos - 1);
                    this.imageOpacityOff = false;
                }, 1);
            }
        },
        next: function() {
            if(this.currentPos < this.pictures.length - 1) {
                this.imageOpacityOff = true;
                window.setTimeout(() => {
                    this.$emit("changePos", this.currentPos + 1);
                    this.imageOpacityOff = false;
                }, 1);
            }
        }
    }
}
</script>
<style lang="scss">
.overlay {
    background: #0009;
    // @include absolute-centering;
    position: fixed;
    @include flex-centering;
    flex-direction: column;
    z-index: 100;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    /* animation: fadeIn ease 200ms; */
    /* transition: opacity .5s; */

    // &[disable] {
    //     display: none;
    // }
}
.picture-title {
    @include absolute-centering;
    height: 75px;
    text-align: center;
    background: #000a;
    animation: titleMoving ease 0.4s forwards;
    overflow: hidden;
}
@keyframes titleMoving {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0); }
}

.picture-main {
    display: flex;

    @mixin sides {
        position: absolute;
        top: 75px;
        bottom: 75px;
        width: 50px;
        @include flex-centering;
        z-index: 1;

        &:active {
            background: #fff2;
        }
    }

    #left-side {
        @include sides;
        left: 0;
    }

    #right-side {
        @include sides;
        right: 0;
    }

    #overlay-image, #overlay-video {
        min-height: 100px;
        min-width: 100px;
        max-height: calc(100vh - 25vh);
        max-width: 100vw;
        transition: all 200ms ease;
    }
}
.fa-arrow-left {
    margin-bottom: 20px;
    font-size: 1.5em;
    width: 40px;
    height: 40px;
    @include flex-centering;
    border-radius: 50px;
    background: #3334;
}
.fa-arrow-right {
    @extend .fa-arrow-left;
}
.close-button {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    /* margin-bottom: -60px;
    margin-top: 5px; */
    @include flex-centering;
}
.fa-times {
    color: #fff;
    cursor: pointer;
    font-size: 3em;
    @include flex-centering;
    width: 50px;
    height: 50px;

    &:hover {
        background: #fff4;
        border-radius: 50px;
        transition: ease 0.5s;
    }
}

.opacity-on {
    opacity: 1;
}
.opacity-off {
    opacity: 0;
}
</style>