import React, { createContext } from "react";

const UserContext = createContext({
   user: null,
   updateUser: () => {}, 
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;