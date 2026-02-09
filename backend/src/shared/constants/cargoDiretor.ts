// Tipo para reconhecimento no Typescript
export type CargoDiretor = 'ADMINISTRATIVO' | 'FINANCEIRO' | 'EXECUTIVO';

// Objeto constante
export const CargoDiretor = {
    ADMINISTRATIVO: 'ADMINISTRATIVO',
    FINANCEIRO: 'FINANCEIRO',
    EXECUTIVO: 'EXECUTIVO'
} as const;