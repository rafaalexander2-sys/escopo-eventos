import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Zap } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('E-mail ou senha incorretos.'); setLoading(false); return }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left — hero */}
      <div
        className="hidden lg:flex flex-1 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(204,255,0,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,229,255,0.08) 0%, transparent 50%), #090909" }}
      >
        <img
          src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=900&h=900&fit=crop&auto=format"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]" />
        <div className="relative z-10 flex flex-col justify-between p-12 max-w-lg">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ccff00] flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.5)]">
              <Zap size={16} className="text-black" />
            </div>
            <span className="text-base font-bold text-white">Ticket<span className="text-[#ccff00]">Moove</span></span>
          </div>
          <div>
            <h2
              className="text-5xl font-black text-white mb-4 leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              GERENCIE SEUS<br /><span className="text-[#ccff00]">EVENTOS</span><br />COM PRECISÃO
            </h2>
            <p className="text-sm text-white/40 leading-relaxed">
              A plataforma para organizadores de eventos endurance. Inscrições, check-in e financeiro em um único lugar.
            </p>
            <div className="flex items-center gap-6 mt-6">
              {[['Taxa menor', 'que o mercado'], ['Repasse', 'mais rápido'], ['Suporte', 'próximo']].map(([v, l]) => (
                <div key={v}>
                  <p className="text-base font-bold text-[#ccff00]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{v}</p>
                  <p className="text-xs text-white/30">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="w-full lg:w-[440px] bg-[#0a0a0a] flex flex-col items-center justify-center p-8 shrink-0">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-[#ccff00] flex items-center justify-center">
              <Zap size={15} className="text-black" />
            </div>
            <span className="text-sm font-bold text-white">Ticket<span className="text-[#ccff00]">Moove</span></span>
          </div>

          <h1 className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Entrar no painel
          </h1>
          <p className="text-sm text-white/35 mb-8">Acesso exclusivo para organizadores</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/75">E-mail</label>
              <input
                type="email"
                placeholder="rafael@race83.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#ccff00]/60 focus:ring-2 focus:ring-[#ccff00]/12 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/75">Senha</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full h-10 px-3 pr-10 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#ccff00]/60 focus:ring-2 focus:ring-[#ccff00]/12 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-[#ff6b6b] bg-[#ff3b3b]/8 border border-[#ff3b3b]/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <button className="w-full text-center text-xs text-[#ccff00] hover:text-white transition-colors mt-4">
            Esqueci minha senha
          </button>

          <div className="mt-8 pt-8 border-t border-white/6 text-center">
            <p className="text-xs text-white/25">Não tem acesso? Fale com a equipe Ticket Moove.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
