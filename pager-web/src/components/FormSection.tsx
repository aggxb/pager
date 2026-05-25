import InputField from './InputField';
import { User } from 'lucide-react';
import SelectField from './SelectField';
import { Button, Form, toast } from '@heroui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pedidoService } from '../service/pedido';
import { useForm } from '@tanstack/react-form';
import z from 'zod';
import React from 'react';

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
  const [waitingTime, setWaitingTime] = React.useState(0);

  React.useEffect(() => {
    if (waitingTime <= 0) return;

    const interval = setInterval(
      () => setWaitingTime((actual) => actual - 1),
      1000,
    );

    return () => clearInterval(interval);
  }, [waitingTime]);

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

      toast.success('Pedido registrado com sucesso');

      setWaitingTime(10);

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
                  placeholder="Insira um nome"
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
      <div className="grid items-center justify-center gap-2">
        <Button
          aria-label="Registrar Pedido"
          className="place-self-center"
          type="submit"
          isDisabled={waitingTime > 0 || mutation.isPending}
        >
          {mutation.isPending ? 'Registrando...' : 'Registrar Pedido'}
        </Button>
        {waitingTime !== 0 && (
          <span className="text-xs text-center text-muted">
            Disponível em: {waitingTime}s
          </span>
        )}
      </div>
    </Form>
  );
};

export default FormSection;
