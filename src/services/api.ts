import axios from 'axios';
import {baseURL, timestamp, publicKey, hash} from '../config/consts';

const api = axios.create({
    baseURL,
    params: {
        ts: timestamp,
        apikey: publicKey,
        hash,
    }
});

export default api;