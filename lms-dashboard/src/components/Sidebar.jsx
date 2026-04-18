import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut,
  GraduationCap,
  Layers,
  Video,
  FileText,
  CreditCard
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const adminNavigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/dashboard/courses", icon: BookOpen },
    { name: "Batches", href: "/dashboard/batches", icon: Layers },
    { name: "Subscriptions", href: "/dashboard/plans", icon: CreditCard },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const teacherNavigation = [
    { name: "My Batches", href: "/dashboard/teacher/batches", icon: Layers },
    { name: "Live Classes", href: "/dashboard/teacher/live", icon: Video },
    { name: "Resources", href: "/dashboard/teacher/resources", icon: FileText },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const navigation = user?.role === "admin" ? adminNavigation : teacherNavigation;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      <div className="flex h-16 items-center px-6 border-b">
        <GraduationCap className="h-8 w-8 text-primary" />
        <span className="ml-3 text-xl font-bold text-gray-900">
          {user?.role === "admin" ? "LMS Admin" : "Teacher Portal"}
        </span>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto p-4">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-500"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t pt-4">
          <div className="px-3 py-2 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Logged in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="group flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-red-400 group-hover:text-red-500" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
