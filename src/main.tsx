import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
// const App = lazy(() => import("./App.tsx"))
// import App from './App.tsx'
const sleep = (ms: number) => {
  return new Promise(resovle => {
    setTimeout(() => {
      resovle(1)
    }, ms);
  })
}
const App = lazy(async () => {
  await sleep(7300)
  return import("./App.tsx")
})
import './index.css'
import './i18n.ts'
import 'react-virtualized/styles.css';
import 'swiper/css';
import Loading from './pages/Loading.tsx'
import InitialAppLoading from './pages/InitialAppLoading.tsx'
import LoadInitialData from './components/LoadInitialData.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Suspense fallback={<InitialAppLoading />}>
          <App />
          <Loading />
          <LoadInitialData />
        </Suspense>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
