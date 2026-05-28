import { useState, useRef } from "react";
import {
  Zap, LayoutDashboard, Calendar, Users, DollarSign, Settings, LogOut,
  Search, Bell, Plus, ChevronRight, MoreHorizontal, Check, X, AlertTriangle,
  Info, Upload, Eye, EyeOff, Copy, ExternalLink, Download, Filter,
  MapPin, Clock, ArrowUpRight, CheckCircle2, XCircle,
  QrCode, ChevronDown, Menu, Loader2, Trophy, Activity,
  ArrowRight, ArrowLeft, Play, User, CreditCard, Building2,
  ChevronLeft, Star, Share2, Globe, Edit3, Trash2, BarChart2,
  RefreshCw, FileText, Phone, Mail, Layers, TrendingUp, Hash,
  ChevronUp, UserCheck, Send
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Screen =
  | "journey-map"
  | "public-event"
  | "confirmation"
  | "login"
  | "onboarding"
  | "dashboard"
  | "events-list"
  | "events-new"
  | "events-detail"
  | "checkin"
  | "participants"
  | "financeiro"
  | "design-system";

type BadgeVariant = "draft" | "published" | "closed" | "cancelled" | "pending" | "checkin" | "blue" | "lime";

// ─── ROUTER ──────────────────────────────────────────────────────────────────
type NavFn = (screen: Screen) => void;

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function Btn({
  variant = "primary", size = "md", disabled = false, loading = false,
  children, onClick, className = "", type = "button"
}: {
  variant?: "primary" | "accent" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  disabled?: boolean; loading?: boolean;
  children?: React.ReactNode; onClick?: () => void; className?: string;
  type?: "button" | "submit";
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 cursor-pointer select-none shrink-0";
  const sizes = { sm: "h-8 px-3 text-xs rounded-lg", md: "h-9 px-4 text-sm rounded-xl", lg: "h-11 px-6 text-base rounded-xl", icon: "h-9 w-9 rounded-xl" };
  const variants = {
    primary:     "bg-[#CCFF00] text-black hover:bg-[#00BFFF] active:scale-[0.97] shadow-[0_0_20px_rgba(204,255,0,0.2)]",
    accent:      "bg-[#039EFF] text-black hover:bg-[#d9ff33] active:scale-[0.97] shadow-[0_0_20px_rgba(3,158,255,0.2)] font-bold",
    secondary:   "bg-[#1a1a1a] text-white border border-white/10 hover:bg-[#242424] active:scale-[0.97]",
    outline:     "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5 active:scale-[0.97]",
    ghost:       "bg-transparent text-white/60 hover:text-white hover:bg-white/6 active:scale-[0.97]",
    destructive: "bg-[#ff3b3b]/10 text-[#ff3b3b] border border-[#ff3b3b]/20 hover:bg-[#ff3b3b]/20 active:scale-[0.97]",
  };
  return (
    <button type={type} className={`${base} ${sizes[size]} ${variants[variant]} ${disabled || loading ? "opacity-40 cursor-not-allowed pointer-events-none" : ""} ${className}`} onClick={onClick}>
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  );
}

function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
  const styles: Record<BadgeVariant, string> = {
    draft:     "bg-white/8 text-white/55 border-white/10",
    published: "bg-[#16a34a]/15 text-[#4ade80] border-[#16a34a]/20",
    closed:    "bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/20",
    cancelled: "bg-[#ff3b3b]/15 text-[#ff6b6b] border-[#ff3b3b]/20",
    pending:   "bg-[#f59e0b]/15 text-[#fbbf24] border-[#f59e0b]/20",
    checkin:   "bg-[#6366f1]/15 text-[#a5b4fc] border-[#6366f1]/20",
    blue:      "bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/20",
    lime:      "bg-[#039EFF]/15 text-[#039EFF] border-[#039EFF]/20",
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${styles[variant]}`}>{children}</span>;
}

function InputField({ label, placeholder, hint, error, type = "text", disabled = false, required = false, value, onChange }: {
  label?: string; placeholder?: string; hint?: string; error?: string; type?: string;
  disabled?: boolean; required?: boolean; value?: string; onChange?: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  const isPass = type === "password";
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-white/75">{label}{required && <span className="text-[#ff3b3b] ml-0.5">*</span>}</label>}
      <div className="relative">
        <input
          type={isPass ? (show ? "text" : "password") : type}
          placeholder={placeholder} disabled={disabled}
          value={value} onChange={e => onChange?.(e.target.value)}
          className={`w-full h-10 px-3 rounded-xl bg-[#1a1a1a] border text-sm text-white placeholder:text-white/20 transition-all outline-none
            ${error ? "border-[#ff3b3b]/50 focus:border-[#ff3b3b] focus:ring-2 focus:ring-[#ff3b3b]/15" : "border-white/8 focus:border-[#CCFF00]/60 focus:ring-2 focus:ring-[#CCFF00]/12"}
            ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${isPass ? "pr-10" : ""}`}
        />
        {isPass && (
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors">
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {error && <span className="text-xs text-[#ff6b6b] flex items-center gap-1"><X size={11} />{error}</span>}
      {hint && !error && <span className="text-xs text-white/30">{hint}</span>}
    </div>
  );
}

function MetricCard({ label, value, delta, icon: Icon, color = "blue" }: {
  label: string; value: string; delta?: string; icon: React.ElementType; color?: "blue" | "lime" | "cyan" | "orange";
}) {
  const c = { blue: { bg: "bg-[#CCFF00]/10", icon: "text-[#CCFF00]" }, lime: { bg: "bg-[#039EFF]/10", icon: "text-[#039EFF]" }, cyan: { bg: "bg-[#00E5FF]/10", icon: "text-[#00E5FF]" }, orange: { bg: "bg-[#ff9500]/10", icon: "text-[#ff9500]" } }[color];
  return (
    <div className="bg-[#141414] border border-white/6 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-white/35 font-medium uppercase tracking-widest">{label}</span>
        <div className={`${c.bg} p-2 rounded-xl`}><Icon size={15} className={c.icon} /></div>
      </div>
      <div>
        <div className="text-3xl font-[800] text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{value}</div>
        {delta && <div className="text-xs text-[#4ade80] flex items-center gap-1 mt-1"><ArrowUpRight size={11} />{delta}</div>}
      </div>
    </div>
  );
}

function ProgressBar({ value, max, label }: { value: number; max: number; label?: string }) {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  const color = pct >= 100 ? "#ff3b3b" : pct > 80 ? "#f59e0b" : "#CCFF00";
  return (
    <div>
      {label && <div className="flex justify-between mb-1.5 text-xs"><span className="text-white/40">{label}</span><span className="font-mono text-white/50" style={{ color }}>{pct}%</span></div>}
      <div className="h-1.5 bg-white/6 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} /></div>
    </div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-white/5 rounded-xl animate-pulse ${className}`} />;
}

const statusLabel: Record<string, string> = { checkin: "Check-in ✓", published: "Confirmado", pending: "Pendente", cancelled: "Cancelado", draft: "Rascunho", closed: "Encerrado" };

// ─── ADMIN LAYOUT ─────────────────────────────────────────────────────────────
const adminNav = [
  { id: "dashboard",   icon: LayoutDashboard, label: "Dashboard" },
  { id: "events-list", icon: Calendar,         label: "Eventos" },
  { id: "participants",icon: Users,             label: "Participantes" },
  { id: "financeiro",  icon: DollarSign,        label: "Financeiro" },
];

function AdminLayout({ current, navigate, children }: { current: Screen; navigate: NavFn; children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`${mobile ? "w-64" : collapsed ? "w-14" : "w-56"} bg-[#111] border-r border-white/6 flex flex-col h-full transition-all duration-200 shrink-0`}>
      <div className={`px-3 py-4 border-b border-white/6 flex items-center ${collapsed && !mobile ? "justify-center" : "justify-between"}`}>
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-[#CCFF00] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(204,255,0,0.4)]">
            <Zap size={13} className="text-black" />
          </div>
          {(!collapsed || mobile) && <span className="text-sm font-bold text-white whitespace-nowrap">Ticket<span className="text-[#CCFF00]">Moove</span></span>}
        </div>
        {!mobile && (
          <button onClick={() => setCollapsed(!collapsed)} className="text-white/20 hover:text-white/60 transition-colors p-1">
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {adminNav.map(({ id, icon: Icon, label }) => {
          const active = current === id;
          return (
            <button key={id} onClick={() => { navigate(id as Screen); setMobileOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all text-sm w-full
                ${active ? "bg-[#CCFF00]/12 text-[#CCFF00]" : "text-white/35 hover:text-white/75 hover:bg-white/4"}`}>
              <Icon size={16} className="shrink-0" />
              {(!collapsed || mobile) && <span className="font-medium truncate">{label}</span>}
              {active && (!collapsed || mobile) && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />}
            </button>
          );
        })}
      </nav>
      <div className="px-2 pb-3 border-t border-white/6 pt-3 space-y-0.5">
        <button onClick={() => navigate("design-system")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full text-white/25 hover:text-white/60 hover:bg-white/4 transition-all`}>
          <Layers size={16} className="shrink-0" />
          {(!collapsed || mobile) && <span className="font-medium">Design System</span>}
        </button>
        <button onClick={() => navigate("login")}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm w-full text-white/25 hover:text-[#ff6b6b] hover:bg-[#ff3b3b]/5 transition-all">
          <LogOut size={15} className="shrink-0" />
          {(!collapsed || mobile) && <span className="font-medium">Sair</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full"><Sidebar /></div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 h-full"><Sidebar mobile /></div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top bar */}
        <div className="h-14 border-b border-white/6 flex items-center justify-between px-4 md:px-6 shrink-0 bg-[#0a0a0a]">
          <button className="md:hidden text-white/40 hover:text-white" onClick={() => setMobileOpen(true)}><Menu size={18} /></button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-xl border border-white/8 flex items-center justify-center text-white/35 hover:text-white transition-colors relative">
              <Bell size={15} />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-white/8 ml-1">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#CCFF00] to-[#00E5FF] flex items-center justify-center text-[11px] font-bold text-black">RA</div>
              <span className="text-xs font-medium text-white/60 hidden md:block">Rafael Alexander</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// ─── SCREEN: JOURNEY MAP ─────────────────────────────────────────────────────
function JourneyMapScreen({ navigate }: { navigate: NavFn }) {
  const athleteSteps = [
    { label: "Link do evento", sub: "Compartilhado pelo organizador", icon: Share2, screen: "public-event" as Screen, color: "#039EFF" },
    { label: "Página pública", sub: "/e/:slug", icon: Globe, screen: "public-event" as Screen, color: "#039EFF" },
    { label: "Formulário", sub: "Dados pessoais", icon: FileText, screen: "public-event" as Screen, color: "#039EFF" },
    { label: "Confirmação", sub: "Tela de sucesso", icon: CheckCircle2, screen: "confirmation" as Screen, color: "#039EFF" },
    { label: "E-mail + QR", sub: "Confirmação por e-mail", icon: Mail, screen: "confirmation" as Screen, color: "#039EFF" },
  ];

  const orgSteps = [
    { label: "Login", sub: "/login", icon: User, screen: "login" as Screen, color: "#CCFF00" },
    { label: "Onboarding", sub: "/onboarding", icon: Building2, screen: "onboarding" as Screen, color: "#CCFF00" },
    { label: "Dashboard", sub: "/dashboard", icon: LayoutDashboard, screen: "dashboard" as Screen, color: "#CCFF00" },
    { label: "Criar evento", sub: "/events/new", icon: Plus, screen: "events-new" as Screen, color: "#CCFF00" },
    { label: "Gerenciar", sub: "/events/:id", icon: Settings, screen: "events-detail" as Screen, color: "#CCFF00" },
    { label: "Check-in", sub: "/events/:id/checkin", icon: UserCheck, screen: "checkin" as Screen, color: "#CCFF00" },
  ];

  const allScreens = [
    { id: "login" as Screen,          icon: User,            label: "Login",               tag: "Admin",   color: "#CCFF00" },
    { id: "onboarding" as Screen,     icon: Building2,       label: "Onboarding",           tag: "Admin",   color: "#CCFF00" },
    { id: "dashboard" as Screen,      icon: LayoutDashboard, label: "Dashboard",            tag: "Admin",   color: "#CCFF00" },
    { id: "events-list" as Screen,    icon: Calendar,        label: "Lista de Eventos",     tag: "Admin",   color: "#CCFF00" },
    { id: "events-new" as Screen,     icon: Plus,            label: "Criar Evento",         tag: "Admin",   color: "#CCFF00" },
    { id: "events-detail" as Screen,  icon: BarChart2,       label: "Detalhe do Evento",   tag: "Admin",   color: "#CCFF00" },
    { id: "checkin" as Screen,        icon: UserCheck,       label: "Check-in",             tag: "Mobile",  color: "#00E5FF" },
    { id: "participants" as Screen,   icon: Users,           label: "Participantes",        tag: "Admin",   color: "#CCFF00" },
    { id: "financeiro" as Screen,     icon: DollarSign,      label: "Financeiro",           tag: "Admin",   color: "#CCFF00" },
    { id: "public-event" as Screen,   icon: Globe,           label: "Página do Evento",     tag: "Público", color: "#039EFF" },
    { id: "confirmation" as Screen,   icon: CheckCircle2,    label: "Confirmação",          tag: "Público", color: "#039EFF" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="border-b border-white/6 bg-[#0a0a0a]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#CCFF00] flex items-center justify-center shadow-[0_0_14px_rgba(204,255,0,0.4)]">
              <Zap size={13} className="text-black" />
            </div>
            <span className="text-sm font-bold text-white">Ticket<span className="text-[#CCFF00]">Moove</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="ghost" size="sm" onClick={() => navigate("design-system")}><Layers size={13} />Design System</Btn>
            <Btn variant="primary" size="sm" onClick={() => navigate("login")}><Play size={12} />Explorar painel</Btn>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-16">
          <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#CCFF00]">Jornada do cliente</span>
          <h1 className="text-[72px] font-[900] text-white leading-none mt-2 mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.03em" }}>
            DOIS PERFIS,<br /><span className="text-[#CCFF00]">UMA PLATAFORMA</span>
          </h1>
          <p className="text-base text-white/40 max-w-xl leading-relaxed">
            O atleta nunca cria conta — acessa o link, se inscreve e recebe o QR. O organizador gerencia tudo pelo painel admin.
          </p>
        </div>

        {/* Athlete Journey */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-[#039EFF]/15 flex items-center justify-center"><Trophy size={15} className="text-[#039EFF]" /></div>
            <div>
              <h2 className="text-2xl font-[800] text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>JORNADA DO ATLETA</h2>
              <p className="text-xs text-white/35">Mobile-first · Sem cadastro · Formulário inline</p>
            </div>
            <Btn variant="outline" size="sm" className="ml-auto border-[#039EFF]/30 text-[#039EFF] hover:bg-[#039EFF]/8" onClick={() => navigate("public-event")}>
              <Play size={12} />Ver jornada completa
            </Btn>
          </div>
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {athleteSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex items-center gap-0 shrink-0">
                  <button onClick={() => navigate(step.screen)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/6 bg-[#141414] hover:border-[#039EFF]/30 hover:bg-[#039EFF]/4 transition-all group w-36">
                    <div className="w-10 h-10 rounded-xl bg-[#039EFF]/10 flex items-center justify-center group-hover:bg-[#039EFF]/20 transition-colors">
                      <Icon size={18} className="text-[#039EFF]" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-white group-hover:text-[#039EFF] transition-colors">{step.label}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{step.sub}</p>
                    </div>
                    <ArrowUpRight size={12} className="text-white/20 group-hover:text-[#039EFF] transition-colors" />
                  </button>
                  {i < athleteSteps.length - 1 && (
                    <div className="flex items-center px-1 shrink-0">
                      <div className="w-6 h-px bg-gradient-to-r from-[#039EFF]/30 to-[#039EFF]/10" />
                      <ChevronRight size={12} className="text-[#039EFF]/30 -ml-1" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Organizer Journey */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-[#CCFF00]/15 flex items-center justify-center"><Building2 size={15} className="text-[#CCFF00]" /></div>
            <div>
              <h2 className="text-2xl font-[800] text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>JORNADA DO ORGANIZADOR</h2>
              <p className="text-xs text-white/35">Desktop-first · Painel admin · Dados densos</p>
            </div>
            <Btn variant="primary" size="sm" className="ml-auto" onClick={() => navigate("login")}>
              <Play size={12} />Ver jornada completa
            </Btn>
          </div>
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {orgSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex items-center gap-0 shrink-0">
                  <button onClick={() => navigate(step.screen)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/6 bg-[#141414] hover:border-[#CCFF00]/30 hover:bg-[#CCFF00]/4 transition-all group w-36">
                    <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center group-hover:bg-[#CCFF00]/20 transition-colors">
                      <Icon size={18} className="text-[#CCFF00]" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-white group-hover:text-[#CCFF00] transition-colors">{step.label}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{step.sub}</p>
                    </div>
                    <ArrowUpRight size={12} className="text-white/20 group-hover:text-[#CCFF00] transition-colors" />
                  </button>
                  {i < orgSteps.length - 1 && (
                    <div className="flex items-center px-1 shrink-0">
                      <div className="w-6 h-px bg-gradient-to-r from-[#CCFF00]/30 to-[#CCFF00]/10" />
                      <ChevronRight size={12} className="text-[#CCFF00]/30 -ml-1" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* All Screens Grid */}
        <div>
          <h2 className="text-2xl font-[800] text-white mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>TODAS AS TELAS</h2>
          <p className="text-sm text-white/35 mb-6">Clique em qualquer tela para acessá-la diretamente</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allScreens.map(({ id, icon: Icon, label, tag, color }) => (
              <button key={id} onClick={() => navigate(id)}
                className="bg-[#141414] border border-white/6 rounded-2xl p-5 text-left hover:border-white/15 hover:bg-[#1a1a1a] transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors" style={{ background: `${color}15` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>{tag}</span>
                </div>
                <p className="text-sm font-semibold text-white group-hover:text-white transition-colors">{label}</p>
                <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[11px]" style={{ color }}>Abrir tela</span>
                  <ArrowRight size={11} style={{ color }} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── SCREEN: PUBLIC EVENT ─────────────────────────────────────────────────────
function PublicEventScreen({ navigate }: { navigate: NavFn }) {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<"view" | "form">("view");
  const [form, setForm] = useState({ name: "", email: "", cpf: "", phone: "", dob: "", category: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("confirmation"); }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Back nav */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/6">
        <div className="max-w-[900px] mx-auto px-4 h-12 flex items-center justify-between">
          <button onClick={() => navigate("journey-map")} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors">
            <ArrowLeft size={14} /><span>Jornada do Atleta</span>
          </button>
          <span className="text-[10px] font-mono text-white/20">/e/corrida-das-pedras-2026</span>
          <Btn variant="ghost" size="sm" onClick={() => navigate("login")}><Settings size={13} />Admin</Btn>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&h=500&fit=crop&auto=format" alt="Atletas em corrida de rua" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-[900px] mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="lime">Inscrições abertas</Badge>
              <Badge variant="pending">13 vagas restantes</Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-[900] text-white leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.02em" }}>
              CORRIDA DAS<br />PEDRAS 2026
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <span className="text-sm text-white/60 flex items-center gap-1.5"><Calendar size={13} />23 de agosto de 2026</span>
              <span className="text-sm text-white/60 flex items-center gap-1.5"><Clock size={13} />07:00h</span>
              <span className="text-sm text-white/60 flex items-center gap-1.5"><MapPin size={13} />Parque Ibirapuera, São Paulo — SP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-10">
        <div className="grid md:grid-cols-[1fr_360px] gap-8">
          {/* Left: Info */}
          <div>
            {/* About */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Sobre o evento</h2>
              <p className="text-sm text-white/55 leading-relaxed">
                A Corrida das Pedras é um dos eventos mais tradicionais de São Paulo, percorrendo os caminhos do Parque Ibirapuera com vistas incríveis da cidade. Em sua 8ª edição, o evento oferece percursos de 5km, 10km e 21km com chip de cronometragem e kit completo do atleta.
              </p>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Categorias</h2>
              <div className="space-y-2">
                {[
                  { dist: "5km", desc: "Corrida recreativa — sem chip", price: "R$ 89" },
                  { dist: "10km", desc: "Competitivo — chip de cronometragem", price: "R$ 149" },
                  { dist: "21km", desc: "Meia maratona — chip + kit premium", price: "R$ 189" },
                ].map(c => (
                  <div key={c.dist} className="flex items-center justify-between bg-[#141414] border border-white/6 rounded-xl px-4 py-3">
                    <div>
                      <span className="text-base font-bold text-white mr-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{c.dist}</span>
                      <span className="text-sm text-white/40">{c.desc}</span>
                    </div>
                    <span className="text-sm font-bold text-[#CCFF00]">{c.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-[#141414] border border-white/6 rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=700&h=220&fit=crop&auto=format" alt="Parque Ibirapuera São Paulo" className="w-full h-36 object-cover opacity-70" />
              <div className="p-4">
                <p className="text-sm font-semibold text-white flex items-center gap-2"><MapPin size={14} className="text-[#CCFF00]" />Parque Ibirapuera — Portão 10</p>
                <p className="text-xs text-white/40 mt-1">Av. Pedro Álvares Cabral, s/n — São Paulo, SP</p>
                <Btn variant="outline" size="sm" className="mt-3 !text-xs">Abrir no Google Maps</Btn>
              </div>
            </div>
          </div>

          {/* Right: Lots + Form */}
          <div>
            {/* Lots */}
            <div className="bg-[#141414] border border-white/6 rounded-2xl p-5 mb-4">
              <h3 className="text-sm font-bold text-white mb-3">Lotes</h3>
              <div className="space-y-2 mb-4">
                {[
                  { name: "Lote 1 — Early Bird", price: "R$ 89", status: "Esgotado", active: false },
                  { name: "Lote 2 — Regular", price: "R$ 149", status: "Ativo · até 31/07", active: true },
                  { name: "Lote 3 — Last Call", price: "R$ 189", status: "A partir de 01/08", active: false },
                ].map(lot => (
                  <div key={lot.name} className={`flex items-center justify-between p-3 rounded-xl border transition-all
                    ${lot.active ? "border-[#CCFF00]/30 bg-[#CCFF00]/6" : "border-white/5 opacity-45"}`}>
                    <div>
                      <p className="text-xs font-semibold text-white">{lot.name}</p>
                      <p className="text-[11px] text-white/35 mt-0.5">{lot.status}</p>
                    </div>
                    <span className="text-lg font-[800] text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{lot.price}</span>
                  </div>
                ))}
              </div>
              <ProgressBar value={487} max={500} label="Vagas disponíveis" />
            </div>

            {/* Form */}
            <div className="bg-[#141414] border border-white/6 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-4">Inscrição</h3>
              <div className="space-y-3">
                <InputField label="Nome completo" placeholder="Ana Paula Ferreira" required value={form.name} onChange={v => setForm(f => ({...f, name: v}))} />
                <InputField label="E-mail" placeholder="ana@gmail.com" type="email" required value={form.email} onChange={v => setForm(f => ({...f, email: v}))} />
                <div className="grid grid-cols-2 gap-2">
                  <InputField label="CPF" placeholder="000.000.000-00" required value={form.cpf} onChange={v => setForm(f => ({...f, cpf: v}))} />
                  <InputField label="Telefone" placeholder="(11) 99999-9999" value={form.phone} onChange={v => setForm(f => ({...f, phone: v}))} />
                </div>
                <InputField label="Data de nascimento" placeholder="DD/MM/AAAA" required value={form.dob} onChange={v => setForm(f => ({...f, dob: v}))} />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-white/75">Categoria <span className="text-[#ff3b3b]">*</span></label>
                  <div className="relative">
                    <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
                      className="w-full h-10 px-3 pr-8 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white focus:border-[#CCFF00]/60 focus:ring-2 focus:ring-[#CCFF00]/12 outline-none appearance-none transition-all">
                      <option value="">Selecione</option>
                      <option>5km — R$ 89,00</option>
                      <option>10km — R$ 149,00</option>
                      <option>21km — R$ 189,00</option>
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  </div>
                </div>
                <Btn variant="accent" size="lg" className="w-full mt-2" loading={loading} onClick={handleSubmit}>
                  <Zap size={16} />Confirmar inscrição — R$ 149,00
                </Btn>
                <p className="text-[10px] text-center text-white/25 leading-relaxed">
                  Ao se inscrever você confirma que leu e aceita o <span className="text-[#CCFF00]">regulamento do evento</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Powered by */}
      <div className="border-t border-white/6 py-4 text-center">
        <p className="text-[11px] text-white/20">Inscrições gerenciadas por <span className="text-[#CCFF00] font-semibold">Ticket Moove</span></p>
      </div>
    </div>
  );
}

// ─── SCREEN: CONFIRMATION ──────────────────────────────────────────────────────
function ConfirmationScreen({ navigate }: { navigate: NavFn }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/6">
        <div className="max-w-[600px] mx-auto px-4 h-12 flex items-center">
          <button onClick={() => navigate("public-event")} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors">
            <ArrowLeft size={14} />Voltar ao evento
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          {/* Success icon */}
          <div className="relative inline-flex mb-6">
            <div className="w-20 h-20 rounded-full bg-[#4ade80]/10 flex items-center justify-center">
              <CheckCircle2 size={36} className="text-[#4ade80]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#039EFF] flex items-center justify-center">
              <Zap size={14} className="text-black" />
            </div>
          </div>

          <h1 className="text-5xl font-[900] text-white mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>INSCRIÇÃO<br />CONFIRMADA!</h1>
          <p className="text-sm text-white/40 mb-8">Boa, Ana Paula! Você está inscrita na Corrida das Pedras 2026.</p>

          {/* Summary card */}
          <div className="bg-[#141414] border border-white/6 rounded-2xl p-5 text-left mb-5">
            <div className="space-y-3 mb-5">
              {[
                ["Evento", "Corrida das Pedras 2026"],
                ["Categoria", "10km — Competitivo"],
                ["Data", "23 de agosto de 2026 · 07:00h"],
                ["Local", "Parque Ibirapuera, São Paulo"],
                ["Valor pago", "R$ 149,00"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-white/35">{k}</span>
                  <span className="font-medium text-white">{v}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/6 pt-4 flex flex-col items-center gap-2">
              <p className="text-[10px] text-white/30 uppercase tracking-widest">QR Code de check-in</p>
              <div className="w-28 h-28 bg-white rounded-xl flex items-center justify-center">
                <QrCode size={80} className="text-[#0a0a0a]" />
              </div>
              <code className="text-sm font-bold text-[#CCFF00] font-mono">#INS-0042</code>
            </div>
          </div>

          <div className="bg-[#CCFF00]/8 border border-[#CCFF00]/15 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Mail size={16} className="text-[#CCFF00] shrink-0 mt-0.5" />
            <p className="text-sm text-white/60 text-left">Enviamos a confirmação e o QR code para <strong className="text-white">ana@gmail.com</strong>. Verifique sua caixa de entrada.</p>
          </div>

          <div className="flex gap-3">
            <Btn variant="secondary" className="flex-1" onClick={() => navigate("public-event")}><ArrowLeft size={14} />Ver evento</Btn>
            <Btn variant="accent" className="flex-1" onClick={() => navigate("journey-map")}><Trophy size={14} />Início</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: LOGIN ─────────────────────────────────────────────────────────────
function LoginScreen({ navigate }: { navigate: NavFn }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("onboarding"); }, 1200);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left panel — visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(204,255,0,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,229,255,0.08) 0%, transparent 50%), #090909" }}>
        <img src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=900&h=900&fit=crop&auto=format" alt="Atleta correndo ao amanhecer" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]" />
        <div className="relative z-10 flex flex-col justify-between p-12 max-w-lg">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#CCFF00] flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.5)]">
              <Zap size={16} className="text-black" />
            </div>
            <span className="text-base font-bold text-white">Ticket<span className="text-[#CCFF00]">Moove</span></span>
          </div>
          <div>
            <h2 className="text-5xl font-[900] text-white mb-4 leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>GERENCIE SEUS<br /><span className="text-[#CCFF00]">EVENTOS</span><br />COM PRECISÃO</h2>
            <p className="text-sm text-white/40 leading-relaxed">A plataforma para organizadores de eventos endurance. Inscrições, check-in e financeiro em um único lugar.</p>
            <div className="flex items-center gap-4 mt-6">
              {[["1.847", "Inscrições"], ["12", "Eventos"], ["R$ 38K", "Receita/mês"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-xl font-[800] text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{v}</p>
                  <p className="text-xs text-white/30">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-[440px] bg-[#0a0a0a] flex flex-col items-center justify-center p-8 shrink-0 relative">
        <button onClick={() => navigate("journey-map")} className="absolute top-6 left-6 flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors">
          <ArrowLeft size={13} />Início
        </button>

        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-[#CCFF00] flex items-center justify-center"><Zap size={15} className="text-black" /></div>
            <span className="text-sm font-bold text-white">Ticket<span className="text-[#CCFF00]">Moove</span></span>
          </div>

          <h1 className="text-3xl font-[800] text-white mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Entrar no painel</h1>
          <p className="text-sm text-white/35 mb-8">Acesso exclusivo para organizadores</p>

          <div className="space-y-4">
            <InputField label="E-mail" placeholder="rafael@race83.com" type="email" value={email} onChange={setEmail} required />
            <InputField label="Senha" placeholder="••••••••" type="password" value={pass} onChange={setPass} required />
            <Btn variant="primary" size="lg" className="w-full" loading={loading} onClick={handleLogin}>Entrar</Btn>
          </div>

          <button className="w-full text-center text-xs text-[#CCFF00] hover:text-white transition-colors mt-4">Esqueci minha senha</button>

          <div className="mt-8 pt-8 border-t border-white/6 text-center">
            <p className="text-xs text-white/25">Não tem acesso? Fale com a equipe Ticket Moove.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: ONBOARDING ───────────────────────────────────────────────────────
function OnboardingScreen({ navigate }: { navigate: NavFn }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ org: "", slug: "", cnpj: "", bank: "", agency: "", account: "" });
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else { setLoading(true); setTimeout(() => { setLoading(false); navigate("dashboard"); }, 1000); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-10">
          <div className="w-8 h-8 rounded-xl bg-[#CCFF00] flex items-center justify-center shadow-[0_0_16px_rgba(204,255,0,0.4)]"><Zap size={15} className="text-black" /></div>
          <span className="text-base font-bold text-white">Ticket<span className="text-[#CCFF00]">Moove</span></span>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 justify-center mb-8">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${step === s ? "bg-[#CCFF00] text-black" : step > s ? "bg-[#4ade80] text-black" : "bg-white/8 text-white/30"}`}>
                {step > s ? <Check size={14} /> : s}
              </div>
              {s < 2 && <div className={`w-16 h-px transition-all ${step > s ? "bg-[#4ade80]" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-[#141414] border border-white/6 rounded-2xl p-7">
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-[800] text-white mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>DADOS DA ORGANIZAÇÃO</h2>
              <p className="text-xs text-white/35 mb-6">Passo 1 de 2 · Como você quer aparecer para os atletas</p>
              <div className="space-y-4">
                <InputField label="Nome da organização" placeholder="Race83 Eventos" required value={form.org} onChange={v => setForm(f => ({...f, org: v}))} />
                <InputField label="Slug (URL pública)" placeholder="race83" hint="ticketmoove.com.br/race83" required value={form.slug} onChange={v => setForm(f => ({...f, slug: v}))} />
                <InputField label="CNPJ" placeholder="00.000.000/0001-00" required value={form.cnpj} onChange={v => setForm(f => ({...f, cnpj: v}))} />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-[800] text-white mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>DADOS BANCÁRIOS</h2>
              <p className="text-xs text-white/35 mb-2">Passo 2 de 2 · Para receber os repasses das inscrições</p>
              <div className="bg-[#CCFF00]/8 border border-[#CCFF00]/15 rounded-xl px-4 py-3 mb-5 flex items-start gap-2">
                <Info size={14} className="text-[#CCFF00] shrink-0 mt-0.5" />
                <p className="text-xs text-white/55">Os repasses são feitos em até 5 dias úteis após o evento.</p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-white/75">Banco <span className="text-[#ff3b3b]">*</span></label>
                  <div className="relative">
                    <select className="w-full h-10 px-3 pr-8 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white focus:border-[#CCFF00]/60 focus:ring-2 focus:ring-[#CCFF00]/12 outline-none appearance-none transition-all">
                      <option>Selecione seu banco</option>
                      <option>001 — Banco do Brasil</option>
                      <option>033 — Santander</option>
                      <option>104 — Caixa Econômica</option>
                      <option>237 — Bradesco</option>
                      <option>341 — Itaú</option>
                      <option>260 — Nubank</option>
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Agência" placeholder="0001" required value={form.agency} onChange={v => setForm(f => ({...f, agency: v}))} />
                  <InputField label="Conta" placeholder="12345-6" required value={form.account} onChange={v => setForm(f => ({...f, account: v}))} />
                </div>
              </div>
            </>
          )}

          <div className="flex gap-3 mt-6">
            {step === 2 && <Btn variant="outline" size="md" onClick={() => setStep(1)}><ArrowLeft size={14} />Voltar</Btn>}
            <Btn variant="primary" size="md" className="flex-1" loading={loading} onClick={handleNext}>
              {step === 1 ? <><span>Continuar</span><ArrowRight size={14} /></> : <><span>Finalizar configuração</span><Check size={14} /></>}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: DASHBOARD ────────────────────────────────────────────────────────
function DashboardScreen({ navigate }: { navigate: NavFn }) {
  const events = [
    { name: "Corrida das Pedras 2026", date: "23 ago", ins: 387, max: 500, status: "published" as BadgeVariant, today: true },
    { name: "Triathlon Floripa",        date: "12 out", ins: 200, max: 200, status: "closed" as BadgeVariant,    today: false },
    { name: "Pedal do Vento",           date: "05 nov", ins: 42,  max: 300, status: "draft" as BadgeVariant,     today: false },
    { name: "Maratona do Sol",          date: "15 dez", ins: 98,  max: 400, status: "published" as BadgeVariant, today: false },
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-[800] text-white leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Bom dia, Rafael</h1>
          <p className="text-sm text-white/35 mt-1">Segunda-feira, 25 de maio de 2026</p>
        </div>
        <Btn variant="primary" size="md" onClick={() => navigate("events-new")}><Plus size={15} />Novo evento</Btn>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total de eventos" value="12" delta="+3 este mês" icon={Calendar} color="blue" />
        <MetricCard label="Inscrições totais" value="1.847" delta="+124 esta semana" icon={Users} color="cyan" />
        <MetricCard label="Receita do mês" value="R$ 38.450" delta="+18%" icon={DollarSign} color="lime" />
        <MetricCard label="Inscrições hoje" value="47" delta="ao vivo" icon={Activity} color="orange" />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Events table */}
        <div className="bg-[#141414] border border-white/6 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
            <h3 className="text-sm font-bold text-white">Próximos eventos</h3>
            <Btn variant="ghost" size="sm" onClick={() => navigate("events-list")}><span>Ver todos</span><ChevronRight size={13} /></Btn>
          </div>
          <div className="divide-y divide-white/4">
            {events.map(ev => (
              <div key={ev.name} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors cursor-pointer group" onClick={() => navigate("events-detail")}>
                <div className="w-9 h-9 rounded-xl bg-white/4 flex items-center justify-center shrink-0">
                  <Calendar size={15} className="text-white/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white truncate">{ev.name}</p>
                    {ev.today && <span className="text-[10px] font-bold text-[#039EFF] bg-[#039EFF]/10 px-1.5 py-0.5 rounded-full shrink-0">HOJE</span>}
                  </div>
                  <p className="text-xs text-white/30 mt-0.5">{ev.ins}/{ev.max} inscrições</p>
                </div>
                <Badge variant={ev.status}>{statusLabel[ev.status]}</Badge>
                <span className="text-xs text-white/30 font-mono shrink-0">{ev.date}</span>
                <ChevronRight size={14} className="text-white/15 group-hover:text-white/40 transition-colors shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions + stats */}
        <div className="space-y-4">
          <div className="bg-[#141414] border border-white/6 rounded-2xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Ações rápidas</h3>
            <div className="space-y-2">
              {[
                { label: "Criar novo evento", icon: Plus, screen: "events-new" as Screen, color: "#CCFF00" },
                { label: "Ver participantes", icon: Users, screen: "participants" as Screen, color: "#00E5FF" },
                { label: "Relatório financeiro", icon: BarChart2, screen: "financeiro" as Screen, color: "#039EFF" },
                { label: "Check-in do evento", icon: UserCheck, screen: "checkin" as Screen, color: "#f59e0b" },
              ].map(({ label, icon: Icon, screen, color }) => (
                <button key={label} onClick={() => navigate(screen)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/4 transition-colors group">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                    <Icon size={14} style={{ color }} />
                  </div>
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">{label}</span>
                  <ArrowRight size={13} className="ml-auto text-white/15 group-hover:text-white/40 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#141414] border border-white/6 rounded-2xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Ocupação geral</h3>
            <div className="space-y-4">
              {events.slice(0, 3).map(ev => <ProgressBar key={ev.name} value={ev.ins} max={ev.max} label={ev.name.split(" ").slice(0, 3).join(" ")} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: EVENTS LIST ──────────────────────────────────────────────────────
function EventsListScreen({ navigate }: { navigate: NavFn }) {
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const events = [
    { name: "Corrida das Pedras 2026", date: "23/08/2026", city: "São Paulo, SP", slots: 500, ins: 387, status: "published" as BadgeVariant },
    { name: "Triathlon Floripa",        date: "12/10/2026", city: "Florianópolis, SC", slots: 200, ins: 200, status: "closed" as BadgeVariant },
    { name: "Pedal do Vento",           date: "05/11/2026", city: "Curitiba, PR", slots: 300, ins: 42, status: "draft" as BadgeVariant },
    { name: "Maratona do Sol",          date: "15/12/2026", city: "Fortaleza, CE", slots: 400, ins: 98, status: "published" as BadgeVariant },
    { name: "Ultra Serra Gaúcha",       date: "20/01/2027", city: "Gramado, RS", slots: 150, ins: 0, status: "draft" as BadgeVariant },
  ];
  const tabs = ["todos", "published", "draft", "closed", "cancelled"];
  const tabLabel: Record<string, string> = { todos: "Todos", published: "Publicado", draft: "Rascunho", closed: "Encerrado", cancelled: "Cancelado" };
  const filtered = events.filter(e =>
    (filter === "todos" || e.status === filter) &&
    (!search || e.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-[800] text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Eventos</h1>
          <p className="text-sm text-white/35 mt-1">{events.length} eventos cadastrados</p>
        </div>
        <Btn variant="primary" onClick={() => navigate("events-new")}><Plus size={15} />Novo evento</Btn>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="flex gap-1 bg-[#1a1a1a] p-1 rounded-xl">
          {tabs.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === t ? "bg-[#CCFF00] text-black" : "text-white/35 hover:text-white"}`}>
              {tabLabel[t]}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar evento..." className="w-full h-8 pl-8 pr-3 rounded-xl bg-[#1a1a1a] border border-white/8 text-xs text-white placeholder:text-white/20 outline-none focus:border-[#CCFF00]/40" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-white/6 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Evento", "Data", "Cidade", "Vagas", "Inscrições", "Status", ""].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/20">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((ev, i) => (
              <tr key={i} className="border-b border-white/4 hover:bg-white/2 transition-colors group cursor-pointer" onClick={() => navigate("events-detail")}>
                <td className="px-5 py-3.5">
                  <p className="text-sm font-semibold text-white group-hover:text-[#CCFF00] transition-colors">{ev.name}</p>
                </td>
                <td className="px-5 py-3.5 font-mono text-xs text-white/40">{ev.date}</td>
                <td className="px-5 py-3.5 text-xs text-white/50">{ev.city}</td>
                <td className="px-5 py-3.5 font-mono text-xs text-white/50">{ev.slots}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-white/70">{ev.ins}</span>
                    <div className="w-16 h-1 bg-white/8 rounded-full overflow-hidden">
                      <div className="h-full bg-[#CCFF00] rounded-full" style={{ width: `${Math.round((ev.ins / ev.slots) * 100)}%` }} />
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5"><Badge variant={ev.status}>{statusLabel[ev.status]}</Badge></td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Btn variant="ghost" size="sm" className="!h-7 !px-2 !text-xs" onClick={e => { e.stopPropagation(); navigate("events-detail"); }}>Ver</Btn>
                    <Btn variant="ghost" size="sm" className="!h-7 !px-2 !text-xs"><MoreHorizontal size={13} /></Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-3">
            <Calendar size={28} className="text-white/15" />
            <p className="text-sm text-white/30">Nenhum evento encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN: CREATE EVENT ─────────────────────────────────────────────────────
function CreateEventScreen({ navigate }: { navigate: NavFn }) {
  const [form, setForm] = useState({ name: "", slug: "", desc: "", date: "", time: "", address: "", city: "", state: "", slots: "", });
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const autoSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handlePublish = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("events-detail"); }, 1200);
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-white/30 mb-6">
        <button onClick={() => navigate("events-list")} className="hover:text-white transition-colors">Eventos</button>
        <ChevronRight size={12} />
        <span className="text-white">Criar evento</span>
      </div>

      <h1 className="text-3xl font-[800] text-white mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>CRIAR EVENTO</h1>

      <div className="space-y-6">
        {/* Section: Info */}
        <div className="bg-[#141414] border border-white/6 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Informações gerais</h3>
          <InputField label="Nome do evento" placeholder="Corrida das Pedras 2026" required value={form.name}
            onChange={v => setForm(f => ({...f, name: v, slug: autoSlug(v)}))} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/75">Descrição</label>
            <textarea placeholder="Descreva o percurso, categorias, kit do atleta, informações importantes..." rows={4}
              className="w-full px-3 py-2.5 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white placeholder:text-white/20 focus:border-[#CCFF00]/60 focus:ring-2 focus:ring-[#CCFF00]/12 outline-none resize-none transition-all" />
          </div>
        </div>

        {/* Section: Date & Location */}
        <div className="bg-[#141414] border border-white/6 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Data e local</h3>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Data do evento" type="date" required value={form.date} onChange={v => setForm(f => ({...f, date: v}))} />
            <InputField label="Horário de largada" placeholder="07:00" required value={form.time} onChange={v => setForm(f => ({...f, time: v}))} />
          </div>
          <InputField label="Endereço" placeholder="Av. Pedro Álvares Cabral, s/n" required value={form.address} onChange={v => setForm(f => ({...f, address: v}))} />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Cidade" placeholder="São Paulo" required value={form.city} onChange={v => setForm(f => ({...f, city: v}))} />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/75">Estado <span className="text-[#ff3b3b]">*</span></label>
              <div className="relative">
                <select className="w-full h-10 px-3 pr-8 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white focus:border-[#CCFF00]/60 outline-none appearance-none transition-all">
                  {["SP", "RJ", "MG", "RS", "SC", "PR", "CE", "BA"].map(s => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              </div>
            </div>
          </div>
          <InputField label="Total de vagas" placeholder="500" type="number" required value={form.slots} onChange={v => setForm(f => ({...f, slots: v}))} />
        </div>

        {/* Section: URL + Image */}
        <div className="bg-[#141414] border border-white/6 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Identidade do evento</h3>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/75">URL pública</label>
            <div className="flex items-center gap-0 bg-[#1a1a1a] border border-white/8 rounded-xl overflow-hidden focus-within:border-[#CCFF00]/60 focus-within:ring-2 focus-within:ring-[#CCFF00]/12 transition-all">
              <span className="px-3 py-2.5 text-sm text-white/25 bg-white/4 border-r border-white/8 shrink-0">ticketmoove.com.br/e/</span>
              <input value={form.slug} onChange={e => setForm(f => ({...f, slug: e.target.value}))}
                placeholder="corrida-das-pedras-2026" className="flex-1 px-3 py-2.5 text-sm text-white bg-transparent outline-none placeholder:text-white/20" />
            </div>
            <span className="text-xs text-white/30">Gerado automaticamente do nome · editável</span>
          </div>

          {/* Banner upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/75">Banner do evento</label>
            <div onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={() => setDragging(false)}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-all
                ${dragging ? "border-[#CCFF00] bg-[#CCFF00]/5" : "border-white/8 hover:border-white/15"}`}>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center"><Upload size={20} className="text-white/30" /></div>
              <div className="text-center">
                <p className="text-sm font-medium text-white/60">Arraste o banner aqui ou clique para selecionar</p>
                <p className="text-xs text-white/25 mt-1">PNG, JPG ou WebP · Proporção 16:9 · Máx. 5MB</p>
              </div>
              <Btn variant="outline" size="sm">Escolher arquivo</Btn>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Btn variant="secondary" size="md" onClick={() => navigate("events-list")}><ArrowLeft size={14} />Cancelar</Btn>
          <Btn variant="outline" size="md" className="flex-1"><FileText size={14} />Salvar rascunho</Btn>
          <Btn variant="primary" size="md" className="flex-1" loading={loading} onClick={handlePublish}><Send size={14} />Publicar evento</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: EVENT DETAIL ─────────────────────────────────────────────────────
function EventDetailScreen({ navigate }: { navigate: NavFn }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const inscriptions = [
    { name: "Ana Paula Ferreira",    email: "ana@gmail.com",       cpf: "123.456.789-00", lot: "Lote 1", status: "checkin" as BadgeVariant,   date: "12/05" },
    { name: "Carlos Eduardo Souza",  email: "carlos@gmail.com",    cpf: "234.567.890-11", lot: "Lote 2", status: "published" as BadgeVariant,  date: "14/05" },
    { name: "Fernanda Lima",         email: "fe.lima@outlook.com", cpf: "345.678.901-22", lot: "Lote 1", status: "pending" as BadgeVariant,    date: "15/05" },
    { name: "Rafael Alexander",      email: "rafael@race83.com",   cpf: "456.789.012-33", lot: "Lote 2", status: "published" as BadgeVariant,  date: "16/05" },
    { name: "Juliana Costa",         email: "ju.costa@gmail.com",  cpf: "567.890.123-44", lot: "Lote 3", status: "cancelled" as BadgeVariant,  date: "17/05" },
    { name: "Marcos Oliveira",       email: "marcos@gmail.com",    cpf: "678.901.234-55", lot: "Lote 2", status: "published" as BadgeVariant,  date: "18/05" },
  ];
  const filtered = inscriptions.filter(r =>
    (filterStatus === "todos" || r.status === filterStatus) &&
    (!search || r.name.toLowerCase().includes(search.toLowerCase()) || r.email.includes(search))
  );

  return (
    <div className="p-6 md:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-white/30 mb-4">
        <button onClick={() => navigate("events-list")} className="hover:text-white transition-colors">Eventos</button>
        <ChevronRight size={12} />
        <span className="text-white">Corrida das Pedras 2026</span>
      </div>

      {/* Event header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-[800] text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>CORRIDA DAS PEDRAS 2026</h1>
            <Badge variant="published">Publicado</Badge>
          </div>
          <p className="text-sm text-white/35 flex items-center gap-3">
            <span className="flex items-center gap-1"><Calendar size={12} />23 ago 2026</span>
            <span className="flex items-center gap-1"><MapPin size={12} />Parque Ibirapuera, São Paulo</span>
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Btn variant="ghost" size="sm" onClick={() => navigate("public-event")}><ExternalLink size={13} />Ver página</Btn>
          <Btn variant="secondary" size="sm" onClick={() => navigate("checkin")}><UserCheck size={13} />Check-in</Btn>
          <Btn variant="outline" size="sm"><Edit3 size={13} />Editar</Btn>
          <Btn variant="primary" size="sm"><Share2 size={13} />Copiar link</Btn>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Inscrições" value="387" delta="de 500 vagas" icon={Users} color="blue" />
        <MetricCard label="Confirmados" value="342" icon={CheckCircle2} color="cyan" />
        <MetricCard label="Ocupação" value="77%" delta="23 vagas livres" icon={BarChart2} color="orange" />
        <MetricCard label="Receita gerada" value="R$ 57.338" delta="bruto" icon={DollarSign} color="lime" />
      </div>

      {/* Capacity bar */}
      <div className="bg-[#141414] border border-white/6 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-white/30">Ocupação de vagas</p>
          <span className="text-xs font-mono text-white/50">387 / 500</span>
        </div>
        <ProgressBar value={387} max={500} />
      </div>

      {/* Lots */}
      <div className="bg-[#141414] border border-white/6 rounded-2xl overflow-hidden mb-6">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
          <h3 className="text-sm font-bold text-white">Lotes de preço</h3>
          <Btn variant="secondary" size="sm"><Plus size={13} />Adicionar lote</Btn>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-white/5">{["Lote", "Preço", "Vagas", "Validade", "Status"].map(h => <th key={h} className="text-left px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white/20">{h}</th>)}</tr></thead>
          <tbody>
            {[
              { name: "Lote 1 — Early Bird", price: "R$ 89,00",  slots: 100, valid: "até 30/04", status: "closed" as BadgeVariant },
              { name: "Lote 2 — Regular",    price: "R$ 149,00", slots: 250, valid: "até 31/07", status: "published" as BadgeVariant },
              { name: "Lote 3 — Last Call",  price: "R$ 189,00", slots: 150, valid: "até 22/08", status: "draft" as BadgeVariant },
            ].map((lot, i) => (
              <tr key={i} className="border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors">
                <td className="px-5 py-3 text-sm font-medium text-white">{lot.name}</td>
                <td className="px-5 py-3 font-mono text-sm text-white">{lot.price}</td>
                <td className="px-5 py-3 font-mono text-sm text-white/50">{lot.slots}</td>
                <td className="px-5 py-3 text-xs text-white/40">{lot.valid}</td>
                <td className="px-5 py-3"><Badge variant={lot.status}>{statusLabel[lot.status]}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inscriptions */}
      <div className="bg-[#141414] border border-white/6 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-5 py-4 border-b border-white/6">
          <h3 className="text-sm font-bold text-white">Inscrições</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-1 bg-[#1a1a1a] p-1 rounded-lg">
              {["todos", "published", "pending", "checkin"].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${filterStatus === s ? "bg-[#CCFF00] text-black" : "text-white/30 hover:text-white"}`}>
                  {({ todos: "Todos", published: "Confirmado", pending: "Pendente", checkin: "Check-in" } as Record<string, string>)[s]}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." className="h-7 pl-7 pr-3 rounded-lg bg-[#1a1a1a] border border-white/8 text-xs text-white placeholder:text-white/20 outline-none w-36" />
            </div>
            <Btn variant="secondary" size="sm" className="!h-7 !px-3 !text-xs"><Download size={12} />CSV</Btn>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/5">{["Participante", "CPF", "Lote", "Status", "Inscrito em", ""].map(h => <th key={h} className="text-left px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white/20">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i} className="border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors group">
                  <td className="px-5 py-3"><p className="text-sm font-medium text-white">{r.name}</p><p className="text-xs text-white/30">{r.email}</p></td>
                  <td className="px-5 py-3 font-mono text-xs text-white/40">{r.cpf}</td>
                  <td className="px-5 py-3 text-xs text-white/50">{r.lot}</td>
                  <td className="px-5 py-3"><Badge variant={r.status}>{statusLabel[r.status]}</Badge></td>
                  <td className="px-5 py-3 font-mono text-xs text-white/35">{r.date}</td>
                  <td className="px-5 py-3"><div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><Btn variant="ghost" size="sm" className="!h-7 !px-2 !text-xs"><UserCheck size={12} />Check-in</Btn></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: CHECK-IN ─────────────────────────────────────────────────────────
function CheckinScreen({ navigate }: { navigate: NavFn }) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<null | "found" | "success" | "already" | "notfound">(null);
  const [loading, setLoading] = useState(false);

  const doSearch = () => {
    if (!search) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (search.toLowerCase().includes("ana") || search.includes("123")) setResult("found");
      else if (search.toLowerCase().includes("carlos")) setResult("already");
      else setResult("notfound");
    }, 600);
  };

  const doCheckin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setResult("success"); setSearch(""); }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/6">
        <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
          <button onClick={() => navigate("events-detail")} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors">
            <ArrowLeft size={14} />Voltar ao evento
          </button>
          <span className="text-[10px] font-mono text-white/25">/events/:id/checkin</span>
        </div>
      </div>

      {/* Event bar */}
      <div className="bg-[#CCFF00] px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/50">Check-in · Hoje</p>
            <h2 className="text-xl font-[900] text-black leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Corrida das Pedras 2026</h2>
          </div>
          <div className="text-right">
            <p className="text-3xl font-[900] text-black leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>147</p>
            <p className="text-[11px] text-black/50">de 500 check-ins</p>
          </div>
        </div>
        <div className="max-w-lg mx-auto mt-2">
          <div className="h-1.5 bg-black/15 rounded-full overflow-hidden"><div className="h-full bg-black/40 rounded-full" style={{ width: "29.4%" }} /></div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={search} onChange={e => { setSearch(e.target.value); setResult(null); }}
              onKeyDown={e => e.key === "Enter" && doSearch()}
              placeholder="Nome, CPF ou número da inscrição..."
              className="w-full h-12 pl-10 pr-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#CCFF00]/50" />
          </div>
          <Btn variant="primary" size="md" className="!h-12 !px-5" loading={loading} onClick={doSearch}><Search size={16} /></Btn>
        </div>

        {/* Results */}
        {result === "found" && (
          <div className="bg-[#141414] border border-white/8 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#CCFF00] to-[#00E5FF] flex items-center justify-center text-xl font-bold text-black shrink-0">AP</div>
              <div>
                <p className="text-base font-bold text-white">Ana Paula Ferreira</p>
                <p className="text-sm text-white/40">Lote 1 — Early Bird · 10km</p>
              </div>
              <Badge variant="pending" className="ml-auto">Pendente</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/6">
              {[["Inscrição", "#INS-0042"], ["CPF", "123.456.789-00"], ["E-mail", "ana@gmail.com"], ["Telefone", "(11) 98765-4321"]].map(([k, v]) => (
                <div key={k}><p className="text-[10px] text-white/30 uppercase tracking-wider">{k}</p><p className="text-sm font-mono text-white mt-0.5">{v}</p></div>
              ))}
            </div>
            <Btn variant="accent" size="lg" className="w-full" loading={loading} onClick={doCheckin}><Check size={18} />Confirmar check-in</Btn>
          </div>
        )}

        {result === "success" && (
          <div className="bg-[#16a34a]/10 border border-[#16a34a]/25 rounded-2xl p-6 flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#4ade80]/15 flex items-center justify-center"><CheckCircle2 size={32} className="text-[#4ade80]" /></div>
            <h3 className="text-xl font-[800] text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>CHECK-IN CONFIRMADO!</h3>
            <p className="text-sm text-white/50">Ana Paula Ferreira · #INS-0042</p>
            <Btn variant="secondary" size="sm" onClick={() => setResult(null)}><Search size={13} />Próximo atleta</Btn>
          </div>
        )}

        {result === "already" && (
          <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/25 rounded-2xl p-5 flex items-center gap-4">
            <AlertTriangle size={24} className="text-[#fbbf24] shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Check-in já realizado</p>
              <p className="text-xs text-white/40 mt-0.5">Carlos Eduardo Souza · #INS-0039 · 07:23h</p>
            </div>
          </div>
        )}

        {result === "notfound" && (
          <div className="bg-[#ff3b3b]/8 border border-[#ff3b3b]/20 rounded-2xl p-5 flex items-center gap-4">
            <XCircle size={24} className="text-[#ff6b6b] shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Participante não encontrado</p>
              <p className="text-xs text-white/40 mt-0.5">Verifique o nome ou CPF</p>
            </div>
          </div>
        )}

        {/* Recent */}
        <div className="bg-[#141414] border border-white/6 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/6"><p className="text-xs font-bold uppercase tracking-widest text-white/30">Últimos check-ins</p></div>
          {[
            { name: "Carlos Eduardo Souza", ins: "#INS-0039", time: "07:23h" },
            { name: "Rafael Alexander",     ins: "#INS-0071", time: "07:21h" },
            { name: "Marcos Oliveira",      ins: "#INS-0055", time: "07:18h" },
          ].map(({ name, ins, time }) => (
            <div key={ins} className="flex items-center gap-3 px-4 py-3 border-b border-white/4 last:border-0">
              <div className="w-7 h-7 rounded-full bg-[#4ade80]/15 flex items-center justify-center shrink-0"><Check size={13} className="text-[#4ade80]" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{name}</p>
                <p className="text-xs text-white/30 font-mono">{ins}</p>
              </div>
              <span className="text-xs text-white/30 font-mono">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: PARTICIPANTS ─────────────────────────────────────────────────────
function ParticipantsScreen({ navigate }: { navigate: NavFn }) {
  const [search, setSearch] = useState("");
  const all = [
    { name: "Ana Paula Ferreira",   email: "ana@gmail.com",       event: "Corrida das Pedras 2026", status: "checkin" as BadgeVariant,   date: "12/05" },
    { name: "Carlos Eduardo Souza", email: "carlos@gmail.com",    event: "Corrida das Pedras 2026", status: "published" as BadgeVariant, date: "14/05" },
    { name: "Fernanda Lima",        email: "fe.lima@outlook.com", event: "Triathlon Floripa",        status: "pending" as BadgeVariant,   date: "03/04" },
    { name: "Rafael Alexander",     email: "rafael@race83.com",   event: "Pedal do Vento",           status: "published" as BadgeVariant, date: "22/04" },
    { name: "Juliana Costa",        email: "ju.costa@gmail.com",  event: "Corrida das Pedras 2026", status: "cancelled" as BadgeVariant, date: "17/05" },
    { name: "Marcos Oliveira",      email: "marcos@gmail.com",    event: "Maratona do Sol",          status: "published" as BadgeVariant, date: "10/05" },
    { name: "Beatriz Souza",        email: "bia@gmail.com",       event: "Triathlon Floripa",        status: "checkin" as BadgeVariant,   date: "05/04" },
  ];
  const filtered = all.filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.email.includes(search));

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-[800] text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Participantes</h1>
          <p className="text-sm text-white/35 mt-1">{all.length} atletas em todos os eventos</p>
        </div>
        <Btn variant="secondary" size="md"><Download size={15} />Exportar CSV</Btn>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Nome, e-mail ou CPF..." className="w-full h-9 pl-8 pr-3 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#CCFF00]/40" />
        </div>
        <div className="relative">
          <select className="h-9 pl-3 pr-8 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white outline-none appearance-none">
            <option>Todos os eventos</option>
            <option>Corrida das Pedras 2026</option>
            <option>Triathlon Floripa</option>
            <option>Pedal do Vento</option>
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        </div>
        <div className="relative">
          <select className="h-9 pl-3 pr-8 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white outline-none appearance-none">
            <option>Todos os status</option>
            <option>Confirmado</option>
            <option>Pendente</option>
            <option>Check-in</option>
            <option>Cancelado</option>
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        </div>
      </div>

      <div className="bg-[#141414] border border-white/6 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-white/5">{["Atleta", "Evento", "Status", "Inscrito em", ""].map(h => <th key={h} className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/20">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} className="border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors group">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#CCFF00]/40 to-[#00E5FF]/40 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {r.name.split(" ").slice(0, 2).map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{r.name}</p>
                      <p className="text-xs text-white/35">{r.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-white/50">{r.event}</td>
                <td className="px-5 py-3.5"><Badge variant={r.status}>{statusLabel[r.status]}</Badge></td>
                <td className="px-5 py-3.5 font-mono text-xs text-white/35">{r.date}</td>
                <td className="px-5 py-3.5"><div className="opacity-0 group-hover:opacity-100 transition-opacity"><Btn variant="ghost" size="sm" className="!h-7 !px-2 !text-xs"><Mail size={12} />E-mail</Btn></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── SCREEN: FINANCEIRO ───────────────────────────────────────────────────────
function FinanceiroScreen({ navigate }: { navigate: NavFn }) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-[800] text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Financeiro</h1>
          <p className="text-sm text-white/35 mt-1">Relatório de receita e repasses</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select className="h-9 pl-3 pr-8 rounded-xl bg-[#1a1a1a] border border-white/8 text-sm text-white outline-none appearance-none">
              <option>Todos os eventos</option>
              <option>Corrida das Pedras 2026</option>
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
          </div>
          <Btn variant="secondary" size="md"><Download size={15} />Exportar extrato</Btn>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Receita bruta" value="R$ 57.338" delta="+18% vs maio" icon={TrendingUp} color="lime" />
        <MetricCard label="Taxa plataforma" value="R$ 1.148" delta="2% do bruto" icon={Hash} color="orange" />
        <MetricCard label="Valor líquido" value="R$ 56.190" icon={DollarSign} color="blue" />
        <MetricCard label="A receber" value="R$ 56.190" delta="Após o evento" icon={CreditCard} color="cyan" />
      </div>

      {/* Chart placeholder */}
      <div className="bg-[#141414] border border-white/6 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-white">Inscrições ao longo do tempo</h3>
          <div className="flex gap-1 bg-[#1a1a1a] p-1 rounded-lg">
            {["7d", "30d", "3m"].map(p => (
              <button key={p} className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${p === "30d" ? "bg-[#CCFF00] text-black" : "text-white/30 hover:text-white"}`}>{p}</button>
            ))}
          </div>
        </div>
        <div className="h-36 flex items-end gap-1 px-2">
          {[12,18,8,22,35,28,41,30,47,38,52,45,61,58,72,65,80,69,87,92,78,95,88,104,98,112,124,118,132,147].map((v, i) => (
            <div key={i} className="flex-1 rounded-t-sm transition-all hover:opacity-80" style={{ height: `${(v/147)*100}%`, background: i > 24 ? "#CCFF00" : "rgba(204,255,0,0.3)" }} />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-white/20 font-mono px-2">
          <span>01 mai</span><span>15 mai</span><span>25 mai</span>
        </div>
      </div>

      {/* Repasses */}
      <div className="bg-[#141414] border border-white/6 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/6"><h3 className="text-sm font-bold text-white">Repasses</h3></div>
        <div className="bg-[#CCFF00]/8 border-b border-[#CCFF00]/15 px-5 py-3 flex items-center gap-2">
          <Info size={13} className="text-[#CCFF00]" />
          <p className="text-xs text-white/55">Os repasses são liberados 5 dias úteis após a realização do evento.</p>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-white/5">{["Evento", "Data", "Bruto", "Taxa", "Líquido", "Status"].map(h => <th key={h} className="text-left px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white/20">{h}</th>)}</tr></thead>
          <tbody>
            {[
              { event: "Corrida das Pedras 2026", date: "28/08/2026", bruto: "R$ 57.338", taxa: "R$ 1.148", liq: "R$ 56.190", status: "pending" as BadgeVariant },
              { event: "Triathlon Floripa",        date: "17/10/2026", bruto: "R$ 37.800", taxa: "R$ 756",   liq: "R$ 37.044", status: "draft" as BadgeVariant },
            ].map((r, i) => (
              <tr key={i} className="border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium text-white">{r.event}</td>
                <td className="px-5 py-3.5 font-mono text-xs text-white/40">{r.date}</td>
                <td className="px-5 py-3.5 font-mono text-sm text-white">{r.bruto}</td>
                <td className="px-5 py-3.5 font-mono text-sm text-[#ff6b6b]">-{r.taxa}</td>
                <td className="px-5 py-3.5 font-mono text-sm text-[#4ade80] font-bold">{r.liq}</td>
                <td className="px-5 py-3.5"><Badge variant={r.status}>{r.status === "pending" ? "Pendente" : "A receber"}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── SCREEN: DESIGN SYSTEM LINK ───────────────────────────────────────────────
function DesignSystemScreen({ navigate }: { navigate: NavFn }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#CCFF00]/15 flex items-center justify-center mx-auto mb-4">
          <Layers size={28} className="text-[#CCFF00]" />
        </div>
        <h1 className="text-4xl font-[900] text-white mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>DESIGN SYSTEM</h1>
        <p className="text-sm text-white/35 mb-6">O design system completo está documentado no kit de componentes.</p>
        <Btn variant="primary" onClick={() => navigate("journey-map")}><ArrowLeft size={14} />Voltar ao mapa de jornadas</Btn>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("journey-map");
  const navigate: NavFn = (s) => setScreen(s);

  const adminScreens: Screen[] = ["dashboard", "events-list", "events-new", "events-detail", "participants", "financeiro"];
  const isAdmin = adminScreens.includes(screen);

  if (isAdmin) {
    return (
      <AdminLayout current={screen} navigate={navigate}>
        {screen === "dashboard"     && <DashboardScreen navigate={navigate} />}
        {screen === "events-list"   && <EventsListScreen navigate={navigate} />}
        {screen === "events-new"    && <CreateEventScreen navigate={navigate} />}
        {screen === "events-detail" && <EventDetailScreen navigate={navigate} />}
        {screen === "participants"  && <ParticipantsScreen navigate={navigate} />}
        {screen === "financeiro"    && <FinanceiroScreen navigate={navigate} />}
      </AdminLayout>
    );
  }

  return (
    <>
      {screen === "journey-map"   && <JourneyMapScreen navigate={navigate} />}
      {screen === "public-event"  && <PublicEventScreen navigate={navigate} />}
      {screen === "confirmation"  && <ConfirmationScreen navigate={navigate} />}
      {screen === "login"         && <LoginScreen navigate={navigate} />}
      {screen === "onboarding"    && <OnboardingScreen navigate={navigate} />}
      {screen === "checkin"       && <CheckinScreen navigate={navigate} />}
      {screen === "design-system" && <DesignSystemScreen navigate={navigate} />}
    </>
  );
}
