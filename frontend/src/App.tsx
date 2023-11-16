import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import CreateTest from "@/pages/CreateTest";
import ListTest from "@/pages/ListTest";
import ErrorPage from "@/pages/ErrorPage";
import ViewTest from "@/pages/ViewTest";
import "@fontsource/poppins";
import LoginPage from "./pages/auth/Login";
import AdminLayout from "./layouts/AdminLayout";

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
    mono: "Consolas, monospace",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListTest />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tests/:testId",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    errorElement: <ErrorPage />,
    element: <AdminLayout />,
    children: [
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
