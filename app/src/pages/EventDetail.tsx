import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Pencil, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Event, Registration } from '@/types'

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

const REG_STATUS_LABEL: Record<Registration['status'], string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
  checked_in: 'Check-in ✓',
}

const REG_STATUS_VARIANT: Record<Registration['status'], 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'danger',
  checked_in: 'info',
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
    const nextStatus = event.status === 'published' ? 'draft' : 'published'
    const { data } = await supabase
      .from('events')
      .update({ status: nextStatus })
      .eq('id', event.id)
      .select()
      .single()
    if (data) setEvent(data)
    setPublishing(false)
  }

  async function handleCheckin(regId: string) {
    const { data } = await supabase
      .from('registrations')
      .update({ status: 'checked_in', checked_in_at: new Date().toISOString() })
      .eq('id', regId)
      .select()
      .single()
    if (data) setRegistrations(r => r.map(x => x.id === regId ? data : x))
  }

  if (loading) return <div className="px-8 py-8 text-sm text-gray-400">Carregando...</div>
  if (!event) return <div className="px-8 py-8 text-sm text-gray-400">Evento não encontrado.</div>

  const confirmed = registrations.filter(r => r.status === 'confirmed' || r.status === 'checked_in').length
  const occupancy = event.capacity > 0 ? Math.round((confirmed / event.capacity) * 100) : null

  return (
    <div className="px-8 py-8 max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/events')} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 mb-4">
          <ArrowLeft size={13} /> Voltar
        </button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold">{event.title}</h1>
              <Badge variant={STATUS_VARIANT[event.status]}>{STATUS_LABEL[event.status]}</Badge>
            </div>
            <p className="text-sm text-gray-400">
              {new Date(event.date).toLocaleDateString('pt-BR')} — {event.location}, {event.city}/{event.state}
            </p>
          </div>

          <div className="flex gap-2">
            {event.status === 'published' && (
              <Button variant="outline" size="sm" asChild>
                <a href={`/e/${event.slug}`} target="_blank" rel="noreferrer">
                  <ExternalLink size={13} /> Ver página
                </a>
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link to={`/events/${event.id}/edit`}>
                <Pencil size={13} /> Editar
              </Link>
            </Button>
            <Button
              size="sm"
              variant={event.status === 'published' ? 'outline' : 'default'}
              onClick={handlePublish}
              disabled={publishing}
            >
              {event.status === 'published' ? 'Despublicar' : 'Publicar'}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats rápidos */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Inscrições', value: registrations.length },
          { label: 'Confirmados', value: confirmed },
          { label: 'Ocupação', value: occupancy != null ? `${occupancy}%` : '—' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Lista de inscrições */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Users size={14} className="text-gray-400" />
          <h2 className="text-sm font-semibold">Inscrições</h2>
        </div>

        {registrations.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-gray-400">
            Nenhuma inscrição ainda.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400">
                <th className="px-5 py-3 text-left font-medium">Atleta</th>
                <th className="px-5 py-3 text-left font-medium">E-mail</th>
                <th className="px-5 py-3 text-left font-medium">CPF</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-left font-medium">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{reg.athlete_name}</td>
                  <td className="px-5 py-3 text-gray-500">{reg.athlete_email}</td>
                  <td className="px-5 py-3 text-gray-500 font-mono text-xs">{reg.athlete_cpf}</td>
                  <td className="px-5 py-3">
                    <Badge variant={REG_STATUS_VARIANT[reg.status]}>{REG_STATUS_LABEL[reg.status]}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    {reg.status === 'confirmed' && (
                      <button
                        onClick={() => handleCheckin(reg.id)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Check-in
                      </button>
                    )}
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
