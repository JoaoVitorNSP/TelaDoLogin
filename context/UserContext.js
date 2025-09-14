import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ users, setUsers, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};