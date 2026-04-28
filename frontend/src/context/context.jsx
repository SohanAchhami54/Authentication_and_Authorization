import { createContext, useContext, useState } from "react";
const AppContext=createContext() 

const AppContextProvider=({children})=>{

    const [isAuthenticated,setIsAuthenticated]=useState()
    const [user,setUser]=useState()

    const value={isAuthenticated,setIsAuthenticated,user,setUser}
    return (
        <AppContext.Provider value={value}>
           {children}
        </AppContext.Provider>
    )
}

export const useApp=()=>{
    return useContext(AppContext)
}

export default AppContextProvider
