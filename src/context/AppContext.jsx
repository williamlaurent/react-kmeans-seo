import React from "react";
import PropTypes from "prop-types";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [dataset, setDataset] = React.useState([]);
  const [result, setResult] = React.useState(null);
  const [counts, setCounts] = React.useState(null);
  const [silhouetteScore, setSilhouetteScore] = React.useState(null);
  const [iterations, setIterations] = React.useState(null);

  return (
    <AppContext.Provider
      value={{
        dataset,
        setDataset,
        result,
        setResult,
        counts,
        setCounts,
        silhouetteScore,
        setSilhouetteScore,
        setIterations,
        iterations,
      }}
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
