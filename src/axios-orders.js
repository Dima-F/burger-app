import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-aafc2.firebaseio.com'
});

export default instance;