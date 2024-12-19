<template>
  <div class="user-table">
    <table border="1">
      <thead>
        <tr>
          <th>用户编号</th>
          <th>用户名</th>
          <th>用户邮箱</th>
          <th>用户级别</th>
          <th>注册时间</th>
          <th>用户状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>普通用户</td>
          <td>{{ formatDate(user.time) }}</td>
          <td>{{ formatStatus(user.status) }}</td>
          <td v-if="user.status == 0 || user.status == 1">
            <button @click="toggleDisabled(user.id,user.status)">
              {{ user.status == 1 ? '启用' : '封禁' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref,onMounted} from 'vue';
import { getAdminUsers } from '@/api/adminApi';
import { useStore } from 'vuex'; 

const users = ref([]);
const store = useStore();

// 当组件挂载时，获取用户数据
onMounted(async () => {
  try {
    const response = await getAdminUsers();
    if (response != null && response.data.code === 200) {
      users.value = response.data.data.users;
      console.log(response.data.data.users);
    }
  } catch (error) {
    if (error.message === "AUTHENTICATION_FAILED") {
      console.log("访问令牌失效，请重新登录");
      store.dispatch('user/openAuth');
    }
  }
});

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

<style scoped>
.user-table {
  margin: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
}
button {
  margin-right: 5px;
}
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>