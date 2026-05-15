import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const navItems = [
  { to: '/dashboard',        label: 'Dashboard'      },
  { to: '/events',           label: 'Eventos'        },
  { to: '/registrations',    label: 'Inscrições'     },
  { to: '/financial',        label: 'Financeiro'     },
  { to: '/settings/branding', label: 'White Label'   },
  { to: '/settings',         label: 'Configurações'  },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-name">Plataforma</div>
          <div className="sidebar-logo-sub">Painel do organizador</div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-name">Organização Demo</div>
          <button
            className="sidebar-footer-logout"
            onClick={() => navigate('/login')}
          >
            Sair da conta
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
