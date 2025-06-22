import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Bell } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background px-4 lg:px-6 h-16 flex items-center">
      <Link href="/" className="flex items-center">
        <span className="text-xl font-bold">BusinessAdvise</span>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </Link>
      </div>
    </header>
  )
}
