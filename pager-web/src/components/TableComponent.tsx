import { EmptyState, Pagination, Table } from '@heroui/react';
import { ArchiveX } from 'lucide-react';
import React from 'react';
import type { Pedido } from '../types/types';

const columns = [
  { id: 'id', name: 'ID do Pedido' },
  { id: 'nomeCliente', name: 'Nome do Cliente' },
  { id: 'refeicao', name: 'Refeição' },
  { id: 'preco', name: 'Preço' },
  { id: 'dataCriacao', name: 'Data do Pedido' },
];

const rows: Pedido[] = [
  {
    id: 1,
    nomeCliente: 'Gabriel',
    refeicao: 'Hamburger',
    preco: 29.99,
    dataCriacao: '13/05/2026 - 23:47',
  },
  {
    id: 2,
    nomeCliente: 'Augusto',
    refeicao: 'Hamburger',
    preco: 29.99,
    dataCriacao: '13/05/2026 - 23:48',
  },
  {
    id: 3,
    nomeCliente: 'Santos',
    refeicao: 'Hamburger',
    preco: 29.99,
    dataCriacao: '13/05/2026 - 23:49',
  },
  {
    id: 4,
    nomeCliente: 'Andrey',
    refeicao: 'Hamburger',
    preco: 29.99,
    dataCriacao: '13/05/2026 - 23:46',
  },
  {
    id: 5,
    nomeCliente: 'Gabriel',
    refeicao: 'Hamburger',
    preco: 29.99,
    dataCriacao: '13/05/2026 - 23:45',
  },
  {
    id: 6,
    nomeCliente: 'Augusto',
    refeicao: 'Hamburger',
    preco: 29.99,
    dataCriacao: '13/05/2026 - 23:44',
  },
  {
    id: 7,
    nomeCliente: 'Santos',
    refeicao: 'Hamburger',
    preco: 29.99,
    dataCriacao: '13/05/2026 - 23:43',
  },
  {
    id: 8,
    nomeCliente: 'Andrey',
    refeicao: 'Hamburger',
    preco: 29.99,
    dataCriacao: '13/05/2026 - 23:42',
  },
];

const ROWS_PER_PAGE = 5;

const TableComponent = () => {
  const [page, setPage] = React.useState(1);

  const totalPages = Math.ceil(rows.length / ROWS_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginatedItems = React.useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;

    return rows.slice(start, start + ROWS_PER_PAGE);
  }, [page]);

  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, rows.length);

  return (
    <>
      <Table className="h-80 grid">
        <Table.ScrollContainer className={rows.length ? 'h-fit' : 'h-full'}>
          <Table.Content className="h-full" aria-label="Tabela de Pedidos">
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column isRowHeader={column.id === 'id'}>
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body
              items={paginatedItems}
              renderEmptyState={() => (
                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                  <ArchiveX />
                  <span>Tabela vazia</span>
                </EmptyState>
              )}
            >
              {(row) =>
                rows.length ? (
                  <Table.Row>
                    <Table.Collection items={columns}>
                      {(column) => (
                        <Table.Cell>
                          {() => {
                            const value = row[column.id as keyof typeof row];

                            if (column.id === 'preco') return `R$ ${value}`;

                            return value as React.ReactNode;
                          }}
                        </Table.Cell>
                      )}
                    </Table.Collection>
                  </Table.Row>
                ) : (
                  ''
                )
              }
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer className="place-self-end">
          <Pagination size="sm">
            {rows.length ? (
              <Pagination.Summary>
                {start} a {end} de {rows.length}
              </Pagination.Summary>
            ) : null}
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1 || !rows.length}
                  onPress={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <Pagination.PreviousIcon /> Ant.
                </Pagination.Previous>
              </Pagination.Item>
              {pages.map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === page}
                    onPress={() => setPage(p)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages || !rows.length}
                  onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Prox. <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>
    </>
  );
};

export default TableComponent;
