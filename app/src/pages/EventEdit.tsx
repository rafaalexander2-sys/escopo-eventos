import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Event } from '@/types'

const STATES = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']

export default function EventEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: '', description: '', date: '', time: '',
    location: '', city: '', state: 'SP', capacity: '',
  })

  useEffect(() => {
    supabase.from('events').select('*').eq('id', id).single().then(({ data }) => {
      if (data) {
        const ev = data as Event
        setForm({
          title: ev.title,
          description: ev.description ?? '',
          date: ev.date,
          time: ev.time ?? '',
          location: ev.location,
          city: ev.city,
          state: ev.state,
          capacity: ev.capacity.toString(),
        })
      }
      setLoading(false)
    })
  }, [id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const { error: err } = await supabase.from('events').update({
      title: form.title,
      description: form.description || null,
      date: form.date,
      time: form.time || null,
      location: form.location,
      city: form.city,
      state: form.state,
      capacity: parseInt(form.capacity) || 0,
    }).eq('id', id)

    if (err) { setError(err.message); setSaving(false); return }
    navigate(`/events/${id}`)
  }

  if (loading) return <div className="px-8 py-8 text-sm text-gray-400">Carregando...</div>

  return (
    <div className="px-8 py-8 max-w-2xl">
      <h1 className="text-xl font-bold mb-6">Editar evento</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="title">Nome do evento *</Label>
          <Input id="title" name="title" value={form.title} onChange={handleChange} required />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Descrição</Label>
          <textarea
            id="description" name="description" value={form.description} onChange={handleChange}
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="date">Data *</Label>
            <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="time">Horário</Label>
            <Input id="time" name="time" type="time" value={form.time} onChange={handleChange} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="location">Local *</Label>
          <Input id="location" name="location" value={form.location} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="city">Cidade *</Label>
            <Input id="city" name="city" value={form.city} onChange={handleChange} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="state">Estado *</Label>
            <select
              id="state" name="state" value={form.state} onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="capacity">Capacidade (vagas)</Label>
          <Input id="capacity" name="capacity" type="number" min="0" value={form.capacity} onChange={handleChange} />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-3 pt-1">
          <Button type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</Button>
          <Button type="button" variant="ghost" onClick={() => navigate(`/events/${id}`)}>Cancelar</Button>
        </div>
      </form>
    </div>
  )
}
