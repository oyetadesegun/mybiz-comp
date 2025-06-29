// app/admin/users/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UserPlus, Search, Edit, Eye, Trash2, Shield } from "lucide-react";
import { mockUsers } from "@/lib/admin-mock-data";
import axios from "axios";

type User ={
  id: string;
  name: string;
  email: string;
  role: string;
}
export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
   const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState(null); // Keep if you plan an edit user dialog
const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

useEffect(()=>{
  const fetchUsers = async ()=> {
    setLoading(true)
    try {
      const response = await axios.get("/api/admin");
       console.log("API response:", response.data)
      setUsers(response.data)
  }catch(err){
    console.error("Failed to fetch users:", err)
    setError("Could not load users")
  }finally{
    setLoading(false)
  }
}
  fetchUsers()
}, [])
  const filteredUsers = users.filter((user) => {
    const query = (searchTerm ?? "").toLowerCase();
    const name = (user.name ?? "").toLowerCase();
    const email = (user.email ?? "").toLowerCase();
    const matchesSearch = name.includes(query) || email.includes(query);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          User Management
        </h1>
        <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white mb-4">
              <UserPlus className="mr-2 h-4 w-4" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system with appropriate role and
                permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" placeholder="Full name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="cx">CX Representative</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="service-provider">
                      Service Provider
                    </SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Create User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="cx">CX Representative</SelectItem>
            <SelectItem value="agent">Agent</SelectItem>
            <SelectItem value="auditor">Auditor</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="service-provider">Service Provider</SelectItem>
            <SelectItem value="client">Client</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Last Active</th>
                  <th className="text-left p-4">Permissions</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                          />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className={user.roleColor}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={user.status === "active" ? "default" : "secondary"}
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {user.lastActive}
                    </td>
                    <td className="p-4">
                      <Button size="sm" variant="outline">
                        <Shield className="h-3 w-3 mr-1" />
                        Manage
                      </Button>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}