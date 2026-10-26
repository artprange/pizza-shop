import { http, HttpResponse } from 'msw'

import { CancelOrderParams } from '../cancel-order'

import { demoOrders } from './orders-data'

export const cancelOrderMock = http.patch<CancelOrderParams, never, never>(
  '/orders/:orderId/cancel',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    const order = demoOrders.find((order) => order.id === params.orderId)
    if (!order) return new HttpResponse(null, { status: 404 })
    order.status = 'canceled'
    return new HttpResponse(null, { status: 204 })
  },
)
