import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Search } from 'lucide-react'
import type { Registration } from '@/types'

interface RegWithEvent extends Registration {
  event_title: string
}

const STATUS_VARIANT: Record<Registration['status'], 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'danger',
  checked_in: 'info',
}

const STATUS_LABEL: Record<Registration['status'], string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
  checked_in: 'Check-in ✓',
}

export default function Participants() {
  const [rows, setRows] = useState<RegWithEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      const { data: org } = await supabase.from('organizations').select('id').single()
      if (!org) { setLoading(false); return }

      const { data: events } = await supabase
        .from('events')
        .select('id, title')
        .eq('organization_id', org.id)

      if (!events || events.length === 0) { setLoading(false); return }

      const eventIds = events.map(e => e.id)
      const { data: regs } = await supabase
        .from('registrations')
        .select('*')
        .in('event_id', eventIds)
        .order('created_at', { ascending: false })

      const titleMap = Object.fromEntries(events.map(e => [e.id, e.title]))
      setRows((regs ?? []).map(r => ({ ...r, event_title: titleMap[r.event_id] ?? '' })))
      setLoading(false)
    }
    load()
  }, [])

  function exportCSV() {
    const header = 'Nome,E-mail,CPF,Telefone,Evento,Status,Inscrito em'
    const lines = filtered.map(r =>
      [r.athlete_name, r.athlete_email, r.athlete_cpf, r.athlete_phone ?? '', r.event_title, r.status, new Date(r.created_at).toLocaleDateString('pt-BR')].join(',')
    )
    const blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'participantes.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = rows.filter(r =>
    !search || [r.athlete_name, r.athlete_email, r.athlete_cpf, r.event_title]
      .some(v => v.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Participantes</h1>
        <Button variant="outline" size="sm" onClick={exportCSV} disabled={filtered.length === 0}>
          <Download size={13} /> Exportar CSV
        </Button>
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Buscar por nome, e-mail, CPF ou evento..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        {loading ? (
          <div className="px-5 py-10 text-center text-sm text-gray-400">Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-400">Nenhum participante encontrado.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400">
                <th className="px-5 py-3 text-left font-medium">Nome</th>
                <th className="px-5 py-3 text-left font-medium">E-mail</th>
                <th className="px-5 py-3 text-left font-medium">Evento</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-left font-medium">Inscrito em</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{r.athlete_name}</td>
                  <td className="px-5 py-3 text-gray-500">{r.athlete_email}</td>
                  <td className="px-5 py-3 text-gray-500">{r.event_title}</td>
                  <td className="px-5 py-3">
                    <Badge variant={STATUS_VARIANT[r.status]}>{STATUS_LABEL[r.status]}</Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">
                    {new Date(r.created_at).toLocaleDateString('pt-BR')}
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
