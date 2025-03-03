import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setupAxiosInstance = async () => {
  const proxyEnabled = await AsyncStorage.getItem('proxy');
  const proxyAddress = await AsyncStorage.getItem('proxyAddress');
  const proxyAuthEnabled = await AsyncStorage.getItem('proxyAuth');
  const proxyUsername = await AsyncStorage.getItem('proxyUsername'); 
  const proxyPassword = await AsyncStorage.getItem('proxyPassword');

  const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.44:5199/api',
  });

  if (proxyEnabled === 'true' && proxyAddress) {
    const urlWithoutProtocol = proxyAddress.replace(/^https?:\/\//, '');
    const [host, port] = urlWithoutProtocol.split(':');

    axiosInstance.defaults.proxy = {
      host,
      port: parseInt(port, 10),
    };

    if (proxyAuthEnabled === 'true' && proxyUsername && proxyPassword) {
      axiosInstance.defaults.proxy.auth = {
        username: proxyUsername,
        password: proxyPassword,
      };
    }

  } else {
    console.log('Proxy is not enabled.');
  }

  console.log(axiosInstance.defaults);
  return axiosInstance;
};

export const baseQueryWithReauth = async ({ url, method = 'GET', body, headers }: any) => {
  try {
    const axiosInstance = await setupAxiosInstance();

    const token = await AsyncStorage.getItem('token');
    if (token) {
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }

    const response = await axiosInstance({
      url,
      method,
      data: body,
      headers,
    });

    return { data: response.data };
  } catch (error) {
    return { error: { status: error.response?.status, data: error.message } };
  }
};