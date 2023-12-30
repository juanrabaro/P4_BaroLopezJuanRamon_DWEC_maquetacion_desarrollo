import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import WikiFacts, { loaderFacts } from "../pages/WikiFacts"
import Fact, { loaderFact } from "../pages/Fact"
import WikiBreeds, { loaderBreeds } from "../pages/WikiBreeds"
import Favourites from "../pages/Favourites"
import SignInPage from "../pages/SignInPage"
import LogInPage from "../pages/LogInPage"
import LayoutPrivate from "../layouts/LayoutPrivate"
import LayoutRoot from "../layouts/LayoutRoot"
import Breed, { loaderBreed } from "../pages/Breed"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/facts",
        element: <WikiFacts />,
        loader: loaderFacts,
      },
      {
        path: "/facts/:id",
        element: <Fact />,
        loader: loaderFact,
      },
      {
        path: "/breeds",
        element: <WikiBreeds />,
        loader: loaderBreeds,
      },
      {
        path: "/breeds/:index",
        element: <Breed />,
        loader: loaderBreed,
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/login",
        element: <LogInPage />,
      },
      {
        path:"/profile",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
        ]
      },
    ],
  },
])