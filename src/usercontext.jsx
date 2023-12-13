import { createContext, useState } from "react";

let UserContext = new createContext();

export const UserProvider = ({ children }) => {
  const [loginType, setLoginType] = useState("STUDENT");
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider
      value={{ loginType, setLoginType, username, setUsername }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;