import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'lime'

const styles: Record<BadgeVariant, string> = {
  default: 'bg-white/8 text-white/55 border-white/10',
  success: 'bg-[#16a34a]/15 text-[#4ade80] border-[#16a34a]/20',
  warning: 'bg-[#f59e0b]/15 text-[#fbbf24] border-[#f59e0b]/20',
  danger:  'bg-[#ff3b3b]/15 text-[#ff6b6b] border-[#ff3b3b]/20',
  info:    'bg-[#6366f1]/15 text-[#a5b4fc] border-[#6366f1]/20',
  lime:    'bg-[#ccff00]/15 text-[#ccff00] border-[#ccff00]/20',
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border',
        styles[variant],
        className,
      )}
      {...props}
    />
  )
}
