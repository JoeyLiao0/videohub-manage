<template>
    <div class="videos-manage-container"> 
        <div class="title"> 
          <span style="margin-left: 40px;">视频管理</span>  
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
.data-statistics{
    width: 100%;
    height: 100%;
    background-color: var(--background-black2);
}

.title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: start;
    font-size: 18px;
    color: white;
    border-bottom: 3px solid gray;
    background-color: var(--background-black2);
}

.videos-manage{
    width: 100%;
    height: calc(100% - 50px);
    background-color: aliceblue;
}

</style>