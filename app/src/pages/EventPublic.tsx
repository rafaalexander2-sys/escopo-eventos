import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Calendar, Clock, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Event, EventBatch } from '@/types'

function maskCPF(v: string) {
  return v.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function maskPhone(v: string) {
  return v.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

export default function EventPublic() {
  const { slug } = useParams<{ slug: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [batches, setBatches] = useState<EventBatch[]>([])
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    athlete_name: '',
    athlete_email: '',
    athlete_cpf: '',
    athlete_phone: '',
    athlete_dob: '',
    batch_id: '',
  })

  useEffect(() => {
    async function load() {
      const { data: ev } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (!ev) { setLoading(false); return }
      setEvent(ev)

      const { data: bts } = await supabase
        .from('event_batches')
        .select('*')
        .eq('event_id', ev.id)
        .order('price', { ascending: true })

      const available = (bts ?? []).filter(b => {
        const now = new Date()
        if (b.starts_at && new Date(b.starts_at) > now) return false
        if (b.ends_at && new Date(b.ends_at) < now) return false
        return true
      })

      setBatches(available)
      if (available.length > 0) setForm(f => ({ ...f, batch_id: available[0].id }))
      setLoading(false)
    }
    load()
  }, [slug])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(f => ({
      ...f,
      [name]: name === 'athlete_cpf' ? maskCPF(value) : name === 'athlete_phone' ? maskPhone(value) : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!event) return
    setSubmitting(true)
    setError('')

    const { error: err } = await supabase.from('registrations').insert({
      event_id: event.id,
      batch_id: form.batch_id || null,
      status: 'confirmed',
      athlete_name: form.athlete_name,
      athlete_email: form.athlete_email,
      athlete_cpf: form.athlete_cpf.replace(/\D/g, ''),
      athlete_phone: form.athlete_phone || null,
      athlete_dob: form.athlete_dob || null,
    })

    if (err) { setError('Erro ao realizar inscrição. Tente novamente.'); setSubmitting(false); return }
    setSuccess(true)
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-sm text-gray-400">
      Carregando...
    </div>
  )

  if (!event) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-sm text-gray-400">
      Evento não encontrado ou encerrado.
    </div>
  )

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-sm text-center space-y-3 bg-white rounded-2xl border border-gray-100 p-10">
        <div className="text-4xl">🎉</div>
        <h2 className="text-lg font-bold">Inscrição confirmada!</h2>
        <p className="text-sm text-gray-500">
          Você está inscrito em <strong>{event.title}</strong>.<br />
          Verifique seu e-mail para o QR code de confirmação.
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner / hero */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-3">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(event.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            {event.time && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {event.time.slice(0, 5)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> {event.location} — {event.city}/{event.state}
            </span>
            {event.capacity > 0 && (
              <span className="flex items-center gap-1.5">
                <Users size={14} /> {event.capacity} vagas
              </span>
            )}
          </div>
          {event.description && (
            <p className="mt-4 text-gray-300 text-sm leading-relaxed">{event.description}</p>
          )}
        </div>
      </div>

      {/* Formulário */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="text-lg font-bold mb-6">Fazer inscrição</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Lote */}
            {batches.length > 1 && (
              <div className="space-y-1.5">
                <Label htmlFor="batch_id">Categoria / Lote</Label>
                <select
                  id="batch_id" name="batch_id" value={form.batch_id} onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {batches.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} — {b.price === 0 ? 'Gratuito' : `R$ ${b.price.toFixed(2).replace('.', ',')}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {batches.length === 1 && (
              <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm">
                <span className="text-gray-500">Valor: </span>
                <span className="font-semibold">
                  {batches[0].price === 0 ? 'Gratuito' : `R$ ${batches[0].price.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="athlete_name">Nome completo *</Label>
              <Input id="athlete_name" name="athlete_name" value={form.athlete_name} onChange={handleChange} placeholder="Seu nome" required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="athlete_email">E-mail *</Label>
              <Input id="athlete_email" name="athlete_email" type="email" value={form.athlete_email} onChange={handleChange} placeholder="seu@email.com" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="athlete_cpf">CPF *</Label>
                <Input id="athlete_cpf" name="athlete_cpf" value={form.athlete_cpf} onChange={handleChange} placeholder="000.000.000-00" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="athlete_phone">Telefone</Label>
                <Input id="athlete_phone" name="athlete_phone" value={form.athlete_phone} onChange={handleChange} placeholder="(11) 99999-9999" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="athlete_dob">Data de nascimento</Label>
              <Input id="athlete_dob" name="athlete_dob" type="date" value={form.athlete_dob} onChange={handleChange} />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              {submitting ? 'Inscrevendo...' : 'Confirmar inscrição'}
            </Button>

            <p className="text-xs text-center text-gray-400">
              Seus dados são protegidos e usados apenas para este evento.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
