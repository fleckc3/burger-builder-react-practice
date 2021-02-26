import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-28bc3-default-rtdb.europe-west1.firebasedatabase.app'
});

export default instance;