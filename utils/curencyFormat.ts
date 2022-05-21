export const defaultOptions = {
  significantDigits: '',
  thousandsSeparator: ', ',
  decimalSeparator: '',
  symbol: '',
};

export const currencyFormatter = (value: any, options: any) => {
  console.log('value; ', value);
  if (typeof value !== 'number') value = 0.0;
  options = { ...defaultOptions, ...options };
  value = value?.toFixed(options.significantDigits);

  const [currency, decimal] = value.split('.');
  return `${currency.replace(/\B(?=(\d{3})+(?!\d))/g, options.thousandsSeparator)}${
    options.decimalSeparator
  }${decimal || ''}${options.symbol}`;
};
