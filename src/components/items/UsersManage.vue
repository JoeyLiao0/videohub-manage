<template>
    <div class="user-table">
        <table border="1">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>用户名</th>
                    <th>用户邮箱</th>
                    <th>用户级别</th>
                    <th>注册时间</th>
                    <th>是否禁用</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.level }}</td>
                    <td>{{ formatDate(user.registrationDate) }}</td>
                    <td>{{ user.isDisabled ? '是' : '否' }}</td>
                    <td>
                        <button @click="editUser(user)">编辑</button>
                        <button @click="toggleDisabled(user)">
                            {{ user.isDisabled ? '启用' : '禁用' }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  name: 'UserTable',
  data() {
    return {
      users: [
        { id: 1, username: '用户1', email: 'example1@email.com', level: '管理员', registrationDate: '2023-05-15T10:00:00Z', isDisabled: false },
        { id: 2, username: '用户2', email: 'example2@email.com', level: '普通用户', registrationDate: '2023-05-15T11:30:00Z', isDisabled: false },
        // ... 可以添加更多用户数据
      ]
    };
  },
  methods: {
    editUser(user) {
      // 这里可以添加编辑用户的逻辑，比如打开一个模态框或跳转到编辑页面
      alert(`编辑用户: ${user.username}`);
    },
    toggleDisabled(user) {
      user.isDisabled = !user.isDisabled;
      // 这里可以添加保存更改的逻辑，比如发送到服务器
    },
    formatDate(dateString) {
      // 格式化日期字符串为本地时间格式
      const date = new Date(dateString);
      return date.toLocaleString();
    }
  }
};
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
</style>