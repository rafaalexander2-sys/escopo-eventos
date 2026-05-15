import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './admin.css'
import AdminLayout from './layout/AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'

export default function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Todas as rotas autenticadas ficam dentro do AdminLayout (sidebar) */}
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/new" element={<div style={{padding:28}}>Novo evento — em construção</div>} />
          <Route path="/events/:id" element={<div style={{padding:28}}>Detalhe do evento — em construção</div>} />
          <Route path="/events/:id/registrations" element={<div style={{padding:28}}>Inscrições — em construção</div>} />
          <Route path="/registrations" element={<div style={{padding:28}}>Todas as inscrições — em construção</div>} />
          <Route path="/financial" element={<div style={{padding:28}}>Financeiro — em construção</div>} />
          <Route path="/settings/branding" element={<div style={{padding:28}}>White Label — em construção</div>} />
          <Route path="/settings" element={<div style={{padding:28}}>Configurações — em construção</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
