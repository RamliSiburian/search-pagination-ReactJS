import axios from "axios";

export const API = axios.create({
    // baseURL: "https://search-pagination.up.railway.app/api/sio/" || "http://localhost:5000/api/sio/"
    baseURL: "https://search-pagination.up.railway.app/api/sio/"
    // baseURL: "http://localhost:5000/api/sio/"
});

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.commin["Authorization"];
    }
};