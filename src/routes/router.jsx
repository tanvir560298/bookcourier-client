import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import PrivacyTerms from "../pages/Legal/PrivacyTerms";
import Blog from "../pages/Blog/Blog";

import DashboardHome from "../pages/Dashboard/DashboardHome";
import Profile from "../pages/Dashboard/Profile";
import BorrowedBooks from "../pages/Dashboard/BorrowedBooks";

import Books from "../pages/Books/Books";
import BookDetails from "../pages/Books/BookDetails";

import ErrorPage from "../pages/ErrorPage/ErrorPage";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";
import Invoices from "../pages/Dashboard/Invoices";
import AddBook from "../pages/Dashboard/AddBook";
import MyBooks from "../pages/Dashboard/MyBooks";
import AllUsers from "../pages/Dashboard/AllUsers";
import ManageBooks from "../pages/Dashboard/ManageBooks";
import Orders from "../pages/Dashboard/Orders";
import Reports from "../pages/Dashboard/Reports";
import CategoriesAdmin from "../pages/Dashboard/CategoriesAdmin";
import Settings from "../pages/Dashboard/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/books",
        element: <Books />,
      },

      {
        path: "/books/:id",
        element: <BookDetails />,
      },

      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/blog",
        element: <Blog />,
      },

      {
        path: "/privacy-terms",
        element: <PrivacyTerms />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/dashboard",

    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      {
        index: true,
        element: <DashboardHome />,
      },

      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },

      {
        path: "my-orders",
        element: <BorrowedBooks />,
      },
      {
        path: "invoices",
        element: <Invoices />,
      },
      {
        path: "add-book",
        element: (
          <RoleRoute allowedRoles={["admin", "librarian"]}>
            <AddBook />
          </RoleRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <RoleRoute allowedRoles={["admin", "librarian"]}>
            <MyBooks />
          </RoleRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AllUsers />
          </RoleRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ManageBooks />
          </RoleRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <RoleRoute allowedRoles={["admin", "librarian"]}>
            <Orders />
          </RoleRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <Reports />
          </RoleRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <CategoriesAdmin />
          </RoleRoute>
        ),
      },
    ],
  },
]);

export default router;
