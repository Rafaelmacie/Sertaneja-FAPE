import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg uppercase tracking-wide transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}