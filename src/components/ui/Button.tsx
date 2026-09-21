import { Link } from 'react-router-dom';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm',
  secondary:
    'bg-charcoal-900 text-white hover:bg-charcoal-800 active:bg-charcoal-950 shadow-sm',
  outline:
    'border border-charcoal-300 text-charcoal-700 hover:border-charcoal-900 hover:text-charcoal-900 bg-white/0 hover:bg-white',
  ghost:
    'text-charcoal-700 hover:bg-charcoal-100 hover:text-charcoal-900',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#1da851] active:bg-[#16803d] shadow-sm',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-sm rounded-xl gap-2',
  lg: 'px-8 py-4 text-base rounded-xl gap-2.5',
};

const baseClasses =
  'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed';

interface LinkButtonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  to: string;
  onClick?: () => void;
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  to?: undefined;
}

export function Button({ variant = 'primary', size = 'md', children, className = '', to, ...rest }: LinkButtonProps | ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (to !== undefined) {
    return (
      <Link to={to} className={classes} onClick={(rest as LinkButtonProps).onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
