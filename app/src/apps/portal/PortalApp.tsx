import { BrowserRouter, Routes, Route } from 'react-router-dom'

interface Props {
  slug: string
}

// Portal público white label — zero rastro da plataforma
// O slug identifica o tenant e carrega o branding correspondente
export default function PortalApp({ slug }: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Vitrine de eventos de {slug} — em construção</div>} />
        <Route path="/e/:eventId" element={<div>Página do evento — em construção</div>} />
        <Route path="/e/:eventId/inscricao" element={<div>Formulário de inscrição — em construção</div>} />
        <Route path="/e/:eventId/confirmacao" element={<div>Confirmação + QR Code — em construção</div>} />
      </Routes>
    </BrowserRouter>
  )
}
