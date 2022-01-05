import { createContext, useState } from "react";
import PropTypes from "prop-types";
import React from "react";

export const ListClientContext = createContext();

const ListClientProvider = ({ children }) => {
  const [responseData, setResponseData] = useState({});
  return (
    <ListClientContext.Provider value={{ responseData, setResponseData }}>
      {children}
    </ListClientContext.Provider>
  );
};

export default ListClientProvider;
ListClientProvider.propTypes = {
  children: PropTypes.object,
};
