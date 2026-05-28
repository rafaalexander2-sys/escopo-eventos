import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-150 cursor-pointer select-none shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97]',
  {
    variants: {
      variant: {
        default:     'bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:bg-[#d9ff33]',
        accent:      'bg-[#039eff] text-black shadow-[0_0_20px_rgba(3,158,255,0.2)] hover:bg-[#38b2ff] font-bold',
        secondary:   'bg-[#1a1a1a] text-white border border-white/10 hover:bg-[#242424]',
        outline:     'bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5',
        ghost:       'bg-transparent text-white/60 hover:text-white hover:bg-white/6',
        destructive: 'bg-[#ff3b3b]/10 text-[#ff3b3b] border border-[#ff3b3b]/20 hover:bg-[#ff3b3b]/20',
        link:        'text-[#ccff00] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 text-sm rounded-xl',
        sm:      'h-8 px-3 text-xs rounded-lg',
        lg:      'h-11 px-6 text-base rounded-xl',
        icon:    'h-9 w-9 rounded-xl',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
