import "./App.css";
import LoginNav from "./Components/LoginNav";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext, { UserProvider } from "./usercontext";
import { useContext } from "react";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateStudent from "./Pages/Admin/CreateStudent";
import CreateMentor from "./Pages/Admin/CreateMentor";
import CreateAdmin from "./Pages/Admin/CreateAdmin";
import StudentDashboard from "./Pages/Student/StudentDashboard";
import MentorDashboard from "./Pages/Mentor/MentorDashboard";
import ChangePassword from "./Pages/ChangePassword";
import AddAssignment from "./Pages/Mentor/AddAssignment";
import ViewAssignment from "./Pages/Student/ViewAssignment";
import SubmitAssignment from "./Pages/Student/SubmitAssignment";
import ViewSubmittedAssignments from "./Pages/Mentor/ViewSubmittedAssignments";
import ViewUsers from "./Pages/Admin/ViewUser"
import ViewProfile from "./Pages/ViewProfile";

function App() {
  let contextData = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* Admin routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/addStudent" element={<CreateStudent />} />
            <Route path="/admin/addMentor" element={<CreateMentor />} />
            <Route path="/admin/addAdmin" element={<CreateAdmin />} />
            <Route path="/admin/view-users" element={<ViewUsers />} />

            {/* Student Routes */}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route
              path="/student/view-assignment"
              element={<ViewAssignment />}
            />
            <Route
              path="/student/submit-assignment/:taskId/:username"
              element={<SubmitAssignment />}
            />

            {/* Mentor Routes */}
            <Route path="/mentor-dashboard" element={<MentorDashboard />} />
            <Route path="/mentor/add-assignment" element={<AddAssignment />} />
            <Route
              path="/mentor/view-submitted-assignments"
              element={<ViewSubmittedAssignments />}
            />

            {/* Common Route */}
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/viewprofile/:username" element={<ViewProfile />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
