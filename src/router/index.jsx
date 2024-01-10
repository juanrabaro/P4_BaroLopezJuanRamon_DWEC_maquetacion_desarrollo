import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import WikiFacts from "../pages/WikiFacts"
import { loaderFacts } from "../loaders"
import Fact from "../pages/Fact"
import { loaderFact } from "../loaders"
import WikiBreeds from "../pages/WikiBreeds"
import { loaderBreeds } from "../loaders"
import Breed from "../pages/Breed"
import { loaderBreed } from "../loaders"
import Favourites from "../pages/Favourites"
import RegisterPage from "../pages/RegisterPage"
import SignInPage from "../pages/SignInPage"
import LayoutPrivate from "../layouts/LayoutPrivate"
import LayoutRoot from "../layouts/LayoutRoot"
import ContactPage from "../pages/ContactPage"

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
        path: "/breeds/:id",
        element: <Breed />,
        loader: loaderBreed,
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
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