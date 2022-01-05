import { createContext, useState } from "react";
import PropTypes from "prop-types";
import React from "react";

export const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  const [client, setClient] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <ClientContext.Provider value={{ client, setClient, isAdmin, setIsAdmin }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;

ClientProvider.propTypes = {
  children: PropTypes.object,
};
