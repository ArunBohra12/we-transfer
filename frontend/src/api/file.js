import axios from 'axios';
import showAlert from '../utils/alert';
import { getCookieValue } from '../utils/cookie';

export const uploadFile = async formData => {
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
