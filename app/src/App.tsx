import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import AdminLayout from '@/components/AdminLayout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import EventList from '@/pages/EventList'
import EventNew from '@/pages/EventNew'
import EventDetail from '@/pages/EventDetail'
import EventEdit from '@/pages/EventEdit'
import EventPublic from '@/pages/EventPublic'
import Participants from '@/pages/Participants'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  if (loading) return null
  if (!session) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/login" element={<Login />} />
        <Route path="/e/:slug" element={<EventPublic />} />

        {/* Admin protegido */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/new" element={<EventNew />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/events/:id/edit" element={<EventEdit />} />
          <Route path="/participants" element={<Participants />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
