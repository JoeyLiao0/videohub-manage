<template>
    <div class="system-settings-container">
        <div class="title">
            <span style="margin-left: 40px;">系统设置</span>
        </div>
        <div class="system-settings">
            <SystemSettings></SystemSettings>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SystemSettings from '../items/SystemSettings.vue';


</script>

<style scoped>
.system-settings-container {
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

.system-settings{
    grid-row: 2;
    width: 100%;
    background-color: rgba(42, 32, 21, 0.827);
}

</style>