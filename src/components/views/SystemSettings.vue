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
}

.title {
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
    width: 100%;
    height: calc(100% - 50px);
    background-color: white;
}

</style>