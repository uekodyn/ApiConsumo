import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://5ff75c21e7164b0017e1a82d.mockapi.io/api/v1',
});