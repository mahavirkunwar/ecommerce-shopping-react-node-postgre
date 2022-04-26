import axios from "axios";
import Const from "../src/config/const.js";

const instance = axios.create({
    baseURL: Const.baseURL
});

export default instance;