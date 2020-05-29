<template>
    <div class="about-data">
        <!-- <p>{{ description }}</p> -->
        <h3>Primary Skills (intermediate?)</h3>
        <ul>
            <li v-for="text in primarySkills" :key="text">
                {{ text }}
            </li>
        </ul>
        <h3>Secondary Skills (beginner to middle)</h3>
        <ul>
            <li v-for="text in secondarySkills" :key="text">
                {{ text }}
            </li>
        </ul>
        <h3>Other Skills (interesting)</h3>
        <ul>
            <li v-for="text in otherSkills" :key="text">
                {{ text }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            description: "先の見えない場所を目指して…",
            primarySkills: [
                "html, css, javascript (Typescript), Python, C#",
                "Vue, Nuxtjs, Unity",
                "FE (基本情報技術者)"
            ],
            secondarySkills: [
                "C, C++, JAVA, Shader programming",
                "React, Xamarin, Electron",
            ],
            otherSkills: [
                "Guitar, Base guitar, ..."
            ]
        }
    }
})
</script>

<style lang="scss">
.about-data {
    color: $white-e;
    width: 100%;
    margin: auto;

    h3 {
        padding: 5px;
        background: #0006;
        color: $orange;

        &::before {
            content: "‖";
            margin-right: 10px;
        }
    }
}
</style>