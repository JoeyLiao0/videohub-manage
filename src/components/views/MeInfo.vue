<template>
    <div class="grid-container">
        <span class="message">{{ message }}</span>
        <div class="subgrid-container1">
            <span class="text">用户名：</span>
            <div class="text"> {{ name }} </div>
        </div>

        <div class="subgrid-container2">
            <span class="text">邮箱号：</span>
            <div class="text"> {{ stored_email }} </div>
        </div>

        <!-- <div class="subgrid-container3">
            <span class="text">验证码：</span>
            <el-input class="input" v-model="input_code"></el-input>
        </div> -->

        <!-- <div class="button-container">
            <el-button class="change-button" @click="updateInfo">确认修改</el-button>
            <el-button class="code-button" @click="getCode">获取验证码</el-button>
        </div> -->
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from 'vuex';
import { getAdmin } from '@/api/adminApi';


const store = useStore();
const name = computed(() => store.state.user.name);
const message = ref("");

const stored_email = computed(() => store.state.user.email);



// 当组件挂载时，获取个人数据
onMounted(async () => {
    try {
        const response = await getAdmin();
        if (response != null && response.data.code === 200) {
            store.dispatch('user/setMeInfo', response.data.data.user);
        }
    } catch (error) {
        if (error.message === "AUTHENTICATION_FAILED") {
            console.log("访问令牌失效，请重新登录");
            store.dispatch('user/openAuth');
        }
    }
});

</script>

<style scoped>
.grid-container {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    grid-template-rows: 30px repeat(6, 1fr) 30px;
    grid-template-columns: 1fr 3fr 1fr;
    background-color: var(--background-black3);
}

.text {
    display: grid;
    place-content: center;
    color: var(--text-white1);
    font-size: 18px;
    width: 100%;
    height: 100%;
}

.text2 {
    display: grid;
    justify-content: center;
    color: var(--text-white1);
    font-size: 18px;
    width: 100%;
    height: 100%;
}

.subgrid-container1 {
    display: grid;
    width: 400px;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1;
    grid-column: 2;
    grid-row: 3;
    place-content: center;
}

.subgrid-container2 {
    display: grid;
    width: 400px;

    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1;
    grid-column: 2;
    grid-row: 4;

    place-content: center;
}

.subgrid-container3 {
    display: grid;
    width: 400px;

    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1;
    grid-column: 2;
    grid-row: 5;

    place-content: center;
}

.subgrid-container4 {
    display: grid;
    width: 400px;

    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1;
    grid-column: 2;
    grid-row: 6;
    place-content: center;
}

.input {
    height: 40px;
}

.text-input {
    height: 160px;
}

::v-deep .el-input__wrapper {
    background-color: var(--background-black4);
    box-shadow: none !important;
}

/* ::v-deep .el-textarea__wrapper {
  background-color:var(--background-black3);
  box-shadow: none !important;
} */
::v-deep .el-input__inner {
    color: var(--text-white1);
    /* 设置输入文字颜色 */
}

::v-deep .el-textarea__inner {
    color: var(--text-white1);
    /* 设置输入文字颜色 */
    background-color: var(--background-black4);
    box-shadow: none !important;
    height: 100%;
}

.change-button {
    grid-row: 1;
    grid-column: 2;
    width: 200px;
}

/* .code-button {
    grid-row: 1;
    grid-column: 2;
    width: 100px;
} */

.el-button {
    font-size: medium;
    color: var(--background-black2);
    background-color: var(--text-white2);
    border: none;
}

.button-container {
    grid-row: 7;
    grid-column: 1/4;
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 2fr 1fr;
    place-items: center;
}

.message {
    grid-row: 2;
    grid-column: 2;
    font-size: larger;
    /* width: 1px; */
    color: var(--red1);
}
</style>