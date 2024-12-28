import Cookies from 'js-cookie'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
export const getAccessToken = () => Cookies.get(ACCESS_TOKEN_KEY);

export const setAccessToken = (token) => {
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    sameSite: 'Lax', // 设置SameSite属性为Lax，允许在相同站点的请求中发送cookie
  });
};

export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY);

export const setRefreshToken = (token) => {
  Cookies.set(REFRESH_TOKEN_KEY, token, {
    sameSite: 'Lax', // 设置SameSite属性为Lax
  });
};

// // 定义存储的键名
// const ACCESS_TOKEN_KEY = 'access_token';
// const REFRESH_TOKEN_KEY = 'refresh_token';

// // 从localStorage获取accessToken
// export const getAccessToken = () => {
//   const token = localStorage.getItem(ACCESS_TOKEN_KEY);
//   return token ? JSON.parse(token) : null;
// };

// // 将accessToken存储到localStorage
// export const setAccessToken = (token) => {
//   localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token));
// };

// // 从localStorage获取refreshToken
// export const getRefreshToken = () => {
//   const token = localStorage.getItem(REFRESH_TOKEN_KEY);
//   return token ? JSON.parse(token) : null;
// };

// // 将refreshToken存储到localStorage
// export const setRefreshToken = (token) => {
//   localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(token));
// };