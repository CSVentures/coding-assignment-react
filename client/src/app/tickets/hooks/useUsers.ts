import { User } from "@acme/shared-models";
import { useState } from "react";
import { fetchUser, fetchUsers } from "../services/users";
import { showErrotNotification } from "../../component/messages";

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([] as User[]);
  const [userDetail, setUserDetail] = useState<User | null>(null);
  const handleFetchUsers = async () => {
    try {
      setIsLoading(true);
      const users = await fetchUsers();
      setUsers(users);
    } catch (error) {
      showErrotNotification(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleFetchUser = async (id: string) => {
    try {
      const user = await fetchUser(id);
      setUserDetail(user);
    } catch (error) {
      showErrotNotification(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { users, handleFetchUsers, handleFetchUser, userDetail, isLoading };
};
