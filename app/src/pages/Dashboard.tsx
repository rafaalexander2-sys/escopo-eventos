import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Users, TrendingUp, Plus } from 'lucide-react'
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

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ events: 0, registrations: 0 })

  useEffect(() => {
    async function load() {
      const { data: org } = await supabase
        .from('organizations')
        .select('id')
        .single()

      if (!org) { setLoading(false); return }

      const { data: evts } = await supabase
        .from('events')
        .select('*')
        .eq('organization_id', org.id)
        .order('date', { ascending: true })
        .limit(5)

      const eventIds = evts?.map(e => e.id) ?? []
      const { count: regCount } = eventIds.length > 0
        ? await supabase
            .from('registrations')
            .select('id', { count: 'exact', head: true })
            .in('event_id', eventIds)
        : { count: 0 }

      setEvents(evts ?? [])
      setStats({ events: evts?.length ?? 0, registrations: regCount ?? 0 })
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">Visão geral</h1>
        <Button asChild size="sm">
          <Link to="/events/new">
            <Plus size={14} />
            Novo evento
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: CalendarDays, label: 'Eventos', value: stats.events },
          { icon: Users, label: 'Inscrições', value: stats.registrations },
          { icon: TrendingUp, label: 'Conversão', value: '—' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 px-5 py-4">
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
              <Icon size={13} />
              {label}
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Eventos recentes */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Próximos eventos</h2>
          <Link to="/events" className="text-xs text-gray-400 hover:text-gray-700">Ver todos</Link>
        </div>

        {loading ? (
          <div className="px-5 py-8 text-center text-sm text-gray-400">Carregando...</div>
        ) : events.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-gray-400">
            Nenhum evento ainda.{' '}
            <Link to="/events/new" className="text-gray-700 underline underline-offset-2">Criar o primeiro</Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {events.map((ev) => (
              <li key={ev.id}>
                <Link
                  to={`/events/${ev.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{ev.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{ev.city} — {new Date(ev.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <Badge variant={STATUS_VARIANT[ev.status]}>{STATUS_LABEL[ev.status]}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
