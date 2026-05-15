import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockEvents, type EventStatus } from '../../../lib/mock'

function currency(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fullDate(s: string) {
  return new Date(s).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

const statusBadge: Record<EventStatus, { label: string; cls: string }> = {
  published: { label: 'Publicado',  cls: 'badge-green' },
  draft:     { label: 'Rascunho',   cls: 'badge-gray'  },
  cancelled: { label: 'Cancelado',  cls: 'badge-warn'  },
  finished:  { label: 'Encerrado',  cls: 'badge-blue'  },
}

export default function Events() {
  const [search, setSearch] = useState('')

  const list = mockEvents.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="admin-header">
        <div className="admin-header-title">Eventos</div>
        <Link to="/events/new" className="btn btn-primary">
          + Novo evento
        </Link>
      </div>

      <div className="admin-content">
        <div className="admin-card">
          <div className="admin-card-header">
            <input
              className="form-input"
              style={{ width: 280, fontSize: 14, padding: '7px 12px' }}
              placeholder="Buscar evento…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Evento</th>
                <th>Data</th>
                <th>Inscrições</th>
                <th>Receita</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map(ev => {
                const s = statusBadge[ev.status]
                return (
                  <tr key={ev.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{ev.title}</div>
                      <div className="text-secondary text-small">{ev.location}</div>
                    </td>
                    <td className="text-secondary" style={{ whiteSpace: 'nowrap' }}>
                      {fullDate(ev.start_at)}
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{ev.registrations}</span>
                      {ev.capacity && (
                        <span className="text-secondary"> / {ev.capacity}</span>
                      )}
                    </td>
                    <td>
                      {ev.revenue > 0
                        ? currency(ev.revenue)
                        : <span className="text-secondary">Gratuito</span>}
                    </td>
                    <td><span className={`badge ${s.cls}`}>{s.label}</span></td>
                    <td>
                      <Link to={`/events/${ev.id}`} className="btn btn-secondary btn-sm">
                        Abrir
                      </Link>
                    </td>
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
