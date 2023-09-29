import {
    formatAsCurrency,
    formatAsCurrencyWithStrictValidation,
    formatFromCents,
    formatFromCentsWithStrictValidation,
} from "../src"

test("formatAsCurrency", () => {
    // testing NaNs
    expect(formatAsCurrency({})(null)).toEqual("N/A")
    expect(formatAsCurrency({ naValue: "$0" })(undefined)).toEqual("$0")
    expect(formatAsCurrency({ naValue: "-" })(NaN)).toEqual("-")

    // testing zero dollars
    expect(formatAsCurrency({ showCents: false })(0)).toEqual("$0")
    expect(formatAsCurrency({ numberOfCentDigits: 1 })(0)).toEqual("$0.0")
    expect(formatAsCurrency({})(0)).toEqual("$0.00")
    expect(formatAsCurrency({ numberOfCentDigits: 3 })(0)).toEqual("$0.000")
    expect(formatAsCurrency({ numberOfCentDigits: 4 })(0)).toEqual("$0.0000")

    // testing rounding
    expect(formatAsCurrency({ showCents: false })(0.0001)).toEqual("$0")
    expect(formatAsCurrency({ numberOfCentDigits: 1 })(0.0001)).toEqual("$0.0")
    expect(formatAsCurrency({})(0.0001)).toEqual("$0.00")
    expect(formatAsCurrency({ numberOfCentDigits: 3 })(0.0001)).toEqual("$0.000")
    expect(formatAsCurrency({ numberOfCentDigits: 4 })(0.0001)).toEqual("$0.0001")
    expect(formatAsCurrency({ showCents: false })(0.0009)).toEqual("$0")
    expect(formatAsCurrency({ numberOfCentDigits: 1 })(0.0009)).toEqual("$0.0")
    expect(formatAsCurrency({})(0.0009)).toEqual("$0.00")
    expect(formatAsCurrency({ numberOfCentDigits: 3 })(0.0009)).toEqual("$0.001")
    expect(formatAsCurrency({ numberOfCentDigits: 4 })(0.0009)).toEqual("$0.0009")
    expect(formatAsCurrency({ showCents: false })(0.4)).toEqual("$0")
    expect(formatAsCurrency({ numberOfCentDigits: 1 })(0.4)).toEqual("$0.4")
    expect(formatAsCurrency({})(0.4)).toEqual("$0.40")
    expect(formatAsCurrency({ showCents: false })(0.5)).toEqual("$1")
    expect(formatAsCurrency({ numberOfCentDigits: 1 })(0.5)).toEqual("$0.5")
    expect(formatAsCurrency({})(0.5)).toEqual("$0.50")

    // testing tens
    expect(formatAsCurrency({})(12.34)).toEqual("$12.34")

    // testing hundreds
    expect(formatAsCurrency({})(123.45)).toEqual("$123.45")

    // testing thousands
    expect(formatAsCurrency({})(1234.56)).toEqual("$1,234.56")

    // testing tens of thousands
    expect(formatAsCurrency({})(12345.67)).toEqual("$12,345.67")

    // testing hundreds of thousands
    expect(formatAsCurrency({})(123456.78)).toEqual("$123,456.78")

    // testing millions
    expect(formatAsCurrency({})(1234567.89)).toEqual("$1,234,567.89")

    // testing tens of millions
    expect(formatAsCurrency({})(12345678.90)).toEqual("$12,345,678.90")

    // testing hundreds of millions
    expect(formatAsCurrency({})(123456789.0)).toEqual("$123,456,789.00")

    // testing billions
    expect(formatAsCurrency({})(1234567890)).toEqual("$1,234,567,890.00")

    // testing other currencies and localizations
    expect(formatAsCurrency({ currency: "EUR", localization: "de-DE" })(1234.56)).toEqual("1.234,56 €")
    expect(formatAsCurrency({ currency: "EUR", localization: "en-US" })(1234.56)).toEqual("€1,234.56")
    expect(formatAsCurrency({ currency: "JPY", localization: "ja-JP" })(1234.56)).toEqual("￥1,234.56")
    expect(formatAsCurrency({ currency: "JPY", localization: "ja-JP", showCents: false })(1234.56)).toEqual("￥1,235")
})

test("formatAsCurrencyWithStrictValidation", () => {
    expect(() => formatAsCurrencyWithStrictValidation({})(null)).toThrowError("Amount is not a number: null")
    expect(formatAsCurrencyWithStrictValidation({})(12345.67)).toEqual("$12,345.67")
    expect(formatAsCurrencyWithStrictValidation({ showCents: false })(12345.67)).toEqual("$12,346")
    expect(formatAsCurrencyWithStrictValidation({ currency: "EUR", localization: "de-DE" })(1234.56)).toEqual("1.234,56 €")
})

