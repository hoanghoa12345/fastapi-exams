import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import CreateTest from "@/pages/CreateTest";
import ListTest from "@/pages/ListTest";
import ErrorPage from "@/pages/ErrorPage";
import ViewTest from "@/pages/ViewTest";
// import "@fontsource/poppins";
import LoginPage from "./pages/auth/Login";
import AdminLayout from "./layouts/AdminLayout";

const theme = extendTheme({
  fonts: {
    heading: `'Arial', sans-serif`,
    body: `'Arial', sans-serif`,
    mono: "Consolas, monospace",
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
