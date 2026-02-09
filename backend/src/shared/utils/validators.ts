export class Validators {
    static isValidName(nome: string): boolean {
        // Mínimo 3 chars, apenas letras e acentos
        return nome.length >= 3 && /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/.test(nome);
    }

    static isValidEmail(email: string): boolean {
        // Formato: a@b.c
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static isValidPhone(phone: string): boolean {
        // Aceita apenas números, entre 10 e 11 dígitos
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length >= 10 && cleanPhone.length <= 11;
    }

    static isValidPassword(password: string): boolean {
        // 8 chars, 1 Maiúscula, 1 Minúscula, 1 Número
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/.test(password);
    }

    static isValidCPF(cpf: string): boolean {
        // 11 dígitos, precisa ter a fórmula de cpf válida
        const cleanCPF = cpf.replace(/[^\d]+/g, '');
        if (cleanCPF.length !== 11 || !!cleanCPF.match(/(\d)\1{10}/)) return false;

        const cpfArray = cleanCPF.split('').map(el => +el);
        const rest = (count: number) => (cpfArray.slice(0, count - 12)
            .reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10;

        return rest(10) === cpfArray[9] && rest(11) === cpfArray[10];
    }
}