import type { ComponentProps, ElementType } from 'react';
import { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  icon?: ElementType;
  rightElement?: React.ReactNode;
  error?: string | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, error, rightElement, className, ...props }, ref) => {

    const hasRightContent = Icon || rightElement;

    return (
      // Adicionei 'mb-6' aqui. Como o erro agora é absoluto e fica embaixo,
      // precisamos garantir que sempre haja um espaço reservado entre os inputs
      // para o erro não ficar em cima do campo de baixo.
      <div className="relative w-full mb-6">
        <div className="relative flex items-center">

          <input
            ref={ref}
            {...props}
            placeholder=" "
            className={`
              peer w-full rounded-xl border bg-gray-50 px-4 pt-5 pb-2 text-gray-900 outline-none transition-all
              placeholder-shown:pt-3.5 placeholder-shown:pb-3.5
              focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:bg-white
              pl-4
              ${hasRightContent ? 'pr-12' : 'pr-4'}
              ${error ? 'border-red-500 bg-red-50 focus:ring-red-100' : 'border-gray-200'}
              ${className}
            `}
          />

          <label
            className={`
              absolute left-4 top-1 text-xs text-gray-500 transition-all duration-200 select-none pointer-events-none
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
              peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-600
              ${error ? 'text-red-500 peer-focus:text-red-500' : ''}
            `}
          >
            {label}
          </label>

          {hasRightContent && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-gray-400">
              {rightElement ? (
                rightElement
              ) : (
                Icon && <Icon size={20} className="pointer-events-none" />
              )}
            </div>
          )}
        </div>

        {/* MUDANÇA AQUI:
            1. Adicionado 'absolute' para tirar do fluxo (não empurra nada).
            2. 'top-full' e 'mt-1' para posicionar logo abaixo do input.
        */}
        {error && (
          <div className="absolute top-full left-0 flex items-center gap-1 mt-1 text-xs text-red-500 animate-fadeIn ml-1 pointer-events-none">
            <AlertCircle size={12} />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';