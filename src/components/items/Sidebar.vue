<template>
    <el-menu :default-active="activeIdx" class="el-menu" router>
        <div class="grid-container">
            <div class="sub-grid-container">
                <div class="logo-img">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
                        <path fill="red"
                            d="M6 16q-.825 0-1.412-.588Q4 14.825 4 14v-4q0-.825.588-1.413Q5.175 8 6 8t1.412.587Q8 9.175 8 10v4q0 .825-.588 1.412Q6.825 16 6 16Zm12 0q-.825 0-1.413-.588Q16 14.825 16 14v-4q0-.825.587-1.413Q17.175 8 18 8q.825 0 1.413.587Q20 9.175 20 10v4q0 .825-.587 1.412Q18.825 16 18 16Zm-6 4q-.825 0-1.412-.587Q10 18.825 10 18V6q0-.825.588-1.412Q11.175 4 12 4t1.413.588Q14 5.175 14 6v12q0 .825-.587 1.413Q12.825 20 12 20Z" />
                    </svg>
                </div>
                <div class="logo-text">
                    VideoHub
                </div>
            </div>

            <el-menu-item index="/usersManage">
                <div>
                    <el-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z" />
                        </svg>
                    </el-icon>
                    <span class="router-text">用户管理</span>
                </div>
            </el-menu-item>

            <el-menu-item index="/videosManage">
                <div>
                    <el-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M9 16h2v-3h3v-2h-3V8H9v3H6v2h3zm-5 4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h12q.825 0 1.413.588T18 6v4.5l4-4v11l-4-4V18q0 .825-.587 1.413T16 20z" />
                        </svg>
                    </el-icon>
                    <span class="router-text">视频管理</span>
                </div>
            </el-menu-item>

            <el-menu-item index="/systemSettings">
                <div>
                    <el-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5" />
                        </svg>
                    </el-icon>
                    <span class="router-text">系统设置</span>
                </div>
            </el-menu-item>

            <el-menu-item index="/dataStatistics">
                <div>
                    <el-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 16V8m4 8v-5m4 5v-3" />
                                <path
                                    d="M3 20.4V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6Z" />
                            </g>
                        </svg>
                    </el-icon>
                    <span class="router-text">数据统计</span>
                </div>
            </el-menu-item>

            <el-menu-item index="/infoManage">
                <div>
                    <el-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <g fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M2 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3.586l-3.707 3.707A1 1 0 0 1 6 17v-3H5a3 3 0 0 1-3-3V5zm20 4v6c0 1-.6 3-3 3h-1v3c0 .333-.2 1-1 1c-.203 0-.368-.043-.5-.113L12.613 18H9l3-3h3c1.333 0 4-.8 4-4V6c1 0 3 .6 3 3z"
                                    fill="currentColor" />
                            </g>
                        </svg>
                    </el-icon>
                    <span class="router-text">消息通知</span>
                </div>
            </el-menu-item>


            <div class="avatar">
                <el-avatar @click="handleAvatarClick" :size="80" :src="avatarSrc" style="border: 1px solid black">
                </el-avatar>
                <div class="status-dot"></div>
            </div>
        </div>
    </el-menu>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const avatarSrc = require("@/assets/avatar.png");
const handleAvatarClick = () => {
    router.push("/me/info");
};
const activeIdx = computed(() => router.currentRoute.value.path);

</script>

<style scoped>
.grid-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(12, 1fr);
    place-items: center;
    overflow: hidden;
}

.sub-grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 3fr 1fr;
    grid-template-rows: 1fr;
    grid-column: 1;
    grid-row: 1/3;
    place-items: center;
}

.avatar {
    position: relative;
    display: grid;
    place-items: center;
    grid-column: 1/2;
    grid-row: 11/13;
    cursor: pointer;
    /* 添加手型指针样式 */
    transition: transform 0.3s ease;
    /* 平滑变换效果 */
}

.avatar:hover {
    transform: scale(1.1);
    /* 鼠标悬停时放大 */
}

.avatar:active {
    transform: scale(0.9);
    /* 点击时缩小，创建按下的效果 */
}


/* 悬停效果 */
.el-menu-item:hover {
    background-color: var(--background-black3);
    transform: scale(1.1);
    /* 点击时的缩放效果 */
}

/* 点击效果 */
.el-menu-item:active {
    transform: scale(0.9);
    /* 点击时的缩放效果 */
}

/* 侧边栏高亮样式 */
.el-menu-item.is-active {
    background-color: var(--background-black3);
    color: white;
    /* 高亮字体颜色 */
}

.el-menu-item {
    width: 100%;
    display: grid;
    place-items: center;
    transition: transform 0.3s ease;
}

.el-menu {
    border-color: var(--grey2);
    background-color: var(--background-black1);
}

.logo-img {
    grid-column: 2;
}

.logo-text {

    color: var(--red1);
    grid-column: 3;
}

.status-dot {
    position: absolute;
    bottom: 2px;
    right: 3px;
    width: 15px;
    height: 15px;
    background-color: var(--off-red);
    border: 5px solid var(--off-red2);
    border-radius: 50%;
}

.router-text {
    color: var(--text-white1);
}

.router-icon {
    color: var(--text-white2);
}
</style>
