export interface CurrencyFormatConfig {
    showCents?: boolean;
    numberOfCentDigits?: number;
    naValue?: string;
    currency?: string;
    localization?: string;
}
export type Amount = number | null | undefined;
export type Formatter = (amount: Amount) => string;
export type FormatterFactory = (config: CurrencyFormatConfig) => Formatter;
export declare class NotANumberError extends Error {
    constructor(amount: Amount);
}
export declare const formatAsCurrency: FormatterFactory;
export declare const formatAsCurrencyWithStrictValidation: FormatterFactory;
export declare const formatFromCents: FormatterFactory;
export declare const formatFromCentsWithStrictValidation: FormatterFactory;
//# sourceMappingURL=index.d.ts.map