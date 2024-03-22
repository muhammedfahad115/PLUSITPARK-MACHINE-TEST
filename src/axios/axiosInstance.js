import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://interview-plus.onrender.com'
})

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Token');

        if(token){
            config.headers['x-access-token'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default axiosInstance;