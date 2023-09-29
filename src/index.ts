export interface CurrencyFormatConfig {
    showCents?: boolean;
    numberOfCentDigits?: number;
    naValue?: string;
    currency?: string;
    localization?: string;
}

interface IntlConfig {
    style: string;
    currency: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}

export type Amount = number | null | undefined

export type Formatter = (amount: Amount) => string

export type FormatterFactory = (config: CurrencyFormatConfig) => Formatter

type AmountTransformation = (amount: number) => number

const defaultConfig: Required<CurrencyFormatConfig> = {
    showCents: true,
    numberOfCentDigits: 2,
    naValue: "N/A",
    currency: "USD",
    localization: "en-US",
}

const numberOfCentsInBasicMonetaryUnit = 100

export class NotANumberError extends Error {
    constructor(amount: Amount) {
        super(`Amount is not a number: ${String(amount)}`)
        this.name = "NotANumberError"
    }
}

const centsToBasicMonetaryUnit = (amount: number): number => {
    return amount / numberOfCentsInBasicMonetaryUnit
}

const formatWithValidation = (raiseErrorForNaN: boolean, at?: AmountTransformation): FormatterFactory => {
    const inner = (config: CurrencyFormatConfig = defaultConfig) => {
        return (amount: Amount) => {
            const configWithDefaults = { ...defaultConfig, ...config }

            if (typeof amount !== "number" || isNaN(amount)) {
                if (raiseErrorForNaN) {
                    throw new NotANumberError(amount)
                }
                return configWithDefaults.naValue
            }

            if (at) {
                amount = at(amount)
            }
            return format(amount, configWithDefaults)
        }
    }
    return inner
}

const format = (amount: number, config: Required<CurrencyFormatConfig> = defaultConfig): string => {
    const intlConfig: IntlConfig = {
        style: "currency",
        currency: config.currency,
    }
    if (!config.showCents) {
        intlConfig.maximumFractionDigits = 0
        intlConfig.minimumFractionDigits = 0
    } else if (config.numberOfCentDigits) {
        intlConfig.maximumFractionDigits = Math.min(config.numberOfCentDigits, 20)
        intlConfig.minimumFractionDigits = Math.min(config.numberOfCentDigits, 20)
    }
    const printer = Intl.NumberFormat(config.localization, intlConfig)
    return printer.format(amount)
}

// Format currency variants
export const formatAsCurrency: FormatterFactory = formatWithValidation(false)
export const formatAsCurrencyWithStrictValidation: FormatterFactory = formatWithValidation(true)

// Format currency from cents variants
export const formatFromCents: FormatterFactory = formatWithValidation(false, centsToBasicMonetaryUnit)
export const formatFromCentsWithStrictValidation: FormatterFactory = formatWithValidation(true, centsToBasicMonetaryUnit)
