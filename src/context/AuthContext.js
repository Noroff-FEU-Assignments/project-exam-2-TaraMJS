import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

/*creates a context that makes the props available to all children inside <AuthProvider> in app.js 
and keeps track of if there is a jwt token in localStorage*/
const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useLocalStorage("auth", null);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
