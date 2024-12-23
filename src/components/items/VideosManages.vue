<template>
    <div class="video-container">
        <!-- 搜索栏 -->
        <div class="video-search">
            <!-- 视频名搜索 -->
            <div class="search-name-input" style="margin-left: 20px; margin-right: 30px;">
                <span class="search-text"> 视频标题 </span>
                <el-input placeholder="请输入视频标题" v-model="searchData.name" clearable style="width: 240px"
                    @clear="handleClear">
                </el-input>
            </div>
            <!-- 搜索按钮 -->
            <div class="search-button">
                <el-button :icon="Search" circle @click="handleSearch" />
            </div>
        </div>
        <!-- 视频表格 -->
        <div class="video-table">
            <div class="video-select">
                <el-radio-group v-model="selectStatus" @change="handleListChange()">
                    <el-radio-button label="全部" :value="-1" />
                    <el-radio-button label="通过" :value="0" />
                    <el-radio-button label="待审核" :value="1" />
                    <el-radio-button label="未通过" :value="2" />
                    <el-radio-button label="封禁" :value="3" />
                </el-radio-group>
            </div>

            <!-- 视频页 -->
            <div class="video-table-block">
                <el-table :data="videoList" style="width: 100%; table-layout: auto;">
                    <el-table-column property="null" width="10" />

                    <el-table-column property="video_path" label="视频">
                        <template v-slot="scope">
                            <img :src="scope.row.cover_path" alt="视频封面"
                                style="width: 160px; height: 90px; object-fit: cover; cursor: pointer;"
                                @click="handleVideoClick(scope.row)">
                        </template>
                    </el-table-column>

                    <el-table-column property="title" label="标题" show-overflow-tooltip />

                    <el-table-column property="name" label="作者">
                        <template v-slot="scope">
                            <img :src="scope.row.avatar" alt="用户头像"
                                style="width: 40px; height: 40px; border-radius: 50%;">
                        </template>
                    </el-table-column>

                    <el-table-column property="published_at" label="发布时间" width="240">
                        <template v-slot="scope">
                            {{ formatDate(scope.row.published_at) }}
                        </template>
                    </el-table-column>

                    <el-table-column property="status" label="视频状态" max-width="200">
                        <template v-slot="scope">
                            <el-radio-group v-model="scope.row.status" @change="handleStatusChange(scope.row)">
                                <el-radio :value="0">通过</el-radio>
                                <el-radio :value="1">待审核</el-radio>
                                <el-radio :value="3">封禁</el-radio>
                                <el-radio :value="2">未通过</el-radio>
                            </el-radio-group>
                        </template>
                    </el-table-column>

                    <el-table-column label="删除" width="80">
                        <template v-slot="scope">
                            <el-button type="danger" :icon="Delete" circle @click="handleDelete(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="video-table-pages-button">
                <el-pagination v-model:current-page="queryInfo.page" v-model:page-size="queryInfo.limit"
                    :page-sizes="[4]" background="true" layout="total, sizes, prev, pager, next, jumper"
                    :total="total_videos" @current-change="handleCurrentChange" />
            </div>
        </div>
        <!-- 视频播放对话框 -->
        <el-dialog v-model="videoDialogState.dialogVisible" :title="videoDialogState.currentVideoTitle" :before-close="handleCloseDialog" width="60%">
            <video v-if="videoDialogState.currentVideo" controls :src="videoDialogState.currentVideo.video_path"
                style="width: 100%; height: auto;"></video>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Search, Delete } from '@element-plus/icons-vue';
import { ElDialog, ElButton } from 'element-plus';
import { getAdminVideos, putAdminVideos,deleteAdminVideos } from '@/api/adminApi';
import { useStore } from 'vuex';
import axios from 'axios';

const searchData = ref(
    {
        name: null
    }
)

const store = useStore();
const videoList = ref([]);  // 用户数据
const selectStatus = ref(-1); // 不同状态的视频列表
// 分页机制
const total_videos = ref(0);
const queryInfo = ref({
    page: 1,
    limit: 4,
    status: 1,
    like: '',
});

