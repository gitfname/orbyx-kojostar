
import { Routes, Route, json, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import ApplicationLayout from "./layouts/ApplicationLayout"
import { ChakraProvider } from "@chakra-ui/react"
import NotFound from "./pages/NotFound"
import { ApplicationRoutes } from "./routes"
import useUserStore from "./stores/userStore"
import Login from "./pages/Login"
import { useEffect } from "react"
import { localStorage_token_key } from "./constants"
import { getUserInfo } from "./utils/http"
import { useApplicationLoadingStore } from "./stores/useApplicationLoadingStore"
import Search from "./pages/Search"
import Popular from "./pages/Popular"
import MostComments from "./pages/MostComments"
import DisCounts from "./pages/DisCounts"

function App() {
  const [userApi, userData] = useUserStore(selectore => [selectore.api, selectore.user])
  const setIsLoading = useApplicationLoadingStore(selector => selector.setIsLoading);
  

  useEffect(
    () => {
      console.log(userData);
    },
    [userData]
  )

  useEffect(
    () => {
      const token = localStorage.getItem(localStorage_token_key)
      if (token) {
        setIsLoading(true)
        getUserInfo({ token })
          .then(userInfo => {
            userApi.setUser({
              firstname: userInfo.data.first_name,
              lastname: userInfo.data.last_name,
              phone: userInfo.data.phone_number,
              role: userInfo.data.role,
              status: 1,
              userid: userInfo.data.id,
              username: userInfo.data.username,
              avatar: userInfo.data.avatar,
              city_id: userInfo.data.city_id,
              city: userInfo.data.city,
              token,
              isLoggedIn: true
            })
            setIsLoading(false)
          })
      }
      else {
        setIsLoading(false)
      }
    },
    []
  )

  // const [_, i18n] = useTranslation()  

  // set theme 
  // useEffect(
  //   () => {
  //     const link = document.createElement("link")
  //     link.rel = "stylesheet"
  //     link.href = import.meta.env.BASE_URL+"/themes/light.css"
  //     document.head.append(link)
  //   },
  //   []
  // )

  // set direction based on current languaglanguage
  // useEffect(
  //   () => {
  //     console.log(i18n.language);
  //     document.body.dir = i18n.dir(i18n.language)
  //   },
  //   [i18n.language]
  // )

  if(!userData.isLoggedIn) return <Login />

  return (
    <>
      <ChakraProvider>
        <ApplicationLayout>
          <Routes>
            <Route path={ApplicationRoutes.pages.home} element={<Home />} />
            <Route path={ApplicationRoutes.pages.search} element={<Search />}>
              <Route index element={<Popular />} />
              <Route path="most-comment" element={<MostComments />} />
              <Route path="discounts" element={<DisCounts />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ApplicationLayout>
      </ChakraProvider>
    </>
  )
}

export default App
