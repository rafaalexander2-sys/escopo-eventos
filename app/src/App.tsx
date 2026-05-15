import { detectAppMode } from './lib/subdomain'
import LandingApp from './apps/landing/LandingApp'
import AdminApp from './apps/admin/AdminApp'
import PortalApp from './apps/portal/PortalApp'

const { mode, slug } = detectAppMode()

export default function App() {
  if (mode === 'admin') return <AdminApp />
  if (mode === 'portal' && slug) return <PortalApp slug={slug} />
  return <LandingApp />
}
