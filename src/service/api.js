import axios from "axios";

const http = axios.create({
    baseURL: 'https://store.go-clothes.uz/v1'
}) 


http.interceptors.request.use((config)=>{
    let token = localStorage.getItem("access_token")
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export default http