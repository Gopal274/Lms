import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/auth/Login";
import DashboardOverview from "./pages/Dashboard";
import CourseList from "./pages/courses/CourseList";
import CreateCourse from "./pages/courses/CreateCourse";
import CourseEditor from "./pages/courses/CourseEditor";
import TeacherBatches from "./pages/batches/TeacherBatches";
import TeacherBatchDetail from "./pages/batches/TeacherBatchDetail";
import LiveRoomList from "./pages/live/LiveRoomList";
import LiveRoom from "./pages/live/LiveRoom";
import TeacherResources from "./pages/courses/TeacherResources";
import BatchList from "./pages/batches/BatchList";
import UserList from "./pages/users/UserList";
import PlanManagement from "./pages/payments/PlanManagement";
import DoubtModeration from "./pages/doubts/DoubtModeration";
import GeneralSettings from "./pages/settings/GeneralSettings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="courses/new" element={<CreateCourse />} />
            <Route path="courses/:id" element={<CourseEditor />} />
            <Route path="batches" element={<BatchList />} />
            <Route path="plans" element={<PlanManagement />} />
            <Route path="doubts" element={<DoubtModeration />} />
            <Route path="users" element={<UserList />} />

            {/* Teacher Routes */}
            <Route path="teacher/batches" element={<TeacherBatches />} />
            <Route path="teacher/batch/:id" element={<TeacherBatchDetail />} />
            <Route path="teacher/live" element={<LiveRoomList />} />
            <Route path="teacher/live/:sessionId" element={<LiveRoom />} />
            <Route path="teacher/resources" element={<TeacherResources />} />

            <Route path="settings" element={<GeneralSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
