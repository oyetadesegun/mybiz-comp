// components/sidebar.jsx
"use client"; // This component needs to be a Client Component to use hooks like usePathname

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname for Next.js routing
import {
  Users,
  Settings,
  BarChart,
  Shield,
  DollarSign,
  Eye,
  Activity,
} from "lucide-react";
import { ReactNode } from "react";

export default function AdminSidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // Get the current path

  // Define your navigation items.
  // The 'href' should match the actual file path in your 'pages/admin' directory.
  const navItems = [
    {
      name: "Overview & KPIs",
      href: "/admin/dashboard", // Base path for the admin dashboard
      icon: BarChart,
    },
    {
      name: "User Management",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "RBAC & Permissions",
      href: "/admin/roles",
      icon: Shield,
    },
    {
      name: "System Configuration",
      href: "/admin/system",
      icon: Settings,
    },
    {
      name: "Monitoring & Analytics",
      href: "/admin/monitoring",
      icon: Activity,
    },
  ];

  // Define external links separately if they don't follow the same routing pattern
  const externalLinks = [
    {
      name: "CRM Dashboard",
      href: "/crm",
      icon: Users,
    },
    {
      name: "Finance Dashboard",
      href: "/finance",
      icon: DollarSign,
    },
    {
      name: "Auditor Panel",
      href: "/auditor",
      icon: Eye,
    },
  ];

  return (
    <aside className="hidden w-64 border-r pt-10 border-gray-200 bg-white lg:flex lg:flex-col justify-between ">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-auto py-2">
          <nav className="flex flex-col gap-4 px-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  // Check if the current pathname exactly matches the item's href
                  // Or if it's the base admin path and the current path is also the base
                  (pathname === item.href || (item.href === "/admin" && pathname === "/admin"))
                    ? "bg-red-50 text-red-600"
                    : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}

            {/* Render External Links */}
            {externalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:text-red-600 hover:bg-red-50"
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div>
        {children}
      </div>
    </aside>
  );
}