import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-xl bg-[#1a1a1a] border border-white/8 px-3 text-sm text-white placeholder:text-white/20 transition-all outline-none focus:border-[#ccff00]/60 focus:ring-2 focus:ring-[#ccff00]/12 disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'

export { Input }
