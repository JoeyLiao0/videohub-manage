<template>
  <div class="grid-container">

    <div class="header-container">
      <div class="avatar">
        <el-avatar :size="80" :src="avatarSrc" style="border: 1px solid black">
        </el-avatar>
        <!-- <input type="file" @change="handleFileChange" style="display: none" ref="fileInput">
        <span class="set" @click="triggerFileInput">设置</span> -->
      </div>
      <span class="status">状态:{{ formatStatus(userStatus) }}</span>
      <span class="time">注册时间:{{ formatDate(userRegisterTime) }}</span>
    </div>

    <div class="content-container">
      <div class="sidebar-container">
        <el-menu :default-active="activeIdx" class="el-menu" router>
          <!-- <div class="subgrid-container"> -->
          <div class="title">个人中心</div>
          <el-menu-item index="/me/info">
            <span class="router-text">基本信息</span>
          </el-menu-item>
          <el-menu-item index="/me/password">
            <span class="router-text">密码修改</span>
          </el-menu-item>
          <!-- </div> -->
        </el-menu>
      </div>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
const router = useRouter();
const avatarSrc = require("@/assets/avatar.png");
const activeIdx = computed(() => router.currentRoute.value.path);
const store = useStore();
const userStatus = computed(() => store.state.user.status);
const userRegisterTime = computed(() => store.state.user.registerTime);


function formatDate(time) {
  const timestamp = new Date(time).getTime();
  return new Date(timestamp).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
}

function formatStatus(status) {
  const num = status;
  if (num == 0) {
    return '正常';
  } else if (num == 1) {
    return '封禁';
  } else {
    return '注销';
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* scoped表示这里的css样式不会泄露到其他组件 */
.grid-container {
  width: 100%;
  height: 100%;
  display: grid;
  gap: 20px 0;
  grid-template-rows: 1fr 5fr;
  overflow: hidden;
  background-color: var(--background-black1);
}

.header-container {
  width: 100%;
  height: 100px;
  grid-row: 1;
  display: grid;
  /* place-items: center; */
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: 120px 100px 100px;
  border-bottom: 1px solid var(--grey2);
  align-items: center;
}

.avatar {
  position: relative;
  grid-row: 1/5;
  grid-column: 1;
  margin-left: 20px;
  margin-top: 10px;
}

.set {
  position: absolute;
  font-size: 20px;
  ;
  color: transparent;
  left: 20px;
  top: 25px;
  z-index: 5000;
}

.avatar:hover .set {
  color: var(--background-black1); /* 悬停时显示的文字颜色 */
  cursor: pointer;
}

.content-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  /* border: 1px solid rgb(255, 255, 255); */
}

.sidebar-container {
  grid-column: 2/4;
  height: 90%;
  width: 100%;
  /* background-color: var(--grey2); */
  border: none;
}

.el-menu {
  background-color:var(--background-black3);
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  gap: 15px;
  place-items: center;
  height: 100%;
  width: 100%;
  border-right: none;
}

.main-content {
  /* border: 1px solid rgb(247, 247, 247); */
  grid-column: 5/11;
  height: 90%;
}

.router-text {
  display: grid;
  place-items: center;
  width: 100%;
  color: var(--text-white1);
  font-size: 16px;
}

.el-menu-item {
  width: 100%;
}

.title {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--yellow);
  font-size: 22px;
  font-weight: 200;
  color: var(--grey1);
}

/* 悬停效果 */
.el-menu-item:hover {
  background-color: var(--text-white3);
}

/* 侧边栏高亮样式 */
.el-menu-item.is-active {
  background-color: var(--text-white3);
}

.status {
  color: var(--text-white2);
  grid-row: 2;
  font-size: 14px;
}

.time {
  color: var(--text-white3);
  grid-row: 3;
  grid-column: 2/4;
  font-size: 12px;
}
</style>