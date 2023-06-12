import axios from "axios";

//基础API路径;
// axios.defaults.baseURL = 'http://192.168.31.214:8080';
//基础API路径;

// 请求拦截器
axios.interceptors.request.use(
  (config: any) => {
    // 拦截请求 携带token
    console.log("axios拦截是否成功");
    const token = localStorage.token;
    config.headers.Authorization = token;
    //拦截请求headers加上Token;
    //后端接口写错;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
// 请求拦截器

// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          console.log(401);
          break;
        case 404:
          console.log(404);
          break;
        default:
          console.log(200);
          break;
      }
    } else {
    }
  }
);
// 响应拦截器
