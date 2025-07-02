// app/admin/users/[id]/page.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Save, ArrowLeft } from "lucide-react"

import { notFound, redirect } from "next/navigation";
import Link from "next/link"
import {findUserById,  UpdateUser } from "@/actions/admin/admin.user.actions"
import BackButton from "@/components/BackButton"

export default async function EditUserPage({params}: {params:{userId:string}}){
    // Fetch user data 
  const user=  await findUserById(params.userId)
  // Server action for form submission
  async function updateUser(formData: FormData){
    'use server'
    await UpdateUser(formData, params.userId);
    redirect('/admin/users')
  }

return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit User</h1>
       <Button variant="outline" className="flex items-center gap-2" asChild>
  <Link href="/admin/users">
    <ArrowLeft className="h-4 w-4" />
    Back to Users
  </Link>
</Button>
      </div>

      <form action={updateUser} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={user.name || ""}
              placeholder="Full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email || ""}
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select name="role" defaultValue={user.role || "USER"}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="STAFF">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={user.status || "active"}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              name="avatar"
              defaultValue={user.avatar || ""}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
<BackButton/>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
)
}