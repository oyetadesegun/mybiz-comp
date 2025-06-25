// pages/admin/monitoring.jsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Users,
  Activity,
  AlertCircle,
  Clock,
  Download,
  Bell,
  CheckCircle,
} from "lucide-react";

export default function MonitoringPage() {
  return (
    <>
      <div className="flex items-center mb-6 justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Monitoring & Analytics
        </h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Analytics
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Real-time View
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-green-600">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Load</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
            <p className="text-xs text-green-600">Normal range</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.1%</div>
            <p className="text-xs text-green-600">Below threshold</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125ms</div>
            <p className="text-xs text-yellow-600">Slightly elevated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>User Activity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Peak Hours</span>
                <span className="font-medium">9 AM - 5 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Most Active Day</span>
                <span className="font-medium">Tuesday</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Average Session</span>
                <span className="font-medium">24 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Bounce Rate</span>
                <span className="font-medium">12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">High Memory Usage</p>
                <p className="text-xs text-gray-600">
                  Server 2 - 85% memory utilization
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Bell className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Scheduled Maintenance</p>
                <p className="text-xs text-gray-600">
                  Database optimization in 2 hours
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Backup Completed</p>
                <p className="text-xs text-gray-600">
                  Daily backup successful at 3:00 AM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}