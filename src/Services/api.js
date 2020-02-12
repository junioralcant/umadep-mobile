import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'https://api-umadep.herokuapp.com',
});

api.interceptors.request.use(async config => {
  try {
    const token = await AsyncStorage.getItem('@AppAgua:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    alert(error);
  }
});

// metodo auternativo para dar put ou post
api.postOrPut = (url, id, data, config = {}) => {
  const method = id ? 'put' : 'post';
  const apiUrl = id ? `${url}/${id}` : url;

  return api[method](apiUrl, data, config);
};

export default api;
