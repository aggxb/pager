import InputField from './InputField';
import { User } from 'lucide-react';
import type { Refeicao } from '../types/types';
import SelectField from './SelectField';
import { Button } from '@heroui/react';

const options: Refeicao[] = [
  { id: 1, descricao: 'Hamburger', preco: 25 },
  { id: 2, descricao: 'Pizza', preco: 40 },
  { id: 3, descricao: 'Hot-Dog', preco: 20 },
];

const FormSection = () => {
  return (
    <form className="flex items-end justify-center gap-10">
      <div className="flex items-center gap-3">
        <InputField
          label="Nome do Cliente"
          placeholder="Ex. Gabriel"
          icon={User}
        />
        <SelectField
          label="Refeições"
          placeholder="Selecione uma refeição"
          options={options}
        />
      </div>
      <Button aria-label="Registrar Pedido">Registrar Pedido</Button>
    </form>
  );
};

export default FormSection;
