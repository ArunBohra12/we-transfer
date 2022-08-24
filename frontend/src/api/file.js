'use strict';

import axios from 'axios';
import showAlert from '../utils/alert';
import { getCookieValue } from '../utils/cookie';
import { userLoginCheck } from './user';

export const uploadFile = async formData => {
  userLoginCheck();

  const token = getCookieValue('jwt');

  const requestOptions = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const fileUpload = await axios.post(`${import.meta.env.VITE_API_V1_URL}/file`, formData, requestOptions);

    showAlert('success', 'File uploaded successfully');
    return fileUpload.data;
  } catch (err) {
    const { data } = err.response;
    showAlert('error', data.message);
  }
};

export const downloadFile = async (fileId, password = '') => {
  try {
    const requestData = {
      filePassword: password,
    };

    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/file/${fileId}`, requestData);

    return res;
  } catch (err) {
    const { data } = err.response;
    showAlert('error', data.message);
  }
};
