<template>
    <div class="user-manage-container"> 
        <div class="title"> 
          <span style="margin-left: 40px;">用户管理</span>  
        </div>
        <div class="user-manage">
            <UsersManage></UsersManage>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import UsersManage from '../items/UsersManage.vue';

</script>

<style scoped>
.user-manage-container{
    width: 100%;
    height: 100%;
    background-color: var(--background-black2);
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
    color: white;
    border-bottom: 3px solid gray;
    background-color: var(--background-black2);
}

.user-manage{
    grid-row: 2;
    width: 100%;
    background-color: aliceblue;
}

</style>