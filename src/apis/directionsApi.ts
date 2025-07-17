import axios from 'axios';

const directionsApi = axios.create({
  baseURL: 'https://router.project-osrm.org/route/v1', // OSRM base
  timeout: 5000
});

export default directionsApi;
