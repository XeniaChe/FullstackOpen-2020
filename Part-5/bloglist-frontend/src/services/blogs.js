import axios from 'axios';
const baseUrl = 'http://localhost:3004/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export default { getAll };
