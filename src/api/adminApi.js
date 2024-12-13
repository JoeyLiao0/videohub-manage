import { myGet , myDelete, myPost, myPut } from "./adminManage";


////////////////////////////////////////////////////////////

//获取用户个人信息
export const getUsers = () => {
  return myGet("/users", {}, true);
};

//注册新用户
export const postUsers = (jsonData) => {
  return myPost("/users", jsonData, false);
};

//修改个人信息(名字/邮箱)
export const putUsers = (jsonData) => {
  return myPut("/users", jsonData, true);
};

//注销账号
export const deleteUsers = () => {
  return myDelete("/users", {}, true);
};

////////////////////////////////////////////////////////////

//上传头像
export const postUsersAvatar = (formData) => {
  return myPost("/users/avatar", formData, true);
};

////////////////////////////////////////////////////////////

//修改密码
export const putUsersPassword = (jsonData) => {
  return myPut("/users/password", jsonData, true);
};

////////////////////////////////////////////////////////////

//登录
export const postUsersToken = (jsonData) => {
  return myPost("/users/token", jsonData, false);
};

//访问令牌更新，放到userClient.js里
// export const postUsersAccessToken = (jsonData) =>{
//   return myPost('/users/access_token',jsonData,{headersAddToken:true});
// }

////////////////////////////////////////////////////////////

//获取用户的收藏视频
export const getUsersFavorites = () => {
  return myGet("/users/collections", {}, true);
};

//收藏视频
export const postUsersFavorites = (jsonData) => {
  return myPost("/users/collections", jsonData, true);
};

//取消收藏视频
export const deleteUsersFavorites = (jsonData) => {
  return myDelete("/users/collections", jsonData, true);
};

////////////////////////////////////////////////////////////

// 获取视频
export const getVideos = (jsonData) => {
  return myGet("/videos", jsonData, false);
};

////////////////////////////////////////////////////////////

//获取用户自己发布的视频
export const getUsersVideos = () => {
  return myGet("/users/videos", {}, true);
};

//个人删除视频
export const deleteUsersVideos = (jsonData) => {
  return myDelete("/users/videos", jsonData, true);
};

////////////////////////////////////////////////////////////

//点赞视频
export const postVideosLike = (jsonData) => {
  return myPost("/videos/likes", jsonData, true);
};

//取消点赞视频
export const deleteVideosLike = (jsonData) => {
  return myDelete("/videos/likes", jsonData, true);
};

////////////////////////////////////////////////////////////

//获取视频评论
export const getVideosComments = (jsonData) => {
  return myGet("/videos/comments", jsonData, false);
};

//新增视频评论
export const postVideosComments = (jsonData) => {
  return myPost("/videos/comments", jsonData, true);
};

//删除视频评论
export const deleteVideosComments = (jsonData) => {
  return myDelete("/videos/comments", jsonData, true);
};

////////////////////////////////////////////////////////////

//点赞评论
export const postVideosCommentsLike = (jsonData) => {
  return myPost("/videos/comments/likes", jsonData,true);
};

//取消点赞评论
export const deleteVideosCommentsLike = (jsonData) => {
  return myDelete("/videos/comments/likes", jsonData,true);
};

////////////////////////////////////////////////////////////

//分片上传
export const postVideosChunk = (formData) => {
  return myPost("/videos/chunk", formData,true);
};

//分片上传结束
export const postVideosComplete = (formData) => {
  return myPost("/videos/complete", formData,true);
};

////////////////////////////////////////////////////////////

//发送验证码
export const postUsersEmail = (jsonData) => {
  return myPost("/api/email", jsonData,false);
};

////////////////////////////////////////////////////////////
