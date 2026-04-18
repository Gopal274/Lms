import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Loader2, Bell, X, Check } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "../components/ui/popover";
import { Badge } from "../components/ui/badge";
import api from "../lib/api";
import io from "socket.io-client";

export default function DashboardLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef();

  useEffect(() => {
    if (!loading && (!user || (user.role !== "admin" && user.role !== "teacher"))) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
        fetchNotifications();
        socketRef.current = io("http://localhost:8000");
        socketRef.current.emit("register", user._id);

        socketRef.current.on("new_notification", (notif) => {
            setNotifications(prev => [notif, ...prev]);
            setUnreadCount(prev => prev + 1);
        });

        return () => socketRef.current.disconnect();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("/get-all-notifications");
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.filter(n => n.status === "unread").length);
      }
    } catch (e) {
      console.error("Failed to fetch notifications");
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
        await api.put(`/update-notification/${id}`);
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, status: "read" } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (e) {
        console.error(e);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2">
             <span className="text-sm font-medium text-gray-400">Welcome,</span>
             <span className="text-sm font-bold text-gray-900">{user.name}</span>
          </div>

          <div className="flex items-center gap-4">
             <Popover>
               <PopoverTrigger asChild>
                 <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Bell className="h-5 w-5 text-gray-600" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 border-2 border-white">
                            {unreadCount}
                        </Badge>
                    )}
                 </button>
               </PopoverTrigger>
               <PopoverContent className="w-80 p-0 mr-4 mt-2 shadow-2xl border-primary/10">
                  <div className="p-4 border-b bg-gray-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-sm">Notifications</h3>
                    <Badge variant="outline" className="text-[10px]">{unreadCount} New</Badge>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-xs">No notifications yet.</div>
                    ) : (
                        notifications.map((notif, i) => (
                            <div 
                                key={notif._id || i} 
                                className={`p-4 border-b last:border-0 hover:bg-gray-50 transition-colors relative group ${notif.status === 'unread' ? 'bg-blue-50/30' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-xs font-bold ${notif.status === 'unread' ? 'text-primary' : 'text-gray-700'}`}>{notif.title}</h4>
                                    <span className="text-[10px] text-gray-400">{new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <p className="text-[11px] text-gray-500 line-clamp-2 pr-6">{notif.message}</p>
                                {notif.status === 'unread' && (
                                    <button 
                                        onClick={() => handleMarkAsRead(notif._id)}
                                        className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white rounded-full border shadow-sm hover:text-green-600"
                                    >
                                        <Check size={12} />
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                  </div>
                  <div className="p-2 border-t text-center">
                    <button className="text-[10px] font-bold text-primary hover:underline">View All Notifications</button>
                  </div>
               </PopoverContent>
             </Popover>
             <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border font-bold text-primary text-xs">
                {user.name.charAt(0)}
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
            <div className="mx-auto max-w-7xl">
                <Outlet />
            </div>
        </main>
      </div>
    </div>
  );
}

