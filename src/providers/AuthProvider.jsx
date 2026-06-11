import { useCallback, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import AuthContext from "./AuthContext";

const googleProvider = new GoogleAuthProvider();
const authStorageKey = "bookcourier-auth";

const isTokenExpired = (authToken) => {
  try {
    const payload = JSON.parse(atob(authToken.split(".")[1]));
    return payload.exp ? Date.now() >= payload.exp * 1000 : false;
  } catch {
    return true;
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  const apiFetch = async (path, options) => {
    if (!API_BASE_URL) {
      throw new Error(
        "Missing API base URL. Set VITE_API_URL in .env.local or .env.",
      );
    }

    const response = await fetch(`${API_BASE_URL}${path}`, options);
    return response;
  };

  const makeSessionUser = (authUser, authToken) => {
    if (!authUser) return null;

    return {
      ...authUser,
      displayName: authUser.name || authUser.displayName || "",
      photoURL: authUser.photo || authUser.photoURL || "",
      getIdToken: async () => authToken,
    };
  };

  const saveSession = (authUser, authToken) => {
    const sessionUser = makeSessionUser(authUser, authToken);
    localStorage.setItem(
      authStorageKey,
      JSON.stringify({ user: authUser, token: authToken }),
    );
    setUser(sessionUser);
    setToken(authToken);
    return sessionUser;
  };

  const clearSession = useCallback(() => {
    localStorage.removeItem(authStorageKey);
    setUser(null);
    setToken("");
  }, []);

  const createUser = async ({ name, email, password, photo }) => {
    setLoading(true);

    try {
      const res = await apiFetch("/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password, photo }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to register");
      }

      saveSession(data.user, data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (name, photo) => {
    if (!token) {
      throw new Error("You must be logged in to update your profile");
    }

    const res = await apiFetch("/users/profile", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, photo }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    saveSession(data.user, token);
    return data;
  };

  const updatePassword = async (currentPassword, newPassword) => {
    if (!token) {
      throw new Error("You must be logged in to update your password");
    }

    const res = await apiFetch("/users/password", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update password");
    }

    return data;
  };

  const loginUser = async (email, password) => {
    setLoading(true);

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to login");
      }

      saveSession(data.user, data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();

      const res = await apiFetch("/auth/google", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to complete Google login");
      }

      saveSession(data.user, data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = useCallback(async () => {
    setLoading(true);
    clearSession();

    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  const handleAuthError = useCallback(
    (message = "") => {
      const normalizedMessage = message.toLowerCase();

      if (
        normalizedMessage.includes("token expired") ||
        normalizedMessage.includes("unauthorized")
      ) {
        clearSession();
        return true;
      }

      return false;
    },
    [clearSession],
  );

  useEffect(() => {
    const storedSession = localStorage.getItem(authStorageKey);

    if (!storedSession) {
      setLoading(false);
      return;
    }

    try {
      const parsedSession = JSON.parse(storedSession);
      if (parsedSession?.user && parsedSession?.token) {
        if (isTokenExpired(parsedSession.token)) {
          clearSession();
          return;
        }

        setUser(makeSessionUser(parsedSession.user, parsedSession.token));
        setToken(parsedSession.token);
      }
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  const authInfo = {
    user,
    token,
    loading,
    createUser,
    updateUserProfile,
    updatePassword,
    loginUser,
    googleLogin,
    logoutUser,
    handleAuthError,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