test("formatFromCents", () => {
    // testing NaNs
    expect(formatFromCents({})(null)).toEqual("N/A")
    expect(formatFromCents({})(undefined)).toEqual("N/A")
    expect(formatFromCents({})(NaN)).toEqual("N/A")

    // testing zero cents
    expect(formatFromCents({ showCents: false })(0)).toEqual("$0")
    expect(formatFromCents({ numberOfCentDigits: 1 })(0)).toEqual("$0.0")
    expect(formatFromCents({})(0)).toEqual("$0.00")
    expect(formatFromCents({ numberOfCentDigits: 3 })(0)).toEqual("$0.000")
    expect(formatFromCents({ numberOfCentDigits: 4 })(0)).toEqual("$0.0000")

    // testing one cent
    expect(formatFromCents({ showCents: false })(1)).toEqual("$0")
    expect(formatFromCents({ numberOfCentDigits: 1 })(1)).toEqual("$0.0")
    expect(formatFromCents({})(1)).toEqual("$0.01")
    expect(formatFromCents({numberOfCentDigits: 3})(1)).toEqual("$0.010")
    expect(formatFromCents({numberOfCentDigits: 4})(1)).toEqual("$0.0100")

    // testing tens of cents
    expect(formatFromCents({showCents: false})(49)).toEqual("$0")
    expect(formatFromCents({numberOfCentDigits: 1})(49)).toEqual("$0.5")
    expect(formatFromCents({})(49)).toEqual("$0.49")
    expect(formatFromCents({numberOfCentDigits: 3})(49)).toEqual("$0.490")
    expect(formatFromCents({numberOfCentDigits: 4})(49)).toEqual("$0.4900")
    expect(formatFromCents({showCents: false})(99)).toEqual("$1")
    expect(formatFromCents({numberOfCentDigits: 1})(99)).toEqual("$1.0")
    expect(formatFromCents({})(99)).toEqual("$0.99")
    expect(formatFromCents({numberOfCentDigits: 3})(99)).toEqual("$0.990")
    expect(formatFromCents({numberOfCentDigits: 4})(99)).toEqual("$0.9900")

    // testing ones
    expect(formatFromCents({})(123)).toEqual("$1.23")
    expect(formatFromCents({showCents: false})(123)).toEqual("$1")

    // testing tens
    expect(formatFromCents({})(1234)).toEqual("$12.34")

    // testing hundreds
    expect(formatFromCents({})(12345)).toEqual("$123.45")

    // testing thousands
    expect(formatFromCents({})(123456)).toEqual("$1,234.56")

    // testing tens of thousands
    expect(formatFromCents({})(1234567)).toEqual("$12,345.67")

    // testing hundreds of thousands
    expect(formatFromCents({})(12345678)).toEqual("$123,456.78")

    // testing millions
    expect(formatFromCents({})(123456789)).toEqual("$1,234,567.89")

    // testing tens of millions
    expect(formatFromCents({})(1234567890)).toEqual("$12,345,678.90")

    // testing other currencies and localizations
    expect(formatFromCents({currency: "EUR", localization: "de-DE"})(123456)).toEqual("1.234,56 €")
    expect(formatFromCents({currency: "EUR", localization: "en-US"})(123456)).toEqual("€1,234.56")
    expect(formatFromCents({currency: "JPY", localization: "ja-JP"})(123456)).toEqual("￥1,234.56")
    expect(formatFromCents({currency: "JPY", localization: "ja-JP", showCents: false})(123456)).toEqual("￥1,235")
})

test("formatFromCentsWithStrictValidation", () => {
    expect(() => formatFromCentsWithStrictValidation({})(null)).toThrowError("Amount is not a number: null")
    expect(() => formatFromCentsWithStrictValidation({})(undefined)).toThrowError("Amount is not a number: undefined")
    expect(() => formatFromCentsWithStrictValidation({})(NaN,)).toThrowError("Amount is not a number: NaN")
    expect(formatFromCentsWithStrictValidation({})(123)).toEqual("$1.23")
    expect(formatFromCentsWithStrictValidation({showCents: false})(123)).toEqual("$1")
    const config = { currency: "EUR", localization: "de-DE", showCents: false }
    expect(formatFromCentsWithStrictValidation(config)(123456)).toEqual("1.235 €")
})