import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index'
import UserProvider from './context/userContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={ router }/>
    </UserProvider>
  </React.StrictMode>,
)

// prueba commit desde torre