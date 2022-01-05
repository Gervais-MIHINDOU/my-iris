import { createContext, useState } from "react";
import PropTypes from "prop-types";
import React from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [client, setClient] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [admin, setAdmin] = useState({});
  const [listClient, setListClient] = useState();

  return (
    <UserContext.Provider
      value={{
        client,
        setClient,
        isAdmin,
        setIsAdmin,
        admin,
        setAdmin,
        listClient,
        setListClient,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.object,
};
