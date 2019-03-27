import axios from 'axios';

const HOST = axios.create({
   baseURL: 'http://localhost:3000/',
   // headers: {
   //     Authorization: 'Bearer skdjfhds'
   // }
});

export default HOST;