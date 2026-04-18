import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { BookOpen, Users, Video, FileText } from "lucide-react";
import api from "../lib/api";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    courses: 0,
    lessons: 0,
    students: 0,
    materials: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/get-overview-stats");
      if (data.success) {
          setStats({
            courses: data.stats.courses,
            lessons: data.stats.lessons,
            students: data.stats.users,
            materials: data.stats.orders // Using orders as a proxy for 'commercial success'
          });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const statCards = [
    { title: "Total Courses", value: stats.courses, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Total Lessons", value: stats.lessons, icon: Video, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Active Users", value: stats.students, icon: Users, color: "text-green-600", bg: "bg-green-100" },
    { title: "Total Orders", value: stats.materials, icon: FileText, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here's what's happening with your courses.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New lesson added to "Advanced Physics"</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
