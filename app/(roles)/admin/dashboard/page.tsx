// pages/admin/overview.jsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import Link from "next/link";
import AdminDashboardData from "@/components/admin/AdminDashboardData";
// types/admin.ts (or inside the same file for now)
import { LucideIcon } from "lucide-react";

export interface KPI {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  changeColor: string;
  link: string;
}

export interface ActivityLog {
  action: string;
  timestamp: string;
  icon: LucideIcon;
}



export default async function OverviewPage() {
  const {mockKPIs, mockRecentActivity} = await AdminDashboardData();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          System Overview & KPIs
        </h1>
        <Button className="bg-red-600 hover:bg-red-700 text-white mb-2">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-10">
        {mockKPIs.map((kpi, index) => (
          <Link key={index} href={kpi.link}>
          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs ${kpi.changeColor}`}>{kpi.change}</p>
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Server Uptime</span>
              <Badge className="bg-green-100 text-green-800">99.9%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Database Performance</span>
              <Badge className="bg-green-100 text-green-800">Optimal</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>API Response Time</span>
              <Badge className="bg-yellow-100 text-yellow-800">125ms</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Active Sessions</span>
              <span className="font-medium">1,247</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <activity.icon className="h-4 w-4 text-blue-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

