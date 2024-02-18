import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import CreateTest from "@/pages/admin/CreateTest";
import ListTest from "@/pages/ListTest";
import ErrorPage from "@/pages/ErrorPage";
import ViewTest from "@/pages/admin/ViewTest";
import LoginPage from "./pages/auth/Login";
import AdminLayout from "./layouts/AdminLayout";
import ProfilePage from "./pages/Profile";
import RegisterPage from "./pages/auth/Register";
import MainLayout from "./layouts/MainLayout";
import MainTest from "./pages/MainTest";

const theme = extendTheme({
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "Consolas, monospace",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ListTest />,
      },
      {
        path: "tests/:testId",
        element: <MainTest />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      }
    ],
  },
  // {
  //   path: "/",
  //   element: <ListTest />,
  //   errorElement: <ErrorPage />,
  // },
  // {
  //   path: "/tests/:testId",
  //   element: <Home />,
  //   errorElement: <ErrorPage />,
  // },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  // {
  //   path: "/profile",
  //   element: <ProfilePage />,
  // },
  {
    path: "/admin",
    errorElement: <ErrorPage />,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <p>Dashboard</p>,
      },
      {
        path: "create-test",
        element: <CreateTest />,
      },
      {
        path: "create-test/:id",
        element: <ViewTest />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
