import { User } from "@acme/shared-models";
import { createContext } from "react";

export type AppContextType = {
  users: User[];
  userDetail: User | null;
  isLoading: boolean;

  handleFetchUsers: () => Promise<void>;
  handleFetchUser: (id: string) => Promise<void>;
};

const AppContext = createContext<AppContextType>({
  users: [],
  userDetail: null,
  isLoading: false,
  handleFetchUsers: () => Promise.resolve(),
  handleFetchUser: () => Promise.resolve(),
});

export default AppContext;
