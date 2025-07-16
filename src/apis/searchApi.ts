import axios from 'axios';


const apiKey = 'xwANgCfucb3swXtUQm8y';

const searchApi = axios.create({
    baseURL: 'https://api.maptiler.com/geocoding'
});

export default searchApi;
export { apiKey };