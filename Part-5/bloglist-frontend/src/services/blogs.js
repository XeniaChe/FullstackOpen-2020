import axios from 'axios';
const baseUrl = 'http://localhost:3004/api/blogs';

const getAll = async () => {
  const result = await axios.get(baseUrl);
  console.log(result.data);
  return result.data;
};

const sendNewBlog = async (blog) => {
  const result = await axios.post(baseUrl, blog);
  console.log(result.data);
  return result.data;
};

export default { getAll, sendNewBlog };
