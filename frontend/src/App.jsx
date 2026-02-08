import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnboardingPage from './pages/OnboardingPage'
import FriendsPage from './pages/FriendsPage'
import toast, { Toaster } from 'react-hot-toast'
import PageLoader from './components/pageLoader.jsx';
import { useAuthUser } from "./hooks/useAuthUser";
import Layout from "./components/Layout.jsx"
import useThemeStore from "./store/useThemeStore"
const App = () => {

  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();
  const isAuthenticated = Boolean(authUser)
  const isOnboard = Boolean(authUser?.isOnboard);

  if (isLoading) return <PageLoader />;
  return (
    <div className="h-screen overflow-auto" data-theme={theme}>
      <Routes>
        <Route path="/" element={isAuthenticated ? (isOnboard ? <Layout showSidebar={true}> <HomePage /></Layout> : <Navigate to="/onboarding" />) : <Navigate to="/login" />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboard ? "/" : "/onboarding"} />}
        />
        <Route path="/notifications" element={isAuthenticated && isOnboard ? (
          <Layout showSidebar={true}>
            <NotificationPage />
          </Layout>
        ) : !isAuthenticated ? (
          <Navigate to="/login" />
        ) : (
          <Navigate to="/onboarding" />
        )} />

        <Route path="/chat/:id" element={isAuthenticated && isOnboard ? (
          <Layout showSidebar={false}>
            <ChatPage />
          </Layout>
        ) : !isAuthenticated ? (
          <Navigate to="/login" />
        ) : (
          <Navigate to="/onboarding" />
        )} />
        <Route path="/call/:id" element={isAuthenticated && isOnboard ? (<CallPage />) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboard ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/friends" element={isAuthenticated && isOnboard ? (
          <Layout showSidebar={true}>
            <FriendsPage />
          </Layout>
        ) : !isAuthenticated ? (
          <Navigate to="/login" />
        ) : (
          <Navigate to="/onboarding" />
        )} />

      </Routes>
      <Toaster />
    </div>
  )
}

export default App