import { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));

    if (userData) setUserInfo(userData);
  }, []);

  const setUserData = data => {
    if (data === null) return setUserInfo(null);

    const { _id, name, email } = data;
    setUserInfo({ id: _id, name, email });
  };

  const contextVariables = { userInfo, setUserData };

  return <UserContext.Provider value={contextVariables}>{children}</UserContext.Provider>;
};

export default UserContext;
