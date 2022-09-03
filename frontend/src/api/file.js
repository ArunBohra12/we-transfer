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
    const fileUpload = await axios.post(`/api/v1/file`, formData, requestOptions);

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

    const res = await axios.post(`/file/${fileId}`, requestData);

    return res;
  } catch (err) {
    const { data } = err.response;
    showAlert('error', data.message);
  }
};
