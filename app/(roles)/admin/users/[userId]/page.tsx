import { findUserById } from "@/actions/admin/admin.user.actions";
import { UserProfilePage } from "@/components/user/profile-page";

interface Props {
  params: {
    userId: string;
  };
}

export default async function UserProfileAdminPage({ params }: Props) {
  const user = await findUserById(params.userId);

  return <UserProfilePage user={user} />;
}
