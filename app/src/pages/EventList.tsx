import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Event } from '@/types'

const STATUS_LABEL: Record<Event['status'], string> = { draft: 'Rascunho', published: 'Publicado', closed: 'Encerrado', cancelled: 'Cancelado' }
const STATUS_VARIANT: Record<Event['status'], 'default' | 'success' | 'warning' | 'danger' | 'info' | 'lime'> = {
  draft: 'default', published: 'success', closed: 'lime', cancelled: 'danger',
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: org } = await supabase.from('organizations').select('id').single()
      if (!org) { setLoading(false); return }
      const { data } = await supabase.from('events').select('*').eq('organization_id', org.id).order('date', { ascending: true })
      setEvents(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="px-6 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Gerenciamento</p>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>EVENTOS</h1>
        </div>
        <Button asChild size="sm">
          <Link to="/events/new"><Plus size={14} />Novo evento</Link>
        </Button>
      </div>

      <div className="bg-[#141414] border border-white/6 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-white/25">Carregando...</div>
        ) : events.length === 0 ? (
          <div className="px-5 py-12 text-center space-y-3">
            <p className="text-sm text-white/25">Nenhum evento ainda.</p>
            <Button asChild size="sm" variant="outline">
              <Link to="/events/new"><Plus size={13} />Criar agora</Link>
            </Button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/6">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-white/25">Evento</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-white/25">Data</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-white/25">Local</th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-white/25">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {events.map(ev => (
                <tr key={ev.id} className="hover:bg-white/2 transition-colors group">
                  <td className="px-5 py-3.5">
                    <Link to={`/events/${ev.id}`} className="font-semibold text-white group-hover:text-[#ccff00] transition-colors">
                      {ev.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-white/40 font-mono text-xs">{new Date(ev.date).toLocaleDateString('pt-BR')}</td>
                  <td className="px-5 py-3.5 text-white/40">{ev.city} — {ev.state}</td>
                  <td className="px-5 py-3.5"><Badge variant={STATUS_VARIANT[ev.status]}>{STATUS_LABEL[ev.status]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
