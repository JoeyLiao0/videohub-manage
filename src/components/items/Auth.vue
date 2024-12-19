<!-- src/components/Auth.vue -->
<template>
  <div class="auth" v-show="showAuth">
    <!-- <div class="layer"></div> -->
    <div class="auth-content">
      <!-- <button class="exit" @click="closeAuth">退出</button> -->
      <div class="content">
        <div class="login-grid-container" v-if="showLogin">
          <span class="title">登录界面</span>
          <span class="messageLogin">{{ messageLogin }}</span>
          <svg class="username-svg" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">
            <circle cx="12" cy="6" r="4" fill="currentColor" />
            <path fill="currentColor" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5" />
          </svg>
          <el-input class="username-input" v-model="login_username" placeholder="邮箱号"></el-input>
          <svg class="password-svg" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z" />
          </svg>
          <el-input class="password-input" v-model="login_password" type="password" placeholder="密码"></el-input>
          <el-button class="login-button">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const showLogin = ref(true);
const messageLogin = ref("请先登录才能进入系统");
const store = useStore();

const login_username = ref("");
const login_password = ref("");

const showAuth = computed(() => store.state.user.showAuth);
</script>

<style scoped>
.auth {
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: 1200px;
  z-index: 1998;
  /* 确保蒙版在最上层 */
  background-color: var(--background-black4);
}

.auth-content {
  position: absolute;
  top: 49%;
  /* 向下移动50%的高度 */
  left: 50%;
  /* 向右移动50%的宽度 */
  transform: translate(-50%, -50%);
  /* 将元素移动到容器中心 */
  width: 500px;
  height: 600px;
  z-index: 2000;
  /* 确保内容在最上层 */
  background-color: var(--white);
  border-radius: 5px;
}

.layer {
  position: absolute;
  top: 50.5%;
  /* 向下移动50%的高度 */
  left: 51%;
  /* 向右移动50%的宽度 */
  transform: translate(-50%, -50%);
  /* 将元素移动到容器中心 */
  width: 500px;
  height: 600px;
  z-index: 1999;
  /* 确保内容在最上层 */
  background-color: var(--background-black4);
  border-radius: 5px;
}

.exit {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid;
  background-color: var(--text-white1);
  cursor: pointer;
}

.exit:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

.exit:active {
  transform: scale(0.9);
  transition: transform 0.2s ease;
}

.content {
  position: absolute;
  width: 95%;
  height: 500px;
  top: 50px;
  left: 2.5%;
  /* border: 1px solid black; */
}

.login-grid-container {
  display: grid;
  grid-auto-rows: 60px;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  row-gap: 20px;
}

.register-grid-container {
  display: grid;
  grid-auto-rows: 60px;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  row-gap: 10px;
}

.title {
  font-size: 45px;
  grid-row: 1;
  grid-column: 2/4;
}

.messageLogin {
  font-size: 18px;
  grid-row: 2;
  grid-column: 2/4;
  color: var(--red1);
}

.messageRegister {
  font-size: 18px;
  grid-row: 2;
  grid-column: 2/4;
  color: var(--red1);
}

.username-svg {
  grid-row: 3;
  grid-column: 1;
  margin-left: 20px;
}

.password-svg {
  grid-row: 4;
  grid-column: 1;
  margin-left: 20px;
}

.code-svg{
  grid-row: 6;
  grid-column: 1;
  margin-left: 20px;
}

.username-input {
  grid-row: 3;
  grid-column: 2/4;
  width: 320px;
  height: 40px;
  left: 20px;
}

.password-input {
  grid-row: 4;
  grid-column: 2/4;
  width: 320px;
  height: 40px;
  left: 20px;
}

.password-input2 {
  grid-row: 5;
  grid-column: 2/4;
  width: 320px;
  height: 40px;
  left: 20px;
}

.code-input {
  grid-row: 6;
  grid-column: 2/4;
  width: 210px;
  height: 40px;
  left:-35px;
}

.code-button{
  grid-row: 6;
  grid-column: 3/5;
  width: 100px;
  height: 40px;
  margin-left: 20px;
}

.login-button {
  width: 80px;
  height: 40px;
  grid-row: 7;
  grid-column: 3;
  margin-left: 120px;
}

.back-login-button {
  width: 100px;
  height: 40px;
  grid-row: 7;
  grid-column: 2;
  margin-left: 3px;
}

.register-button {
  width: 100px;
  height: 40px;
  grid-row: 6;
  grid-column: 3;
  margin-left: 3px;
}

.comfirm-register-button {
  width: 100px;
  height: 40px;
  grid-row: 7;
  grid-column: 3;
  margin-left: 3px;
}
</style>