import { mockStats, mockRegistrations, type RegistrationStatus } from '../../../lib/mock'

function currency(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function shortDate(s: string) {
  return new Date(s).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

const statusBadge: Record<RegistrationStatus, { label: string; cls: string }> = {
  confirmed: { label: 'Confirmado', cls: 'badge-green' },
  pending:   { label: 'Pendente',   cls: 'badge-warn'  },
  cancelled: { label: 'Cancelado',  cls: 'badge-gray'  },
}

const stats = [
  { label: 'Inscrições totais', value: mockStats.totalRegistrations.toLocaleString('pt-BR'), sub: '+12 hoje' },
  { label: 'Receita bruta',     value: currency(mockStats.totalRevenue),                     sub: 'todos os eventos' },
  { label: 'Eventos ativos',    value: String(mockStats.activeEvents),                        sub: '2 encerram este mês' },
  { label: 'Conversão',         value: `${mockStats.conversionRate}%`,                        sub: 'visitas → inscrição' },
]

export default function Dashboard() {
  return (
    <>
      <div className="admin-header">
        <div className="admin-header-title">Dashboard</div>
      </div>

      <div className="admin-content">
        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Inscrições recentes</span>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Participante</th>
                <th>Evento</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {mockRegistrations.map(r => {
                const s = statusBadge[r.status]
                return (
                  <tr key={r.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{r.attendee_name}</div>
                      <div className="text-secondary text-small">{r.attendee_email}</div>
                    </td>
                    <td className="text-secondary">{r.event_title}</td>
                    <td><span className={`badge ${s.cls}`}>{s.label}</span></td>
                    <td>
                      {r.amount > 0
                        ? currency(r.amount)
                        : <span className="text-secondary">Gratuito</span>}
                    </td>
                    <td className="text-secondary">{shortDate(r.created_at)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
