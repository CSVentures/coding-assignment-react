import { createContext, useContext } from "react";
import { User } from "@acme/shared-models";

export const UserContext = createContext<User[]>([]);

export const useUsers = () => useContext(UserContext);
