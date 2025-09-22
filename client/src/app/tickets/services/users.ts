export const fetchUsers = async () => {
  const response = await fetch("/api/users");
  return response.json();
};

export const fetchUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};
