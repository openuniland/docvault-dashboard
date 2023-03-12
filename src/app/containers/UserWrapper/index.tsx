import { UsersTable } from "app/components/UserTable";
import { useGetAllUsers } from "queries/user";

export const UserWrapper = () => {
  const { data: users } = useGetAllUsers();
  return (
    <div>
      <UsersTable rows={users} />
    </div>
  );
};
