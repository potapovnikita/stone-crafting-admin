import axios from 'axios';
import { axiosInstance, getHeadersWithAuth } from './api-utils';

const authUrl = 'https://app.oberegbox.ru/api/auth';
const backUrl = 'https://app.oberegbox.ru/api/back';

/**
 * Авторизация по контракту и паролю
 * @param username контракт
 * @param password пароль
 * @param grant_type тип авторизации
 */
export const token = (username, password, grant_type = 'password') => {
  return axiosInstance.post(`${authUrl}/token`, {
    password,
    username,
    grant_type,
  });
}

/** Авторизация по контракту и паролю
* @param email контракт
* @param password пароль
* @param confirmPassword подтверждение пароля
*/
export const register = (email, password, confirmPassword) => {
  return axiosInstance.post(`${authUrl}/register`, {
    email,
    password,
    confirmPassword,
    loginPath: '/login',
  });
}

/** Авторизация по контракту и паролю
* @param userId id пользователя
* @param password пароль
* @param confirmPassword подтверждение пароля
* @param resetPasswordToken токен сброса пароля
*/
export const restore = (userId, password, confirmPassword, resetPasswordToken) => {
  return axiosInstance.post(`${authUrl}/resetPassword`, {
    userId,
    password,
    confirmPassword,
    resetPasswordToken,
  });
}

/** Авторизация по контракту и паролю
* @param resetPasswordPath путь для ввода нового и старого пароля
* @param username имя пользователя
*/
export const sendRestoreMail = (resetPasswordPath, username) => {
  return axiosInstance.get(`${authUrl}/resetPasswordToken?resetPasswordPath=${resetPasswordPath}&username=${username}`, {
    headers: getHeadersWithAuth(),
  });
}

/**
 * Получение объектов заботы
 */
export const getPatients = () => {
  return axiosInstance.get(`${backUrl}/patients`, {
    headers: getHeadersWithAuth(),
  });
}

/**
 * Добавление объекта заботы
 */
export const addPatient = (patient) => {
  return axiosInstance.post(`${backUrl}/patient`, {
    ...patient,
  },{
    headers: getHeadersWithAuth(),
  });
}

/**
 * Получение объектов заботы
 */
export const updatePatient = (patient) => {
  return axiosInstance.put(`${backUrl}/patient`, {
    ...patient,
  },{
    headers: getHeadersWithAuth(),
  });
}

/**
 * Получение объектов заботы
 */
export const deletePatient = (patientId) => {
  return axiosInstance.delete(`${backUrl}/patient?patientId=${patientId}`,{
    headers: getHeadersWithAuth(),
  });
}


// export const api = {
//   login: function (username, password, grant_type = 'password') {
//     return axios.post(`${API}/user/auth`, qs.stringify({
//       username,
//       password,
//     }), {
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//       }
//     })
//   },
//   getTrackers: function () {
//     return axios.post(`${API}/tracker/list`, qs.stringify({
//       hash
//     }), {
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//       }
//     })
//   },
//   getCoordinates: function (trackerId, from, to) {
//     return axios.post(`${API}/track/read`, qs.stringify({
//       tracker_id: trackerId,
//       from,
//       to,
//       hash
//     }), {
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//       }
//     })
//   }
// };
