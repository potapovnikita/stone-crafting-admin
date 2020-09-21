import axios from 'axios';
import Cookies from 'universal-cookie';

export const TOKEN = 'token';
export const cookies = new Cookies();

let token = cookies.get(TOKEN);

cookies.addChangeListener(params => {
  if (params.name === TOKEN) {
    token = String(params.value);
  }
});

/**
 * Экземпляр axios, который решает проблему с передачей массивов
 */
export const axiosInstance = axios.create({
  paramsSerializer(params) {
    const searchParams = new URLSearchParams();
    for (const key of Object.keys(params)) {
      const param = params[key];
      if (Array.isArray(param)) {
        for (const p of param) {
          searchParams.append(key, p);
        }
      } else {
        searchParams.append(key, param);
      }
    }
    return searchParams.toString();
  },
});

/**
 * Добавляет заголовок авторизации к объекту заголовков
 * @param headers {object} объект с заголовками
 * @return {object} объект со старыми заголовками и авторизацией
 */

export const getHeadersWithAuth = (headers = axios.defaults.headers.common) => {
  return headers
    ? { ...headers, Authorization: `Bearer ${token}` }
    : { Authorization: `Bearer ${token}` };
};