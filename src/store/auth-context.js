import React, { createContext,useEffect,useState } from 'react';



const AuthContext = createContext({
    isLoggedIn:false,
    logoutHandler:()=>{

    },
    loginHandler:(email,password)=>{

    }
})

export const AuthContextProvier = (props)=>{
const [isLoggedIn, setIsLoggedIn] = useState(false);
const loginHandler = (email, password) => {
  // We should of course check email and password
  // But it's just a dummy/ demo anyways
  localStorage.setItem('isLoggedIn','1')
  setIsLoggedIn(true);
};

useEffect(()=>{
  const getLoggedIn = localStorage.getItem('isLoggedIn')
  if(getLoggedIn === '1'){
  setIsLoggedIn(true);
  }
},[]);

const logoutHandler = () => {
  localStorage.removeItem('isLoggedIn')
  setIsLoggedIn(false);
};

    return (
        <AuthContext.Provider value={{
            isLoggedIn:isLoggedIn,
            onLogout:logoutHandler,
            onLogin:loginHandler
        }}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;