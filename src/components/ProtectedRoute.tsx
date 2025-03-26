import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
}
