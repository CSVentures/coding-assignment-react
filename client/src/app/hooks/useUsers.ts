import { useQuery } from "@tanstack/react-query";
import { User } from "@acme/shared-models";

export const usersKey = {
  all: ["users"] as const,
  lists: () => [...usersKey.all, "list"] as const,
  list: (filters: string) => [...usersKey.lists(), filters] as const,
  details: () => [...usersKey.all, "detail"] as const,
  detail: (id: string) => [...usersKey.details(), id] as const,
};

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: usersKey.all,
    queryFn: () => fetch("/api/users").then((res) => res.json()),
  });
};