// 管理弹窗和当前视频信息
const videoDialogState = ref({
    dialogVisible: false,
    currentVideo: null,
    currentVideoTitle: ''
});

// 点击视频封面时触发
function handleVideoClick(video) {
    videoDialogState.value.currentVideo = video;
    videoDialogState.value.currentVideoTitle = video.title;
    videoDialogState.value.dialogVisible = true; // 打开弹窗
}

// 关闭弹窗时清空当前视频
function handleCloseDialog() {
    videoDialogState.value.currentVideo = null;
    videoDialogState.value.dialogVisible = false;
    videoDialogState.value.currentVideoTitle = '';
}

// 搜索
function handleSearch() {
    if (searchData.value.name != '') {
        queryInfo.value.like = searchData.value.name;
    }
    getVideoList();
}

// 清除搜索框
function handleClear() {
    searchData.value.name = null;
    queryInfo.value.like = null;
    getVideoList();
}

// 显示列表改变
function handleListChange() {
    queryInfo.value.status = selectStatus.value;
    getVideoList();
}

// 视频删除
async function handleDelete(video){
    console.log("video:" + video.id);
    const videoData = {
        vid: video.id,
    };
    try {
        const response = await deleteAdminVideos(videoData);
        if (response != null && response.data.code === 200) {
            console.log("用户状态修改成功");
            getVideoList();
        } else {
            console.log("用户状态修改失败");
        }
    } catch (error) {
        if (error.message === "AUTHENTICATION_FAILED") {
            console.log("访问令牌失效，请重新登录");
            store.dispatch('user/openAuth');
        }
    }
}
// 视频状态改变
async function handleStatusChange(video) {
    console.log("video:" + video.status);
    const videoData = {
        vid: video.id,
        new_status: video.status
    };
    try {
        const response = await putAdminVideos(videoData);
        if (response != null && response.data.code === 200) {
            console.log("用户状态修改成功");
        } else {
            console.log("用户状态修改失败");
        }
    } catch (error) {
        if (error.message === "AUTHENTICATION_FAILED") {
            console.log("访问令牌失效，请重新登录");
            store.dispatch('user/openAuth');
        }
    }
}

// 获取视频列表
async function getVideoList() {
    try {
        // const response = await axios.get('https://apifoxmock.com/m1/5658337-5338838-default/admin/videos', {
        //     params: queryInfo.value
        // });
        const response = await getAdminVideos(queryInfo.value);
        if (response != null && response.data.code === 200) {
            // videoList.value = response.data.data.videos.map(video => ({
            //     ...video,
            //     video_path: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
            //     cover_path: 'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
            // }));
            videoList.value = response.data.data.videos;
            total_videos.value = videoList.value.length;
        }
    } catch (error) {
        if (error.message === "AUTHENTICATION_FAILED") {
            console.log("访问令牌失效，请重新登录");
            store.dispatch('user/openAuth');
        }
    }
}

// 时间戳转换为日期
function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

// 分页页码改变
const handleCurrentChange = (val) => {
    if (total_pages >= val && val >= 1) {
        queryInfo.value.page = val;
        getVideoList();
    }
}

onMounted(() => {
    getVideoList();
});

</script>

<style scoped>
.video-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 60px 1fr;
    grid-template-columns: 1fr;
    position: relative;
}

.video-search {
    display: flex;
    grid-row: 1;
    width: 100%;
    background-color: aliceblue;
    align-items: center;
}

@media (max-width: 768px) {
    .video-table-block {
        padding: 0 10px;
        /* 为表格添加一些内边距以避免内容溢出 */
    }

    .el-table {
        width: 100%;
        /* 确保表格宽度适应屏幕 */
    }
}

.video-table {
    grid-row: 2;
    width: 100%;
    position: relative;
    background-color: rgb(214, 228, 228);
    display: grid;
    grid-template-rows: 40px 1fr 70px;
}

.video-select {
    background-color: aliceblue;
    width: 100%;
    grid-row: 1;
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
}

.video-table-block {
    background-color: rgb(255, 255, 255);
    width: 100%;
    grid-row: 2;
}

.video-table-pages-button {
    align-items: center;
    padding-top: 20px;
    padding-left: 20px;
    width: auto;
}
</style>