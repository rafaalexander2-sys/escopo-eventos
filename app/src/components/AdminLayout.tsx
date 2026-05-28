import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { CalendarDays, ChevronLeft, ChevronRight, DollarSign, LayoutDashboard, LogOut, Menu, Users, Zap } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard',   icon: LayoutDashboard, label: 'Dashboard'      },
  { to: '/events',      icon: CalendarDays,    label: 'Eventos'        },
  { to: '/participants',icon: Users,           label: 'Participantes'  },
  { to: '/financeiro',  icon: DollarSign,      label: 'Financeiro'     },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  function Sidebar({ mobile = false }: { mobile?: boolean }) {
    return (
      <div className={cn(
        'bg-[#111] border-r border-white/6 flex flex-col h-full transition-all duration-200 shrink-0',
        mobile ? 'w-64' : collapsed ? 'w-14' : 'w-56',
      )}>
        {/* Logo */}
        <div className={cn('px-3 py-4 border-b border-white/6 flex items-center', collapsed && !mobile ? 'justify-center' : 'justify-between')}>
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-lg bg-[#ccff00] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(204,255,0,0.4)]">
              <Zap size={13} className="text-black" />
            </div>
            {(!collapsed || mobile) && (
              <span className="text-sm font-bold text-white whitespace-nowrap">
                Ticket<span className="text-[#ccff00]">Moove</span>
              </span>
            )}
          </div>
          {!mobile && (
            <button onClick={() => setCollapsed(!collapsed)} className="text-white/20 hover:text-white/60 transition-colors p-1">
              {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full',
                isActive
                  ? 'bg-[#ccff00]/12 text-[#ccff00]'
                  : 'text-white/35 hover:text-white/75 hover:bg-white/4',
              )}
            >
              {({ isActive }) => (
                <>
                  <Icon size={16} className="shrink-0" />
                  {(!collapsed || mobile) && <span className="truncate">{label}</span>}
                  {isActive && (!collapsed || mobile) && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-2 pb-3 border-t border-white/6 pt-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium w-full text-white/25 hover:text-[#ff6b6b] hover:bg-[#ff3b3b]/5 transition-all"
          >
            <LogOut size={15} className="shrink-0" />
            {(!collapsed || mobile) && <span>Sair</span>}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 h-full"><Sidebar mobile /></div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Topbar */}
        <div className="h-14 border-b border-white/6 flex items-center justify-between px-4 md:px-6 shrink-0 bg-[#0a0a0a]">
          <button className="md:hidden text-white/40 hover:text-white" onClick={() => setMobileOpen(true)}>
            <Menu size={18} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ccff00] to-[#00e5ff] flex items-center justify-center text-[11px] font-bold text-black">
              RA
            </div>
            <span className="text-xs font-medium text-white/50 hidden md:block">Rafael Alexander</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
