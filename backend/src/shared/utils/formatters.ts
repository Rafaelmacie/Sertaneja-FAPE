export class Formatters {
    static toTitleCase(text: string): string {
        return text.trim().toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
    }

    static onlyNumbers(text: string): string {
        return text.replace(/\D/g, '');
    }

    static lowerTrim(text: string): string {
        return text.trim().toLowerCase();
    }
}