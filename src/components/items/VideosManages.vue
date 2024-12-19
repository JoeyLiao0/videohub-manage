<template>
    <div class="videos-table">
        <table border="1">
            <thead>
                <tr>
                    <th>视频</th>
                    <th>大小</th>
                    <th>创建时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="video in videos" :key="video.title">
                    <td>{{ video.title }}</td>
                    <td>{{ video.size || '---' }}</td>
                    <td>{{ video.creationTime || '---' }}</td>
                    <td>{{ video.status }}</td>
                    <td>
                        <button @click="handleEdit(video)">编辑</button>
                        <button :disabled="video.status === '可用'" @click="handleDisable(video)">
                            {{ video.status === '可用' ? '禁用' : '启用' }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const videos = ref([
    {
        title: '[2019-11-25]篮球BLG vs T1',
        size: '250MB',
        creationTime: '2019-02-12 12:23:13',
        status: '可观看'
    },
    {
        title: '[2019-11-25]篮球Bilibili BLG vs T1',
        size: null,
        creationTime: null,
        status: '可用'
    },
    {
        title: '11月2日决赛BLGvsT1',
        size: null,
        creationTime: null,
        status: '可观看'
    },
    {
        title: '【S14决赛】不送就赢？ BLG离冠军最近的1局！',
        size: null,
        creationTime: null,
        status: '可观看'
    }
    // ... 可以添加更多视频数据
]);

function handleEdit(video) {
    alert('编辑功能未实现: ' + video.title);
    // 这里可以添加编辑功能的实现代码
}

function handleDisable(video) {
    alert('禁用功能未实现: ' + video.title);
    // 这里可以添加禁用功能的实现代码，例如更新数据库中的状态
}
</script>

<style scoped>
.videos-table {
    margin: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    text-align: left;
}

button {
    margin-right: 5px;
}
</style>