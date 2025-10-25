import axios from "axios";

const esamudaay = axios.create({
    baseURL: "https://api.esamudaay.com/api",
    headers: {
        Authorization: `Bearer //token` 
    }
});

export default esamudaay;
