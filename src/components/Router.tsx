import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

// Import pages
import HomePage from '@/components/pages/HomePage';
import TreatmentsPage from '@/components/pages/TreatmentsPage';
import TreatmentDetailPage from '@/components/pages/TreatmentDetailPage';
import HospitalsPage from '@/components/pages/HospitalsPage';
import HospitalDetailPage from '@/components/pages/HospitalDetailPage';
import LoginPage from '@/components/pages/LoginPage';
import AppointmentPage from '@/components/pages/AppointmentPage';
import ProfilePage from '@/components/pages/ProfilePage';
import DashboardPage from '@/components/pages/DashboardPage';
import DoctorDashboardPage from '@/components/pages/DoctorDashboardPage';
import AdminDashboardPage from '@/components/pages/AdminDashboardPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />, // MIXED ROUTE: Shows different content for authenticated vs anonymous users
      },
      {
        path: "treatments",
        element: <TreatmentsPage />,
      },
      {
        path: "treatments/:treatmentId",
        element: <TreatmentDetailPage />,
      },
      {
        path: "hospitals",
        element: <HospitalsPage />,
      },
      {
        path: "hospitals/:hospitalId",
        element: <HospitalDetailPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "appointment",
        element: <AppointmentPage />,
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute>
            <ProfilePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <MemberProtectedRoute>
            <DashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "doctor-dashboard",
        element: (
          <MemberProtectedRoute>
            <DoctorDashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <MemberProtectedRoute>
            <AdminDashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
