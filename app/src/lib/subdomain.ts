// Detecta qual camada renderizar com base no subdomínio
// Produção: plataforma.com.br / app.plataforma.com.br / {slug}.plataforma.com.br
// Desenvolvimento: controla via VITE_APP_MODE ou subdomínio local

export type AppMode = 'landing' | 'admin' | 'portal'

export function detectAppMode(): { mode: AppMode; slug?: string } {
  // Em dev, VITE_APP_MODE permite testar cada camada sem subdomínio real
  const envMode = import.meta.env.VITE_APP_MODE as AppMode | undefined
  if (envMode) return { mode: envMode, slug: import.meta.env.VITE_DEV_SLUG }

  const hostname = window.location.hostname
  const rootDomain = import.meta.env.VITE_ROOT_DOMAIN ?? 'plataforma.com.br'

  if (hostname === rootDomain || hostname === `www.${rootDomain}`) {
    return { mode: 'landing' }
  }

  if (hostname === `app.${rootDomain}`) {
    return { mode: 'admin' }
  }

  // Qualquer outro subdomínio é um portal de organizador
  const slug = hostname.replace(`.${rootDomain}`, '')
  return { mode: 'portal', slug }
}
