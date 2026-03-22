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
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/shadowban" element={<Shadowban />} />
        <Route path="/algorithm" element={<Algorithm />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)