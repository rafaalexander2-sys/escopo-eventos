import { useEffect, useState } from 'react'
import { Download, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Registration } from '@/types'

interface RegWithEvent extends Registration { event_title: string }

const STATUS_VARIANT: Record<Registration['status'], 'default' | 'success' | 'warning' | 'danger' | 'info' | 'lime'> = {
  pending: 'warning', confirmed: 'success', cancelled: 'danger', checked_in: 'info',
}
const STATUS_LABEL: Record<Registration['status'], string> = {
  pending: 'Pendente', confirmed: 'Confirmado', cancelled: 'Cancelado', checked_in: 'Check-in ✓',
}

export default function Participants() {
  const [rows, setRows] = useState<RegWithEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      const { data: org } = await supabase.from('organizations').select('id').single()
      if (!org) { setLoading(false); return }
      const { data: events } = await supabase.from('events').select('id, title').eq('organization_id', org.id)
      if (!events?.length) { setLoading(false); return }
      const { data: regs } = await supabase.from('registrations').select('*').in('event_id', events.map(e => e.id)).order('created_at', { ascending: false })
      const map = Object.fromEntries(events.map(e => [e.id, e.title]))
      setRows((regs ?? []).map(r => ({ ...r, event_title: map[r.event_id] ?? '' })))
      setLoading(false)
    }
    load()
  }, [])

  function exportCSV() {
    const header = 'Nome,E-mail,CPF,Telefone,Evento,Status,Inscrito em'
    const lines = filtered.map(r => [r.athlete_name, r.athlete_email, r.athlete_cpf, r.athlete_phone ?? '', r.event_title, r.status, new Date(r.created_at).toLocaleDateString('pt-BR')].join(','))
    const blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'participantes.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = rows.filter(r => !search || [r.athlete_name, r.athlete_email, r.athlete_cpf, r.event_title].some(v => v.toLowerCase().includes(search.toLowerCase())))

  return (
    <div className="px-6 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Gestão</p>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>PARTICIPANTES</h1>
        </div>
        <Button variant="outline" size="sm" onClick={exportCSV} disabled={filtered.length === 0}>
          <Download size={13} />Exportar CSV
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
        <input
          placeholder="Buscar por nome, e-mail, CPF ou evento..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#141414] border border-white/8 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#ccff00]/60 focus:ring-2 focus:ring-[#ccff00]/12 transition-all"
        />
      </div>

      <div className="bg-[#141414] border border-white/6 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-white/25">Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-white/25">Nenhum participante encontrado.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/6">
                {['Nome', 'E-mail', 'Evento', 'Status', 'Inscrito em'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-white/25">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3 font-semibold text-white">{r.athlete_name}</td>
                  <td className="px-5 py-3 text-white/40">{r.athlete_email}</td>
                  <td className="px-5 py-3 text-white/40">{r.event_title}</td>
                  <td className="px-5 py-3"><Badge variant={STATUS_VARIANT[r.status]}>{STATUS_LABEL[r.status]}</Badge></td>
                  <td className="px-5 py-3 text-white/25 font-mono text-xs">{new Date(r.created_at).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
