<template>
    <div class="data-statistics-container">
        <!-- 在线人数统计 -->
        <div class="top-section">
            <UsagePercent :usage="cpuUsage" :resourceName="'CPU'" />
            <UsagePercent :usage="memoryUsage" :resourceName="'内存'" />
            <div class="user-count">
                <p style="margin-top:90px;">
                    <span>目前有&nbsp; </span>
                    <span style="border-bottom: 3px solid red;">&nbsp;{{ numInlinePerson }}&nbsp;</span>
                    <span> &nbsp;人在线</span>
                </p>
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
import { ref, reactive, onMounted, watch, onUnmounted } from 'vue';
import axios from 'axios';
import UsagePercent from './UsagePercent.vue';
import { ElMessage } from 'element-plus';


const numInlinePerson = ref(0);
const cpuUsage = ref(0);
const memoryUsage = ref(0);
const timeOutId = ref(null);


// 定义响应式状态
const state = reactive({
    startDate: null,
    endDate: null,
    // 保存之前的日期状态
    previousStartDate: null,
    previousEndDate: null
});
// 初始化日期
const initializeDates = () => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    // 设置初始值为当前日期和7天前的日期
    state.startDate = sevenDaysAgo.toISOString().split('T')[0];
    state.endDate = today.toISOString().split('T')[0];
    state.previousStartDate = state.startDate;
    state.previousEndDate = state.endDate;
};

// 加载图表
const initCharts = () => {
    const lineChart = echarts.init(document.getElementById('line-chart'));
    const areaChart = echarts.init(document.getElementById('area-chart'));
    const barChart = echarts.init(document.getElementById('bar-chart'));

    // 定义公共的 xAxis 配置
    const commonXAxisConfig = {
        type: 'category',
        axisLabel: {
            rotate: 45, // 旋转45度
            interval: 0  // 强制显示所有标签
        }
    };

    // 更新图表的方法
    const updateCharts = (data) => {
        if (data) {
            const lineData = data.line.map(item => item.value);
            const areaData = data.area.map(item => item.value);
            const barData = data.bar.map(item => item.value);

            // 提取所有日期作为 x 轴的数据
            const datesLine = data.line.map(item => item.date);
            const datesArea = data.area.map(item => item.date);
            const datesBar = data.bar.map(item => item.date);

            // 更新图表配置
            lineChart.setOption({
                title: { text: '视频新增浏览量' },
                tooltip: { trigger: 'axis' },
                xAxis: { ...commonXAxisConfig, data: datesLine },
                yAxis: { type: 'value' },
                series: [{ name: '数据', type: 'line', data: lineData }]
            });

            areaChart.setOption({
                title: { text: '账户新增数' },
                tooltip: { trigger: 'axis' },
                xAxis: { ...commonXAxisConfig, data: datesArea },
                yAxis: { type: 'value' },
                series: [{ name: '数据', type: 'line', areaStyle: {}, data: areaData }]
            });

            barChart.setOption({
                title: { text: '在线人数' },
                tooltip: { trigger: 'axis' },
                xAxis: { ...commonXAxisConfig, data: datesBar },
                yAxis: { type: 'value' },
                series: [{ name: '数据', type: 'bar', data: barData }]
            });
        }
    };

    // 获取图表数据并更新图表
    const fetchChartData = async () => {
        try {
            const response = await axios.get("https://apifoxmock.com/m1/5492516-5168386-default/admin/videoData", {
                params: {
                    start_date: state.startDate,
                    end_date: state.endDate
                }
            });

            // 构造图表数据
            const res = {
                line: response.data.line,
                area: response.data.area,
                bar: response.data.bar
            };
            updateCharts(res);
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    };

    // 首次加载时获取数据
    fetchChartData();
};
// 每十分钟获取一次在线人数
const fetchOnlineData = async () => {
    try {
        const response = await axios.get("https://apifoxmock.com/m1/5492516-5168386-default/admin/usageInfo");
        numInlinePerson.value = response.data.numerPerson;
        cpuUsage.value = response.data.cpuUsage;
        memoryUsage.value = response.data.memoryUsage;
    } catch (error) {
        console.error("Error fetching online users:", error);
    }
};

// 监听日期变化，重新获取图表数据
watch([() => state.startDate, () => state.endDate], ([newStart, newEnd]) => {
    // 将字符串转换为 Date 对象
    const startDateTime = new Date(newStart);
    const endDateTime = new Date(newEnd);
    const currentDate = new Date();

    // 检查是否选择了未来的时间
    if (startDateTime > currentDate || endDateTime > currentDate) {
        alert("请选择正确的时间范围（不能选择未来的时间）");
        // 恢复到之前的日期
        state.startDate = state.previousStartDate;
        state.endDate = state.previousEndDate;
    }
    // 检查结束时间是否早于开始时间
    else if (endDateTime < startDateTime) {
        ElMessage.error("结束时间必须大于或等于开始时间");
        // 恢复到之前的日期
        state.startDate = state.previousStartDate;
        state.endDate = state.previousEndDate;
    } else {
        if(state.startDate != state.previousStartDate ||
            state.endDate != state.previousEndDate
        ){
            initCharts(); //重新初始化图表
        }
        state.previousStartDate = state.startDate;
        state.previousEndDate = state.endDate;
        state.endDate = newEnd;
        state.startDate = newStart;
    }
});

// 组件挂载时初始化
onMounted(() => {
    initializeDates();
    initCharts();
    // 设置定时器每十秒钟获取一次在线数据
    timeOutId.value = setInterval(fetchOnlineData, 10 * 1000);
    // 首次加载时立即获取在线人数
    fetchOnlineData();
});

onUnmounted(() => {
    // 组件卸载时清除定时器
    clearInterval(timeOutId.value);
});



</script>

<style scoped>
/* 整个页面 */
.data-statistics-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 200px 5px 1fr;
}

/* 顶部部分 */
.top-section {
    grid-row: 1;
    display: flex;
    background-color: #fcfafa;
    align-items: start;
    justify-content: start;
    margin: 5px 10px;
}

.user-count {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
    text-align: center;
    /* 确保文本居中 */
}

/* 底部图标部分 */
.charts-section {
    grid-row: 3;
    display: grid;
    margin: 0 10px;
    grid-template-rows: 40px 10px 430px 1fr;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
}

/* 日期选择 */
.date-range {
    grid-row: 1;
    grid-column: 1 / 3;
    display: grid;
    align-items: center;
    background-color: #e4e2e2;
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
    display: grid;
    grid-template-rows: 1fr 1fr;
    row-gap: 10px;
}

.chart-1 {
    grid-row: 1;
}

.chart-2 {
    grid-row: 2;
}

.chart-3 {
    grid-column: 2;
    grid-row: 3;
}
</style>