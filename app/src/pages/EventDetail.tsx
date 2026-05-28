import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Pencil, Users, Zap } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Event, Registration } from '@/types'

const STATUS_LABEL: Record<Event['status'], string> = { draft: 'Rascunho', published: 'Publicado', closed: 'Encerrado', cancelled: 'Cancelado' }
const STATUS_VARIANT: Record<Event['status'], 'default' | 'success' | 'warning' | 'danger' | 'info' | 'lime'> = {
  draft: 'default', published: 'success', closed: 'lime', cancelled: 'danger',
}
const REG_LABEL: Record<Registration['status'], string> = { pending: 'Pendente', confirmed: 'Confirmado', cancelled: 'Cancelado', checked_in: 'Check-in ✓' }
const REG_VARIANT: Record<Registration['status'], 'default' | 'success' | 'warning' | 'danger' | 'info' | 'lime'> = {
  pending: 'warning', confirmed: 'success', cancelled: 'danger', checked_in: 'info',
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [event, setEvent] = useState<Event | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)

  useEffect(() => {
    async function load() {
      const [{ data: ev }, { data: regs }] = await Promise.all([
        supabase.from('events').select('*').eq('id', id).single(),
        supabase.from('registrations').select('*').eq('event_id', id).order('created_at', { ascending: false }),
      ])
      setEvent(ev)
      setRegistrations(regs ?? [])
      setLoading(false)
    }
    load()
  }, [id])

  async function handlePublish() {
    if (!event) return
    setPublishing(true)
    const { data } = await supabase.from('events').update({ status: event.status === 'published' ? 'draft' : 'published' }).eq('id', event.id).select().single()
    if (data) setEvent(data)
    setPublishing(false)
  }

  async function handleCheckin(regId: string) {
    const { data } = await supabase.from('registrations').update({ status: 'checked_in', checked_in_at: new Date().toISOString() }).eq('id', regId).select().single()
    if (data) setRegistrations(r => r.map(x => x.id === regId ? data : x))
  }

  if (loading) return <div className="px-6 py-8 text-sm text-white/25">Carregando...</div>
  if (!event)  return <div className="px-6 py-8 text-sm text-white/25">Evento não encontrado.</div>

  const confirmed = registrations.filter(r => r.status === 'confirmed' || r.status === 'checked_in').length
  const occupancy = event.capacity > 0 ? Math.round((confirmed / event.capacity) * 100) : null
  const pct = occupancy ?? 0
  const barColor = pct >= 100 ? '#ff3b3b' : pct > 80 ? '#f59e0b' : '#ccff00'

  return (
    <div className="px-6 py-8 max-w-4xl space-y-6">
      {/* Back */}
      <button onClick={() => navigate('/events')} className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors">
        <ArrowLeft size={13} />Voltar para eventos
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{event.title}</h1>
            <Badge variant={STATUS_VARIANT[event.status]}>{STATUS_LABEL[event.status]}</Badge>
          </div>
          <p className="text-sm text-white/35">{new Date(event.date).toLocaleDateString('pt-BR')} — {event.location}, {event.city}/{event.state}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {event.status === 'published' && (
            <Button variant="outline" size="sm" asChild>
              <a href={`/e/${event.slug}`} target="_blank" rel="noreferrer"><ExternalLink size={13} />Ver página</a>
            </Button>
          )}
          <Button variant="secondary" size="sm" asChild>
            <Link to={`/events/${event.id}/edit`}><Pencil size={13} />Editar</Link>
          </Button>
          <Button size="sm" variant={event.status === 'published' ? 'outline' : 'default'} onClick={handlePublish} disabled={publishing}>
            {event.status === 'published' ? 'Despublicar' : 'Publicar'}
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'INSCRIÇÕES', value: registrations.length, color: 'bg-[#039eff]/10', tc: 'text-[#039eff]' },
          { label: 'CONFIRMADOS', value: confirmed, color: 'bg-[#ccff00]/10', tc: 'text-[#ccff00]' },
          { label: 'OCUPAÇÃO', value: occupancy != null ? `${occupancy}%` : '—', color: 'bg-white/5', tc: 'text-white/50' },
        ].map(({ label, value, color, tc }) => (
          <div key={label} className="bg-[#141414] border border-white/6 rounded-2xl p-5">
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${tc}`}>{label}</p>
            <p className="text-3xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {event.capacity > 0 && (
        <div className="bg-[#141414] border border-white/6 rounded-2xl p-5">
          <div className="flex justify-between mb-2 text-xs">
            <span className="text-white/40">Vagas preenchidas</span>
            <span className="font-mono" style={{ color: barColor }}>{pct}%</span>
          </div>
          <div className="h-2 bg-white/6 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: barColor }} />
          </div>
          <p className="text-xs text-white/25 mt-2">{confirmed} de {event.capacity} vagas</p>
        </div>
      )}

      {/* Registrations */}
      <div className="bg-[#141414] border border-white/6 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/6 flex items-center gap-2">
          <Users size={13} className="text-[#ccff00]" />
          <h2 className="text-sm font-semibold text-white">Inscrições</h2>
          <span className="text-xs text-white/25 ml-auto">{registrations.length} total</span>
        </div>

        {registrations.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-white/25">
            {event.status === 'published' ? 'Nenhuma inscrição ainda.' : 'Publique o evento para receber inscrições.'}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/6">
                {['Atleta', 'E-mail', 'CPF', 'Status', 'Ação'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-white/25">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {registrations.map(reg => (
                <tr key={reg.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3 font-semibold text-white">{reg.athlete_name}</td>
                  <td className="px-5 py-3 text-white/40">{reg.athlete_email}</td>
                  <td className="px-5 py-3 text-white/40 font-mono text-xs">{reg.athlete_cpf}</td>
                  <td className="px-5 py-3"><Badge variant={REG_VARIANT[reg.status]}>{REG_LABEL[reg.status]}</Badge></td>
                  <td className="px-5 py-3">
                    {reg.status === 'confirmed' && (
                      <button onClick={() => handleCheckin(reg.id)} className="text-xs text-[#ccff00] hover:text-white transition-colors">
                        Check-in
                      </button>
                    )}
                    {reg.status === 'checked_in' && <Zap size={13} className="text-[#ccff00]" />}
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
