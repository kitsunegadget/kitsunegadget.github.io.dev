<template>
    <div id="notfound">
        <h1>404</h1>
        <h2>Not found.</h2>
    </div>
</template>

<style lang="scss">
#notfound {
    margin-top: -5px;
    color: #fff;
    background-color: #111e;
    text-align: center;
    height: 80vh;
    @include flex-centering;
    flex-direction: column;

    h1 {
        font-size: 5em;  
    }
}
</style>