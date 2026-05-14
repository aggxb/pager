import React from 'react';
import { Select, Label, ListBox } from '@heroui/react';
import type { Refeicao } from '../types/types';
import { formatCurrencyBRL } from '../util/currencyFormatter';

type SelectProps = React.ComponentProps<'select'> & {
  label?: string;
  placeholder: string;
  options: Refeicao[];
  value: string | number | null;
  onChange: (value: string | number) => void;
};

const SelectField = ({
  label,
  placeholder,
  options,
  value,
  onChange,
}: SelectProps) => {
  const handleChange = (selectedValue: React.Key | null) => {
    if (selectedValue === null) return;

    const selectedOption = options.find(
      (option) => option.id === selectedValue,
    );

    if (selectedOption) onChange(selectedOption.id);
  };

  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="min-w-40"
    >
      {label && <Label>{label}</Label>}
      <Select.Trigger>
        <Select.Value className="flex gap-3 items-center" />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map(({ id, descricao, preco }) => (
            <ListBox.Item
              key={id}
              id={id}
              textValue={descricao}
              className="flex gap-2 items-center pr-10"
            >
              {descricao} - {formatCurrencyBRL(preco)}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default SelectField;
