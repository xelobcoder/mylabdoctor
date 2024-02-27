import { createContext, useState } from "react";
export const AuthContext = createContext({});
export const AuthProvider = AuthContext.Provider;


export function AuthenticationContext({ children }) {
  const [auth, setAuth] = useState({});

  const updateAuth = (data) => {
    setAuth(data);
  };

  return (
    <AuthProvider value={{ auth,updateAuth }}>
      {children}
    </AuthProvider>
  );
}
