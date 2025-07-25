import { getAllUsers } from "@/actions/admin/admin.user.actions"
import UsersList from "@/components/admin/UsersList"
import LoadingIconLarge from "@/components/global/Loading"
import { Suspense } from "react"


export default async function Users() {

  const users = await getAllUsers()
  return (
    <Suspense fallback={<LoadingIconLarge />}>
      <UsersList users={users} />
    </Suspense>
  )
}
