export const formatCurrencyBRL = (value: string | number) => {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
