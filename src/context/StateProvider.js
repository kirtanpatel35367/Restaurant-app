import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext()

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext)


/*StateContext: Creates a React Context to hold the state and dispatch function.
StateProvider: This component wraps the entire app, providing state and dispatch to all nested components. 
It uses useReducer with reducer and initialState as arguments. useReducer returns [state, dispatch], 
which is passed to StateContext.Provider.
useStateValue: A custom hook to make it easy to access state and dispatch from any component. */