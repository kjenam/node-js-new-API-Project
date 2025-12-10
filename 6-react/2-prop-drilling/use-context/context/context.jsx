import { createContext, useState } from "react";

// 1. create and export the context
// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext(null);


// 2. create a global state, this state will be shared across all your components



function GlobalState({children}) {

  const [theme, setTheme] = useState('light')

  return <GlobalContext.Provider value ={{theme, setTheme}}> {children}</GlobalContext.Provider>
}

export default GlobalState