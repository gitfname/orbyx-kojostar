
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ApplicationLayout from "./layouts/ApplicationLayout"
import { ChakraProvider } from "@chakra-ui/react"
import NotFound from "./pages/NotFound"
import { ApplicationRoutes } from "./routes"
import useUserStore from "./stores/userStore"
import Login from "./pages/Login"
import { useEffect, lazy, Suspense } from "react"
import { localStorage_token_key } from "./constants"
import { getUserInfo } from "./utils/http"
import { useApplicationLoadingStore } from "./stores/useApplicationLoadingStore"
import Loading from "./pages/Loading"
import Profile from "./pages/Profile"
import NewJob from "./pages/NewJob"

const Search = lazy(() => import("./pages/Search"))
// import Search from "./pages/Search"
const Popular = lazy(() => import("./pages/Popular"))
// import Popular from "./pages/Popular"
const MostComments = lazy(() => import("./pages/MostComments"))
// import MostComments from "./pages/MostComments"
const DisCounts = lazy(() => import("./pages/DisCounts"))
// import DisCounts from "./pages/DisCounts"
const SingleJob = lazy(() => import("./pages/SingleJob"))
// import SingleJob from "./pages/SingleJob"
const BookMarked = lazy(() => import("./pages/BookMarked"))
// import BookMarked from "./pages/BookMarked"

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

            <Route
              path={ApplicationRoutes.pages.home}
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />

            <Route
              path={ApplicationRoutes.pages.search}
              element={
                <Suspense fallback={<Loading />}>
                  <Search />
                </Suspense>
              }
            >

              <Route
                index
                element={
                  <Suspense>
                    <Popular />
                  </Suspense>
                }
              />

              <Route
                path="most-comment"
                element={
                  <Suspense fallback={<Loading />}>
                    <MostComments />
                  </Suspense>
                }
              />

              <Route
                path="discounts"
                element={
                  <Suspense fallback={<Loading />}>
                    <DisCounts />
                  </Suspense>
                }
              />
              
              <Route path="*" element={<NotFound />} />

            </Route>

            <Route
              path={ApplicationRoutes.pages.bookmarks}
              element={
                <Suspense fallback={<Loading />}>
                  <BookMarked />
                </Suspense>
              }
            />

            <Route
              path={ApplicationRoutes.pages.jobPage}
              element={
                <Suspense fallback={<Loading />}>
                  <SingleJob />
                </Suspense>
              }
            />

            <Route
              path={ApplicationRoutes.pages.profile}
              element={
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              }
            />

            <Route
              path={ApplicationRoutes.pages.newJob}
              element={
                <Suspense fallback={<Loading />}>
                  <NewJob />
                </Suspense>
              }
            />

            <Route path="*" element={<NotFound />} />

          </Routes>

        </ApplicationLayout>
      </ChakraProvider>
    </>
  )
}

export default App
