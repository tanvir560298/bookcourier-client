import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const RoleRoute = ({ allowedRoles, children }) => {
  const { token, loading, logoutUser } = useAuth();
  const location = useLocation();
  const [roleState, setRoleState] = useState({
    loading: true,
    role: "",
    error: "",
  });

  useEffect(() => {
    if (loading) return;

    if (!token) {
      setRoleState({ loading: false, role: "", error: "unauthorized access" });
      return;
    }

    let ignore = false;

    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to verify role");
        }

        return data;
      })
      .then((data) => {
        if (!ignore) {
          setRoleState({
            loading: false,
            role: data.user?.role || "user",
            error: "",
          });
        }
      })
      .catch((error) => {
        if (!ignore) {
          if (
            error.message.toLowerCase().includes("token expired") ||
            error.message.toLowerCase().includes("unauthorized")
          ) {
            logoutUser();
          }

          setRoleState({ loading: false, role: "", error: error.message });
        }
      });

    return () => {
      ignore = true;
    };
  }, [loading, logoutUser, token]);

  if (loading || roleState.loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-warning" />
      </div>
    );
  }

  if (roleState.error) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(roleState.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
