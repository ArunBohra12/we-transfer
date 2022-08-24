'use strict';

export const setCookie = (name, value, expiryDays, secure = false, path = '/') => {
  const date = new Date();
  date.setTime(date.getTime() + expiryDays * 24 * 60 * 60 * 1000);

  let expires = 'expires=' + date.toUTCString();
  let cookieString = `${name}=${value};expires=${expires};path=${path};`;

  if (secure) cookieString += 'secure;';

  document.cookie = cookieString;
};

export const getCookieValue = cookieName => {
  let name = cookieName + '=';
  let decodedCookie = decodeURIComponent(document.cookie);

  let allCookies = decodedCookie.split(';');
  for (let i = 0; i < allCookies.length; i++) {
    let currentCookie = allCookies[i];
    while (currentCookie.charAt(0) === ' ') {
      currentCookie = currentCookie.substring(1);
    }

    if (currentCookie.indexOf(name) === 0) {
      return currentCookie.substring(name.length, currentCookie.length);
    }
  }

  return '';
};

export const deleteCookie = cookieName => {
  document.cookie = `${cookieName}=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/`;
};
