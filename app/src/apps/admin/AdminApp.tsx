import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Rotas do painel do organizador
export default function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<div>Login — em construção</div>} />
        <Route path="/dashboard" element={<div>Dashboard — em construção</div>} />
        <Route path="/events" element={<div>Eventos — em construção</div>} />
        <Route path="/events/new" element={<div>Novo evento — em construção</div>} />
        <Route path="/events/:id" element={<div>Evento — em construção</div>} />
        <Route path="/events/:id/registrations" element={<div>Inscrições — em construção</div>} />
        <Route path="/settings" element={<div>Configurações — em construção</div>} />
        <Route path="/settings/branding" element={<div>White label — em construção</div>} />
      </Routes>
    </BrowserRouter>
  )
}
