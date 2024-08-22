import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apikuslabs.com',

});

const fetchData = async () => {
  try {
    const response = await api.get('/assets/resources.json');
    console.log('Response Type:', typeof response.data);
    console.log('Response:', response.data);
  } catch (error) {
    console.error(error);
  }
};

fetchData();