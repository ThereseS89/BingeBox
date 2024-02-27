import * as React  from 'react'
import * as ReactDOM  from 'react-dom'
import { RouterProvider } from "react-router-dom"
import  router  from "./Routes/routeconfig.jsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)