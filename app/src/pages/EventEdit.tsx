import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import type { Event } from '@/types'

const STATES = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']

const inputCls = 'w-full h-10 px-3 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#ccff00]/60 focus:ring-2 focus:ring-[#ccff00]/12 transition-all'

export default function EventEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', location: '', city: '', state: 'SP', capacity: '' })

  useEffect(() => {
    supabase.from('events').select('*').eq('id', id).single().then(({ data }) => {
      if (data) {
        const ev = data as Event
        setForm({ title: ev.title, description: ev.description ?? '', date: ev.date, time: ev.time ?? '', location: ev.location, city: ev.city, state: ev.state, capacity: ev.capacity.toString() })
      }
      setLoading(false)
    })
  }, [id])

  function set(key: string, value: string) { setForm(f => ({ ...f, [key]: value })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const { error: err } = await supabase.from('events').update({
      title: form.title, description: form.description || null, date: form.date,
      time: form.time || null, location: form.location, city: form.city,
      state: form.state, capacity: parseInt(form.capacity) || 0,
    }).eq('id', id)
    if (err) { setError(err.message); setSaving(false); return }
    navigate(`/events/${id}`)
  }

  if (loading) return <div className="px-6 py-8 text-sm text-white/25">Carregando...</div>

  return (
    <div className="px-6 py-8 max-w-2xl">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Editar</p>
        <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>EDITAR EVENTO</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/6 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/75">Nome do evento <span className="text-[#ff3b3b]">*</span></label>
          <input className={inputCls} value={form.title} onChange={e => set('title', e.target.value)} required />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/75">Descrição</label>
          <textarea className={`${inputCls} h-auto py-2.5 resize-none`} rows={3} value={form.description} onChange={e => set('description', e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/75">Data <span className="text-[#ff3b3b]">*</span></label>
            <input className={inputCls} type="date" value={form.date} onChange={e => set('date', e.target.value)} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/75">Horário</label>
            <input className={inputCls} type="time" value={form.time} onChange={e => set('time', e.target.value)} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/75">Local <span className="text-[#ff3b3b]">*</span></label>
          <input className={inputCls} value={form.location} onChange={e => set('location', e.target.value)} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/75">Cidade <span className="text-[#ff3b3b]">*</span></label>
            <input className={inputCls} value={form.city} onChange={e => set('city', e.target.value)} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/75">Estado <span className="text-[#ff3b3b]">*</span></label>
            <div className="relative">
              <select className={`${inputCls} appearance-none pr-8`} value={form.state} onChange={e => set('state', e.target.value)}>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/75">Capacidade (vagas)</label>
          <input className={inputCls} type="number" min="0" value={form.capacity} onChange={e => set('capacity', e.target.value)} />
        </div>

        {error && <p className="text-xs text-[#ff6b6b] bg-[#ff3b3b]/8 border border-[#ff3b3b]/20 rounded-lg px-3 py-2">{error}</p>}

        <div className="flex gap-3 pt-1">
          <Button type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</Button>
          <Button type="button" variant="ghost" onClick={() => navigate(`/events/${id}`)}>Cancelar</Button>
        </div>
      </form>
    </div>
  )
}
