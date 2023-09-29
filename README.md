# intl-currency-formatting
The library provides a set of functions for formatting monetary amounts and supports a variety of options for customizing the output.

The library relies on the `Intl.NumberFormat` object to handle the differences in currency formatting between different locales. This object is built into JavaScript and it implements ECMAScript Internationalization API specification.

## Usage
### `formatAsCurrency` Function
The function is a factory function that takes a config object and returns a formatter function for formatting a monetary amount as a string representing the currency value.
```typescript
import { formatAsCurrency, CurrencyFormatConfig, Formatter, Amount } from 'intl-currency-formatting';

const config: CurrencyFormatConfig = {
  showCents: true,
  currency: 'EUR',
  localization: 'de-DE'
};

const formatter: Formatter = formatAsCurrency(config);
const amount: Amount = 9999.99
const formattedAmount: string = formatter(amount);

console.log(formattedAmount);
// Output: 9.999,99 €
```
The `formatAsCurrency` function provides default handling for `null`, `undefined`, and `NaN` values.

When the formatter function created by `formatAsCurrency` is called with one of these values as the `amount` parameter, it returns a default value of `"N/A"`.

However, the default value can be customized by providing a `naValue` option in the config object passed to `formatAsCurrency`. This allows you to specify a different value to be returned for `null`, `undefined`, or `NaN` amounts.

Here's an example that demonstrates the default handling:
```typescript
import { formatAsCurrency, CurrencyFormatConfig, Formatter } from 'intl-currency-formatting';

const defaultFormatter: Formatter = formatAsCurrency({})
console.log(defaultFormatter(null));
// Output: "N/A"

const config: CurrencyFormatConfig = {
  naValue: '-'
};
const customFormatter: Formatter = formatAsCurrency(config);
console.log(formatter(null));
// Output: -
```
### `formatAsCurrencyWithStrictValidation` Function
The function is similar to the `formatAsCurrency` function, but with an additional strict validation step. It performs strict validation on the `amount` parameter to ensure that it is a valid number, if it's not it throws an error.
```typescript
import { formatAsCurrencyWithStrictValidation, Formatter, Amount } from 'intl-currency-formatting';

const formatter: Formatter = formatAsCurrencyWithStrictValidation({})
const amount: Amount = null;
try {
  const formattedAmount: string = formatter(amount);
  console.log(formattedAmount);
} catch (error) {
  console.error('Error:', error.message); // Output: Error: Invalid amount provided: "null"
}
```
### `formatFromCents` Function
Same as `formatAsCurrency`, but `amount` is in cents
```typescript
import { formatFromCents, Formatter, Amount } from 'intl-currency-formatting';

const formatter: Formatter = formatFromCents({});
const amount: Amount = 123456;

const formattedAmount: string = formatter(amount);
console.log(formattedAmount);
// Output: $1,234.56
```
### `formatFromCentsWithStrictValidation` Function
Same as `formatAsCurrencyWithStrictValidation` but `amount` is in cents

## Configuration
The `CurrencyFormatConfig` is used to configure the formatting behavior of the currency formatter functions in the library. It has the following properties:

- `showCents` (boolean, optional): Specifies whether to include cents in the formatted output. If set to `true`, the cents will be included. If set to `false`, the cents will be omitted and the result will be rounded to the nearest integer. The default value is `true`.

- `numberOfCentDigits` (number, optional): Specifies the number of decimal places to display for cents. This property allows you to customize the precision of the cents. For example, if set to `2`, the cents will be displayed with two decimal places (e.g., 1.23). The default value is `2`.

- `naValue` (string, optional): Specifies the default value to be displayed when the amount is `null` or `undefined`. This property allows you to customize the placeholder value for missing or unavailable amounts. The default value is `"N/A"`.

- `currency` (string, optional): Specifies the currency symbol or code to be used in the formatted output. This property allows you to customize the currency symbol or code according to your requirements. It takes same values as `Intl.FormatNumber` [currency options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#parameters). The default value is `"USD"`.

- `localization` (string, optional): Specifies the locale to be used for formatting the currency. This property allows you to customize the formatting based on different locales. It takes same values as `Intl.FormatNumber` [locale options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#parameters). The default value is `"en-US"`.

The default config object is used when one is not provided or some properties are omitted.
```typescript
const config: CurrencyFormatConfig = {
  showCents: true,
  numberOfCentDigits: 2,
  naValue: "N/A",
  currency: "USD",
  localization: "en-US",
};
```

## Available types
### `Amount` Type
The type represents a monetary amount and can have one of the following three values.
```typescript
export type Amount = number | null | undefined
```
### `Formatter` Type
The type represents a function that takes an `Amount` as input and returns a formatted string representing the monetary amount. It is used to format monetary amounts according to a specific configuration.

Here's the definition of the Formatter type:
```typescript
type Formatter = (amount: Amount) => string;
```
### `FormatterFactory` Type
This is the type of all factory functions. It represents a function that creates a `Formatter` based on a given configuration.
```typescript
type FormatterFactory = (config: CurrencyFormatConfig) => Formatter;
```

## Errors
### `NotANumberError` Errror
The error is thrown in `Formatters` with strict validation when the `amount` parameter passed to the formatting functions is not a number. The error message includes the value of the invalid amount.

For example
```typescript
import { formatAsCurrencyWithStrictValidation, NotANumberError } from 'intl-currency-formatting';

const amount = null;

try {
  const formattedAmount = formatAsCurrencyWithStrictValidation({})(amount);
  console.log(formattedAmount);
} catch (error) {
  if (error instanceof NotANumberError) {
    console.error('Error:', error.message); // Output: Error: Invalid amount provided: "null"
  } else {
    console.error('An error occurred:', error.message);
  }
}
```