import React from 'react';
import { InputGroup, Label, TextField } from '@heroui/react';
import type { LucideIcon } from 'lucide-react';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  icon?: LucideIcon;
};

const InputField = ({
  label,
  placeholder,
  icon: Icon,
  ...props
}: InputProps) => {
  return (
    <TextField>
      <Label>{label}</Label>
      <InputGroup>
        {Icon && (
          <InputGroup.Prefix>
            <Icon />
          </InputGroup.Prefix>
        )}
        <InputGroup.Input placeholder={placeholder} {...props} />
      </InputGroup>
    </TextField>
  );
};

export default InputField;
