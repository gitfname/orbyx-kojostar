import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App.tsx'
// const sleep = (ms:number) => {
//   return new Promise(resovle => {
//     setTimeout(() => {
//       resovle(1)
//     }, ms);
//   })
// }
// const App = lazy(async () => {
//   await sleep(8000)
//   return import("./App.tsx")
// })
import './index.css'
import './i18n.ts'
import 'react-virtualized/styles.css';
import Loading from './pages/Loading.tsx'
// import Loading from './pages/Loading.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
        <Suspense>
          <App />
          <Loading />
        </Suspense>
      </BrowserRouter>
  </React.StrictMode>,
)
