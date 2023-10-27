import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import MainTest from "@/pages/MainTest";
import CreateTest from "@/pages/CreateTest";
import ListTest from "@/pages/ListTest";
import ErrorPage from "@/pages/ErrorPage";

const theme = extendTheme({
  fonts: {
    // heading: `'Raleway', sans-serif`,
    // body: `'Raleway', sans-serif`,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListTest />,
  },
  {
    path: "/tests/:testId",
    element: <Home />,
  },
  {
    path: "/create-test",
    element: <CreateTest />,
  },
  {
    path: "/create-test/:id",
    element: <CreateTest />,
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
