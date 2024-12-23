<template>
    <div class="videos-manage-container"> 
        <div class="title"> 
          <span style="margin-left: 20px;">视频管理</span>  
        </div>
        <div class="videos-manage">
            <VideosManages></VideosManages>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import VideosManages from '../items/VideosManages.vue';

</script>

<style scoped>
.videos-manage-container{
    width: 100%;
    height: 100%;
    /* background-color: var(--background-black2); */
    display: grid;
    grid-template-rows: 50px 1fr;
}

.title{
    grid-row: 1;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: start;
    font-size: 18px;
    /* color:var(--background-black2); */
    background-color: var(--background-black3);
    color: aliceblue;

    border-bottom: 1px solid rgb(0, 0, 0);
    /* background-color: var(--background-black2); */
}

.videos-manage{
    grid-row: 2;
    width: 100%;
    /* background-color: aliceblue; */
    background-color: rgba(252, 252, 252, 0.827);
}

</style>