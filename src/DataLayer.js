import React, { createContext, useContext, useReducer } from "react";

// Create the Context
export const DataLayerContext = createContext();

// Create and export the DataLayer component that can be initiated with a reducer, state and children
export const DataLayer = ({ reducer, initialState, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);

// Set and export the method to consume the context
export const useDataLayerValue = () => useContext(DataLayerContext);
