import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays, Plus, TrendingUp, Users, Zap } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Event } from '@/types'

const STATUS_LABEL: Record<Event['status'], string> = { draft: 'Rascunho', published: 'Publicado', closed: 'Encerrado', cancelled: 'Cancelado' }
const STATUS_VARIANT: Record<Event['status'], 'default' | 'success' | 'warning' | 'danger' | 'info' | 'lime'> = {
  draft: 'default', published: 'success', closed: 'lime', cancelled: 'danger',
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ events: 0, registrations: 0 })

  useEffect(() => {
    async function load() {
      const { data: org } = await supabase.from('organizations').select('id').single()
      if (!org) { setLoading(false); return }

      const { data: evts } = await supabase
        .from('events').select('*').eq('organization_id', org.id)
        .order('date', { ascending: true }).limit(5)

      const eventIds = evts?.map(e => e.id) ?? []
      const { count: regCount } = eventIds.length > 0
        ? await supabase.from('registrations').select('id', { count: 'exact', head: true }).in('event_id', eventIds)
        : { count: 0 }

      setEvents(evts ?? [])
      setStats({ events: evts?.length ?? 0, registrations: regCount ?? 0 })
      setLoading(false)
    }
    load()
  }, [])

  const metrics = [
    { icon: CalendarDays, label: 'EVENTOS', value: stats.events, color: 'bg-[#ccff00]/10', iconColor: 'text-[#ccff00]' },
    { icon: Users,        label: 'INSCRIÇÕES', value: stats.registrations, color: 'bg-[#039eff]/10', iconColor: 'text-[#039eff]' },
    { icon: TrendingUp,   label: 'CONVERSÃO', value: '—', color: 'bg-[#00e5ff]/10', iconColor: 'text-[#00e5ff]' },
  ]

  return (
    <div className="px-6 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Painel do organizador</p>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            VISÃO GERAL
          </h1>
        </div>
        <Button asChild size="sm">
          <Link to="/events/new"><Plus size={14} />Novo evento</Link>
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {metrics.map(({ icon: Icon, label, value, color, iconColor }) => (
          <div key={label} className="bg-[#141414] border border-white/6 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/35 font-semibold uppercase tracking-widest">{label}</span>
              <div className={`${color} p-2 rounded-xl`}><Icon size={14} className={iconColor} /></div>
            </div>
            <p className="text-3xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Events list */}
      <div className="bg-[#141414] border border-white/6 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={13} className="text-[#ccff00]" />
            <h2 className="text-sm font-semibold text-white">Próximos eventos</h2>
          </div>
          <Link to="/events" className="text-xs text-white/25 hover:text-white transition-colors">Ver todos</Link>
        </div>

        {loading ? (
          <div className="px-5 py-10 text-center text-sm text-white/25">Carregando...</div>
        ) : events.length === 0 ? (
          <div className="px-5 py-10 text-center space-y-3">
            <p className="text-sm text-white/25">Nenhum evento criado ainda.</p>
            <Button asChild size="sm" variant="outline">
              <Link to="/events/new"><Plus size={13} />Criar primeiro evento</Link>
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-white/4">
            {events.map(ev => (
              <li key={ev.id}>
                <Link to={`/events/${ev.id}`} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/3 transition-colors group">
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-[#ccff00] transition-colors">{ev.title}</p>
                    <p className="text-xs text-white/30 mt-0.5">{ev.city}/{ev.state} — {new Date(ev.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={STATUS_VARIANT[ev.status]}>{STATUS_LABEL[ev.status]}</Badge>
                    <ArrowUpRight size={13} className="text-white/15 group-hover:text-white/40 transition-colors" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
