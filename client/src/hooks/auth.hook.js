import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  const login = useCallback((token, userId, userType) => {
    setToken(token);
    setUserId(userId);
    setUserType(userType);

    localStorage.setItem(storageName, JSON.stringify({
      token: token, userId: userId, userType: userType
    }));
  }, []);


  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserType(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.userType);
    }
    setReady(true);
  }, [login]);


  return { login, logout, token, userId, userType, ready };
};