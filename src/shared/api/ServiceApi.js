import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://cportalapi.agclinfra.in/api',
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    const userData = await AsyncStorage.getItem('@user_data');
    const msn = userData ? JSON.parse(userData).msn : null;
    if (msn && config.method === 'get') {
      config.params = { ...(config.params || {}), msn };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const response = await api.post('/Login/RefreshToken', { refreshToken });
          const { jwtToken } = response.data;
          await AsyncStorage.setItem('userToken', jwtToken);

          api.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${jwtToken}`;

          return api(originalRequest);
        } catch (err) {
          console.error('Refresh token failed', err);
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('refreshToken');
        }
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (requestBody) => {
  const response = await api.post('/Login/Authenticate/Mobile', requestBody);
  const { jwtToken, refreshToken, ...userData } = response.data;

  if (jwtToken && refreshToken) {
    await AsyncStorage.setItem('userToken', jwtToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  }

  await AsyncStorage.setItem('@user_data', JSON.stringify(userData));

  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('userToken');
  await AsyncStorage.removeItem('refreshToken');
  await AsyncStorage.removeItem('@user_data');
};

export const getMSN = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_data');
    if (!jsonValue) return null;
    const userData = JSON.parse(jsonValue);
    console.log(userData.msn);
    return userData.msn;
  } catch (error) {
    console.error('Failed to fetch MSN', error);
    return null;
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_data');
    if (!jsonValue) return null;
    const userData = JSON.parse(jsonValue);
    return userData;
  } catch (error) {
    console.error('Failed to fetch MSN', error);
    return null;
  }
};

export const getDashBoard = async (params = {}) => {
  return api.get('/Dashboard/Mobile', { params });
};

export const getConsumptionaLog = async (params = {}) => {
  console.log("params", params);
  return api.get('/Dashboard/mobile/ConsumptionLogComparison', { params });
};

export const getHistoryLog = async (params = {}) => {
  return api.get('/Dashboard/mobile/ConsumptionLogHistory', { params });
};

export const getLiveData = async (params = {}) => {
  return api.get('/Consumer/HourlyLiveData', { params });
};

export default api;
