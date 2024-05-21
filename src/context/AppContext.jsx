import React from "react";
import PropTypes from "prop-types";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [dataset, setDataset] = React.useState([]);
  const [rawFile, setRawFile] = React.useState(null);
  const [result, setResult] = React.useState(null);

  return (
    <AppContext.Provider
      value={{ dataset, setDataset, rawFile, setRawFile, result, setResult }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  return context;
};
