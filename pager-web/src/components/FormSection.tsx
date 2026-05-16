import InputField from './InputField';
import { User } from 'lucide-react';
import SelectField from './SelectField';
import { Button, Form, toast } from '@heroui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pedidoService } from '../service/pedido';
import { useForm } from '@tanstack/react-form';
import z from 'zod';

const pedidoSchema = z.object({
  nomeCliente: z
    .string()
    .min(3, 'O nome do cliente deve ter, no mínimo, 3 caracteres'),
  refeicaoId: z.number().gt(0, 'Selecione uma opção'),
});

type PedidoPost = z.infer<typeof pedidoSchema>;

const pedidoDefault: PedidoPost = {
  nomeCliente: '',
  refeicaoId: 0,
};

const FormSection = () => {
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ['refeicoes'],
    queryFn: pedidoService.getRefeicoes,
  });

  const mutation = useMutation({
    mutationKey: ['pedido'],
    mutationFn: pedidoService.postPedido,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
      queryClient.invalidateQueries({ queryKey: ['pedido'] });
      form.reset();
    },
  });

  const form = useForm({
    defaultValues: pedidoDefault,
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.handleSubmit();
    toast.success('Pedido registrado com sucesso');
  };

  return (
    <Form
      className="grid items-center justify-center gap-5"
      onSubmit={handleSubmit}
    >
      <div className="flex items-start gap-3">
        <form.Field
          name="nomeCliente"
          children={(field) => {
            const showError = field.state.meta.errors.length > 0;

            return (
              <div className="grid gap-1">
                <InputField
                  id="nomeCliente"
                  label="Nome do Cliente"
                  placeholder="Ex. Gabriel"
                  icon={User}
                  value={field.state.value}
                  onChange={({ target }) => field.handleChange(target.value)}
                  onBlur={field.handleBlur}
                />
                {showError && (
                  <span className="text-danger text-xs">
                    {field.state.meta.errors[0]?.message}
                  </span>
                )}
              </div>
            );
          }}
          validators={{
            onBlur: pedidoSchema.shape['nomeCliente'],
            onChange: pedidoSchema.shape['nomeCliente'],
          }}
        />
        <form.Field
          name="refeicaoId"
          children={(field) => (
            <div className="grid gap-1">
              <SelectField
                value={field.state.value}
                onChange={(value) => field.handleChange(value as number)}
                label="Refeição"
                placeholder={
                  isPending || isError ? 'Aguarde...' : 'Selecione uma refeição'
                }
                options={data || []}
              />
              <span className="text-danger text-xs">
                {field.state.meta.errors[0]?.message}
              </span>
            </div>
          )}
          validators={{
            onChange: pedidoSchema.shape['refeicaoId'],
          }}
        />
      </div>
      <Button
        aria-label="Registrar Pedido"
        className="place-self-center"
        type="submit"
        isPending={mutation.isPending}
      >
        {mutation.isPending ? 'Registrando...' : 'Registrar Pedido'}
      </Button>
    </Form>
  );
};

export default FormSection;
