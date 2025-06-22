import Link from "next/link"
import { MessageSquare, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SidebarNav() {
  return (
    <aside className="hidden w-64 border-r border-gray-200 dark:border-gray-800 bg-white lg:block">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg bg-[#F7F5FF] px-3 py-2 text-[#7E69AB] transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Questions
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#4A5568] transition-all hover:text-[#7E69AB] hover:bg-[#F7F5FF]"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#4A5568] transition-all hover:text-[#7E69AB] hover:bg-[#F7F5FF]"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button
            variant="outline"
            className="w-full justify-start border-[#E2E8F0] text-[#4A5568] hover:text-[#7E69AB] hover:border-[#7E69AB]"
            asChild
          >
            <Link href="/logout">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  )
}
