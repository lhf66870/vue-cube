const axios = require("axios");
export default function(vm) {
    axios.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.token = token;
            // config.headers.Authorization ="Bearer " + token;
        }
        return config;
    },error =>{
        return Promise.reject(err);
    });
    // 响应拦截
    axios.interceptors.response.use(null, err => {
        if (err.response.status === 401) {
        // 清空vuex和localstorage
            vm.$store.dispatch("logout");
            // 跳转login
            vm.$router.push("/login");
        }
        return Promise.reject(err);
    });
}
