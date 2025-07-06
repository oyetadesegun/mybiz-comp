"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  UserIcon,
  Building,
  Phone,
  Mail,
  Globe,
  Calendar,
  DollarSign,
  AlertCircle,
  MessageSquare,
  Send,
  FileText,
  Download,
  Eye,
  UserPlus,
  Users,
  Paperclip,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Status = "pending" | "in_progress" | "resolved" | "closed"
type ResponseType = "ADMIN" | "CX" | "AGENT" | "AUDITOR" | "FINANCE" | "SERVICE_PROVIDER"
type Role = "USER" | "ADMIN" | "STAFF"

interface DocumentMetaData {
  id: string
  name: string
  size: string
  url: string
}

interface StaffMember {
  id: string
  email: string
  name?: string | null
  role: Role
  avatar?: string | null
}

interface Response {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  responseType?: ResponseType | null
  staff: StaffMember
  customer: StaffMember
}

interface Issue {
  id: string
  title: string
  businessName: string
  businessType: string
  businessChallenge: string
  businessCategory: string
  urgencyLevel: string
  fullName: string
  emailAddress: string
  businessAddress: string
  phone: string
  willingToPay: string
  websiteUrl?: string | null
  instagramUrl?: string | null
  twitterUrl?: string | null
  facebookUrl?: string | null
  status: Status
  createdAt: Date
  updatedAt: Date
  documents: DocumentMetaData[]
  responses: Response[]
  assignedStaffId?: string | null
  assignedStaff?: StaffMember | null
}

interface IssueDetailViewProps {
  issue: Issue
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  resolved: "bg-green-100 text-green-800 border-green-200",
  closed: "bg-gray-100 text-gray-800 border-gray-200",
}

const urgencyColors = {
  immediate: "bg-red-100 text-red-800",
  "this-week": "bg-orange-100 text-orange-800",
  "this-month": "bg-yellow-100 text-yellow-800",
  planning: "bg-green-100 text-green-800",
}

const responseTypeColors = {
  ADMIN: "bg-purple-100 text-purple-800",
  CX: "bg-blue-100 text-blue-800",
  AGENT: "bg-green-100 text-green-800",
  AUDITOR: "bg-orange-100 text-orange-800",
  FINANCE: "bg-red-100 text-red-800",
  SERVICE_PROVIDER: "bg-gray-100 text-gray-800",
}

