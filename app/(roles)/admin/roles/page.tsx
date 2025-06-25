
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Users, CheckCircle } from "lucide-react";

export default function RolesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Role-Based Access Control
        </h1>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          Create Role
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: "Super Admin",
            users: 2,
            permissions: [
              "Full System Access",
              "User Management",
              "System Configuration",
              "All Data Access",
            ],
            color: "bg-red-100 text-red-800",
          },
          {
            name: "CX Manager",
            users: 5,
            permissions: [
              "CRM Access",
              "Ticket Management",
              "Customer Data",
              "Invoice Creation",
            ],
            color: "bg-blue-100 text-blue-800",
          },
          {
            name: "Finance Manager",
            users: 3,
            permissions: [
              "Financial Reports",
              "Invoice Management",
              "Payment Processing",
              "Commission Tracking",
            ],
            color: "bg-green-100 text-green-800",
          },
          {
            name: "Service Provider",
            users: 25,
            permissions: [
              "Task Management",
              "Customer Communication",
              "Progress Updates",
            ],
            color: "bg-purple-100 text-purple-800",
          },
          {
            name: "Auditor",
            users: 2,
            permissions: [
              "Audit Logs",
              "Compliance Monitoring",
              "Report Generation",
            ],
            color: "bg-orange-100 text-orange-800",
          },
          {
            name: "Agent",
            users: 15,
            permissions: [
              "Service Booking",
              "Commission Tracking",
              "Client Management",
            ],
            color: "bg-teal-100 text-teal-800",
          },
        ].map((role, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{role.name}</CardTitle>
                <Badge className={role.color}>{role.users} users</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Permissions:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {role.permissions.map((permission, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Users className="h-3 w-3 mr-1" />
                    Users
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}