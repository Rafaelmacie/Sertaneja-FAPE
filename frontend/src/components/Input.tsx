import type { InputHTMLAttributes, ElementType } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ElementType; // Tipo para o ícone
}

export function Input({ icon: Icon, className = '', ...props }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        className={`w-full bg-gray-200 text-gray-900 placeholder-gray-600 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-800 transition-all ${className}`}
        {...props}
      />
      {Icon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Icon size={20} />
        </div>
      )}
    </div>
  );
}