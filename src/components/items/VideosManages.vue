<template>
    <div>
        <table border="1">
            <thead>
                <tr>
                    <th>标题</th>
                    <th>大小</th>
                    <th>创建时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>[2019-11-25]篮球BLG vs T1</td>
                    <td>250MB</td>
                    <td>2019-02-12 12:23:13</td> <!-- 注意：这里使用了图片的创建时间作为示例，但可能与标题不匹配，实际应根据具体需求调整 -->
                    <td>可观看</td>
                    <td>
                        <button @click="handleEdit">编辑</button>
                        <button @click="handleDisable">禁用</button>
                    </td>
                </tr>
                <tr>
                    <td>[2019-11-25]篮球Bilibili BLG vs T1</td>
                    <td>---</td> <!-- 大小未知，用---表示 -->
                    <td>---</td> <!-- 创建时间未知，用---表示 -->
                    <td>可用</td>
                    <td>
                        <button @click="handleEdit">编辑</button>
                        <!-- 假设可用状态不能禁用 -->
                        <button disabled>禁用</button>
                    </td>
                </tr>

                <!-- 示例：更多行（根据实际需求添加） -->
                <tr>
                    <td>11月2日决赛BLGvsT1</td>
                    <td>---</td>
                    <td>---</td>
                    <td>可观看</td>
                    <td>
                        <button @click="handleEdit">编辑</button>
                        <button @click="handleDisable">禁用</button>
                    </td>
                </tr>
                <tr>
                    <td>【S14决赛】不送就赢？ BLG离冠军最近的1局！</td>
                    <td>---</td>
                    <td>---</td>
                    <td>可观看</td>
                    <td>
                        <button @click="handleEdit">编辑</button>
                        <button @click="handleDisable">禁用</button>
                    </td>
                </tr>
                <!-- 注意：这里的表格数据是静态的，实际应用中可能需要从API或数据库获取 -->
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "VideosManages",
    methods: {
        handleEdit() {
            alert('编辑功能未实现');
            // 这里可以添加编辑功能的实现代码
        },
        handleDisable() {
            alert('禁用功能未实现');
            // 这里可以添加禁用功能的实现代码，例如更新数据库中的状态
        }
    }
}
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
}

button {
    margin-right: 5px;
}
</style>