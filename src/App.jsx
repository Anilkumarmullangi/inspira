import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import Messages from './pages/Messages'
import Reels from './pages/Reels'
import Explore from './pages/Explore'
import Stories from './pages/Stories'
import Search from './pages/Search'
import CreatePost from './pages/CreatePost'
import Settings from './pages/Settings'
import Monetization from './pages/Monetization'
import Live from './pages/Live'
import Analytics from './pages/Analytics'
import Collections from './pages/Collections'
import Shadowban from './pages/Shadowban'
import Algorithm from './pages/Algorithm'
import PostDetail from './pages/PostDetail'
import Onboarding from './pages/Onboarding'
import UserProfile from './pages/UserProfile'
import NotFound from './pages/NotFound'

import './styles/global.css'

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reels"
        element={
          <ProtectedRoute>
            <Reels />
          </ProtectedRoute>
        }
      />

      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stories/:userId"
        element={
          <ProtectedRoute>
            <Stories />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/monetization"
        element={
          <ProtectedRoute>
            <Monetization />
          </ProtectedRoute>
        }
      />

      <Route
        path="/live"
        element={
          <ProtectedRoute>
            <Live />
          </ProtectedRoute>
        }
      />

      <Route
        path="/live/:userId"
        element={
          <ProtectedRoute>
            <Live />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/collections"
        element={
          <ProtectedRoute>
            <Collections />
          </ProtectedRoute>
        }
      />

      <Route
        path="/shadowban"
        element={
          <ProtectedRoute>
            <Shadowban />
          </ProtectedRoute>
        }
      />

      <Route
        path="/algorithm"
        element={
          <ProtectedRoute>
            <Algorithm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/post/:postId"
        element={
          <ProtectedRoute>
            <PostDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/:username"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}