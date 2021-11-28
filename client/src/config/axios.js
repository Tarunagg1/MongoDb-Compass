import axios from 'axios';

const API_URL = "http://localhost:4000/api";

const axiosinstance = axios.create({baseURL: API_URL});


export default axiosinstance;