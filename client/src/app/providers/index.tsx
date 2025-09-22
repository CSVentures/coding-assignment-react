import { useUsers } from "../tickets/hooks/useUsers";
import AppContext from "../contexts";
import { useEffect } from "react";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { users, handleFetchUsers, handleFetchUser, userDetail, isLoading } =
    useUsers();

  useEffect(() => {
    handleFetchUsers();
  }, []);

  return (
    <AppContext.Provider
      value={{
        users,
        handleFetchUsers,
        handleFetchUser,
        userDetail,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
