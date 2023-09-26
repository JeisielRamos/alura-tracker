import axios, { AxiosInstance } from "axios"

const clientHTTP: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/"
}) 

export default clientHTTP