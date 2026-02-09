// src/shared/errors/appError.ts
export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        super(message); // Chama o construtor da classe Error pai
        this.statusCode = statusCode;

        // Pulo do gato para TypeScript reconhecer o tipo correto
        Object.setPrototypeOf(this, AppError.prototype);
    }
}