<template>
    <div ref="chart" style="width: 200px; height: 200px;"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
    usage: {
        type: Number,
        required: true
    },
    resourceName: {
        type: String,
        required: true
    }
});

const chart = ref(null);
let chartInstance = null;

const initChart = () => {
    if (chartInstance) {
        chartInstance.dispose();
    }
    chartInstance = echarts.init(chart.value);

    const option = {
        title: {
            text: `${props.resourceName} 使用率`,
            left: 'center',
            top: '80%', // 标题放置在顶部居中
            textStyle: {
                fontSize: 15, // 设置字体大小
                color: 'black',
            }
        },
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
            {
                name: '使用情况',
                type: 'gauge',
                min: 0,
                max: 100,
                detail: {
                    formatter: '{value}%',
                    offsetCenter: [0, '60%'],
                    fontSize: 18, // 设置数值字体大小
                    color: "black",
                },
                data: [
                    { value: props.usage, name: '使用率' }
                ],
                axisLine: {
                    lineStyle: {
                        width: 10, // 设置仪表盘宽度
                        color: [
                            [0.3, '#67e0e3'], // 0-30% 的颜色
                            [0.7, '#37a2da'], // 30-70% 的颜色
                            [1, '#fd666d']   // 70-100% 的颜色
                        ]
                    }
                },
                pointer: {
                    length: '80%', // 指针长度
                    width: 5 // 指针宽度
                },
                splitLine: {
                    length: 15, // 分割线长度
                    lineStyle: {
                        width: 1 // 分割线宽度
                    }
                },
                axisTick: {
                    length: 10, // 刻度线长度
                    lineStyle: {
                        width: 2 // 刻度线宽度
                    }
                },
                axisLabel: {
                    distance: 10, // 刻度标签距离
                    color: '#464646', // 刻度标签颜色
                    fontSize: 8 // 刻度标签字体大小
                }
            }
        ]
    };

    chartInstance.setOption(option);
};

const updateChart = () => {
    if (chartInstance) {
        const option = chartInstance.getOption();
        option.series[0].data[0].value = props.usage;
        option.title.text = `${props.resourceName} 使用率`;
        chartInstance.setOption(option);
    }
};

onMounted(() => {
    initChart();
});

onUnmounted(() => {
    if (chartInstance) {
        chartInstance.dispose();
    }
});

watch(() => [props.usage, props.resourceName], updateChart, { deep: true });
</script>