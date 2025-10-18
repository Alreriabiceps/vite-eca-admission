import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import IntroAnimation from "./components/IntroAnimation";
import Hero from "./pages/Hero";
import ApplicationForm from "./pages/ApplicationForm";
import Confirmation from "./pages/Confirmation";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BackupManagement from "./pages/BackupManagement";
import Archives from "./pages/Archives";
import Analytics from "./pages/Analytics";
import CourseDetails from "./pages/CourseDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Hero />} />
            <Route path="/application" element={<ApplicationForm />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/course/:courseSlug" element={<CourseDetails />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/backup"
              element={
                <ProtectedRoute>
                  <BackupManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/archives"
              element={
                <ProtectedRoute>
                  <Archives />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
