import { history } from "./helpers/history"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import ApplicationLayout from "./layouts/ApplicationLayout"
import NotFound from "./pages/NotFound"
import { ApplicationRoutes } from "./routes"
import useUserStore from "./stores/userStore"
import Login from "./pages/Login"
import { useEffect, lazy, Suspense } from "react"
import { localStorage_token_key } from "./constants"
import { getUserInfo } from "./utils/http"
import { useApplicationLoadingStore } from "./stores/useApplicationLoadingStore"
import Loading from "./pages/Loading"
import SingleJobAllComments from "./pages/SingleJobAllComments/SingleJobAllComments"
import SingleGuestJob from "./pages/SingleGuestJobPage/SingleGuestJob"

const Search = lazy(() => import("./pages/Search"))
// import Search from "./pages/Search"
const Popular = lazy(() => import("./pages/Popular"))
// import Popular from "./pages/Popular"
const MostComments = lazy(() => import("./pages/MostComments"))
// import MostComments from "./pages/MostComments"
const DisCounts = lazy(() => import("./pages/DisCounts"))
// import DisCounts from "./pages/DisCounts"
const SingleJob = lazy(() => import("./pages/SingleJob/SingleJob"))
// import SingleJob from "./pages/SingleJob"
const BookMarked = lazy(() => import("./pages/BookMarked"))
// import BookMarked from "./pages/BookMarked"
const MyComments = lazy(() => import("./pages/MyComents/MyComments"))
// import MyComments from "./pages/MyComents/MyComments"
const LastViewedJobs = lazy(() => import("./pages/LastViewedJobs"))
// import LastViewedJobs from "./pages/LastViewedJobs"
const NewJob = lazy(() => import("./pages/NewJob"))
// import NewJob from "./pages/NewJob
const Profile = lazy(() => import("./pages/Profile/Profile"))
// import Profile from "./pages/Profile"
const EditProfile = lazy(() => import("./pages/EditProfile/EditProfile"))
// import EditProfile from "./pages/EditProfile/EditProfile"
const CommentsAndSuggestion = lazy(() => import("./pages/CommentsAndSuggestions/CommentsAndSuggestions"))
// import CommentsAndSuggestion from "./pages/CommentsAndSuggestions/CommentsAndSuggestions"
const ContactUsAndAds = lazy(() => import("./pages/ContactUsAndAds/ContactUsAndAds"))
// import ContactUsAndAds from "./pages/ContactUsAndAds/ContactUsAndAds"
const SuggestAddNewPlace = lazy(() => import("./pages/SuggestAddNewPlace/SuggestAddNewPlace"))
// import SuggestAddNewPlace from "./pages/SuggestAddNewPlace/SuggestAddNewPlace"




function App() {
  const [userApi, userData] = useUserStore(selectore => [selectore.api, selectore.user])
  const setIsLoading = useApplicationLoadingStore(selector => selector.setIsLoading);
  const location = useLocation()

  history.navigate = useNavigate()
  history.location = location


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
            if (userInfo.is_logged_in) {
              console.log(userInfo);

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
            }
            else {
              userApi.setUser({
                firstname: undefined,
                lastname: undefined,
                phone: undefined,
                role: undefined,
                status: undefined,
                userid: undefined,
                username: undefined,
                avatar: undefined,
                city_id: undefined,
                city: undefined,
                token: undefined,
                isLoggedIn: false
              })
            }
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

  if (!location.pathname.startsWith("/jobs/guest/")) {
    if (!userData.isLoggedIn) return <Login />
  }
  else {
    console.log("starts with that");

  }

  return (
    <>
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
            path={ApplicationRoutes.pages.guestJobPage}
            element={
              <Suspense fallback={<Loading />}>
                <SingleGuestJob />
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
              <Suspense fallback={undefined}>
                <NewJob />
              </Suspense>
            }
          />

          <Route
            path={ApplicationRoutes.pages.lastSeenJobs}
            element={
              <Suspense fallback={<Loading />}>
                <LastViewedJobs />
              </Suspense>
            }
          />

          <Route
            path={ApplicationRoutes.pages.myComments}
            element={
              <Suspense fallback={<Loading />}>
                <MyComments />
              </Suspense>
            }
          />

          <Route
            path={ApplicationRoutes.pages.suggestAddNewPlace}
            element={
              <Suspense fallback={<Loading />}>
                <SuggestAddNewPlace />
              </Suspense>
            }
          />

          <Route
            path={ApplicationRoutes.pages.contactUsAndAds}
            element={
              <Suspense fallback={<Loading />}>
                <ContactUsAndAds />
              </Suspense>
            }
          />

          <Route
            path={ApplicationRoutes.pages.commentsAndSuggestions}
            element={
              <Suspense fallback={<Loading />}>
                <CommentsAndSuggestion />
              </Suspense>
            }
          />

          <Route
            path={ApplicationRoutes.pages.editProfile}
            element={
              <Suspense fallback={<Loading />}>
                <EditProfile />
              </Suspense>
            }
          />

          <Route
            path={ApplicationRoutes.pages.allComments}
            element={
              <Suspense fallback={<Loading />}>
                <SingleJobAllComments />
              </Suspense>
            }
          />

          <Route path="*" element={<NotFound />} />

        </Routes>

      </ApplicationLayout>
    </>
  )
}

export default App
