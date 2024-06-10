import axios from "axios";


export const AxiosClient = axios.create({
    baseURL:"http://localhost:4444"
})

export const AxiosClientAuth = axios.create({
    baseURL:"http://localhost:4444",
    withCredentials:true
})

