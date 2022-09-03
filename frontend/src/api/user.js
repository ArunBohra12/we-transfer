'use strict';

import showAlert from '../utils/alert';
import axios from 'axios';
import { setCookie, getCookieValue, deleteCookie } from '../utils/cookie';

const setJwtToken = token => setCookie('jwt', token, 90, true);
const setUserData = userData => localStorage.setItem('userInfo', JSON.stringify(userData));

/**
 * Signs up the user
 * @params { name, email, password, passwordConfirm }
 * @return { jwt, response }
 */
const userSignup = async formData => {
  const { name, email, password, passwordConfirm } = formData;
  const userData = { name, email, password, passwordConfirm };

  if (!name || !email || !password || !passwordConfirm) {
    return showAlert('error', 'Please fill in all of the fields.');
  }

  if (password !== passwordConfirm) {
    return showAlert('error', 'Passwords do not match!');
  }

  try {
    const { data } = await axios.post(`/api/v1/user/signup`, userData);

    if (data.token) setJwtToken(data.token);

    if (data.data?.user) setUserData(data.data.user);

    showAlert('success', 'Sign up successful!');
    return data.data;
  } catch (err) {
    const { data } = err.response;
    showAlert('error', data.message);
  }
};

/**
 * Log the user in
 * @params { email, password }
 * @return { jwt, response }
 */
const userLogin = async formData => {
  const { email, password } = formData;
  const userData = { email, password };

  if (!email || !password) {
    return showAlert('error', 'Please fill in all of the fields.');
  }

  try {
    const { data } = await axios.post(`/api/v1/user/login`, userData);

    if (data.token) setJwtToken(data.token);

    if (data.data?.user) setUserData(data.data.user);

    showAlert('success', 'Logged in successfully!');
    return data.data;
  } catch (err) {
    const { data } = err.response;
    showAlert('error', data.message);
  }
};

/**
 * Function checks if user is logged in
 * @return { Boolean }
 */
const userLoginCheck = () => {
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const jwt = getCookieValue('jwt');

  // If user does not have sufficient data log him out
  if (!userData || !jwt) {
    showAlert('error', 'You will be logged out. Please log in again');
    userLogout();

    setTimeout(() => (window.location.href = '/login'), 3000);
  }
};

/**
 * Log user out
 */
const userLogout = () => {
  localStorage.removeItem('userInfo');
  deleteCookie('jwt');
};

/**
 * Get all files and their details for the current user
 */
const getCurrentUserFiles = async () => {
  const token = getCookieValue('jwt');

  const requestOptions = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const files = await axios.get(`/api/v1/user/files`, requestOptions);

    return files;
  } catch (err) {
    const { data } = err.response;
    showAlert('error', data.message);
  }
};

export { userSignup, userLogin, userLogout, userLoginCheck, getCurrentUserFiles };
