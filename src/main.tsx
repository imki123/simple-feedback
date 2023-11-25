import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainPage } from './pages/main/MainPage'
import { routes } from './pages/routes'
import { FeedbackPage } from './pages/feedback/FeedbackPage'

const router = createBrowserRouter(
  [
    {
      path: routes.root,
      element: <MainPage />,
    },
    {
      path: routes.feedback,
      element: <FeedbackPage />,
    },
  ],
  {
    basename: '/simple-feedback',
  },
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
