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
            <div id="picture">
                <img 
                    id="overlay-image" 
                    :src="pictures[currentPos].url" 
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
                }, 200);
            }
        },
        next: function() {
            if(this.currentPos < this.pictures.length - 1) {
                this.imageOpacityOff = true;
                window.setTimeout(() => {
                    this.$emit("changePos", this.currentPos + 1);
                    this.imageOpacityOff = false;
                }, 200);
            }
        }
    }
}
</script>
<style>
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
    transition: opacity .5s;
}
/* .overlay[disable] {
    display: none;
} */
.picture-title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
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
}
.picture-main #left-side {
    position: absolute;
    top: 75px;
    left: 0;
    bottom: 75px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}
.picture-main #left-side:active {
    background: #fff2;
}
.fa-arrow-left {
    margin-bottom: 20px;
    font-size: 1.5em;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background: #3334;
}
.picture-main #right-side {
    position: absolute;
    top: 75px;
    right: 0;
    bottom: 75px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}
.picture-main #right-side:active {
    background: #fff2;
}
.fa-arrow-right {
    margin-bottom: 20px;
    font-size: 1.5em;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background: #3334;
}
.close-button {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    /* margin-bottom: -60px;
    margin-top: 5px; */
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.fa-times {
    color: #fff;
    cursor: pointer;
    font-size: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
}
.fa-times:hover {
    background: #fff4;
    border-radius: 50px;
    transition: ease 0.5s;
}

.picture-main #overlay-image {
    min-height: 100px;
    min-width: 100px;
    max-height: calc(100vh - 25vh);
    max-width: 100vw;
    transition: all 200ms ease-out;
}

.opacity-on {
    opacity: 1;
}
.opacity-off {
    opacity: 0;
}
</style>