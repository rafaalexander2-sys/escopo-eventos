import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, CheckCircle2, ChevronDown, Clock, Mail, MapPin, Users, Zap } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Event, EventBatch } from '@/types'

function maskCPF(v: string) {
  return v.replace(/\D/g, '').slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}
function maskPhone(v: string) {
  return v.replace(/\D/g, '').slice(0, 11).replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')
}

const inputCls = 'w-full h-10 px-3 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#ccff00]/60 focus:ring-2 focus:ring-[#ccff00]/12 transition-all'

export default function EventPublic() {
  const { slug } = useParams<{ slug: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [batches, setBatches] = useState<EventBatch[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ athlete_name: '', athlete_email: '', athlete_cpf: '', athlete_phone: '', athlete_dob: '', batch_id: '' })

  useEffect(() => {
    async function load() {
      const { data: ev } = await supabase.from('events').select('*').eq('slug', slug).eq('status', 'published').single()
      if (!ev) { setLoading(false); return }
      setEvent(ev)
      const { data: bts } = await supabase.from('event_batches').select('*').eq('event_id', ev.id).order('price', { ascending: true })
      const now = new Date()
      const available = (bts ?? []).filter(b => {
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

  function set(key: string, value: string) { setForm(f => ({ ...f, [key]: value })) }

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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-sm text-white/25">Carregando...</div>
  )

  if (!event) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-sm text-white/25">Evento não encontrado ou encerrado.</div>
  )

  if (success) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-sm w-full text-center space-y-4 bg-[#141414] border border-white/6 rounded-2xl p-10">
        <div className="relative inline-flex mb-2">
          <div className="w-20 h-20 rounded-full bg-[#4ade80]/10 flex items-center justify-center">
            <CheckCircle2 size={36} className="text-[#4ade80]" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#039eff] flex items-center justify-center">
            <Zap size={14} className="text-black" />
          </div>
        </div>
        <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          INSCRIÇÃO<br />CONFIRMADA!
        </h2>
        <p className="text-sm text-white/40">Você está inscrito em <strong className="text-white">{event.title}</strong>.</p>
        <div className="bg-[#ccff00]/8 border border-[#ccff00]/15 rounded-xl p-4 flex items-start gap-3 text-left">
          <Mail size={15} className="text-[#ccff00] shrink-0 mt-0.5" />
          <p className="text-xs text-white/50">Verifique seu e-mail para o QR code de confirmação.</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/10 via-[#0a0a0a]/80 to-[#0a0a0a]" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="success">Inscrições abertas</Badge>
              {event.capacity > 0 && <Badge variant="warning">{event.capacity} vagas</Badge>}
            </div>
            <h1
              className="text-5xl md:text-7xl font-black text-white leading-none uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '-0.02em' }}
            >
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <span className="text-sm text-white/60 flex items-center gap-1.5">
                <Calendar size={13} className="text-[#ccff00]" />
                {new Date(event.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              {event.time && <span className="text-sm text-white/60 flex items-center gap-1.5"><Clock size={13} className="text-[#ccff00]" />{event.time.slice(0, 5)}h</span>}
              <span className="text-sm text-white/60 flex items-center gap-1.5"><MapPin size={13} className="text-[#ccff00]" />{event.location} — {event.city}/{event.state}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        <div className="grid md:grid-cols-[1fr_340px] gap-8">
          {/* Left — info */}
          <div>
            {event.description && (
              <div className="mb-8">
                <h2 className="text-xl font-black text-white mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>SOBRE O EVENTO</h2>
                <p className="text-sm text-white/50 leading-relaxed">{event.description}</p>
              </div>
            )}

            {/* Lotes info */}
            {batches.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-white mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>LOTES</h2>
                <div className="space-y-2">
                  {batches.map(b => (
                    <div key={b.id} className="flex items-center justify-between bg-[#141414] border border-white/6 rounded-xl px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{b.name}</p>
                        {b.ends_at && <p className="text-xs text-white/30 mt-0.5">até {new Date(b.ends_at).toLocaleDateString('pt-BR')}</p>}
                      </div>
                      <span className="text-lg font-black text-[#ccff00]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {b.price === 0 ? 'Grátis' : `R$ ${b.price.toFixed(2).replace('.', ',')}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — form */}
          <div>
            <div className="bg-[#141414] border border-white/6 rounded-2xl p-5 sticky top-4">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Users size={14} className="text-[#ccff00]" />Fazer inscrição
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3">
                {batches.length > 1 && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/60">Categoria / Lote <span className="text-[#ff3b3b]">*</span></label>
                    <div className="relative">
                      <select
                        className={`${inputCls} appearance-none pr-8`}
                        value={form.batch_id}
                        onChange={e => set('batch_id', e.target.value)}
                      >
                        {batches.map(b => (
                          <option key={b.id} value={b.id}>
                            {b.name} — {b.price === 0 ? 'Grátis' : `R$ ${b.price.toFixed(2).replace('.', ',')}`}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                    </div>
                  </div>
                )}

                {[
                  { key: 'athlete_name', label: 'Nome completo', placeholder: 'Ana Paula Ferreira', required: true },
                  { key: 'athlete_email', label: 'E-mail', placeholder: 'ana@gmail.com', type: 'email', required: true },
                ].map(f => (
                  <div key={f.key} className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/60">{f.label}{f.required && <span className="text-[#ff3b3b] ml-0.5">*</span>}</label>
                    <input className={inputCls} type={f.type ?? 'text'} placeholder={f.placeholder} required={f.required}
                      value={form[f.key as keyof typeof form]} onChange={e => set(f.key, e.target.value)} />
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/60">CPF <span className="text-[#ff3b3b]">*</span></label>
                    <input className={inputCls} placeholder="000.000.000-00" required
                      value={form.athlete_cpf} onChange={e => set('athlete_cpf', maskCPF(e.target.value))} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/60">Telefone</label>
                    <input className={inputCls} placeholder="(11) 99999-9999"
                      value={form.athlete_phone} onChange={e => set('athlete_phone', maskPhone(e.target.value))} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/60">Data de nascimento</label>
                  <input className={inputCls} type="date" value={form.athlete_dob} onChange={e => set('athlete_dob', e.target.value)} />
                </div>

                {error && <p className="text-xs text-[#ff6b6b] bg-[#ff3b3b]/8 border border-[#ff3b3b]/20 rounded-lg px-3 py-2">{error}</p>}

                <Button type="submit" variant="accent" size="lg" className="w-full mt-1" disabled={submitting}>
                  <Zap size={15} />
                  {submitting ? 'Inscrevendo...' : 'Confirmar inscrição'}
                </Button>

                <p className="text-[10px] text-center text-white/20 leading-relaxed">
                  Seus dados são protegidos e usados apenas para este evento.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6 py-4 text-center">
        <p className="text-[11px] text-white/20">Inscrições gerenciadas por <span className="text-[#ccff00] font-semibold">Ticket Moove</span></p>
      </div>
    </div>
  )
}
