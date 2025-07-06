// components/DataTable/QuestionsTable.tsx
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, UserPlus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Pagination from "../Pagination";
import { formatDate } from "@/services/TimeService";
import { GetHelpQuestion, User } from "@prisma/client";


export default function QuestionsTable({ questions, users }: { questions: GetHelpQuestion[], users: User[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [businessTypeFilter, setBusinessTypeFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const filteredQuestions = questions.filter((question) => {
    // Search across multiple fields
    const matchesSearch = searchTerm === "" ||
      [
        question.title,
        question.businessName,
        question.businessChallenge,
        question.fullName,
        question.emailAddress
      ].some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));

    // Apply filters
    const matchesStatus = statusFilter === "all" || question.status === statusFilter;
    const matchesBusinessType = businessTypeFilter === "all" || question.businessType === businessTypeFilter;
    const matchesUrgency = urgencyFilter === "all" || question.urgencyLevel === urgencyFilter;

    return matchesSearch && matchesStatus && matchesBusinessType && matchesUrgency;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex);

  // Get unique values for filter options from the data
  const businessTypes = [...new Set(questions.map(q => q.businessType))];
  const urgencyLevels = [...new Set(questions.map(q => q.urgencyLevel))];

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
        Help Questions Management
      </h1>

      <div className="flex gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search questions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={businessTypeFilter} onValueChange={setBusinessTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by business type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {businessTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Urgency Levels</SelectItem>
            {urgencyLevels.map(level => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Business</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Challenge</th>
                  <th className="text-left p-4">Requester</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Urgency</th>
                  <th className="text-left p-4">Created</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedQuestions.map((question) => {


                  return (<tr key={question.id} className="border-b">
                    <td className="p-4 font-medium">
                      <Link href={`/admin/issues/${question.id}`} className="cursor-pointer hover:text-blue-500">
                        {question.title}
                      </Link>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{question.businessName}</p>
                        <p className="text-sm text-gray-500">{question.businessType}</p>
                      </div>
                    </td>
                    <td className="p-4">{question.businessCategory}</td>
                    <td className="p-4 max-w-[200px] truncate">{question.businessChallenge}</td>
                    <td className="p-4">
                      <div>
                        {(() => {
                          const matchingUser = users.find(user => user.email === question.emailAddress);

                          return (
                            <Link href={matchingUser ? `/admin/users/${matchingUser.id}` : "#"} className="hover:underline">
                              <p className="font-medium">{question.fullName}</p>
                              <p className="text-sm text-gray-500">{question.emailAddress}</p>
                            </Link>
                          );
                        })()}

                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          question.status === "resolved"
                            ? "default"
                            : question.status === "in_progress"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          question.status === "resolved"
                            ? "bg-green-100 text-green-800"
                            : question.status === "in_progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {question.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={
                          question.urgencyLevel === "high"
                            ? "bg-red-100 text-red-800"
                            : question.urgencyLevel === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {question.urgencyLevel}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {formatDate(question.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">

                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
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
                  </tr>)
                }
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Pagination data={filteredQuestions} />
    </>
  )
}