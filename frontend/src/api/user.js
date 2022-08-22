'use strict';

import showAlert from '../utils/alert';
import axios from 'axios';
import { setCookie, getCookieValue, deleteCookie } from '../utils/cookie';

const setJwtToken = token => setCookie('jwt', token, import.meta.env.VITE_JWT_EXPIRY_DAYS, true);
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
    const { data } = await axios.post(`${import.meta.env.VITE_API_V1_URL}/user/signup`, userData);

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
    const { data } = await axios.post(`${import.meta.env.VITE_API_V1_URL}/user/login`, userData);

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
const isUserLoggedIn = () => {
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const jwt = getCookieValue('jwt');

  if (!userData || !jwt) return false;

  // Check if the token is correct
};

/**
 * Log user out
 */

const userLogout = () => {
  localStorage.removeItem('userInfo');
  deleteCookie('jwt');
};

export { userSignup, userLogin, isUserLoggedIn, userLogout };
