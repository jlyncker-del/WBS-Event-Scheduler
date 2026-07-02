import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import CreateEventPage from './pages/CreateEventPage'
import EventDetailsPage from './pages/EventDetailsPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="events/:id" element={<EventDetailsPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="create-event" element={<CreateEventPage />} />
        </Route>
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  )
}

export default App
