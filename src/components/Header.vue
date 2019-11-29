<template>
    <header>
        <div id=dummy>
        </div>
        <div id="title">
            <h1><router-link to="/" @click.native="navClick">Kitsune Gadget</router-link></h1>
        </div>    
        <nav>
            <ul>
                <li v-for="navi in navigations" :key="navi.id" :id="navi.id">
                    <router-link :to="navi.url" @click.native="navClick">
                        {{ navi.text }}
                    </router-link>
                </li>
            </ul>
            <!-- レスポンシブ用にトグルメニューを追加する部分 -->
        </nav>
    </header>
</template>

<script>
import AppVue from '../App.vue';
import ProductVue from '../views/Product.vue';
export default {
    data() {
        return {
            navigations: [
                {
                    id: 0,
                    text: "PRODUCT",
                    url: "/product"
                },
                // {
                //     id: 1,
                //     text: "GALLERY",
                //     url: "/#"
                // },
            ]
        }
    },
    methods: {
        window: onload = () => {
            if (location.pathname === "/product") {
                document.querySelector("nav li[id='0']").style.borderBottom = "solid #FFB74C 2px"
            } else {
                document.querySelector("nav li[id='0']").style.borderBottom = "solid #111 2px"
            }
        },
        document: onpopstate = () => {
            if (location.pathname === "/product") {
                document.querySelector("nav li[id='0']").style.borderBottom = "solid #FFB74C 2px"
            } else {
                document.querySelector("nav li[id='0']").style.borderBottom = "solid #111 2px"
            }
        },
        navClick(){
            if (location.pathname === "/product") {
                document.querySelector("nav li[id='0']").style.borderBottom = "solid #FFB74C 2px"
            } else {
                document.querySelector("nav li[id='0']").style.borderBottom = "solid #111 2px"
            }
        }
    }
}
</script>
<style>
@import '../variables.css';

header {
    display: inline-flex;
    width: 100%;
    height: 60px;
    background-color: var(--main-black);
}

header #dummy {
    flex: 2;
}

#title {
    flex: 1;
    margin: 0 10px;
    line-height: 3.5em;
    min-width: 250px;
    text-align: center;
    color: var(--main-orange);  
}
h1 {
    margin: 0;
}
h1 a {
    color: inherit;
    text-decoration: none;
}

header nav {
    flex: 2;
    height: inherit;
}
header nav ul {
    margin: 0;
    padding: 0;
    display: inline-flex;
    height: inherit;
}
header nav li {
    width: 100px;
    list-style-type: none;
    border-bottom: solid  #111 2px;
}
header nav a {
    /* router-linkがaタグに変わる */
    padding: 0 5px;
    color: white;
    font-weight: bold;
    text-decoration:  none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;    
}
header nav a:hover {
    background: var(--main-orange);
}
</style>