// components/layout.jsx
import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSideBar";
import { SignOut } from "@/components/SignOut";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">
            Admin Control Panel
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Super Admin
          </Badge>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1 pb-10">
        <AdminSidebar>
          <SignOut />
        </AdminSidebar>
        {/* Pass activeTab and setActiveTab to children to control rendered content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}