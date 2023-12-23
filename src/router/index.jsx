import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import Dashboard from "../pages/Dashboard"
import LayoutPrivate from "../layouts/LayoutPrivate"
import LayoutRoot from "../layouts/LayoutRoot"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:"/dashboard",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ]
      },
    ],
  },
])