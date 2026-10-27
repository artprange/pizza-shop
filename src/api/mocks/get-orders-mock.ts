import { http, HttpResponse } from 'msw'

import type { GetOrdersResponse } from '../get-orders'

import { demoOrders } from './orders-data'

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0
    const customerName = searchParams.get('customerName')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')

    let filteredOrders = demoOrders.map((order) => ({
      orderId: order.id,
      customerName: order.customer.name,
      createdAt: order.createdAt,
      total: order.totalInCents,
      status: order.status,
    }))

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName
          .toLocaleLowerCase('pt-BR')
          .includes(customerName.toLocaleLowerCase('pt-BR')),
      )
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  },
)
