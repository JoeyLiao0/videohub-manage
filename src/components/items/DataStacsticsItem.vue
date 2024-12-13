<template>
    <div class="data-statistics-container">
        <!-- 在线人数统计 -->
        <div class="top-section">
            <div class="percentage">
                <svg viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" stroke="#ccc" stroke-width="2" fill="none" />
                    <circle cx="100" cy="100" r="90" stroke="#007bff" stroke-width="2"
                        :style="{ strokeDasharray: '180, 180', strokeDashoffset: 10 - (1 * 0.225 * 2) }" />
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20"
                        font-family="Arial, sans-serif">
                        {{ state.onlineUsersPercentage }}%
                    </text>
                </svg>
            </div>
            <div class="user-count">
                <span>目前有 </span>
                <span style="border-bottom: 1px solid black;">{{ state.onlineUsers }}</span>
                <span> 人在线</span>
            </div>
        </div>
        <!-- 日期和图表 -->
        <div class="charts-section">
            <!-- 日期 -->
            <div class="date-range">
                <div class="begin-date">
                    <span> 起始时间选择 </span>
                    <input type="date" v-model="state.startDate" />
                </div>
                <div class="end-date">
                    <span>终止时间选择 </span>
                    <input type="date" v-model="state.endDate" />
                </div>
            </div>
            <!-- 图表显示区 -->
            <div class="chart-container1">
                <div class="chart-1" id="line-chart"></div>
                <div class="chart-2" id="area-chart"></div>
            </div>
            <div class="chart-3" id="bar-chart"></div>
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, reactive, onMounted, computed, watch, onUnmounted } from 'vue';
import axios from 'axios';

// 假设有一个 API 端点用于获取在线人数
const onlineUsersApi = 'https://api.example.com/online-users';
// 假设有另一个 API 端点用于获取图表数据
const chartDataApi = 'https://api.example.com/chart-data';

const timeOutId = ref(null);
// 定义响应式状态
const state = reactive({
    onlineUsers: 0,
    onlineUsersPercentage: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    lineChartData: null,
    areaChartData: null,
    barChartData: null
});

// 初始化图表
const initCharts = () => {
  const lineChart = echarts.init(document.getElementById('line-chart'));
  const areaChart = echarts.init(document.getElementById('area-chart'));
  const barChart = echarts.init(document.getElementById('bar-chart'));

  // 定义默认的图表配置
  const defaultLineOption = {
    title: { text: '折线图' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: [1,2,3,4,5,6] },
    yAxis: { type: 'value' },
    series: [{ name: '数据', type: 'line', data: [1,2,3,4,5,6] }]
  };

  const defaultAreaOption = {
    title: { text: '面积图' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: [1,2,3,4,5,6] },
    yAxis: { type: 'value' },
    series: [{ name: '数据', type: 'line', areaStyle: {} , data: [3,2,1,5,4,6] }]
  };

  const defaultBarOption = {
    title: { text: '柱状图' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: [1,2,3,4,5,6] },
    yAxis: { type: 'value' },
    series: [{ name: '数据', type: 'bar', data: [6,5,4,3,2,1] }]
  };

  // 设置初始选项
  lineChart.setOption(defaultLineOption);
  areaChart.setOption(defaultAreaOption);
  barChart.setOption(defaultBarOption);

  // 更新图表的方法
  const updateCharts = (data) => {
    if (data) {
      const lineData = data.line || [];
      const areaData = data.area || [];
      const barData = data.bar || [];

      // 假设我们有一个日期数组作为 x 轴的数据
      const dates = Array.from({ length: lineData.length }, (_, i) =>
        new Date(state.startDate).toISOString().split('T')[0]
      );

      // 更新图表配置
      lineChart.setOption({
        xAxis: { data: dates },
        series: [{ data: lineData }]
      });

      areaChart.setOption({
        xAxis: { data: dates },
        series: [{ data: areaData }]
      });

      barChart.setOption({
        xAxis: { data: dates },
        series: [{ data: barData }]
      });
    }
  };

  // 获取图表数据并更新图表
  const fetchChartData = async () => {
    try {
      const response = await axios.get(chartDataApi, {
        params: {
          start_date: state.startDate,
          end_date: state.endDate
        }
      });

      // 构造图表数据
      const res = {
        line: response.data.line || [1, 2, 3, 4, 5, 6], 
        area: response.data.area || [1, 2, 3, 4, 5, 6], 
        bar: response.data.bar || [1, 2, 3, 4, 5, 6]
      };

      state.lineChartData = res.line;
      state.areaChartData = res.area;
      state.barChartData = res.bar;
      updateCharts(res);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  // 首次加载时获取数据
  fetchChartData();
};
// 每十分钟获取一次在线人数
const fetchOnlineUsers = async () => {
    try {
        const response = await axios.get(onlineUsersApi);
        state.onlineUsers = response.data.online_users;
    } catch (error) {
        console.error("Error fetching online users:", error);
    }
};

// 组件挂载时初始化
onMounted(() => {
    initCharts();
    // 设置定时器每十分钟获取一次在线人数
    timeOutId.value = setInterval(fetchOnlineUsers, 10 * 60 * 1000);
    // 首次加载时立即获取在线人数
    fetchOnlineUsers();
});

onUnmounted(() => {
    // 组件卸载时清除定时器
    clearInterval(timeOutId.value);
});

// 监听日期变化，重新获取图表数据
watch([() => state.startDate, () => state.endDate], ([newStart, newEnd]) => {
    initCharts(); // 你可以选择是否要在这里重新初始化图表
    fetchChartData();
});

</script>

<style scoped>
/* 整个页面 */
.data-statistics-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 150px 15px 1fr;
}

/* 顶部部分 */
.top-section {
    grid-row: 1;
    display: flex;
    background-color: #c3b9b9;
    align-items: center;
    margin: 10px 10px;
    border: 1px solid black;
}

.percentage {
    background-color: #523232;
    margin: 10px 30px 10px 0px;
    width: 125px;
    height: 125px;
}

.user-count {
    background-color: aliceblue;
}



/* 底部图标部分 */
.charts-section {
    grid-row: 3;
    display: grid;
    border: 3px solid black;
    margin: 0 10px;
    grid-template-rows: 40px 10px 460px 1fr;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
}

/* 日期选择 */
.date-range {
    grid-row: 1;
    grid-column: 1 / 3;
    display: grid;
    align-items: center;
    background-color: #c3b9b9;
}

.begin-date {
    grid-column: 1;
}

.end-date {
    grid-column: 2;
}

/* 图表  */
.chart-container1 {
    grid-column: 1;
    grid-row: 3;
    background-color: rgba(132, 33, 11, 0.837);
    display: grid;
    grid-template-rows: 1fr 1fr;
    row-gap: 10px;
}

.chart-1 {
    grid-row: 1;
    background-color: aqua;
}

.chart-2 {
    grid-row: 2;
    background-color: aliceblue;
}

.chart-3 {
    grid-column: 2;
    grid-row: 3;
    background-color: rgb(244, 254, 254);
}
</style>