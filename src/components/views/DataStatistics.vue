<template>
    <div class="data-statistics-container"> 
        <div class="title"> 
          <span style="margin-left: 40px;">数据统计</span>  
        </div>
        <div class="data-statistics">
            <DataStacstics ></DataStacstics>
        </div>
    </div>
</template>

<script setup>
import DataStacstics from '../items/DataStacstics.vue';


</script>

<style scoped>
.data-statistics-container{
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

.data-statistics{
    width: 100%;
    height: calc(100% - 50px);
    background-color: antiquewhite;
}


</style>