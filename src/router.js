import { createRouter, createWebHistory } from "vue-router";
import DataStatistics from "./components/views/DataStatistics.vue";
import InfoManage from "./components/views/InfoManage.vue";
import SystemSettings from "./components/views/SystemSettings.vue";
import UsersManage from "./components/views/UsersManage.vue";
import VideosManage from "./components/views/VideosManage.vue";
import Me from "./components/views/Me.vue";
import MeInfo from "./components/views/MeInfo.vue";
import MePassword from "./components/views/MePassword.vue";

const routes = [
    { path: "/", redirect: "/dataStatistics" },
    {
        path: "/dataStatistics",
        name: "Data",
        component: DataStatistics
    },
    {
        path: "/infoManage",
        name: "Info",
        component: InfoManage
    },
    {
        path: "/systemSettings",
        name: "System",
        component: SystemSettings
    },
    {
        path: "/usersManage",
        name: "Users",
        component: UsersManage
    },
    {
        path: "/videosManage",
        name: "Videos",
        component: VideosManage
    },
    {
        path: "/me",
        name: "me",
        component: Me,
        children: [
            {
                path: "info",
                name: "MeInfo",
                component: MeInfo
            },
            {
                path: "password",
                name: "MePassword",
                component: MePassword
            }
        ]

    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;