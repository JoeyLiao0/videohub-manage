<template>
  <div class="user-container">
    <!-- 搜索栏 -->
    <div class="user-search">
      <!-- 用户编号搜索 -->
      <div class="search-id-input">
        <span class="search-text" style="margin-left: 20px;"> 用户编号 </span>
        <el-input placeholder="请输入用户编号" clearable v-model="searchData.id" @clear="handleClear"
          style="width: 240px"></el-input>
      </div>
      <!-- 用户名搜索 -->
      <div class="search-name-input" style="margin-left: 60px; margin-right: 30px;">
        <span class="search-text"> 用户名 </span>
        <el-input placeholder="请输入用户名" v-model="searchData.name" clearable style="width: 240px" @clear="handleClear">
        </el-input>
      </div>

      <!-- 搜索按钮 -->
      <div class="search-button">
        <el-button :icon="Search" circle @click="handleSearch" />
      </div>
    </div>
    <!-- 用户表格 -->
    <div class="user-table">
      <!-- 用户页 -->
      <div class="user-table-block">
        <el-table :data="userList" style="width: 100%" @sort-change="handleSortChange">
          <!-- 复选框 -->
          <el-table-column property="null" width="10" />
          <el-table-column property="id" label="编号" sortable />
          <el-table-column property="avater" label="用户头像">
            <template v-slot="scope">
              <img :src="scope.row.avatar" alt="用户头像" style="width: 40px; height: 40px; border-radius: 50%;">
            </template>
          </el-table-column>
          <el-table-column property="name" label="用户名" sortable />
          <el-table-column property="email" label="用户邮箱" show-overflow-tooltip />
          <el-table-column property="time" label="注册时间" width="240">
            <template v-slot="scope">
              {{ formatDate(scope.row.time) }}
            </template>
          </el-table-column>

          <!-- 是否禁用 -->
          <el-table-column property="ban" label="状态" width="100">
            <template v-slot="scope">
              <el-switch v-model="scope.row.isEnable"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" inline-prompt active-text="启用"
                inactive-text="封禁" v-if="scope.row.visible"
                @change="(newState) => handleStateChange(scope.row, newState)">
              </el-switch>
              <span v-if="!scope.row.visible">注销</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="user-table-pages-button">
        <el-pagination v-model:current-page="queryInfo.page" v-model:page-size="queryInfo.limit" :page-sizes="[10]"
          background="true" layout="total, sizes, prev, pager, next, jumper" :total="total_pages"
          @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { getAdminUsers, putAdminUsers } from '@/api/adminApi';
import { useStore } from 'vuex';
const searchData = ref(
  {
    id: null,
    name: null
  }
)

const store = useStore();

const userList = ref([]);  // 用户数据

// 分页机制
const total_pages = ref(1);
const queryInfo = ref({
  page: 1,
  limit: 10,
  sort: "id",
  order: 0,
  like: null,
  status: -1,
  id: null,
});

// 搜索
function handleSearch() {
  if (searchData.value.id != '') {
    queryInfo.value.id = searchData.value.id;
  }
  if (searchData.value.name != '') {
    queryInfo.value.like = searchData.value.name;
  }
  getUserList();
}

// 清除搜索框
function handleClear() {
  searchData.value.id = null;
  searchData.value.name = null;
  queryInfo.value.id = null;
  queryInfo.value.like = null;
  getUserList();
}
// 用户状态改变
async function handleStateChange(user, newState) {
  console.log("user:" + user);
  console.log("newState:" + newState);
  user.isEnable = newState;
  const userData = {
    uid: user.id,
    new_status: newState
  }
  try {
    const response = await putAdminUsers(userData);
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

// 获取用户列表
async function getUserList() {
  try {
    const response = await getAdminUsers(queryInfo.value);

    if (response != null && response.data.code === 200) {
      userList.value = response.data.data.users;
      total_pages.value = response.data.data.pages.total_pages;
      // 更新用户列表并为每个用户添加 isEnable, visible 属性
      userList.value = response.data.data.users.map(user => ({
        ...user,
        isEnable: user.status === 0, // 假设 0 表示正常状态，其他值表示非启用状态
        visible: user.status < 2, // 假设 0 和 1 表示可见，其他值表示不可见
      }));
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

// 状态值转换为中文描述
function formatStatus(status) {
  const statusMap = {
    0: '正常',
    1: '封禁',
    2: '注销'
  };
  return statusMap[status] || '未知';
}


// 处理排序变化
function handleSortChange({ prop, order }) {
  // 更新查询参数
  queryInfo.value.sort = prop;
  queryInfo.value.order = order === 'ascending' ? 0 : 1; // 0 表示升序，1 表示降序
  // 重新获取用户列表
  getUserList();
}

// 分页页码改变
const handleCurrentChange = (val) => {
  if (total_pages >= val && val >= 1) {
    queryInfo.value.page = val;
    getUserList();
  }
}

onMounted(() => {
  queryInfo.value.sort = "id";
  queryInfo.value.order = 0; // 0 表示升序
  getUserList();
});

</script>

<style scoped>
.user-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 80px 1fr;
  grid-template-columns: 1fr;
  position: relative;
}

.user-search {
  display: flex;
  grid-row: 1;
  width: 100%;
  background-color: aliceblue;
  align-items: center;
}

.user-table {
  grid-row: 2;
  width: 100%;
  position: relative;
  background-color: rgb(214, 228, 228);
  display: grid;
  grid-template-rows: 1fr 70px;
}

.user-table-block {
  background-color: rgb(255, 255, 255);
  width: 100%;
  grid-row: 1;
}

.user-table-pages-button {
  align-items: center;
  padding-top: 20px;
  padding-left: 20px;
  width: auto;
}
</style>