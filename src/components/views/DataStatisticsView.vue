<template>
    <div class="data-container">
        <div class="title">
            <span style="margin-left: 40px;">数据统计</span>
        </div>
        <div class="data-content">
            <DataStacsticsItem></DataStacsticsItem>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import DataStacsticsItem from '../items/DataStacsticsItem.vue';

</script>

<style scoped>
.data-container {
    width: 100%;
    height: 100%;
    background-color: var(--background-black2);
    display: grid;
    grid-template-rows: 50px 1fr;
}

.title {
    grid-row: 1;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: start;
    font-size: 18px;
    color: white;
    border-bottom: 3px solid gray;
    background-color: var(--background-black2);
}

.data-content{
    grid-row: 2;
    width: 100%;
    background-color: rgba(42, 32, 21, 0.827);
}

</style>