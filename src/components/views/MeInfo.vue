<template>
    <div class="grid-container">
        <div class="subgrid-container1">
            <span class="text">用户名：</span>
            <el-input class="input" v-model="input_name" :placeholder="name"></el-input>
        </div>

        <div class="subgrid-container2">
            <span class="text">手机号：</span>
            <el-input class="input" v-model="input_phone" :placeholder="phone"></el-input>
        </div>

        <div class="subgrid-container3">
            <span class="text">邮箱号：</span>
            <el-input class="input" v-model="input_email" :placeholder="email"></el-input>
        </div>

        <div class="subgrid-container4">
            <span class="text2">备注：</span>
            <el-input class="text-input" v-model="input_text" :placeholder="text" type="textarea"></el-input>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from 'vuex';

const store = useStore();
const name = computed(() => store.state.user.name);
const phone = computed(() => store.state.user.phone);
const email = computed(() => store.state.user.email);
const text = computed(() => store.state.user.text);

const input_name = ref(""); 
const input_phone = ref(""); 
const input_email = ref(""); 
const input_text = ref(""); 


</script>

<style scoped>
.grid-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 30px 1fr 1fr 1fr 4fr 30px;
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
.text2{
    display: grid;
    justify-content: center;
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
    /* place-content: center; */
}

.input{
    height: 40px;
}
.text-input{
    height: 160px;
}
::v-deep .el-input__wrapper {
  background-color:var(--background-black4);
  box-shadow: none !important;
}

/* ::v-deep .el-textarea__wrapper {
  background-color:var(--background-black3);
  box-shadow: none !important;
} */
::v-deep .el-input__inner {
  color: var(--text-white1); /* 设置输入文字颜色 */
}
::v-deep .el-textarea__inner {
  color: var(--text-white1); /* 设置输入文字颜色 */
  background-color:var(--background-black4);
  box-shadow: none !important;
  height: 100%;
}
</style>