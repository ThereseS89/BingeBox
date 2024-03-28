import * as React  from 'react'
import * as ReactDOM  from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import  router  from "./Routes/routeconfig"
import './index.scss'
import { RecoilRoot } from 'recoil'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
)
