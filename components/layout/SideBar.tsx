'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquare, Users, Star, TrendingUp } from "lucide-react"
import { ReactNode } from "react"

const sideBarLinks = [
  {
    title: "Overview",
    icon: TrendingUp,
    link: "/admin/dashboard"
  },
  {
    title: "My Issues",
    icon: MessageSquare,
    link: "/admin/dashboard/issues"
  },
  {
    title: "Social Media Audits",
    icon: Star,
    link: "/admin/dashboard/audits"
  },
  {
    title: "Community Forum",
    icon: Users,
    link: "/forum"
  },
]

export default function SideBar({ children }: { children: ReactNode }) {

  const pathname = usePathname()

  return (
    <div className="max-lg:hidden relative w-78">
      <div className="flex flex-col max-h-[calc(100vh-70px)] sticky top-[80px] justify-between h-full bg-white border-r">
        <aside className="w-64 pt-8 border-gray-200 max-lg:hidden">
          <div className="flex h-full flex-col justify-between">
            <div className="flex-1 flex-col gap-3 overflow-auto py-2">
              <nav className="flex flex-col gap-5 px-4 text-sm font-medium">
                {sideBarLinks.map((item, index) => {
                  const isOverview = item.link === "/admin/dashboard";
                  const isActive = isOverview
                    ? pathname === item.link
                    : pathname.startsWith(item.link);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.link}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </aside>
        <div className="px-5 pb-14">
          {children}
        </div>
      </div>
    </div>
  )
}
