import React from 'react';
import { Select, Label, ListBox } from '@heroui/react';
import type { Refeicao } from '../types/types';

type SelectProps = React.ComponentProps<'select'> & {
  label?: string;
  placeholder: string;
  options: Refeicao[];
};

const SelectField = ({ label, placeholder, options }: SelectProps) => {
  return (
    <Select placeholder={placeholder} className="min-w-40">
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
              className="flex gap-2 items-center"
            >
              {descricao} - R$ {preco}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default SelectField;
