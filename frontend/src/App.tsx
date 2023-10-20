import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from '@/pages/Home'
import MainTest from '@/pages/MainTest'
import CreateTest from '@/pages/CreateTest';

const theme = extendTheme({
  fonts: {
    // heading: `'Raleway', sans-serif`,
    // body: `'Raleway', sans-serif`,
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/main-test",
    element: <MainTest/>,
  },
  {
    path: '/create-test',
    element: <CreateTest/>
  },
  {
    path: '/create-test/:id',
    element: <CreateTest/>
  }
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}

export default App
