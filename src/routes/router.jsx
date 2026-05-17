import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

import DashboardHome from "../pages/Dashboard/DashboardHome";
import Profile from "../pages/Dashboard/Profile";
import BorrowedBooks from "../pages/Dashboard/BorrowedBooks";

import Books from "../pages/Books/Books";
import BookDetails from "../pages/Books/BookDetails";

import ErrorPage from "../pages/ErrorPage/ErrorPage";

import PrivateRoute from "./PrivateRoute";
import Invoices from "../pages/Dashboard/Invoices";
import AddBook from "../pages/Dashboard/AddBook";
import MyBooks from "../pages/Dashboard/MyBooks";
import AllUsers from "../pages/Dashboard/AllUsers";
import ManageBooks from "../pages/Dashboard/ManageBooks";
import Orders from "../pages/Dashboard/Orders";

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
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
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
        path: "my-orders",
        element: <BorrowedBooks />,
      },
      {
        path: "invoices",
        element: <Invoices />,
      },
      {
        path: "add-book",
        element: <AddBook />,
      },
      {
        path: "my-books",
        element: <MyBooks />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "manage-books",
        element: <ManageBooks />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
]);

export default router;
