import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Ticket Moove</h1>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Sair
        </Button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Seus eventos</h2>
          <p className="text-gray-500 text-sm">Nenhum evento criado ainda.</p>
        </div>
      </main>
    </div>
  )
}
