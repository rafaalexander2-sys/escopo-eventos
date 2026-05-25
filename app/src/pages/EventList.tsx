import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Event } from '@/types'

const STATUS_LABEL: Record<Event['status'], string> = {
  draft: 'Rascunho',
  published: 'Publicado',
  closed: 'Encerrado',
  cancelled: 'Cancelado',
}

const STATUS_VARIANT: Record<Event['status'], 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  draft: 'default',
  published: 'success',
  closed: 'info',
  cancelled: 'danger',
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: org } = await supabase.from('organizations').select('id').single()
      if (!org) { setLoading(false); return }

      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('organization_id', org.id)
        .order('date', { ascending: true })

      setEvents(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Eventos</h1>
        <Button asChild size="sm">
          <Link to="/events/new">
            <Plus size={14} />
            Novo evento
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        {loading ? (
          <div className="px-5 py-10 text-center text-sm text-gray-400">Carregando...</div>
        ) : events.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-400">
            Nenhum evento ainda.{' '}
            <Link to="/events/new" className="text-gray-700 underline underline-offset-2">Criar agora</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400">
                <th className="px-5 py-3 text-left font-medium">Evento</th>
                <th className="px-5 py-3 text-left font-medium">Data</th>
                <th className="px-5 py-3 text-left font-medium">Local</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <Link to={`/events/${ev.id}`} className="font-medium text-gray-900 hover:underline">
                      {ev.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {new Date(ev.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{ev.city} — {ev.state}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={STATUS_VARIANT[ev.status]}>{STATUS_LABEL[ev.status]}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
