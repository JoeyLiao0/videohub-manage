<template>
    <div class="grid-container">
        <div class="subgrid-container1">
            <span class="text">原密码：</span>
            <el-input class="input" v-model="input_old_pwd" show-password></el-input>
        </div>

        <div class="subgrid-container2">
            <span class="text">新密码：</span>
            <el-input class="input" v-model="input_new_pwd" show-password></el-input>
        </div>

        <div class="subgrid-container3">
            <span class="text">确认密码：</span>
            <el-input class="input" v-model="input_repeat_pwd" show-password></el-input>
        </div>

        <div class="subgrid-container4">
            <span class="text">验证码：</span>
            <el-input class="input" v-model="input_code"></el-input>
        </div>

        <div class="button-container">
            <el-button class="change-button" @click="changePwd">确认修改</el-button>
            <el-button class="code-button" @click="getCode">获取验证码</el-button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from 'vuex';

// const store = useStore();
const input_old_pwd = ref("");
const input_new_pwd = ref("");
const input_repeat_pwd = ref("");
const input_code = ref("");

</script>

<style scoped>
.grid-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 30px 1fr 1fr 1fr 1fr 1fr 30px;
    grid-template-columns: 1fr 3fr 1fr;
    background-color: var(--background-black3);
}
.text{
    display: grid;
    place-content: center;
    color: var(--text-white1);
    font-size: 18px;
    width:100%;
    height: 100%;
}

.subgrid-container1{
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1;
    grid-column: 2;
    grid-row: 2;
    place-content: center;
}

.subgrid-container2{
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1;
    grid-column: 2;
    grid-row: 3;

    place-content: center;
}
.subgrid-container3{
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1;
    grid-column: 2;
    grid-row: 4;

    place-content: center;
}
.subgrid-container4{
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1;
    grid-column: 2;
    grid-row: 5;
    place-content: center;
}

.input{
    height: 40px;
}

::v-deep .el-input__wrapper {
  background-color:var(--background-black4);
  box-shadow: none !important;
}

::v-deep .el-input__inner {
  color: var(--text-white1); /* 设置输入文字颜色 */
}

.button-container{
    grid-row: 6;
    grid-column: 2;
    width:100%;
    height: 100%;

    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    place-items: center;
}

.change-button{
    grid-row: 1;
    grid-column: 1;
    width:100px;
}

.code-button{
    grid-row: 1;
    grid-column: 2;
    width:100px;
}
</style>