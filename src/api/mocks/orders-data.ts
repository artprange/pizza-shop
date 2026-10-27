import type { GetOrderDetailsResponse } from '../get-order-details'

const customers = [
  'Ana Silva',
  'Bruno Santos',
  'Carla Oliveira',
  'Diego Souza',
  'Elisa Costa',
  'Felipe Lima',
  'Gabriela Alves',
  'Henrique Rocha',
  'Isabela Martins',
  'João Pereira',
  'Karen Ribeiro',
  'Lucas Ferreira',
  'Mariana Gomes',
  'Nicolas Barbosa',
  'Olívia Carvalho',
  'Pedro Almeida',
  'Renata Teixeira',
  'Sofia Mendes',
  'Tiago Nunes',
  'Vitória Cardoso',
]

const products = [
  { name: 'Pizza Marguerita', price: 4200 },
  { name: 'Pizza Calabresa', price: 4500 },
  { name: 'Pizza Quatro Queijos', price: 5200 },
  { name: 'Pizza Pepperoni', price: 5600 },
  { name: 'Pizza Frango com Catupiry', price: 4900 },
  { name: 'Pizza Portuguesa', price: 5100 },
  { name: 'Refrigerante 2L', price: 1400 },
  { name: 'Brownie', price: 1200 },
]

const statuses: GetOrderDetailsResponse['status'][] = [
  'pending',
  'processing',
  'canceled',
  'delivered',
  'delivering',
]

// Dados fictícios compartilhados pela listagem, detalhes e ações da demonstração.
// Recarregar a página restaura o conjunto inicial.
export const demoOrders: GetOrderDetailsResponse[] = Array.from(
  { length: 240 },
  (_, index) => {
    const orderItems = Array.from(
      { length: 1 + (index % 4) },
      (_, itemIndex) => {
        const product = products[(index + itemIndex) % products.length]
        return {
          id: `item-${index + 1}-${itemIndex + 1}`,
          priceInCents: product.price,
          quantity: 1 + ((index + itemIndex) % 2),
          product: { name: product.name },
        }
      },
    )

    return {
      id: `order-${index + 1}`,
      createdAt: new Date(
        Date.now() - index * 6 * 60 * 60 * 1000,
      ).toISOString(),
      status:
        index < 10
          ? statuses[index % statuses.length]
          : index % 7 === 0
            ? 'canceled'
            : 'delivered',
      customer: {
        name: customers[index % customers.length],
        email: `cliente${(index % customers.length) + 1}@example.com`,
        phone: index % 4 === 0 ? null : '(11) 99999-0000',
      },
      orderItems,
      totalInCents: orderItems.reduce(
        (total, item) => total + item.priceInCents * item.quantity,
        0,
      ),
    }
  },
)
