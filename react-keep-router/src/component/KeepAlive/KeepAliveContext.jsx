import React,{ createContext, useContext } from "react";

const KeepAliveContext = createContext({});

export const useKeepAlive = () => useContext(KeepAliveContext);

export const KeepAliveProvider = ({ children, value }) => {
    return <KeepAliveContext.Provider value={value}>
        {children}
    </KeepAliveContext.Provider>
}
