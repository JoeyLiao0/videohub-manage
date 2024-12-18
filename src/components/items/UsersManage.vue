<template>
  <div class="user-container">
    <!-- 搜索栏 -->
    <div class="user-search">
      <!-- 用户编号搜索 -->
      <div class="search-id-input" style="margin-right: 80px;">
        <span class="search-text"> 用户编号 </span>
        <el-input placeholder="请输入用户ID" clearable v-model="searchId" @clear="handleClear"
          style="width: 240px"></el-input>
      </div>
      <!-- 用户名搜索 -->
      <div class="search-name-input" style="margin-right: 30px;">
        <span class="search-text"> 用户名 </span>
        <el-input placeholder="请输入用户名" v-model="searchName" clearable style="width: 240px" @clear="handleClear">
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
          <el-table-column property="null"  width="10" />
          <el-table-column property="id" label="编号" width="180"  sortable/>
          <el-table-column property="avater" label="用户头像" width="150" >
            <template v-slot="scope">
              <img :src="scope.row.avatar" alt="用户头像" style="width: 40px; height: 40px; border-radius: 50%;">
            </template>
          </el-table-column>
          <el-table-column property="name" label="用户名" width="180"  sortable/>
          <el-table-column property="email" label="用户邮箱" width="300" show-overflow-tooltip />
          <el-table-column property="level" label="用户状态" width="200" >
            <template v-slot="scope">
              {{ formatStatus(scope.row.status) }}
            </template>
          </el-table-column>
          <el-table-column property="time" label="注册时间" width="240">
            <template v-slot="scope">
              {{ formatDate(scope.row.time) }}
            </template>
          </el-table-column>

          <!-- 是否禁用 -->
          <el-table-column property="ban" label="是否封禁" width="120">
            <template v-slot="scope">
              <el-switch v-model="scope.row.isEnable"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" 
                inline-prompt 
                active-text="启用"
                inactive-text="封禁" 
                v-show="scope.row.visible"
                @change="(newState) => handleStateChange(scope.row, newState)">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="user-table-pages-button">
        <el-pagination 
          v-model:current-page="queryInfo.pagenum" 
          v-model:page-size="queryInfo.limit"
          :page-sizes="[5, 10]"
          background="true" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="total_pages"
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { ElMessage, ElTable } from 'element-plus';
import axios from 'axios';
// 搜索框
const searchId = ref('');
const searchName = ref('');
const size = ref(10);
// 分页机制
const userList = ref([]);  // 用户数据
const total_pages = ref(0); //
const queryInfo = reactive({
  page: 1,
  limit: 10,
  sort: "id",
  order: 0,
  like: "",
  status: 1,
  id: "",
});

// 搜索
function handleSearch() {
  const search = ref(false);

  if(searchId.value != ''){
    queryInfo.id = searchId.value;
    search.value = true;
  }
  
  if(searchName.value != ''){
    queryInfo.like = searchName.value;
    search.value = true;
  }

  // 搜索数据
  if(search.value){
    getUserList(queryInfo);
  }
  
}
// 清除搜索框
function handleClear() {
  searchId.value = '';
  searchName.value = '';
  queryInfo.id = '';
  queryInfo.like = '';
  getUserList(queryInfo);
}
// 用户状态改变
async function handleStateChange(user, newState) {
  const id = user.id
  const params = {
    name:user.username,
    id: user.id,
    state: newState ? 0:1,
    access: 'access_token'
  }

  const res = await axios.put(`https://apifoxmock.com/m1/5501967-5178103-default/admin/users/${id}`,{
    params: params
  });

  if (res.data.code === 200) {
    ElMessage.success('修改成功');
  } else {
    ElMessage.error('修改失败');
  }

  getUserList();
}

// 获取用户列表
async function getUserList() {
  try {
    const res = await axios.get("https://apifoxmock.com/m1/5501967-5178103-default/admin/users", {
      params: queryInfo
    });

    if (res.status !== 200) {
      ElMessage.error('获取用户列表失败');
      return;
    }
    // 更新用户列表并为每个用户添加 isEnable, visible 属性
    userList.value = res.data.users.map(user => ({
        ...user,
        isEnable: user.status === 0, // 假设 0 表示正常状态，其他值表示非启用状态
        visible: user.status < 2, // 假设 0 和 1 表示可见，其他值表示不可见
    }));
    total_pages.value = res.data.pages.total_pages;  // 修改 .value 属性
    queryInfo.page = res.data.pages.page;
    queryInfo.limit = res.data.pages.limit;
  } catch (error) {
    console.error('Error fetching user list:', error);
    ElMessage.error('网络请求失败，请稍后再试');
  }
}

// 时间戳转换为日期
function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp * 1000); // 将秒转换为毫秒
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
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
  queryInfo.sort = prop;
  queryInfo.order = order === 'ascending' ? 0 : 1; // 0 表示升序，1 表示降序
  // 重新获取用户列表
  getUserList();
}

// 分页大小改变
const handleSizeChange = (val) => {
  queryInfo.limit = val;
  getUserList();
}
// 分页页码改变
const handleCurrentChange = (val) => {
  queryInfo.page = val;
  getUserList();
}

onMounted(() => {
  queryInfo.sort = "id";
  queryInfo.order = 0; // 0 表示升序
  getUserList();
});

</script>

<style scoped>
.user-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 102px 1fr auto;
}

/*  搜索栏  */
.user-search {
  margin-top: 15px;
  margin-left: 23px;
  display: flex;
  grid-row: 1;
  background-color: aliceblue;
  align-items: center;
}

/*  表格  */
.user-table {
  grid-row: 2;
  background-color: aqua;
  display: grid;
  grid-template-rows: 1fr 40px;
  border-top: 2px solid #000;
}

/*  分页   */
.user-table-block {
  margin-bottom: 16px;
  background-color: rgb(255, 255, 255);
  width: 100%;
  grid-row: 1;
}

/*  分页栏  */
.user-table-pages-button {
  align-items: center;
  margin-left: 10px;
}
</style>