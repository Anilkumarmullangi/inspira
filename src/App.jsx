import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/stories/:userId" element={<Stories />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/monetization" element={<Monetization />} />
        <Route path="/live" element={<Live />} />
<Route path="/live/:userId" element={<Live />} />
      </Routes>
    </BrowserRouter>
  )
}