export const formatLocalDateTime = (localDateTime: string) => {
  const dateAndTime = localDateTime.split('T');
  const [year, month, day] = dateAndTime[0].split('-');

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  ).toLocaleDateString('pt-BR');
  const time = dateAndTime[1].slice(0, 5);

  return `${date} - ${time}`;
};
