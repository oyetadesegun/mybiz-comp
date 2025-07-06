"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Edit,
  Mail,
  Calendar,
  UserIcon,
  Shield,
  Activity,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Circle,
} from "lucide-react"
import { Status,Role  , UserStatus, Response} from "@prisma/client"
import { UpdateUser } from "@/actions/admin/admin.user.actions"

// type UserStatus = UserStatus
// type Role = pRole
// type IssueStatus = Status

interface UserProfile {
  id: string
  issueId: string  // 👈 this is required
  email: string
  name: string | null
  role: Role
  avatar: string | null
  lastLoggedIn: Date
  status: UserStatus
  profile: {
    id: string
    bio: string
    userId: string
  } | null
  customerResponses: Array<{
    id: string
    questionId: string
    content: string
    createdAt: Date
    question: {
      id: string
      title: string
      status: Status
      chatCount: number
      createdAt: Date
      updatedAt: Date
      staffResponses: Response[]
    }
  }>
}

interface UserProfilePageProps {
  user: UserProfile
}

export function UserProfilePage({ user }: UserProfilePageProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user.name || "",
    email: user.email,
    role: user.role,
    status: user.status,
    bio: user.profile?.bio || "",
  })
  const router = useRouter()

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case Status.pending:
        return <Circle className="h-4 w-4 text-red-500" />
      case Status.in_progress:
        return <Clock className="h-4 w-4 text-yellow-500" />
      case Status.resolved:
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: Status) => {
    const variants = {
      pending: "destructive",
      in_progress: "default",
      resolved: "secondary",
       closed: "secondary", // ← Add all valid statuses
    } as const

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status.replace("in_", "")}
      </Badge>
    )
  }

  const getRoleBadge = (role: Role) => {
    const colors = {
      USER: "bg-blue-100 text-blue-800",
      ADMIN: "bg-red-100 text-red-800",
      STAFF: "bg-green-100 text-green-800",
    }

    return <Badge className={colors[role]}>{role}</Badge>
  }

  const getStatusBadgeVariant = (status: UserStatus) => {
    return status === "active" ? "default" : "secondary"
  }

const handleSaveEdit = () => {
  const formData = new FormData()
  formData.append("name", editForm.name)
  formData.append("email", editForm.email)
  formData.append("role", editForm.role)
  formData.append("status", editForm.status)
  formData.append("bio", editForm.bio)

  UpdateUser(formData, user.id)

  setIsEditDialogOpen(false)
   router.refresh()
}


  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
          <p className="text-muted-foreground">Comprehensive view of user details and associated issues</p>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User Details</DialogTitle>
              <DialogDescription>Make changes to the user's profile information here.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  value={editForm.role}
                  onValueChange={(value: Role) => setEditForm({ ...editForm, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="STAFF">Staff</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value: UserStatus) => setEditForm({ ...editForm, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* User Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            User Information
          </CardTitle>
          <CardDescription>Basic profile information and account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar || undefined} alt={user.name || "User"} />
              <AvatarFallback className="text-lg">
                {user.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Name:</span>
                    <span>{user.name || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Role:</span>
                    {getRoleBadge(user.role)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Status:</span>
                    <Badge variant={getStatusBadgeVariant(user.status)} className="capitalize">
                      {user.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Last Login:</span>
                    <span className="text-sm">{formatDate(user.lastLoggedIn)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">User ID:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{user.id}</code>
                  </div>
                </div>
              </div>

              {user.profile?.bio && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Bio</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{user.profile.bio}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues List Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Associated Issues
            <Badge variant="outline" className="ml-2">
             {Array.isArray(user.customerResponses) ? user.customerResponses.length : 0} total

            </Badge>
          </CardTitle>
          <CardDescription>All issues and support tickets associated with this user account</CardDescription>
        </CardHeader>
   <CardContent>
  {user.customerResponses?.length === 0 ? (
    <div className="text-center py-8 text-muted-foreground">
      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
      <p>No issues found for this user</p>
    </div>
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Issue Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Chat Interactions</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        
        {(user.customerResponses || []).map((response) => (
          <TableRow key={response.id} onClick={()=> router.push(`/admin/issues/${response.questionId}`)} className="cursor-pointer hover:bg-muted/50">
            <TableCell>
              <div className="flex items-center gap-2">
                {getStatusIcon(response.question.status)}
                <div>
                  <div className="font-medium">{response.question.title}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-xs">
                    {response.content}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(response.question.status)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
<span>
  {(response.question.staffResponses?.length || 0)} response
  {(response.question.staffResponses?.length || 0) !== 1 ? "s" : ""}
</span>

              </div>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {formatDate(response.question.createdAt)}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {formatDate(response.question.updatedAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}
</CardContent>

      </Card>
    </div>
  )
}
