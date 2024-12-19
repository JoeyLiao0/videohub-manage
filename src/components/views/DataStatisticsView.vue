<template>
    <div class="data-container">
        <div class="title"> 
          <span style="padding-left: 20px;">用户管理</span>  
        </div>
        <div class="data-content">
            <DataStacsticsItem></DataStacsticsItem>
        </div>
    </div>
</template>

<script setup>
import DataStacsticsItem from '../items/DataStacsticsItem.vue';

</script>

<style scoped>
.data-container {
    width: 100%;
    height: 100%;
    background-color: white;
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


.data-content{
    grid-row: 2;
    width: 100%;
    background-color: rgba(252, 252, 252, 0.827);
}

</style>