export default function IssueDetailView({ issue }: IssueDetailViewProps) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>(issue.status)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [assignedStaff, setAssignedStaff] = useState<string | null>(issue.assignedStaffId || null)
  const [assignmentNote, setAssignmentNote] = useState("")
  const [isAssigning, setIsAssigning] = useState(false)
  const [selectedFile, setSelectedFile] = useState<DocumentMetaData | null>(null)

  const handleStatusUpdate = async (newStatus: Status) => {
    // TODO: Implement status update action
    setStatus(newStatus)
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      // TODO: Implement add comment action
      console.log("Adding comment:", newComment)
      setNewComment("")
    } catch (error) {
      console.error("Error adding comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAssignStaff = async () => {
    if (!assignedStaff || !assignmentNote.trim()) return

    setIsAssigning(true)
    try {
      // TODO: Implement assign staff action
      console.log("Assigning to staff:", assignedStaff, "with note:", assignmentNote)
      setAssignmentNote("")
    } catch (error) {
      console.error("Error assigning staff:", error)
    } finally {
      setIsAssigning(false)
    }
  }

  const handleFilePreview = (file: DocumentMetaData) => {
    setSelectedFile(file)
  }

  const handleFileDownload = (file: DocumentMetaData) => {
    // TODO: Implement file download
    console.log("Downloading file:", file.name)
    // Create a temporary link to download the file
    const link = document.createElement("a")
    link.href = file.url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date))
  }

  const getInitials = (name?: string | null) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getFileType = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) return "image"
    if (["pdf"].includes(extension || "")) return "pdf"
    if (["doc", "docx"].includes(extension || "")) return "document"
    return "file"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="text-gray-600 hover:text-blue-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to issues
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{issue.title}</h1>
            <p className="text-gray-600">issue ID: {issue.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={statusColors[status]}>{status.replace("_", " ").toUpperCase()}</Badge>
          <Select value={status} onValueChange={handleStatusUpdate}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Challenge */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Business Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{issue.businessChallenge}</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="outline" className="text-sm">
                  Category: {issue.businessCategory}
                </Badge>
                <Badge className={urgencyColors[issue.urgencyLevel as keyof typeof urgencyColors]}>
                  {issue.urgencyLevel.replace("-", " ")}
                </Badge>
              </div>
            </CardContent>
          </Card>
   {/* Documents & Files */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paperclip className="h-5 w-5 text-gray-600" />
                Supporting Documents ({issue.documents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {issue.documents.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No documents attached</p>
              ) : (
                <div className="space-y-3">
                  {issue.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFilePreview(doc)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFileDownload(doc)}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Business Name</label>
                  <p className="text-gray-900">{issue.businessName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Business Type</label>
                  <p className="text-gray-900">{issue.businessType.replace("-", " ")}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <p className="text-gray-900">{issue.businessAddress}</p>
                </div>
              </div>

              {/* Social Media Links */}
              {(issue.websiteUrl || issue.instagramUrl || issue.twitterUrl || issue.facebookUrl) && (
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Online Presence</label>
                  <div className="flex flex-wrap gap-2">
                    {issue.websiteUrl && (
                      <Link
                        href={issue.websiteUrl}
                        target="_blank"
                        className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                      >
                        <Globe className="h-4 w-4" />
                        Website
                      </Link>
                    )}
                    {issue.instagramUrl && (
                      <Link
                        href={issue.instagramUrl}
                        target="_blank"
                        className="flex items-center gap-1 text-pink-600 hover:underline text-sm"
                      >
                        Instagram
                      </Link>
                    )}
                    {issue.twitterUrl && (
                      <Link
                        href={issue.twitterUrl}
                        target="_blank"
                        className="flex items-center gap-1 text-blue-400 hover:underline text-sm"
                      >
                        Twitter
                      </Link>
                    )}
                    {issue.facebookUrl && (
                      <Link
                        href={issue.facebookUrl}
                        target="_blank"
                        className="flex items-center gap-1 text-blue-700 hover:underline text-sm"
                      >
                        Facebook
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                Admin Notes & Comments ({issue.responses.length})
              </CardTitle>
              <CardDescription>Internal notes and communication about this issue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing Comments */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {issue.responses.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">No comments yet. Be the first to add a note.</p>
                ) : (
                  issue.responses.map((response) => (
                    <div key={response.id} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {getInitials(response.staff.name)}
                          </div>
                          <div>
                            <span className="font-medium text-sm text-gray-900">
                              {response.staff.name || response.staff.email}
                            </span>
                            {response.responseType && (
                              <Badge
                                className={`ml-2 text-xs ${responseTypeColors[response.responseType]}`}
                                variant="outline"
                              >
                                {response.responseType}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(response.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{response.content}</p>
                    </div>
                  ))
                )}
              </div>

              <Separator />

              {/* Add New Comment */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Add a note</label>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your notes or comments about this issue..."
                  className="min-h-[100px]"
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || isSubmitting}
                  className="w-full sm:w-auto"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Adding..." : "Add Comment"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-purple-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-900">{issue.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <Link href={`mailto:${issue.emailAddress}`} className="text-sm text-blue-600 hover:underline">
                  {issue.emailAddress}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <Link href={`tel:${issue.phone}`} className="text-sm text-blue-600 hover:underline">
                  {issue.phone}
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Budget Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                ₦{Number.parseInt(issue.willingToPay).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Willing to pay</p>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Created</label>
                <p className="text-sm text-gray-900">{formatDate(issue.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Last Updated</label>
                <p className="text-sm text-gray-900">{formatDate(issue.updatedAt)}</p>
              </div>
            </CardContent>
          </Card>

       
          {/* Staff Assignment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Staff Assignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {issue.assignedStaff ? (
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {getInitials(issue.assignedStaff.name)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">
                      {issue.assignedStaff.name || issue.assignedStaff.email}
                    </p>
                    <p className="text-xs text-blue-700">{issue.assignedStaff.email}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {issue.assignedStaff.role}
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Not assigned to any staff member</p>
              )}

              <div className="space-y-3">
                <div>
                  <Label htmlFor="staff-select" className="text-sm font-medium">
                    Assign to Staff
                  </Label>
                  <Select value={assignedStaff || ""} onValueChange={setAssignedStaff}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="staff-1">John Smith (Marketing)</SelectItem>
                      <SelectItem value="staff-2">Sarah Johnson (Operations)</SelectItem>
                      <SelectItem value="staff-3">Mike Davis (Finance)</SelectItem>
                      <SelectItem value="staff-4">Lisa Wilson (Strategy)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="assignment-note" className="text-sm font-medium">
                    Assignment Note
                  </Label>
                  <Textarea
                    id="assignment-note"
                    value={assignmentNote}
                    onChange={(e) => setAssignmentNote(e.target.value)}
                    placeholder="Add instructions or context for the assigned staff member..."
                    className="min-h-[80px]"
                  />
                </div>

                <Button
                  onClick={handleAssignStaff}
                  disabled={!assignedStaff || !assignmentNote.trim() || isAssigning}
                  className="w-full"
                  size="sm"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  {isAssigning ? "Assigning..." : "Assign Staff"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* File Preview Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedFile?.name || "Document Preview"}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedFile && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600">
                      {getFileType(selectedFile.name)} • {selectedFile.size}
                    </p>
                  </div>
                  <Button onClick={() => handleFileDownload(selectedFile)} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                {/* File Preview Area */}
                <div className="border rounded-lg p-4 bg-white min-h-[400px] flex items-center justify-center">
                  {getFileType(selectedFile.name) === "image" ? (
                    <img
                      src={selectedFile.url || "/placeholder.svg"}
                      alt={selectedFile.name}
                      className="max-w-full max-h-[400px] object-contain"
                      crossOrigin="anonymous"
                    />
                  ) : getFileType(selectedFile.name) === "pdf" ? (
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">PDF Preview</p>
                      <p className="text-sm text-gray-500 mt-2">Click download to view the full document</p>
                      <Button
                        onClick={() => window.open(selectedFile.url, "_blank")}
                        variant="outline"
                        className="mt-4"
                      >
                        Open in New Tab
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">File preview not available</p>
                      <p className="text-sm text-gray-500 mt-2">Click download to view the document</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
