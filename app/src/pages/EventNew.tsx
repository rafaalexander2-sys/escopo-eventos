import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

const STATES = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']

function slugify(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/75">
        {label}{required && <span className="text-[#ff3b3b] ml-0.5">*</span>}
      </label>
      {children}
      {hint && <span className="text-xs text-white/25">{hint}</span>}
    </div>
  )
}

const inputCls = 'w-full h-10 px-3 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#ccff00]/60 focus:ring-2 focus:ring-[#ccff00]/12 transition-all'

export default function EventNew() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', location: '', city: '', state: 'SP', capacity: '' })

  function set(key: string, value: string) { setForm(f => ({ ...f, [key]: value })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data: org } = await supabase.from('organizations').select('id').single()
    if (!org) { setError('Organização não encontrada.'); setLoading(false); return }

    const { data, error: err } = await supabase.from('events').insert({
      organization_id: org.id,
      title: form.title,
      slug: slugify(form.title),
      description: form.description || null,
      date: form.date,
      time: form.time || null,
      location: form.location,
      city: form.city,
      state: form.state,
      capacity: parseInt(form.capacity) || 0,
      status: 'draft',
    }).select().single()

    if (err) { setError(err.message); setLoading(false); return }
    navigate(`/events/${data.id}`)
  }

  return (
    <div className="px-6 py-8 max-w-2xl">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Novo evento</p>
        <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>CRIAR EVENTO</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/6 rounded-2xl p-6 space-y-5">
        <Field label="Nome do evento" required>
          <input className={inputCls} placeholder="Ex: Corrida das Pedras 2026" value={form.title} onChange={e => set('title', e.target.value)} required />
        </Field>

        <Field label="Descrição">
          <textarea
            className={`${inputCls} h-auto py-2.5 resize-none`}
            rows={3}
            placeholder="Descreva o evento para os atletas..."
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Data" required>
            <input className={inputCls} type="date" value={form.date} onChange={e => set('date', e.target.value)} required />
          </Field>
          <Field label="Horário">
            <input className={inputCls} type="time" value={form.time} onChange={e => set('time', e.target.value)} />
          </Field>
        </div>

        <Field label="Local" required>
          <input className={inputCls} placeholder="Ex: Parque Ibirapuera — Portão 10" value={form.location} onChange={e => set('location', e.target.value)} required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Cidade" required>
            <input className={inputCls} placeholder="São Paulo" value={form.city} onChange={e => set('city', e.target.value)} required />
          </Field>
          <Field label="Estado" required>
            <div className="relative">
              <select
                className={`${inputCls} appearance-none pr-8`}
                value={form.state}
                onChange={e => set('state', e.target.value)}
              >
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            </div>
          </Field>
        </div>

        <Field label="Capacidade (vagas)">
          <input className={inputCls} type="number" min="0" placeholder="500" value={form.capacity} onChange={e => set('capacity', e.target.value)} />
        </Field>

        {error && <p className="text-xs text-[#ff6b6b] bg-[#ff3b3b]/8 border border-[#ff3b3b]/20 rounded-lg px-3 py-2">{error}</p>}

        <div className="flex gap-3 pt-1">
          <Button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Criar evento'}</Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/events')}>Cancelar</Button>
        </div>
      </form>
    </div>
  )
}
