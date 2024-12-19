import { myGet , myDelete, myPost, myPut } from "./adminClient";

////////////////////////////////////////////////////////////

//获取用户个人信息
export const getAdminUsers = (jsonData) => {
  return myGet("/admin/users", jsonData, true);
};

//注册新用户
export const postAdminUsers = (jsonData) => {
  return myPost("/admin/users", jsonData, true);
};

//修改个人信息(名字/邮箱/状态)
export const putAdminUsers = (jsonData) => {
  return myPut("/admin/users", jsonData, true);
};

////////////////////////////////////////////////////////////

//修改密码
export const putAdminPassword = (jsonData) => {
  return myPut("/admin/password", jsonData, true);
};

////////////////////////////////////////////////////////////

//登录
export const postAdminToken = (jsonData) => {
  return myPost("/admin/token", jsonData, false);
};

////////////////////////////////////////////////////////////

//获取全部状态视频
export const getAdminVideos = (jsonData) => {
  return myGet("/admin/videos", jsonData, true);
};

//设置视频状态
export const putAdminVideos = (jsonData) => {
  return myPut("/admin/videos", jsonData, true);
};

//删除指定视频
export const deleteAdminVideos = (jsonData) => {
  return myDelete("/admin/videos", jsonData, true);
};

////////////////////////////////////////////////////////////

//管理员获取自己账号的信息
export const getAdmin = (jsonData) => {
  return myGet("/admin", jsonData, true);
};

////////////////////////////////////////////////////////////

//发送验证码
export const postUsersEmail = (jsonData) => {
  return myPost("/api/email", jsonData,false);
};

////////////////////////////////////////////////////////////

//获取实时数据
export const getAdminRealTimeData = () => {
  return myGet("/admin/real_time_data", {},true);
};

//获取历史数据
export const getAdminHistoricalData = (jsonData) => {
  return myGet("/admin/historical_data", jsonData,true);
};

////////////////////////////////////////////////////////////